"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  ArrowUpDown,
  MoreHorizontal,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { supabase } from "@/app/api/auth/supabase/client"
import EditarProduto from "./EditarProduto"
import { toast } from "sonner"
import Image from "next/image"
import { deleteImagesOnServer } from "../../../server/actions/delete-files"

type Variant = {
  id: string
  name: string
}

type ProductImage = {
  id: string
  url: string
  size: number
  name: string
  key: string
}

export type ProductData = {
  name: string
  price: number
  images: ProductImage[]
  variants: Variant[]
  id: string
  tags?: string[]
}

interface Product {
  name: string
  price: number
  image: string
  id: string
}

export function ProductTable() {
  const [data, setData] = useState<ProductData[]>([])
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)

  // Fetch products
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
      .order('name', { ascending: true });

    if (error) {
      toast.error('Erro ao buscar produtos');
      return;
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
      }));

      setData(productsData);
    }
  };

  const [isOpenEdit, setIsOpenEdit] = useState(false)

  function openModalEdit(productId: string) {
    setIsOpenEdit(true)
    setSelectedProductId(productId)
  }

  // Delete product
  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) {
      toast.error('Erro ao deletar produto')
    } else {
      toast.success('Produto deletado com sucesso')
      fetchProducts()
    }

    // Delete images from UploadThing
    const imagesKeys = data.map((product) => product.images.map((image) => image.key)).flat()

    if (imagesKeys && imagesKeys.length > 0) {
      try {
        await deleteImagesOnServer(imagesKeys)
      } catch (error) {
        toast.error('Erro ao deletar as imagens do produto')
      }
    }
  }

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = React.useState({})

  const columns: ColumnDef<ProductData>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Produto
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: 'variants',
      header: 'Variações',
      cell: ({ row }) => {
        const variants = row.getValue('variants') as Variant[]
        return (
          <div className="flex gap-1">
            {variants.map((variant) => (
              <div key={variant.id} className="py-1 px-2 w-auto h-auto bg-primary rounded-full text-white text-xs flex justify-center items-center">
                {variant.name}
              </div>
            ))}
          </div>
        )
      }
    },
    {
      accessorKey: 'price',
      header: 'Preço',
      cell: ({ row }) => {
        const price = parseFloat(row.getValue('price'))
        const formattedPrice = new Intl.NumberFormat('pt-BR', {
          currency: 'BRL',
          style: 'currency'
        }).format(price)
        return (
          <div className="font-normal text-sm">
            {formattedPrice}
          </div>
        )
      }
    },
    {
      accessorKey: 'image',
      header: 'Imagem',
      cell: ({ row }) => {
        const image = row.getValue('image') as string
        const title = row.getValue('name') as string
        return (
          <div>
            <Image src={image} alt={title} width={40} height={40} className="rounded-md" />
          </div>
        )
      }
    },
    {
      id: "actions",
      enableHiding: false,
      header: "Ações",
      cell: ({ row }) => {
        const product = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer" onClick={() => openModalEdit(product.id)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => handleDelete(product.id)}>
                Deletar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Fltrar produtos..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm h-10 border border-border px-4 text-md text-muted-foreground bg-white placeholder:text-zinc-900/40 rounded-lg"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha selecionada.
        </div>
        <div className="space-x-2 flex">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            <span>Anterior</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span>Próxima</span>
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Edit Modal */}
      <EditarProduto isOpen={isOpenEdit} setIsOpen={setIsOpenEdit} productId={selectedProductId ?? ''} />
    </div>
  )
}
