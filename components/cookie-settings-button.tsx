"use client"

import { useConsent } from "@/components/consent-provider"

export function CookieSettingsButton() {
  const { openPreferences } = useConsent()
  return (
    <button
      type="button"
      onClick={openPreferences}
      data-testid="cookie-settings-button"
      className="font-mono text-sm text-muted-foreground transition-colors underline-offset-2 hover:text-primary hover:underline"
    >
      Cookie Settings
    </button>
  )
}
