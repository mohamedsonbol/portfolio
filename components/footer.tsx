"use client"

import Link from "next/link"
import { Code2, Github, Linkedin, MessageCircle } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export function Footer() {
  const { t, dir } = useI18n()

  const socialLinks = [
    { icon: Github, href: "https://github.com/mohamedsonbol", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/mohamedsonbol", label: "LinkedIn" },
    { icon: MessageCircle, href: "https://wa.me/48732785743", label: "WhatsApp" },
  ]

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/services", label: t.nav.services },
    { href: "/projects", label: t.nav.projects },
    { href: "/contact", label: t.nav.contact },
  ]

  return (
    <footer className="py-12 border-t border-border bg-card/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className={`flex flex-col items-center md:items-start gap-4 ${dir === "rtl" ? "md:items-end" : ""}`}>
            <Link href="/" className="flex items-center gap-2 text-primary font-bold text-lg">
              <Code2 className="h-5 w-5" />
              <span>Mohamed Sonbol</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} • {t.footer.builtWith}
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-secondary hover:bg-primary/10 hover:text-primary transition-all"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
