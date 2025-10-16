const {DataTypes} = require('sequelize')
const sequelize = require('../db.js')
const payment = sequelize.define('payment',{
    orderId :{
        type : DataTypes.STRING
    },
    paymentSessionId : {
        type : DataTypes.STRING
    },
    orderAmount : {
        type : DataTypes.INTEGER
    },
    orderCurrency : {
        type : DataTypes.STRING
    },
    paymentStatus : {
        type : DataTypes.STRING
    }
})
module.exports = payment