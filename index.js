function fobj(obj) {
    let ele = document.createElement('li')
    let txt = document.createTextNode(`${obj.amount} - ${obj.description} - ${obj.category}`)
    let but1 = document.createElement('button')
    but1.innerHTML = `Edit`;
    but1.addEventListener('click', async () => { })
    let but2 = document.createElement('button')
    but2.innerHTML = `Delete`
    but2.addEventListener('click', async () => {
        try {
            await axios.delete('/expenses', {
                data: { id: obj.id, amount: obj.amount }, headers: {
                    Authorization: ` Bearer ${localStorage.getItem('token')}`
                }
            })
            document.querySelector('ul').removeChild(ele)
        }
        catch (e) {
            console.log(e)
        }
    })
    ele.appendChild(txt)
    ele.appendChild(but1)
    ele.appendChild(but2)
    document.querySelector('ul').appendChild(ele)
}

function f(arr) {
    for (let x of arr) {
        fobj(x)
    }
}


function protable(obj) {
    const tr = document.createElement('tr')
    const values = Object.values(obj)
    for (let x of values) {
        const td = document.createElement('td')
        td.innerHTML = x
        tr.appendChild(td)
    }
    return tr
}

function updatePaginationUI(paginationData) {
    const { currentpage, prevpage, nextpage, lastpage } = paginationData;

    const firstBtn = document.querySelector('#first');
    const prevBtn = document.querySelector('#prev');
    const currentBtn = document.querySelector('#current');
    const nextBtn = document.querySelector('#next');
    const lastBtn = document.querySelector('#last');

    currentBtn.innerHTML = currentpage;

    if (currentpage > 1) {
        prevBtn.style.display = 'inline';
        prevBtn.innerHTML = prevpage;
        if (prevpage > 1) {
            firstBtn.style.display = 'inline';
            firstBtn.innerHTML = '1';
        } else {
            firstBtn.style.display = 'none';
        }
    } else {
        prevBtn.style.display = 'none';
        firstBtn.style.display = 'none';
    }


    if (currentpage < lastpage) {
        nextBtn.style.display = 'inline';
        nextBtn.innerHTML = nextpage;
        if (nextpage < lastpage) {
            lastBtn.style.display = 'inline';
            lastBtn.innerHTML = lastpage;
        } else {
            lastBtn.style.display = 'none';
        }
    } else {
        nextBtn.style.display = 'none';
        lastBtn.style.display = 'none';
    }

    if(nextpage == lastpage )
    {
        lastBtn.style.display = 'none';
    }

    if(currentpage == lastpage)
    {
        nextBtn.style.display = 'none';
    }
}
document.querySelector('.limit').addEventListener('submit',async (event)=>{
    event.preventDefault()
    try
    {
        const limit = event.target.limit.value
        console.log(limit)
        let data = await axios.post('/expenses/page',{
            page : 1,
            limit : limit
        },{
        headers: 
        {
            Authorization: ` Bearer ${localStorage.getItem('token')}`
        }})
        document.querySelector('ul').innerHTML = ''
        console.log(data)
        f(data.data.data)
        updatePaginationUI(data.data);

    }
    catch(e)
    {
        console.log(e)
    }
})
async function pages(v){
    try
    {
        const limit = document.querySelector('#limit').value
        console.log(limit)
        let data = await axios.post('/expenses/page',{
            page : v,
            limit : limit
        },{
        headers: 
        {
            Authorization: ` Bearer ${localStorage.getItem('token')}`
        }})
        document.querySelector('ul').innerHTML = ''
        console.log(data)
        f(data.data.data)
        updatePaginationUI(data.data);

    }
    catch(e)
    {
        console.log(e)
    }
}

