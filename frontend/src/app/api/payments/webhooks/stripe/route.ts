
import { supabase } from "@/app/api/auth/supabase/client"
import { NextRequest } from "next/server"
import Stripe from "stripe"

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET)
  } catch (err: any) {
    console.error('Webhook signature verification failed.', err.message)
    return new Response(`Webhook error: ${err.message}`, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event)
        break

      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }
  } catch (error) {
    console.error('Error during webhook event:', error)
    return new Response('Webhook error', { status: 400 })
  }

  return new Response('Webhook received', { status: 200 })
}

async function handleCheckoutSessionCompleted(event: Stripe.Event) {
  const session = await stripe.checkout.sessions.retrieve(
    (event.data.object as Stripe.Checkout.Session).id,
    {
      expand: ['line_items'],
    }
  )
  const customerId = session.customer as string
  const customerDetails = session.customer_details

  if (customerDetails?.email) {
    const {data: user} = await supabase.from('users').select('*').eq('email', customerDetails.email).single()

    console.log('user', user)

    if (!user) throw new Error('Usuário não encontrado')

    if (!user.customer_id) {
      await supabase
        .from('users')
        .update({customer_id: customerId})
        .eq('id', user.id)
    }

    const lineItems = session.line_items?.data || []

    for (const item of lineItems) {
      const priceId = item.price?.id
      const isSubscription = item.price?.type === 'recurring'

      if (isSubscription) {
        let endDate = new Date()
        endDate.setMonth(endDate.getMonth() + 1)

        const {data: subscriptionUpsert} = await supabase
          .from('subscriptions')
          .upsert(
            {
              user_id: user.id,
              start_date: new Date(),
              end_date: endDate,
              updated_at: new Date(),
              plan:
              priceId === process.env.NEXT_PUBLIC_BRONZE_PRICE_ID ? 'bronze'
              : priceId === process.env.NEXT_PUBLIC_PRATA_PRICE_ID ? 'prata'
              : 'ouro',
              created_at: new Date(),
            },
            {onConflict: 'user_id'}
          )
          .select()

        const subscriptionId = subscriptionUpsert?.[0]?.id
        console.log('subscriptionId', subscriptionId)

        console.log('subscriptionUpsert', subscriptionUpsert)

        const {data: userUpdate} = await supabase
          .from('users')
          .update({
            plan: priceId === process.env.NEXT_PUBLIC_BRONZE_PRICE_ID ? 'bronze'
            : priceId === process.env.NEXT_PUBLIC_PRATA_PRICE_ID ? 'prata'
            : 'ouro',
            subscription: subscriptionId,
            updated_at: new Date(),
          })
          .eq('id', user.id)

          console.log('userUpdate', userUpdate)

      } else {
        // one_time_purchase
      }
    }
  }
}

async function handlePaymentIntentSucceeded(event: Stripe.Event) {
  const paymentIntent = event.data.object as Stripe.PaymentIntent

  const amount = paymentIntent.amount_received
  const metadata = paymentIntent.metadata
  const donorName = metadata.donor_name || 'Anônimo'
  const donorEmail = metadata.donor_email || ''
  const message = metadata.message || ''

  const { data, error } = await supabase.from('donations').insert([
    {
      amount,
      name: donorName,
      email: donorEmail,
      message,
    },
  ])

  if (error) {
    console.error('Error inserting donation:', error)
  } else {
    console.log('Donation saved:', data)
  }
}
