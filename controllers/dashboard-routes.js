const express = require('express');
const router = express.Router();
const sequelize = require('../config/connection');
const { Competitor, Fish } = require('../models');

//this will eventually go into a utils folder...
//WE may be able to do this without this function, by including ORDER BY statements in the sequelize literals below
/* const rankCompetitors = (...competitors) => {
    ranking code here...

*/

//GET route for all competitors (including fish caught information) : /dashboard === /api/competitors
router.get('/', (req, res) => {
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
    }) 
    .then(dbCompetitorData => {
        //serialize the sequalize object
        const competitors = dbCompetitorData.map(competitor => competitor.get({ plain: true }));
        console.log(competitors);

        //test this in insomnia...
        res.json(competitors);
        //const rankedCompetitors = rankCompetitors(competitors);

        //res.render('dashboard', {rankedCompetitors});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;