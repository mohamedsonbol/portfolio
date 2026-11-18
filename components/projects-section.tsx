"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { featuredProjects } from "@/lib/projects"
import { trackProjectClick } from "@/lib/analytics"

export function ProjectsSection() {
  const [primaryProject, ...otherProjects] = featuredProjects

  return (
    <section id="work" className="py-24 md:py-32">
      <div className="site-container">
        <div className="flex flex-col gap-8 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Selected work</p>
            <h2 className="mt-4 text-heading">
              Work that connects storefronts, content and data.
            </h2>
          </div>
          <div className="max-w-sm md:text-right">
            <p className="text-sm leading-6 text-muted-foreground">
              A focused selection of client builds and product experiments, from
              commerce and publishing to AI-assisted tools.
            </p>
            <Link
              href="/projects"
              className="mt-4 inline-flex items-center gap-2 border-b border-primary/40 pb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-primary transition-colors hover:border-primary"
            >
              Explore projects
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <article
          onClick={() =>
            trackProjectClick({
              project_name: primaryProject.name,
              project_category: primaryProject.category,
            })
          }
          className="group grid gap-8 border-b border-border py-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 lg:py-14"
        >
          <div className="order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-card">
              <Image
                src={primaryProject.image}
                alt="DR. CHOICE bilingual e-commerce storefront"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/45 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm">
                Primary case study
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              <span>Case study 01 / 03</span>
              <span>{primaryProject.category}</span>
            </div>
          </div>

          <div className="order-1 flex flex-col justify-center lg:order-2">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-primary">01</span>
              <span className="h-px w-8 bg-primary/50" aria-hidden="true" />
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {primaryProject.category} · Integration
              </span>
            </div>
            <h3 className="mt-5 text-4xl font-semibold tracking-[-0.045em] md:text-5xl">
              <Link
                href={primaryProject.sourceUrl ?? `/projects#${primaryProject.slug}`}
                target={primaryProject.sourceUrl ? "_blank" : undefined}
                rel={primaryProject.sourceUrl ? "noopener noreferrer" : undefined}
                className="transition-colors duration-200 hover:text-primary"
              >
                {primaryProject.name}
              </Link>
            </h3>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
              Bilingual e-commerce storefront built with WordPress and WooCommerce,
              including OmPay payment gateway integration and the frontend/backend
              connection required to support the customer journey.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {primaryProject.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="border-primary/20 bg-primary/10 font-mono text-[10px] text-primary"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              {primaryProject.sourceUrl && (
                <a
                  href={primaryProject.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Visit project
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
              <Link
                href={`/projects#${primaryProject.slug}`}
                className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-primary"
              >
                Project index
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </article>

        <div className="grid md:grid-cols-2">
          {otherProjects.map((project, index) => {
            const number = String(index + 2).padStart(2, "0")
            const href = project.sourceUrl ?? `/projects#${project.slug}`

            return (
              <article
                key={project.id}
                onClick={() =>
                  trackProjectClick({
                    project_name: project.name,
                    project_category: project.category,
                  })
                }
                className="group border-b border-border py-8 md:px-8 md:first:border-l-0 md:last:border-l md:last:pr-0 md:first:pl-0"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {number} / {project.category}
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 text-primary/70 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </div>

                <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-xl border border-border bg-card">
                  <Image
                    src={project.image}
                    alt={`${project.name} preview`}
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                </div>

                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em]">
                  <Link
                    href={href}
                    target={project.sourceUrl ? "_blank" : undefined}
                    rel={project.sourceUrl ? "noopener noreferrer" : undefined}
                    className="transition-colors duration-200 hover:text-primary"
                  >
                    {project.name}
                  </Link>
                </h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                  {project.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border/80 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
