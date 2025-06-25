'use client'

import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/client-store"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import { toast } from "sonner"

type AddCartProps = {
  id: string
  name: string
  variant: {
    id: string
    name: string
  } | null
  quantity: number
  setQuantity: (quantity: number) => void
  price: number
  image: string
}

export default function AddCart({
  id,
  name,
  variant,
  quantity,
  setQuantity,
  price,
  image,
}: AddCartProps) {

  const { addToCart } = useCartStore()

  const handleAddToCart = () => {
    if (!variant) {
      toast.error('Por favor, selecione uma variante antes de adicionar ao carrinho')
      return
    }

    toast.success('Produto adicionado ao carrinho')
    addToCart({
      id: id,
      variant: { variantId: variant.id, name: variant.name, quantity: quantity },
      name: name,
      price: price,
      image: image,
    })
  }

  return (
    <div className="flex flex-col w-fit">
      <div className="flex items-center justify-stretch mb-4 gap-1">
        <Button
          disabled={quantity === 1}
          onClick={() => { if (quantity > 1) setQuantity(quantity - 1) }}
          className="bg-secundaria hover:bg-secundaria-t disabled:bg-secundaria-light"
        >
          <Minus size={18} strokeWidth={3} />
        </Button>
        <Button
          variant={'secondary'}
          className="flex-1 bg-background text-black px-6"
        >
          Quantidade: {quantity}
        </Button>
        <Button
          onClick={() => { setQuantity(quantity + 1) }}
          className="bg-secundaria hover:bg-secundaria-t"
        >
          <Plus size={18} strokeWidth={3} />
        </Button>
      </div>
      <Button
        onClick={handleAddToCart}
        className="bg-background hover:bg-secundaria-extralight text-black hover:text-secundaria-t"
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        Adicionar ao carrinho
      </Button>
    </div>
  )
}
