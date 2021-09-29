const express =  require('express');
const router = express.Router();
const { Competitor, Fish } = require('../../models')

//CRUD actions for Fish model 
//relational db structure = (" one-to-many 'Competitor' -> 'Fish' ")
//================================================================================================

//GET route for all fish caught : /api/fishCaught
router.get('/', (req, res) => {
    //get all fish caught with corresponding competitor usernames
    Fish.findAll({
        /*sub query-incldue: [competitor username here]*/
    })
    .then(dbFishData => res.json(dbFishData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//GET route for a single fish caught : /api/fishCaught/:id
router.get('/:id', (req, res) => {
    //get one fish with corresponding competitor username
    Fish.findOne({
        where: {
            id: req.params.id
        }
        /*sub query-include: [competitor username]*/
    })
    .then(dbFishData => {
        if(!dbFishData){
            res.status(404).json({ message: 'No fish found with that id.'});
            return;
        }
        res.json(dbFishData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//POST route to add new fish caught : /api/fishCaught
router.post('/', ({body}, res) => {
 //expect {length: 'DECIMAL', weight 'DECIMAL', competitor_id: 'INTEGER', picture: 'TEXT'}
    Fish.create({
        length: body.length,
        weight: body.weight,
        competitor_id: body.competitor_id,
        picture: body.picture
    })
    .then(dbFishData => res.json(dbFishData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//PUT route to update fish caught by id (competitor fish affiliation) : /api/fishCaught/:id
router.put('/:id', (req, res) => {
//expect {length: 'DECIMAL', weight 'DECIMAL', competitor_id: 'INTEGER', picture: 'TEXT'}
    Fish.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbFishData => {
        if(!dbFishData){
            res.status(404).json({ message: 'No fish found with that id.'});
            return;
        }
        res.json(dbFishData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

//DELETE route to delete fish caught by id : /api/fishCaught/:id
router.delete('/:id', (req, res) => {
    Fish.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbFishData => {
        if(!dbFishData){
            res.status(404).json({ message: 'No fish found with that id'});
            return;
        }
        res.json(dbFishData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;