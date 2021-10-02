const express = require('express');
const router = express.Router();

const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes');
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

//'catchall' route
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;