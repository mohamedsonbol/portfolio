"use client"

import Image from "next/image"
import { useState } from "react"
import { Github, Linkedin, Mail, ArrowUpRight, CheckCircle2, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TrackedLink } from "@/components/tracked-link"
import { trackEvent } from "@/lib/analytics"
import { portfolioConfig } from "@/lib/portfolio-config"

const services = [
  "Tag management implementation & audit",
  "Tagging solution design & governance",
  "Data analytics audits & QA",
  "GDPR & consent architecture",
  "Production tracking issue resolution",
  "Full-stack analytics tooling",
]

const quickLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    description: "Professional enquiries",
    href: portfolioConfig.linkedin,
    accent: "#0A66C2",
    accentBg: "rgba(10,102,194,0.08)",
    accentBorder: "rgba(10,102,194,0.2)",
    cta: "Connect",
  },
  {
    icon: Github,
    label: "GitHub",
    description: "See my code",
    href: "https://github.com/mohamedsonbol",
    accent: "var(--primary)",
    accentBg: "color-mix(in srgb, var(--primary) 8%, transparent)",
    accentBorder: "color-mix(in srgb, var(--primary) 20%, transparent)",
    cta: "View profile",
  },
]

type FormStatus = "idle" | "loading" | "success" | "error"

export function ContactSection() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      })

      if (res.ok) {
        trackEvent("contact_form_submit", { form_id: "contact-form" })
        setStatus("success")
        setName("")
        setEmail("")
        setMessage("")
      } else {
        const data = await res.json().catch(() => ({}))
        setErrorMsg(data?.error ?? "Something went wrong. Please try again.")
        setStatus("error")
      }
    } catch {
      setErrorMsg("Network error. Please check your connection.")
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-mono text-primary uppercase tracking-widest mb-3">Get in touch</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let&apos;s Work Together</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            I take on a limited number of consulting engagements. If you need precise, reliable analytics implementation — let&apos;s talk.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 items-start">

          {/* ── Left: What I help with + quick links ── */}
          <div className="flex flex-col gap-5">

            {/* Services card */}
            <div className="rounded-2xl bg-card border border-border p-7 flex flex-col gap-5">
              <div className="mb-1 flex items-center gap-4">
                <Image src="/images/profile/portfolio-portrait-1.png" alt="Mohamed Sonbol" width={72} height={72} sizes="72px" className="h-16 w-16 shrink-0 rounded-xl object-cover object-[center_20%]" loading="lazy" />
                <div>
                  <h3 className="text-lg font-semibold">What I help with</h3>
                  <p className="text-sm text-muted-foreground">Specialised consulting for enterprise analytics teams.</p>
                </div>
              </div>

              <ul className="flex flex-col gap-3">
                {services.map((service) => (
                  <li key={service} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground leading-snug">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick links */}
            <div className="flex flex-col gap-3">
              {quickLinks.map(({ icon: Icon, label, description, href, accent, accentBg, accentBorder, cta }) => (
                <TrackedLink
                  key={label}
                  href={href}
                  eventParams={{ link_label: label }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 px-4 py-4 rounded-xl border transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: "transparent", borderColor: "var(--border)" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.background = accentBg
                    el.style.borderColor = accentBorder
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.background = "transparent"
                    el.style.borderColor = "var(--border)"
                  }}
                >
                  <div className="p-2.5 rounded-xl flex-shrink-0" style={{ background: accentBg }}>
                    <Icon className="h-5 w-5" style={{ color: accent }} />
                  </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-sm font-semibold">{label}</span>
                    <span className="text-xs text-muted-foreground">{description}</span>
                  </div>
                  <span
                    className="text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ color: accent }}
                  >
                    {cta}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </TrackedLink>
              ))}
            </div>
          </div>

          {/* ── Right: Email contact form ── */}
          <div className="rounded-2xl bg-card border border-border p-7 flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Mail className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Send a message</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Replies from{" "}
                <span className="font-mono text-primary text-xs">{portfolioConfig.email}</span>{" "}
                within 24 hours.
              </p>
              <div className="mt-5 grid gap-2 border-t border-border/70 pt-4 text-sm text-muted-foreground sm:grid-cols-3">
                <a className="transition-colors hover:text-primary" href={`mailto:${portfolioConfig.email}`}>{portfolioConfig.email}</a>
                <a className="transition-colors hover:text-primary" href={`tel:${portfolioConfig.phone.replaceAll(" ", "")}`}>{portfolioConfig.phone}</a>
                <span>{portfolioConfig.location}</span>
              </div>
            </div>

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                <div className="p-3 rounded-full bg-primary/10">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <p className="font-semibold text-sm">Message sent!</p>
                <p className="text-xs text-muted-foreground">I&apos;ll get back to you within 24 hours.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-xs text-primary underline underline-offset-2"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4" id="contact-form">

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-border bg-secondary/40 px-4 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-border bg-secondary/40 px-4 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Tell me about your project..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-xl border border-border bg-secondary/40 px-4 py-2.5 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-colors resize-none"
                  />
                </div>

                {/* Error */}
                {status === "error" && (
                  <p className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
                    {errorMsg}
                  </p>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full gap-2 font-semibold"
                  id="contact-submit"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

        </div>

        {/* Response time note */}
        <p className="text-center text-xs text-muted-foreground/60 font-mono mt-8">
          Typical response time: &lt; 24 hours
        </p>

      </div>
    </section>
  )
}
