const router = require('express').Router()
const { Competitor, Fish } = require('../../models')

//CRUD actions for Fish model 
//relational db structure = (" one-to-many 'Competitor' -> 'Fish' ")
//================================================================================================

//GET route for all fish caught : /api/fishCaught
router.get('/', (req, res) => {
    //get all fish caught with corresponding competitor usernames
    Fish.findAll({
        attributes: ['length', 'weight', 'picture', 'competitor_id','created_at'],
        order: [['weight', 'DESC']],
        include: [
            {
                model: Competitor,
                attributes: ['name']
            }
        ]
    })
    .then(dbFishData => res.json(dbFishData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//GET route for a single fish caught : /api/fishCaught/:id
router.get('/:id', (req, res) => {
    //get one fish with corresponding competitor username and name
    Fish.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['length', 'weight', 'picture', 'competitor_id'],
        include: [
            {
                model: Competitor,
                attributes: ['name']
            }
        ]
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
router.post('/', (req, res) => {
 //expect {length: 'DECIMAL', weight 'DECIMAL', competitor_id: 'INTEGER', picture: 'TEXT'}
 if(req.session) {
     console.log(`user: ${req.session.competitor_id}`)
    Fish.create({
        length: req.body.length,
        weight: req.body.weight,
        picture: req.body.picture,
        competitor_id: req.session.competitor_id
    })
    .then(dbFishData => res.json(dbFishData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
 }   
 
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