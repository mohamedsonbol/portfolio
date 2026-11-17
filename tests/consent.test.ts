import { describe, expect, it } from "vitest"

import {
  CONSENT_VERSION,
  clearStoredConsent,
  isStoredConsent,
  readStoredConsent,
  toGoogleConsent,
  writeStoredConsent,
} from "@/lib/consent"

function memoryStorage() {
  const map = new Map<string, string>()
  return {
    getItem: (key: string) => map.get(key) ?? null,
    setItem: (key: string, value: string) => void map.set(key, value),
    removeItem: (key: string) => void map.delete(key),
  }
}

describe("consent storage", () => {
  it("returns null when nothing is stored", () => {
    expect(readStoredConsent(memoryStorage())).toBeNull()
  })

  it("round-trips valid consent", () => {
    const storage = memoryStorage()
    writeStoredConsent(
      {
        necessary: true,
        analytics: true,
        marketing: false,
        version: CONSENT_VERSION,
        updatedAt: "2026-01-01T00:00:00.000Z",
      },
      storage,
    )
    expect(readStoredConsent(storage)).toEqual({
      necessary: true,
      analytics: true,
      marketing: false,
      version: CONSENT_VERSION,
      updatedAt: "2026-01-01T00:00:00.000Z",
    })
  })

  it("returns null for corrupt JSON", () => {
    const storage = memoryStorage()
    storage.setItem("mgmt_consent_v1", "{not json")
    expect(readStoredConsent(storage)).toBeNull()
  })

  it("returns null for wrong version", () => {
    const storage = memoryStorage()
    storage.setItem(
      "mgmt_consent_v1",
      JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: true,
        version: 999,
        updatedAt: "2026-01-01T00:00:00.000Z",
      }),
    )
    expect(readStoredConsent(storage)).toBeNull()
  })

  it("returns null for missing fields", () => {
    const storage = memoryStorage()
    storage.setItem("mgmt_consent_v1", JSON.stringify({ analytics: true }))
    expect(readStoredConsent(storage)).toBeNull()
  })

  it("clears stored consent", () => {
    const storage = memoryStorage()
    writeStoredConsent(
      {
        necessary: true,
        analytics: true,
        marketing: true,
        version: CONSENT_VERSION,
        updatedAt: "2026-01-01T00:00:00.000Z",
      },
      storage,
    )
    clearStoredConsent(storage)
    expect(readStoredConsent(storage)).toBeNull()
  })
})

describe("isStoredConsent", () => {
  it("rejects non-objects and invalid values", () => {
    expect(isStoredConsent(null)).toBe(false)
    expect(isStoredConsent("x")).toBe(false)
    expect(isStoredConsent({ necessary: true, analytics: "yes", marketing: false, version: 1, updatedAt: "" })).toBe(false)
  })
})

describe("toGoogleConsent", () => {
  it("maps analytics-only consent", () => {
    expect(
      toGoogleConsent({ necessary: true, analytics: true, marketing: false }),
    ).toEqual({
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "granted",
    })
  })

  it("maps marketing consent to all ad categories", () => {
    expect(
      toGoogleConsent({ necessary: true, analytics: false, marketing: true }),
    ).toEqual({
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "denied",
    })
  })

  it("maps rejection to all denied", () => {
    expect(
      toGoogleConsent({ necessary: true, analytics: false, marketing: false }),
    ).toEqual({
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    })
  })
})
