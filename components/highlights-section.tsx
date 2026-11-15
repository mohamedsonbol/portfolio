import { BarChart3, Bug, Layers3, ShieldCheck } from "lucide-react"

const highlights = [
  { icon: ShieldCheck, value: "4+ years", label: "Enterprise technical support experience" },
  { icon: BarChart3, value: "500+ pages", label: "QA coverage at Samsung SDS" },
  { icon: Layers3, value: "Google + Adobe", label: "Data collection environments" },
  { icon: Bug, value: "JavaScript + APIs", label: "Debugging and validation" },
]

export function HighlightsSection() {
  return (
    <section id="highlights" className="border-y border-border/70 bg-card/40 py-16">
      <div className="container mx-auto px-6">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Professional highlights</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">Technical support with delivery context.</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            I work across customer issues, implementation details, and the systems between them.
          </p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map(({ icon: Icon, value, label }) => (
            <div key={label} className="bg-background p-5 transition-colors hover:bg-secondary/50">
              <Icon className="h-5 w-5 text-primary" />
              <p className="mt-5 text-lg font-semibold tracking-tight">{value}</p>
              <p className="mt-1 text-sm leading-5 text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
