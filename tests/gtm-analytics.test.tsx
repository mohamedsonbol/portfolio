// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { ConsentProvider, useConsent } from "@/components/consent-provider"
import { CookieBanner } from "@/components/cookie-banner"
import { GtmAnalytics } from "@/components/gtm-analytics"
import { CONSENT_VERSION, type StoredConsent } from "@/lib/consent"
import { refreshConsentSnapshot } from "@/lib/consent-store"
import { trackEvent } from "@/lib/analytics"

const navigationState = { pathname: "/" }

vi.mock("next/navigation", () => ({
  usePathname: () => navigationState.pathname,
}))

vi.mock("@/lib/analytics", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/analytics")>()
  return {
    ...actual,
    cleanReload: vi.fn(),
  }
})

const GTM_ID = "GTM-PMCQ6NCG"

function gtmScript(): HTMLScriptElement | null {
  return document.head.querySelector("script#gtm-analytics")
}

function dataLayerObjects(): Record<string, unknown>[] {
  return (window.dataLayer ?? []).filter(
    (entry): entry is Record<string, unknown> =>
      typeof entry === "object" && entry !== null && !Array.isArray(entry),
  )
}

function pageViewPushes(): Record<string, unknown>[] {
  return dataLayerObjects().filter((entry) => entry.event === "page_view")
}

function gtmStartPushes(): Record<string, unknown>[] {
  return dataLayerObjects().filter((entry) => entry.event === "gtm.js")
}

function consentUpdateEntries(): unknown[][] {
  return (window.dataLayer ?? []).filter(
    (entry): entry is unknown[] =>
      Array.isArray(entry) && entry[0] === "consent" && entry[1] === "update",
  )
}

function storedConsent(): StoredConsent | null {
  const raw = window.localStorage.getItem("mgmt_consent_v1")
  return raw ? (JSON.parse(raw) as StoredConsent) : null
}

function SettingsOpener() {
  const { openPreferences } = useConsent()
  return (
    <button type="button" data-testid="open-settings" onClick={openPreferences}>
      Open settings
    </button>
  )
}

function Harness() {
  return (
    <ConsentProvider>
      <GtmAnalytics />
      <CookieBanner />
      <SettingsOpener />
    </ConsentProvider>
  )
}

function freshRender() {
  cleanup()
  return render(<Harness />)
}

function navigate(pathname: string) {
  navigationState.pathname = pathname
  window.history.pushState({}, "", pathname)
}

beforeEach(async () => {
  window.localStorage.clear()
  refreshConsentSnapshot()
  window.dataLayer = []
  window.gtag = undefined
  window.__gtmInitialized = undefined
  document.head.innerHTML = ""
  document.cookie = ""
  navigationState.pathname = "/"
  vi.mocked(await import("@/lib/analytics")).cleanReload.mockClear()
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe("GTM consent gating", () => {
  it("does not load GTM or push events before consent", () => {
    freshRender()
    expect(gtmScript()).toBeNull()
    expect(window.__gtmInitialized).toBeUndefined()
    expect(gtmStartPushes().length).toBe(0)
    expect(pageViewPushes().length).toBe(0)
    expect(screen.getByTestId("cookie-banner")).toBeTruthy()
  })

  it("rejecting all prevents GTM initialization and persists the choice", () => {
    freshRender()
    fireEvent.click(screen.getByTestId("reject-all"))

    expect(gtmScript()).toBeNull()
    expect(window.__gtmInitialized).toBeUndefined()
    expect(gtmStartPushes().length).toBe(0)
    expect(storedConsent()).toEqual({
      necessary: true,
      analytics: false,
      marketing: false,
      version: CONSENT_VERSION,
      updatedAt: expect.any(String),
    })

    cleanup()
    freshRender()
    expect(gtmScript()).toBeNull()
    expect(screen.queryByTestId("cookie-banner")).toBeNull()
  })

  it("accepting all initializes GTM exactly once with restored consent", () => {
    freshRender()
    fireEvent.click(screen.getByTestId("accept-all"))

    expect(gtmScript()?.getAttribute("src")).toBe(
      `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`,
    )
    expect(window.__gtmInitialized).toBe(true)
    expect(gtmStartPushes().length).toBe(1)

    const updates = consentUpdateEntries()
    expect(updates.length).toBe(2)
    expect(updates[0][2]).toMatchObject({ analytics_storage: "granted" })
  })

  it("marketing-only consent does not initialize GTM", () => {
    freshRender()
    fireEvent.click(screen.getByTestId("open-settings"))
    fireEvent.click(screen.getByTestId("marketing-switch"))
    fireEvent.click(screen.getByTestId("save-preferences"))

    expect(gtmScript()).toBeNull()
    expect(window.__gtmInitialized).toBeUndefined()
    expect(gtmStartPushes().length).toBe(0)
    expect(storedConsent()).toMatchObject({ analytics: false, marketing: true })
  })
})

describe("Controlled page_view tracking", () => {
  it("pushes exactly one page_view on the initial homepage load", () => {
    freshRender()
    fireEvent.click(screen.getByTestId("accept-all"))

    const views = pageViewPushes()
    expect(views.length).toBe(1)
    expect(views[0]).toMatchObject({ event: "page_view", page_path: "/" })
  })

  it("pushes exactly one page_view per client-side navigation", () => {
    freshRender()
    fireEvent.click(screen.getByTestId("accept-all"))

    navigate("/projects")
    freshRender()
    navigate("/resume")
    freshRender()
    navigate("/")
    freshRender()

    const views = pageViewPushes()
    expect(views.map((v) => v.page_path)).toEqual(["/", "/projects", "/resume", "/"])
  })

  it("does not duplicate page_view on re-renders of the same pathname", () => {
    const { rerender } = render(<Harness />)
    fireEvent.click(screen.getByTestId("accept-all"))
    const before = pageViewPushes().length
    rerender(<Harness />)
    rerender(<Harness />)
    expect(pageViewPushes().length).toBe(before)
  })

  it("pushes no page_view and no gtm.js when consent is rejected, even after navigation", () => {
    freshRender()
    fireEvent.click(screen.getByTestId("reject-all"))

    navigate("/projects")
    freshRender()
    navigate("/resume")
    freshRender()

    expect(gtmStartPushes().length).toBe(0)
    expect(pageViewPushes().length).toBe(0)
    expect(gtmScript()).toBeNull()
  })

  it("restores persisted consent before GTM initialization on refresh", () => {
    window.localStorage.setItem(
      "mgmt_consent_v1",
      JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: false,
        version: CONSENT_VERSION,
        updatedAt: "2026-01-01T00:00:00.000Z",
      }),
    )
    refreshConsentSnapshot()
    freshRender()

    expect(screen.queryByTestId("cookie-banner")).toBeNull()
    expect(gtmScript()).toBeTruthy()
    expect(gtmStartPushes().length).toBe(1)
    expect(pageViewPushes().length).toBe(1)
    const updates = consentUpdateEntries()
    expect(updates.length).toBe(1)
    expect(updates[0][2]).toMatchObject({ analytics_storage: "granted" })
  })
})

