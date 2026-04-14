"use client"

import { useState } from "react"
import { ExternalLink, Github, Code2, Globe, FolderGit2, PenSquare } from "lucide-react"
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
    image: "https://opengraph.githubassets.com/default/mohamedsonbol/routing-app",
    source: "github" as const,
  },
  {
    id: 2,
    title: "moBlog",
    description: "A full-stack blog platform with user authentication, CRUD operations, and responsive design.",
    language: "EJS",
    tags: ["Node.js", "Express", "MongoDB", "EJS"],
    github: "https://github.com/mohamedsonbol/moBlog",
    live: "https://blogapp-f2xu.onrender.com/blogs",
    image: "https://opengraph.githubassets.com/default/mohamedsonbol/moBlog",
    source: "github" as const,
  },
  {
    id: 3,
    title: "react-gallery",
    description: "A React gallery app that fetches images from an API and displays them in a responsive grid using Material-UI.",
    language: "JavaScript",
    tags: ["React", "Material-UI", "API"],
    github: "https://github.com/mohamedsonbol/react-gallery",
    live: null,
    image: "https://opengraph.githubassets.com/default/mohamedsonbol/react-gallery",
    source: "github" as const,
  },
  {
    id: 4,
    title: "yelp-camp-refactored",
    description: "Refactored YelpCamp project built with Express.js featuring authentication, authorization, and RESTful API design.",
    language: "JavaScript",
    tags: ["Express", "MongoDB", "REST API", "Auth"],
    github: "https://github.com/mohamedsonbol/yelp-camp-refactored",
    live: null,
    image: "https://opengraph.githubassets.com/default/mohamedsonbol/yelp-camp-refactored",
    source: "github" as const,
  },
  {
    id: 5,
    title: "moPortfolio",
    description: "Personal portfolio website showcasing projects, skills, and experience with modern design and dark theme.",
    language: "JavaScript",
    tags: ["React", "Node.js", "Express", "CSS"],
    github: "https://github.com/mohamedsonbol/moPortfolio",
    live: "https://moportfolio-4ezb.onrender.com",
    image: "https://opengraph.githubassets.com/default/mohamedsonbol/moPortfolio",
    source: "github" as const,
  },
  {
    id: 6,
    title: "selenium-demo-js",
    description: "Repository containing examples using Node.js with Sauce Labs for automated browser testing.",
    language: "JavaScript",
    tags: ["Selenium", "Node.js", "Testing"],
    github: "https://github.com/mohamedsonbol/selenium-demo-js",
    live: null,
    image: "https://opengraph.githubassets.com/default/mohamedsonbol/selenium-demo-js",
    source: "github" as const,
  },
  {
    id: 7,
    title: "websitePractice",
    description: "Clean coded responsive mobile-friendly HTML5 website for a fictional web design company.",
    language: "HTML",
    tags: ["HTML5", "CSS3", "Responsive"],
    github: "https://github.com/mohamedsonbol/websitePractice",
    live: null,
    image: "https://opengraph.githubassets.com/default/mohamedsonbol/websitePractice",
    source: "github" as const,
  },
  {
    id: 8,
    title: "The-Gym",
    description: "Responsive website built for practicing HTML5 and CSS3 with modern layout techniques.",
    language: "JavaScript",
    tags: ["HTML5", "CSS3", "Responsive"],
    github: "https://github.com/mohamedsonbol/The-Gym",
    live: null,
    image: "https://opengraph.githubassets.com/default/mohamedsonbol/The-Gym",
    source: "github" as const,
  },
  {
    id: 9,
    title: "data-layer-reviewer",
    description: "A data layer review and validation tool built with TypeScript for enterprise analytics implementations.",
    language: "TypeScript",
    tags: ["TypeScript", "Analytics", "Data"],
    github: "https://github.com/mohamedsonbol/data-layer-reviewer",
    live: null,
    image: "https://opengraph.githubassets.com/default/mohamedsonbol/data-layer-reviewer",
    source: "github" as const,
  },
  {
    id: 10,
    title: "saucetechtest",
    description: "Technical test project demonstrating automated testing skills with JavaScript and Sauce Labs.",
    language: "JavaScript",
    tags: ["JavaScript", "Testing", "Automation"],
    github: "https://github.com/mohamedsonbol/saucetechtest",
    live: null,
    image: "https://opengraph.githubassets.com/default/mohamedsonbol/saucetechtest",
    source: "github" as const,
  },
]

