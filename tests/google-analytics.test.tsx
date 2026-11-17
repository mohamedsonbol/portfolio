// @vitest-environment happy-dom
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { ConsentProvider, useConsent } from "@/components/consent-provider"
import { CookieBanner } from "@/components/cookie-banner"
import { GoogleAnalytics } from "@/components/google-analytics"
import { CONSENT_VERSION, type StoredConsent } from "@/lib/consent"
import { refreshConsentSnapshot } from "@/lib/consent-store"

vi.mock("next/script", () => ({
  default: ({ src, id }: { src?: string; id?: string }) => (
    <script id={id} data-testid="gtag-script" src={src} />
  ),
}))

vi.mock("@/lib/analytics", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/analytics")>()
  return {
    ...actual,
    cleanReload: vi.fn(),
  }
})

const GA_ID = "G-4898X9MEDR"

function dataLayerCommands(): unknown[][] {
  return (window.dataLayer ?? []).map((entry) =>
    Array.from(entry as ArrayLike<unknown>),
  )
}

function consentUpdatePayload(): Record<string, string> {
  const entries = dataLayerCommands()
  const idx = entries.findIndex((c) => c[0] === "consent" && c[1] === "update")
  expect(idx).toBeGreaterThanOrEqual(0)
  return entries[idx][2] as Record<string, string>
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
      <GoogleAnalytics />
      <CookieBanner />
      <SettingsOpener />
    </ConsentProvider>
  )
}

function freshRender() {
  cleanup()
  return render(<Harness />)
}

beforeEach(async () => {
  window.localStorage.clear()
  refreshConsentSnapshot()
  window.dataLayer = []
  window.gtag = undefined
  window.__gaInitialized = undefined
  document.head.innerHTML = ""
  document.cookie = ""
  vi.mocked(await import("@/lib/analytics")).cleanReload.mockClear()
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe("Google Analytics consent gating", () => {
  it("does not load analytics before consent", () => {
    freshRender()
    expect(screen.queryByTestId("gtag-script")).toBeNull()
    expect(window.__gaInitialized).toBeUndefined()
    const commands = dataLayerCommands()
    expect(commands.some((c) => c[0] === "config" || c[0] === "js")).toBe(false)
    expect(screen.getByTestId("cookie-banner")).toBeTruthy()
  })

  it("rejecting all prevents analytics initialization and persists the choice", () => {
    freshRender()
    fireEvent.click(screen.getByTestId("reject-all"))

    expect(screen.queryByTestId("gtag-script")).toBeNull()
    expect(window.__gaInitialized).toBeUndefined()
    expect(storedConsent()).toEqual({
      necessary: true,
      analytics: false,
      marketing: false,
      version: CONSENT_VERSION,
      updatedAt: expect.any(String),
    })

    const grantedUpdate = dataLayerCommands().find(
      (c) => c[0] === "consent" && c[1] === "update",
    )
    expect(grantedUpdate).toBeTruthy()
    expect((grantedUpdate![2] as Record<string, string>).analytics_storage).toBe("denied")

    cleanup()
    freshRender()
    expect(screen.queryByTestId("gtag-script")).toBeNull()
    expect(screen.queryByTestId("cookie-banner")).toBeNull()
  })

  it("accepting all activates Google Analytics exactly once", () => {
    freshRender()
    fireEvent.click(screen.getByTestId("accept-all"))

    const script = screen.getByTestId("gtag-script")
    expect(script.getAttribute("src")).toBe(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`)
    expect(window.__gaInitialized).toBe(true)

    const commands = dataLayerCommands()
    const updateIndex = commands.findIndex((c) => c[0] === "consent" && c[1] === "update")
    const jsIndex = commands.findIndex((c) => c[0] === "js")
    const configCount = commands.filter((c) => c[0] === "config").length
    expect(configCount).toBe(1)
    expect(updateIndex).toBeGreaterThanOrEqual(0)
    expect(jsIndex).toBeGreaterThan(updateIndex)
    expect(commands.findIndex((c) => c[0] === "config")).toBeGreaterThan(jsIndex)

    expect(commands[updateIndex][2]).toMatchObject({
      analytics_storage: "granted",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    })
  })

  it("restores persisted consent before initialization on subsequent visits", () => {
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
    expect(screen.getByTestId("gtag-script")).toBeTruthy()
    expect(window.__gaInitialized).toBe(true)
    expect(dataLayerCommands().some((c) => c[0] === "config")).toBe(true)
  })

  it("sends no duplicate config on consent state updates after initialization", () => {
    freshRender()
    fireEvent.click(screen.getByTestId("accept-all"))
    fireEvent.click(screen.getByTestId("open-settings"))
    fireEvent.click(screen.getByTestId("marketing-switch"))
    fireEvent.click(screen.getByTestId("save-preferences"))

    const commands = dataLayerCommands()
    expect(commands.filter((c) => c[0] === "config").length).toBe(1)
    expect(commands.filter((c) => c[0] === "js").length).toBe(1)
    expect(commands.filter((c) => c[0] === "consent" && c[1] === "update").length).toBe(3)
  })

  it("pushes no manual page_view commands across client-side navigation", () => {
    freshRender()
    fireEvent.click(screen.getByTestId("accept-all"))
    window.history.pushState({}, "", "/projects")
    window.history.pushState({}, "", "/resume")

    const commands = dataLayerCommands()
    expect(commands.filter((c) => c[0] === "page_view").length).toBe(0)
    expect(commands.filter((c) => c[0] === "config").length).toBe(1)
  })

  it("withdrawal stops analytics, deletes cookies and performs a clean reload", async () => {
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
    expect(storedConsent()?.marketing).toBe(true)

    // Simulate the clean reload: JS state (initialized flag, dataLayer) resets,
    // persisted storage survives and is re-read into the store.
    window.__gaInitialized = undefined
    window.gtag = undefined
    window.dataLayer = []
    refreshConsentSnapshot()
    freshRender()
    expect(screen.queryByTestId("gtag-script")).toBeNull()
    expect(window.__gaInitialized).toBeUndefined()
  })

  it("keeps marketing separate from analytics consent", () => {
    freshRender()
    fireEvent.click(screen.getByTestId("open-settings"))
    fireEvent.click(screen.getByTestId("marketing-switch"))
    fireEvent.click(screen.getByTestId("save-preferences"))

    expect(storedConsent()).toMatchObject({ analytics: false, marketing: true })
    expect(screen.queryByTestId("gtag-script")).toBeNull()

    const update = consentUpdatePayload()
    expect(update).toMatchObject({
      ad_storage: "granted",
      analytics_storage: "denied",
    })
  })
})

describe("Cookie banner UI", () => {
  it("hides after a decision and can be reopened via settings", async () => {
    freshRender()
    fireEvent.click(screen.getByTestId("accept-all"))
    await waitFor(() => expect(screen.queryByTestId("cookie-banner")).toBeNull())

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
