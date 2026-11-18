"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

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
      className="fixed inset-x-0 bottom-0 z-50 pb-3 sm:pb-5"
    >
      <div className="site-container">
        <div className="mx-auto max-w-4xl rounded-2xl border border-border/80 bg-background/95 p-5 shadow-2xl shadow-black/10 backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                  Cookies &amp; privacy
                </p>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                We use necessary cookies to make this site work. With your consent
                we also use Google Analytics to understand how visitors use the
                site. You can accept, reject, or customise your preferences at any
                time.
              </p>
              <Link
                href="/privacy-policy"
                className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary underline-offset-4 hover:underline"
              >
                Privacy Policy
                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </Link>
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
      className="fixed inset-x-0 bottom-0 z-50 pb-3 sm:pb-5"
    >
      <div className="site-container">
        <div className="mx-auto max-h-[calc(100dvh-1.5rem)] max-w-2xl overflow-y-auto overscroll-contain rounded-2xl border border-border/80 bg-background/95 p-5 shadow-2xl shadow-black/10 backdrop-blur-xl sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
              Cookie preferences
            </p>
            <button
              type="button"
              onClick={closeBanner}
              data-testid="close-preferences"
              className="text-xs text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              Close
            </button>
          </div>

          <div className="mt-5 flex flex-col">
            <div className="flex items-start justify-between gap-6 border-t border-border/70 py-4 first:border-t-0 first:pt-0">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold">Necessary cookies</span>
                <span className="text-xs leading-5 text-muted-foreground">
                  Required for the site to function. Always enabled.
                </span>
              </div>
              <Switch checked disabled aria-label="Necessary cookies (always enabled)" />
            </div>

            <div className="flex items-start justify-between gap-6 border-t border-border/70 py-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold">Analytics cookies</span>
                <span className="text-xs leading-5 text-muted-foreground">
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

            <div className="flex items-start justify-between gap-6 border-t border-border/70 py-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold">Marketing cookies</span>
                <span className="text-xs leading-5 text-muted-foreground">
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

          <div className="mt-3 flex flex-wrap items-center justify-end gap-2 border-t border-border/70 pt-4">
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
