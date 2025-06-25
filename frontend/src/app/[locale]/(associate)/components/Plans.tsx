'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import { loadStripe } from '@stripe/stripe-js'
import { toast } from 'sonner'
import axios from "axios"
import { Session } from 'next-auth'
import { motion } from 'framer-motion'
import { HiCheckBadge } from "react-icons/hi2"
import { IconType } from 'react-icons/lib'

type PlanName = "Bronze" | "Prata" | "Ouro"

type Plan = {
  priceId: string
  name: PlanName
  price: number
  description: string
  icon: IconType
  color: string
  bgGradient: string
}

const plans: Plan[] = [
  {
    priceId: process.env.NEXT_PUBLIC_BRONZE_PRICE_ID!,
    name: "Bronze",
    price: 30,
    description: "Perfeito para iniciantes",
    icon: HiCheckBadge,
    color: "text-orange-800",
    bgGradient: "from-gray-800 to-gray-700",
  },
  {
    priceId: process.env.NEXT_PUBLIC_PRATA_PRICE_ID!,
    name: "Prata",
    price: 50,
    description: "Para associados dedicados",
    icon: HiCheckBadge,
    color: "text-slate-300",
    bgGradient: "from-gray-800 to-gray-700",
  },
  {
    priceId: process.env.NEXT_PUBLIC_OURO_PRICE_ID!,
    name: "Ouro",
    price: 100,
    description: "Poder e suporte máximos",
    icon: HiCheckBadge,
    color: "text-yellow-300",
    bgGradient: "from-gray-800 to-gray-700",
  },
]

const features = [
  "Acesso a treinos exclusivos",
  "Descontos em ingressos",
  "Produtos oficiais",
  "Encontros com atletas",
  "Conteúdo exclusivo",
  "Participação em sorteios",
]

const planFeatures: Record<PlanName, Record<string, boolean>> = {
  Bronze: {
    "Acesso a treinos exclusivos": true,
    "Descontos em ingressos": true,
    "Produtos oficiais": false,
    "Encontros com atletas": false,
    "Conteúdo exclusivo": false,
    "Participação em sorteios": false,
  },
  Prata: {
    "Acesso a treinos exclusivos": true,
    "Descontos em ingressos": true,
    "Produtos oficiais": true,
    "Encontros com atletas": false,
    "Conteúdo exclusivo": false,
    "Participação em sorteios": false,
  },
  Ouro: {
    "Acesso a treinos exclusivos": true,
    "Descontos em ingressos": true,
    "Produtos oficiais": true,
    "Encontros com atletas": true,
    "Conteúdo exclusivo": true,
    "Participação em sorteios": true,
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.3 },
  },
}

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

interface PlansProps {
  session: Session | null
}


export default function Plans({ session }: PlansProps) {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

  const handleCheckout = async (priceId: string) => {
    try {
      const { data } = await axios.post(`/api/payments/create-checkout-session`,
        { userId: session?.id, email: session?.email, priceId })

      if (data.sessionId) {
        const stripe = await stripePromise
        const response = await stripe?.redirectToCheckout({
          sessionId: data.sessionId,
        })

        return response
      } else {
        console.error('Failed to create checkout session')
        toast('Failed to create checkout session')
        return
      }
    } catch (error) {
      console.error('Error during checkout:', error)
      toast('Error during checkout')
      return
    }
  }

  return (
    <div className='text-gray-300 p-3 lg:p-8'>
      <header className="text-center mb-16 flex flex-col items-center gap-5">
        <Image src='/logo-alt.png' alt='Logo' height={100} width={100} />
        <h1 className="text-5xl font-bold text-white">
          Planos de Sócio
        </h1>
        <p className="text-xl text-gray-400">
          Junte-se ao time e nos ajude a alcançar novos patamares
        </p>
      </header>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            variants={cardVariants}
            whileHover="hover"
          >
            <Card className={`bg-neutral-950/50 backdrop-blur-sm backdrop-filter border border-neutral-800 bg-opacity-60 shadow-xl transition-all duration-300`}>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                  <plan.icon className={`w-8 h-8 ${plan.color}`} />
                </div>
                <CardDescription className="text-gray-300">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold mb-6 text-white">
                  {plan.price}
                  <span className="text-lg font-normal text-gray-300">/mês</span>
                </p>
                <Button
                  className="w-full bg-white/10 hover:bg-white/20 text-white border-0"
                  onClick={() => handleCheckout(plan.priceId)}
                >
                  Selecionar plano
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Table className="w-full bg-neutral-950/50 backdrop-blur-sm backdrop-filter rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow className="border-b border-gray-700/50 hover:bg-transparent">
              <TableHead className="text-white">Benefícios</TableHead>
              {plans.map((plan) => (
                <TableHead key={plan.name} className="text-center text-white">{plan.name}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {features.map((feature) => (
              <motion.tr
                key={feature}
                variants={rowVariants}
              >
                <TableCell className="font-medium text-gray-300">{feature}</TableCell>
                {plans.map((plan) => (
                  <TableCell key={`${plan.name}-${feature}`} className="text-center">
                    <Badge variant="outline" className={`bg-transparent border-gray-600 ${planFeatures[plan.name][feature] ? 'text-emerald-500 font-bold' : 'text-gray-300/20'}`}>
                      {planFeatures[plan.name][feature] ? "✓" : "-"}
                    </Badge>
                  </TableCell>
                ))}
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  )
}
