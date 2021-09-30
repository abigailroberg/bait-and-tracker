const express = require('express');
const router = express.Router();
const { Competitor, Fish } = require('../../models');

//CRUD actions for Competitor model 
//relational db structure = (" one-to-many 'Competitor' -> 'Fish' ")
//================================================================================================

//GET route for all competitors (including fish caught information) : /api/competitors
router.get('/', (req, res) => {
    //get all competitors with corresponding fish caught for each competitor
    Competitor.findAll({
        attributes: ['id', 'name', 'email', 'phone'],
        //should we order the response in terms of which parameter? I chose weight here...
        order: [['id', 'DESC']],
        include: [
            {
                model: Fish,
                attributes: ['length', 'weight', 'picture'],
                order: [['weight', 'DESC']]
            }
        ]
    })
    .then(dbCompetitorData => res.json(dbCompetitorData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//GET route for a single competitors : /api/competitors/:id
router.get('/:id', (req, res) => {
    //get one competitor with corresponding fish caught data
    Competitor.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'name', 'email', 'phone'],
        include: [
            {
                model: Fish,
                attributes: ['length', 'weight', 'picture'],
            }
        ]
    })
    .then(dbCompetitorData => {
        if(!dbCompetitorData){
            res.status(404).json({ message: 'No competitor found with this id.'});
            return;
        }
        res.json(dbCompetitorData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//POST route to add new competitors : /api/competitors
router.post('/', ({body}, res) => {
    //expect {name: 'STRING', email 'STRING', phone: 'STRING', username: 'STRING', password: 'STRING'}
    Competitor.create({
        name: body.name,
        email: body.email,
        phone: body.phone,
        password: body.password
    })
    .then(dbCompetitorData => res.json(dbCompetitorData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//PUT route to update competitors by id : /api/competitors/:id
router.put('/:id', (req, res) => {
    //expect {name: 'STRING', email 'STRING', phone: 'STRING', username: 'STRING', password: 'STRING'}
    Competitor.update( req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbCompetitorData => {
        if(!dbCompetitorData){
            res.status(404).json({ message: 'No competitor found with this id.' });
            return;
        }
        res.json(dbCompetitorData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//DELETE route to delete competitors by id : /api/competitors/:id
router.delete('/:id', (req, res) => {
    Competitor.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbCompetitorData => {
        if(!dbCompetitorData) {
            res.status(404).json({ message: 'No competitor found with this id.'});
            return;
        }
        res.json(dbCompetitorData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;