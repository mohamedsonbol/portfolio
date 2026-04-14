import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProjectsGrid } from "./projects-grid"

export const metadata: Metadata = {
  title: "Projects | Mohamed Sonbol",
  description: "A collection of projects spanning GitHub repositories and CodePen experiments by Mohamed Sonbol.",
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <ProjectsGrid />
      <Footer />
    </main>
  )
}
