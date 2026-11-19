import Link from "next/link"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import { NavigationInteractions } from "./navigation-interactions"

const navLinks = [
  { href: "/#work", label: "Work", section: "work" },
  { href: "/resume", label: "Resume" },
  { href: "/#experience", label: "Experience", section: "experience" },
  { href: "/#contact", label: "Contact", section: "contact" },
]

const headerStateClasses =
  "border-transparent bg-transparent data-[scrolled=true]:border-border/70 data-[scrolled=true]:bg-background/85 data-[scrolled=true]:backdrop-blur-xl data-[menu-open=true]:border-border/70 data-[menu-open=true]:bg-background/85 data-[menu-open=true]:backdrop-blur-xl"

const desktopLinkClasses =
  "relative py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:bg-primary after:transition-transform after:duration-200 text-muted-foreground after:scale-x-0 hover:text-foreground hover:after:scale-x-100 data-[active=true]:text-foreground data-[active=true]:after:scale-x-100"

const projectsButtonClasses =
  "group inline-flex items-center gap-1.5 rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors duration-200 border-border-strong text-muted-foreground hover:border-primary/40 hover:text-foreground data-[active=true]:border-primary/60 data-[active=true]:bg-primary/10 data-[active=true]:text-primary"

const mobileLinkClasses =
  "group flex items-center justify-between rounded-xl px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-200 text-muted-foreground hover:bg-surface-hover hover:text-foreground data-[active=true]:bg-primary/10 data-[active=true]:text-primary"

const mobileProjectsClasses =
  "flex items-center justify-between rounded-xl px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-200 bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground data-[active=true]:bg-primary/10 data-[active=true]:text-primary"

function navData(link: { href: string; section?: string }) {
  return link.section ? { "data-nav-section": link.section } : { "data-nav-path": link.href }
}

export function Navigation() {
  return (
    <header id="site-header" className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${headerStateClasses}`}>
      <div className="site-container">
        <nav
          className="flex h-16 items-center justify-between gap-6 md:h-20"
          aria-label="Primary navigation"
        >
          <Link
            href="/"
            data-nav-close
            className="group flex min-w-0 items-center gap-3"
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
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} {...navData(link)} className={desktopLinkClasses}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link href="/projects" data-nav-path="/projects" className={projectsButtonClasses}>
                View projects
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <ThemeToggle />
            </div>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              id="mobile-menu-button"
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              aria-expanded="false"
              aria-controls="mobile-navigation"
              className="group"
            >
              <Menu className="h-5 w-5 group-data-[menu-open=true]:hidden" />
              <X className="hidden h-5 w-5 group-data-[menu-open=true]:block" />
            </Button>
          </div>
        </nav>
      </div>

      <div
        id="mobile-navigation"
        hidden
        className="site-container pb-4 md:hidden"
      >
        <div className="rounded-2xl border border-border/80 bg-background/95 p-2 shadow-xl shadow-black/10 backdrop-blur-xl">
          <nav aria-label="Mobile navigation" className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-nav-close
                {...navData(link)}
                className={mobileLinkClasses}
              >
                <span>{link.label}</span>
                <span aria-hidden="true" className="hidden h-1.5 w-1.5 rounded-full bg-primary group-data-[active=true]:block" />
              </Link>
            ))}
          </nav>
          <div className="mt-2 border-t border-border/70 p-2">
            <Link
              href="/projects"
              data-nav-close
              data-nav-path="/projects"
              className={mobileProjectsClasses}
            >
              View projects
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <NavigationInteractions />
    </header>
  )
}
