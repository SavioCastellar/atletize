'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import Image from 'next/image'

interface TeamInfoCardProps {
  title: string
  content: string
  icon: LucideIcon
  className?: string
  imageUrl: string
}

export function TeamInfoCard({ title, content, icon: Icon, className, imageUrl }: TeamInfoCardProps) {
  return (
    <Card className={cn(
      "overflow-hidden border-none transition-all duration-200 hover:scale-[1.02] hover:shadow-xl bg-slate-950/50 backdrop-blur supports-[backdrop-filter]:bg-slate-200",
      className
    )}>
      <div className="relative w-full h-48">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-slate-950/20" />
      </div>
      <CardHeader className="flex flex-row items-center gap-4 space-y-0">
        <Icon className="h-8 w-8 text-primary" />
        <CardTitle className="text-xl font-semibold text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground">
        {content}
      </CardContent>
    </Card>
  )
}
