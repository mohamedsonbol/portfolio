import Link from "next/link"
import Image from "next/image"
import { ArrowDownRight, ArrowUpRight, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { portfolioConfig } from "@/lib/portfolio-config"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-40">
      <div className="brand-ambient pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="site-container relative">
        <div className="hero-enter grid gap-2 border-b border-border/60 pb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] sm:grid-cols-[auto_1fr] sm:items-center">
          <p className="text-foreground">Mohamed Sonbol</p>
          <p className="text-primary sm:text-center">Digital Solutions &amp; Technology Consultant</p>
        </div>

        <h1 className="hero-enter hero-enter-delay-1 mt-10 max-w-5xl text-display">
          Turning complex technology into{" "}
          <span className="text-primary">meaningful digital experiences.</span>
        </h1>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:gap-16 xl:grid-cols-[minmax(0,1fr)_400px]">
          <div className="hero-enter hero-enter-delay-2 max-w-2xl">
            <p className="text-body-lg text-muted-foreground">
              I connect frontend experiences to the integrations, data and tooling
              behind them — spanning web development, e-commerce, analytics,
              business systems and AI-assisted automation.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg" className="h-11 rounded-full px-6">
                <Link href="#work">
                  Explore selected work
                  <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-11 rounded-full px-6">
                <Link href="#contact">
                  Let&apos;s discuss a project
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              <a
                href={portfolioConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-primary"
              >
                <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
                LinkedIn
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <figure className="hero-visual-enter group relative mx-auto w-full max-w-[360px] sm:max-w-[420px] lg:mx-0 lg:max-w-none">
            <span
              className="absolute -left-3 top-12 hidden h-28 w-px bg-primary/60 lg:block"
              aria-hidden="true"
            />
            <span
              className="absolute -right-3 bottom-12 hidden h-28 w-px bg-primary/30 lg:block"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-2xl shadow-primary/10">
              <Image
                src="/images/profile/portfolio-portrait-1.png"
                alt="Portrait of Mohamed Sonbol"
                width={1254}
                height={1254}
                priority
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 420px, calc(100vw - 3rem)"
                className="aspect-[4/5] w-full object-cover object-[center_18%] contrast-[1.03] saturate-[0.9] transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/90">
                  Portrait / 01
                </span>
              </div>
            </div>
            <figcaption className="mt-4 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              <span>Digital solutions &amp; technology consultant</span>
              <span className="text-primary">2026</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
