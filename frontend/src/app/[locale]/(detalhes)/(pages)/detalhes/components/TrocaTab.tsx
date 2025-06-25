import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

interface TrocaTabProps {
  color: string
  onNext: () => void
  onPrev: () => void
}

export default function TrocaTab({ color, onNext, onPrev }: TrocaTabProps) {
  return (
    <div className='flex flex-row gap-8 justify-center items-center h-full w-full cursor-pointer'>
      <div className={`h-20 w-20 flex justify-center items-center rounded-full bg-${color}`} onClick={onPrev}>
        <ChevronLeft color='white' size='60px' />
      </div>
      <div className={`h-20 w-20 flex justify-center items-center rounded-full bg-${color}`} onClick={onNext}>
        <ChevronRight color='white' size='60px' />
      </div>
    </div>
  )
}
