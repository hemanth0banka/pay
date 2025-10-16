const data = require('../model/data.js')
const users = require('../model/users.js')
const sequelize = require('../db.js')
const getService = async ()=>{
    try
    {
        let r = await users.findAll({
            attributes : ['userId','username',[sequelize.fn('sum',sequelize.col('data.amount')),'TotalSpent']],
            include : [{
                model : data,
                attributes : []
            }],
            group : ['users.userId'],
            order : [[sequelize.literal('TotalSpent'),'DESC']]
        })
        console.log(r)
        return r

    }
    catch(e)
    {
        throw e
    }
}
module.exports = {getService}