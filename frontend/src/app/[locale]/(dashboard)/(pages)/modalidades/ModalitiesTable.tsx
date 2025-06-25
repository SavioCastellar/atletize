"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  Calendar,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { supabase } from "@/app/api/auth/supabase/client"
import { Badge } from "@/components/ui/badge"
import EditarModalidade from "./EditarModalidades"
import { toast } from "sonner"

export type ModalityData = {
  id: string
  icon: string
  name: string
  status: boolean
  achievementsSum: number
  tournamentsCount: number
}

interface Modality {
  id: string
  icon: string
  name: string
  instagram: string
  status: boolean
  gold: number
  silver: number
  bronze: number
}

export function ModalitiesTable() {
  const [data, setData] = useState<ModalityData[]>([])
  const [selectedModalityId, setSelectedModalityId] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [scheduleData, setScheduleData] = useState<any>(null)
  const [isScheduleLoading, setIsScheduleLoading] = useState<boolean>(false)
  const [scheduleError, setScheduleError] = useState<string | null>(null)

  useEffect(() => {
    fetchModalities()
  }, [])

  const fetchModalities = async () => {
    const { data, error } = await supabase
      .from('modalities')
      .select(`
        id,
        icon,
        name,
        status,
        tournaments_modalities (
          tournament_id,
          gold,
          silver,
          bronze
        )
      `)

    if (error) {
      console.log('Error fetching modalities: ', error)
    } else if (data) {
      const modalitiesData: ModalityData[] = data.map((modality: any) => {
        const achievements = modality.tournaments_modalities || []
        const achievementsSum = achievements.reduce((acc: number, tournament: any) => {
          return acc + tournament.gold + tournament.silver + tournament.bronze
        }, 0)
        const tournamentsCount = achievements.length

        return {
          id: modality.id,
          icon: modality.icon,
          name: modality.name,
          status: modality.status,
          achievementsSum,
          tournamentsCount,
        }
      })

      setData(modalitiesData)
    }
  }

  const handleCalendarClick = async (modalityId: string) => {
    setSelectedModalityId(modalityId)
    setIsDialogOpen(true)
    setIsScheduleLoading(true)
    setScheduleError(null)

    const { data, error } = await supabase
      .from('training_schedule')
      .select('sun, mon, tue, wed, thu, fri, sat')
      .eq('modality_id', modalityId)
      .single()

    if (error) {
      setScheduleError(error.message)
    } else {
      setScheduleData(data)
    }

    setIsScheduleLoading(false)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    setSelectedModalityId(null)
    setScheduleData(null)
    setScheduleError(null)
  }

  let [isOpenEdit, setIsOpenEdit] = useState(false)

  function openModalEdit(modalityId: string) {
    setIsOpenEdit(true)
    setSelectedModalityId(modalityId)
  }

  const handleDelete = async (modalityId: string) => {
    const { error } = await supabase.from('modalities').delete().eq('id', modalityId)
    if (error) {
      toast.error('Erro ao deletar modalidade')
    } else {
      toast.success('Modalidade deletada com sucesso')
      fetchModalities()
    }
  }

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  // Define columns inside the component to access component functions
  const columns: ColumnDef<ModalityData>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "icon",
      header: "Ícone",
      cell: ({ row }) => (
        <img
          src={row.getValue("icon")}
          alt={`${row.getValue("name")} icon`}
          width={24}
          height={24}
        />
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Modalidade
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "tournamentsCount",
      header: () => (
        <div className="text-center">Competições</div>
      ),
      cell: ({ row }) => <div className="text-center">{row.getValue("tournamentsCount")}</div>,
    },
    {
      accessorKey: "achievementsSum",
      header: () => (
        <div className="text-center">Conquistas</div>
      ),
      cell: ({ row }) => {
        return (
          <div className="text-center">
            {row.getValue("achievementsSum")}
          </div>
        )
      },
    },
    {
      id: "trainingSchedule",
      header: () => (
        <div className="text-center">Horário de treino</div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleCalendarClick(row.original.id)}
          >
            <Calendar className="h-5 w-5" />
          </Button>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: () => (
        <div className="text-center">Status</div>
      ),
      cell: ({ row }) => {
        const isActive = row.getValue("status");
        return (
          <div className="flex justify-center">
            <Badge className={`text-white ${isActive ? 'bg-emerald-400' : 'bg-red-400'}`}>
              {isActive ? "Ativo" : "Inativo"}
            </Badge>
          </div>
        )
      },
    },
    {
      id: "actions",
      enableHiding: false,
      header: "Ações",
      cell: ({ row }) => {
        const modality = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => openModalEdit(modality.id)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(modality.id)}>
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
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Fltrar modalidades..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm h-10 border border-border px-4 text-md text-zinc-900 bg-white placeholder:text-zinc-900/40 rounded-lg"
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

      {/* Training Schedule Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Horário de Treino</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {isScheduleLoading ? (
              <div>Carregando horário...</div>
            ) : scheduleError ? (
              <div>Erro ao carregar horário: {scheduleError}</div>
            ) : scheduleData ? (
              <div className="grid grid-cols-1 gap-2">
                {["sun", "mon", "tue", "wed", "thu", "fri", "sat"].map((dayKey, index) => {
                  const dayNames = [
                    "Domingo",
                    "Segunda-feira",
                    "Terça-feira",
                    "Quarta-feira",
                    "Quinta-feira",
                    "Sexta-feira",
                    "Sábado",
                  ];
                  const trainingTime = scheduleData[dayKey];
                  const isTrainingDay = trainingTime !== null && trainingTime !== "";

                  const formattedTime = isTrainingDay
                    ? new Date(`1970-01-01T${trainingTime}`)
                      .toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })
                    : null;

                  return (
                    <Button
                      key={dayKey}
                      disabled={!isTrainingDay}
                      variant="outline"
                      className={`justify-start text-black ${!isTrainingDay ? "text-black/30 cursor-not-allowed" : ""}`}
                    >
                      {dayNames[index]}: {isTrainingDay ? formattedTime : "Sem treino"}
                    </Button>
                  );
                })}
              </div>
            ) : (
              <div>Nenhum horário disponível.</div>
            )}
          </DialogDescription>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <EditarModalidade isOpen={isOpenEdit} setIsOpen={setIsOpenEdit} modalityId={selectedModalityId ?? ''} />
    </div>
  )
}
