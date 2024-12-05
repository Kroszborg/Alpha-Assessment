"use client"

import * as React from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ViewIcon as View360, ZoomInIcon } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog"

interface CarCarouselProps {
  images: string[]
  soldOut?: boolean
}

// Export as default to ensure proper import
export default function CarCarousel({ images, soldOut = false }: CarCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [rotation, setRotation] = React.useState(0)
  const [isZoomed, setIsZoomed] = React.useState(false)
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
          className={`object-contain transition-transform duration-300 ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
          priority
        />
        
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={previousSlide}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
              onClick={nextSlide}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-white/80 hover:bg-white"
          onClick={() => setIsZoomed(!isZoomed)}
          aria-label={isZoomed ? "Zoom out" : "Zoom in"}
        >
          <ZoomInIcon className="h-5 w-5" />
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
            <DialogHeader>
                <DialogTitle>360° Car View</DialogTitle>
            </DialogHeader>
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
                  className="bg-black/80 hover:bg-black"
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

        {soldOut && (
          <div className="absolute left-4 top-4 rounded bg-gray-900/80 px-3 py-1 text-sm text-white">
            SOLD OUT
          </div>
        )}
      </div>

      <div className="mt-2 flex gap-2 overflow-x-auto">
        {images.map((image, index) => (
          <button
            title={`View image ${index + 1}`}
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`relative aspect-[16/9] w-14 flex-shrink-0 overflow-hidden rounded-lg border-2 sm:w-20 ${
              index === currentIndex ? "border-purple-600" : "border-transparent"
            }`}
            aria-label={`Select image ${index + 1}`}
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