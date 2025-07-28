import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements } from '@stripe/react-stripe-js';

// Test publishable key (replace with your own for real projects)
const stripePromise = loadStripe('pk_test_51N8Qw2JvQw2JvQw2JvQw2JvQw2JvQw2JvQw2JvQw2JvQw2JvQw2JvQw2JvQw2JvQw2JvQw2JvQw2JvQw2JvQw2JvQw2JvQw2Jv00testkey');

function StripeButtonInner() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const { error } = await stripe.redirectToCheckout({
        lineItems: [{ price: 'price_1N8Qw2JvQw2JvQw2JvQw2JvQw', quantity: 1 }], // Replace with your test price ID
        mode: 'payment',
        successUrl: window.location.origin + '/?success=true',
        cancelUrl: window.location.origin + '/?canceled=true',
      });
      if (error) setError(error.message);
    } catch (err) {
      setError('Stripe Checkout failed.');
    } finally {
      setLoading(false);
    }
  };

  // Optionally, display a success message if redirected back with ?success=true
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      setSuccess(true);
      window.history.replaceState({}, document.title, window.location.pathname); // Clean URL
    }
  }, []);

  return (
    <div style={{ textAlign: 'center', margin: '2rem 0' }}>
      <button
        className="btn btn-primary"
        onClick={handleClick}
        disabled={!stripe || loading}
        aria-label="Pay with Stripe"
        style={{ minWidth: 200 }}
      >
        {loading ? 'Redirecting...' : 'Pay with Stripe (Test)'}
      </button>
      {success && (
        <div
          style={{
            marginTop: 16,
            padding: '12px 18px',
            borderRadius: 8,
            background: '#e6f9ec',
            color: '#137333',
            border: '1px solid #b2e2cd',
            display: 'inline-block',
            fontWeight: 600,
          }}
          role="alert"
        >
          ✅ Payment successful! Thank you for your support.
        </div>
      )}
      {error && (
        <div style={{ color: '#c62828', marginTop: 8, fontWeight: 500 }} role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

export default function StripeCheckoutButton() {
  return (
    <Elements stripe={stripePromise}>
      <StripeButtonInner />
    </Elements>
  );
}