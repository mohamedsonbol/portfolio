import { Building2, Shield, Cog } from "lucide-react"

const engagements = [
  {
    icon: Building2,
    title: "Enterprise Tag Management & Analytics Implementation",
    company: "Accenture",
    description:
      "Served as primary technical consultant for 100+ enterprise clients, debugging production implementations and developing custom JavaScript solutions for complex data layer challenges. Specialized in Google, Adobe, and Tealium tag management systems across client-side and server-side environments.",
  },
  {
    icon: Shield,
    title: "GDPR Compliance & Analytics Infrastructure",
    company: "Samsung SDS",
    description:
      "Led technical implementation for a large-scale privacy compliance initiative across multiple European markets. Coordinated tag management deployment and consent architecture, translating regulatory requirements into technical specifications while maintaining analytics functionality.",
  },
  {
    icon: Cog,
    title: "Automation Framework Engineering",
    company: "Sauce Labs",
    description:
      "Built automated monitoring logic that reduced manual testing cycles by 40% and achieved 99.9% reliability for enterprise testing workflows. Consulted on API integration strategies and cross-platform test automation.",
  },
]

export function EngagementsSection() {
  return (
    <section id="engagements" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Selected Consulting Engagements</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Key engagements where I delivered measurable impact for enterprise clients across analytics, compliance, and automation.
          </p>
        </div>

        <div className="grid gap-6 max-w-4xl mx-auto">
          {engagements.map((engagement) => {
            const Icon = engagement.icon
            return (
              <div
                key={engagement.title}
                className="group rounded-2xl bg-card border border-border p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex items-start gap-5">
                  <div className="p-3 rounded-xl bg-primary/10 flex-shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {engagement.title}
                      </h3>
                      <p className="text-sm text-primary font-mono">{engagement.company}</p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{engagement.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
