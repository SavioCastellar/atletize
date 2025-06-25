'use client'

import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/app/api/auth/supabase/client'
import { Calendar, ChevronDown, Instagram, Mail, Twitter, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Card } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sections } from '@/app/shared/utils/general'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from '@/lib/utils'

interface IFunction {
  id: number
  name: string
}

interface IPosition {
  id: number
  name: string
  functions: IFunction
}

interface IManager {
  id: number
  name: string
  course: string
  reg_number: string
  contact_number: string
  x: string
  instagram: string
  email: string
  image: string
  period: string
  positions: IPosition
}

interface IPeriod {
  id: number
  range: string
}

type ITabProps = {
  setCurrentIndex: (index: number) => void
}

const fetchManagers = async () => {
  const { data, error } = await supabase
    .from('managers')
    .select(`
      id,
      name,
      course,
      reg_number,
      contact_number,
      x,
      instagram,
      email,
      image,
      period,
      positions (
        id,
        name,
        functions (
          id,
          name
        )
      )
    `)

  if (error) {
    console.error('Error fetching managers:', error)
    return null
  }

  return data
}

const fetchPeriods = async () => {
  const { data, error } = await supabase
    .from('periods')
    .select('id, range')
    .order('range')

  if (error) {
    console.error('Error fetching periods:', error)
    return null
  }

  return data
}

export default function ManagersMobile({ setCurrentIndex }: ITabProps) {
  const [currentSlide, setCurrentSlide] = useState('')
  const [managers, setManagers] = useState<any>([])
  const [periods, setPeriods] = useState<any>([])
  const [selectedRange, setSelectedRange] = useState(periods[periods.length - 1]);
  const [direction, setDirection] = useState<any>([])
  const [membersByTeam, setMembersByTeam] = useState<any>([])
  const [teams, setTeams] = useState<any>([])

  useEffect(() => {
    const getManagers = async () => {
      const data = await fetchManagers()
      setManagers(data)
    }

    getManagers()
  }, [])

  useEffect(() => {
    const getPeriods = async () => {
      const data = await fetchPeriods()
      const dateRanges = data?.map((d: any) => d.range)
      setPeriods(dateRanges)
      if (dateRanges) {
        setSelectedRange(dateRanges[dateRanges.length - 1])
      }
    }

    getPeriods()
  }, [])

  useEffect(() => {
    if (!selectedRange || !managers.length || !periods.length) return

    const filteredManagers = managers.filter((manager: any) =>
      manager.period === selectedRange ||
      (!selectedRange && manager.period === periods[periods.length - 1])
    )

    const filteredDirection = filteredManagers.filter((manager: any) => manager.positions.functions.name === 'Diretoria')
    setDirection(filteredDirection)

    const uniqueTeams = [
      ...new Set(filteredManagers.map((manager: any) => manager.positions.functions.name).filter((team: any) => team !== 'Diretoria')),
    ]
    setTeams(uniqueTeams)

    if (currentSlide === '') {
      setCurrentSlide(teams[0] || '')
    }

    const filteredMembersByTeam = filteredManagers.filter((manager: any) => manager.positions.functions.name === currentSlide)
    setMembersByTeam(filteredMembersByTeam)

  }, [selectedRange, managers, periods, currentSlide])

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 text-4xl md:text-5xl font-light bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 hover:opacity-80 transition-opacity">
                Gestão
                <ChevronDown className="size-6 md:size-8 mt-1 md:mt-4 md:ml-4" color='white' />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-zinc-900/95 backdrop-blur-sm border-white/10">
              {sections.map((section) => (
                <DropdownMenuItem
                  key={section.id}
                  className={cn(
                    "text-lg py-3 cursor-pointer text-white/40 hover:text-white focus:text-white",
                    "gestao" === section.id && "text-white"
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


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6"
        >
          <div className="w-full md:w-[280px]">
            <Select value={selectedRange} onValueChange={setSelectedRange}>
              <SelectTrigger className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 opacity-50" />
                  <SelectValue placeholder="Selecione um período" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-white/10">
                {periods.map((period: string) => (
                  <SelectItem
                    key={period}
                    value={period}
                    className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white"
                  >
                    {period}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Lema */}
        <Separator className="mb-6 bg-zinc-800" />
        <div className="flex flex-col items-center gap-6 text-sm text-zinc-400 mb-6">
          {/* <Image
            width={80}
            height={80}
            src="/logo-alt.png"
            alt="MED-PUC Logo"
            className="w-20 h-20"
          /> */}
          <p className="flex-1 text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, porro esse
            autem fugiat velit exercitationem quia nulla quod voluptates perspiciatis qui
            rem id doloremque obcaecati soluta cupiditate praesentium suscipit
            nesciunt?
          </p>
        </div>

        {/* Management Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {direction.map((person: any, index: number) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={person.name}
            >
              <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800/50 p-8 rounded-2xl shadow-xl">
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-lg font-light uppercase tracking-wider mb-4 text-white/60">{person.positions.name}</h3>
                  <Avatar className="w-40 h-40 mb-6 ring-2 ring-white/10 ring-offset-2 ring-offset-black group-hover:ring-white/30 transition-all duration-300">
                    <img src={person.image} alt={person.name} className="object-cover" />
                  </Avatar>
                  <p className="text-secundaria-extralight text-xl mb-4">{person.name}</p>
                  <div className="flex gap-4">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="cursor-pointer text-white/50 hover:text-white transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="cursor-pointer text-white/50 hover:text-white transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="cursor-pointer text-white/50 hover:text-white transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </motion.div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-4 mb-8">
            <Users className="h-8 w-8" />
            <h2 className="text-3xl font-bold">Equipes</h2>
            <Separator className="flex-1 bg-zinc-800" />
          </div>

          <div className="flex items-center justify-center flex-wrap gap-2 bg-transparent h-auto p-0 mb-8">
            {teams.map((team: any) => (
              <Button
                key={team}
                variant="secondary"
                className={`${currentSlide === team ? 'text-black bg-white/90 cursor-default' : 'text-white/60 bg-white/5 hover:bg-white/10'} backdrop-blur-lg border-white/10 p-8 transition-all duration-300 px-6 py-3 rounded-full border border-zinc-800 hover:border-zinc-700`}
                onClick={() => setCurrentSlide(team)}
              >
                {team}
              </Button>
            ))}
          </div>


          <Card className="bg-zinc-900/50 backdrop-blur-sm border-zinc-800/50 p-8 rounded-2xl shadow-xl">
            <div className="max-w-2xl mb-8">
              <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                {currentSlide}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {membersByTeam.length > 0 &&
                membersByTeam.map((member: any, index: number) => (
                  <div
                    key={index}
                    className="group flex items-center gap-4 bg-black/20 p-4 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all duration-300"
                  >
                    <Avatar className="w-16 h-16 ring-2 ring-offset-2 ring-offset-black ring-white/10 group-hover:ring-white/20 transition-all duration-300">
                      <img src={member.image} alt={member.name} className="object-cover" />
                    </Avatar>
                    <div>
                      <h3 className="text-white font-semibold group-hover:text-white transition-colors duration-300">
                        {member.name}
                      </h3>
                      <Badge variant="secondary" className="mt-1 bg-secundaria-extralight group-hover:bg-secundaria-extralight">
                        {member.positions.functions.name}
                      </Badge>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
