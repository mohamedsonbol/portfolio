"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"

import { useConsent } from "@/components/consent-provider"
import {
  GTM_CONTAINER_ID,
  ensureGtagStub,
  isGtmInitialized,
  pushGoogleConsentUpdate,
  pushGtmInit,
  pushPageView,
} from "@/lib/analytics"

export function GtmAnalytics() {
  const { consent } = useConsent()
  const pathname = usePathname()
  const lastPathRef = useRef<string | null>(null)

  useEffect(() => {
    if (!consent?.analytics || isGtmInitialized()) return
    ensureGtagStub()
    pushGoogleConsentUpdate(consent)
    pushGtmInit()
    window.__gtmInitialized = true
    const script = document.createElement("script")
    script.id = "gtm-analytics"
    script.async = true
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`
    document.head.appendChild(script)
  }, [consent])

  useEffect(() => {
    if (!consent?.analytics) return
    if (lastPathRef.current === pathname) return
    lastPathRef.current = pathname
    pushPageView(pathname, document.title)
  }, [consent?.analytics, pathname])

  return null
}
