'use client'
import React, { useEffect, useMemo, useState } from 'react'
import CardAtleta from './CardAtleta'
import { Input } from '@/components/ui/input'
import { ArrowLeft, ArrowRight, PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import NovoAtleta from './NovoAtleta'
import 'react-image-crop/dist/ReactCrop.css'
import { getAthletes } from '../../../../../../queries/get-athletes'
import AtletaSkeleton from './AtletaSkeleton'

export default function Atletas() {
  const [shouldRefetch, setShouldRefetch] = useState(false)
  const { data: athletes, loading: athletesLoading, error: athletesError } = getAthletes()

  {/* Paginação */ }
  const [actualPage, setActualPage] = useState(1)
  const itemsPerPage = 10
  const startIndex = (actualPage - 1) * itemsPerPage

  const pageRight = (actualPage: number) => {
    if (actualPage !== pages)
      setActualPage(actualPage + 1)
  }

  const pageLeft = (actualPage: number) => {
    if (actualPage > 1)
      setActualPage(actualPage - 1)
  }

  {/* Filtrar atletas */ }
  const [searchAthlete, setSearchAthlete] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAthlete(e.target.value)
    setActualPage(1)
  }

  const filteredItems = searchAthlete !== ''
    ? athletes?.filter(item => item.name.toLowerCase().includes(searchAthlete.toLowerCase()))
    : athletes

  const currentItems = useMemo(() =>
    filteredItems?.slice(startIndex, startIndex + itemsPerPage)
    , [actualPage, athletes, startIndex, searchAthlete])

  const pages = Math.ceil(filteredItems ? (filteredItems.length / itemsPerPage) : 0)

  {/* Modal adicionar atleta */ }
  let [isOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }

  {/* Atualizar lista de atletas */ }
  useEffect(() => {
    if (shouldRefetch) {
      // Refetch athletes
      setShouldRefetch(false)
    }
  }, [shouldRefetch])

  // Render skeleton array while loading
  const renderSkeletons = () => {
    return Array(10).fill(0).map((_, index) => (
      <AtletaSkeleton key={`skeleton-${index}`} />
    ))
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-row justify-between items-center'>
        <h1 className='text-4xl font-normal text-zinc-900'>Atletas</h1>
        <div className='flex items-center justify-between w-auto gap-4'>
          {/* Barra de pesquisa */}
          <Input
            placeholder="Pesquisar por nome..."
            className="min-w-56 h-10 border border-border px-4 text-md text-muted-foreground bg-white placeholder:text-zinc-900/40 rounded-lg"
            onChange={handleSearch}
          />
          {/* Adicionar atleta */}
          <Button size="sm" className="h-8 gap-1" onClick={openModal}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Novo Atleta
            </span>
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-5 grid-rows-2 gap-4'>
        {/* Show skeletons when loading */}
        {athletesLoading ? (
          renderSkeletons()
        ) : (
          /* Lista de atletas */
          currentItems?.map((athlete) => (
            <CardAtleta key={athlete.id} info={athlete} />
          ))
        )}
      </div>

      {/* Paginação */}
      {!athletesLoading && (
        currentItems && currentItems.length > 0 ? (
          <div className='flex justify-center'>
            <div className='flex flex-row justify-center items-center max-w-max'>
              <ArrowLeft size={20} color='black' className={`mr-4 ${actualPage > 1 ? 'cursor-pointer' : 'opacity-30'}`} onClick={() => pageLeft(actualPage)} />
              {Array.from({ length: pages }).map((_, index) => (
                <div key={index + 1} className={`${actualPage === index + 1 ? 'border-2 rounded-full' : ''} flex w-14 items-center justify-center cursor-pointer`}>
                  <a
                    className={`${actualPage === index + 1 ? 'text-black text-xl font-semibold' : 'text-black/70 text-xl font-medium text-md'} px-3 cursor-pointer`}
                    onClick={() => setActualPage(index + 1)}
                  >
                    {index + 1}
                  </a>
                </div>
              ))}
              <ArrowRight size={20} color='black' className={`ml-4 ${actualPage !== pages ? 'cursor-pointer' : 'opacity-30'}`} onClick={() => pageRight(actualPage)} />
            </div>
          </div>
        ) : (
          <div className='flex justify-center'>
            <p className='text-lg text-black/70'>Nenhum atleta cadastrado</p>
          </div>
        )
      )}

      <NovoAtleta isOpen={isOpen} setIsOpen={setIsOpen} setShouldRefetch={setShouldRefetch} />
    </div>
  )
}
