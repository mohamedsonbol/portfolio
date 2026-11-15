"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Github, Code2, Globe, FolderGit2, PenSquare, Star, ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const githubProjects = [
  {
    id: 1,
    title: "routing-app",
    description: "A routing application with dynamic navigation and state management, deployed on Vercel.",
    language: "JavaScript",
    tags: ["React", "Next.js", "Routing"],
    github: "https://github.com/mohamedsonbol/routing-app",
    live: "https://routing-app-two.vercel.app",
    image: "/developer-portfolio-website-dark-theme-modern.jpg",
    source: "github" as const,
    featured: true,
  },
  {
    id: 2,
    title: "moBlog",
    description: "A full-stack blog platform with user authentication, CRUD operations, and responsive design.",
    language: "EJS",
    tags: ["Node.js", "Express", "MongoDB", "EJS"],
    github: "https://github.com/mohamedsonbol/moBlog",
    live: "https://blogapp-f2xu.onrender.com/blogs",
    image: "/ai-content-generation-interface-dark.jpg",
    source: "github" as const,
    featured: false,
  },
  {
    id: 3,
    title: "react-gallery",
    description: "A React gallery app that fetches images from an API and displays them in a responsive grid using Material-UI.",
    language: "JavaScript",
    tags: ["React", "Material-UI", "API"],
    github: "https://github.com/mohamedsonbol/react-gallery",
    live: null,
    image: "/cloud-collaboration-dashboard-dark-theme.jpg",
    source: "github" as const,
    featured: false,
  },
  {
    id: 4,
    title: "yelp-camp-refactored",
    description: "Refactored YelpCamp project built with Express.js featuring authentication, authorization, and RESTful API design.",
    language: "JavaScript",
    tags: ["Express", "MongoDB", "REST API", "Auth"],
    github: "https://github.com/mohamedsonbol/yelp-camp-refactored",
    live: null,
    image: "/ecommerce-shopping-website-dark-theme.jpg",
    source: "github" as const,
    featured: false,
  },
  {
    id: 5,
    title: "moPortfolio",
    description: "Personal portfolio website showcasing projects, skills, and experience with modern design and dark theme.",
    language: "JavaScript",
    tags: ["React", "Node.js", "Express", "CSS"],
    github: "https://github.com/mohamedsonbol/moPortfolio",
    live: "https://moportfolio-4ezb.onrender.com",
    image: "/developer-portfolio-website-dark-theme-modern.jpg",
    source: "github" as const,
    featured: false,
  },
  {
    id: 6,
    title: "selenium-demo-js",
    description: "Repository containing examples using Node.js with Sauce Labs for automated browser testing.",
    language: "JavaScript",
    tags: ["Selenium", "Node.js", "Testing"],
    github: "https://github.com/mohamedsonbol/selenium-demo-js",
    live: null,
    image: "/developer-metrics-analytics-dashboard.jpg",
    source: "github" as const,
    featured: false,
  },
  {
    id: 7,
    title: "websitePractice",
    description: "Clean coded responsive mobile-friendly HTML5 website for a fictional web design company.",
    language: "HTML",
    tags: ["HTML5", "CSS3", "Responsive"],
    github: "https://github.com/mohamedsonbol/websitePractice",
    live: null,
    image: "/sustainability-eco-tracker-app-green.jpg",
    source: "github" as const,
    featured: false,
  },
  {
    id: 8,
    title: "The-Gym",
    description: "Responsive website built for practicing HTML5 and CSS3 with modern layout techniques.",
    language: "JavaScript",
    tags: ["HTML5", "CSS3", "Responsive"],
    github: "https://github.com/mohamedsonbol/The-Gym",
    live: null,
    image: "/task-manager-kanban-board-dark-theme.jpg",
    source: "github" as const,
    featured: false,
  },
  {
    id: 9,
    title: "data-layer-reviewer",
    description: "A data layer review and validation tool built with TypeScript for enterprise analytics implementations.",
    language: "TypeScript",
    tags: ["TypeScript", "Analytics", "Data"],
    github: "https://github.com/mohamedsonbol/data-layer-reviewer",
    live: null,
    image: "/developer-metrics-analytics-dashboard.jpg",
    source: "github" as const,
    featured: false,
  },
  {
    id: 10,
    title: "saucetechtest",
    description: "Technical test project demonstrating automated testing skills with JavaScript and Sauce Labs.",
    language: "JavaScript",
    tags: ["JavaScript", "Testing", "Automation"],
    github: "https://github.com/mohamedsonbol/saucetechtest",
    live: null,
    image: "/kanban-project-management-dark-theme.jpg",
    source: "github" as const,
    featured: false,
  },
]

