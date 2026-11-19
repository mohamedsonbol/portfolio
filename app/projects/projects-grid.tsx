"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Code2, Github, Globe } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ProjectClickTracker } from "@/components/project-click-tracker"
import { archiveProjects, featuredProjects, type Project } from "@/lib/projects"

const languageColors: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  JavaScript: { bg: "rgba(234,179,8,0.12)", text: "#eab308", border: "rgba(234,179,8,0.25)", dot: "#eab308" },
  TypeScript: { bg: "rgba(59,130,246,0.12)", text: "#60a5fa", border: "rgba(59,130,246,0.25)", dot: "#60a5fa" },
  HTML: { bg: "rgba(249,115,22,0.12)", text: "#fb923c", border: "rgba(249,115,22,0.25)", dot: "#fb923c" },
  EJS: { bg: "rgba(34,197,94,0.12)", text: "#4ade80", border: "rgba(34,197,94,0.25)", dot: "#4ade80" },
  CSS: { bg: "rgba(236,72,153,0.12)", text: "#f472b6", border: "rgba(236,72,153,0.25)", dot: "#f472b6" },
}

function CaseStudyCard({
  project,
  index,
  primary = false,
}: {
  project: Project
  index: number
  primary?: boolean
}) {
  const href = project.sourceUrl ?? `/projects#${project.slug}`
  const number = String(index + 1).padStart(2, "0")

  return (
    <article
      id={project.slug}
      data-project-name={project.name}
      data-project-category={project.category}
      className={`group grid gap-6 border-b border-border py-10 ${
        primary ? "lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 lg:py-14" : "md:grid-cols-[0.9fr_1.1fr] md:items-center"
      }`}
    >
      <div className={primary ? "" : "order-2 md:order-1"}>
        <div
          className={`relative overflow-hidden rounded-2xl border border-border bg-card ${
            primary ? "aspect-[4/3]" : "aspect-[16/10]"
          }`}
        >
          <Image
            src={project.image}
            alt={`${project.name} preview`}
            fill
            sizes={primary ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 768px) 45vw, 100vw"}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/45 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm">
            {primary ? "Primary case study" : "Selected work"}
          </span>
        </div>
      </div>

      <div className={primary ? "flex flex-col justify-center" : "order-1 md:order-2"}>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-semibold text-primary">{number}</span>
          <span className="h-px w-8 bg-primary/50" aria-hidden="true" />
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            {project.category}
          </span>
        </div>

        <h2 className={`${primary ? "mt-5 text-4xl md:text-5xl" : "mt-4 text-3xl"} font-semibold tracking-[-0.045em]`}>
          <Link
            href={href}
            target={project.sourceUrl ? "_blank" : undefined}
            rel={project.sourceUrl ? "noopener noreferrer" : undefined}
            className="underline decoration-primary/30 underline-offset-4 transition-colors duration-200 hover:text-primary hover:decoration-primary"
          >
            {project.name}
          </Link>
        </h2>

        <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
          {project.summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="border-primary/20 bg-primary/10 font-mono text-[10px] text-primary"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          {project.sourceUrl ? (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5"
            >
              Visit project
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          ) : (
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              Selected engagement
            </span>
          )}
          <Link
            href={`/projects#${project.slug}`}
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground underline decoration-primary/30 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
          >
            Permalink
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const isGithub = project.source === "github"
  const langStyle = project.language ? languageColors[project.language] : null
  const sourceUrl = project.sourceUrl

  return (
    <article
      id={project.slug}
      data-project-name={project.name}
      data-project-category={project.category}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-300 hover:border-primary/40"
    >
      <div className="relative h-48 flex-shrink-0 overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.name} preview`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          onError={(event) => {
            ;(event.target as HTMLImageElement).src = "/placeholder.svg"
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[10px] font-semibold backdrop-blur-sm ${
              isGithub
                ? "border-white/10 bg-black/70 text-white"
                : "border-[#58a6ff]/20 bg-[#1e1e2e]/80 text-[#58a6ff]"
            }`}
          >
            {isGithub ? <Github className="h-3 w-3" aria-hidden="true" /> : <Code2 className="h-3 w-3" aria-hidden="true" />}
            {isGithub ? "GitHub" : "CodePen"}
          </span>
        </div>

        {langStyle && (
          <span
            className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[10px]"
            style={{ background: langStyle.bg, color: langStyle.text, borderColor: langStyle.border }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: langStyle.dot }} />
            {project.language}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
              {project.category}
            </p>
            <h3 className="mt-1.5 text-lg font-semibold leading-tight tracking-[-0.02em] transition-colors duration-200 group-hover:text-primary">
              {project.name}
            </h3>
          </div>
          <ArrowUpRight
            className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </div>

        <p className="line-clamp-2 flex-1 text-sm leading-6 text-muted-foreground">
          {project.summary}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="h-auto border-primary/12 bg-primary/8 px-2 py-0.5 font-mono text-[10px] text-primary"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-2 border-t border-border/50 pt-3">
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-secondary/40 px-3 py-1.5 text-xs font-medium transition-colors hover:border-primary/40 hover:text-primary"
            >
              {isGithub ? <Github className="h-3.5 w-3.5" aria-hidden="true" /> : <Code2 className="h-3.5 w-3.5" aria-hidden="true" />}
              {isGithub ? "Source" : "View Pen"}
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Globe className="h-3.5 w-3.5" aria-hidden="true" />
              Live Demo
            </a>
          )}

          {!project.liveUrl && isGithub && (
            <span className="ml-auto font-mono text-[10px] italic text-subtle-foreground">
              no live demo
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

export function ProjectsGrid() {
  return (
    <div className="pb-24 pt-28 md:pb-32 md:pt-36">
      <div className="site-container">
        <header className="border-b border-border pb-10">
          <p className="eyebrow">Project index</p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <h1 className="text-display">
              Selected work,
              <br />
              <span className="text-primary">built end to end.</span>
            </h1>
            <div className="max-w-md lg:justify-self-end">
              <p className="text-sm leading-7 text-muted-foreground md:text-base">
                Client work, repositories and experiments across commerce,
                publishing, analytics tooling and interactive frontend builds.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                <span>
                  <span className="font-semibold text-foreground">{featuredProjects.length}</span>{" "}
                  case studies
                </span>
                <span className="hidden h-3 w-px bg-border sm:block" aria-hidden="true" />
                <span>
                  <span className="font-semibold text-foreground">{archiveProjects.length}</span>{" "}
                  repos
                </span>
              </div>
            </div>
          </div>
        </header>

        <ProjectClickTracker>
        <section aria-labelledby="case-studies-title" className="pt-10">
          <div className="flex items-center justify-between gap-4">
            <h2
              id="case-studies-title"
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground"
            >
              Client &amp; product work
            </h2>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
              01 — {String(featuredProjects.length).padStart(2, "0")}
            </span>
          </div>

          <div>
            {featuredProjects.map((project, index) => (
              <CaseStudyCard
                key={project.id}
                project={project}
                index={index}
                primary={index === 0}
              />
            ))}
          </div>
        </section>

        <section aria-labelledby="archive-title" className="pt-14">
          <div className="border-b border-border pb-6">
            <h2 id="archive-title" className="text-heading">
              Repositories.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
              Open-source builds and technical exercises.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {archiveProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
        </ProjectClickTracker>
      </div>
    </div>
  )
}
