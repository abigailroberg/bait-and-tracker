const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Fish extends Model {}

// Need to mention that we need to handle the option to show multiple fish in the leaderboard
Fish.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        length: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        weight: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        competitor_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'competitor',
                key: 'id'
            }
        },
        picture: {
            type: DataTypes.TEXT
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'fish'
    }
)

module.exports = Fish