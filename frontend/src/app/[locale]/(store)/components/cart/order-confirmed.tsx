'use client'

import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/client-store"
import Link from "next/link"
import Lottie from 'lottie-react'
import confirmation from '../../../../../../public/confirmation.json'
import { motion } from "framer-motion"

export default function OrderConfirmed() {
  const { setCheckoutProgress } = useCartStore()
  return (
    <div className='flex flex-col items-center gap-4'>
      <h2 className="text-2xl font-medium">Obrigado pela compra!</h2>
      <Link href={'/meus-pedidos'}>
        <Button onClick={() => {
          setCheckoutProgress('cart-page')
        }}>
          Confira seu pedido
        </Button>
      </Link>
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0 }}
        transition={{ delay: 0.35 }}
      >
        <Lottie className="h-48" animationData={confirmation} />
      </motion.div>
    </div>
  )
}
