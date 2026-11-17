import Link from "next/link"
import Image from "next/image"
import { ArrowDownRight, ArrowUpRight, FileText, Linkedin, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { portfolioConfig } from "@/lib/portfolio-config"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-20 pt-36 md:pb-28 md:pt-48">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_76%_14%,rgb(185_243_75_/_0.12),transparent_28%),linear-gradient(120deg,transparent_45%,rgb(185_243_75_/_0.04))]" />
      <div className="container relative mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="eyebrow">Technical Support Engineer</p>
          <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] md:text-7xl">
            Mohamed Ezzat <span className="text-primary">(Sonbol)</span>
          </h1>
          <p className="mt-6 text-lg font-medium text-foreground md:text-xl">
            JavaScript <span className="text-primary">|</span> APIs <span className="text-primary">|</span> Integrations
          </p>
          <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
            {portfolioConfig.professionalSummary}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg"><Link href="#experience">View My Experience <ArrowDownRight className="ml-2 h-4 w-4" /></Link></Button>
            <Button asChild variant="outline" size="lg">
              <a href="/Resume.pdf" download>
                Download Resume <FileText className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="lg"><Link href="#contact">Contact Me <ArrowUpRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" />{portfolioConfig.location}</span>
            <span className="hidden h-4 w-px bg-border sm:block" />
            <a href={portfolioConfig.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-sm lg:mb-4">
          <div className="absolute -inset-4 rounded-[2rem] border border-primary/20" />
          <div className="relative overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-2xl shadow-primary/10">
            <Image src="/images/profile/portfolio-portrait-1.png" alt="Mohamed Ezzat Sonbol" width={600} height={800} priority sizes="(min-width: 1024px) 34vw, 88vw" className="aspect-[4/5] w-full object-cover object-[center_18%] grayscale-[15%]" />
            <div className="border-t border-border bg-card px-5 py-4">
              <p className="text-sm font-semibold">Support the signal.</p>
              <p className="mt-1 text-xs text-muted-foreground">Debugging · Integration · Delivery</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
