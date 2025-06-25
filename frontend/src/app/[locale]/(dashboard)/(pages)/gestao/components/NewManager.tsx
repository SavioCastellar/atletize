'use client'

import { useForm } from "react-hook-form"
import { zManagerSchema, ManagerSchema } from '../../../types/manager-schema'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { supabase } from "@/app/api/auth/supabase/client"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { FileUpload } from "@/components/ui/file-upload"
import { useUploadThing } from "@/lib/uploadthing"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface NewManagerProps {
  onClose: () => void
  setShouldRefetch: (value: boolean) => void
}

interface Position {
  id: string
  name: string
}

interface FunctionWithPositions {
  id: string
  name: string
  positions: Position[]
}

export const NewManager = ({ onClose, setShouldRefetch }: NewManagerProps) => {
  const [functions, setFunctions] = useState<FunctionWithPositions[]>([])
  const [periods, setPeriods] = useState<{ id: string, range: string }[]>([])
  const [file, setFile] = useState<File>()

  const form = useForm<zManagerSchema>({
    resolver: zodResolver(ManagerSchema),
    defaultValues: {
      name: '',
      period: '',
      course: '',
      reg_number: '',
      contact_number: '',
      position_id: '',
      instagram: '',
      email: '',
      image: '',
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

  useEffect(() => {
    fetchPeriods()
  }, [])

  const fetchPeriods = async () => {
    const { data: periodsData, error } = await supabase
      .from('periods')
      .select('id, range')

    if (error) {
      toast.error('Erro ao buscar posições')
      return
    }

    setPeriods(periodsData || [])
  }

  const handleFileUpload = (files: File[]) => {
    if (files.length === 0) return

    setFile(files[0])
  }

  const { startUpload, isUploading } = useUploadThing('idCardPhotoUploader', {})

  const uploadFileToUploadThing = async () => {
    try {
      const response = await startUpload([file!])
      if (response) {
        const uploadedUrl = response[0].url
        return uploadedUrl
      }
    } catch (error) {
      toast.error('Erro ao salvar imagem.')
    }
  }

  useEffect(() => {
    if (isUploading) {
      toast.info('Salvando informações...')
    }
  }, [isUploading])

  const onSubmit = async (data: zManagerSchema) => {
    const uploadedUrl = await uploadFileToUploadThing()

    const { error: managerError } = await supabase.from('managers').insert({
      name: data.name,
      period: data.period,
      course: data.course,
      reg_number: data.reg_number,
      contact_number: data.contact_number,
      position_id: data.position_id,
      instagram: data.instagram,
      email: data.email,
      image: uploadedUrl,
    })

    if (managerError) {
      toast.error('Erro ao criar membro')
      return
    }

    toast.success('Membro criado com sucesso')
    setShouldRefetch(true)
    onClose()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  variant="forms"
                  placeholder="Nome do membro"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Period Field */}
        <FormField
          control={form.control}
          name="period"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Período de gestão</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o período de gestão" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {periods.map((period) => (
                    <SelectItem key={period.id} value={period.range}>
                      {period.range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Course Field */}
        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Curso</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  variant="forms"
                  placeholder="Curso do membro"
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Registration Number Field */}
        <FormField
          control={form.control}
          name="reg_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Matrícula</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  variant="forms"
                  placeholder="Matrícula do membro"
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Contact Number Field */}
        <FormField
          control={form.control}
          name="contact_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Contato</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  variant="forms"
                  placeholder="Número de contato"
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Position Field */}
        <FormField
          control={form.control}
          name="position_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ocupação</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a ocupação desse membro" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {functions.map((func) => (
                    <SelectGroup>
                      <SelectLabel>{func.name}</SelectLabel>
                      {func.positions.map((position) => (
                        <SelectItem key={position.id} value={position.id}>
                          {position.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Instagram Field */}
        <FormField
          control={form.control}
          name="instagram"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instagram</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  variant="forms"
                  placeholder="Instagram"
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  variant="forms"
                  placeholder="Email"
                  type="email"
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Image Field */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagem</FormLabel>
              <FormControl>
                <FileUpload onChange={handleFileUpload} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Submit Button */}
        <Button
          disabled={
            !form.formState.isValid ||
            form.formState.isSubmitting
          }
          type="submit"
        >
          Criar
        </Button>
      </form>
    </Form>
  )
}
