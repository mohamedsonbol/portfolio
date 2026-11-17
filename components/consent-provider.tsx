"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react"

import {
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  removeAnalyticsCookies,
} from "@/lib/consent"
import {
  cleanReload,
  pushGoogleConsentUpdate,
} from "@/lib/analytics"
import {
  getConsentSnapshot,
  getServerConsentSnapshot,
  refreshConsentSnapshot,
  setConsentInStore,
  subscribeConsent,
} from "@/lib/consent-store"

type BannerView = "banner" | "preferences"

type ConsentContextValue = {
  consent: ReturnType<typeof getConsentSnapshot>
  panelOpen: boolean
  panelView: BannerView
  settingsSession: number
  acceptAll: () => void
  rejectAll: () => void
  savePreferences: (prefs: { analytics: boolean; marketing: boolean }) => void
  openPreferences: () => void
  closeBanner: () => void
}

const ConsentContext = createContext<ConsentContextValue | null>(null)

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext)
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider")
  return ctx
}

function buildConsent(prefs: {
  analytics: boolean
  marketing: boolean
}): StoredConsentShape {
  return {
    necessary: true,
    analytics: prefs.analytics,
    marketing: prefs.marketing,
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
  }
}

type StoredConsentShape = ReturnType<typeof getConsentSnapshot> & {}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getServerConsentSnapshot,
  )
  const [panelOpen, setPanelOpen] = useState(false)
  const [panelView, setPanelView] = useState<BannerView>("banner")
  const [settingsSession, setSettingsSession] = useState(0)

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === CONSENT_STORAGE_KEY || event.key === null) {
        refreshConsentSnapshot()
      }
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const applyConsent = useCallback(
    (prefs: { analytics: boolean; marketing: boolean }) => {
      const prev = getConsentSnapshot()
      const next = buildConsent(prefs)

      const withdrewAnalyticsWithGaActive =
        prev?.analytics === true &&
        next.analytics === false &&
        typeof window !== "undefined" &&
        window.__gtmInitialized === true

      if (withdrewAnalyticsWithGaActive) {
        setConsentInStore(next)
        removeAnalyticsCookies()
        pushGoogleConsentUpdate(next)
        cleanReload()
        return
      }

      setConsentInStore(next)
      pushGoogleConsentUpdate(next)
      setPanelOpen(false)
      setPanelView("banner")
    },
    [],
  )

  const acceptAll = useCallback(
    () => applyConsent({ analytics: true, marketing: true }),
    [applyConsent],
  )

  const rejectAll = useCallback(
    () => applyConsent({ analytics: false, marketing: false }),
    [applyConsent],
  )

  const savePreferences = useCallback(
    (prefs: { analytics: boolean; marketing: boolean }) => applyConsent(prefs),
    [applyConsent],
  )

  const openPreferences = useCallback(() => {
    setPanelView("preferences")
    setPanelOpen(true)
    setSettingsSession((session) => session + 1)
  }, [])

  const closeBanner = useCallback(() => {
    setPanelOpen(false)
    setPanelView("banner")
  }, [])

  const value = useMemo(
    () => ({
      consent,
      panelOpen,
      panelView,
      settingsSession,
      acceptAll,
      rejectAll,
      savePreferences,
      openPreferences,
      closeBanner,
    }),
    [
      consent,
      panelOpen,
      panelView,
      settingsSession,
      acceptAll,
      rejectAll,
      savePreferences,
      openPreferences,
      closeBanner,
    ],
  )

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  )
}
