import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'
import useSupabaseBrowser from '../../../../../../utils/supabase-browser'
import { Calendar, Clock, Trophy } from 'lucide-react'
import { Dialog as ShadcnDialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import { TimePickerInput } from '@/components/ui/time-picker-input'
import { modalityIcons } from '@/app/constants'
import {
  Dialog as IconDialog,
  DialogTrigger as IconDialogTrigger,
  DialogContent as IconDialogContent,
  DialogHeader as IconDialogHeader,
  DialogTitle as IconDialogTitle,
  DialogDescription as IconDialogDescription,
} from '@/components/ui/dialog'
import { toast } from 'sonner'

interface NovaModalidadeProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

type DayKey = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat'

const formSchema = z.object({
  name: z.string().min(2, { message: 'Nome muito curto (mínimo 2 caracteres).' }).max(50, { message: 'Nome muito longo (máximo 50 caracteres)' }),
  instagram: z.string().optional(),
  description: z.string().optional(),
  icon: z.string().min(1, { message: 'Selecione um ícone.' }),
  status: z.boolean(),
  training_schedule: z.object({
    sun: z.string().nullable(),
    mon: z.string().nullable(),
    tue: z.string().nullable(),
    wed: z.string().nullable(),
    thu: z.string().nullable(),
    fri: z.string().nullable(),
    sat: z.string().nullable(),
  }),
  tournaments: z.array(
    z.object({
      tournament_name: z.string().min(1, { message: 'Nome do torneio é obrigatório.' }),
      gold: z.coerce.number().min(0).default(0),
      silver: z.coerce.number().min(0).default(0),
      bronze: z.coerce.number().min(0).default(0),
    })
  ).optional()
})

function NovaModalidade({ isOpen, setIsOpen }: NovaModalidadeProps) {
  const [selectedIcon, setSelectedIcon] = useState<string>('')
  const [iconsGridOpen, setIconsGridOpen] = useState<boolean>(false)
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState<boolean>(false)
  const supabase = useSupabaseBrowser()

  const closeModal = () => {
    setIsOpen(false)
    form.reset()
    setSelectedIcon('')
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      instagram: '',
      description: '',
      icon: '',
      status: true,
      training_schedule: {
        sun: null,
        mon: null,
        tue: null,
        wed: null,
        thu: null,
        fri: null,
        sat: null,
      },
      tournaments: []
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    for (const dayKey of Object.keys(data.training_schedule) as DayKey[]) {
      const time = data.training_schedule[dayKey]
      if (time && time.length === 5) {
        data.training_schedule[dayKey] = `${time}:00`
      }
    }

    const { data: modality, error } = await supabase
      .from('modalities')
      .insert({
        name: data.name,
        instagram: data.instagram,
        description: data.description,
        icon: data.icon,
        status: data.status,
      })
      .select()

    if (error) {
      toast.error('Erro ao inserir nova modalidade.')
    } else {
      const modalityId = modality[0].id
      const { error: scheduleError } = await supabase
        .from('training_schedule')
        .insert({
          modality_id: modalityId,
          ...data.training_schedule,
        })

      if (scheduleError) {
        toast.error('Erro ao inserir horários de treino.')
      }

      if (data.tournaments && data.tournaments.length > 0) {
        for (const tournamentData of data.tournaments) {
          const { data: existingTournament, error: tournamentFetchError } = await supabase
            .from('tournaments')
            .select('id')
            .eq('name', tournamentData.tournament_name)
            .maybeSingle()

          let tournamentId

          if (tournamentFetchError || !existingTournament) {
            const { data: newTournament, error: tournamentInsertError } = await supabase
              .from('tournaments')
              .insert({
                name: tournamentData.tournament_name,
              })
              .select()

            if (tournamentInsertError) {
              toast.error('Erro ao inserir torneio.')
              continue
            }

            tournamentId = newTournament[0].id
          } else {
            tournamentId = existingTournament.id
          }

          const { error: tmError } = await supabase
            .from('tournaments_modalities')
            .insert({
              tournament_id: tournamentId,
              modality_id: modalityId,
              gold: tournamentData.gold || 0,
              silver: tournamentData.silver || 0,
              bronze: tournamentData.bronze || 0,
            })

          if (tmError) {
            toast.error('Erro ao inserir relação torneio-modalidade.')
          } else {
            toast.success('Modalidade criada com sucesso!')
          }
        }
      }
    }

    closeModal()
  }


  const minuteRef = React.useRef<HTMLInputElement>(null)
  const hourRef = React.useRef<HTMLInputElement>(null)

  const dayKeys = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const
  const dayNames = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ]

  const { control } = form

  const { fields: tournamentFields, append: appendTournament, remove: removeTournament } = useFieldArray({
    control,
    name: "tournaments",
  })

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="flex flex-col w-full max-w-lg h-auto transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                  onClick={(e) => e.stopPropagation()}>
                  <div className='flex flex-col'>
                    <Dialog.Title
                      as="h3"
                      className="flex justify-center text-lg font-medium leading-6 text-gray-900"
                    >
                      Adicionar Nova Modalidade
                    </Dialog.Title>
                    <div className='w-full pb-2'>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                          {/* Name Field */}
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <div className="grid w-full items-center gap-1.5 mt-4">
                                  <Label>Nome</Label>
                                  <Input
                                    {...field}
                                    className="min-w-56 h-10 border border-border px-4 text-sm text-foreground bg-white placeholder:text-zinc-900/60 rounded-lg"
                                    id="name"
                                    placeholder='Informe o nome da modalidade.' />
                                </div>
                                <FormMessage />
                              </FormItem>
                            )} />
                          {/* Instagram Field */}
                          <FormField
                            control={form.control}
                            name="instagram"
                            render={({ field }) => (
                              <FormItem>
                                <div className="grid w-full items-center gap-1.5 mt-4">
                                  <Label>Instagram</Label>
                                  <Input
                                    {...field}
                                    className="min-w-56 h-10 border border-border px-4 text-sm text-foreground bg-white placeholder:text-zinc-900/60 rounded-lg"
                                    id="instagram"
                                    placeholder='Informe o Instagram da modalidade.'
                                  />
                                </div>
                              </FormItem>
                            )} />
                          {/* Description Field */}
                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <div className="grid w-full items-center gap-1.5 mt-4">
                                  <Label>Descrição</Label>
                                  <Textarea
                                    {...field}
                                    className='px-4 text-sm font-medium placeholder:text-zinc-900/60 placeholder:font-normal border border-border rounded-lg'
                                    id="description"
                                    placeholder='Descreva a modalidade.' />
                                </div>
                              </FormItem>
                            )} />
                          {/* Icon Selection */}
                          <FormField
                            control={form.control}
                            name="icon"
                            render={({ field }) => (
                              <FormItem>
                                <div className="grid w-full items-center gap-1.5 mt-4">
                                  <Label>Ícone</Label>
                                  <IconDialog open={iconsGridOpen} onOpenChange={setIconsGridOpen}>
                                    <IconDialogTrigger asChild>
                                      <Button
                                        variant="outline"
                                        className="w-full justify-between bg-white placeholder:text-zinc-900/60 text-foreground text-sm border border-border"
                                      >
                                        {selectedIcon ? (
                                          <div className="flex items-center">
                                            <Image
                                              src={`${selectedIcon}`}
                                              alt="Ícone selecionado"
                                              width={24}
                                              height={24}
                                            />
                                            <span className="ml-4">Ícone selecionado</span>
                                          </div>
                                        ) : (
                                          'Selecione um ícone'
                                        )}
                                      </Button>
                                    </IconDialogTrigger>
                                    <IconDialogContent>
                                      <IconDialogHeader>
                                        <IconDialogTitle>Selecione um Ícone</IconDialogTitle>
                                      </IconDialogHeader>
                                      <IconDialogDescription>
                                        <div className="grid grid-cols-5 gap-4 p-4">
                                          {modalityIcons.map((icon, index) => (
                                            <button
                                              key={index}
                                              onClick={() => {
                                                setSelectedIcon(icon)
                                                field.onChange(icon)
                                                setIconsGridOpen(false)
                                              }}
                                              className="flex justify-center items-center p-2 border rounded-md hover:bg-gray-100"
                                            >
                                              <Image
                                                src={`${icon}`}
                                                alt={`Ícone ${index + 1}`}
                                                width={40}
                                                height={40}
                                              />
                                            </button>
                                          ))}
                                        </div>
                                      </IconDialogDescription>
                                    </IconDialogContent>
                                  </IconDialog>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          {/* Training Schedule Button */}
                          <div className="grid w-full items-center gap-1.5 mt-4">
                            <Label>Horário de Treino</Label>
                            {/* Training Schedule Dialog */}
                            <ShadcnDialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
                              <DialogTrigger asChild>
                                <Button variant="outline" className="w-full justify-between bg-white placeholder:text-zinc-900/60 text-foreground text-sm border border-border">
                                  Configurar Horário
                                  <Calendar className="ml-2 h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Configurar Horário de Treino</DialogTitle>
                                </DialogHeader>
                                <DialogDescription>
                                  <div className="flex flex-col justify-center items-center gap-1">
                                    {dayKeys.map((dayKey, index) => {
                                      return (
                                        <Controller
                                          key={dayKey}
                                          control={form.control}
                                          name={`training_schedule.${dayKey}`}
                                          render={({ field }) => {
                                            const isDayEnabled = !!field.value
                                            return (
                                              <div className={`flex items-center gap-2 text-zinc-900 ${!isDayEnabled ? 'opacity-30' : ''}`}>
                                                <Label className="w-32">{dayNames[index]}</Label>
                                                <TimePickerInput
                                                  className='border border-border h-12 rounded-md'
                                                  date={field.value ? new Date(`1970-01-01T${field.value}:00`) : undefined}
                                                  setDate={(date) => {
                                                    if (date) {
                                                      const hours = date.getHours().toString().padStart(2, '0')
                                                      const minutes = date.getMinutes().toString().padStart(2, '0')
                                                      const timeString = `${hours}:${minutes}`
                                                      field.onChange(timeString)
                                                    } else {
                                                      field.onChange(undefined)
                                                    }
                                                  }}
                                                  picker="hours"
                                                />
                                                <TimePickerInput
                                                  className='border border-border h-12 rounded-md'
                                                  date={field.value ? new Date(`1970-01-01T${field.value}:00`) : undefined}
                                                  setDate={(date) => {
                                                    if (date) {
                                                      const hours = date.getHours().toString().padStart(2, '0')
                                                      const minutes = date.getMinutes().toString().padStart(2, '0')
                                                      const timeString = `${hours}:${minutes}`
                                                      field.onChange(timeString)
                                                    } else {
                                                      field.onChange(undefined)
                                                    }
                                                  }}
                                                  picker="minutes"
                                                />
                                                <Clock className="h-6 w-6" />
                                              </div>
                                            )
                                          }}
                                        />
                                      )
                                    })}
                                  </div>
                                </DialogDescription>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>Fechar</Button>
                                </DialogFooter>
                              </DialogContent>
                            </ShadcnDialog>
                          </div>
                          {/* Tournaments Section */}
                          <div className="grid w-full items-center gap-1.5 mt-4">
                            <Label>Torneios</Label>
                            {tournamentFields.map((item, index) => (
                              <div key={item.id} className="flex flex-col mb-4 border p-4 rounded">
                                <FormField
                                  control={form.control}
                                  name={`tournaments.${index}.tournament_name`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <Label>Nome do Torneio</Label>
                                      <Input
                                        {...field}
                                        variant='forms'
                                        placeholder="Informe o nome do torneio"
                                        className="mb-2"
                                      />
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <div className="flex space-x-2">
                                  <FormField
                                    control={form.control}
                                    name={`tournaments.${index}.gold`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <Label>Ouro</Label>
                                        <Input
                                          {...field}
                                          variant='forms'
                                          type="number"
                                          min="0"
                                          placeholder="0"
                                          onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                          />
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name={`tournaments.${index}.silver`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <Label>Prata</Label>
                                        <Input
                                          {...field}
                                          variant='forms'
                                          type="number"
                                          min="0"
                                          placeholder="0"
                                          onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                        />
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                    />
                                  <FormField
                                    control={form.control}
                                    name={`tournaments.${index}.bronze`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <Label>Bronze</Label>
                                        <Input
                                          {...field}
                                          variant='forms'
                                          type="number"
                                          min="0"
                                          placeholder="0"
                                          onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                        />
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                                <Button
                                  type="button"
                                  variant="destructive"
                                  className="mt-2 self-end"
                                  onClick={() => removeTournament(index)}
                                >
                                  Remover
                                </Button>
                              </div>
                            ))}
                            <Button
                              className="w-full justify-between bg-white placeholder:text-zinc-900/60 text-foreground text-sm border border-border"
                              variant="outline"
                              type="button"
                              onClick={() => appendTournament({ tournament_name: '', gold: 0, silver: 0, bronze: 0 })}
                            >
                              Adicionar Torneio
                              <Trophy className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                          {/* Status Field */}
                          <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                              <FormItem>
                                <div className="flex items-center gap-2 mt-4">
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={(value) => field.onChange(value)}
                                    id="status"
                                  />
                                  <Label htmlFor="status">Ativo</Label>
                                </div>
                              </FormItem>
                            )} />
                          {/* Submit Button */}
                          <div className='flex justify-center mt-6'>
                            <Button className="w-28" type="submit">Salvar</Button>
                          </div>
                        </form>
                      </Form>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default NovaModalidade
