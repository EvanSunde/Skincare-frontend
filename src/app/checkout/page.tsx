'use client'
import React from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';

const Page = () => {
  const handleClick = async () => {
    // Load Stripe instance
    const stripe: Stripe | null = await loadStripe('pk_test_51OZ9d9Kc8LmZXQQ91uQkILNU8YMGVAfW5SfxVAg0FFP2yZCJuxjR9wLmPrSjpRRJeuBtoCR4nWE29Bj2j0B876oX00KSA2updT');

    if (!stripe) {
      console.error('Failed to load Stripe.');
      return;
    }

    // Open Checkout with a Session ID from your server
    const { error } = await stripe.redirectToCheckout({
        sessionId: '9969', // Replace with an actual Session ID as a string
    });

    if (error) {
      console.error('Error redirecting to Checkout:', error);
    }
  };

  return (
    <button onClick={handleClick}>Click Stripe</button>
  );
};

export default Page;
