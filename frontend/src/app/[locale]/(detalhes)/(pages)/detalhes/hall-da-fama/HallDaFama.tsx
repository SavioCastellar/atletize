import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import Titulo from '../components/Titulo'
import TrocaTab from '../components/TrocaTab'
import HallDaFamaItem from './HallDaFamaItem'
import Formulario from './Formulario'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { Session } from 'next-auth'
import NavBar from '../components/NavBar'
import { getAthletes } from '../../../../../../../queries/get-athletes'

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = ({
  hidden: { opacity: 0, scale: 0.4 },
  visible: { opacity: 1, scale: 1, transition: { delay: 0.4 } },
})

type ITabProps = {
  setCurrentIndex: (index: number) => void
  session: Session | null
}

export default function HallDaFama({ session, setCurrentIndex }: ITabProps) {
  // const [hasAnimated, setHasAnimated] = useState(false)
  const { data: athletes, loading: athletesLoading, error: athletesError } = getAthletes()

  // useEffect(() => {
  //   setHasAnimated(true)
  // }, [])

  {/* Buscar atletas */ }
  // const [athletes, setAthletes] = useState<Athlete[]>([])

  // useEffect(() => {
  //   fetchAthletes()
  // }, [])

  // const fetchAthletes = async () => {
  //   const { data, error } = await supabase
  //     .from('athletes')
  //     .select('id, name, image, course, graduation, description, instagram')
  //     .order('name', { ascending: true })

  //   if (error) {
  //     console.log('Error fetching products: ', error)
  //   } else if (data) {
  //     setAthletes(data)
  //   }
  // }

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

  {/* Troca de tab */ }
  const handleNext = () => {
    setCurrentIndex(1)
  }

  const handlePrev = () => {
    setCurrentIndex(3)
  }

  return (
    <div className="h-screen bg-theme-bg p-3 flex justify-center items-center">
      <div className="relative bg-primaria w-full h-full rounded-3xl p-6">

        {/* Título */}
        <motion.div
          initial={{ x: -670 }}
          whileInView={{ x: 0, transition: { type: 'just', duration: 0.6, delay: 1 } }}
          className="absolute -top-[1px] -left-[1px] h-screen-15 bg-theme-bg rounded-tl-2xl"
        >
          <div className="absolute top-[1px] -right-10 h-10 w-10 bg-transparent rounded-tl-3xl shadow-custom-tl-bg" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { type: 'just', duration: 0.2, delay: 1 } }}
            className="absolute bottom-0 right-0 h-10 w-10 bg-transparent rounded-br-3xl shadow-custom-br-theme-1"
          />
          <div className="absolute -bottom-10 left-[1px] h-10 w-10 bg-transparent rounded-tl-3xl shadow-custom-tl-bg" />
          <Titulo text='Hall da Fama' bgColor='theme-1' txtColor='white' type='icon' />
        </motion.div>

        {/* Barra de pesquisa */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { type: 'spring', duration: 0.2, delay: 2.4 } }}
          className="absolute rounded-full border-2 border-input w-screen-30 top-8 right-44 px-7 flex items-center justify-between focus:border-t-0">
          <Input
            placeholder="Pesquisar por nome..."
            className="bg-transparent w-full text-xl focus:outline-none focus:label-none focus:placeholder:text-white/30 text-white"
            onChange={handleSearch}
          />
          <Search className="relative size-7 text-white" />
        </motion.div>

        {/* Lista de atletas */}
        <div className='absolute right-6 top-[18%] flex flex-col justify-between items-center h-screen-60 rounded-lg z-10'>
          <motion.div
            className='grid grid-cols-5 gap-4'
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={actualPage}
          >
            <>
              {currentItems?.map((atleta, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                >
                  <HallDaFamaItem info={atleta} isMobile={false} />
                </motion.div>
              ))}
            </>
          </motion.div>
        </div>

        {/* Paginação */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { type: 'just', duration: 0.2, delay: 3.6 } }}
          className='absolute bottom-8 left-1/2 transform -translate-x-1/2'
        >
          <div className='flex flex-row justify-center items-center max-w-max'>
            <img className={`rotate-180 h-5 px-4 ${actualPage > 1 ? 'cursor-pointer' : 'opacity-30'}`} src='/arrow2.svg' alt='arrow' onClick={() => pageLeft(actualPage)} />
            {Array.from({ length: pages }).map((_, index) => (
              <div className={`${actualPage === index + 1 ? 'border-2 rounded-full' : ''} flex w-14 items-center justify-center cursor-pointer`}>
                <a
                  key={index + 1}
                  className={`${actualPage === index + 1 ? 'text-secundaria-light text-2xl font-semibold' : 'text-white text-xl font-medium'} px-3 py-1 cursor-pointer`}
                  onClick={() => setActualPage(index + 1)}
                >
                  {index + 1}
                </a>
              </div>
            ))}
            <img className={`h-5 px-4 ${actualPage !== pages ? 'cursor-pointer' : 'opacity-30'}`} src='/arrow2.svg' alt='arrow' onClick={() => pageRight(actualPage)} />
          </div>
        </motion.div>

        {/* Formulário */}
        <motion.div
          initial={{ x: -302 }}
          whileInView={{ x: 0, transition: { type: 'just', duration: 0.4, delay: 1.8 } }}
          className="absolute -bottom-[1px] -left-[1px] h-2/5 w-1/5 bg-theme-bg rounded-bl-2xl py-2"
        >
          <div className="absolute -top-10 left-[1px] h-10 w-10 bg-transparent rounded-bl-3xl shadow-custom-bl-bg" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { type: 'just', duration: 0.4, delay: 1.8 } }}
            className="absolute top-0 right-0 h-10 w-10 bg-transparent rounded-tr-3xl shadow-custom-tr-theme-1"
          />
          <div className="absolute bottom-[1px] -right-10 h-10 w-10 bg-transparent rounded-bl-3xl shadow-custom-bl-bg" />
          <div className='flex flex-col justify-between items-center h-full pt-4'>
            <Image src='/logo-alt.png' alt='logo' width={70} height={70} draggable={false} />
            <div className='px-10'>
              <h1 className='text-xl text-center font-normal'>
                Quer ter sua história marcada aqui?
              </h1>
              <h3 className='text-sm text-center text-txt-2 font-normal'>
                Preencha o formulário abaixo e aguarde a avaliação
              </h3>
            </div>
            <Formulario />
          </div>
        </motion.div>

        {/* Troca de tab */}
        <div className="absolute -bottom-[1px] -right-[1px] h-screen-15 w-screen-20 bg-theme-bg rounded-br-2xl">
          <div className="absolute top-0 h-10 w-10 bg-transparent rounded-tl-3xl shadow-custom-tl-theme-1" />
          <div className="absolute -top-10 right-[1px] h-10 w-10 bg-transpbg-transparent rounded-br-3xl shadow-custom-br-bg" />
          <div className="absolute bottom-[1px] -left-10 h-10 w-10 bg-transpbg-transparent rounded-br-3xl shadow-custom-br-bg" />
          <TrocaTab color='theme-1' onNext={handleNext} onPrev={handlePrev} />
        </div>

        {/* Botão de voltar */ }
        <NavBar session={session} />

      </div>
    </div>
  )
}
