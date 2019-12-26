import {
    getUrlVars
} from './core/features.js';
import '../css/override.css';
import '../css/styles.css';
import {
    Notyf
} from 'notyf';
import 'notyf/notyf.min.css'; // for React and Vue
const notyf = new Notyf();


async function load() {
    let paramater = getUrlVars()["payment"];
    if (paramater === 'success') {
        notyf.success('You successfully paid. Thank you for your support.')
    }
    if (paramater === 'canceled') {
        notyf.error('Your payment was canceled.')
    }


    (function () {
        var stripe = Stripe('pk_live_DG2IMIp7QYpSiuiTFvQI7ZFW00OEARkk0s');

        var checkoutButton = document.getElementById('checkout-button-sku_GM90b9Aye3tpwj');
        checkoutButton.addEventListener('click', function () {
            // When the customer clicks on the button, redirect
            // them to Checkout.
            notyf.success('Loading Stripe...');
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
                        notyf.error(result.error.message);
                    }
                });
        });
    })();


}


load();

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}