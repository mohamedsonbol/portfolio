"use client"

import { Tag, Shield, Code2, Rocket, Globe } from "lucide-react"

const specialties = [
  {
    icon: Tag,
    title: "Tag Management",
    tagline: "Zero data loss. Total control.",
    description:
      "End-to-end implementation, migration, and governance across client-side and server-side tag management environments.",
    chips: ["Client-side", "Server-Side"],
    image: "/specialty-tag-management.png",
  },
  {
    icon: Shield,
    title: "Privacy & Compliance",
    tagline: "GDPR-ready from day one.",
    description:
      "Consent architecture, data layer design, and regulatory implementation so your analytics stays compliant without sacrificing insight.",
    chips: ["GDPR", "Consent Management", "Data Layer"],
    image: "/specialty-privacy-compliance.png",
  },
  {
    icon: Code2,
    title: "TypeScript & Tracking",
    tagline: "Fix what others can't find.",
    description:
      "Deep-dive production tracking audits, custom TypeScript solutions, and data integrity fixes that turn broken implementations into reliable pipelines.",
    chips: ["TypeScript", "Data Layer", "Tracking Audits", "Root Cause"],
    image: "/specialty-typescript-tracking.png",
  },
  {
    icon: Rocket,
    title: "Growth & Automation",
    tagline: "Analytics that scales with you.",
    description:
      "AI-assisted workflows and automation tooling that reduce manual overhead and accelerate your analytics operations.",
    chips: ["AI Workflows", "Automation"],
    image: "/specialty-automation.png",
  },
  {
    icon: Globe,
    title: "Full Stack Development",
    tagline: "From idea to production.",
    description:
      "Modern full-stack applications built with React, Next.js, MongoDB, and REST APIs — from architecture to deployment.",
    chips: ["React", "Next.js", "MongoDB", "APIs"],
    image: "/specialty-fullstack.png",
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-mono text-primary uppercase tracking-widest mb-3">What I bring</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Specialties</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            Precision analytics consulting — from implementation to audit — built for enterprise teams that can't afford blind spots.
          </p>
        </div>

        {/* Cards — 5 columns on xl, 3 on lg, 2 on sm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 max-w-7xl mx-auto">
          {specialties.map(({ icon: Icon, title, tagline, description, chips, image }) => (
            <div
              key={title}
              className="group relative flex flex-col rounded-2xl bg-card border border-border overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
            >
              {/* Image banner */}
              <div className="relative h-40 overflow-hidden flex-shrink-0">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
              </div>

              {/* Card body */}
              <div className="flex flex-col gap-4 flex-1 p-5 pt-3">
                {/* Icon */}
                <div className="p-2.5 rounded-xl bg-primary/10 w-fit">
                  <Icon className="h-5 w-5 text-primary" />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-1.5 flex-1">
                  <h3 className="font-semibold text-base group-hover:text-primary transition-colors duration-200">
                    {title}
                  </h3>
                  <p className="text-xs font-mono text-primary/70">{tagline}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1">{description}</p>
                </div>

                {/* Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/50">
                  {chips.map((chip) => (
                    <span
                      key={chip}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-primary/8 text-primary/80 border border-primary/12"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
