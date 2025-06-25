import React from 'react'
import { Header } from '@/app/[locale]/(landing-page)/components'
import { supabase } from '@/app/api/auth/supabase/client'
import { toast } from 'sonner'
import ProductDetails from '../../../components/ProductDetails'

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      product_variants!product_variants_product_id_fkey (
        id,
        name,
        order,
        product_id,
        created_at,
        updated_at
      ),
      product_images!product_images_product_id_fkey (
        id,
        url,
        size,
        name,
        key
      ),
      product_tags!product_tags_product_id_fkey (
        id,
        tag
      )
    `)
    .eq('id', params.id)
    .single()

  if (error) {
    toast.error('Produto não encontrado')
    return
  }

  const tags = product.product_tags.map((tag: any) => tag.tag)

  const variants = product.product_variants.map((variant: any) => ({
    id: variant.id,
    name: variant.name,
  }))

  return (
    <div className='min-h-screen bg-neutral-950'>
      <Header session={null} isDark={true} />
      <ProductDetails product={product} tags={tags} variants={variants}/>
    </div>
  )
}
