const bcrypt = require('bcrypt')
const users = require('../model/users.js')
const jwt = require('jsonwebtoken')
const login = async (req,res)=>{
    try
    {
        const {username,password} = req.body
        const user = await users.findOne({
            where : {
                username : username
            }
        })
        if(user)
        {
            const passwordsMatch = await bcrypt.compare(password, user.password);
            if(passwordsMatch)
            {
                const token = jwt.sign({username : username , userId : user.userId},'securitykey')
                return res.status(200).json({
                    message : 'Login successful',
                    success: true,
                    token : token
                })
            }
            else
            {
                return res.status(401).json({ message: 'Wrong or invalid password', success: false });
            }
        }
        return res.status(404).json({ message: 'User not found', success: false });
    }
    catch(e)
    {
        console.error(e);
        return res.status(500).json({ message: 'Server side error', success: false, data: e });
    }
}
module.exports = login