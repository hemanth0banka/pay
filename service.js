const { Cashfree, CFEnvironment } = require("cashfree-pg"); 

const cashfree = new Cashfree(CFEnvironment.SANDBOX, "TEST10839538fc619f7c161bf643d0bf83593801", "cfsk_ma_test_d93ed3f87aa52f81358c43effdc4a808_212ad9aa");

var request = {
    "order_amount": 1.00,
    "order_currency": "INR",
    "order_id": "devstudio_7331175337331175336",
    "customer_details": {
        "customer_id": "devstudio_user",
        "customer_phone": "9876543210",
        "customer_name": "Harshith",
        "customer_email": "test@cashfree.com"
    },
    "order_meta": {
        "return_url": "https://www.cashfree.com/devstudio/preview/pg/web/checkout?order_id={order_id}"
    },
    "order_expiry_time": "2025-10-15T09:06:42.830Z"
};

cashfree.PGCreateOrder(request).then((response) => {
    console.log('Order created successfully:',response.data);
}).catch((error) => {
    console.error('Error:', error.response.data.message);
});

module.exports = cashfree