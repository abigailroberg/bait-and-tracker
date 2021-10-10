const router = require('express').Router();
const sequelize = require('../config/connection');
const { Competitor, Fish } = require ('../models');
const _ = require('lodash');

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
            let fishImage = ''
            // loop through the fish array of the current competitor
            for(let i=0; i<fish.fishes.length; i++) {
                // aggregate total length, weight, and # of fish caught
                totalLength = totalLength + Number(fish.fishes[i].length)
                totalWeight = totalWeight + Number(fish.fishes[i].weight)
                fishCount++ 
                //include this logic here using lodash utility to veryify picture property on fish is not undefined
                if(_.get(fish, `fishes[${i}]`, 'undefined') !== 'undefined'){
                    console.log('I am here');
                    fishImage = fish.fishes[i].picture;
                }
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
                'picture': fishImage
            }

            // add object to array
            anglers.push(anglerObj)
        }
        // order array by bag length
        anglers = anglers.sort(function (a, b) {
            return b.total_length - a.total_length })
        // render homepage leaderboard
        res.render('homepage', { 
          anglers,
          loggedIn: req.session.loggedIn,
          competitor_id: req.session.competitor_id
        })
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

// signup page display
router.get('/signup', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/')
        return
    }

    res.render('signup')
})

module.exports = router;