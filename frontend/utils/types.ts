import { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './database.types'
import * as z from 'zod'

export type TypedSupabaseClient = SupabaseClient<Database>

export const paymentIntentSchema = z.object({
  amount: z.number(),
  currency: z.string(),
  cart: z.array(
    z.object({
      quantity: z.number(),
      productId: z.string(),
      title: z.string(),
      price: z.number(),
      image: z.string(),
    })
  ),
})
