'use client'

import { Clock, PlusCircle, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { NewManager } from "./components/NewManager"
import { NewPosition } from "./components/NewPosition"
import { NewPeriod } from "./components/NewPeriod"
import { useEffect, useState } from "react"
import { supabase } from "@/app/api/auth/supabase/client"
import { toast } from "sonner"
import { ManagersTable } from "./components/ManagersTable"

type Manager = {
  id: string
  name: string
  contact_number?: string | null
  email?: string | null
  image?: string | null
}

export default function Gerentes() {
  const [openManagerDialog, setOpenManagerDialog] = useState(false)
  const [openPositionDialog, setOpenPositionDialog] = useState(false)
  const [openPeriodDialog, setOpenPeriodDialog] = useState(false)
  const [shouldRefetch, setShouldRefetch] = useState(false)

  const handleManagerDialogOpenChange = (isOpen: boolean) => {
    setOpenManagerDialog(isOpen)
  }

  const handleManagerDialogClose = () => {
    setOpenManagerDialog(false)
  }

  const handlePositionDialogOpenChange = (isOpen: boolean) => {
    setOpenPositionDialog(isOpen)
  }

  const handlePositionDialogClose = () => {
    setOpenPositionDialog(false)
  }

  const handlePeriodDialogOpenChange = (isOpen: boolean) => {
    setOpenPeriodDialog(isOpen)
  }

  const handlePeriodDialogClose = () => {
    setOpenPeriodDialog(false)
  }

  return (
    <div>
      <div className="flex justify-between pb-4">
        <h1 className='text-4xl font-normal text-zinc-900'>Gestão</h1>
        <div className="justify-end items-center flex flex-row gap-3">
          <Dialog open={openPeriodDialog} onOpenChange={handlePeriodDialogOpenChange}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-3">
                <Clock size={18} />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Períodos
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[95%] lg:max-w-[30%] overflow-y-auto max-h-[90%] rounded-md">
              <DialogTitle>Criar período de gestão</DialogTitle>
              <NewPeriod onClose={handlePeriodDialogClose} />
            </DialogContent>
          </Dialog>

          <Dialog open={openPositionDialog} onOpenChange={handlePositionDialogOpenChange}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-3">
                <Settings size={18} />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Cargos
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="md:max-w-[30%] overflow-y-auto max-h-[90%] rounded-md">
              <DialogTitle>Criar cargo</DialogTitle>
              <NewPosition onClose={handlePositionDialogClose} />
            </DialogContent>
          </Dialog>

          {/* Button to Create Manager */}
          <Dialog open={openManagerDialog} onOpenChange={handleManagerDialogOpenChange}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-3">
                <PlusCircle size={18} />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Criar membro
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="md:max-w-[50%] overflow-y-scroll max-h-[90%] rounded-md">
              <DialogTitle>Criar membro</DialogTitle>
              <NewManager onClose={handleManagerDialogClose} setShouldRefetch={setShouldRefetch} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <ManagersTable shouldRefetch={shouldRefetch} setShouldRefetch={setShouldRefetch} />
    </div>
  )
}
