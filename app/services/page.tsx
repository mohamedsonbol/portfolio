"use client"

import Link from "next/link"
import { ArrowRight, Globe, ShoppingCart, BarChart3, Settings, CheckCircle2, MessageCircle } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

const serviceIcons = {
  web: Globe,
  ecommerce: ShoppingCart,
  analytics: BarChart3,
  consulting: Settings,
}

const serviceColors = {
  web: "from-blue-500/20 to-blue-600/5",
  ecommerce: "from-green-500/20 to-green-600/5",
  analytics: "from-orange-500/20 to-orange-600/5",
  consulting: "from-purple-500/20 to-purple-600/5",
}

export default function ServicesPage() {
  const { t, dir } = useI18n()
  const services = t.services.categories
  const whatsappLink = "https://wa.me/48732785743?text=Hi%20Mohamed%2C%20I'd%20like%20to%20discuss%20a%20project."

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{t.services.title}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-24 px-6 flex-1">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {(Object.keys(services) as Array<keyof typeof services>).map((key) => {
              const service = services[key]
              const Icon = serviceIcons[key]
              const gradient = serviceColors[key]
              return (
                <div
                  key={key}
                  className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} p-8 border border-border`}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-background/80 border border-border">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
                      <p className="text-muted-foreground">{service.description}</p>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {service.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Button variant="outline" className="gap-2" asChild>
                    <Link href="/contact">
                      {t.hero.cta.contact}
                      <ArrowRight className={`h-4 w-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
                    </Link>
                  </Button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-secondary/30">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.contact.title}</h2>
          <p className="text-muted-foreground mb-8">
            {t.contact.subtitle}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="gap-2" asChild>
              <Link href="/contact">
                {t.hero.cta.contact}
                <ArrowRight className={`h-4 w-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 bg-[#25D366]/10 border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20"
              asChild
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                {t.contact.whatsapp.button}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
