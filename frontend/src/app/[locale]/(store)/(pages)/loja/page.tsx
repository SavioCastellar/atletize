// 'use client'
// import React from 'react'
// import { ProductList } from '../../components/ProductList'
// import { CategoryFilter } from '../../components/CategoryFilter'
// import { Header } from '@/app/[locale]/(landing-page)/components'

// export default function StorePage() {
//   return (
//     <>
//       <Header session={null} />
//       <div className="container mx-auto px-4 py-8 bg-background">
//         <CategoryFilter />
//         <ProductList />
//       </div>
//     </>
//   )
// }


// app/products/page.tsx

"use client"

import { motion } from "framer-motion"
import { Search, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import Link from 'next/link'
import { supabase } from '@/app/api/auth/supabase/client'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import formatPrice from '@/lib/format-price'
import { useStore } from '@/lib/client-store'
import { Badge } from '@/components/ui/badge'
import { ProductData } from "@/app/[locale]/(dashboard)/(pages)/produtos/components/ProductTable"
import { set } from "zod"
import { useRouter } from "next/navigation"

const ProductPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  const router = useRouter()

  const handleProductDetails = (id: string) => {
    setSelectedProductId(id)
    router.push(`/loja/${id}`)
  }


  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-5xl font-bold mb-4 text-secundaria-dark">Lojinha MED-PUC</h1>
                <p className="text-xl text-primaria/70">Compre os últimos lançamentos da nossa atlética</p>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image src="/logo-alt.png" alt="Store" width={100} height={100} />
            </motion.div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row mb-8"
        >
          <div className="w-2/3 md:w-1/2 lg:w-1/3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secundaria" />
              <Input
                placeholder="Buscar produtos..."
                className="flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 border-secundaria/20 focus:border-secundaria"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          {/* <div className="flex gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px] border-secundaria/20">
                <SlidersHorizontal className="w-4 h-4 mr-2 text-secundaria" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] border-secundaria/20">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div> */}
        </motion.div>

        {/* Product Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {data.map((product) => (
            <motion.div key={product.id} variants={item}>
              <Card className="product-card border-secundaria/10">
                <CardHeader className="p-0">
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={product.images[0].url}
                      alt={product.name}
                      width={720}
                      height={480}
                      loading='lazy'
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
                  {product.tags?.map((tag) => (
                    <Badge key={tag} className="mr-2">{tag}</Badge>
                  ))}
                  <p className="font-bold text-lg mt-2 text-secundaria">{formatPrice(product.price)}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    className="w-full bg-secundaria hover:bg-secundaria/90 z-30"
                    variant="default"
                    onClick={() => handleProductDetails(product.id)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Ver mais
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  )
}

export default ProductPage
