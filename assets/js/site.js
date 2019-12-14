(function () {
    var stripe = Stripe('pk_live_DG2IMIp7QYpSiuiTFvQI7ZFW00OEARkk0s');

    var checkoutButton = document.getElementById('checkout-button-sku_GM90b9Aye3tpwj');
    checkoutButton.addEventListener('click', function () {
        // When the customer clicks on the button, redirect
        // them to Checkout.
        toastr.info('Loading Stripe...');
        stripe.redirectToCheckout({
                items: [{
                    sku: 'sku_GM90b9Aye3tpwj',
                    quantity: 1
                }],
                // Do not rely on the redirect to the successUrl for fulfilling
                // purchases, customers may not always reach the success_url after
                // a successful payment.
                // Instead use one of the strategies described in
                // https://stripe.com/docs/payments/checkout/fulfillment
                successUrl: 'https://removemyporn.com?payment=success',
                cancelUrl: 'https://removemyporn.com/?payment=canceled',
            })
            .then(function (result) {
                if (result.error) {
                    toastr.error(result.error.message);
                }
            });
    });
})();

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}


var paramater = getUrlVars()["payment"];

console.log(paramater);
if (paramater === 'success') {
    toastr.success('You successfully paid. Thank you for your support.', 'Remove my P**n', {
        timeOut: 5000
    })
}
if (paramater === 'canceled') {
    toastr.error('Your payment was canceled.', 'Remove my P**n', {
        timeOut: 5000
    })
}