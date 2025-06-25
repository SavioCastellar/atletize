"use client"

import React, { useState, useMemo, useRef, useEffect } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CalendarIcon, Trash2Icon, EditIcon, PartyPopper, Star, CalendarCheck } from 'lucide-react'
import { format, startOfWeek, endOfWeek, eachDayOfInterval, setHours, setMinutes, isSameDay, addDays } from 'date-fns'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ptBR } from 'date-fns/locale'
import { IconBallFootball } from '@tabler/icons-react'
import { supabase } from '@/app/api/auth/supabase/client'
import { toast } from 'sonner'

interface Event {
  id: string
  title: string
  start_time: Date
  end_time: Date
  recurrence?: 'daily' | 'weekly' | 'monthly' | 'yearly'
  event_type: 'party' | 'sport' | 'general'
  modality?: string
  team1?: string
  team2?: string
}

interface EventData {
  // id: string
  title: string
  start_time: Date
  end_time: Date
  recurrence?: 'daily' | 'weekly' | 'monthly' | 'yearly'
  event_type: 'party' | 'sport' | 'general'
  modality?: string
  team1?: string
  team2?: string
}

const eventTypeStyles = {
  party: {
    color: 'bg-amber-100',
    icon: PartyPopper,
  },
  sport: {
    color: 'bg-slate-100',
    icon: IconBallFootball,
  },
  general: {
    color: 'bg-primary-foreground',
    icon: CalendarCheck,
  },
};

