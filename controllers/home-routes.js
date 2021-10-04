const router = require('express').Router();
const sequelize = require('../config/connection');
const {Competitor, Fish} = require ('../models')

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
        let competitors = []
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
            const totals = {
                'id': dbCompetitorData[i].id,
                'name': dbCompetitorData[i].name,
                'email': dbCompetitorData[i].email,
                'phone': dbCompetitorData[i].phone,
                'fish_caught': fishCount,
                'total_length': totalLength,
                'total_weight': totalWeight
            }
            competitors.push(totals)
        }
        res.render('homepage', { competitors })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;