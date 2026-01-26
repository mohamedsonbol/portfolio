"use client"

import { useState } from "react"
import { ExternalLink, Github, ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    id: 1,
    title: "MoPortfolio",
    description:
      "A personal portfolio website showcasing my projects, skills, and experience. Built with modern web technologies and deployed on Render.",
    image: "/developer-portfolio-website-dark-theme-modern.jpg",
    tags: ["React", "Node.js", "Express", "CSS"],
    github: "https://github.com/mohamedsonbol",
    live: "https://moportfolio-4ezb.onrender.com",
    featured: true,
  },
  {
    id: 2,
    title: "Blog Application",
    description:
      "A full-stack blog platform built from scratch with user authentication, responsive design, and CRUD operations for blog posts.",
    image: "/images/image.png",
    tags: ["Node.js", "EJS", "MongoDB", "Express"],
    github: "https://github.com/mohamedsonbol",
    live: "https://blogapp-f2xu.onrender.com/blogs",
    featured: true,
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-2xl bg-card border border-border overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden h-56">
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
