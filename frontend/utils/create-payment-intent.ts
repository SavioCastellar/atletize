'use server'

import Stripe from 'stripe'
import { createSafeActionClient } from 'next-safe-action'
import { paymentIntentSchema } from './types'
import { getServerSession } from 'next-auth'
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/auth'
import { redirect } from 'next/navigation'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const action = createSafeActionClient()

export const createPaymentIntent = action(paymentIntentSchema,
  async ({ amount, currency, cart }) => {
    const session = await getServerSession(nextAuthOptions)
    const user = session?.user
    if (!user) {
      redirect('/signin')
    }
    if (!amount) return {error: 'Nenhum produto selecionado.'}

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        cart: JSON.stringify(cart),
      },
    })

    return {
      success: {
        paymentIntentId: paymentIntent.id,
        clientSecretId: paymentIntent.client_secret,
        user: user.email,
      },
     }
  }
)
