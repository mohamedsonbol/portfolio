import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"

export function LegalPageShell({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Navigation />
      <section className="site-container pb-24 pt-36 md:pb-32 md:pt-44">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-primary" aria-hidden="true" />
            <p className="eyebrow">Legal</p>
          </div>
          <h1 className="mt-4 text-heading">{title}</h1>
          <div className="mt-12">{children}</div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
