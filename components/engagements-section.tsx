import { Building2, Shield } from "lucide-react"

const stats = [
  { value: "100+", label: "Enterprise Clients" },
  { value: "3", label: "Global Companies" },
  { value: "5+", label: "Years Experience" },
]

const engagements = [
  {
    icon: Building2,
    company: "Accenture",
    headline: "Trusted analytics partner for 100+ enterprise brands.",
    outcome:
      "Resolved complex production tracking failures and built custom data layer solutions — restoring data accuracy and saving clients from costly misattribution.",
    tags: ["GTM", "Adobe", "Tealium", "JavaScript"],
    image: "/consulting-accenture.png",
  },
  {
    icon: Shield,
    company: "Samsung SDS",
    headline: "GDPR compliance delivered across European markets.",
    outcome:
      "Led end-to-end privacy architecture for a large-scale compliance initiative — translating legal requirements into technical specs without disrupting analytics continuity.",
    tags: ["GDPR", "Consent Management", "Tag Governance"],
    image: "/consulting-samsung.png",
  },
]

export function EngagementsSection() {
  return (
    <section id="engagements" className="py-24 relative">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-mono text-primary uppercase tracking-widest mb-3">Proven track record</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Consulting Experience</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            Real results for real enterprises — not theory, but shipped solutions at scale.
          </p>
        </div>

        {/* Stats bar */}
        <div className="flex justify-center gap-6 flex-wrap mb-14">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 px-8 py-5 rounded-2xl bg-card border border-border min-w-[130px] text-center"
            >
              <span className="text-3xl font-bold text-primary">{value}</span>
              <span className="text-xs text-muted-foreground font-mono">{label}</span>
            </div>
          ))}
        </div>

        {/* Engagement cards */}
        <div className="grid gap-5 max-w-4xl mx-auto md:grid-cols-2">
          {engagements.map(({ icon: Icon, company, headline, outcome, tags, image }) => (
            <div
              key={company}
              className="group rounded-2xl bg-card border border-border overflow-hidden flex flex-col transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
            >
              {/* Image banner */}
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                <img
                  src={image}
                  alt={`${company} consulting`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
              </div>

              {/* Card body */}
              <div className="flex flex-col gap-4 p-7 pt-4 flex-1">
                {/* Company row */}
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/10 flex-shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-mono text-sm font-semibold text-primary">{company}</span>
                </div>

                {/* Copy */}
                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="text-base font-semibold leading-snug group-hover:text-primary transition-colors duration-200">
                    {headline}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{outcome}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/50">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-primary/8 text-primary/80 border border-primary/12"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}