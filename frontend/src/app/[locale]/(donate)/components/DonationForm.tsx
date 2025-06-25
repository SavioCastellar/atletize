"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js'
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const formSchema = z.object({
  amount: z.string().min(1, 'Informe o valor'),
  name: z.string().min(2, 'Informe o nome'),
  email: z.string().email('Informe o email'),
  message: z.string().min(2, 'Deixe uma mensagem'),
})

const presetAmounts = [10, 25, 50, 100]

export default function DonationFormWrapper() {
  const options: StripeElementsOptions = {
    // Any options you need
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <DonationForm />
    </Elements>
  )
}

function DonationForm() {
  const [loading, setLoading] = useState(false)

  const stripe = useStripe()
  const elements = useElements()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '10',
    },
  })

  const amountValue = watch('amount', '10')

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!stripe || !elements) {
      console.error('Stripe.js has not loaded yet.')
      return
    }

    try {
      setLoading(true)

      const response = await fetch('/api/payments/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(data.amount),
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      })

      const { clientSecret } = await response.json()

      const cardElement = elements.getElement(CardElement)

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement!,
          billing_details: {
            name: data.name,
            email: data.email,
          },
        },
      })

      if (error) {
        throw new Error(error.message)
      }

      // Optionally redirect or display a success message here
    } catch (error) {
      console.error('Payment failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePresetAmount = (amount: number) => {
    setValue('amount', amount.toString())
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <Label className="text-lg font-semibold">Selecione o valor</Label>
        <RadioGroup
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          defaultValue="10" // Default preset amount set to 10
        >
          {presetAmounts.map((amount) => (
            <div key={amount}>
              <RadioGroupItem
                value={amount.toString()}
                id={`amount-${amount}`}
                className="peer sr-only"
                onClick={() => handlePresetAmount(amount)}
              />
              <Label
                htmlFor={`amount-${amount}`}
                className="flex items-center justify-center px-4 py-3 border-2 rounded-lg cursor-pointer
                      peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900
                      hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                R$ {amount}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div>
          <Label htmlFor="custom-amount">Outro valor</Label>
          <div className="relative mt-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">R$</span>
            <Input
              {...register('amount')}
              id="custom-amount"
              type="number"
              step="0.10"
              min="1"
              variant="forms"
              placeholder="Informe a quantia"
              className="pl-9"
            />
          </div>
          {errors.amount && (
            <p className="text-sm text-red-500 mt-1">{errors.amount.message}</p>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input
              {...register('name')}
              id="name"
              variant="forms"
              placeholder="João da Silva"
              className="mt-1"
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              {...register('email')}
              id="email"
              type="email"
              variant="forms"
              placeholder="joao@exemplo.com"
              className="mt-1"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Create a field for user to let a message */}
          <div>
            <Label htmlFor="message">Mensagem</Label>
            <Input
              {...register('message')}
              id="message"
              variant="forms"
              placeholder="Deixe uma breve mensagem"
              className="mt-1"
            />
          </div>

          {/* Include CardElement */}
          <div>
            <Label htmlFor="card-element">Cartão de crédito ou débito</Label>
            <div className="mt-1">
              <CardElement id="card-element" />
            </div>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full py-6 text-lg" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processando...
          </>
        ) : (
          `Doar R$ ${amountValue || ''}`
        )}
      </Button>
    </form>
  )
}
