import { toGoogleConsent, type ConsentPreferences } from "@/lib/consent"

export const GTM_CONTAINER_ID = "GTM-PMCQ6NCG"

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    __gtmInitialized?: boolean
  }
}

export function ensureDataLayer(): unknown[] {
  if (typeof window === "undefined") return []
  window.dataLayer = window.dataLayer || []
  return window.dataLayer
}

export function ensureGtagStub(): void {
  if (typeof window === "undefined") return
  ensureDataLayer()
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

export function pushGtmInit(): void {
  ensureDataLayer().push({
    "gtm.start": Date.now(),
    event: "gtm.js",
  })
}

export function isGtmInitialized(): boolean {
  return typeof window !== "undefined" && window.__gtmInitialized === true
}

export function trackEvent(
  name: string,
  params: Record<string, string | number | boolean> = {},
): boolean {
  if (typeof window === "undefined") return false
  if (window.__gtmInitialized !== true) return false
  ensureDataLayer().push({ event: name, ...params })
  return true
}

export function projectSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function trackProjectClick(params: {
  project_name: string
  project_category: string
}): boolean {
  return trackEvent("project_click", {
    project_name: params.project_name,
    project_slug: projectSlug(params.project_name),
    project_category: params.project_category,
  })
}

export function pushPageView(pathname: string, title?: string): void {
  ensureDataLayer().push({
    event: "page_view",
    page_path: pathname,
    ...(title ? { page_title: title } : {}),
  })
}

export function cleanReload(): void {
  if (typeof window === "undefined") return
  window.location.reload()
}
