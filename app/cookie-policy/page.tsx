import type { Metadata } from "next"
import { portfolioConfig } from "@/lib/portfolio-config"

export const metadata: Metadata = {
  title: `Cookie Policy | ${portfolioConfig.name}`,
  description: "Which cookies and browser storage this website uses and how consent works.",
  alternates: { canonical: "/cookie-policy" },
}

const cookieRows = [
  {
    name: "_ga, _ga_G-4898X9MEDR",
    provider: "Google Analytics",
    purpose:
      "Distinguishes visitors and preserves analytics session state. Only set after you consent to analytics cookies.",
    category: "Analytics (optional)",
  },
  {
    name: "mgmt_consent_v1",
    provider: "This website",
    purpose:
      "Stores your cookie consent choices so they are restored on your next visit. Stored in browser localStorage, not as a cookie.",
    category: "Necessary (functionality)",
  },
]

export default function CookiePolicyPage() {
  return (
    <div className="py-24">
      <div className="container mx-auto max-w-3xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary mb-3">Legal</p>
        <h1 className="text-4xl font-semibold tracking-tight mb-10">Cookie Policy</h1>

        <div className="flex flex-col gap-8">
          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold tracking-tight">1. Consent</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              On your first visit a cookie banner lets you accept all cookies, reject all optional
              cookies, or customise your preferences. Necessary functionality is always enabled;
              analytics and marketing categories are optional and denied by default. Your choice is
              remembered and can be changed at any time via “Cookie Settings” in the footer.
              Withdrawing analytics consent stops further analytics collection and removes the
              analytics cookies from your browser.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold tracking-tight">2. Cookies and storage used</h2>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/40 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Provider</th>
                    <th className="px-4 py-3 font-medium">Purpose</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {cookieRows.map((row) => (
                    <tr key={row.name} className="border-b border-border/50 last:border-0">
                      <td className="px-4 py-3 font-mono text-xs text-foreground">{row.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.provider}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.purpose}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Cookie lifetimes for Google Analytics cookies are configured by Google Analytics and
              described in Google&apos;s documentation:
              https://policies.google.com/technologies/cookies
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold tracking-tight">3. Marketing cookies</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A marketing preference category is available in the consent banner for future use.
              No marketing or advertising tags are currently active on this site, so no marketing
              cookies are set.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold tracking-tight">4. No tracking before consent</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              No Google Analytics script is requested and no analytics events are sent before you
              grant analytics consent. Rejecting cookies prevents analytics from being initialised
              entirely.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold tracking-tight">5. Contact</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Questions about cookies on this site can be sent to {portfolioConfig.email}.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
