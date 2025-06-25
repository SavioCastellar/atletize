'use client'
import { Container } from '@/app/[locale]/(landing-page)/components/Container'
import { motion } from 'framer-motion'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import EventCard from './EventCard'
import { Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import EventCalendar from '../calendario/page'
import { supabase } from '@/app/api/auth/supabase/client'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'

export function Events() {
  const [events, setEvents] = useState<any>([])

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select(`*`)
      .order('start_time', { ascending: true })

    if (error) {
      toast.error('Erro ao buscar eventos')
    } else if (data) {
      setEvents(data)
    }
  }

  return (
    <Container className="flex flex-col my-14 mx-20 gap-6">
      <motion.h1
        className="text-3xl font-normal"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        Próximos Eventos e Competições
      </motion.h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='bg-primaria gap-5 flex justify-center items-center'>
            <Calendar className="w-6 h-6" />
            Calendário completo
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-full h-[95vh] w-[95vw] overflow-hidden">
          <EventCalendar />
        </DialogContent>
      </Dialog>

      <div className="flex justify-center items-center">
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full"
        >
          <CarouselContent>
            {Array.from({ length: events.length }).map((_, index) => (
              <CarouselItem key={index} className="basis-1/4">
                <motion.div
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{
                    duration: 0.5,
                    ease: 'easeOut',
                    delay: 0.2,
                  }}
                >
                  <EventCard eventInfo={events[index]} />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </Container>
  )
}
