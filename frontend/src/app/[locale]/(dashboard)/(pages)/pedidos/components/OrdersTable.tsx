'use client'

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
  ChevronRight,
  ChevronLeft,
} from "lucide-react"

import { Button } from "@/components/ui/button"
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
import { toast } from "sonner"
import formatPrice from "@/lib/format-price"

type OrderData = {
  id: number
  created: string
  status: string
  total: number
  user_id: string
  user_email?: string
  products: { quantity: number; productName: string; variantName: string }[]
}

interface Order {
  order_id: number;
  total: number;
  status: string;
  created: string;
  receiptURL: string;
  customer: { name: string; email: string };
  products: Array<{
    quantity: number;
    product_id: string;
    product_variant_id: string;
  }>;
}

export function OrdersTable() {
  const [data, setData] = useState<Order[]>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    // const { data: orders, error } = await supabase
    //   .from('orders')
    //   .select(`
    //     *,
    //     order_product (
    //       quantity,
    //       product_id,
    //       product_variant_id,
    //       products (
    //         name
    //       ),
    //       product_variants (
    //         name
    //       )
    //     )
    //   `)
    //   .order('created', { ascending: false })

    // if (error) {
    //   toast.error('Erro ao buscar pedidos')
    //   return
    // }

    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
      id,
      total,
      status,
      created,
      receipt_URL,
      user:users (name, email),
      products:order_product (quantity, product_id, product_variant_id)
    `)
      .order('created', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      return [];
    }

    if (orders) {
      const ordersData = orders.map(order => ({
        order_id: order.id,
        total: order.total,
        status: order.status,
        created: order.created,
        receiptURL: order.receipt_URL,
        customer: order.user[0],
        products: order.products.map(product => ({
          quantity: product.quantity,
          product_id: product.product_id,
          product_variant_id: product.product_variant_id
        }))
      }))

      setData(ordersData)
    }

    console.log('orders', data)

    // if (orders) {
    //   const ordersData = orders.map((order) => ({
    //     id: order.id,
    //     created: new Date(order.created).toLocaleDateString('pt-BR'),
    //     status: order.status,
    //     total: order.total,
    //     user_id: order.user_id,
    //     // user_email: order.user_roles?.email,
    //     products: order.order_products?.map((op: any) => ({
    //       quantity: op.quantity,
    //       productName: op.products?.name,
    //       variantName: op.product_variants?.name
    //     }))
    //   }))

    //   setData(ordersData)
    // }
  }

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "order_id",
      header: "Pedido #",
      cell: ({ row }) => <div>#{row.getValue("order_id")}</div>,
    },
    {
      accessorKey: "created",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "customer",
      header: "Cliente",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("status")}</div>
      ),
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => formatPrice(parseInt(row.getValue("total")) / 100),
    },
    {
      accessorKey: "products",
      header: "Produtos",
      cell: ({ row }) => {
        const products = row.getValue("products") as Array<{
          quantity: number;
          productName: string;
          variantName: string;
        }>;
        return (
          <div className="space-y-1">
            {products?.map((product, index) => (
              <div key={index} className="text-sm">
                {product.quantity}x {product.productName} ({product.variantName})
              </div>
            ))}
          </div>
        );
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
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar pedidos..."
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("id")?.setFilterValue(event.target.value)}
          className="max-w-sm h-10 border border-border px-4 text-md text-muted-foreground bg-white placeholder:text-zinc-900/40 rounded-lg"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
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
                  Nenhum resultado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próxima
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
