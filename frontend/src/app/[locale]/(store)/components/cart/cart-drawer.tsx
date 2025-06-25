'use client'

import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer"
import { useCartStore } from "@/lib/client-store"
import { AnimatePresence, motion } from "framer-motion"
import { ShoppingBag } from "lucide-react"
import CartItems from "./cart-items"
import CartMessage from "./cart-message"
import Payment from "../Payment"
import OrderConfirmed from "./order-confirmed"

interface CartDrawerProps {
  userId: string
}

export default function CartDrawer({ userId }: CartDrawerProps) {
  const { cart, checkoutProgress } = useCartStore()
  return (
    <Drawer>
      <DrawerTrigger>
        <div className="relative px-2">
          <AnimatePresence>
            {cart.length > 0 && (
              <motion.span
                animate={{ scale: 1, opacity: 1 }}
                initial={{ scale: 0, opacity: 0 }}
                exit={{ scale: 0 }}
                className="absolute flex justify-center items-center -top-1 -right-3 w-5 h-5 bg-red-400/80 text-xs font-bold rounded-full"
              >
                {cart.length}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <ShoppingBag className="relative size-6 hover:scale-90 transition-all duration-200 text-black cursor-pointer" />
      </DrawerTrigger>
      <DrawerContent className="flex items-center min-h-50vh">
        <DrawerHeader>
          <CartMessage />
        </DrawerHeader>
        <div className='overflow-auto p-1 w-full flex items-center justify-center'>
          {checkoutProgress === 'cart-page' && <CartItems />}
          {checkoutProgress === 'payment-page' && <Payment userId={userId} />}
          {checkoutProgress === 'confirmation-page' && <OrderConfirmed />}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
