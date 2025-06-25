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
import { Dialog, Transition } from '@headlessui/react'
import { Input } from "@/components/ui/input"
import { FaBrazilianRealSign } from "react-icons/fa6"
import Tiptap from "@/components/tiptap"
import { zodResolver } from "@hookform/resolvers/zod"
import { supabase } from "@/app/api/auth/supabase/client"
import { toast } from "sonner"
import { Fragment, useEffect, useState } from "react"
import { InputTags } from "./input-tags"
import InputImages from "./input-images"
import { deleteImagesOnServer } from "../../../server/actions/delete-files"

interface EditarProdutoProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  productId: string
}

export default function EditarProduto({ isOpen, setIsOpen, productId }: EditarProdutoProps) {
  const [product, setProduct] = useState<zProductSchema>({} as zProductSchema)
  const [initialDataLoaded, setInitialDataLoaded] = useState<boolean>(false)

  const form = useForm<zProductSchema>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      tags: [],
      variants: [],
      images: [],
    },
    mode: 'onChange',
  })

  useEffect(() => {
    if (isOpen && productId && !initialDataLoaded) {
      fetchProduct()
    }
  }, [isOpen, productId, initialDataLoaded])

  const fetchProduct = async () => {
    const { data: product, error } = await supabase
      .from('products')
      .select(`
        *,
        product_variants (
          name,
          order
        ),
        product_tags (
          tag
        ),
        product_images (
          url,
          size,
          name,
          order,
          key
        )
      `)
      .eq('id', productId)
      .single()

    if (error) {
      toast.error('Erro ao buscar produto')
      return
    }

    if (product) {
      form.setValue('name', product.name)
      form.setValue('description', product.description)
      form.setValue('price', product.price)
      form.setValue('tags', product.product_tags.map((tag: any) => tag.tag))
      form.setValue('variants', product.product_variants.map((variant: any) => variant.name))
      form.setValue('images', product.product_images)
      setProduct(product)
    }

    setInitialDataLoaded(true)
  }

  const onSubmit = async (data: zProductSchema) => {
    // Update the main product data
    const { error: productError } = await supabase
      .from('products')
      .update({
        name: data.name,
        description: data.description,
        price: data.price,
      })
      .eq('id', productId)

    if (productError) {
      toast.error('Erro ao atualizar produto')
      return
    }

    // Handle Tags
    const { error: deleteTagsError } = await supabase
      .from('product_tags')
      .delete()
      .eq('product_id', productId)

    if (deleteTagsError) {
      toast.error('Erro ao deletar tags do produto')
      return
    }

    if (data.tags?.length > 0) {
      const tagsInsert = data.tags.map((tag) => ({
        tag: tag,
        product_id: productId,
      }))

      const { error: tagsError } = await supabase
        .from('product_tags')
        .insert(tagsInsert)

      if (tagsError) {
        toast.error('Erro ao atualizar tags do produto')
        return
      }
    }

    // Handle Variants
    const { error: deleteVariantsError } = await supabase
      .from('product_variants')
      .delete()
      .eq('product_id', productId)

    if (deleteVariantsError) {
      toast.error('Erro ao deletar variantes do produto')
      return
    }

    if (data.variants?.length > 0) {
      const variantsInsert = data.variants.map((variant, index) => ({
        name: variant,
        order: index,
        product_id: productId,
        created_at: new Date(),
      }))

      const { error: variantsError } = await supabase
        .from('product_variants')
        .insert(variantsInsert)

      if (variantsError) {
        toast.error('Erro ao atualizar variantes do produto')
        return
      }
    }

    // Fetch existing images from the database
    const { data: existingImages, error: fetchImagesError } = await supabase
      .from('product_images')
      .select('key')
      .eq('product_id', productId)

    if (fetchImagesError) {
      toast.error('Erro ao obter imagens existentes do produto')
      return
    }

    // Get the keys of images submitted in the form
    const submittedImageKeys = data.images?.map((image) => image.key)

    // Determine which images have been removed and extract their keys
    const removedImageKeys = existingImages
      ?.filter((image) => !submittedImageKeys?.includes(image.key))
      .map((image) => image.key)

    // Delete removed images from Uploadthing
    if (removedImageKeys && removedImageKeys.length > 0) {
      try {
        await deleteImagesOnServer(removedImageKeys)
      } catch (error) {
        console.error('Error deleting images from UploadThing:', error)
        toast.error('Erro ao deletar as imagens do produto')
      }
    }

    // Handle Images
    const { error: deleteImagesError } = await supabase
      .from('product_images')
      .delete()
      .eq('product_id', productId)

    if (deleteImagesError) {
      toast.error('Erro ao deletar imagens do produto')
      return
    }

    if (data.images?.length > 0) {
      const imagesInsert = data.images.map((image, index) => ({
        url: image.url,
        size: image.size,
        name: image.name,
        order: index,
        product_id: productId,
        key: image.key,
      }))

      const { error: imagesError } = await supabase
        .from('product_images')
        .insert(imagesInsert)

      if (imagesError) {
        toast.error('Erro ao atualizar imagens do produto')
        return
      }
    }

    // Success
    toast.success('Produto atualizado com sucesso')
    closeModal()
  }


  const closeModal = () => {
    setIsOpen(false)
    form.reset()
    setInitialDataLoaded(false)
  }


  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={closeModal}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        {/* Modal content */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="flex flex-col w-full max-w-lg h-auto transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <div className='flex flex-col'>
                  <Dialog.Title
                    as="h3"
                    className="flex justify-center text-lg font-medium leading-6 text-gray-900"
                  >
                    Editar Produto
                  </Dialog.Title>
                  <div className='w-full pb-2'>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Name Field */}
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel
                                className={`${field.value === product.name ? 'text-muted-foreground opacity-80' : 'text-foreground'}`}
                              >
                                Nome
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  variant="forms"
                                  className={`${field.value === product.name ? 'text-muted-foreground bg-slate-100 opacity-60' : 'text-foreground bg-white'}`}
                                  id="name"
                                  placeholder="Nome do produto"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* Description Field */}
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel
                                className={`${field.value === product.description ? 'text-muted-foreground opacity-80' : 'text-foreground'}`}
                              >
                                Descrição
                              </FormLabel>
                              <FormControl>
                                <Tiptap
                                  value={field.value}
                                  valueDB={product.description}
                                  placeholder="Descrição do produto"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* Price Field */}
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel
                                className={`${field.value === product.price ? 'text-muted-foreground opacity-80' : 'text-foreground'}`}
                              >
                                Preço
                              </FormLabel>
                              <FormControl>
                                <div className="flex items-center gap-2">
                                  <FaBrazilianRealSign
                                    size={32}
                                    className={`p-2 bg-background rounded-md ${field.value === product.price ? 'text-muted-foreground' : 'text-foreground'}`}
                                  />
                                  <Input
                                    {...field}
                                    className={`${field.value === product.price ? 'text-muted-foreground bg-slate-100 opacity-60' : 'text-foreground bg-white'}`}
                                    variant="forms"
                                    type="number"
                                    placeholder="Preço do produto"
                                    step={0.10}
                                    min={0}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* Tags Field */}
                        <FormField
                          control={form.control}
                          name="tags"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tags</FormLabel>
                              <FormControl>
                                <InputTags
                                  {...field}
                                  onChange={field.onChange}
                                  placeholder="Adicionar tag"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* Variants Field */}
                        <FormField
                          control={form.control}
                          name="variants"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Variantes</FormLabel>
                              <FormControl>
                                <InputTags
                                  {...field}
                                  onChange={field.onChange}
                                  placeholder="Adicionar variante"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* Images Field */}
                        <InputImages />
                        {/* Submit Button */}
                        <Button
                          disabled={
                            !form.formState.isValid ||
                            form.formState.isSubmitting
                          }
                          type="submit"
                        >
                          Salvar
                        </Button>
                      </form>
                    </Form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
