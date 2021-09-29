const express = require('express');
const router = express.Router();
const { Competitor, Fish } = require('../../models');

//CRUD actions for Competitor model 
//relational db structure = (" one-to-many 'Competitor' -> 'Fish' ")
//================================================================================================

//GET route for all competitors : /api/competitors
router.get('/', (req, res) => {

});

//GET route for all competitors : /api/competitors/:id
router.get('/:id', (req, res) => {

});

//POST route to add new competitors : /api/competitors
router.post('/', (req, res) => {

});

//PUT route to update competitors by id : /api/competitors/:id
router.put('/:id', (req, res) => {

});

//DELETE route to delete competitors by id : /api/competitors/:id
router.delete('/:id', (req, res) => {

});

module.exports = router;