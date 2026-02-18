import { Terminal, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()}
            </p>
            <Terminal className="h-4 w-4" />
            <span className="font-mono text-sm">
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                Built with <Heart className="h-4 w-4 text-destructive fill-destructive" /> by Mohamed Ezzat Sonbol.
              </p></span>
          </div>
        </div>
      </div>
    </footer>
  )
}
