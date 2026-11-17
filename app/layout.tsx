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
  title: `${portfolioConfig.name} | ${portfolioConfig.professionalTitle}`,
  description: portfolioConfig.professionalSummary,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${portfolioConfig.name} | ${portfolioConfig.professionalTitle}`,
    description: portfolioConfig.professionalSummary,
    url: "/",
    siteName: portfolioConfig.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: portfolioConfig.socialImage,
        width: 599,
        height: 1024,
        alt: `${portfolioConfig.name} portrait`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolioConfig.name} | ${portfolioConfig.professionalTitle}`,
    description: portfolioConfig.professionalSummary,
    images: [portfolioConfig.socialImage],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
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
    <html lang="en" suppressHydrationWarning>
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
      </head>
      <body className={`${_inter.variable} ${_jetbrainsMono.variable} font-sans antialiased`}>
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
