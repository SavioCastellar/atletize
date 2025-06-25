'use client'

import { PlusCircle, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { NovoProduto } from "./components/NovoProduto"
import { useEffect, useState } from "react"
import { supabase } from "@/app/api/auth/supabase/client"
import { toast } from "react-toastify"
import { ProductTable } from "./components/ProductTable"

type Product = {
  id: string
  name: string
  price: number
  variants: any[]
  image: string
}

export default function Produtos() {
  const [open, setOpen] = useState(false)
  const [dataTable, setDataTable] = useState<Product[]>([])

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // Fetch products
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const { data: products, error } = await supabase
      .from('products')
      .select(`*`)
      .order('name', { ascending: true })

    if (error) {
      toast.error('Erro ao buscar produtos')
    }
    if (products) {
      const productsData = products.map((product) => {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          variants: [],
          image: '/placeholder.png',
        }
      })
      setDataTable(productsData)
    }
  }

  return (
    <div>
      <div className="flex justify-between pb-4">
        <h1 className='text-4xl font-normal text-zinc-900'>Produtos</h1>
        <div className="justify-end items-center flex flex-row gap-3">
          <Button size="sm" className="h-8 gap-3">
            <Upload size={18} />
            Importar
          </Button>
          <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-3">
                <PlusCircle size={18} />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Criar produto
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="md:max-w-[50%] overflow-y-scroll max-h-[90%] rounded-md">
              <DialogTitle>Criar produto</DialogTitle>
              <NovoProduto onClose={handleClose} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <ProductTable />
    </div>
  )
}

