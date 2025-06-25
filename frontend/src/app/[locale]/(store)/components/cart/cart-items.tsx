'use client'

import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useCartStore } from '@/lib/client-store'
import formatPrice from '@/lib/format-price'
import { MinusCircle, PlusCircle } from 'lucide-react'
import Image from 'next/image'
import { useMemo } from 'react'
import Lottie from 'lottie-react'
import emptyCart from '../../../../../../public/empty-cart.json'
import { AnimatePresence, motion } from 'framer-motion'
import { createId } from '@paralleldrive/cuid2'
import { Button } from '@/components/ui/button'

export default function CartItems() {
  const { cart, addToCart, removeFromCart, setCheckoutProgress } = useCartStore()

  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => {
      return acc + item.variant.quantity * item.price!
    }, 0)
  }, [cart])

  const priceInLetters = useMemo(() => {
    return [...totalPrice.toFixed(2).toString()].map((letter) => {
      return { letter, id: createId() }
    })
  }, [totalPrice])

  return (
    <div className='flex flex-col justify-center items-center w-full lg:w-[70%]'>
      {cart.length === 0 && (
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className='text-xl text-muted-foreground text-center'>
            Seu carrinho está vazio
          </h2>
          <Lottie className='h-64' animationData={emptyCart} />
        </motion.div>
      )}
      {cart.length > 0 && (
        <div className='h-88 overflow-y-auto flex flex-col items-center w-full'>
          <Table className='mx-auto'>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Opção</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead className="text-center">Imagem</TableHead>
                <TableHead className="text-center">Qtd</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell><Badge>{item.variant.name}</Badge></TableCell>
                  <TableCell>{formatPrice(item.price * item.variant.quantity)}</TableCell>
                  <TableCell className="flex justify-center">
                    <Image
                      className='rounded-md'
                      src={item.image}
                      width={48}
                      height={48}
                      alt='Produto'
                      priority
                    />
                  </TableCell>
                  <TableCell className="text-center w-[100px]">
                    <div className='flex items-center justify-between'>
                      <MinusCircle
                        className='cursor-pointer'
                        size={14}
                        onClick={() => {
                          removeFromCart({
                            ...item,
                            variant: {
                              name: item.variant.name,
                              quantity: 1,
                              variantId: item.variant.variantId,
                            }
                          })
                        }} />
                      <p className='text-md font-bold'>
                        {item.variant.quantity}
                      </p>
                      <PlusCircle
                        className='cursor-pointer'
                        size={14}
                        onClick={() => {
                          addToCart({
                            ...item,
                            variant: {
                              name: item.variant.name,
                              quantity: 1,
                              variantId: item.variant.variantId
                            }
                          })
                        }} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table >
          <motion.div className='flex items-center justify-center overflow-hidden relative my-4'>
            <span className='text-md'>
              Total: R$
            </span>
            <AnimatePresence mode='popLayout'>
              {priceInLetters.map((letter, i) => (
                <motion.div key={letter.id}>
                  <motion.span
                    key={letter.id}
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    exit={{ y: -20 }}
                    transition={{ delay: i * 0.1 }}
                    className='text-md inline-block'
                  >
                    {letter.letter}
                  </motion.span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          <Button
            onClick={() => setCheckoutProgress('payment-page')}
            className='max-w-xs w-full'
            disabled={cart.length === 0}
          >
            Continuar
          </Button>
        </div>
      )}
    </div>
  )
}