const codepenProjects = [
  {
    id: 101,
    title: "CSS Selectors Game",
    description: "An interactive game to practice and master CSS selectors through hands-on challenges.",
    tags: ["CSS", "Game", "Interactive"],
    codepen: "https://codepen.io/mowhocodes/pen/bGevVxb",
    image: "/weather-dashboard-app-dark-theme-modern.jpg",
    source: "codepen" as const,
    featured: false,
  },
  {
    id: 102,
    title: "JavaScript Drum Kit",
    description: "Playable drum kit using keyboard inputs and Web Audio API to produce drum sounds.",
    tags: ["JavaScript", "Audio", "Web API"],
    codepen: "https://codepen.io/mowhocodes/pen/JjGZVZy",
    image: "/chat-messaging-app-dark-theme-modern.jpg",
    source: "codepen" as const,
    featured: false,
  },
  {
    id: 103,
    title: "Analog Clock",
    description: "A beautifully styled analog clock built with pure CSS and JavaScript showing real time.",
    tags: ["CSS", "JavaScript", "Time"],
    codepen: "https://codepen.io/mowhocodes/pen/MWpELXa",
    image: "/kanban-project-management-dark-theme.jpg",
    source: "codepen" as const,
    featured: false,
  },
  {
    id: 104,
    title: "Random Quote Machine",
    description: "Generate and tweet random inspirational quotes with this responsive single-page application.",
    tags: ["JavaScript", "API", "Quotes"],
    codepen: "https://codepen.io/mowhocodes/pen/eYrPGzz",
    image: "/ai-content-generation-interface-dark.jpg",
    source: "codepen" as const,
    featured: false,
  },
  {
    id: 105,
    title: "Markdown Previewer",
    description: "Live markdown editor with instant preview supporting GitHub-flavored markdown syntax.",
    tags: ["JavaScript", "Markdown", "Editor"],
    codepen: "https://codepen.io/mowhocodes/pen/jOLWBMd",
    image: "/cloud-collaboration-dashboard-dark-theme.jpg",
    source: "codepen" as const,
    featured: false,
  },
  {
    id: 106,
    title: "Pomodoro Clock",
    description: "Productivity timer with customizable work and break intervals featuring audio notifications.",
    tags: ["JavaScript", "Productivity", "Timer"],
    codepen: "https://codepen.io/mowhocodes/pen/wvajjdb",
    image: "/task-manager-kanban-board-dark-theme.jpg",
    source: "codepen" as const,
    featured: false,
  },
  {
    id: 107,
    title: "Calculator",
    description: "Fully functional calculator with keyboard support and a clean, modern interface.",
    tags: ["JavaScript", "Calculator", "Math"],
    codepen: "https://codepen.io/mowhocodes/pen/xxOBepg",
    image: "/password-manager-security-app-dark.jpg",
    source: "codepen" as const,
    featured: false,
  },
  {
    id: 108,
    title: "Tic Tac Toe",
    description: "Classic Tic Tac Toe game with AI opponent, multiple difficulty levels, and score tracking.",
    tags: ["JavaScript", "Game", "AI"],
    codepen: "https://codepen.io/mowhocodes/pen/bGevjWv",
    image: "/ecommerce-shopping-website-dark-theme.jpg",
    source: "codepen" as const,
    featured: false,
  },
]

type Project = (typeof githubProjects)[number] | (typeof codepenProjects)[number]
type FilterType = "all" | "github" | "codepen"

const languageColors: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  JavaScript: { bg: "rgba(234,179,8,0.12)", text: "#eab308", border: "rgba(234,179,8,0.25)", dot: "#eab308" },
  TypeScript: { bg: "rgba(59,130,246,0.12)", text: "#60a5fa", border: "rgba(59,130,246,0.25)", dot: "#60a5fa" },
  HTML:       { bg: "rgba(249,115,22,0.12)", text: "#fb923c", border: "rgba(249,115,22,0.25)", dot: "#fb923c" },
  EJS:        { bg: "rgba(34,197,94,0.12)",  text: "#4ade80", border: "rgba(34,197,94,0.25)",  dot: "#4ade80" },
  CSS:        { bg: "rgba(236,72,153,0.12)", text: "#f472b6", border: "rgba(236,72,153,0.25)", dot: "#f472b6" },
}

