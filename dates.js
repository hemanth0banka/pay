const jwt = require('jsonwebtoken')
const date = require('../service/date.js')
const dateControl = async (req,res)=>{
    try
    {
        let token = req.headers.authorization?.split(' ')[1]
        let t = jwt.verify(token,'securitykey')
        let id = t.userId
        let data = await date(id)
        res.status(200).json(data)
    }
    catch(e)
    {
        res.status(400).json(e)
    }
}
module.exports = dateControl