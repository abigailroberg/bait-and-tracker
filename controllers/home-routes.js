const router = require('express').Router();
const sequelize = require('../config/connection');
const {Competitor, Fish} = require ('../models')


router.get('/', (req, res) => {
  //get all fish caught with corresponding competitor usernames
  Fish.findAll({
      attributes: ['id','length', 'weight', 'picture', 'competitor_id', 'created_at'],
      include: [
          {
              model: Competitor,
              attributes: ['name','id']
          }
      ]
  })
  .then(dbFishData => {
    const fishes = dbFishData.map(fishes =>fishes.get({plain:true}));
    res.render('homepage',{fishes});
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });

});

// For competitor-profile

router.get('/competitor/:id', (req, res) => {
  //get one competitor with corresponding fish caught data
  Competitor.findOne({
      where: {
          id: req.params.id
      },
      attributes: ['id', 'name', 'email', 'phone', [sequelize.literal('(SELECT SUM(length) FROM fish WHERE competitor.id = fish.competitor_id)'), 'totalLength' ]],
      include: [
          {
              model: Fish,
              attributes: ['id', 'length', 'weight', 'picture','created_at'],
          }
      ]
  })
  .then(dbCompetitorData => {
      if(!dbCompetitorData){
          res.status(404).json({ message: 'No competitor found with this id.'});
          return;
      }
      const competitor = dbCompetitorData.get({plain:true});
      
      res.render('competitor-profile',{competitor});
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.get('/leaderboard', (req, res) => {
  //get all competitors with corresponding fish caught for each competitor
  Competitor.findAll({
      attributes: ['name', 
                  [sequelize.literal('(SELECT COUNT(competitor_id) FROM fish WHERE competitor.id = fish.competitor_id)'), 'totalFish' ],
                  [sequelize.literal('(SELECT SUM(length) FROM fish WHERE competitor.id = fish.competitor_id)'), 'totalLength' ]],
      
      include: [
          {
              model: Fish,
              attributes: ['length', 'picture', 'created_at', 'updated_at']
          }
      ]
      // ,
      // order: ['totalLength', 'DESC']
  }) 
  .then(dbCompetitorData => {
      //serialize the sequalize object
      const competitors = dbCompetitorData.map(competitor => competitor.get({ plain: true }));

      //test this in insomnia...
      res.render('leaderboard',{competitors});
      //const rankedCompetitors = rankCompetitors(competitors);

      //res.render('dashboard', {rankedCompetitors});
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

module.exports = router;