const codepenProjects = [
  {
    id: 101,
    title: "CSS Selectors Game",
    description: "An interactive game to practice and master CSS selectors through hands-on challenges.",
    tags: ["CSS", "Game", "Interactive"],
    codepen: "https://codepen.io/mowhocodes/pen/bGevVxb",
    image: "https://shots.codepen.io/mowhocodes/pen/bGevVxb-1280.jpg",
    source: "codepen" as const,
  },
  {
    id: 102,
    title: "JavaScript Drum Kit",
    description: "Playable drum kit using keyboard inputs and Web Audio API to produce drum sounds.",
    tags: ["JavaScript", "Audio", "Web API"],
    codepen: "https://codepen.io/mowhocodes/pen/JjGZVZy",
    image: "https://shots.codepen.io/mowhocodes/pen/JjGZVZy-1280.jpg",
    source: "codepen" as const,
  },
  {
    id: 103,
    title: "Analog Clock",
    description: "A beautifully styled analog clock built with pure CSS and JavaScript showing real time.",
    tags: ["CSS", "JavaScript", "Time"],
    codepen: "https://codepen.io/mowhocodes/pen/MWpELXa",
    image: "https://shots.codepen.io/mowhocodes/pen/MWpELXa-1280.jpg",
    source: "codepen" as const,
  },
  {
    id: 104,
    title: "Random Quote Machine",
    description: "Generate and tweet random inspirational quotes with this responsive single-page application.",
    tags: ["JavaScript", "API", "Quotes"],
    codepen: "https://codepen.io/mowhocodes/pen/eYrPGzz",
    image: "https://shots.codepen.io/mowhocodes/pen/eYrPGzz-1280.jpg",
    source: "codepen" as const,
  },
  {
    id: 105,
    title: "Markdown Previewer",
    description: "Live markdown editor with instant preview supporting GitHub-flavored markdown syntax.",
    tags: ["JavaScript", "Markdown", "Editor"],
    codepen: "https://codepen.io/mowhocodes/pen/jOLWBMd",
    image: "https://shots.codepen.io/mowhocodes/pen/jOLWBMd-1280.jpg",
    source: "codepen" as const,
  },
  {
    id: 106,
    title: "Pomodoro Clock",
    description: "Productivity timer with customizable work and break intervals featuring audio notifications.",
    tags: ["JavaScript", "Productivity", "Timer"],
    codepen: "https://codepen.io/mowhocodes/pen/wvajjdb",
    image: "https://shots.codepen.io/mowhocodes/pen/wvajjdb-1280.jpg",
    source: "codepen" as const,
  },
  {
    id: 107,
    title: "Calculator",
    description: "Fully functional calculator with keyboard support and a clean, modern interface.",
    tags: ["JavaScript", "Calculator", "Math"],
    codepen: "https://codepen.io/mowhocodes/pen/xxOBepg",
    image: "https://shots.codepen.io/mowhocodes/pen/xxOBepg-1280.jpg",
    source: "codepen" as const,
  },
  {
    id: 108,
    title: "Tic Tac Toe",
    description: "Classic Tic Tac Toe game with AI opponent, multiple difficulty levels, and score tracking.",
    tags: ["JavaScript", "Game", "AI"],
    codepen: "https://codepen.io/mowhocodes/pen/bGevjWv",
    image: "https://shots.codepen.io/mowhocodes/pen/bGevjWv-1280.jpg",
    source: "codepen" as const,
  },
]

type Project = (typeof githubProjects)[number] | (typeof codepenProjects)[number]
type FilterType = "all" | "github" | "codepen"

const languageColors: Record<string, string> = {
  JavaScript: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  TypeScript: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  HTML: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  EJS: "bg-green-500/20 text-green-400 border-green-500/30",
  CSS: "bg-pink-500/20 text-pink-400 border-pink-500/30",
}

