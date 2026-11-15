import { ArrowUpRight, BriefcaseBusiness } from "lucide-react"
import { resumeExperience } from "@/lib/portfolio-data"

const experience = resumeExperience.slice(0, 3)

export function EngagementsSection() {
  return (
    <section id="experience" className="py-24">
      <div className="container mx-auto px-6">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Experience</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Reliable support across the stack.</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">A concise view of the environments where I have supported teams, customers, and digital implementations.</p>
        </div>
        <div className="mx-auto max-w-4xl">
          {experience.map(({ company, role, dates, description }, index) => (
            <article key={company} className="group grid gap-4 border-t border-border py-7 md:grid-cols-[160px_1fr_28px] md:gap-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground md:block">
                <span className="font-mono text-xs text-primary">0{index + 1}</span>
                <span className="md:mt-3 md:block">{dates}</span>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <BriefcaseBusiness className="h-4 w-4 text-primary" />
                  <h3 className="text-lg font-semibold tracking-tight">{company}</h3>
                </div>
                <p className="mt-1 text-sm font-medium text-primary">{role}</p>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>
              </div>
              <ArrowUpRight className="hidden h-5 w-5 text-primary opacity-0 transition-opacity group-hover:opacity-100 md:block" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
