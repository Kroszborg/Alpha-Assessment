"use client"

import * as React from "react"
import { BarChart3, ChevronRight } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import * as SliderPrimitive from '@radix-ui/react-slider'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface EMICalculatorProps {
  maxLoanAmount?: number
  maxDownPayment?: number
  maxDuration?: number
}

export function EMICalculator({
  maxLoanAmount = 1326000,
  maxDownPayment = 1226000,
  maxDuration = 84,
}: EMICalculatorProps) {
  const [loanAmount, setLoanAmount] = React.useState(1060800)
  const [downPayment, setDownPayment] = React.useState(265200)
  const [duration, setDuration] = React.useState(66)

  const calculateEMI = () => {
    const principal = loanAmount - downPayment
    const rateOfInterest = 10.5
    const monthlyRate = rateOfInterest / (12 * 100)
    const numberOfPayments = duration

    const emi =
      (principal *
        monthlyRate *
        Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    return Math.round(emi)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="lg" className="w-full">
          EMI Calculator - {formatCurrency(calculateEMI())} /month
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[90vh] sm:h-[85vh]">
        <div className="space-y-8">
          <SheetHeader className="space-y-4 pb-4">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-2xl font-bold text-purple-900">EMI Calculator</SheetTitle>
            </div>
          </SheetHeader>
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg">Loan Amount</Label>
                <span className="text-xl font-semibold text-purple-600">
                  {formatCurrency(loanAmount)}
                </span>
              </div>
              <SliderPrimitive.Root
                value={[loanAmount]}
                min={100000}
                max={maxLoanAmount}
                step={1000}
                onValueChange={([value]) => setLoanAmount(value)}
                className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:bg-purple-600"
              >
                <SliderPrimitive.Track>
                  <SliderPrimitive.Range />
                </SliderPrimitive.Track>
                <SliderPrimitive.Thumb />
              </SliderPrimitive.Root>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{formatCurrency(100000)}</span>
                <span>{formatCurrency(maxLoanAmount)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg">Down Payment</Label>
                <span className="text-xl font-semibold text-purple-600">
                  {formatCurrency(downPayment)}
                </span>
              </div>
              <SliderPrimitive.Root
                value={[downPayment]}
                min={0}
                max={maxDownPayment}
                step={1000}
                onValueChange={([value]) => setDownPayment(value)}
                className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:bg-purple-600"
              >
                <SliderPrimitive.Track>
                  <SliderPrimitive.Range />
                </SliderPrimitive.Track>
                <SliderPrimitive.Thumb />
              </SliderPrimitive.Root>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{formatCurrency(0)}</span>
                <span>{formatCurrency(maxDownPayment)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg">Duration of Loan</Label>
                <span className="text-xl font-semibold text-purple-600">
                  {duration} Months
                </span>
              </div>
              <SliderPrimitive.Root
                value={[duration]}
                min={12}
                max={maxDuration}
                step={1}
                onValueChange={([value]) => setDuration(value)}
                className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:bg-purple-600"
              >
                <SliderPrimitive.Track>
                  <SliderPrimitive.Range />
                </SliderPrimitive.Track>
                <SliderPrimitive.Thumb />
              </SliderPrimitive.Root>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>12 Months</span>
                <span>{maxDuration} Months</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-bold text-emerald-600">
                    ₹{Math.round(calculateEMI()).toLocaleString('en-IN')}
                  </span>
                  <span className="text-lg text-muted-foreground">per month</span>
                </div>
                <Button
                  variant="outline"
                  className="w-full justify-between border-purple-200 text-purple-600"
                >
                  <span className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    View Loan Breakup
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <Button className="w-full bg-purple-600 hover:bg-purple-700" size="lg">
                Check eligibility
              </Button>

              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  *Rate of interest can vary subject to credit profile. Loan approval
                  is at the sole discretion of the finance partner.
                </p>
                <p>**Processing fee and other loan charges are not included.</p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}