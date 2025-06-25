'use client';

import { CirclePlus, PlusCircle, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModalitiesTable } from "./ModalitiesTable";
import NovaModalidade from "./NovaModalidade";
import { useState } from "react";

// import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Products',
// };

// export type ProductData = {
//   id: string
//   price: string
//   is_active: boolean
//   name: string
//   sku: string
// }

export default function Modalities() {

  {/* Nova modalidade */}
  let [isOpenNew, setIsOpenNew] = useState(false)

  function openModalNew() {
    setIsOpenNew(true)
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center pb-4">
        <h1 className='text-4xl font-normal text-zinc-900'>Modalidades</h1>

        {/* Botões de importar e criar produtos */}
        <div className="justify-end items-center flex flex-row gap-3">
          <Button size="sm" className="h-8 gap-1">
            <Upload className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Importar
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1" onClick={openModalNew}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Nova Modalidade
            </span>
          </Button>
        </div>
      </div>

      {/* Tabela de modalidades */}
      <ModalitiesTable/>

      {/* Criar nova modalidade */}
      <NovaModalidade isOpen={isOpenNew} setIsOpen={setIsOpenNew}/>
    </div>
  );
}

