import { Braces, Bug, ChartNoAxesCombined, Cog, PlugZap } from "lucide-react"

const expertise = [
  {
    icon: Bug,
    title: "Technical Support & Troubleshooting",
    description: "Structured investigation of production issues, defect reproduction, root-cause analysis, and clear customer-facing resolution paths.",
  },
  {
    icon: Braces,
    title: "JavaScript & Browser Debugging",
    description: "Browser-based debugging across JavaScript behavior, network requests, console errors, data layers, and implementation gaps.",
  },
  {
    icon: PlugZap,
    title: "API Testing & Integrations",
    description: "Validating requests, responses, payloads, and the handoffs between web applications, APIs, and third-party services.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Analytics & Data Collection",
    description: "Google and Adobe data collection support, implementation reviews, quality assurance, and reliable tracking behavior.",
  },
  {
    icon: Cog,
    title: "Tools & Automation",
    description: "Practical use of testing, issue-tracking, collaboration, and development tools to make support work repeatable.",
  },
]

export function SkillsSection() {
  return (
    <section id="expertise" className="border-y border-border/70 bg-secondary/25 py-24">
      <div className="container mx-auto px-6">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow">Technical expertise</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Where support meets implementation.</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
            A hands-on toolkit for diagnosing issues, communicating clearly, and getting complex integrations back on track.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {expertise.map(({ icon: Icon, title, description }, index) => (
            <article key={title} className={`rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 ${index === 0 ? "lg:col-span-2" : ""}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
              </div>
              <h3 className="mt-8 text-lg font-semibold tracking-tight">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
