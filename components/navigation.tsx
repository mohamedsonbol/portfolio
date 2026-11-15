"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import { portfolioConfig } from "@/lib/portfolio-config"

const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/resume", label: "Resume" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isScrolled ? "glass py-3" : "py-5"}`}>
      <nav className="container mx-auto flex items-center justify-between px-6" aria-label="Primary navigation">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 font-mono text-sm font-bold text-primary">MS</span>
          <span className="hidden text-sm font-semibold tracking-tight sm:block">{portfolioConfig.name}</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => <Link key={link.href} href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{link.label}</Link>)}
          <Link href="/projects" className="rounded-full border border-primary/40 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10">View projects</Link>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <Button variant="outline" size="icon" aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {isMobileMenuOpen && <div className="glass mx-4 mt-3 rounded-2xl p-4 md:hidden">
        {navLinks.map((link) => <Link key={link.href} href={link.href} className="block rounded-lg px-3 py-3 text-sm text-muted-foreground hover:bg-primary/10 hover:text-foreground" onClick={() => setIsMobileMenuOpen(false)}>{link.label}</Link>)}
        <Link href="/projects" className="mt-2 block rounded-lg bg-primary px-3 py-3 text-center text-sm font-medium text-primary-foreground" onClick={() => setIsMobileMenuOpen(false)}>View projects</Link>
      </div>}
    </header>
  )
}
