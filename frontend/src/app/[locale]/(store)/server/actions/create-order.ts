'use server'

import { createSafeActionClient } from 'next-safe-action'
import { createOrderSchema } from '../../types/order-schema'
import { supabase } from '@/app/api/auth/supabase/client'
import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/auth'
import { getServerSession } from 'next-auth'

const action = createSafeActionClient()

export const createOrder = action(createOrderSchema, async ({ total, status, products }) => {
  const session = await getServerSession(nextAuthOptions)

  const {data: order} = await supabase.from('orders').insert({
    total,
    status,
    userId: session?.user?.id
  })
  .select()

  const orderId = order?.[0]?.id ?? null;

  const orderProducts = products.map(async ({productId, quantity, variantId}) => {
    const newOrderProduct = await supabase.from('order_product').insert({
      quantity,
      order_id: orderId,
      product_id: productId,
      product_variant_id: variantId
    })
  })
  return {
    success: 'Pedido criado com sucesso',
  }
})
