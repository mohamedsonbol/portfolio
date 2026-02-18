"use client"

import { useState } from "react"
import { Tag, Shield, Users, Rocket } from "lucide-react"

const consultingCategories = [
  {
    id: "core",
    title: "Core Consulting Specialties",
    icon: Tag,
    items: [
      "Tag Management Systems (Google, Adobe, Tealium) – client‑side & server‑side implementation, optimization, and governance",
      "GDPR & privacy compliance architecture – consent management, data layer design, and regulatory technical implementation",
      "Data layer strategy & custom JavaScript debugging – resolving complex tracking issues and ensuring data integrity",
      "Production issue resolution & root cause analysis – rapid diagnosis of analytics failures and restoration of reliable data",
      "Advertising analytics support – event creation, implementation audits, and technical recommendations for campaign tracking",
    ],
  },
  {
    id: "technical",
    title: "Technical Implementation",
    icon: Shield,
    items: [
      "Custom JavaScript (ES6+) for tracking solutions, debugging, and data layer fixes",
      "API integrations, webhooks, and distributed systems debugging",
      "Advertising technical consulting: event creation, implementation audits, and optimization recommendations",
      "Automation frameworks: Selenium, WebdriverIO, n8n for testing and workflow orchestration",
      "Cloud environments & server-side tagging infrastructure (GTM SS, Adobe Launch)",
    ]
  },
  {
    id: "client-facing",
    title: "Client-Facing Capabilities",
    icon: Users,
    items: [
      "Technical Requirements Gathering & Documentation",
      "Cross-functional Team Coordination (Engineering, Marketing, Legal)",
      "Stakeholder Communication & Translation of Complex Concepts",
      "Project Management: Jira, Salesforce, Looker, Apps Script",
    ],
  },
  {
    id: "expansion",
    title: "Current Expansion Areas",
    icon: Rocket,
    items: [
      "AI‑driven automation & workflow orchestration (n8n, custom scripts)",
      "Modern web development for analytics tooling (React, Node.js, APIs)",
      "Blockchain fundamentals & smart contract development",
      "LLM operations & MCP server development",
      "Vibe coding: AI‑assisted development & rapid prototyping",
    ],
  },
]

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("core")
  const activeGroup = consultingCategories.find((cat) => cat.id === activeCategory)

  return (
    <section id="skills" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Enterprise Technical Consulting</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my consulting capabilities across analytics, compliance, and enterprise data infrastructure.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {consultingCategories.map((category) => {
            const Icon = category.icon
            const isActive = activeCategory === category.id
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`p-4 rounded-xl border transition-all duration-300 text-left ${isActive
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
          {activeGroup && (
            <>
              <div className="flex items-center gap-3 mb-8">
                <activeGroup.icon className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-semibold">{activeGroup.title}</h3>
              </div>

              <ul className="space-y-4">
                {activeGroup.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
