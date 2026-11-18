const capabilities = [
  {
    title: "Web development",
    description: "Frontend builds connected to APIs, CMS workflows and the interfaces around them.",
  },
  {
    title: "E-commerce",
    description: "Bilingual WordPress and WooCommerce storefronts, payment gateways and customer-journey QA.",
  },
  {
    title: "Analytics & tracking",
    description: "Google and Adobe data collection, tagging QA and consent-aware implementation.",
  },
  {
    title: "Business systems",
    description: "Ticketing, CRM and workflow tooling, with API validation across vendor handoffs.",
  },
  {
    title: "AI-assisted automation",
    description: "Practical automation and AI-assisted development for digital products and internal workflows.",
  },
]

export function HighlightsSection() {
  return (
    <section
      id="highlights"
      aria-labelledby="capabilities-title"
      className="border-y border-border/70 bg-card/30 py-14 md:py-16"
    >
      <div className="site-container">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">Capabilities</p>
            <h2 id="capabilities-title" className="mt-3 text-subheading">
              Web, commerce, data and the systems that connect them.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-muted-foreground">
            A practical mix of frontend delivery, integrations and analytics support.
          </p>
        </div>

        <div className="mt-10 grid gap-8 border-t border-border/70 pt-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0 lg:divide-x lg:divide-border/70">
          {capabilities.map((capability, index) => (
            <div key={capability.title} className="lg:px-6 lg:first:pl-0 lg:last:pr-0">
              <p className="font-mono text-[10px] font-semibold tracking-[0.16em] text-primary">
                0{index + 1}
              </p>
              <h3 className="mt-3 text-sm font-semibold tracking-tight">{capability.title}</h3>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                {capability.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
