"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useConsent } from "@/components/consent-provider"
import type { StoredConsent } from "@/lib/consent"

type BannerPanelProps = {
  acceptAll: () => void
  rejectAll: () => void
  openPreferences: () => void
}

type PreferencesPanelProps = {
  consent: StoredConsent | null
  savePreferences: (prefs: { analytics: boolean; marketing: boolean }) => void
  rejectAll: () => void
  closeBanner: () => void
}

function BannerPanel({ rejectAll, openPreferences, acceptAll }: BannerPanelProps) {
  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      data-testid="cookie-banner"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
    >
      <div className="container mx-auto flex max-w-5xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">
            Cookies &amp; privacy
          </p>
          <p className="max-w-2xl text-sm leading-snug text-muted-foreground">
            We use necessary cookies to make this site work. With your consent
            we also use Google Analytics to understand how visitors use the
            site. You can accept, reject, or customise your preferences at any
            time.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:justify-end">
          <Button variant="outline" size="sm" onClick={rejectAll} data-testid="reject-all">
            Reject All
          </Button>
          <Button variant="ghost" size="sm" onClick={openPreferences} data-testid="customize">
            Customize
          </Button>
          <Button size="sm" onClick={acceptAll} data-testid="accept-all">
            Accept All
          </Button>
        </div>
      </div>
    </div>
  )
}

function PreferencesPanel({
  consent,
  savePreferences,
  rejectAll,
  closeBanner,
}: PreferencesPanelProps) {
  const [analytics, setAnalytics] = useState(consent?.analytics ?? false)
  const [marketing, setMarketing] = useState(consent?.marketing ?? false)

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      data-testid="cookie-preferences"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
    >
      <div className="container mx-auto flex max-w-3xl flex-col gap-5 px-6 py-5">
        <div className="flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary">
            Cookie preferences
          </p>
          <button
            type="button"
            onClick={closeBanner}
            data-testid="close-preferences"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Close
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-6">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold">Necessary cookies</span>
              <span className="text-xs text-muted-foreground">
                Required for the site to function. Always enabled.
              </span>
            </div>
            <Switch checked disabled aria-label="Necessary cookies (always enabled)" />
          </div>

          <div className="flex items-start justify-between gap-6">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold">Analytics cookies</span>
              <span className="text-xs text-muted-foreground">
                Google Analytics (G-4898X9MEDR) helps us understand how
                visitors use the site. Loaded only with your consent.
              </span>
            </div>
            <Switch
              checked={analytics}
              onCheckedChange={setAnalytics}
              aria-label="Analytics cookies"
              data-testid="analytics-switch"
            />
          </div>

          <div className="flex items-start justify-between gap-6">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold">Marketing cookies</span>
              <span className="text-xs text-muted-foreground">
                Reserved for future advertising measurement. No marketing tags
                are currently active on this site.
              </span>
            </div>
            <Switch
              checked={marketing}
              onCheckedChange={setMarketing}
              aria-label="Marketing cookies"
              data-testid="marketing-switch"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <Button variant="outline" size="sm" onClick={rejectAll} data-testid="reject-all-prefs">
            Reject All
          </Button>
          <Button
            size="sm"
            onClick={() => savePreferences({ analytics, marketing })}
            data-testid="save-preferences"
          >
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  )
}

export function CookieBanner() {
  const {
    consent,
    panelOpen,
    settingsSession,
    acceptAll,
    rejectAll,
    savePreferences,
    openPreferences,
    closeBanner,
  } = useConsent()

  if (consent === null && !panelOpen) {
    return (
      <BannerPanel
        rejectAll={rejectAll}
        openPreferences={openPreferences}
        acceptAll={acceptAll}
      />
    )
  }

  if (panelOpen) {
    return (
      <PreferencesPanel
        key={settingsSession}
        consent={consent}
        savePreferences={savePreferences}
        rejectAll={rejectAll}
        closeBanner={closeBanner}
      />
    )
  }

  return null
}
