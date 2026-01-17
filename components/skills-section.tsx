"use client"

import { useState } from "react"
import { Code2, Server, Wrench, Database, Cloud, Palette } from "lucide-react"

const skillCategories = [
  {
    id: "frontend",
    title: "Frontend",
    icon: Code2,
    color: "primary",
    skills: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Next.js", level: 88 },
      { name: "Tailwind CSS", level: 92 },
      { name: "JavaScript", level: 95 },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: Server,
    color: "accent",
    skills: [
      { name: "Node.js", level: 92 },
      { name: "Python", level: 85 },
      { name: "Express", level: 88 },
      { name: "FastAPI", level: 80 },
      { name: "GraphQL", level: 78 },
    ],
  },
  {
    id: "database",
    title: "Database",
    icon: Database,
    color: "chart-3",
    skills: [
      { name: "PostgreSQL", level: 88 },
      { name: "MongoDB", level: 90 },
      { name: "MySQL", level: 85 },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: Cloud,
    color: "chart-4",
    skills: [
      { name: "AWS", level: 82 },
      { name: "Docker", level: 85 },
      { name: "CI/CD", level: 80 },
      { name: "Vercel", level: 90 },
      { name: "Render", level: 88 },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    icon: Wrench,
    color: "chart-5",
    skills: [
      { name: "Git", level: 95 },
      { name: "VS Code", level: 92 },
      { name: "Postman", level: 88 },
      { name: "Linux", level: 80 },
    ],
  },
  {
    id: "design",
    title: "Design",
    icon: Palette,
    color: "chart-2",
    skills: [
      { name: "UI/UX", level: 78 },
      { name: "Figma", level: 80 },
      { name: "Responsive", level: 92 },
      { name: "CSS/SCSS", level: 90 },
    ],
  },
]

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("frontend")

  const activeSkills = skillCategories.find((cat) => cat.id === activeCategory)

  return (
    <section id="skills" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary font-mono text-sm mb-2">// Technical Expertise</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills Matrix</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills across different domains of software development.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {skillCategories.map((category) => {
            const Icon = category.icon
            const isActive = activeCategory === category.id
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`p-4 rounded-xl border transition-all duration-300 text-left ${
                  isActive
                    ? "bg-primary/10 border-primary shadow-lg shadow-primary/10"
                    : "bg-card border-border hover:border-primary/50"
                }`}
              >
                <Icon className={`h-6 w-6 mb-2 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                <p className={`font-medium text-sm ${isActive ? "text-primary" : "text-foreground"}`}>
                  {category.title}
                </p>
              </button>
            )
          })}
        </div>

        {/* Skills Display */}
        <div className="bg-card rounded-2xl border border-border p-8">
          <div className="flex items-center gap-3 mb-8">
            {activeSkills && (
              <>
                <activeSkills.icon className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">{activeSkills.title}</h3>
              </>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {activeSkills?.skills.map((skill, index) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm">{skill.name}</span>
                  <span className="text-muted-foreground text-sm">{skill.level}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${skill.level}%`,
                      animationDelay: `${index * 100}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Skills tags overview */}
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-muted-foreground text-sm mb-4">All Technologies:</p>
            <div className="flex flex-wrap gap-2">
              {skillCategories.flatMap((cat) =>
                cat.skills.map((skill) => (
                  <span
                    key={`${cat.id}-${skill.name}`}
                    className="px-3 py-1 rounded-full bg-secondary text-xs font-mono text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors cursor-default"
                  >
                    {skill.name}
                  </span>
                )),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