function useIntersectionObserver(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

/* ─── Individual card ─────────────────────────────────────────── */
function ProjectCard({ project, index, featured = false }: { project: Project; index: number; featured?: boolean }) {
  const isGithub = project.source === "github"
  const lang = "language" in project ? project.language : undefined
  const langStyle = lang ? languageColors[lang] : null
  const { ref, visible } = useIntersectionObserver(0.05)

  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl bg-card border border-border overflow-hidden flex flex-col transition-all duration-500 cursor-pointer${featured ? " md:col-span-2 md:flex-row" : ""}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 500ms ease ${index * 60}ms, transform 500ms ease ${index * 60}ms, border-color 300ms ease, box-shadow 300ms ease`,
        boxShadow: "0 0 0 0 transparent",
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLDivElement).style.borderColor = "color-mix(in srgb, var(--primary) 35%, transparent)"
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px -8px color-mix(in srgb, var(--primary) 15%, transparent), 0 0 0 1px color-mix(in srgb, var(--primary) 8%, transparent)"
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLDivElement).style.borderColor = ""
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 0 transparent"
      }}
    >
      {/* Image */}
      <div className={`relative overflow-hidden flex-shrink-0${featured ? " md:w-[42%] h-52 md:h-auto" : " h-44"}`}>
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg" }}
        />
        {/* Dark overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent${featured ? " md:bg-gradient-to-r md:from-transparent md:to-card/60" : ""}`} />

        {/* Badges row */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {/* Source badge */}
          <span
            className={`inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold px-2 py-1 rounded-md border backdrop-blur-sm ${
              isGithub
                ? "bg-black/70 text-white border-white/10"
                : "bg-[#1e1e2e]/80 text-[#58a6ff] border-[#58a6ff]/20"
            }`}
          >
            {isGithub ? <Github className="h-3 w-3" /> : <Code2 className="h-3 w-3" />}
            {isGithub ? "GitHub" : "CodePen"}
          </span>

          {/* Featured star */}
          {featured && (
            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2 py-1 rounded-md border backdrop-blur-sm bg-amber-500/20 text-amber-400 border-amber-500/25">
              <Star className="h-2.5 w-2.5 fill-amber-400" />
              Featured
            </span>
          )}
        </div>

        {/* Language badge */}
        {langStyle && (
          <div className="absolute top-3 right-3">
            <span
              className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2 py-1 rounded-md border"
              style={{ background: langStyle.bg, color: langStyle.text, borderColor: langStyle.border }}
            >
              <span className="h-1.5 w-1.5 rounded-full inline-block" style={{ background: langStyle.dot }} />
              {lang}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className={`p-5 flex flex-col flex-1 gap-3${featured ? " md:py-8 md:px-7" : ""}`}>
        {/* Title row */}
        <div className="flex items-start justify-between gap-2">
          <h3 className={`font-semibold leading-tight group-hover:text-primary transition-colors duration-200${featured ? " text-lg" : " text-base"}`}>
            {project.title}
          </h3>
          <a
            href={isGithub ? (project as typeof githubProjects[0]).github : (project as typeof codepenProjects[0]).codepen}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 p-1.5 rounded-lg text-muted-foreground/40 hover:text-primary hover:bg-primary/8 transition-all duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <p className={`text-sm text-muted-foreground leading-relaxed flex-1${featured ? " line-clamp-3" : " line-clamp-2"}`}>
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-primary/8 text-primary/80 border-primary/12 hover:bg-primary/15 text-[10px] font-mono px-2 py-0.5 h-auto"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 pt-3 mt-auto border-t border-border/40">
          <a
            href={isGithub ? (project as typeof githubProjects[0]).github : (project as typeof codepenProjects[0]).codepen}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/60 hover:bg-secondary transition-all duration-200 text-xs font-medium hover:text-foreground"
          >
            {isGithub ? <Github className="h-3.5 w-3.5" /> : <Code2 className="h-3.5 w-3.5" />}
            {isGithub ? "Source" : "View Pen"}
          </a>

          {"live" in project && project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 text-xs font-medium"
            >
              <Globe className="h-3.5 w-3.5" />
              Live Demo
            </a>
          )}

          {isGithub && !("live" in project && (project as typeof githubProjects[0]).live) && (
            <span className="text-[11px] text-muted-foreground/30 font-mono italic ml-auto">no live demo</span>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Main grid ───────────────────────────────────────────────── */
export function ProjectsGrid() {
  const [filter, setFilter] = useState<FilterType>("all")
  const [animKey, setAnimKey] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  const allProjects = [...githubProjects, ...codepenProjects]

  const handleFilterChange = (newFilter: FilterType) => {
    if (newFilter === filter) return
    setTransitioning(true)
    setTimeout(() => {
      setFilter(newFilter)
      setAnimKey((k) => k + 1)
      setTransitioning(false)
    }, 180)
  }

  const filteredProjects =
    filter === "all" ? allProjects : allProjects.filter((p) => p.source === filter)

  const counts = {
    all: allProjects.length,
    github: githubProjects.length,
    codepen: codepenProjects.length,
  }

  const filters: { key: FilterType; label: string; Icon: React.ElementType }[] = [
    { key: "all",     label: "All Work", Icon: FolderGit2 },
    { key: "github",  label: "GitHub",   Icon: Github     },
    { key: "codepen", label: "CodePen",  Icon: Code2      },
  ]

  return (
    <section className="pt-28 pb-24 px-6">
      <div className="container mx-auto max-w-6xl">

        {/* ── Page Header ── */}
        <div className="mb-10">
          {/* Terminal breadcrumb */}
          <div className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground bg-secondary/40 border border-border rounded-md px-3 py-1.5 mb-5">
            <span className="text-primary">~/portfolio</span>
            <span className="text-muted-foreground/40">›</span>
            <span className="text-chart-4">projects</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            {/* Title block */}
            <div className="space-y-3 max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Featured{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)" }}
                >
                  Projects
                </span>
              </h1>
              <p className="text-muted-foreground text-sm leading-relaxed">
                A curated collection of GitHub repositories and CodePen experiments — spanning full-stack applications, analytics tooling, and interactive front-end demos.
              </p>

              {/* Stat pills */}
              <div className="flex items-center gap-3 pt-1 flex-wrap">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border text-xs font-mono">
                  <FolderGit2 className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="font-semibold">{counts.github}</span>
                  <span className="text-muted-foreground">repos</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border text-xs font-mono">
                  <PenSquare className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="font-semibold">{counts.codepen}</span>
                  <span className="text-muted-foreground">pens</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-xs font-mono text-primary">
                  <Star className="h-3 w-3 fill-current opacity-70" />
                  <span className="font-semibold">{counts.all}</span>
                  <span className="opacity-70">total</span>
                </div>
              </div>
            </div>

            {/* Filter tabs — horizontal pills */}
            <div className="flex-shrink-0">
              <div className="flex items-center gap-1 p-1 rounded-xl bg-secondary/30 border border-border backdrop-blur-sm">
                {filters.map(({ key, label, Icon }) => {
                  const isActive = filter === key
                  return (
                    <button
                      key={key}
                      onClick={() => handleFilterChange(key)}
                      className={`relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {label}
                      <span
                        className={`text-[10px] font-mono tabular-nums transition-opacity ${
                          isActive ? "opacity-60" : "opacity-40"
                        }`}
                      >
                        {counts[key]}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

        {/* ── Projects Grid ── */}
        <div
          key={animKey}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          style={{
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? "translateY(6px)" : "translateY(0)",
            transition: "opacity 180ms ease, transform 180ms ease",
          }}
        >
          {filteredProjects.map((project, i) => {
            const isFeatured = "featured" in project && project.featured && i === 0 && filter !== "codepen"
            return (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                featured={isFeatured}
              />
            )
          })}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="p-5 rounded-2xl bg-secondary/30 border border-border mb-4">
              <FolderGit2 className="h-8 w-8 text-muted-foreground/40" />
            </div>
            <p className="text-muted-foreground font-mono text-sm">No projects found for this filter.</p>
          </div>
        )}
      </div>
    </section>
  )
}
