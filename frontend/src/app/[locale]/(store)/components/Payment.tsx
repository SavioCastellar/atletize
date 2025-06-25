'use client'
import { Elements } from '@stripe/react-stripe-js'
import { motion } from 'framer-motion'
import getStripe from '../../../../../utils/get-stripe'
import PaymentForm from './PaymentForm'
import { useCartStore } from '@/lib/client-store'

const stripe = getStripe()

interface PaymentProps {
  userId: string
}

export default function Payment({ userId }: PaymentProps) {
  const { cart } = useCartStore()

  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.price * item.variant.quantity
  }, 0)

  const amountInCents = Math.round(totalPrice * 100)

  return (
    <motion.div>
      <Elements
        stripe={stripe}
        options={{
          mode: 'payment',
          currency: 'brl',
          amount: amountInCents,
        }}
      >
        <PaymentForm totalPrice={amountInCents} userId={userId} />
      </Elements>
    </motion.div>
  )
}
