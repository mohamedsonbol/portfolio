import Link from "next/link"
import { Terminal, Heart } from "lucide-react"
import { portfolioConfig } from "@/lib/portfolio-config"
import { CookieSettingsButton } from "@/components/cookie-settings-button"

export function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2 text-muted-foreground">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()}
            </p>
            <Terminal className="h-4 w-4" />
            <span className="font-mono text-sm">
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                Built with <Heart className="h-4 w-4 text-destructive fill-destructive" /> by {portfolioConfig.name}.
              </p></span>
          </div>
          <nav aria-label="Legal" className="flex items-center gap-5">
            <Link
              href="/privacy-policy"
              className="font-mono text-sm text-muted-foreground transition-colors underline-offset-2 hover:text-primary hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookie-policy"
              className="font-mono text-sm text-muted-foreground transition-colors underline-offset-2 hover:text-primary hover:underline"
            >
              Cookie Policy
            </Link>
            <CookieSettingsButton />
          </nav>
        </div>
      </div>
    </footer>
  )
}
