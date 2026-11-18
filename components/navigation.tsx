"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/#work", label: "Work", section: "work" },
  { href: "/resume", label: "Resume" },
  { href: "/#experience", label: "Experience", section: "experience" },
  { href: "/#contact", label: "Contact", section: "contact" },
]

const sectionIds = ["work", "experience", "contact"] as const

type NavLink = (typeof navLinks)[number]

function isActive(link: NavLink, pathname: string, activeSection: string | null) {
  if (link.section) return pathname === "/" && activeSection === link.section
  return pathname === link.href
}

export function Navigation() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenu, setMobileMenu] = useState({ pathname, open: false })
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const isMobileMenuOpen = mobileMenu.open && mobileMenu.pathname === pathname

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 16)

      if (pathname !== "/") {
        setActiveSection(null)
        return
      }

      let currentSection: string | null = null
      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId)
        if (section && section.getBoundingClientRect().top <= 160) {
          currentSection = sectionId
        }
      }
      setActiveSection((current) => (current === currentSection ? current : currentSection))
    }

    updateScrollState()
    window.addEventListener("scroll", updateScrollState, { passive: true })
    window.addEventListener("resize", updateScrollState)

    return () => {
      window.removeEventListener("scroll", updateScrollState)
      window.removeEventListener("resize", updateScrollState)
    }
  }, [pathname])

  useEffect(() => {
    if (!isMobileMenuOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenu((menu) => ({ ...menu, open: false }))
        menuButtonRef.current?.focus()
      }
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      if (menuRef.current?.contains(target) || menuButtonRef.current?.contains(target)) return
      setMobileMenu((menu) => ({ ...menu, open: false }))
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("pointerdown", handlePointerDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("pointerdown", handlePointerDown)
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)")
    const handleDesktopChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileMenu((menu) => ({ ...menu, open: false }))
    }

    desktopQuery.addEventListener("change", handleDesktopChange)
    return () => desktopQuery.removeEventListener("change", handleDesktopChange)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        isScrolled || isMobileMenuOpen
          ? "border-border/70 bg-background/85 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="site-container">
        <nav
          className="flex h-16 items-center justify-between gap-6 md:h-20"
          aria-label="Primary navigation"
        >
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-3"
            onClick={() => setMobileMenu((menu) => ({ ...menu, open: false }))}
            aria-label="Mohamed Sonbol — home"
          >
            <span
              aria-hidden="true"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-primary/30 bg-primary/10 font-mono text-[10px] font-bold tracking-[0.12em] text-primary transition-colors duration-200 group-hover:border-primary/60"
            >
              MS
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold tracking-tight sm:text-[15px]">
                Mohamed Sonbol
              </span>
              <span className="mt-0.5 hidden truncate font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground xl:block">
                Digital Solutions &amp; Technology Consultant
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-6 md:flex lg:gap-8">
            <div className="flex items-center gap-5 lg:gap-7">
              {navLinks.map((link) => {
                const active = isActive(link, pathname, activeSection)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? (link.section ? "location" : "page") : undefined}
                    className={cn(
                      "relative py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:bg-primary after:transition-transform after:duration-200",
                      active
                        ? "text-foreground after:scale-x-100"
                        : "text-muted-foreground after:scale-x-0 hover:text-foreground hover:after:scale-x-100",
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/projects"
                aria-current={pathname === "/projects" ? "page" : undefined}
                className={cn(
                  "group inline-flex items-center gap-1.5 rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors duration-200",
                  pathname === "/projects"
                    ? "border-primary/60 bg-primary/10 text-primary"
                    : "border-border-strong text-muted-foreground hover:border-primary/40 hover:text-foreground",
                )}
              >
                View projects
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <ThemeToggle />
            </div>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              ref={menuButtonRef}
              type="button"
              variant="ghost"
              size="icon"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() =>
                setMobileMenu((menu) => ({
                  pathname,
                  open: !(menu.open && menu.pathname === pathname),
                }))
              }
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>
      </div>

      <div
        id="mobile-navigation"
        ref={menuRef}
        hidden={!isMobileMenuOpen}
        className="site-container pb-4 md:hidden"
      >
        <div className="rounded-2xl border border-border/80 bg-background/95 p-2 shadow-xl shadow-black/10 backdrop-blur-xl">
          <nav aria-label="Mobile navigation" className="flex flex-col">
            {navLinks.map((link) => {
              const active = isActive(link, pathname, activeSection)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? (link.section ? "location" : "page") : undefined}
                  onClick={() => setMobileMenu((menu) => ({ ...menu, open: false }))}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-200",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-surface-hover hover:text-foreground",
                  )}
                >
                  <span>{link.label}</span>
                  {active && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />}
                </Link>
              )
            })}
          </nav>
          <div className="mt-2 border-t border-border/70 p-2">
            <Link
              href="/projects"
              aria-current={pathname === "/projects" ? "page" : undefined}
              onClick={() => setMobileMenu((menu) => ({ ...menu, open: false }))}
              className={cn(
                "flex items-center justify-between rounded-xl px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-200",
                pathname === "/projects"
                  ? "bg-primary/10 text-primary"
                  : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              View projects
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
