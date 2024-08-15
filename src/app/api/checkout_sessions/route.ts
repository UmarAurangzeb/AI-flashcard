// src/app/api/checkout_sessions/route.ts

import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

export async function POST(request: Request) {
  try {
    // Create a new checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Flashcard Subscription',
            },
            unit_amount: 1000, // 10 USD
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.url}/success`,
      cancel_url: `${request.url}/cancel`,
    });

    // Respond with the session ID
    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    console.error('Error creating checkout session:', err);
    return NextResponse.json({ statusCode: 500, message: err.message }, { status: 500 });
  }
}