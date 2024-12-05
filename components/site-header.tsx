"use client";

import Link from "next/link"
import { ChevronDown, Heart, MapPin, Search, Menu, X } from 'lucide-react'
import { useState } from 'react'

import { Button } from "@/components/ui/button"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center px-4">
        {/* Container for logo and navigation links */}
        <div className="flex flex-1 items-center">
          <Link href="/" className="mr-6">
            <span className="text-2xl font-bold text-purple-600">Alpha</span>
          </Link>
          
          <Button variant="outline" className="mr-4 gap-2 hidden md:flex">
            <MapPin className="h-4 w-4" />
            Delhi NCR
            <ChevronDown className="h-4 w-4" />
          </Button>

          <div className="flex-1 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search by owner count"
                className="w-full rounded-md border px-10 py-2 outline-none focus:border-purple-600"
              />
            </div>
          </div>

          <nav className="ml-4 flex items-center justify-between gap-4 hidden md:flex">
            <Button variant="ghost">Buy car</Button>
            <Button variant="ghost">Sell car</Button>
            <Button variant="ghost">More</Button>
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button>Account</Button>
          </nav>
        </div>

        {/* Hamburger Menu Button on the far right */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container px-4 py-2">
            <Button variant="outline" className="w-full mb-2 gap-2">
              <MapPin className="h-4 w-4" />
              Delhi NCR
              <ChevronDown className="h-4 w-4" />
            </Button>
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search by owner count"
                className="w-full rounded-md border px-10 py-2 outline-none focus:border-purple-600"
              />
            </div>
            <Button variant="ghost" className="w-full mb-2">Buy car</Button>
            <Button variant="ghost" className="w-full mb-2">Sell car</Button>
            <Button variant="ghost" className="w-full mb-2">More</Button>
            <Button variant="ghost" size="icon" className="w-full mb-2">
              <Heart className="h-5 w-5" />
            </Button>
            <Button className="w-full">Account</Button>
          </div>
        </div>
      )}
    </header>
  )
}