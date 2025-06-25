"use client"

import { cn } from "@/lib/utils"
import { useRef, useState } from "react"

export const ThreeDCard = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode
  className?: string
  containerClassName?: string
}) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const { left, top, width, height } = card.getBoundingClientRect()
    const x = e.clientX - left
    const y = e.clientY - top
    const centerX = width / 2
    const centerY = height / 2
    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    setRotate({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 })
    setIsHovered(false)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      className={cn("relative group/card", containerClassName)}
      style={{
        perspective: "1000px",
      }}
    >
      <div
        className={cn(
          "relative transition-transform ease-out duration-200",
          className
        )}
        style={{
          transform: isHovered
            ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(1.05)`
            : "rotateX(0deg) rotateY(0deg) scale(1)",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </div>
  )
}