window.addEventListener('load', async (event) => {
    event.preventDefault()
    try {
        let data = await axios.get("/expenses", {
            headers: {
                Authorization: ` Bearer ${localStorage.getItem('token')}`,
            }
        })
        console.log(data.data)
        document.querySelector('#current').innerHTML = data.data.currentpage
        if(data.data.currentpage = 1)
        {
            document.querySelector('#prev').style = 'display : none;'
            document.querySelector('#first').style = 'display : none;'
        }
        else if(data.data.prevpage = 1)
        {
            document.querySelector('#prev').style = 'display : inline;'
            document.querySelector('#prev').innerHTML = data.data.prevpage
            document.querySelector('#first').style = 'display : none;'
        }
        else if(data.data.prevpage = 2)
        {
            document.querySelector('#prev').style = 'display : inline;'
            document.querySelector('#prev').innerHTML = data.data.prevpage
            document.querySelector('#first').style = 'display : inline;'
            document.querySelector('#first').innerHTML = '1'
        }
        if(data.data.currentpage == data.data.lastpage)
        {
            document.querySelector('#next').style = 'display : none;'
            document.querySelector('#last').style = 'display : none;'
        }
        else if(data.data.nextpage == data.data.lastpage)
        {
            document.querySelector('#next').style = 'display : inline;'
            document.querySelector('#next').innerHTML = data.data.nextpage
            document.querySelector('#last').style = 'display : none;'
        }
        else
        {
            
            document.querySelector('#next').innerHTML = data.data.nextpage
            document.querySelector('#last').innerHTML = data.data.lastpage
        }
        f(data.data.data)
        if (data.data.pro == true) {
            document.querySelector('#pro').innerHTML = 'You are a Pro...'
            let r = await axios.get('/pro')
            const table = document.createElement('table')
            const th = document.createElement('thead')
            let keys = Object.keys(r.data.data[0])
            for (let x of keys) {
                const td = document.createElement('td')
                td.innerHTML = x
                th.appendChild(td)
            }
            table.appendChild(th)
            for (let x of r.data.data) {
                let tr = protable(x)
                table.appendChild(tr)
            }
            document.querySelector('#dashboard').innerHTML = '<h1>LeaderBoard</h1><br/>'
            document.querySelector('#dashboard').appendChild(table)
        }

        let result = await axios.get('/dates',{
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        document.querySelector('#report').innerHTML = "exepenses from the past week"
        let table = document.createElement('table')
        const thead = document.createElement('thead')
        for(let x of Object.keys(result.data[0]))
        {
            const td = document.createElement('td')
            td.innerHTML = x;
            thead.appendChild(td)
        }
        table.appendChild(thead)
        for(let x of result.data)
        {
            const tr = protable(x)
            table.appendChild(tr)
        }
        document.querySelector('#report').appendChild(table)



        /** let d = await axios.get("/expenses", {
            headers: {
                Authorization: ` Bearer ${localStorage.getItem('token')}`
            }
        }) */

    }
    catch (e) {
        console.log(e)
    }
})

document.querySelector("#form").addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        let data = await axios.post('/expenses', {
            amount: e.target.n1.value,
            description: e.target.n2.value,
            category: e.target.n3.value
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        fobj(data.data)
    }
    catch (e) {
        console.log(e)
    }
})

const cashfree = Cashfree({
    mode: "sandbox",
});

document.getElementById("renderBtn").addEventListener("click", async () => {
    try {
        const response = await axios.post('/pay', {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        const { paymentSessionId, orderId } = response.data;
        let checkoutOptions = {
            paymentSessionId: paymentSessionId,
            redirectTarget: "_modal",
        };
        let result = await cashfree.checkout(checkoutOptions);
        if (result.error) {
            console.log("User has closed the popup or there is some payment error, Check for Payment Status");
            console.log(result.error);
        }
        if (result.redirect) {
            console.log("Payment will be redirected");
        }
        if (result.paymentDetails) {
            console.log("Payment has been completed, Check for Payment Status");
            console.log(result.paymentDetails.paymentMessage);
            const res = await axios.get(`/pay/payment-status/${orderId}`);
            console.log(res);
            alert('your payment is ' + res.data.status);
        }
    }
    catch (e) {
        console.log('Error:', e);
    }
});

document.querySelector('#ask').addEventListener('submit', async (event) => {
    try {
        event.preventDefault()
        const r = await axios.post('/ask', {
            prompt: event.target.prompt.value
        })
        console.log(r)
        document.querySelector('#show').innerHTML = r.data
    }
    catch (e) {
        console.log(e)
    }
})