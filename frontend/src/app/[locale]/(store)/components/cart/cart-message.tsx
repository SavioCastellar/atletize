'use client'

import { DrawerDescription, DrawerTitle } from "@/components/ui/drawer"
import { useCartStore } from "@/lib/client-store"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"

export default function CartMessage() {
  const { checkoutProgress, setCheckoutProgress } = useCartStore()

  return (
    <motion.div
      animate={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: 10 }}
    >
      <DrawerTitle>
        {checkoutProgress === 'cart-page' ? 'Itens do seu carrinho' : null}
        {checkoutProgress === 'payment-page' ? 'Escolha um método de pagamento' : null}
        {checkoutProgress === 'confirmation-page' ? 'Compra confirmada' : null}
      </DrawerTitle>
      <DrawerDescription className="py-1">
        {checkoutProgress === 'cart-page' ? 'Ver e editar itens do carrinho' : null}
        {checkoutProgress === 'payment-page' ?
          <span onClick={() => setCheckoutProgress('cart-page')} className="flex items-center justify-center gap-1 cursor-pointer hover:text-primary">
            <ArrowLeft size={14} />
            Voltar ao carrinho
          </span> :
          null
        }
        {checkoutProgress === 'confirmation-page' ? 'Compra confirmada' : null}
      </DrawerDescription>
    </motion.div>
  )

}
