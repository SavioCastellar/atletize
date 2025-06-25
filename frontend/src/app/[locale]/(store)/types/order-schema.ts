import * as z from 'zod'

export const createOrderSchema = z.object({
  total: z.number(),
  status: z.string(),
  products: z.array(
    z.object({
      productId: z.string(),
      variantId: z.string(),
      quantity: z.number(),
    })
  )
})