const DraggableEvent: React.FC<{ event: Event; moveEvent: (id: string, date: Date) => void }> = ({ event, moveEvent }) => {
  const ref = useRef<HTMLDivElement>(null)

  const [{ isDragging }, drag] = useDrag({
    type: 'EVENT',
    item: { id: event.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  drag(ref)

  const eventDurationInHours = (new Date(event.end_time).getTime() - new Date(event.start_time).getTime()) / (1000 * 60 * 60)
  const hourHeight = 48
  const eventHeight = eventDurationInHours * hourHeight

  const { color, icon: EventIcon } = eventTypeStyles[event.event_type];

  return (
    <div
      ref={ref}
      className={`flex justify-between absolute z-10 rounded-md left-0 right-0 ${color} text-black text-xs p-1 overflow-hidden cursor-move ${isDragging ? 'opacity-50' : ''}`}
      style={{
        height: `${eventHeight}px`,
      }}
    >
      {event.title}
      <EventIcon className="w-4 h-4 ml-2" />
    </div>
  )
}

export default function EventCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [events, setEvents] = useState<Event[]>([])
  const [newEventTitle, setNewEventTitle] = useState('')
  const [newEventStartTime, setNewEventStartTime] = useState('09:00')
  const [newEventEndTime, setNewEventEndTime] = useState('10:00')
  const [newEventType, setNewEventType] = useState<Event['event_type']>('general')
  const [newEventModality, setNewEventModality] = useState('')
  const [newEventTeam1, setNewEventTeam1] = useState('')
  const [newEventTeam2, setNewEventTeam2] = useState('')
  const [showEventDialog, setShowEventDialog] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [newEventRecurrence, setNewEventRecurrence] = useState<Event['recurrence']>()
  const calendarBodyRef = useRef<HTMLDivElement>(null)
  const hourHeight = 48

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from('events').select('*')
      if (error) {
        toast.error('Erro ao buscar eventos')
      } else {
        if (data.length > 0)
          setEvents(data)
        else setEvents([])
      }
    }
    fetchEvents()
  }, [])

  useEffect(() => {
    if (calendarBodyRef.current) {
      const now = new Date()
      const minutesSinceStartOfDay = now.getHours() * 60 + now.getMinutes()
      const calendarHeight = hourHeight * 24

      const offset = (minutesSinceStartOfDay / (24 * 60)) * calendarHeight

      setTimeout(() => {
        calendarBodyRef.current?.scrollTo({
          top: offset - calendarBodyRef.current.clientHeight / 2,
          behavior: 'smooth',
        })
      }, 0)
    }
  }, [])

  const handleAddOrUpdateEvent = async () => {
    if (selectedDate && newEventTitle) {
      const [startHour, startMinute] = newEventStartTime.split(':').map(Number)
      const [endHour, endMinute] = newEventEndTime.split(':').map(Number)

      // Use selectedDate without modifying the time component
      const baseDate = selectedDate

      const startTime = setMinutes(setHours(baseDate, startHour), startMinute)
      const endTime = setMinutes(setHours(baseDate, endHour), endMinute)

      const eventData: EventData = {
        // id: editingEvent ? editingEvent.id : Date.now().toString(),
        title: newEventTitle,
        start_time: startTime,
        end_time: endTime,
        recurrence: newEventRecurrence,
        event_type: newEventType,
        ...(newEventType === 'sport' && {
          modality: newEventModality,
          team1: newEventTeam1,
          team2: newEventTeam2,
        }),
      }

      let result: any
      if (editingEvent) {
        // Update existing event
        const { data, error } = await supabase
          .from('events')
          .update(eventData)
          .eq('id', editingEvent.id)
        if (error) {
          console.error('Error updating event:', error)
          return
        }
        if (data)
          result = data[0]
      } else {
        // Insert new event
        const { data, error } = await supabase.from('events').insert([eventData])
        if (error) {
          toast.error('Erro ao criar evento.')
          return
        }
      }

      // Update local state
      setEvents((prevEvents) => {
        if (editingEvent) {
          return prevEvents.map((e) => (e.id === result.id ? result : e))
        } else {
          return [...prevEvents, eventData]
        }
      })

      // if (editingEvent) {
      //   setEvents((prevEvents) =>
      //     prevEvents.map((e) => (e.id === editingEvent.id ? eventData : e))
      //   )
      // } else {
      //   setEvents((prevEvents) => [...prevEvents, eventData])
      // }

      // Reset form
      setNewEventTitle('')
      setNewEventRecurrence(undefined)
      setNewEventType('general')
      setNewEventModality('')
      setNewEventTeam1('')
      setNewEventTeam2('')
      setShowEventDialog(false)
      setEditingEvent(null)
    }
  }

  const handleDeleteEvent = async (id: string) => {
    // const { error } = await supabase.from('events').delete().eq('id', id);
    // if (error) {
    //   console.error('Error deleting event:', error);
    //   return;
    // }
    setEvents(events.filter(e => e.id !== id))
  }

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event)
    setNewEventTitle(event.title)
    setNewEventStartTime(format(event.start_time, 'HH:mm', { locale: ptBR }))
    setNewEventEndTime(format(event.end_time, 'HH:mm', { locale: ptBR }))
    setNewEventRecurrence(event.recurrence)
    setSelectedDate(event.start_time)
    setNewEventType(event.event_type)

    if (event.event_type === 'sport') {
      setNewEventModality(event.modality || '')
      setNewEventTeam1(event.team1 || '')
      setNewEventTeam2(event.team2 || '')
    } else {
      setNewEventModality('')
      setNewEventTeam1('')
      setNewEventTeam2('')
    }

    setShowEventDialog(true)
  }

  const moveEvent = (id: string, newStartTime: Date) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => {
        if (event.id === id) {
          const duration = new Date(event.end_time).getTime() - new Date(event.start_time).getTime()
          return {
            ...event,
            start_time: newStartTime,
            end_time: new Date(newStartTime.getTime() + duration),
          }
        }
        return event
      })
    )
  }

  console.log('events', events)

  const eventsForSelectedDate = events.length > 0 ? (
    events.filter((event) =>
      isSameDay(event.start_time, selectedDate)
  )) : []

  const eventDays = useMemo(() => {
    return events.reduce((acc, event) => {
      const startTimeDate = new Date(event.start_time)
      const dateString = startTimeDate.toDateString()
      acc[dateString] = true
      return acc
    }, {} as Record<string, boolean>)
  }, [events])

  const CurrentTimeLine = () => {
    const [offset, setOffset] = useState(getCurrentTimeOffset())

    useEffect(() => {
      const interval = setInterval(() => {
        setOffset(getCurrentTimeOffset())
      }, 60000)

      return () => clearInterval(interval)
    }, [])

    return (
      <div
        className="absolute left-0 right-0 h-0.5 bg-[#fb7185] z-20 flex items-center"
        style={{ top: `${offset + 32}px` }}
      >
        <div className="bg-[#fb7185] text-white text-xs px-2 rounded-full">
          {format(new Date(), 'HH:mm')}
        </div>
      </div>
    )
  }

  const getCurrentTimeOffset = () => {
    const now = new Date()
    const minutesSinceStartOfDay = now.getHours() * 60 + now.getMinutes()
    const calendarHeight = hourHeight * 24
    const offset = (minutesSinceStartOfDay / (24 * 60)) * calendarHeight

    return offset
  }


  const renderWeeklyView = () => {
    const weekStart = startOfWeek(selectedDate)
    const weekEnd = endOfWeek(selectedDate)
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd })
    const hours = Array.from({ length: 24 }, (_, i) => i)

    return (
      <div ref={calendarBodyRef} className="relative h-[calc(90vh-2rem)] overflow-auto">
        <div className="grid grid-cols-8">
          {/* Calendar Header */}
          <div className="col-span-1"></div>
          {days.map((day) => (
            <div key={day.toString()} className="text-center font-bold mb-2">
              {format(day, 'EEE d', { locale: ptBR })}
            </div>
          ))}
          {/* Calendar Body */}
          {hours.map((hour) => (
            <React.Fragment key={hour}>
              <div className="text-right pr-2 text-sm">
                {format(setHours(new Date(), hour), 'HH:00', { locale: ptBR })}
              </div>
              {days.map((day) => (
                <DroppableHourCell
                  key={`${day}-${hour}`}
                  day={day}
                  hour={hour}
                  onDrop={(item) =>
                    moveEvent(item.id, setMinutes(setHours(day, hour), 0))
                  }
                  onClick={() => {
                    setSelectedDate(day)
                    setNewEventStartTime(`${hour.toString().padStart(2, '0')}:00`)
                    setNewEventEndTime(
                      `${(hour + 1).toString().padStart(2, '0')}:00`
                    )
                    setShowEventDialog(true)
                  }}
                >
                  {events
                    .filter(
                      (event) =>
                        isSameDay(new Date(event.start_time), day) &&
                      new Date(event.start_time).getHours() === hour
                    )
                    .map((event) => (
                      <DraggableEvent
                        key={event.id}
                        event={event}
                        moveEvent={moveEvent}
                      />
                    ))}
                </DroppableHourCell>
              ))}
            </React.Fragment>
          ))}
        </div>
        <CurrentTimeLine />
      </div>
    )
  }

  const modifiers = {
    hasEvent: (date: Date) => {
      const dateString = date.toDateString()
      return eventDays[dateString] && !isSameDay(date, selectedDate)
    },
    selected: (date: Date) => isSameDay(date, selectedDate),
  }

  const modifiersStyles = {
    hasEvent: { backgroundColor: '#cffafe', color: '#000' }, // Gold color for days with events
    selected: { backgroundColor: '#000000', color: '#FFF' }, // DodgerBlue for the selected date
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-full">
        <div className="w-80 p-4 border-r overflow-auto">
          <h1 className="text-2xl font-bold mb-4">Calendário de Eventos</h1>
          <div className="mb-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => setSelectedDate(date || new Date())}
              className="rounded-md border shadow"
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
              locale={ptBR}
            />
          </div>
          <Button className="w-full mb-4" onClick={() => setShowEventDialog(true)}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            Adicionar Evento
          </Button>
          <h2 className="text-lg font-semibold mb-2">
            Eventos em {format(selectedDate, "d 'de' MMMM", { locale: ptBR })}
          </h2>
          <ul className="space-y-2">
            {eventsForSelectedDate.map((event) => (
              <li
                key={event.id}
                className="bg-secondary p-2 rounded text-sm flex justify-between items-center"
              >
                <div>
                  {event.title}
                  {event.start_time && event.end_time && (
                    <div className="text-xs">
                      {format(event.start_time, 'HH:mm', { locale: ptBR })} - {format(event.end_time, 'HH:mm', { locale: ptBR })}
                    </div>
                  )}
                  {event.event_type === 'sport' && (
                    <div className="text-xs">
                      <div>{event.modality}</div>
                      <div>{event.team1} x {event.team2}</div>
                    </div>
                  )}
                </div>
                <div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditEvent(event)}
                  >
                    <EditIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 p-4 overflow-hidden">
          {renderWeeklyView()}
        </div>
        <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="event-type" className="text-right">
                  Tipo de Evento
                </Label>
                <Select
                  value={newEventType}
                  onValueChange={(value) => {
                    setNewEventType(value as Event['event_type']);
                    // Reset sport-specific fields when the event type changes
                    if (value !== 'sport') {
                      setNewEventModality('');
                      setNewEventTeam1('');
                      setNewEventTeam2('');
                    }
                  }}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o tipo de evento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="party">Festa</SelectItem>
                    <SelectItem value="sport">Jogo Esportivo</SelectItem>
                    <SelectItem value="general">Geral</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newEventType === 'sport' && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="event-modality" className="text-right">
                      Modalidade
                    </Label>
                    <Input
                      id="event-modality"
                      variant='forms'
                      value={newEventModality}
                      onChange={(e) => setNewEventModality(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="event-team1" className="text-right">
                      Equipe 1
                    </Label>
                    <Input
                      id="event-team1"
                      variant='forms'
                      value={newEventTeam1}
                      onChange={(e) => setNewEventTeam1(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="event-team2" className="text-right">
                      Equipe 2
                    </Label>
                    <Input
                      id="event-team2"
                      variant='forms'
                      value={newEventTeam2}
                      onChange={(e) => setNewEventTeam2(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="event-title" className="text-right">
                  Event Title
                </Label>
                <Input
                  variant='forms'
                  id="event-title"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="event-start-time" className="text-right">
                  Start Time
                </Label>
                <Input
                  variant='forms'
                  id="event-start-time"
                  type="time"
                  value={newEventStartTime}
                  onChange={(e) => setNewEventStartTime(e.target.value)}
                  className="col-span-3"
                  lang="en-GB"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="event-end-time" className="text-right">
                  End Time
                </Label>
                <Input
                  variant='forms'
                  id="event-end-time"
                  type="time"
                  value={newEventEndTime}
                  onChange={(e) => setNewEventEndTime(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="event-recurrence" className="text-right">
                  Recurrence
                </Label>
                <Select
                  value={newEventRecurrence}
                  onValueChange={(value) => setNewEventRecurrence(value as Event['recurrence'])}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select recurrence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleAddOrUpdateEvent}>{editingEvent ? 'Update Event' : 'Add Event'}</Button>
          </DialogContent>
        </Dialog>
      </div>
    </DndProvider>
  )
}

const DroppableHourCell: React.FC<{
  day: Date
  hour: number
  onDrop: (item: { id: string }) => void
  onClick: () => void
  children: React.ReactNode
}> = ({ day, hour, onDrop, onClick, children }) => {
  const ref = useRef<HTMLDivElement>(null)

  const [{ isOver }, drop] = useDrop({
    accept: 'EVENT',
    drop: onDrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  drop(ref)

  return (
    <div
      ref={ref}
      className={`border-t border-l h-12 relative ${isOver ? 'bg-secondary' : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
