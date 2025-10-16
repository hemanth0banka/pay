const bcrypt = require('bcrypt')
const users = require('../model/users.js')
const signup = (req,res)=>{
    try
    {
        const {username,email,password} = req.body
        bcrypt.hash(password,10,async (err,result)=>{
            if(err)
            {
                res.status(500).json({
                    message : 'server error',
                    data : err
                })
            }
            else if(result)
            {
                try
                {
                    let a = await users.create({
                        username : username,
                        email : email,
                        password :  result
                    })
                    res.status(200).json({
                        message : 'user created',
                        data : a
                    })
                }
                catch(e)
                {
                    res.status(500).json({
                        message : 'server error',
                        data : err
                    })
                }
            }
        })
    }
    catch(e)
    {
        res.status(500).json({
            message : 'server error',
            data : err
        })
    }
}
module.exports = signup