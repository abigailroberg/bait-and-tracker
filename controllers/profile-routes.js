const router = require('express').Router();
const sequelize = require('../config/connection');
const { Competitor, Fish } = require ('../models');

// profile page display
router.get('/competitor/:id', (req, res) => {
    //get one competitor with corresponding fish caught data
    Competitor.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id', 
            'name', 
            'email', 
            'phone', 
            [sequelize.literal('(SELECT SUM(length) FROM fish WHERE competitor.id = fish.competitor_id)'), 'totalLength' ]
        ],
        include: [
            {
                model: Fish,
                attributes: [
                    'id', 
                    'length', 
                    'weight', 
                    'picture',
                    [sequelize.literal('(SELECT CURTIME())' ), 'timeofcatch' ],
                    'created_at'
                ]
            }
        ]
    })
    .then(dbCompetitorData => {
        if(!dbCompetitorData){
            res.status(404).json({ message: 'No competitor found with this id.'});
            return;
        }
        const competitor = dbCompetitorData.get({ plain:true });
        
        res.render('profile', {
            competitor,
            loggedIn: req.session.loggedIn,
            competitor_id: req.session.competitor_id,
            name: req.session.name
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
  });
  
// new fish display
router.get('/add', (req, res) => {

    res.render('add-fish', {
        name: req.session.name,
        loggedIn: req.session.loggedIn,
    })
})

module.exports = router