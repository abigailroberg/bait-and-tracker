const express = require('express');
const router = express.Router();

const homeRoutes = require('./home-routes');
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

//'catchall' route
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;