import { Athlete } from '@/app/[locale]/(detalhes)/(pages)/detalhes/domain/interfaces/IAthlete'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { CircleEllipsis } from 'lucide-react'
import React, { useState } from 'react'
import EditarAtleta from './EditarAtleta'
import ExcluirAtleta from './ExcluirAtleta'

interface CardAtletaProps {
  info: Athlete
}
function CardAtleta({info}: CardAtletaProps) {
  let [isOpenEdit, setIsOpenEdit] = useState(false)
  let [isOpenDelete, setIsOpenDelete] = useState(false)

  function openModalEdit() {
    setIsOpenEdit(true)
  }

  function openModalDelete() {
    setIsOpenDelete(true)
  }

  return (
    <>
      <a className='mx-auto flex items-center z-10'>
          <div className='flex flex-col h-full w-full px-2 rounded-lg items-center justify-between bg-background border-zinc-800 border-2'>
            <div className='flex flex-row w-full justify-end mt-1'>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <CircleEllipsis size={32} className='cursor-pointer'/>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={openModalEdit}>Editar</DropdownMenuItem>
                  <DropdownMenuItem onClick={openModalDelete}>Excluir</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className='w-40 h-40 rounded-full bg-black/50 mx-4 -mt-4'>
              <img className='w-40 h-40 rounded-full' src={info.image} alt='Atleta' draggable='false'/>
            </div>
            <h1 className='text-lg font-bold text-zinc-800 my-2'>
              {info.name.toUpperCase()}
            </h1>
          </div>
      </a>
      <EditarAtleta isOpen={isOpenEdit} setIsOpen={setIsOpenEdit} info={info}/>
      <ExcluirAtleta isOpen={isOpenDelete} setIsOpen={setIsOpenDelete} athleteId={info.id}/>
    </>
  )
}

export default CardAtleta
