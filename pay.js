const { Cashfree, CFEnvironment } = require("cashfree-pg"); 
const cashfree = new Cashfree(CFEnvironment.SANDBOX, "TEST430329ae80e0f32e41a393d78b923034", "TESTaf195616268bd6202eeb3bf8dc458956e7192a85");
const createOrder = async (orderId,orderAmount,orderCurrency,customerId,customerPhone)=>{
    try
    {
        const exp = new Date(Date.now() + 60*60*1000)
        const ed = exp.toISOString();
        const request = {
            "order_amount": orderAmount,
            "order_currency": orderCurrency,
            "order_id": orderId,
            "customer_details": {
                "customer_id": customerId,
                "customer_phone": customerPhone
            },
            "order_meta": {
                "return_url": `http://localhost:1000/pay/payment-status/${orderId}`,
                "payment_methods": "cc,dc,upi"
            },
            "order_expiry_time": ed
        };

        const response = await cashfree.PGCreateOrder(request);
        return response.data.payment_session_id;
    }
    catch(e)
    {
        return('Error in creating Order:', e)
    }
}

const getPaymentStatus = async (orderId) => {
    try
    {
        const response = await cashfree.PGOrderFetchPayments(orderId);
        let getOrderResponse = response.data;
        let orderStatus;

        if (getOrderResponse.filter(transaction => transaction.payment_status === "SUCCESS").length > 0) {
            orderStatus = "Success"
        } else if (getOrderResponse.filter(transaction => transaction.payment_status === "PENDING").length > 0) {
            orderStatus = "Pending"
        } else {
            orderStatus = "Failure"
        }
        return orderStatus;
    }
    catch(e)
    {
        console.error('Error fetching order status:',e.message);
        throw e;
    }
}

module.exports = {createOrder,getPaymentStatus}