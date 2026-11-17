"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { featuredProjects } from "@/lib/portfolio-data"
import { trackProjectClick } from "@/lib/analytics"

export function ProjectsSection() {
  const primaryProject = featuredProjects[0]
  const otherProjects = featuredProjects.slice(1)

  return (
    <section id="work" className="py-24">
      <div className="container mx-auto px-6">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Projects built around real integrations.</h2>
          </div>
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            View all projects <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <article
          onClick={() =>
            trackProjectClick({
              project_name: primaryProject.name,
              project_category: primaryProject.category,
            })
          }
          className="grid overflow-hidden rounded-3xl border border-border bg-card lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="relative min-h-[280px] overflow-hidden lg:min-h-[430px]">
            <Image src={primaryProject.image} alt="DR. CHOICE e-commerce storefront" fill sizes="(min-width: 1024px) 52vw, 100vw" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
            <span className="absolute left-6 top-6 rounded-full border border-primary/40 bg-background/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-primary">Primary case study</span>
          </div>
          <div className="flex flex-col justify-center p-7 md:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">E-commerce · Integration</p>
            <h3 className="mt-4 text-3xl font-semibold tracking-tight">DR. CHOICE</h3>
            <p className="mt-5 text-base leading-7 text-muted-foreground">Bilingual e-commerce storefront built with WordPress and WooCommerce, including OmPay payment gateway integration and the frontend/backend connection required to support the customer journey.</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {primaryProject.tags.map((tag) => <Badge key={tag} variant="secondary" className="border-primary/20 bg-primary/10 font-mono text-xs text-primary">{tag}</Badge>)}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="https://dr-choice.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">Visit project <ExternalLink className="h-4 w-4" /></a>
              <Link href="/projects" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/60 hover:text-primary">Explore projects <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </article>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {otherProjects.map((project) => (
            <article
              key={project.name}
              onClick={() =>
                trackProjectClick({
                  project_name: project.name,
                  project_category: project.category,
                })
              }
              className="group rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
            >
              <div className="relative h-48 overflow-hidden rounded-xl">
                <Image src={project.image} alt={project.name} fill sizes="(min-width: 768px) 50vw, 100vw" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{project.category}</p>
                  <h3 className="mt-2 text-xl font-semibold">{project.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.summary}</p>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-primary opacity-60 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
