'use client'

import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Dialog, Transition } from '@headlessui/react'
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { supabase } from "@/app/api/auth/supabase/client"
import { toast } from "sonner"
import { Fragment, useEffect, useState } from "react"

import { ManagerSchema, zManagerSchema } from "../../../types/manager-schema"
import { FileUpload } from "@/components/ui/file-upload"
// Import image deletion function if needed
// import { deleteImageOnServer } from "../../../server/actions/delete-files"

interface EditManagerProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  managerId: string
}

export default function EditManager({ isOpen, setIsOpen, managerId }: EditManagerProps) {
  const [manager, setManager] = useState<zManagerSchema>({} as zManagerSchema)
  const [initialDataLoaded, setInitialDataLoaded] = useState<boolean>(false)
  const [positions, setPositions] = useState<{ id: string; name: string }[]>([])
  const [photoUrl, setPhotoUrl] = useState<string>('')
  const [file, setFile] = useState<File>()

  const form = useForm<zManagerSchema>({
    resolver: zodResolver(ManagerSchema),
    defaultValues: {
      name: '',
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
    if (isOpen && managerId && !initialDataLoaded) {
      fetchManager()
      fetchPositions()
    }
  }, [isOpen, managerId, initialDataLoaded])

  const fetchManager = async () => {
    const { data: managerData, error } = await supabase
      .from('managers')
      .select('*')
      .eq('id', managerId)
      .single()

    if (error) {
      toast.error('Erro ao buscar membro')
      return
    }

    if (managerData) {
      form.setValue('name', managerData.name)
      form.setValue('course', managerData.course)
      form.setValue('reg_number', managerData.reg_number)
      form.setValue('contact_number', managerData.contact_number)
      form.setValue('position_id', managerData.position_id)
      form.setValue('instagram', managerData.instagram)
      form.setValue('email', managerData.email)
      form.setValue('image', managerData.image)
      setManager(managerData)
    }

    setInitialDataLoaded(true)
  }

  const fetchPositions = async () => {
    const { data: positionsData, error } = await supabase
      .from('positions')
      .select('id, name')

    if (error) {
      toast.error('Erro ao buscar posições')
      return
    }

    setPositions(positionsData || [])
  }

  const onSubmit = async (data: zManagerSchema) => {
    const { error: managerError } = await supabase
      .from('managers')
      .update({
        name: data.name,
        course: data.course,
        reg_number: data.reg_number,
        contact_number: data.contact_number,
        position_id: data.position_id,
        instagram: data.instagram,
        email: data.email,
        image: data.image,
      })
      .eq('id', managerId)

    if (managerError) {
      toast.error('Erro ao atualizar gerente')
      return
    }

    // Handle image deletion and upload if needed
    // if (manager.image !== data.image) {
    //   await deleteImageOnServer(manager.image)
    // }

    // Success
    toast.success('Gerente atualizado com sucesso')
    closeModal()
  }

  const closeModal = () => {
    setIsOpen(false)
    form.reset()
    setInitialDataLoaded(false)
  }

  const handleFileUpload = (files: File[]) => {
    if (files.length === 0) return

    setFile(files[0])
    setPhotoUrl(URL.createObjectURL(files[0]))
  }


  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={closeModal}>
        {/* Overlay */}
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

        {/* Modal content */}
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
                onClick={(e) => e.stopPropagation()}
              >
                <div className='flex flex-col'>
                  <Dialog.Title
                    as="h3"
                    className="flex justify-center text-lg font-medium leading-6 text-gray-900"
                  >
                    Editar Membro
                  </Dialog.Title>
                  <div className='w-full pb-2'>
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
                                  placeholder="Nome do gerente"
                                />
                              </FormControl>
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
                                  placeholder="Curso do gerente"
                                  value={field.value ?? ''}
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
                                  placeholder="Matrícula do gerente"
                                  value={field.value ?? ''}
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
                                  value={field.value ?? ''}
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
                              <FormLabel>Posição</FormLabel>
                              <FormControl>
                                <select
                                  {...field}
                                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                                >
                                  <option value="">Selecione uma posição</option>
                                  {positions.map((position) => (
                                    <option key={position.id} value={position.id}>
                                      {position.name}
                                    </option>
                                  ))}
                                </select>
                              </FormControl>
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
                                  value={field.value ?? ''}
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
                                  value={field.value ?? ''}
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
                          Salvar
                        </Button>
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
  )
}
