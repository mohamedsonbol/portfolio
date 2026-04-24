"use client"

import { useI18n } from "@/lib/i18n"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n()

  const toggleLocale = () => {
    setLocale(locale === "en" ? "ar" : "en")
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLocale}
      className="flex items-center gap-2 font-medium"
    >
      <Globe className="h-4 w-4" />
      <span>{locale === "en" ? "العربية" : "EN"}</span>
    </Button>
  )
}
