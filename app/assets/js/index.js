import {
    getUrlVars
} from './core/features.js';
import '../css/override.css';
import '../css/styles.css';
import '../css/modal.css';
import {
    Notyf
} from 'notyf';
import 'notyf/notyf.min.css'; // for React and Vue
const notyf = new Notyf();
import '@fortawesome/fontawesome-free/js/all';

import 'bootstrap/js/dist/modal';

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

        var checkoutButton = document.getElementById('checkout-button-plan_GWiDO5WS3j8fNG');
        checkoutButton.addEventListener('click', function () {
            // When the customer clicks on the button, redirect
            // them to Checkout.
            notyf.success('Loading Stripe...');
            stripe.redirectToCheckout({
                items: [{plan: 'plan_GWiDO5WS3j8fNG', quantity: 1}],
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



    (function() {
        var stripe2 = Stripe('pk_live_DG2IMIp7QYpSiuiTFvQI7ZFW00OEARkk0s');
      
        var checkoutButton2 = document.getElementById('checkout-button-plan_GWkfQn9TjE83kD');
        checkoutButton2.addEventListener('click', function () {
          // When the customer clicks on the button, redirect
          // them to Checkout.
          notyf.success('Loading Stripe...');
          stripe2.redirectToCheckout({
            items: [{plan: 'plan_GWkfQn9TjE83kD', quantity: 1}],
      
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