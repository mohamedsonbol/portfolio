import Link from "next/link"
import { ArrowUpRight, Github, Heart, Linkedin } from "lucide-react"
import { portfolioConfig } from "@/lib/portfolio-config"
import { CookieSettingsButton } from "@/components/cookie-settings-button"

const footerLinks = [
  { href: "/#work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
]

const socialLinks = [
  {
    href: portfolioConfig.linkedin,
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: portfolioConfig.social.github,
    label: "GitHub",
    icon: Github,
  },
]

const linkClassName =
  "inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-background">
      <div className="site-container py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-20">
          <div className="max-w-md">
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
              aria-label="Mohamed Sonbol — home"
            >
              <span
                aria-hidden="true"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-primary/30 bg-primary/10 font-mono text-[11px] font-bold tracking-[0.12em] text-primary transition-colors duration-200 group-hover:border-primary/60"
              >
                MS
              </span>
              <span>
                <span className="block text-xl font-semibold tracking-tight">
                  Mohamed Sonbol
                </span>
                <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                  Digital Solutions &amp; Technology Consultant
                </span>
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <nav aria-label="Footer navigation">
              <p className="eyebrow">Navigate</p>
              <ul className="mt-4 space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClassName}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Social links">
              <p className="eyebrow">Connect</p>
              <ul className="mt-4 space-y-3">
                {socialLinks.map(({ href, label, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClassName}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {label}
                      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Legal">
              <p className="eyebrow">Legal</p>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link href="/privacy-policy" className={linkClassName}>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/cookie-policy" className={linkClassName}>
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <CookieSettingsButton />
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border/70 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {portfolioConfig.name}</p>
          <p className="inline-flex items-center gap-1.5">
            Built with
            <Heart className="h-3.5 w-3.5 fill-primary text-primary" aria-hidden="true" />
            by {portfolioConfig.name}.
          </p>
        </div>
      </div>
    </footer>
  )
}
