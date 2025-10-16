const {DataTypes} = require('sequelize')
const sequelize = require('../db.js')
const users = sequelize.define('users',{
    userId : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement: true
    },
    username : {
        type : DataTypes.STRING,
        allowNull : false
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    },
    primeuser : {
        type : DataTypes.BOOLEAN,
        allowNull : true
    },
    total : {
        type : DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
})
module.exports = users