"use client"

import { useConsent } from "@/components/consent-provider"

export function CookieSettingsButton() {
  const { openPreferences } = useConsent()
  return (
    <button
      type="button"
      onClick={openPreferences}
      data-testid="cookie-settings-button"
      className="w-fit text-left text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
    >
      Cookie Settings
    </button>
  )
}
