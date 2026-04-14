import type { Metadata } from "next"
import { FileText, Download, ExternalLink } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Resume | Mohamed Sonbol",
  description: "Professional resume of Mohamed Sonbol — Enterprise Technical Consultant",
}

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <section className="pt-32 pb-16 px-6 flex-1">
        <div className="container mx-auto max-w-5xl">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">Resume</h1>
                <p className="text-muted-foreground text-sm mt-1">Mohamed Sonbol</p>
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href="/Resume.pdf"
                download="Mohamed-Sonbol-Resume.pdf"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </a>
              <a
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-secondary transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                Open in New Tab
              </a>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="w-full rounded-2xl border border-border overflow-hidden bg-card shadow-sm">
            <iframe
              src="/Resume.pdf"
              className="w-full h-[75vh] min-h-[500px]"
              title="Mohamed Sonbol Resume"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
