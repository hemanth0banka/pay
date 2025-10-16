document.querySelector('form').addEventListener('submit',async (event)=>{
    event.preventDefault()
    try
    {
        const email = event.target.email.value;
        let r = await axios.post('/forgot',{
            email : email
        });
        alert('If an account with that email exists, a password reset link has been sent.');
        event.target.email.value = ''; // Clear the form
    }
    catch(e)
    {
        alert('An error occurred. Please try again.');
        console.error(e);
    }
})