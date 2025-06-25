import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { supabase } from '@/app/api/auth/supabase/client'

interface ExcluirAtletaProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  athleteId: string
}

function ExcluirAtleta({ isOpen, setIsOpen, athleteId }: ExcluirAtletaProps) {

  const closeModal = () => {
    setIsOpen(false)
  }

  const handleDelete = async() => {
    const { data, error } = await supabase
      .from('athletes')
      .delete()
      .eq('id', athleteId)

    if (error) {
      console.log('Erro ao deletar atleta: ', error);
    }
    else if (data) {
      console.log('Atleta deletado com sucesso!');
    }

    closeModal()
  }


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
                  className="flex flex-col w-auto max-w-lg h-auto screen transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                  onClick={(e) => e.stopPropagation()}>
                  <div className='flex flex-col'>
                    <Dialog.Title
                      as="h3"
                      className="flex text-lg font-medium leading-6 text-gray-900"
                    >
                      Confirmar exclusão de atleta
                    </Dialog.Title>
                    <p className='text-gray-600 mt-2'>
                      Tem certeza que deseja excluir o atleta?
                    </p>
                    <p className='text-gray-600'>
                      Essa modificação não poderá ser desfeita.
                    </p>
                    <div className='flex flex-row justify-end items-end gap-2 mt-4'>
                      <button
                        type='button'
                        className='w-20 h-10 bg-zinc-800 text-white rounded-md'
                        onClick={closeModal}
                      >
                        Cancelar
                      </button>
                      <button
                        type='button'
                        className='w-20 h-10 bg-red-600 text-white rounded-md'
                        onClick={handleDelete}
                      >
                        Excluir
                      </button>
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

export default ExcluirAtleta
