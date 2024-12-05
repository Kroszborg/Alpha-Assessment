import { Check } from 'lucide-react'

import { Card, CardContent } from "@/components/ui/card"

interface CarOverviewProps {
  model: string
  year: number
  mileage: string
  price: number
}

export function CarOverview({ model, year, mileage, price }: CarOverviewProps) {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{model}</h1>
        <p className="text-2xl font-bold text-purple-600">
          {formatPrice(price)}
        </p>
      </div>

      <Card>
        <CardContent className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Model Year
            </h3>
            <p className="text-2xl font-semibold">{year}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Mileage
            </h3>
            <p className="text-2xl font-semibold">{mileage}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Ownership
            </h3>
            <p className="text-2xl font-semibold">1st</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Location
            </h3>
            <p className="text-2xl font-semibold">Gurgaon</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <h3 className="font-semibold">Key Features</h3>
          <ul className="grid gap-2">
            {[
              "4x4 Capability",
              "Hard Top",
              "Touchscreen Infotainment",
              "Cruise Control",
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">Warranty</h3>
          <ul className="grid gap-2">
            {[
              "1 Year Comprehensive Warranty",
              "Free RSA Support",
              "5 Free Services",
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

