import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProjectsGrid } from "./projects-grid"
import { portfolioConfig } from "@/lib/portfolio-config"

export const metadata: Metadata = {
  title: `Projects | ${portfolioConfig.name}`,
  description: `A collection of projects spanning GitHub repositories and CodePen experiments by ${portfolioConfig.name}.`,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `Projects | ${portfolioConfig.name}`,
    description: `A collection of projects spanning GitHub repositories and CodePen experiments by ${portfolioConfig.name}.`,
    url: "/projects",
    siteName: portfolioConfig.name,
    type: "website",
    images: [{ url: portfolioConfig.socialImage, width: 599, height: 1024, alt: `${portfolioConfig.name} portrait` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Projects | ${portfolioConfig.name}`,
    description: `A collection of projects spanning GitHub repositories and CodePen experiments by ${portfolioConfig.name}.`,
    images: [portfolioConfig.socialImage],
  },
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
