import React, { Fragment, useRef, useState, useTransition } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Button } from '@/components/ui/button'
import { FileImage, ImagePlus, Loader2, MousePointerSquareDashed, Scissors } from 'lucide-react'
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop, type Crop } from 'react-image-crop'
import Dropzone from 'react-dropzone'
import { cn } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'
import setCanvasPreview from './setCanvasPreview'

interface UploadPhotoProps {
  showUploadPhoto: boolean
  setShowUploadPhoto: (value: boolean) => void
  athlete?: {
    id: string
    name: string
    image?: string
  }
  updateProfilePic: (imageSrc: string) => void
}

const ASPECT_RATIO = 1
const MIN_DIMENSION = 150

function UploadPhoto({ showUploadPhoto, setShowUploadPhoto, athlete, updateProfilePic }: UploadPhotoProps) {

  const closeModal = () => {
    setShowUploadPhoto(false)
    setFileName('')
    setImageSrc('')
  }

  const [profileImage, setProfileImage] = useState(athlete?.image)
  const [fileName, setFileName] = useState('')
  const imgRef = useRef(null)
  const previewCanvasRef = useRef(null)
  const [imageSrc, setImageSrc] = useState('')
  const [crop, setCrop] = useState<Crop>(
    {
      unit: 'px',
      width: 120,
      height: 120,
      x: 25,
      y: 25
    }
  )
  const [isDragOver, setIsDragOver] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [error, setError] = useState<string>('')
  const { toast } = useToast()

  const onChangeImage = () => {
    setProfileImage(undefined)
  }

  const handleCrop = () => {
    if (imgRef.current && previewCanvasRef.current) {
      const { width, height } = imgRef.current;
      setCanvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        convertToPixelCrop(
          crop,
          width,
          height
        ),
      )
      const dataUrl = (previewCanvasRef.current as HTMLCanvasElement)!.toDataURL()

      return dataUrl
    }
  }

  const handleUpload = () => {
    const dataUrl = handleCrop()
    if (!dataUrl) {
      return
    }
    updateProfilePic(dataUrl)
    closeModal()
  }

  const onDropRejected = () => {
    console.log('File rejected')
  }

  const onDropAccepted = (acceptedFiles: File[]) => {
    setFileName(acceptedFiles[0].name)

    const reader = new FileReader()
    reader.onload = (e) => {
      setImageSrc(e.target?.result as string)
    }
    reader.readAsDataURL(acceptedFiles[0])

    setIsDragOver(false)
  }

  const onImageLoad = (e: any) => {
    const { width, height, naturalWidth, naturalHeight } = e.currentTarget
    if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
      setError('Imagem pequena.')
      toast({
        title: error,
        description: `Por favor, selecione uma imagem com altura e largura mínima de ${MIN_DIMENSION}px.`,
        variant: 'destructive',
      })
      setImageSrc('')
      return
    }

    const crop = makeAspectCrop(
      {
        unit: '%',
        width: 70,
      },
      ASPECT_RATIO,
      width,
      height
    )
    const centeredCrop = centerCrop(crop, width, height)
    setCrop(centeredCrop)
  }

  return (
    <>
      <Transition appear show={showUploadPhoto} as={Fragment}>
        <Dialog as="div" className="relative z-30" onClose={closeModal}>
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
                  className="flex flex-col p-4 w-fit max-w-3xl min-w-xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div>
                    <div className={`flex ${profileImage ? 'justify-end' : 'justify-start'} items-center w-full md:w-full gap-2 mb-2 ml-2`}>
                      {
                        profileImage ?
                        <Button size="sm" className='text-xs font-normal' onClick={onChangeImage}>
                          <ImagePlus size={18} color='white' className='mr-2'/>
                          Nova imagem
                        </Button> :
                        <FileImage size={20} color='#555555' />
                      }
                      <h3 className='text-[#555555] text-sm'>
                        {profileImage ? '' : fileName ? fileName : 'Nenhum arquivo selecionado'}
                      </h3>
                    </div>
                    {imageSrc === '' && (profileImage === '' || !profileImage) ? (

                        <Dropzone
                          onDropRejected={onDropRejected}
                          onDropAccepted={onDropAccepted}
                          accept={{
                            'image/png': ['.png'],
                            'image/jpeg': ['.jpeg'],
                            'image/jpg': ['.jpg'],
                          }}
                          onDragEnter={() => setIsDragOver(true)}
                          onDragLeave={() => setIsDragOver(false)}
                          >
                            {({getRootProps, getInputProps}) => (
                              <div className={cn(
                                'relative flex flex-1 flex-col h-[400px] w-96 items-center gap-4 bg-[#D9D9D9] border-dashed border-2 border-black/50 rounded-xl',
                                {
                                  'ring-blue-900/25 bg-blue-900/20' : isDragOver,
                                }
                              )}>
                                <div className='h-full w-full flex flex-col items-center justify-center' {...getRootProps()}>
                                  <input {...getInputProps()} />
                                  {isDragOver ? (
                                    <MousePointerSquareDashed size={40} strokeWidth={1} className='text-black/70 mb-2'/>
                                  ) : false || isPending ? (
                                    <Loader2 size={30} strokeWidth={1.5} className='animate-spin text-black'/>
                                  ) : (
                                    <div className='flex flex-col justify-center items-center'>
                                      <FileImage size={40} strokeWidth={1} className='text-black/70 mb-2'/>
                                    </div>
                                  )}
                                  <div className='flex felx-col justify-center mb-2 text-sm text-zinc-700'>
                                    {false && !isDragOver ? (
                                      <div className='flex flex-col items-center'>
                                        <p>Carregando...</p>
                                        <Progress value={uploadProgress} className='mt-2 w-40 h-2 bg-gray-50'/>
                                      </div>
                                    ) : isPending ? (
                                      <div className='flex flex-col items-center'>
                                        <p>Redirecionando, aguarde por favor...</p>
                                      </div>
                                    ) : isDragOver ? (
                                      <p>
                                        <span className='font-semibold'>
                                          Solte o arquivo
                                        </span>
                                        {''} para enviar
                                      </p>
                                    ) : (
                                      <p>
                                        <span className='font-semibold'>
                                          Clique aqui
                                        </span>
                                        {''} ou arraste e solte um arquivo
                                      </p>
                                    )}
                                  </div>
                                  {isPending || false ? null : (
                                    <p className='text-xs text-zinc-500'>PNG, JPG, JPEG</p>
                                  )}
                                </div>
                              </div>
                            )}
                        </Dropzone>
                    ) : (
                      <div className='flex flex-col items-center gap-4 bg-black/30'>
                        <ReactCrop
                          crop={crop}
                          circularCrop
                          keepSelection
                          aspect={ASPECT_RATIO}
                          minWidth={MIN_DIMENSION}
                          onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                        >
                          <img
                            ref={imgRef}
                            src={profileImage ? profileImage : imageSrc}
                            alt="Imagem selecionada"
                            className='max-h-72'
                            onLoad={onImageLoad}
                          />
                        </ReactCrop>
                      </div>
                    )}
                  </div>
                  {(imageSrc || profileImage) &&
                    <div className='flex justify-center mt-4'>
                      <Button size='sm' type="submit" onClick={handleUpload} disabled={false}>
                        <Scissors size={18} color='white' className='mr-2'/>
                        Cortar
                      </Button>
                    </div>
                  }
                  {crop &&
                    <canvas
                      ref={previewCanvasRef}
                      className='mt-4'
                      style={{
                        display: 'none',
                        border: '1px solid black',
                        objectFit: 'contain',
                        width: '150px',
                        height: '150px',
                      }}
                    />
                  }
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Toaster />
    </>
  )
}

export default UploadPhoto
