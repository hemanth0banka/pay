document.querySelector('form').addEventListener('submit',async (event)=>{
    try
    {
        event.preventDefault()
        let r = await axios.post('/login',{
            username : event.target.username.value,
            password : event.target.password.value
        })
        if (r.data.success) {
            localStorage.setItem('token',r.data.token)
            window.location.href='http://localhost:1000/home'
        } else {
            alert(r.data.message || 'Login failed.');
        }
    }
    catch(e)
    {
        console.log(e)
        alert(e.response.data.message)
    }
})
