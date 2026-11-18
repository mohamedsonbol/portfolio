import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import Script from "next/script"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ConsentProvider } from "@/components/consent-provider"
import { GtmAnalytics } from "@/components/gtm-analytics"
import { CookieBanner } from "@/components/cookie-banner"
import { portfolioConfig } from "@/lib/portfolio-config"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const _jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" })

export const metadata: Metadata = {
  metadataBase: new URL(portfolioConfig.websiteUrl),
  title: "Mohamed Sonbol | Digital Solutions & Technology Consultant",
  description:
    "Explore Mohamed Sonbol's work across web development, e-commerce, digital analytics, integrations and AI-assisted automation.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Mohamed Sonbol | Digital Solutions & Technology Consultant",
    description:
      "Explore Mohamed Sonbol's work across web development, e-commerce, digital analytics, integrations and AI-assisted automation.",
    url: "/",
    siteName: portfolioConfig.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: portfolioConfig.socialImage,
        width: 1254,
        height: 1254,
        alt: "Portrait of Mohamed Sonbol",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed Sonbol | Digital Solutions & Technology Consultant",
    description:
      "Explore Mohamed Sonbol's work across web development, e-commerce, digital analytics, integrations and AI-assisted automation.",
    images: [portfolioConfig.socialImage],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "63x41" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${_inter.variable} ${_jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied',
              'wait_for_update': 500
            });
            gtag('set', 'ads_data_redaction', true);
          `}
        </Script>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  name: "Mohamed Sonbol",
                  url: portfolioConfig.websiteUrl,
                  jobTitle: "Digital Solutions & Technology Consultant",
                  description:
                    "Digital solutions and technology consultant specialising in web development, e-commerce, digital analytics, integrations and AI-assisted automation.",
                  sameAs: [portfolioConfig.linkedin, portfolioConfig.social.github],
                },
                {
                  "@type": "WebSite",
                  name: "Mohamed Sonbol Portfolio",
                  url: portfolioConfig.websiteUrl,
                  description:
                    "Digital solutions and technology consultant specialising in web development, e-commerce, digital analytics, integrations and AI-assisted automation.",
                },
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to main content
        </a>
        <ConsentProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </ThemeProvider>
          <GtmAnalytics />
          <CookieBanner />
        </ConsentProvider>
      </body>
    </html>
  )
}
