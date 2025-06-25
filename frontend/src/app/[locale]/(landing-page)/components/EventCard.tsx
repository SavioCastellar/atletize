import { Button } from '@/app/shared/components/Button'
import { Calendar, MapPin, X } from 'lucide-react'
import React from 'react'
import dayjs from 'dayjs';

interface EventCardProps {
  eventInfo: {
    title: string
    description?: string
    start_time: string
    location: string
    event_type: string
    tournament: string
    team1?: string
    team2?: string
    modality?: string
  }
}

function EventCard({ eventInfo }: EventCardProps) {
  // format date to pt-BR showing hours
  const formatDate = new Date(eventInfo.start_time).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  return (
    <div className='relative overflow-hidden h-[400px] w-[500px] p-6 rounded-xl flex flex-col bg-zinc-100 shadow-md'>
      {eventInfo.event_type === 'Jogo Esportivo' ? (
        <div className='flex flex-col justify-between mx-6 items-center gap-2'>
          <div className='flex flex-col gap-2'>
            <h4 className='text-md font-medium'>{eventInfo.team1}</h4>
          </div>
          <X className='h-6 w-6' />
          <div className='flex flex-col gap-2'>
            <h4 className='text-md font-medium'>{eventInfo.team2}</h4>
          </div>
        </div>
      ) : (
        <div className='flex flex-col justify-start items-start h-[50%] w-full gap-3'>
          <h2 className='text-xl'>
            {eventInfo.title}
          </h2>
          <h3 className='text-sm'>
            {eventInfo.description}
          </h3>
        </div>
      )
      }

      <div className='absolute bottom-0 left-0 w-full border border-black rounded-xl bg-background'>
        <div className='mx-8 my-4 gap-10 flex flex-col'>
          {eventInfo.event_type === 'Jogo Esportivo' && (
            <div>
              <h5 className='text-sm'>{eventInfo.tournament}</h5>
              <h1 className='text-xl font-medium'>{eventInfo.modality}</h1>
            </div>
          )}
          <div className='flex flex-col gap-3 text-md'>
            <div className='flex gap-3'>
              <Calendar className='h-6 w-6' />
              <h3 className=''>{formatDate}</h3>
            </div>
            <div className='flex gap-3'>
              <MapPin className='h-6 w-6' />
              <h3>{eventInfo.location}</h3>
            </div>
          </div>
          {/* Centered button */}
          <Button className='w-40 self-center'>Calendário</Button>
        </div>
      </div>
    </div>
  )
}

export default EventCard
