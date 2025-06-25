'use client'

import { Badge } from "@/components/ui/badge"
import ProductShowcase from "./ProductShowcase"
import formatPrice from "@/lib/format-price"
import AddCart from "./cart/add-cart"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ArrowLeft, Palette, Ruler, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useStore } from "@/lib/client-store"
import { useRouter } from "next/navigation"

interface ProductDetailsProps {
  product: any
  tags: string[]
  variants: any[]
}

export default function ProductDetails({ product, tags, variants }: ProductDetailsProps) {
  const [selectedVariant, setSelectedVariant] = useState<{ id: string, name: string } | null>(null)
  const [quantity, setQuantity] = useState<number>(1)

  const router = useRouter()
  const selectedProductId = useStore((state) => state.selectedProductId)
  const setSelectedProductId = useStore((state) => state.setSelectedProductId)

  const handleBack = () => {
    setSelectedProductId(null)
    router.back()
  }

  return (
    // <div className='flex flex-col lg:flex-row px-4 gap-4 lg:gap-10'>
    //   <div className='flex-1 lg:w-[60%]'>
    //     <ProductShowcase images={product.product_images} />
    //   </div>
    //   <div className="lg:ml-8 space-y-4 py-8 lg:w-[40%]">
    //     <div className='flex gap-2 justify-end'>
    //       {tags.map((tag: string) => (
    //         <Badge key={tag}>{tag}</Badge>
    //       ))}
    //     </div>
    //     <h1 className="text-3xl font-medium">{product.name}</h1>
    //     <div className='border-t border-zinc-400 pt-4'>
    //       <p className='mb-4'>Opções disponíveis</p>
    //       <div className='flex gap-2'>
    //         {variants.map((variant: any) => (
    //           <Button
    //             key={variant.id}
    //             variant='outline'
    //             className={cn(selectedVariant?.id === variant.id ? 'bg-black text-white' : 'bg-slate-100 text-black hover:bg-foreground hover:text-white', 'text-sm')}
    //             onClick={() => setSelectedVariant({ id: variant.id, name: variant.name })}
    //           >
    //             {variant.name}
    //           </Button>
    //         ))}
    //       </div>
    //     </div>
    //     <div className='border-t border-zinc-400 pt-4 pb-8'>
    //       <p className="text-3xl font-semibold text-black mb-2">
    //         {formatPrice(product.price) + ' '}
    //         <span className="text-sm font-normal text-black"> à vista</span>
    //       </p>
    //       <p className="text-sm font-normal text-black">
    //         ou 2x de {formatPrice(product.price / 2)} sem juros
    //       </p>
    //     </div>
    //     <AddCart
    //       id={product.id}
    //       name={product.name}
    //       variant={selectedVariant}
    //       quantity={quantity}
    //       setQuantity={setQuantity}
    //       price={product.price}
    //       image={product.product_images[0]?.url}
    //     />
    //   </div>
    // </div>
    <div>
      {/* <div className="absolute inset-0 bg-neutral-950">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900 to-transparent"
        />
      </div> */}
      <Button
        variant="ghost"
        className="m-4 text-black bg-background hover:bg-background/90"
        onClick={handleBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar
      </Button>

      <motion.div
        initial={selectedProductId === product.id ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mx-auto px-4"
      >
        <div className="max-w-6xl mx-auto bg-black/80 rounded-xl backdrop-blur-sm p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              layoutId={`image-${product.id}`}
              className="relative h-[540px] rounded-lg overflow-hidden"
            >
              <ProductShowcase images={product.product_images} />
            </motion.div>
            <motion.div className="space-y-6 text-white">
              <motion.h1
                layoutId={`title-${product.id}`}
                className="text-4xl font-bold"
              >
                {product.name}
              </motion.h1>
              <motion.div
                layoutId={`price-${product.id}`}
                className="text-3xl font-bold text-secundaria-light"
              >
                {formatPrice(product.price)}
              </motion.div>
              <motion.p
                layoutId={`desc-${product.id}`}
                className="text-lg text-gray-300"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
              {variants && (
                <div className="space-y-2">
                  <div className="flex items-center text-secundaria-light">
                    <Ruler className="h-4 w-4 mr-2" />
                    <span>Variações disponíveis</span>
                  </div>
                  <div className='flex gap-2'>
                    {variants.map((variant: any) => (
                      <Button
                        key={variant.id}
                        variant='outline'
                        className={cn(selectedVariant?.id === variant.id ? 'bg-secundaria text-white' : 'bg-slate-100 text-black hover:bg-secundaria-extralight hover:text-secundaria-t', 'text-sm')}
                        onClick={() => setSelectedVariant({ id: variant.id, name: variant.name })}
                      >
                        {variant.name}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="pt-4"
              >
                <AddCart
                  id={product.id}
                  name={product.name}
                  variant={selectedVariant}
                  quantity={quantity}
                  setQuantity={setQuantity}
                  price={product.price}
                  image={product.product_images[0]?.url}
                />
              </motion.div>
            </motion.div>
          </div>
        </div >
      </motion.div >
    </div >
  )
}
