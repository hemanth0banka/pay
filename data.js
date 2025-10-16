const {DataTypes} = require('sequelize')
const sequelize = require('../db.js')
const data = sequelize.define('data',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    amount : {
        type : DataTypes.INTEGER
    },
    description : {
        type : DataTypes.STRING
    },
    category : {
        type : DataTypes.STRING
    }
})
module.exports = data