import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { SkillsSection } from "@/components/skills-section"
import { EngagementsSection } from "@/components/engagements-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { HighlightsSection } from "@/components/highlights-section"

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <HighlightsSection />
      <ProjectsSection />
      <SkillsSection />
      <EngagementsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
