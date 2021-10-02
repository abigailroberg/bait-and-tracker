const express = require('express');
const router = express.Router();

const fishRoutes = require('./fish-routes');
const competitorRoutes = require('./competitor-routes');

router.use('/fishCaught', fishRoutes);
router.use('/competitors', competitorRoutes);

module.exports = router;
