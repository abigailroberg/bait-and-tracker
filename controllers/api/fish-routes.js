const express =  require('express');
const router = express.Router();
const { Competitor, Fish } = require('../../models')

//CRUD actions for Fish model 
//relational db structure = (" one-to-many 'Competitor' -> 'Fish' ")
//================================================================================================

//GET route for all fish caught : /api/fishCaught
router.get('/', (req, res) => {

});

//GET route for a single fish caught : /api/fishCaught/:id
router.get('/:id', (req, res) => {

});

//POST route to add new fish caught : /api/fishCaught
router.post('/', (req, res) => {

});

//PUT route to update fish caught by id : /api/fishCaught/:id
router.put('/:id', (req, res) => {

});

//DELETE route to delete fish caught by id : /api/fishCaught/:id
router.delete('/:id', (req, res) => {

});

module.exports = router;