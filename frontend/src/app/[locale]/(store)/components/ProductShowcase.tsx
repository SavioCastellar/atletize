'use client'

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { useEffect, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

type ProductShowcaseProps = {
  images: any[]
}

export default function ProductShowcase({ images }: ProductShowcaseProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [activeThumb, setActiveThumb] = useState([0])

  const updatePreview = (index: number) => {
    api?.scrollTo(index)
  }

  useEffect(() => {
    if (!api) {
      return
    }

    api.on('slidesInView', (e) => {
      setActiveThumb(e.slidesInView())
    })
  }, [api])

  return (
    <Carousel setApi={setApi} opts={{ loop: true }}>
      <CarouselContent>
        {images.map((image: any) => (
          <CarouselItem key={image.id} className="flex items-center">
            <Image
              priority
              src={image.url}
              alt={image.name}
              className="rounded-md object-cover"
              width={440}
              height={320}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex overflow-clip py-2 gap-4">
        {images.map((image: any, index) => (
          <div key={image.id}>
            <Image
              onClick={() => updatePreview(index)}
              priority
              src={image.url}
              alt={image.name}
              className={cn(index === activeThumb[0] ? 'opacity-100' : 'opacity-75', 'rounded-md transition-all duration-300 ease-in-out cursor-pointer hover:opacity-75')}
              width={72}
              height={48}
            />
          </div>
        ))}
      </div>
    </Carousel>
  )
}
