import React, { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Button } from '@/components/ui/button'
import { FileImage } from 'lucide-react'
import DropZone, { FileRejection } from 'react-dropzone'

interface CropPhotoProps {
  showCropPhoto: boolean
  setShowCropPhoto: (value: boolean) => void
  fileName: string
}

function CropPhoto({ showCropPhoto, setShowCropPhoto }: CropPhotoProps) {
  const closeModal = () => {
    setShowCropPhoto(false)
  }

  return (
    <Transition appear show={showCropPhoto} as={Fragment}>
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
                className="flex flex-col p-4 w-fit max-w-3xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all"
                onClick={(e) => e.stopPropagation()}
                >
                <div>
                  <div className='flex justify-start items-center w-full md:w-full gap-2 mb-2 ml-2'>
                    <FileImage size={20} color='#555555' />
                    <h3 className='text-[#555555]'>
                      {'Nenhum arquivo selecionado'}
                    </h3>
                  </div>
                  <div className={`flex flex-col items-center py-40 px-48 gap-4 border-dashed border-2 border-black/50 rounded-xl ${'bg-black/60 ring-black/70'}`}>

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

export default CropPhoto
