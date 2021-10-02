const express = require('express');
const router = express.Router();
const { Competitor, Fish } = require('../../models');

const rankCompetitors = (...competitors) => {
    
    do{

    } while (i < competitors.length);

}

//GET route for all competitors (including fish caught information) : /dashboard === /api/competitors
router.get('/', (req, res) => {
    //get all competitors with corresponding fish caught for each competitor
    Competitor.findAll({
        attributes: ['name'],
        order: [['id', 'DESC']],
        include: [
            {
                model: Fish,
                attributes: ['length', 'picture',
                //get the number of fish relative to the competitor
                [sequalize.literal('(SELECT COUNT(id) FROM fish)'), 'totalFishes'],
                //get the sum of all the fish in the 'fish' column
                [sequalize.literal('(SELECT SUM(length) FROM fish)'), 'totalLength']
                ]
            }
        ]
    })
    .then(dbCompetitorData => {
        //serialize the sequalize object
        const competitors = dbCompetitorData.map(competitor => competitor.get({ plain: true }));

        const rankedCompetitors = rankCompetitors(competitors);

        res.render('dashboard', {rankedCompetitors});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;