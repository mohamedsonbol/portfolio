import Link from "next/link"
import { ArrowDownRight, ArrowUpRight, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { portfolio } from "@/lib/portfolio-data"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-24 pt-36 md:pb-32 md:pt-48">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,oklch(0.7_0.16_180_/_0.12),transparent_30%),linear-gradient(135deg,transparent_45%,oklch(0.7_0.2_220_/_0.06))]" />
      <div className="container relative mx-auto grid max-w-6xl items-end gap-12 px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="mb-6 font-mono text-xs font-semibold tracking-[0.22em] text-primary">{portfolio.eyebrow}</p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] md:text-7xl">Engineering digital experiences <span className="text-primary">that deliver results.</span></h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">I&apos;m Mohamed Sonbol, a Technical Project Manager and Full-Stack Developer based in {portfolio.location}. {portfolio.intro}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg"><Link href="/#work">Explore my work <ArrowDownRight className="ml-2 h-4 w-4" /></Link></Button>
            <Button asChild variant="outline" size="lg"><Link href="/resume">View resume</Link></Button>
            <Button asChild variant="ghost" size="lg"><Link href="/#contact">Let&apos;s connect <ArrowUpRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
          <div className="mt-12 flex items-center gap-5 text-sm text-muted-foreground">
            <span className="h-px w-12 bg-border" />
            <span>Warsaw · Europe</span>
            <a href={portfolio.social.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-primary" aria-label="LinkedIn profile"><Linkedin className="h-4 w-4" /></a>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-sm lg:mb-4">
          <div className="absolute -inset-5 rounded-[2rem] border border-primary/10" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-2xl shadow-primary/10">
            <img src="/avatar-portrait.jpg" alt="Professional portrait of Mohamed Sonbol" className="aspect-[4/5] w-full object-cover" />
            <div className="flex items-center justify-between border-t border-border bg-card/95 px-5 py-4">
              <div><p className="text-sm font-semibold">Building with intent.</p><p className="mt-1 text-xs text-muted-foreground">Technology · Analytics · Delivery</p></div>
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_theme(colors.emerald.400)]" aria-label="Available for selected engagements" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
