import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  const { userId, email, priceId } = await req.json()

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { userId, email },
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/carteirinha`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/`,
      allow_promotion_codes: true,
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error("Error creating checkout session:", error)

    return NextResponse.json({ error: "Failed to create checkout session" })
  }
}
