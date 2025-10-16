const data = require('../model/data.js')
const { Op } = require('sequelize')
const dateService = async (id) => {
    try {
        let result = await data.findAll({
            where: {
                userUserId : id,
                createdAt: {
                    [Op.between]: [new Date(Date.now() - (1000 * 60 * 60 * 24 * 30)), new Date()]
                }
            }
        })
        return result
    }
    catch (e) {
        throw e
    }
}
module.exports = dateService