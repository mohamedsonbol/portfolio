import type { Metadata } from "next"
import { LegalPageShell } from "@/components/legal-page-shell"
import { portfolioConfig } from "@/lib/portfolio-config"

export const metadata: Metadata = {
  title: `Privacy Policy | ${portfolioConfig.name} | Digital Solutions & Technology Consultant`,
  description: `How ${portfolioConfig.name}'s digital solutions website handles personal data, analytics and consent.`,
  alternates: { canonical: "/privacy-policy" },
}

const sections: { heading: string; body: string[] }[] = [
  {
    heading: "1. Overview",
    body: [
      "This policy describes how this personal website (the “site”) handles information when you visit it, submit the contact form, or interact with analytics features.",
      "The site does not run analytics, advertising, or tracking scripts before you have given consent. All optional analytics are loaded only after you accept them in the cookie banner.",
    ],
  },
  {
    heading: "2. Contact form",
    body: [
      "The contact form collects the name, email address, and message you provide, and sends them by email to the site owner so your enquiry can be answered. This data is used only to respond to your message.",
      "You can also reach the site owner through the LinkedIn profile linked in the site footer.",
    ],
  },
  {
    heading: "3. Google Analytics (consent required)",
    body: [
      "When you give analytics consent, the site loads Google Tag Manager (container GTM-PMCQ6NCG) and Google Analytics 4 (Google Ireland Limited), measurement ID G-4898X9MEDR, from Google's servers (googletagmanager.com). Google receives information about your visit, such as pages viewed, events you trigger (for example clicking a project card or using the contact form), and general device and browser information. Page views are recorded once per page and once per in-site navigation.",
      "When you have not given analytics consent, no Google Analytics script is loaded and no analytics data is transmitted. Google consent signals (ad_storage, ad_user_data, ad_personalization, analytics_storage) are set to “denied” by default.",
    ],
  },
  {
    heading: "4. Vercel Analytics",
    body: [
      "The site previously integrated Vercel Web Analytics. This integration is currently disabled and is not initialised for visitors.",
    ],
  },
  {
    heading: "5. Your choices",
    body: [
      "You can accept, reject, or customise cookie categories in the cookie banner, and change your choice at any time via the “Cookie Settings” link in the footer. Withdrawing analytics consent stops further analytics collection and removes the Google Analytics cookies from your browser.",
    ],
  },
  {
    heading: "6. Data retention",
    body: [
      "Event-level data collected through Google Analytics is retained for 14 months, as configured in the Google Analytics account settings for this property. See also Google's own policies for how Google processes analytics data: https://policies.google.com/technologies/partner-sites",
    ],
  },
  {
    heading: "7. Contact",
    body: [
      "Questions about this policy can be sent using the contact form or through the LinkedIn profile linked in the site footer.",
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell title="Privacy Policy">
      <div className="flex flex-col gap-10">
        {sections.map((section) => (
          <section
            key={section.heading}
            className="border-t border-border/70 pt-8 first:border-t-0 first:pt-0"
          >
            <h2 className="text-subheading">{section.heading}</h2>
            <div className="mt-4 flex flex-col gap-4">
              {section.body.map((paragraph) => (
                <p key={paragraph} className="text-body text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </LegalPageShell>
  )
}
