"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

const sectionIds = ["work", "experience", "contact"] as const

export function NavigationInteractions() {
  const pathname = usePathname()

  useEffect(() => {
    const header = document.getElementById("site-header")
    const button = document.getElementById("mobile-menu-button")
    const panel = document.getElementById("mobile-navigation")
    if (!header || !button || !panel) return

    let open = false

    const setOpen = (next: boolean) => {
      if (open === next) return
      open = next
      header.dataset.menuOpen = String(next)
      button.dataset.menuOpen = String(next)
      panel.hidden = !next
      button.setAttribute("aria-expanded", String(next))
      button.setAttribute("aria-label", next ? "Close menu" : "Open menu")
    }

    const setActive = (element: Element, active: boolean) => {
      const current = element.hasAttribute("data-nav-section") ? "location" : "page"
      element.setAttribute("data-active", String(active))
      if (active) element.setAttribute("aria-current", current)
      else element.removeAttribute("aria-current")
    }

    const updateScrollState = () => {
      header.dataset.scrolled = String(window.scrollY > 16)

      let currentSection: string | null = null
      if (pathname === "/") {
        for (const sectionId of sectionIds) {
          const section = document.getElementById(sectionId)
          if (section && section.getBoundingClientRect().top <= 160) {
            currentSection = sectionId
          }
        }
      }

      header.querySelectorAll<HTMLElement>("[data-nav-section]").forEach((link) => {
        setActive(link, pathname === "/" && link.dataset.navSection === currentSection)
      })
    }

    const updatePathState = () => {
      header.querySelectorAll<HTMLElement>("[data-nav-path]").forEach((link) => {
        setActive(link, link.dataset.navPath === pathname)
      })
      setOpen(false)
    }

    updateScrollState()
    updatePathState()

    const onButtonClick = () => setOpen(!open)
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false)
        button.focus()
      }
    }
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Element
      if (button.contains(target)) return
      if (target.closest("[data-nav-close]")) {
        setOpen(false)
        return
      }
      if (!panel.contains(target)) setOpen(false)
    }
    const desktopQuery = window.matchMedia("(min-width: 768px)")
    const onDesktopChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false)
    }

    window.addEventListener("scroll", updateScrollState, { passive: true })
    window.addEventListener("resize", updateScrollState)
    button.addEventListener("click", onButtonClick)
    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("pointerdown", onPointerDown)
    desktopQuery.addEventListener("change", onDesktopChange)

    return () => {
      window.removeEventListener("scroll", updateScrollState)
      window.removeEventListener("resize", updateScrollState)
      button.removeEventListener("click", onButtonClick)
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("pointerdown", onPointerDown)
      desktopQuery.removeEventListener("change", onDesktopChange)
    }
  }, [pathname])

  return null
}
