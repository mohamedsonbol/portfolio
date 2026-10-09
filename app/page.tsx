import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { SkillsSection } from "@/components/skills-section"
import { EngagementsSection } from "@/components/engagements-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <section id="work"><ProjectsSection /></section>
      <SkillsSection />
      <section id="about"><EngagementsSection /></section>
      <ContactSection />
      <Footer />
    </main>
  )
}
