"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const mounted = React.useSyncExternalStore(
    React.useCallback(() => () => undefined, []),
    React.useCallback(() => true, []),
    React.useCallback(() => false, []),
  )

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="rounded-full" aria-label="Toggle theme">
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full bg-secondary/50 hover:bg-secondary"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Sun className="h-5 w-5 text-brand-purple-light" /> : <Moon className="h-5 w-5 text-primary" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