describe("Consent withdrawal", () => {
  it("stops analytics, deletes cookies and performs a clean reload", async () => {
    document.cookie = "_ga=GA1.1.1234; path=/"
    document.cookie = "_ga_G4898X9MEDR=1; path=/"
    const { cleanReload } = await import("@/lib/analytics")

    freshRender()
    fireEvent.click(screen.getByTestId("accept-all"))
    fireEvent.click(screen.getByTestId("open-settings"))
    fireEvent.click(screen.getByTestId("analytics-switch"))
    fireEvent.click(screen.getByTestId("save-preferences"))

    expect(vi.mocked(cleanReload)).toHaveBeenCalledTimes(1)
    expect(document.cookie.includes("_ga")).toBe(false)
    expect(storedConsent()?.analytics).toBe(false)

    window.__gtmInitialized = undefined
    window.gtag = undefined
    window.dataLayer = []
    document.head.innerHTML = ""
    refreshConsentSnapshot()
    freshRender()
    expect(gtmScript()).toBeNull()
    expect(window.__gtmInitialized).toBeUndefined()
    expect(pageViewPushes().length).toBe(0)
  })
})

describe("Custom event tracking through the data layer", () => {
  it("does not push events before GTM initialization", () => {
    freshRender()
    expect(trackEvent("contact_form_submit", { form_id: "contact-form" })).toBe(false)
    expect(dataLayerObjects().some((e) => e.event === "contact_form_submit")).toBe(false)
  })

  it("pushes object-form events after GTM initialization", () => {
    window.__gtmInitialized = true
    expect(trackEvent("contact_form_submit", { form_id: "contact-form" })).toBe(true)

    const objects = dataLayerObjects()
    expect(objects).toContainEqual({ event: "contact_form_submit", form_id: "contact-form" })
  })
})

describe("Cookie banner UI", () => {
  it("hides after a decision and can be reopened via settings", () => {
    freshRender()
    fireEvent.click(screen.getByTestId("accept-all"))
    expect(screen.queryByTestId("cookie-banner")).toBeNull()

    fireEvent.click(screen.getByTestId("open-settings"))
    expect(screen.getByTestId("cookie-preferences")).toBeTruthy()
  })

  it("shows customize view with necessary always enabled", () => {
    freshRender()
    fireEvent.click(screen.getByTestId("customize"))
    const necessary = screen.getByLabelText("Necessary cookies (always enabled)")
    expect(necessary.getAttribute("aria-checked")).toBe("true")
    expect((necessary as HTMLButtonElement).disabled).toBe(true)
  })

  it("reject-all also works from the preferences view", () => {
    freshRender()
    fireEvent.click(screen.getByTestId("customize"))
    fireEvent.click(screen.getByTestId("analytics-switch"))
    fireEvent.click(screen.getByTestId("reject-all-prefs"))
    expect(storedConsent()).toMatchObject({ analytics: false, marketing: false })
    expect(screen.queryByTestId("cookie-preferences")).toBeNull()
  })
})
