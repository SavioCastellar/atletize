'use client'

import { ProductSchema } from '../../../types/product-schema'
import { useFieldArray, useFormContext } from 'react-hook-form'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { UploadDropzone } from "@/app/api/uploadthing/upload"
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { Reorder } from 'framer-motion'
import { useState } from 'react'


export default function InputImages() {
  const { getValues, control, setError } = useFormContext<z.infer<typeof ProductSchema>>()

  const { fields, remove, append, update, move } = useFieldArray({
    control,
    name: 'images'
  })

  const [active, setActive] = useState(0)

  return (
    <div>
      <FormField
        control={control}
        name="images"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Imagens</FormLabel>
            <FormControl>
              <UploadDropzone
                className='ut-allowed-content:text-red-slate-500
                ut-label:text-primary ut-label:hover:text-primary
                ut-button:bg-primary ut-button:ut-readying:bg-primary/80 ut-button:text-sm ut-button:ut-uploading:bg-primary/80
                hover:bg-slate-100 transition-all duration-500 ease-in-out
                border-2 border-dashed border-input
                '
                content={{
                  label: 'Arraste e solte as imagens aqui',
                  allowedContent: 'Limite de 4MB (até 6 imagens)',
                  button: 'Selecionar'
                }}
                onUploadError={(error) => {
                  setError('images', {
                    type: 'validate',
                    message: error.message,
                  })
                  return
                }}
                onBeforeUploadBegin={(files) => {
                  files.map((file) => {
                    append({
                      name: file.name,
                      size: file.size,
                      url: URL.createObjectURL(file),
                    })
                  })
                  return files
                }}
                onClientUploadComplete={(files) => {
                  const images = getValues('images')
                  images.map((field, imageIndex) => {
                    if (field.url.search('blob:') === 0) {
                      const image = files.find((img) => img.name === field.name)
                      if (image) {
                        update(imageIndex, {
                          url: image.url,
                          name: image.name,
                          size: image.size,
                          key: image.key,
                        })
                      }
                    }
                  })
                  return
                }}
                config={{ mode: 'auto' }}
                endpoint='productUploader'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className='rounded-md '>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ordem</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Tamanho</TableHead>
              <TableHead>Imagem</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <Reorder.Group as='tbody'
            values={fields}
            onReorder={(e) => {
              const activeElement = fields[active]
              e.map((item, index) => {
                if (item === activeElement) {
                  move(active, index)
                  setActive(index)
                  return
                }
                return
              })
            }}>
            {fields.map((field, index) => {
              return (
                <Reorder.Item as='tr'
                  value={field}
                  key={field.id}
                  id={field.id}
                  onDragStart={() => setActive(index)}
                  className={cn(
                    field.url.search('blob:') === 0
                      ? 'animate-pulse transition-all'
                      : '',
                    'text-sm font-bold text-muted-foreground hover:text-primary'
                  )}>
                  <TableCell>{index}</TableCell>
                  <TableCell>{field.name}</TableCell>
                  <TableCell>
                    {(field.size / (1024 * 1024)).toFixed(2)} MB
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center'>
                      <Image
                        src={field.url}
                        alt={field.name}
                        className='rounded-md'
                        width={60}
                        height={42}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant={'ghost'}
                      className='scale-75 hover:text-red-600'
                      onClick={(e) => {
                        e.preventDefault()
                        remove(index)
                      }}
                    >
                      <Trash size={20} strokeWidth={2.5} />
                    </Button>
                  </TableCell>
                </Reorder.Item>
              )
            })}
          </Reorder.Group>
        </Table>

      </div>
    </div>
  )

}
