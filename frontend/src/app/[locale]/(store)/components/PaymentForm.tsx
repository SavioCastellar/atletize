'use client'

import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/client-store"
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useState } from "react"
import { createPaymentIntent } from "../../../../../utils/create-payment-intent"
import { toast } from "sonner"
import { supabase } from "@/app/api/auth/supabase/client"

type PaymentFormProps = {
  totalPrice: number
  userId: string
}

export default function PaymentForm({ totalPrice, userId }: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const { cart, setCheckoutProgress, clearCart } = useCartStore()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const products = cart.map((item) => ({
    productId: item.id,
    quantity: item.variant.quantity,
    variantId: item.variant.variantId
  }))

  const handleSubmit = async (e: React.FormEvent) => {
    debugger
    e.preventDefault()
    setIsLoading(true)
    if (!stripe || !elements) {
      setIsLoading(false)
      return
    }
    const { error: submitError } = await elements.submit()
    if (submitError) {
      setErrorMessage(submitError.message!)
      setIsLoading(false)
      return
    }
    const { data } = await createPaymentIntent({
      amount: totalPrice,
      currency: 'brl',
      cart: cart.map((item) => ({
        quantity: item.variant.quantity,
        productId: item.id,
        title: item.name,
        price: item.price,
        image: item.image,
      })),
    })
    console.log('data', data)
    if (data?.error) {
      setErrorMessage(data.error)
      setIsLoading(false)
      return
    }
    if (data?.success) {
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret: data.success.clientSecretId!,
        redirect: 'if_required',
        confirmParams: {
          return_url: 'http://localhost:3000/success',
          receipt_email: data.success.user as string,
        }
      })
      if (error) {
        setErrorMessage(error.message!)
        setIsLoading(false)
        return
      } else {
        setIsLoading(false)
        const { data: order, error: orderError } = await supabase.from('orders').insert({
          total: totalPrice,
          status: 'pending',
          user_id: userId
        })
          .select().single()
        if (orderError) {
          setErrorMessage(orderError.message)
          return
        }

        const orderProductData = products.map((product) => ({
          quantity: product.quantity,
          order_id: order.id,
          product_id: product.productId,
          product_variant_id: product.variantId,
        }))

        const { error: orderProductError } = await supabase
          .from('order_product')
          .insert(orderProductData)

        if (orderProductError) {
          toast.error('Erro ao registrar produtos do pedido')
          return
        }
      }
      setCheckoutProgress('confirmation-page')
      clearCart()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <AddressElement options={{ mode: 'shipping' }} />
      <Button className='max-w-md my-4 w-full' disabled={!stripe || !elements || isLoading}>
        {isLoading ? 'Processando...' : 'Pagar agora'}
      </Button>
    </form>
  )
}
