import Link from "next/link"
import { ChevronRight } from 'lucide-react'

export function Breadcrumb() {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground">
      <Link href="/" className="hover:text-foreground">
        HOME
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link href="/cars/gurgaon" className="hover:text-foreground">
        USED CARS IN GURGAON
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link href="/cars/gurgaon/mahindra" className="hover:text-foreground">
        MAHINDRA CARS
      </Link>
      <ChevronRight className="h-4 w-4" />
      <span className="text-foreground">USED 2021 MAHINDRA THAR CARS</span>
    </nav>
  )
}

