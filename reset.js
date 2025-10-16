document.querySelector('form').addEventListener('submit',async (event)=>{
    try
    {
        event.preventDefault()
        if(event.target.new.value != event.target.confirm.value) throw 'passwords doesnt match'
        let r = await axios.post('/forgot/reset',{
            email : event.target.email.value,
            password : event.target.new.value
        })
        console.log(r)
        window.location.href = 'http://localhost:1000'
    }
    catch(e)
    {
        console.log(e)
    }
})