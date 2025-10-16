const {DataTypes} = require('sequelize');
const sequelize = require('../db.js')
const reset = sequelize.define('reset',{
    uid : {
        type : DataTypes.STRING,
        allowNull : false
    },
    inactive : {
        type : DataTypes.BOOLEAN
    }
})
module.exports = reset