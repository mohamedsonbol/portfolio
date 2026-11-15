import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
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

import Script from "next/script"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://sst.exceptionalgrp.com/gtag/js?id=G-4898X9MEDR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4898X9MEDR', {
              'server_container_url': 'https://sst.exceptionalgrp.com'
            });
          `}
        </Script>
      </head>
      <body className={`${_inter.variable} ${_jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
