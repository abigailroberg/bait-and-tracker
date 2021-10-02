// import models
const Competitor = require('./Competitor')
const Fish = require('./Fish')

Fish.belongsTo(Competitor, {
    foreignKey: 'competitor_id'
})

Competitor.hasMany(Fish, {
    foreignKey: 'competitor_id'
})

module.exports = { Fish, Competitor }