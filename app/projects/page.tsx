import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProjectsGrid } from "./projects-grid"
import { portfolioConfig } from "@/lib/portfolio-config"

export const metadata: Metadata = {
  title: `Projects | ${portfolioConfig.name} | Digital Solutions & Technology Consultant`,
  description: `Selected client work and technical experiments by ${portfolioConfig.name}, spanning web development, e-commerce, digital analytics and AI-assisted automation.`,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: `Projects | ${portfolioConfig.name} | Digital Solutions & Technology Consultant`,
    description: `Selected client work and technical experiments by ${portfolioConfig.name}, spanning web development, e-commerce, digital analytics and AI-assisted automation.`,
    url: "/projects",
    siteName: portfolioConfig.name,
    type: "website",
    images: [{ url: portfolioConfig.socialImage, width: 1254, height: 1254, alt: "Portrait of Mohamed Sonbol" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Projects | ${portfolioConfig.name} | Digital Solutions & Technology Consultant`,
    description: `Selected client work and technical experiments by ${portfolioConfig.name}, spanning web development, e-commerce, digital analytics and AI-assisted automation.`,
    images: [portfolioConfig.socialImage],
  },
}

export default function ProjectsPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <ProjectsGrid />
      <Footer />
    </main>
  )
}
