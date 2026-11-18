import Link from "next/link"
import { ArrowUpRight, Braces, ChartNoAxesCombined, Cog, PlugZap } from "lucide-react"

const services = [
  {
    icon: Braces,
    title: "Websites & e-commerce",
    description:
      "Bilingual storefronts and marketing sites built with WordPress, WooCommerce and modern frontend tooling, connected to the systems behind them.",
    items: ["WordPress / WooCommerce", "Payment gateways", "API-connected frontends", "Responsive delivery"],
  },
  {
    icon: ChartNoAxesCombined,
    title: "Analytics & data collection",
    description:
      "Implementation reviews, tagging QA and hands-on debugging across Google, Adobe and third-party analytics platforms.",
    items: ["Google tagging", "Adobe data collection", "Contentsquare", "Awin"],
  },
  {
    icon: PlugZap,
    title: "Integrations & technical support",
    description:
      "Structured investigation of production issues, API validation and the vendor handoffs that keep digital products working.",
    items: ["JavaScript debugging", "API validation", "Postman", "Jira / Salesforce / Zendesk"],
  },
  {
    icon: Cog,
    title: "Automation & internal tools",
    description:
      "Practical scripts, browser tooling and AI-assisted workflows that reduce repetitive work and make technical tasks easier to repeat.",
    items: ["Google Apps Script", "Python", "Browser extensions", "AI-assisted development"],
  },
]

export function SkillsSection() {
  return (
    <section id="expertise" className="border-y border-border/70 bg-secondary/20 py-24 md:py-32">
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div className="self-start lg:sticky lg:top-28">
            <p className="eyebrow">Services</p>
            <h2 className="mt-4 text-heading">From first build to production debugging.</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground md:text-base">
              I work across the visible product and the integrations underneath it —
              building the interface, validating the data, and resolving the issues
              that surface after launch.
            </p>
            <Link
              href="#contact"
              className="mt-7 inline-flex items-center gap-2 border-b border-primary/40 pb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-primary transition-colors hover:border-primary"
            >
              Discuss a project
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="border-y border-border">
            {services.map(({ icon: Icon, title, description, items }, index) => (
              <article
                key={title}
                className="group grid gap-5 border-b border-border py-8 last:border-b-0 sm:grid-cols-[56px_1fr] sm:gap-7"
              >
                <div className="flex items-center gap-3 sm:block">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-0 flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-primary transition-colors duration-300 group-hover:border-primary/40 sm:mt-4">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.02em]">{title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                    {description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                    {items.map((item) => (
                      <li
                        key={item}
                        className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground"
                      >
                        <span className="h-1 w-1 rounded-full bg-primary/60" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
