import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  try {
    const { amount, name, email, message } = await req.json()

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'brl',
      payment_method_types: ['card'],
      metadata: {
        donor_name: name,
        donor_email: email,
        message: message
      },
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    return NextResponse.json({ error: 'Error creating payment intent' }, { status: 500 })
  }
}
