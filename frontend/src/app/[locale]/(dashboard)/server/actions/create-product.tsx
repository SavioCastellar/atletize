'use server'

import { createSafeActionClient } from "next-safe-action"
import { ProductSchema } from "../../types/product-schema"
import { supabase } from "@/app/api/auth/supabase/client"

const action = createSafeActionClient()

export const createProduct = action(
  ProductSchema,
  async ({
    id,
    name,
    description,
    price
  }) => {
    try {
      if (id) {
        const currentProduct = await supabase.from('products').select('*').eq('id', id)
        if (!currentProduct) return { error: 'Produto não encontrado' }
        await supabase.from('products').update({
          name,
          description,
          price
        }).eq('id', id)
        return { success: 'Produto atualizado com sucesso' }
      }
      if (!id) {
        await supabase.from('products').insert({
          name,
          description,
          price
        })
        return { success: 'Produto criado com sucesso' }
      }

    } catch (error) {
      return { error: 'Erro ao criar produto' }
    }
  }
)
