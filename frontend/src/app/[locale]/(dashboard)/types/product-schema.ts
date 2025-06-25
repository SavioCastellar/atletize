import * as z from 'zod'

export const ProductSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3, {
    message: 'O nome deve ter no mínimo 3 caracteres'
  }),
  description: z.string(),
  price: z.coerce
  .number({
    invalid_type_error: 'O campo preço deve ser preenchido com um número'
  })
  .positive({
    message: 'O preço deve ser um número positivo'
  }),
  variants: z.array(z.string()),
  tags: z.array(z.string()).min(1, {
    message: 'Adicione pelo menos uma tag'
  }),
  images: z.array(z.object({
    url: z.string().refine((url) => url.search('blob:') !== 0, {
      message: 'Por favor, aguarde o carregamento da imagem'
    }),
    size: z.number(),
    key: z.string().optional(),
    id: z.number().optional(),
    name: z.string(),
  })),
})

export type zProductSchema = z.infer<typeof ProductSchema>
