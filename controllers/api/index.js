const router = require('express').Router()

const competitorRoutes = require('./competitor-routes')
const fishRoutes = require('./fish-routes')

router.use('/competitors', competitorRoutes)
router.use('/fish', fishRoutes)

module.exports = router