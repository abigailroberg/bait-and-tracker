const router = require('express').Router();
const sequelize = require('../config/connection');
const { Competitor, Fish } = require ('../models');

// single fish length leaderboard display
router.get('/length', (req, res) => {
    Fish.findAll({
        attributes: ['id', 'length', 'weight', 'picture', 'competitor_id'],
        include: [
            {
                model: Competitor,
                attributes: ['name']
            }
        ]
    })
    .then(dbFishData => {
        // make array for fish objects
        let fishes = []
        for(let i=0; i<dbFishData.length; i++) {
            // get the plain text fish objects
            let fish = dbFishData[i].get({ plain: true })
            // add fish objects to array
            fishes.push(fish)
        }
        // order array by fish length
        fishes = fishes.sort(function (a, b) {
            return b.length - a.length })
        // render homepage leaderboard
        console.log(fishes)
        res.render('fish-leaderboard', { 
          fishes,
          loggedIn: req.session.loggedIn,
          competitor_id: req.session.competitor_id
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// single fish weight leaderboard display
router.get('/weight', (req, res) => {
    Fish.findAll({
        attributes: ['id', 'length', 'weight', 'picture', 'competitor_id'],
        include: [
            {
                model: Competitor,
                attributes: ['name']
            }
        ]
    })
    .then(dbFishData => {
        // make array for fish objects
        let fishes = []
        for(let i=0; i<dbFishData.length; i++) {
            // get the plain text fish objects
            let fish = dbFishData[i].get({ plain: true })
            // add fish objects to array
            fishes.push(fish)
        }
        // order array by fish weight
        fishes = fishes.sort(function (a, b) {
            return b.weight - a.weight })
        // render homepage leaderboard
        console.log(fishes)
        res.render('fish-leaderboard', { 
          fishes,
          loggedIn: req.session.loggedIn,
          competitor_id: req.session.competitor_id
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})
module.exports = router