const router = require('express').Router();
const sequelize = require('../config/connection');
const { Competitor, Fish } = require ('../models');

// homepage leaderboard display
router.get('/', (req, res) => {
    Competitor.findAll({
        attributes: ['id', 'name', 'email', 'phone'],
        include: [
            {
                model: Fish,
                attributes: ['length', 'weight', 'picture']
            }
        ]
    })
    .then(dbCompetitorData => {
        let anglers = []
        // loop through each competitor
        for(let i=0; i<dbCompetitorData.length; i++) {
            // get the fish array for current competitor
            let fish = dbCompetitorData[i].get({ plain: true })  
            // reset stats for current competitor
            let totalLength = 0
            let totalWeight = 0
            let fishCount = 0
            // loop through the fish array of the current competitor
            for(let i=0; i<fish.fishes.length; i++) {
                // aggregate total length, weight, and # of fish caught
                totalLength = totalLength + Number(fish.fishes[i].length)
                totalWeight = totalWeight + Number(fish.fishes[i].weight)
                fishCount++ 
            }
            // create an object for the current competior
            const anglerObj = {
                'id': dbCompetitorData[i].id,
                'name': dbCompetitorData[i].name,
                'email': dbCompetitorData[i].email,
                'phone': dbCompetitorData[i].phone,
                'fish_caught': fishCount,
                'total_length': totalLength,
                'total_weight': totalWeight,
                // get first fish picture
                'picture': fish.fishes[0].picture
            }
            // add object to array
            anglers.push(anglerObj)
        }
        // order array by bag length
        anglers = anglers.sort(function (a, b) {
            return b.total_length - a.total_length })
        // render homepage leaderboard
        res.render('homepage', { anglers })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// login page display
router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/')
        return
    }

    res.render('login')
})

// sognup page display
router.get('/signup', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/')
        return
    }

    res.render('signup')
})

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
        
        res.render('profile', { competitor });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
  });

module.exports = router;