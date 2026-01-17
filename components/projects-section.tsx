"use client"

import { useState } from "react"
import { ExternalLink, Github, ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    id: 1,
    title: "CloudSync Pro",
    description:
      "A real-time cloud collaboration platform with live editing, file sharing, and team management features.",
    image: "/cloud-collaboration-dashboard-dark-theme.jpg",
    tags: ["React", "Node.js", "WebSocket", "AWS"],
    github: "#",
    live: "#",
    featured: true,
  },
  {
    id: 2,
    title: "AI Content Studio",
    description: "Machine learning powered content generation tool for marketing teams.",
    image: "/ai-content-generation-interface-dark.jpg",
    tags: ["Python", "TensorFlow", "React", "FastAPI"],
    github: "#",
    live: "#",
    featured: true,
  },
  {
    id: 3,
    title: "DevMetrics",
    description: "Developer productivity analytics dashboard with GitHub integration.",
    image: "/developer-metrics-analytics-dashboard.jpg",
    tags: ["TypeScript", "Next.js", "GraphQL"],
    github: "#",
    live: "#",
  },
  {
    id: 4,
    title: "SecureVault",
    description: "End-to-end encrypted password manager with biometric authentication.",
    image: "/password-manager-security-app-dark.jpg",
    tags: ["React Native", "Node.js", "MongoDB"],
    github: "#",
    live: "#",
  },
  {
    id: 5,
    title: "EcoTracker",
    description: "Carbon footprint tracking app with personalized sustainability insights.",
    image: "/sustainability-eco-tracker-app-green.jpg",
    tags: ["Vue.js", "Python", "PostgreSQL"],
    github: "#",
    live: "#",
  },
  {
    id: 6,
    title: "TaskFlow",
    description: "Kanban-style project management with AI-powered task prioritization.",
    image: "/kanban-project-management-dark-theme.jpg",
    tags: ["React", "Redux", "Express", "Redis"],
    github: "#",
    live: "#",
  },
]

export function ProjectsSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
          <div>
            <p className="text-primary font-mono text-sm mb-2">// Featured Work</p>
            <h2 className="text-3xl md:text-4xl font-bold">Projects</h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            A collection of projects that showcase my skills in building modern, scalable applications.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative rounded-2xl bg-card border border-border overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 ${
                project.featured && index < 2 ? "md:col-span-1 lg:row-span-1" : ""
              } ${index === 0 ? "lg:col-span-2" : ""}`}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Project Image */}
              <div className={`relative overflow-hidden ${index === 0 ? "h-64" : "h-48"}`}>
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60" />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{project.title}</h3>
                  <div className="flex gap-2">
                    <a
                      href={project.github}
                      className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                    <a
                      href={project.live}
                      className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                {/* Description - shown on hover or always on mobile */}
                <p
                  className={`text-sm text-muted-foreground leading-relaxed transition-all duration-300 ${
                    hoveredId === project.id ? "opacity-100 max-h-20" : "opacity-70 max-h-12 line-clamp-2"
                  }`}
                >
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 text-xs font-mono"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Hover arrow indicator */}
              <div
                className={`absolute top-4 right-4 p-2 rounded-full bg-primary text-primary-foreground transition-all duration-300 ${
                  hoveredId === project.id ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
                }`}
              >
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
