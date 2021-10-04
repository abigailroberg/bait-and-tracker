const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')
const bcrypt = require('bcrypt')

class Competitor extends Model {
    // method to check password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password)
    }
}

Competitor.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            // must be 10 digits
            validate: {
                len: [9, 11],
                isNumeric: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        hooks: {
            // hash password before creating Competitor
          async beforeCreate(newCompData) {
            newCompData.password = await bcrypt.hash(newCompData.password, 10);
            return newCompData;
          },

          // hash password before updating Competitor
          async beforeUpdate(updatedCompData) {
            updatedCompData.password = await bcrypt.hash(updatedCompData.password, 10);
            return updatedCompData;
          }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'competitor'
      }
)

module.exports = Competitor