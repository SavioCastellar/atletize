'use client'

import { useForm } from "react-hook-form"
import { zProductSchema, ProductSchema } from '../../../types/product-schema'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FaBrazilianRealSign } from "react-icons/fa6"
import Tiptap from "@/components/tiptap"
import { zodResolver } from "@hookform/resolvers/zod"
import { supabase } from "@/app/api/auth/supabase/client"
import { toast } from "sonner"
import { InputTags } from "./input-tags"
import InputImages from "./input-images"

interface NovoProdutoProps {
  onClose: () => void
}

export const NovoProduto = ({ onClose }: NovoProdutoProps) => {
  const form = useForm<zProductSchema>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      tags: [],
      variants: []
    },
    mode: 'onChange',
  })

  const onSubmit = async (data: zProductSchema) => {
    // Insert the main product into the 'products' table
    const { data: productData, error: productError } = await supabase.from('products').insert({
      name: data.name,
      description: data.description,
      price: data.price,
    }).select('id').single() // Select the ID of the newly created product

    if (productError) {
      toast.error('Erro ao criar produto')
      return
    }

    const productId = productData.id // Get the product ID for related table inserts

    // Insert into product_variants
    if (data.variants?.length > 0) {
      const variantsInsert = data.variants.map((variant, index) => ({
        name: variant,
        created_at: new Date(),
        product_id: productId,
        order: index // Assuming the order is the index in the array
      }))

      const { error: variantsError } = await supabase.from('product_variants').insert(variantsInsert)
      if (variantsError) {
        toast.error('Erro ao criar variantes do produto')
        return
      }
    }

    // Insert into product_images
    if (data.images?.length > 0) {
      const imagesInsert = data.images.map((image, index) => ({
        url: image.url,
        size: image.size,
        name: image.name,
        order: index,
        product_id: productId,
        key: image.key
      }))

      const { error: imagesError } = await supabase.from('product_images').insert(imagesInsert)
      if (imagesError) {
        toast.error('Erro ao criar imagens do produto')
        return
      }
    }

    // Insert into product_tags
    if (data.tags?.length > 0) {
      const tagsInsert = data.tags.map(tag => ({
        tag: tag,
        product_id: productId
      }))

      const { error: tagsError } = await supabase.from('product_tags').insert(tagsInsert)
      if (tagsError) {
        toast.error('Erro ao criar tags do produto')
        return
      }
    }

    // If all inserts are successful
    toast.success('Produto criado com sucesso')
    onClose()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input variant="forms" placeholder="Nome do produto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Tiptap
                  value={field.value}
                  valueDB=""
                  placeholder='Descrição do produto'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <FaBrazilianRealSign size={32} className="p-2 bg-background rounded-md" />
                  <Input {...field} variant="forms" type="number" placeholder="Preço do produto" step={0.10} min={0} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <InputTags
                  {...field}
                  onChange={(e) => field.onChange(e)}
                  placeholder="Adicionar tag"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="variants"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Variantes</FormLabel>
              <FormControl>
                <InputTags
                  {...field}
                  onChange={(e) => field.onChange(e)}
                  placeholder="Adicionar variante"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <InputImages />
        <Button
          disabled={
            !form.formState.isValid ||
            form.formState.isSubmitting
          }
          type="submit"
        >
          Criar
        </Button>
      </form>
    </Form>
  )
}
