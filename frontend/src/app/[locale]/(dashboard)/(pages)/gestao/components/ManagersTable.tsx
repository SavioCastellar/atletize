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

import { toast } from "sonner"
import Image from "next/image"
import EditManager from "./EditManager"
// If you have a function to delete images, import it here
// import { deleteImagesOnServer } from "../../../server/actions/delete-files"

type FunctionData = {
  id: string
  name: string
}

type Position = {
  id: string
  name: string
  function: FunctionData
}

export type ManagerData = {
  id: string
  name: string
  course: string | null
  reg_number: string | null
  contact_number: string | null
  position: Position
  instagram: string | null
  email: string | null
  image: string | null
}

interface ManagerTableProps {
  shouldRefetch: boolean
  setShouldRefetch: (value: boolean) => void
}

export function ManagersTable({ shouldRefetch, setShouldRefetch }: ManagerTableProps) {
  const [data, setData] = useState<ManagerData[]>([])
  const [selectedManagerId, setSelectedManagerId] = useState<string | null>(null)

  // Fetch managers
  useEffect(() => {
    fetchManagers()
    setShouldRefetch(false)
  }, [shouldRefetch])

  const fetchManagers = async () => {
    const { data: managers, error } = await supabase
      .from('managers')
      .select(`
        *,
        position:position_id (
          id,
          name,
          function:function_id (
            id,
            name
          )
        )
      `)
      .order('name', { ascending: true })

    if (error) {
      toast.error('Erro ao buscar gerentes')
      return
    }

    if (managers) {
      const managersData = managers.map((manager) => ({
        id: manager.id,
        name: manager.name,
        course: manager.course,
        reg_number: manager.reg_number,
        contact_number: manager.contact_number,
        position: manager.position,
        instagram: manager.instagram,
        email: manager.email,
        image: manager.image || '/placeholder.png',
      }))

      setData(managersData)
    }
  }

  const [isOpenEdit, setIsOpenEdit] = useState(false)

  function openModalEdit(managerId: string) {
    setIsOpenEdit(true)
    setSelectedManagerId(managerId)
  }

  // Delete manager
  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('managers').delete().eq('id', id)
    if (error) {
      toast.error('Erro ao deletar gerente')
    } else {
      toast.success('Gerente deletado com sucesso')
      fetchManagers()
    }

    // If you need to delete images from storage, handle that here
    // For example:
    // const manager = data.find((manager) => manager.id === id)
    // if (manager?.image) {
    //   try {
    //     await deleteImagesOnServer([manager.image])
    //   } catch (error) {
    //     toast.error('Erro ao deletar a imagem do gerente')
    //   }
    // }
  }

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = React.useState({})

  const columns: ColumnDef<ManagerData>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "position",
      header: "Posição",
      cell: ({ row }) => {
        const position = row.getValue("position") as Position
        return <div>{position.name}</div>
      },
    },
    {
      accessorKey: "function",
      header: "Função",
      cell: ({ row }) => {
        const position = row.getValue("position") as Position
        const func = position.function
        return <div>{func.name}</div>
      },
    },
    {
      accessorKey: "contact_number",
      header: "Contato",
      cell: ({ row }) => {
        return <div>{row.getValue("contact_number")}</div>
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        return <div>{row.getValue("email")}</div>
      },
    },
    {
      accessorKey: "image",
      header: "Imagem",
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
        const manager = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer" onClick={() => openModalEdit(manager.id)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => handleDelete(manager.id)}>
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
          placeholder="Filtrar gerentes..."
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
      <EditManager isOpen={isOpenEdit} setIsOpen={setIsOpenEdit} managerId={selectedManagerId ?? ''} />
    </div>
  )
}
