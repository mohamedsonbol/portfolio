import { toGoogleConsent, type ConsentPreferences } from "@/lib/consent"

export const GA_MEASUREMENT_ID = "G-4898X9MEDR"

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    __gaInitialized?: boolean
  }
}

export function ensureGtagStub(): void {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  if (!window.gtag) {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer!.push(args)
    }
  }
}

export function pushGoogleConsentUpdate(prefs: ConsentPreferences): void {
  if (typeof window === "undefined") return
  ensureGtagStub()
  window.gtag!("consent", "update", toGoogleConsent(prefs))
}

export function trackEvent(
  name: string,
  params: Record<string, string | number | boolean> = {},
): boolean {
  if (typeof window === "undefined") return false
  if (window.__gaInitialized !== true) return false
  ensureGtagStub()
  window.gtag!("event", name, params)
  return true
}

export function trackOutboundClick(url: string, label?: string): boolean {
  return trackEvent("outbound_click", {
    link_url: url,
    ...(label ? { link_label: label } : {}),
  })
}

export function cleanReload(): void {
  if (typeof window === "undefined") return
  window.location.reload()
}
