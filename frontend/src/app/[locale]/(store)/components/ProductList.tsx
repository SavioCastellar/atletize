'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { supabase } from '@/app/api/auth/supabase/client'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { ProductData } from '../../(dashboard)/(pages)/produtos/components/ProductTable'
import Image from 'next/image'
import formatPrice from '@/lib/format-price'
import { useStore } from '@/lib/client-store'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'

export const ProductList = () => {
  const [data, setData] = useState<ProductData[]>([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const { data: products, error } = await supabase
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
      .order('name', { ascending: true })

    if (error) {
      toast.error('Erro ao buscar produtos')
      return
    }

    if (products) {
      const productsData = products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        created_at: product.created_at,
        variants: product.product_variants || [],
        images: product.product_images || [],
        tags: product.product_tags?.map((tag: any) => tag.tag) || [],
        image: product.product_images?.[0]?.url || '/placeholder.png',
      }))

      setData(productsData)
    }
  }

  const setSelectedProductId = useStore((state) => state.setSelectedProductId);

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {data.map((product) => (
        <Link href={`/loja/${product.id}`} onClick={() => setSelectedProductId(product.id)}>
          <Card key={product.id}>
            <CardHeader>
              <Image
                src={product.images[0].url}
                alt={product.name}
                width={720}
                height={480}
                loading='lazy'
              />
            </CardHeader>
            <CardContent>
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-500">{formatPrice(product.price)}</p>
              {product.tags?.map((tag) => (
                <Badge key={tag} className="mr-2">{tag}</Badge>
              ))
              }
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
