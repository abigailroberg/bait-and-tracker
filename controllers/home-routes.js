const express = require('express');
const router = express.Router();

//render app homepage
router.get('/', (req, res) => {
    res.render('homepage');
});

module.exports = router;