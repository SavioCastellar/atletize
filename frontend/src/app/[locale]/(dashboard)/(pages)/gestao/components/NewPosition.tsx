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
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { supabase } from '@/app/api/auth/supabase/client'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

interface Position {
  id: string
  name: string
}

interface FunctionWithPositions {
  id: string
  name: string
  positions: Position[]
}

interface NewPositionProps {
  onClose: () => void
}

export const NewPosition = ({ onClose }: NewPositionProps) => {
  const [functions, setFunctions] = useState<FunctionWithPositions[]>([])

  // Define the validation schema
  const PositionWithFunctionSchema = z
    .object({
      name: z.string().nonempty('Nome da posição é obrigatório'),
      creatingNewFunction: z.boolean(),
      function_id: z.string().optional(),
      new_function_name: z.string().optional(),
    })
    .refine(
      (data) => {
        if (data.creatingNewFunction) {
          return data.new_function_name && data.new_function_name.trim() !== ''
        }
        return data.function_id && data.function_id.trim() !== ''
      },
      {
        message: 'Função é obrigatória',
        path: ['function_id', 'new_function_name'],
      }
    )

  // Initialize the form
  const form = useForm<z.infer<typeof PositionWithFunctionSchema>>({
    resolver: zodResolver(PositionWithFunctionSchema),
    defaultValues: {
      name: '',
      creatingNewFunction: false,
      function_id: '',
      new_function_name: '',
    },
    mode: 'onChange',
  })

  useEffect(() => {
    fetchFunctions()
  }, [])

  // Fetch available functions with positions
  const fetchFunctions = async () => {
    const { data: functionsData, error } = await supabase
      .from('functions')
      .select(
        `
      id,
      name,
      positions (
        id,
        name
      )
    `
      )
      .order('name')

    if (error) {
      toast.error('Erro ao buscar funções')
      return
    }

    setFunctions(functionsData || [])
  }

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof PositionWithFunctionSchema>) => {
    let function_id = data.function_id

    if (data.creatingNewFunction) {
      // Create new function
      const { data: newFunction, error: functionError } = await supabase
        .from('functions')
        .insert({ name: data.new_function_name })
        .select('id')
        .single()

      if (functionError) {
        toast.error('Erro ao criar função')
        return
      }

      function_id = newFunction.id
    }

    // Insert the new position into the 'positions' table
    const { error: positionError } = await supabase.from('positions').insert({
      name: data.name,
      function_id: function_id,
    })

    if (positionError) {
      toast.error('Erro ao criar posição')
      return
    }

    // Success
    toast.success('Posição criada com sucesso')
    fetchFunctions()
    form.reset()
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Position Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da Posição</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    variant='forms'
                    placeholder="Nome da posição" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Toggle for Creating New Function */}
          <FormField
            control={form.control}
            name="creatingNewFunction"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.checked)
                      if (e.target.checked) {
                        form.setValue('function_id', '')
                      } else {
                        form.setValue('new_function_name', '')
                      }
                    }}
                  />
                  <FormLabel>Criar nova função</FormLabel>
                </div>
              </FormItem>
            )}
          />

          {/* Conditional Rendering of Function Fields */}
          {form.watch('creatingNewFunction') ? (
            // New Function Name Field
            <FormField
              control={form.control}
              name="new_function_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Nova Função</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      variant='forms'
                      placeholder="Nome da nova função" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            // Select Existing Function
            <FormField
              control={form.control}
              name="function_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Função</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full border border-gray-300 rounded-md p-2 text-sm"
                    >
                      <option value="">Selecione uma função</option>
                      {functions.map((func) => (
                        <option key={func.id} value={func.id}>
                          {func.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Submit Button */}
          <Button
            disabled={!form.formState.isValid || form.formState.isSubmitting}
            type="submit"
          >
            Criar
          </Button>
        </form>
      </Form>

      {/* Accordion for Functions and Positions */}
      <div className="mt-6">
        <h2 className="text-md font-medium mb-2">Cargos já existentes</h2>
        {functions.length === 0 ? (
          <p>Nenhum cargo disponível.</p>
        ) : (
          <Accordion type="multiple" className="w-full">
            {functions.map((func) => (
              <AccordionItem key={func.id} value={func.id} className='text-sm'>
                <AccordionTrigger>{func.name}</AccordionTrigger>
                <AccordionContent>
                  {func.positions.length === 0 ? (
                    <p>Nenhuma posição disponível.</p>
                  ) : (
                    <ul className="list-disc list-inside text-xs">
                      {func.positions.map((position) => (
                        <li key={position.id}>{position.name}</li>
                      ))}
                    </ul>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

        )}
      </div>
    </div>
  )
}
