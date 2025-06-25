import React, { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { ImagePlus } from 'lucide-react'
import { MultiSelect } from '@/components/ui/multi-select'
import UploadPhoto from '@/app/shared/components/UploadPhoto'
import { useUploadThing } from '@/lib/uploadthing'
import { Progress } from '@/components/ui/progress'
import useSupabaseBrowser from '../../../../../../utils/supabase-browser'
import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'
import { getModalities } from '../../../../../../queries/get-modalities'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface EditarAtletaProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  setShouldRefetch: (value: boolean) => void
}

const formSchema = z.object({
  name: z.string().min(2, { message: 'Nome muito curto (mínimo 2 caracteres).' }).max(17, { message: 'Nome muito longo (máximo 17 caracteres)' }),
  instagram: z.string(),
  modalities: z.array(z.string()),
  course: z.string(),
  graduation: z.string(),
  description: z.string(),
  image: z.string(),
})

function NovoAtleta({ isOpen, setIsOpen, setShouldRefetch }: EditarAtletaProps) {
  const [imageSrc, setImageSrc] = useState<string>('')
  const [imageUrl, setImageUrl] = useState<string>('')
  const [uploadProgress, setUploadProgress] = useState(0)
  const supabase = useSupabaseBrowser()
  const { data: modalitiesData, isLoading, isError } = useQuery(getModalities(supabase))
  const optionsModalities = modalitiesData?.map(modality => ({
    label: modality.name,
    value: modality.id,
    // icon: modality.icon ? () => <img src={`/path/to/icons/${modality.icon}`} alt={modality.name} className="w-4 h-4" /> : undefined
  }))
  const [formsData, setFormsData] = useState<any>()

  const closeModal = () => {
    setIsOpen(false)
    form.reset()
    setImageUrl('')
    setImageSrc('')
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      instagram: '',
      modalities: [],
      course: '',
      graduation: '',
      description: '',
      image: '',
    }
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setFormsData(data)
    handlePhotoUpload(imageSrc, data.name)
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
    const mime = arr[0].match(/:(.*?);/)![1]
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

  const insertNewAthlete = async (data: z.infer<typeof formSchema>) => {

    {/* Inserir novo atleta */ }
    const { data: athlete, error: athleteError } = await supabase
      .from('athletes')
      .insert({
        name: data.name,
        instagram: data.instagram,
        course: data.course,
        graduation: data.graduation,
        description: data.description,
        image: data.image,
      })
      .select()

    if (athleteError) {
      console.log('Erro ao inserir novo atleta: ', athleteError)
      return
    }

    {/* Inserir modalidades do atleta */ }
    const athleteId = athlete[0].id

    const modalitiesData = data.modalities.map((modalityId) => ({
      athlete_id: athleteId,
      modality_id: modalityId
    }))

    const { error: modalitiesError } = await supabase
      .from('athletes_modalities')
      .insert(modalitiesData)

    if (modalitiesError) {
      console.error("Erro ao inserir modalidades:", modalitiesError);
    } else {
      console.log("Atleta e modalidades inseridos com sucesso!");
    }

    toast.success('Atleta inserido com sucesso!')
    setShouldRefetch(true)
  }

  {/* Upload Photo */ }
  let [isUploadPhotoOpen, setIsUploadPhotoOpen] = useState(false)

  function openUploadPhotoModal() {
    setIsUploadPhotoOpen(true)
  }

  const updateProfilePic = (imageSrc: string) => {
    setImageSrc(imageSrc)
  }

  useEffect(() => {
    if (isUploading == false && uploadProgress == 100) {
      closeModal()
    }
  }, [isUploading])

  useEffect(() => {
    if (imageUrl == '') return
    formsData.image = imageUrl
    insertNewAthlete(formsData)
  }, [imageUrl])

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
                  onClick={(e) => e.stopPropagation()}>
                  {!isUploading ? (
                    <div className='flex flex-col justify-center items-center'>
                      <Dialog.Title
                        as="h3"
                        className="flex justify-center text-lg font-medium leading-6 text-gray-900"
                      >
                        Configurar novo atleta
                      </Dialog.Title>
                      <div className='flex w-full flex-col md:flex-row'>
                        <div className='w-full md:w-full pl-4'>
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
                                        placeholder={'Informe o nome.'} />
                                    </div>
                                    <FormMessage />
                                  </FormItem>
                                )} />
                              <FormField
                                control={form.control}
                                name="instagram"
                                render={({ field }) => (
                                  <FormItem>
                                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                                      <Label htmlFor="email">Instagram</Label>
                                      <Input
                                        {...field}
                                        className="min-w-56 h-10 border border-border px-4 text-sm text-foreground bg-white placeholder:text-zinc-900/60 rounded-lg"
                                        id="instagram"
                                        placeholder={'Informe o Instagram.'} />
                                    </div>
                                  </FormItem>
                                )} />
                              <FormField
                                control={form.control}
                                name="modalities"
                                render={({ field }) => (
                                  <FormItem>
                                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                                      <Label htmlFor="email">Modalidades</Label>
                                      <MultiSelect
                                        {...field}
                                        className='text-sm border-border font-normal text-foreground placeholder:text-zinc-900/60 border rounded-lg'
                                        defaultValue={field.value}
                                        options={optionsModalities ? optionsModalities : []}
                                        onValueChange={field.onChange}
                                        placeholder='Selecione as modalidades' />
                                    </div>
                                  </FormItem>
                                )} />
                              <FormField
                                control={form.control}
                                name="course"
                                render={({ field }) => (
                                  <FormItem>
                                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                                      <Label htmlFor="email">Curso</Label>
                                      <Input
                                        {...field}
                                        className="min-w-56 h-10 border border-border px-4 text-sm text-foreground bg-white placeholder:text-zinc-900/60 rounded-lg"
                                        id="course"
                                        placeholder={'Informe o curso.'} />
                                    </div>
                                  </FormItem>
                                )} />
                              <FormField
                                control={form.control}
                                name="graduation"
                                render={({ field }) => (
                                  <FormItem>
                                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                                      <Label htmlFor="email">Graduação</Label>
                                      <Input
                                        {...field}
                                        className="min-w-56 h-10 border border-border px-4 text-sm text-foreground bg-white placeholder:text-zinc-900/60 rounded-lg"
                                        id="graduation"
                                        placeholder={'Informe o ano de graduação.'} />
                                    </div>
                                  </FormItem>
                                )} />
                              <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                  <FormItem>
                                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-4">
                                      <Label htmlFor="email">Descrição</Label>
                                      <Textarea
                                        {...field}
                                        className='px-4 h-10 text-sm font-medium placeholder:text-black/70 placeholder:font-normal border border-border rounded-lg'
                                        id="description"
                                        placeholder={'Descreva a história do atleta.'} />
                                    </div>
                                  </FormItem>
                                )} />
                              <div className='flex justify-center mt-4'>
                                <Button className="w-28" type="submit">Salvar</Button>
                              </div>
                            </form>
                          </Form>
                        </div>
                        <div className='flex mx-10 items-center justify-center'>
                          <a className='h-56 mx-auto flex items-center z-10'>
                            <div className='flex flex-col h-full w-full px-2 rounded-lg items-center justify-between bg-[#D9D9D9] border-zinc-800 border-2'>
                              <div
                                className='flex justify-center items-center w-40 h-40 rounded-full bg-black/30 mx-4 mt-3 cursor-pointer'
                                onClick={openUploadPhotoModal}
                              >
                                {imageSrc ? (
                                  <img src={imageSrc} alt="Imagem do atleta" className="w-full h-full object-cover rounded-full" />
                                ) : (
                                  <ImagePlus size={70} />
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
                      <p>Criando novo atleta...</p>
                      <Progress value={uploadProgress} className='mt-2 w-40 h-2 bg-gray-50' />
                    </div>
                  )
                  }
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
          <UploadPhoto
            showUploadPhoto={isUploadPhotoOpen}
            setShowUploadPhoto={setIsUploadPhotoOpen}
            updateProfilePic={updateProfilePic}
          />
        </Dialog>
      </Transition>
    </>
  )
}

export default NovoAtleta
