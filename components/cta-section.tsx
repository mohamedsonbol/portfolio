"use client"

import Link from "next/link"
import { Mail, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

export function CTASection() {
  const { t } = useI18n()
  const whatsappLink = "https://wa.me/48732785743?text=Hi%20Mohamed%2C%20I'd%20like%20to%20discuss%20a%20project."

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 p-12 md:p-16">
          {/* Background pattern */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
          
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.contact.title}</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              {t.contact.subtitle}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className="gap-2" asChild>
                <Link href="/contact">
                  <Mail className="h-5 w-5" />
                  {t.hero.cta.contact}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 bg-[#25D366]/10 border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 hover:border-[#25D366]/50"
                asChild
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  {t.contact.whatsapp.button}
                </a>
              </Button>
            </div>

            {/* Availability indicator */}
            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 border border-border">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-sm text-muted-foreground">
                {t.contact.availability.available} {t.contact.availability.forProjects}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
