import { motion } from 'framer-motion'
import { ChevronDown, Search } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'
import HallDaFamaItem from './HallDaFamaItem'
import { supabase } from '@/app/api/auth/supabase/client'
import { Athlete } from '../domain/interfaces/IAthlete'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from '@/lib/utils'
import { sections } from '@/app/shared/utils/general'
import { getAthletes } from '../../../../../../../queries/get-athletes'

type ITabProps = {
  setCurrentIndex: (index: number) => void
}

const HallDaFamaMobile = ({ setCurrentIndex }: ITabProps) => {
  {/* Buscar atletas */ }
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 text-4xl md:text-5xl font-light bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 hover:opacity-80 transition-opacity">
                Hall da Fama
                <ChevronDown className="size-6 md:size-8 mt-1 md:mt-4 md:ml-4" color='white' />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-zinc-900/95 backdrop-blur-sm border-white/10">
              {sections.map((section) => (
                <DropdownMenuItem
                  key={section.id}
                  className={cn(
                    "text-lg py-3 cursor-pointer text-white/40 hover:text-white focus:text-white",
                    "hall-da-fama" === section.id && "text-white"
                  )}
                  onClick={() => setCurrentIndex(sections.indexOf(section))}
                >
                  {section.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <Image
              src="/logo-alt.png"
              alt="Med Puc Logo"
              width={100}
              height={100}
              className="w-16 md:w-24 opacity-90"
            />
          </motion.div>
        </header>
      </div>

      {/* Formulário */}
      <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800/50 p-8 rounded-2xl shadow-xl text-white text-center mb-6">
        <h2 className="text-xl font-bold mb-2">Quer fazer parte do Hall da Fama?</h2>
        <p className="text-gray-400 mb-4">Preencha o formulário e aguarde a avaliação</p>
        <Button
          variant="outline"
          className="hover:bg-secundaria-light hover:text-black/60 border-secundaria-t bg-secundaria-t text-secundaria-extralight transition-all duration-300 gap-2"
        >
          Formulário
        </Button>
      </Card>

      {/* Athletes */}
      <div className="relative w-full md:w-96 mb-8">
        <Input
          type="text"
          placeholder="Pesquisar por nome..."
          className="w-full pl-10 bg-white/10 border-none text-white text-md placeholder:text-gray-400 rounded-md"
          onChange={handleSearch}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {currentItems?.map((member) => (
          <HallDaFamaItem info={member} isMobile={true} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4">
        <Button
          variant="outline"
          onClick={() => pageLeft(actualPage)}
          disabled={actualPage === 1}
          className="border-none bg-zinc-900/50 hover:bg-zinc-900/80 backdrop-blur-sm border-zinc-800/50 hover:text-white"
        >
          Anterior
        </Button>
        <div className="flex gap-2">
          {Array.from({ length: pages }, (_, i) => (
            <Button
              key={i + 1}
              variant={actualPage === i + 1 ? "default" : "outline"}
              onClick={() => setActualPage(i + 1)}
              className={actualPage === i + 1 ? "hover:bg-white bg-white text-black cursor-default" : "bg-zinc-900/50 border-none hover:bg-zinc-900/80 hover:text-white"}
            >
              {i + 1}
            </Button>
          ))}
        </div>
        <Button
          variant="outline"
          onClick={() => pageRight(actualPage)}
          disabled={actualPage === pages}
          className="border-none bg-zinc-900/50 hover:bg-zinc-900/80 backdrop-blur-sm border-zinc-800/50 hover:text-white"
        >
          Próxima
        </Button>
      </div>
    </main>
  );
};

export default HallDaFamaMobile;
