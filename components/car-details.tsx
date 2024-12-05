import { MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface CarDetailsProps {
  title: string
  specs: string[]
  location: string
  price: number
}

export function CarDetails({ title, specs, location, price }: CarDetailsProps) {
  return (
    <div className="space-y-3 rounded-lg bg-white p-4">
      <div className="space-y-1">
        <h1 className="text-lg font-bold sm:text-xl">{title}</h1>
        <div className="flex items-center gap-4 text-sm">
          {specs.map((spec, index) => (
            <span key={index} className="text-muted-foreground">
              {spec}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <MapPin className="h-4 w-4" />
        <span className="text-muted-foreground">{location}</span>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <div className="text-xl font-bold sm:text-2xl">₹{price.toLocaleString('en-IN')} Lakh</div>
          <div className="text-sm text-muted-foreground">Fixed on road price</div>
        </div>

        <Button className="w-full" size="lg">
          VIEW SIMILAR CARS
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          This inventory is no longer available with us. View similar cars.
        </div>
      </div>
    </div>
  )
}

