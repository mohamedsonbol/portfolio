"use client"

import Link from "next/link"
import { ArrowRight, MessageCircle, Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

export function HeroSection() {
  const { t, dir } = useI18n()
  const whatsappLink = "https://wa.me/48732785743?text=Hi%20Mohamed%2C%20I'd%20like%20to%20discuss%20a%20project."

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
          {/* Greeting Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="text-sm text-primary font-medium">{t.contact.availability.available}</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-balance">
            <span className="text-foreground">{t.hero.greeting}</span>
            <br />
            <span className="text-primary">{t.hero.title}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed text-pretty">
            {t.hero.subtitle}
          </p>

          {/* Description */}
          <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
            {t.hero.description}
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-wrap items-center justify-center gap-4 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
            <Button size="lg" className="gap-2" asChild>
              <Link href="/services">
                {t.hero.cta.services}
                <ArrowRight className={`h-4 w-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2 border-primary/30 hover:bg-primary/10" asChild>
              <Link href="/contact">
                {t.hero.cta.contact}
              </Link>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 pt-4">
            <a
              href="https://github.com/mohamedsonbol"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-secondary/50 hover:bg-primary/10 border border-border/50 hover:border-primary/30 transition-all"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </a>
            <a
              href="https://www.linkedin.com/in/mohamedsonbol"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-secondary/50 hover:bg-primary/10 border border-border/50 hover:border-primary/30 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 hover:border-[#25D366]/50 transition-all"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-5 w-5 text-[#25D366]" />
            </a>
          </div>

          {/* Regions Badge */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <span className="px-3 py-1 rounded-full bg-secondary text-xs text-muted-foreground border border-border">
              UAE
            </span>
            <span className="px-3 py-1 rounded-full bg-secondary text-xs text-muted-foreground border border-border">
              Saudi Arabia
            </span>
            <span className="px-3 py-1 rounded-full bg-secondary text-xs text-muted-foreground border border-border">
              Kuwait
            </span>
            <span className="px-3 py-1 rounded-full bg-secondary text-xs text-muted-foreground border border-border">
              Germany
            </span>
            <span className="px-3 py-1 rounded-full bg-secondary text-xs text-muted-foreground border border-border">
              France
            </span>
            <span className="px-3 py-1 rounded-full bg-secondary text-xs text-muted-foreground border border-border">
              Poland
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
