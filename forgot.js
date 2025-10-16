const Sib = require('sib-api-v3-sdk');
const users = require('../model/users')
require('dotenv').config()
const mail = async (email) => {
    try {
        const user = await users.findOne({
            where: {
                email: email
            }
        })
        if (!user) {
            console.log(`Password reset requested for non-existent user: ${email}`);
            return { message: 'If a user with that email exists, a password reset link has been sent.' };
        }

        const client = Sib.ApiClient.instance;
        const apiKey = client.authentications['api-key'];
        apiKey.apiKey = process.env.apiKey;
        const emailapi = new Sib.TransactionalEmailsApi()

        const sender = {
            email: process.env.SIB_SENDER_EMAIL || 'bankahemanth@gmail.com',
        }
        const receivers = [
            {
                email: email
            }
        ]

        let r = await emailapi.sendTransacEmail({
            sender,
            to: receivers,
            subject: 'Password Reset Link',
            textContent: `Your password reset link is here: http://localhost:1000/forgot`
        })
        return r;
    }
    catch (e) {
        throw e
    }
}
const reset = async (email,password)=>{
    try
    {
        user = await users.findOne({
            where : {
                email : email
            }
        })
        user.password = password
        await user.save()
        return 'success'
    }
    catch(e)
    {
        throw 'fail'
    }
}
module.exports = {mail,reset}