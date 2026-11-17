"use client"

import Script from "next/script"
import { useEffect } from "react"

import { useConsent } from "@/components/consent-provider"
import {
  GA_MEASUREMENT_ID,
  ensureGtagStub,
  pushGoogleConsentUpdate,
} from "@/lib/analytics"

export function GoogleAnalytics() {
  const { consent } = useConsent()

  useEffect(() => {
    if (!consent?.analytics) return
    if (window.__gaInitialized === true) return
    ensureGtagStub()
    window.__gaInitialized = true
    pushGoogleConsentUpdate(consent)
    window.gtag!("js", new Date())
    window.gtag!("config", GA_MEASUREMENT_ID)
  }, [consent])

  if (!consent?.analytics) return null

  return (
    <Script
      id="google-analytics"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      strategy="afterInteractive"
    />
  )
}