export function ProjectsGrid() {
  const [filter, setFilter] = useState<FilterType>("all")
  const [visible, setVisible] = useState(true)

  const allProjects = [...githubProjects, ...codepenProjects]

  const handleFilterChange = (newFilter: FilterType) => {
    if (newFilter === filter) return
    setVisible(false)
    setTimeout(() => {
      setFilter(newFilter)
      setVisible(true)
    }, 150)
  }

  const filteredProjects =
    filter === "all" ? allProjects : allProjects.filter((p) => p.source === filter)

  const counts = {
    all: allProjects.length,
    github: githubProjects.length,
    codepen: codepenProjects.length,
  }

  return (
    <section className="pt-28 pb-24 px-6">
      <div className="container mx-auto max-w-6xl">

        {/* ── Hero Header ── */}
        <div className="relative rounded-2xl border border-border bg-card overflow-hidden mb-8">
          {/* Background grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          {/* Gradient accent */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

          <div className="relative px-6 py-8 md:px-10 md:py-10">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">

              {/* Left — Terminal-style label + heading */}
              <div className="space-y-3 max-w-lg">
                <div className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground bg-secondary/60 border border-border rounded px-3 py-1.5">
                  <span className="text-primary">~/portfolio</span>
                  <span className="text-chart-4">ls ./projects</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Featured{" "}
                  <span className="text-primary">Projects</span>
                </h1>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  A curated collection of GitHub repositories and CodePen experiments — spanning full-stack applications, analytics tooling, and interactive front-end demos.
                </p>

                {/* Inline stats */}
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-2">
                    <FolderGit2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground font-mono">
                      <span className="text-foreground font-semibold">{counts.github}</span> repositories
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PenSquare className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground font-mono">
                      <span className="text-foreground font-semibold">{counts.codepen}</span> pens
                    </span>
                  </div>
                </div>
              </div>

              {/* Right — Filter toggle */}
              <div className="flex-shrink-0">
                <div className="flex flex-col gap-1 p-1 rounded-lg bg-secondary/40 border border-border">
                  {(["all", "github", "codepen"] as FilterType[]).map((f) => {
                    const isActive = filter === f
                    const Icon = f === "github" ? Github : f === "codepen" ? Code2 : FolderGit2
                    return (
                      <button
                        key={f}
                        onClick={() => handleFilterChange(f)}
                        className={`
                          flex items-center gap-2 px-3 py-2 rounded-md font-medium text-sm transition-all duration-200
                          ${isActive
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                          }
                        `}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {f === "all" ? "All Work" : f === "github" ? "GitHub" : "CodePen"}
                        <span className={`ml-auto font-mono text-xs ${isActive ? "opacity-70" : "opacity-50"}`}>
                          {counts[f]}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Projects Grid ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 150ms ease, transform 150ms ease",
          }}
        >
          {filteredProjects.map((project, i) => {
            const isGithub = project.source === "github"
            const langColorClass = "language" in project && project.language
              ? languageColors[project.language] ?? "bg-secondary/60 text-muted-foreground border-border"
              : "bg-secondary/60 text-muted-foreground border-border"

            return (
              <div
                key={project.id}
                className="group relative rounded-2xl bg-card border border-border overflow-hidden flex flex-col transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {/* Image */}
                <div className="relative overflow-hidden h-40 flex-shrink-0">
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:saturate-[1.1]"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = "/placeholder.svg"
                    }}
                  />
                  {/* gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

                  {/* Source badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-mono font-medium px-2.5 py-1 rounded-md border backdrop-blur-sm ${
                        isGithub
                          ? "bg-black/75 text-white border-black/40"
                          : "bg-blue-600/80 text-white border-blue-500/40"
                      }`}
                    >
                      {isGithub ? <Github className="h-3 w-3" /> : <Code2 className="h-3 w-3" />}
                      {isGithub ? "GitHub" : "CodePen"}
                    </span>
                  </div>

                  {/* Language badge */}
                  {"language" in project && project.language && (
                    <div className="absolute top-3 right-3">
                      <span className={`inline-flex text-xs font-mono px-2 py-0.5 rounded-md border ${langColorClass}`}>
                        {project.language}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card body */}
                <div className="p-5 flex flex-col flex-1 gap-3">
                  <h3 className="text-base font-semibold group-hover:text-primary transition-colors duration-200 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-primary/8 text-primary border-primary/15 hover:bg-primary/15 text-[11px] font-mono"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Footer actions */}
                  <div className="flex items-center gap-2 pt-1 border-t border-border/50 mt-auto">
                    <a
                      href={isGithub ? project.github : project.codepen}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/70 hover:bg-secondary transition-colors text-xs font-medium"
                    >
                      <Github className="h-3.5 w-3.5" />
                      Source
                    </a>
                    {"live" in project && project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-colors text-xs font-medium"
                      >
                        <Globe className="h-3.5 w-3.5" />
                        Live
                      </a>
                    )}
                    {isGithub && !("live" in project && project.live) && (
                      <span className="text-xs text-muted-foreground/40 font-mono italic ml-auto pr-1">
                        no live demo
                      </span>
                    )}
                    {isGithub && "live" in project && project.live && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground/50 hover:text-primary transition-colors font-mono"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    {!isGithub && (
                      <a
                        href={project.codepen}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground/50 hover:text-primary transition-colors font-mono"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="p-4 rounded-full bg-secondary/40 mb-4">
              <FolderGit2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-mono text-sm">No projects found for this filter.</p>
          </div>
        )}
      </div>
    </section>
  )
}
