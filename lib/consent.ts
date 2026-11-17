export type ConsentCategory = "necessary" | "analytics" | "marketing"

export type ConsentPreferences = {
  necessary: true
  analytics: boolean
  marketing: boolean
}

export type StoredConsent = ConsentPreferences & {
  version: number
  updatedAt: string
}

export const CONSENT_STORAGE_KEY = "mgmt_consent_v1"
export const CONSENT_VERSION = 1

export function isStoredConsent(value: unknown): value is StoredConsent {
  if (typeof value !== "object" || value === null) return false
  const v = value as Record<string, unknown>
  return (
    v.version === CONSENT_VERSION &&
    typeof v.updatedAt === "string" &&
    typeof v.analytics === "boolean" &&
    typeof v.marketing === "boolean" &&
    v.necessary === true
  )
}

type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">

function getStorage(): StorageLike | null {
  if (typeof window === "undefined") return null
  try {
    return window.localStorage
  } catch {
    return null
  }
}

export function readStoredConsent(
  storage: StorageLike | null = getStorage(),
): StoredConsent | null {
  if (!storage) return null
  try {
    const raw = storage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    return isStoredConsent(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function writeStoredConsent(
  consent: StoredConsent,
  storage: StorageLike | null = getStorage(),
): void {
  if (!storage) return
  try {
    storage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent))
  } catch {
    return
  }
}

export function clearStoredConsent(
  storage: StorageLike | null = getStorage(),
): void {
  if (!storage) return
  try {
    storage.removeItem(CONSENT_STORAGE_KEY)
  } catch {
    return
  }
}

export function toGoogleConsent(
  prefs: ConsentPreferences,
): Record<
  | "ad_storage"
  | "ad_user_data"
  | "ad_personalization"
  | "analytics_storage",
  "granted" | "denied"
> {
  return {
    ad_storage: prefs.marketing ? "granted" : "denied",
    ad_user_data: prefs.marketing ? "granted" : "denied",
    ad_personalization: prefs.marketing ? "granted" : "denied",
    analytics_storage: prefs.analytics ? "granted" : "denied",
  }
}

export function removeAnalyticsCookies(): void {
  if (typeof document === "undefined") return
  const hostname = window.location.hostname
  const hostParts = hostname.split(".")
  const parentDomain =
    hostParts.length > 2
      ? hostParts.slice(-2).join(".")
      : hostname
  const domains = [hostname, `.${hostname}`, parentDomain, `.${parentDomain}`]
  for (const name of document.cookie.split(";").map((c) => c.trim().split("=")[0])) {
    if (!name.startsWith("_ga")) continue
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
    }
  }
}
