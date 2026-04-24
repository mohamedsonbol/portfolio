"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProjectsGrid } from "./projects-grid"

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <ProjectsGrid />
      <Footer />
    </main>
  )
}
