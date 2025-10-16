const bcrypt = require('bcrypt')
const forgot = require('../service/forgot.js')
const path = require('path')
const reset = require('../model/reset.js')
const control = async (req,res)=>{
    try
    {
        const email = req.body.email;
        if (!email) {
            return res.status(400).json({ message: 'Email is required.' });
        }
        let result = await forgot.mail(email);
        res.status(200).json({ message: 'If your email is in our system, you will receive a password reset link.' });
    }
    catch(e)
    {
        console.error('Forgot password error:', e);
        res.status(500).json({ message: 'An internal server error occurred.' });
    }
}
const getControl = async (req,res)=>{
    try
    {
        let {token,password} = req.body
        const p = await bcrypt.hash(password, 10);
        let r = await forgot.reset(token, p);
        res.status(200).send(r)
    }
    catch(e)
    {
        console.error('Reset password error:', e);
        res.status(500).json({ message: 'An internal server error occurred.' });
    }
}
const page = async (req,res)=>{
    let token = req.params.token
    try
    {
        let a = await reset.findOne({
            where : {
                uid : token
            }
        })
        if(a.inactive == true)
        {
            a.inactive = false
            await a.save()
            res.status(200).sendFile(path.join(__dirname,'../public','/login','/reset.html'))
        }
        else
        {
            res.status(404).send('url expired...')
        }
    }
    catch(e)
    {
        res.status(500).send('wrong url found...')
    }
}
module.exports = {control,getControl,page}