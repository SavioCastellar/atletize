import React, { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Athlete } from '@/app/[locale]/(detalhes)/(pages)/detalhes/domain/interfaces/IAthlete'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { ImagePlus, Pencil } from 'lucide-react'
import UploadPhoto from '@/app/shared/components/UploadPhoto'
import { MultiSelect } from '@/components/ui/multi-select'
import { getModalities } from '../../../../../../queries/get-modalities'
import useSupabaseBrowser from '../../../../../../utils/supabase-browser'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { useUploadThing } from '@/lib/uploadthing'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'

interface EditarAtletaProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  info: Athlete
  setShouldRefetch?: (value: boolean) => void
}

const formSchema = z.object({
  name: z.string().min(2, { message: 'Nome muito curto (mínimo 2 caracteres).' }).max(24, { message: 'Nome muito longo (máximo 24 caracteres)' }),
  instagram: z.string(),
  modalities: z.array(z.string()),
  course: z.string(),
  graduation: z.string(),
  description: z.string(),
  image: z.string(),
})

function EditarAtleta({ isOpen, setIsOpen, info, setShouldRefetch }: EditarAtletaProps) {
  const [imageUrl, setImageUrl] = useState<string>('')
  const [imageSrc, setImageSrc] = useState<string>('')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [formsData, setFormsData] = useState<any>()

  const supabase = useSupabaseBrowser()
  const { data: modalitiesData, isLoading: modalitiesLoading, isError: modalitiesError } = useQuery(getModalities(supabase))

  const optionsModalities = modalitiesData?.map(modality => ({
    label: modality.name,
    value: modality.id,
  }))

  // Fix: Set form default values properly using useEffect
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: info.name || '',
      instagram: info.instagram || '',
      modalities: info.modalities && info.modalities.length > 0 ? info.modalities : [],
      course: info.course || '',
      graduation: info.graduation || '',
      description: info.description || '',
      image: info.image || ''
    }
  })

  const closeModal = () => {
    setIsOpen(false)
    form.reset()
    setImageUrl('')
    setImageSrc('')
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    setFormsData(data)
    // Fix: Only call handlePhotoUpload if there's a new image
    if (imageSrc) {
      handlePhotoUpload(imageSrc, data.name)
    } else {
      // Fix: If no new image, proceed with the update directly
      updateAthlete(data)
    }
  }

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: ([data]) => {
      setImageUrl(data.url)
    },
    onUploadProgress: (progress) => {
      setUploadProgress(progress)
    }
  })

  const dataURLToBlob = (dataURL: string) => {
    const arr = dataURL.split(',')
    const mime = arr[0].match(/:(.*?)/)![1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  }

  const handlePhotoUpload = (dataUrl: string, athleteName: string) => {
    if (!dataUrl) return
    const blob = dataURLToBlob(dataUrl)
    const file = new File([blob], `${athleteName}_profile.jpg`, { type: 'image/png' })
    startUpload([file], { athleteName })
  }

  const updateAthlete = async (data: z.infer<typeof formSchema>) => {
    const imageToUse = imageUrl || data.image || info.image

    const { data: athlete, error: athleteError } = await supabase
      .from('athletes')
      .update({
        name: data.name,
        instagram: data.instagram,
        course: data.course,
        graduation: data.graduation,
        description: data.description,
        image: imageToUse,
      })
      .eq('id', info.id)

    if (athleteError) {
      console.log('Erro ao atualizar atleta: ', athleteError)
      toast.error('Erro ao atualizar atleta')
      return
    }

    console.log('data', JSON.stringify(data.modalities))
    console.log('info', JSON.stringify(info.modalities))

    // Fix: Correctly handle modalities update
    if (data.modalities && JSON.stringify(data.modalities) !== JSON.stringify(info.modalities)) {
      // Delete existing modalities first
      const { error: deleteError } = await supabase
        .from('athletes_modalities')
        .delete()
        .eq('athlete_id', info.id)

      if (deleteError) {
        console.error("Erro ao deletar modalidades existentes:", deleteError)
        return
      }

      // Then insert new modalities
      const modalitiesData = data.modalities.map((modalityId) => ({
        athlete_id: info.id,
        modality_id: modalityId
      }))

      const { error: modalitiesError } = await supabase
        .from('athletes_modalities')
        .insert(modalitiesData)

      if (modalitiesError) {
        console.error("Erro ao inserir modalidades:", modalitiesError)
        toast.error('Erro ao atualizar modalidades')
      } else {
        console.log("Atleta e modalidades atualizados com sucesso!")
        toast.success('Atleta atualizado com sucesso!')
        if (setShouldRefetch) {
          setShouldRefetch(true)
        }
        closeModal()
      }
    } else {
      toast.success('Atleta atualizado com sucesso!')
      if (setShouldRefetch) {
        setShouldRefetch(true)
      }
      closeModal()
    }
  }

  // Upload Photo
  let [isUploadPhotoOpen, setIsUploadPhotoOpen] = useState(false)

  function openUploadPhotoModal() {
    setIsUploadPhotoOpen(true)
  }

  const updateProfilePic = (imageSrc: string) => {
    setImageSrc(imageSrc)
  }

  useEffect(() => {
    if (isUploading === false && uploadProgress === 100 && imageUrl) {
      if (formsData) {
        formsData.image = imageUrl
        updateAthlete(formsData)
      }
    }
  }, [isUploading, uploadProgress, imageUrl])

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
                  className="flex flex-col w-full max-w-3xl h-auto screen transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                  onClick={(e) => e.stopPropagation()}
                >
                  {!isUploading ? (
                    <div className='flex flex-col justify-center items-center'>
                      <Dialog.Title
                        as="h3"
                        className="flex justify-center text-lg font-medium leading-6 text-gray-900"
                      >
                        Editar Atleta
                      </Dialog.Title>
                      <div className='flex w-full flex-col md:flex-row'>
                        <div className='w-full md:w-full pb-2 pl-4'>
                          <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                              <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                  <FormItem>
                                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                                      <Label>Nome</Label>
                                      <Input
                                        {...field}
                                        className="min-w-56 h-10 border border-border px-4 text-sm text-foreground bg-white placeholder:text-zinc-900/60 rounded-lg"
                                        id="name"
                                        placeholder="Informe o nome."
                                      />
                                    </div>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="instagram"
                                render={({ field }) => (
                                  <FormItem>
                                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                                      <Label htmlFor="instagram">Instagram</Label>
                                      <Input
                                        {...field}
                                        className="min-w-56 h-10 border border-border px-4 text-sm text-foreground bg-white placeholder:text-zinc-900/60 rounded-lg"
                                        id="instagram"
                                        placeholder="Informe o Instagram."
                                      />
                                    </div>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="modalities"
                                render={({ field }) => (
                                  <FormItem>
                                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                                      <Label htmlFor="modalities">Modalidades</Label>
                                      <MultiSelect
                                        {...field}
                                        className='text-sm border-border font-normal text-foreground placeholder:text-zinc-900/60 border rounded-lg'
                                        options={optionsModalities ?? []}
                                        onValueChange={field.onChange}
                                        placeholder='Selecione as modalidades'
                                        defaultValue={info.modalities}
                                      />
                                    </div>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="course"
                                render={({ field }) => (
                                  <FormItem>
                                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                                      <Label htmlFor="course">Curso</Label>
                                      <Input
                                        {...field}
                                        className="min-w-56 h-10 border border-border px-4 text-sm text-foreground bg-white placeholder:text-zinc-900/60 rounded-lg"
                                        id="course"
                                        placeholder="Informe o curso."
                                      />
                                    </div>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="graduation"
                                render={({ field }) => (
                                  <FormItem>
                                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                                      <Label htmlFor="graduation">Graduação</Label>
                                      <Input
                                        {...field}
                                        className="min-w-56 h-10 border border-border px-4 text-sm text-foreground bg-white placeholder:text-zinc-900/60 rounded-lg"
                                        id="graduation"
                                        placeholder="Informe o ano de graduação."
                                      />
                                    </div>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                  <FormItem>
                                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                                      <Label htmlFor="description">Descrição</Label>
                                      <Textarea
                                        {...field}
                                        className='px-4 text-sm font-medium placeholder:text-zinc-900/60 placeholder:font-normal border border-border rounded-lg'
                                        id="description"
                                        placeholder="Descreva a história do atleta."
                                      />
                                    </div>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <div className='flex justify-center mt-4'>
                                <Button className="w-28" type="submit">Salvar</Button>
                              </div>
                            </form>
                          </Form>
                        </div>
                        <div className='flex mx-10 items-center justify-center'>
                          <a className='h-56 mx-auto flex items-center z-10'>
                            <div className='flex flex-col h-full w-full px-2 rounded-lg items-center justify-between bg-background border-zinc-800 border-2'>
                              <div className='flex justify-center items-center w-40 h-40 rounded-full bg-black/30 mx-4 mt-3 cursor-pointer' onClick={openUploadPhotoModal}>
                                {!info.image && !imageSrc ? (
                                  <ImagePlus size={70} />
                                ) : (
                                  <div className='flex justify-center items-end'>
                                    <img
                                      className='w-40 h-40 rounded-full object-cover'
                                      src={imageSrc ? imageSrc : info.image}
                                      alt={info.name}
                                    />
                                    <div className='flex justify-center items-center absolute -mb-3 h-7 w-7 rounded-full bg-slate-600 border border-slate-300'>
                                      <Pencil size={14} className='text-slate-300' />
                                    </div>
                                  </div>
                                )}
                              </div>
                              <h1 className='text-lg font-bold text-zinc-800 my-2'>
                                {form.watch('name').toUpperCase()}
                              </h1>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className='flex flex-col items-center justify-center h-full'>
                      <p>Editando atleta...</p>
                      <Progress value={uploadProgress} className='mt-2 w-40 h-2 bg-gray-50' />
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
          <UploadPhoto
            showUploadPhoto={isUploadPhotoOpen}
            setShowUploadPhoto={setIsUploadPhotoOpen}
            athlete={info}
            updateProfilePic={updateProfilePic}
          />
        </Dialog>
      </Transition>
    </>
  )
}

export default EditarAtleta
