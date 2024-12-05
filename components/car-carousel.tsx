"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ViewIcon as View360 } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

interface CarouselProps {
  images: string[]
}

export function CarCarousel({ images }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [rotation, setRotation] = React.useState(0)
  const rotationInterval = React.useRef<NodeJS.Timeout>()

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const previousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const startRotation = () => {
    if (!rotationInterval.current) {
      rotationInterval.current = setInterval(() => {
        setRotation(prev => (prev + 1) % 360)
      }, 50)
    }
  }

  const stopRotation = () => {
    if (rotationInterval.current) {
      clearInterval(rotationInterval.current)
      rotationInterval.current = undefined
    }
  }

  React.useEffect(() => {
    return () => {
      if (rotationInterval.current) {
        clearInterval(rotationInterval.current)
      }
    }
  }, [])

  return (
    <div className="relative">
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={images[currentIndex]}
          alt={`Car image ${currentIndex + 1}`}
          fill
          className="object-contain"
          priority
        />
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
          onClick={previousSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="absolute bottom-4 right-4 bg-white/80 hover:bg-white"
            >
              <View360 className="mr-2 h-4 w-4" />
              Click to view 360°
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <div 
                className="absolute inset-0 transition-transform duration-300"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <Image
                  src={images[currentIndex]}
                  alt="360° View"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="absolute inset-x-0 bottom-4 flex justify-center">
                <Button
                  className="bg-white/80 hover:bg-white"
                  onMouseEnter={startRotation}
                  onMouseLeave={stopRotation}
                  onTouchStart={startRotation}
                  onTouchEnd={stopRotation}
                >
                  Hold to rotate 360°
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="absolute left-4 top-4 rounded bg-gray-900/80 px-3 py-1 text-sm text-white">
          SOLD OUT
        </div>
      </div>

      <div className="mt-2 flex gap-2 overflow-x-auto">
        {images.map((image, index) => (
          <button
            title="Thumbnail"
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`relative aspect-[16/9] w-14 flex-shrink-0 overflow-hidden rounded-lg border-2 sm:w-20 ${
              index === currentIndex ? "border-purple-600" : "border-transparent"
            }`}
          >
            <Image
              src={image}
              alt={`Car thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

