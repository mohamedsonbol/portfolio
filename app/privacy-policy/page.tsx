import type { Metadata } from "next"
import { portfolioConfig } from "@/lib/portfolio-config"

export const metadata: Metadata = {
  title: `Privacy Policy | ${portfolioConfig.name}`,
  description: "How this website handles personal data, analytics and consent.",
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
      `You can also reach the site owner directly at ${portfolioConfig.email}.`,
    ],
  },
  {
    heading: "3. Google Analytics (consent required)",
    body: [
      "When you give analytics consent, the site loads Google Tag Manager (container GTM-PMCQ6NCG) and Google Analytics 4 (Google Ireland Limited), measurement ID G-4898X9MEDR, from Google's servers (googletagmanager.com). Google receives information about your visit, such as pages viewed, events you trigger (for example downloading the resume or using the contact form), and general device and browser information. Page views are recorded once per page and once per in-site navigation.",
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
      `Questions about this policy can be sent to ${portfolioConfig.email}.`,
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="py-24">
      <div className="container mx-auto max-w-3xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary mb-3">Legal</p>
        <h1 className="text-4xl font-semibold tracking-tight mb-10">Privacy Policy</h1>
        <div className="flex flex-col gap-8">
          {sections.map((section) => (
            <section key={section.heading} className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold tracking-tight">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="text-sm text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
