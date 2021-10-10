const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const profileRoutes = require('./profile-routes');
const s3Route = require('./s3-routes');


router.use('/', homeRoutes);
//router.use('/api', apiRoutes);

router.use('/', homeRoutes);
router.use('/api/', apiRoutes);
router.use('/profile', profileRoutes)
router.use('/s3URL', s3Route)

//'catchall' route
router.use((req, res) => {
    res.status(404).end();
})

module.exports = router;