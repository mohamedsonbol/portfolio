"use client"

import Link from "next/link"
import { useRef, useState } from "react"
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Github,
  Linkedin,
  Loader2,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { trackEvent } from "@/lib/analytics"
import { portfolioConfig } from "@/lib/portfolio-config"
import { cn } from "@/lib/utils"

const services = [
  "Web Development",
  "E-commerce Solutions",
  "Analytics & Tracking",
  "Business Systems & Integrations",
  "AI & Automation",
  "Other / Not Sure Yet",
] as const

const MAX_NAME_LENGTH = 100
const MAX_EMAIL_LENGTH = 254
const MAX_MESSAGE_LENGTH = 4_800
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type FormStatus = "idle" | "loading" | "success" | "error"
type FieldName = "name" | "email" | "service" | "message"
type FormErrors = Partial<Record<FieldName, string>>

const fieldClassName =
  "w-full rounded-xl border border-border bg-background/70 px-4 py-3 text-sm text-foreground transition-[border-color,box-shadow] duration-200 placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25"

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null

  return (
    <p id={id} className="flex items-start gap-1.5 text-xs leading-5 text-destructive">
      <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </p>
  )
}

export function ContactSection() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [service, setService] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const [errors, setErrors] = useState<FormErrors>({})

  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const serviceRef = useRef<HTMLSelectElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  function clearError(field: FieldName) {
    setErrors((current) => {
      if (!current[field]) return current

      const next = { ...current }
      delete next[field]
      return next
    })
  }

  function validate() {
    const nextErrors: FormErrors = {}
    const cleanName = name.trim()
    const cleanEmail = email.trim()
    const cleanMessage = message.trim()

    if (!cleanName) {
      nextErrors.name = "Please enter your name."
    } else if (cleanName.length > MAX_NAME_LENGTH) {
      nextErrors.name = "Please keep your name under 100 characters."
    }

    if (!cleanEmail) {
      nextErrors.email = "Please enter your email address."
    } else if (cleanEmail.length > MAX_EMAIL_LENGTH) {
      nextErrors.email = "Please enter a valid email address."
    } else if (!EMAIL_PATTERN.test(cleanEmail)) {
      nextErrors.email = "Please enter a valid email address."
    }

    if (!service) {
      nextErrors.service = "Please select the service that fits best."
    }

    if (!cleanMessage) {
      nextErrors.message = "Please tell me a little about your project."
    } else if (cleanMessage.length > MAX_MESSAGE_LENGTH) {
      nextErrors.message = "Please keep your project brief under 4,800 characters."
    }

    setErrors(nextErrors)

    const firstInvalid = (["name", "email", "service", "message"] as const).find(
      (field) => nextErrors[field],
    )

    if (firstInvalid) {
      const refs = {
        name: nameRef,
        email: emailRef,
        service: serviceRef,
        message: messageRef,
      }
      refs[firstInvalid].current?.focus()
    }

    return Object.keys(nextErrors).length === 0
  }

  function resetForm() {
    setName("")
    setEmail("")
    setService("")
    setMessage("")
    setErrors({})
    setErrorMsg("")
    setStatus("idle")
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (status === "loading") return

    setErrorMsg("")
    setStatus("idle")

    if (!validate()) return

    setStatus("loading")

    try {
      const cleanName = name.trim()
      const cleanEmail = email.trim()
      const cleanMessage = message.trim()
      const messageWithService = `Service interest: ${service}\n\n${cleanMessage}`

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          message: messageWithService,
        }),
      })

      if (response.ok) {
        trackEvent("contact_form_submit", { form_id: "contact-form" })
        setName("")
        setEmail("")
        setService("")
        setMessage("")
        setErrors({})
        setStatus("success")
        return
      }

      const data = await response.json().catch(() => ({}))
      setErrorMsg(
        typeof data?.error === "string"
          ? data.error
          : "Something went wrong. Please try again.",
      )
      setStatus("error")
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.")
      setStatus("error")
    }
  }

  const isLoading = status === "loading"
  const liveMessage = isLoading ? "Sending your project enquiry." : ""

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border/70 bg-secondary/20 py-24 md:py-32"
    >
      <div className="brand-ambient pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />

      <div className="site-container relative">
        <div className="grid gap-12 lg:grid-cols-[0.84fr_1.16fr] lg:gap-16">
          <div className="self-start lg:sticky lg:top-28">
            <p className="eyebrow">Start a project</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] md:text-5xl">
              Have a project in mind?
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground md:text-lg">
              Let&apos;s explore how the right digital solutions can help move your
              business forward.
            </p>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              Share what you&apos;re building, the systems involved, and what success
              looks like. I&apos;ll reply with a practical next step.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3 border-t border-border pt-6">
              <a
                href={portfolioConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
                LinkedIn
                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </a>
              <a
                href={portfolioConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Github className="h-3.5 w-3.5" aria-hidden="true" />
                GitHub
                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </a>
            </div>

            <p className="mt-7 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-subtle-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
              Typical reply within 24 hours
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/5 md:p-9">
            <div className="border-b border-border pb-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                Project enquiry
              </p>
              <h3
                id="contact-form-title"
                className="mt-3 text-2xl font-semibold tracking-[-0.025em]"
              >
                Tell me what you&apos;re working on.
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Fields marked <span className="text-primary">*</span> are required.
              </p>
            </div>

            <p className="sr-only" aria-live="polite" aria-atomic="true">
              {liveMessage}
            </p>

            {status === "success" ? (
              <div
                role="status"
                aria-live="polite"
                className="flex flex-col items-start gap-4 py-10"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full border border-primary/20 bg-primary/10">
                  <CheckCircle2 className="h-6 w-6 text-primary" aria-hidden="true" />
                </span>
                <div>
                  <h4 className="text-xl font-semibold tracking-[-0.02em]">
                    Enquiry sent
                  </h4>
                  <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                    Thanks for reaching out. Your message is on its way, and I&apos;ll
                    reply within 24 hours.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-2 rounded-full"
                  onClick={resetForm}
                >
                  Send another enquiry
                </Button>
              </div>
            ) : (
              <form
                id="contact-form"
                aria-labelledby="contact-form-title"
                aria-busy={isLoading}
                noValidate
                onSubmit={handleSubmit}
                className="mt-6 flex flex-col gap-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-name"
                      className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
                    >
                      Name <span className="text-primary" aria-hidden="true">*</span>
                      <span className="sr-only"> (required)</span>
                    </label>
                    <input
                      ref={nameRef}
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      aria-required="true"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      maxLength={MAX_NAME_LENGTH}
                      placeholder="Your name"
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value)
                        clearError("name")
                      }}
                      className={cn(
                        fieldClassName,
                        errors.name && "border-destructive focus-visible:ring-destructive/20",
                      )}
                    />
                    <FieldError id="contact-name-error" message={errors.name} />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-email"
                      className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
                    >
                      Email <span className="text-primary" aria-hidden="true">*</span>
                      <span className="sr-only"> (required)</span>
                    </label>
                    <input
                      ref={emailRef}
                      id="contact-email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      required
                      aria-required="true"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                      maxLength={MAX_EMAIL_LENGTH}
                      placeholder="you@company.com"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value)
                        clearError("email")
                      }}
                      className={cn(
                        fieldClassName,
                        errors.email && "border-destructive focus-visible:ring-destructive/20",
                      )}
                    />
                    <FieldError id="contact-email-error" message={errors.email} />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-service"
                    className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
                  >
                    Service <span className="text-primary" aria-hidden="true">*</span>
                    <span className="sr-only"> (required)</span>
                  </label>
                  <div className="relative">
                    <select
                      ref={serviceRef}
                      id="contact-service"
                      name="service"
                      required
                      aria-required="true"
                      aria-invalid={Boolean(errors.service)}
                      aria-describedby={
                        errors.service
                          ? "contact-service-error"
                          : "contact-service-help"
                      }
                      value={service}
                      onChange={(event) => {
                        setService(event.target.value)
                        clearError("service")
                      }}
                      className={cn(
                        fieldClassName,
                        "appearance-none pr-10",
                        !service && "text-subtle-foreground",
                        errors.service && "border-destructive focus-visible:ring-destructive/20",
                      )}
                    >
                      <option value="" disabled>
                        Select a service
                      </option>
                      {services.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </div>
                  {errors.service ? (
                    <FieldError id="contact-service-error" message={errors.service} />
                  ) : (
                    <p id="contact-service-help" className="text-xs leading-5 text-muted-foreground">
                      Choose the closest fit — we can refine it later.
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-message"
                    className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
                  >
                    Project brief <span className="text-primary" aria-hidden="true">*</span>
                    <span className="sr-only"> (required)</span>
                  </label>
                  <textarea
                    ref={messageRef}
                    id="contact-message"
                    name="message"
                    required
                    aria-required="true"
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? "contact-message-error" : "contact-message-help"
                    }
                    rows={6}
                    maxLength={MAX_MESSAGE_LENGTH}
                    placeholder="What are you building, what systems are involved, and what would a good outcome look like?"
                    value={message}
                    onChange={(event) => {
                      setMessage(event.target.value)
                      clearError("message")
                    }}
                    className={cn(
                      fieldClassName,
                      "min-h-36 resize-y",
                      errors.message && "border-destructive focus-visible:ring-destructive/20",
                    )}
                  />
                  {errors.message ? (
                    <FieldError id="contact-message-error" message={errors.message} />
                  ) : (
                    <p id="contact-message-help" className="text-xs leading-5 text-muted-foreground">
                      A short brief is enough. Include timing or constraints if they matter.
                    </p>
                  )}
                </div>

                {status === "error" && (
                  <div
                    role="alert"
                    className="flex items-start gap-2 rounded-xl border border-destructive/25 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    <p>{errorMsg}</p>
                  </div>
                )}

                <div className="flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-xs text-xs leading-5 text-muted-foreground">
                    Your details are used only to respond to this enquiry.{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary"
                    >
                      Privacy policy
                    </Link>
                  </p>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="h-11 w-full gap-2 rounded-full px-6 font-semibold sm:w-auto"
                    id="contact-submit"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Sending enquiry…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden="true" />
                        Send project enquiry
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
