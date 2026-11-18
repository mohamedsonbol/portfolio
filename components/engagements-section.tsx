import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { resumeExperience } from "@/lib/portfolio-data"

const focusOverrides: Record<string, string> = {
  "Samsung SDS":
    "QA and technical sign-off for first-party tagging across multilingual EU product launches, with debugging, validation and vendor coordination.",
}

const bulletStart: Record<string, number> = {
  "Accenture": 1,
}

function focusFor(company: string, description: string) {
  return focusOverrides[company] ?? description
}

function highlightsFor(company: string, bullets: readonly string[]) {
  const visible = bullets.filter((bullet) => !/\b500\+/.test(bullet))
  const start = bulletStart[company] ?? 0
  return visible.slice(start, start + 2)
}

export function EngagementsSection() {
  return (
    <section id="experience" className="border-t border-border/70 py-24 md:py-32">
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div className="self-start lg:sticky lg:top-28">
            <p className="eyebrow">Experience</p>
            <h2 className="mt-4 text-heading">Building, supporting and shipping digital work.</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground md:text-base">
              A cross-functional background spanning freelance delivery, enterprise
              analytics and technical support — with hands-on work across frontend,
              integrations and the data behind them.
            </p>
            <Link
              href="/resume"
              className="mt-7 inline-flex items-center gap-2 border-b border-primary/40 pb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-primary transition-colors hover:border-primary"
            >
              View full resume
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div>
            {resumeExperience.map(({ company, role, dates, description, bullets }, index) => {
              const highlights = highlightsFor(company, bullets)
              const isCurrent = dates.includes("Present")

              return (
                <article
                  key={company}
                  className="group grid gap-5 border-t border-border py-9 last:border-b-0 sm:grid-cols-[150px_1fr] sm:gap-8"
                >
                  <div>
                    <div className="flex items-center gap-3 sm:block">
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground sm:mt-3">
                        {dates}
                      </p>
                    </div>
                    {isCurrent && (
                      <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/8 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-primary">
                        <span className="h-1 w-1 rounded-full bg-primary" aria-hidden="true" />
                        Current
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-xl font-semibold tracking-[-0.025em]">{company}</h3>
                      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-primary">
                        {role}
                      </p>
                    </div>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                      {focusFor(company, description)}
                    </p>

                    {highlights.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex max-w-2xl gap-3 text-xs leading-5 text-muted-foreground"
                          >
                            <span
                              className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-primary/60"
                              aria-hidden="true"
                            />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
