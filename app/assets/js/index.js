import { getUrlVars } from './core/features.js';
import '../css/override.css';
import '../css/styles.css';
import '../css/modal.css';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // for React and Vue
const notyf = new Notyf();
import '@fortawesome/fontawesome-free/js/all';
import { loadStripe } from '@stripe/stripe-js';
import 'bootstrap/js/dist/modal';

async function load() {
    let paramater = getUrlVars()['payment'];
    if (paramater === 'success') {
        notyf.success('You successfully paid. Thank you for your support.');
    }
    if (paramater === 'canceled') {
        notyf.error('Your payment was canceled.');
    }

    const stripe = await loadStripe(
        'pk_live_DG2IMIp7QYpSiuiTFvQI7ZFW00OEARkk0s',
    );

    let buyButton = document.getElementsByClassName('stripe-buy-button');

    if (buyButton.length !== 0) {
        for (var i = 0; i < buyButton.length; i++) {
            buyButton[i].addEventListener('click', function () {
                // When the customer clicks on the button, redirect
                // them to Checkout.
                notyf.success('Loading Stripe...');
                stripe
                    .redirectToCheckout({
                        items: [
                            {
                                plan: 'plan_GWiDO5WS3j8fNG',
                                quantity: 1,
                            },
                        ],
                        successUrl: 'https://removemyporn.com?payment=success',
                        cancelUrl: 'https://removemyporn.com/?payment=canceled',
                    })
                    .then(function (result) {
                        if (result.error) {
                            notyf.error(result.error.message);
                        }
                    });
            });
        }
    }
}

load();

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/service-worker.js')
            .then((registration) => {
                //   console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                //    console.log('SW registration failed: ', registrationError);
            });
    });
}
