'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { supabase } from '@/app/api/auth/supabase/client'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { YearRangePicker } from '@/components/ui/year-range-picker'


interface Period {
  id: string
  range: string
}

interface NewPeriodProps {
  onClose: () => void
}

export const NewPeriod = ({ onClose }: NewPeriodProps) => {
  const [periods, setPeriods] = useState<Period[]>([])

  const PeriodSchema = z
    .object({
      startYear: z
        .string()
        .nonempty('O ano de início é obrigatório')
        .refine((year) => !isNaN(Number(year)), 'Ano de início inválido'),
      endYear: z
        .string()
        .nonempty('O ano de fim é obrigatório')
        .refine((year) => !isNaN(Number(year)), 'Ano de fim inválido'),
    })
    .refine(
      (data) => Number(data.startYear) <= Number(data.endYear),
      {
        message: 'O ano de início deve ser menor ou igual ao ano de fim',
        path: ['endYear'],
      }
    )

  const form = useForm<z.infer<typeof PeriodSchema>>({
    resolver: zodResolver(PeriodSchema),
    defaultValues: {
      startYear: '',
      endYear: '',
    },
    mode: 'onChange',
  })

  const fetchPeriods = async () => {
    const { data: periodsData, error } = await supabase
      .from('periods')
      .select('id, range')
      .order('range')

    if (error) {
      toast.error('Erro ao buscar períodos')
      return
    }

    setPeriods(periodsData || [])
  }

  useEffect(() => {
    fetchPeriods()
  }, [])

  const onSubmit = async (data: z.infer<typeof PeriodSchema>) => {
    const range = `${data.startYear} - ${data.endYear}`

    const { error } = await supabase.from('periods').insert({ range })

    if (error) {
      toast.error('Erro ao criar período')
      return
    }

    toast.success('Período criado com sucesso')
    fetchPeriods()
    form.reset()
  }

  return (
    <div>
      {/* Form to add new period */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="startYear"
            render={() => {
              const startYear = form.watch('startYear')
              const endYear = form.watch('endYear')
              return (
                <FormItem>
                  <FormLabel>Período</FormLabel>
                  <FormControl>
                    <YearRangePicker
                      startYear={startYear}
                      endYear={endYear}
                      onStartYearChange={(year) => form.setValue('startYear', year)}
                      onEndYearChange={(year) => form.setValue('endYear', year)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
          >
            Criar
          </Button>
        </form>
      </Form>

        {/* Periods list */}
      <div className="mt-6">
        <h3 className="text-md font-medium mb-2">Períodos de gestão já existentes</h3>
        {periods.length === 0 ? (
          <p>Nenhum período disponível.</p>
        ) : (
          <div className='px-4'>
            {periods.map((period) => {
              return (
                <h1 className='text-sm py-2'>{period.range}</h1>
              )
            })}

          </div>
        )}
      </div>
    </div>
  )
}
