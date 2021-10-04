const express = require('express');
const router = express.Router();

//render app homepage
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
        for(let i=0; i<dbCompetitorData.length; i++) {
            let fish = dbCompetitorData[i].get({ plain: true })  
            let totalLength = 0
            let totalWeight = 0
            let fishCount = 0
            for(let i=0; i<fish.fishes.length; i++) {
                totalLength = totalLength + Number(fish.fishes[i].length)
                totalWeight = totalWeight + Number(fish.fishes[i].weight)
                fishCount++
            }
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
        res.render('homepage', competitors)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;