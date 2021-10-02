const router = require('express').Router();
const sequelize = require('../config/connection');
const {Competitor, Fish} = require ('../models')
// TODO: Need to require models

// router.get('/', (req, res) => {
//   const fishes = [
//     {
//       id: 1, 
//       length: 10,
//       weight: 5,
//       pictures: [
//         'http://placekitten.com/48/36',
//         'http://placekitten.com/48/36',
//         'http://placekitten.com/48/36',
//         'http://placekitten.com/48/36',
//         'http://placekitten.com/48/36'
//       ]
//     },
//     {
//       id: 2, 
//       length: 12,
//       weight: 8,
//       pictures: [
//         'http://placekitten.com/48/36',
//         'http://placekitten.com/48/36',
//         'http://placekitten.com/48/36'
//       ]
//     }
//   ]

//   res.render('homepage', {
//     fishes
//   });
// });

  // .then(dbFishData => {
  //   const fishes = dbFishData.map(fish => fish.get({ plain: true }));

  //   res.render('homepage', {
  //     fishes
  //   });
  // })
  // .catch(err => {
  //   console.log(err);
  //   res.status(500).json(err);
  // });
//


router.get('/', (req, res) => {
  //get all fish caught with corresponding competitor usernames
  Fish.findAll({
      attributes: ['length', 'weight', 'picture', 'competitor_id', 'created_at'],
      include: [
          {
              model: Competitor,
              attributes: ['name']
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




module.exports = router;