"use client"

import type React from "react"

import { useState } from "react"
import { Send, Mail, MapPin, Github, Linkedin, Briefcase, Users, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"

const socialLinks = [
  { icon: Github, href: "https://github.com/mohamedsonbol", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/mohamedsonbol", label: "LinkedIn" },
]

const inquiryTypes = [
  { value: "client", label: "Consultation", icon: Users },
  { value: "job", label: "Job Opportunity", icon: Briefcase },
]

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    inquiryType: "client",
    budget: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const supabase = createClient()

      const { error } = await supabase.from("consultation_requests").insert({
        name: formData.name,
        email: formData.email,
        company: formData.company || null,
        inquiry_type: formData.inquiryType,
        budget: formData.inquiryType === "client" ? formData.budget || null : null,
        message: formData.message,
      })

      if (error) {
        throw error
      }

      setSubmitStatus("success")
      setFormData({ name: "", email: "", company: "", inquiryType: "client", budget: "", message: "" })
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {"Need an expert who understands enterprise analytics infrastructure?"}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-4">{"I take on a limited number of consulting engagements for clients who need:"}</h3>

              <ul className="space-y-2 mb-6 text-muted-foreground text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  Tag management implementation or audit (Google, Adobe, Tealium)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  GDPR compliance technical architecture
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  Production debugging for tracking and data layer issues
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                  Technical project management for analytics initiatives
                </li>
              </ul>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a
                      href="mailto:ezzat@exceptionalgrp.com"
                      className="font-medium hover:text-primary transition-colors"
                    >
                      ezzat@exceptionalgrp.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">Warsaw, Poland</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">Follow me</p>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-secondary hover:bg-primary/10 hover:text-primary transition-all"
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Status card */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                </span>
                <p className="text-sm">
                  Currently <span className="text-accent font-medium">available</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Inquiry Type Toggle */}
              <div className="space-y-2">
                <label className="text-sm font-medium">What can I help you with?</label>
                <div className="grid grid-cols-2 gap-3">
                  {inquiryTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, inquiryType: type.value, budget: "" })}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${formData.inquiryType === type.value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-secondary/50 hover:border-primary/50"
                        }`}
                    >
                      <type.icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name *
                  </label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-secondary/50 border-border focus:border-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-secondary/50 border-border focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium">
                  Company / Organization
                </label>
                <Input
                  id="company"
                  placeholder="Your company name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-secondary/50 border-border focus:border-primary"
                />
              </div>

              {formData.inquiryType === "client" && (
                <div className="space-y-2">
                  <label htmlFor="budget" className="text-sm font-medium">
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full h-10 px-3 rounded-md bg-secondary/50 border border-border focus:border-primary text-sm"
                  >
                    <option value="">Select a budget range</option>
                    <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                    <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                    <option value="$25,000+">$25,000+</option>
                  </select>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  {formData.inquiryType === "client" ? "Project Details *" : "Tell me about the opportunity *"}
                </label>
                <Textarea
                  id="message"
                  placeholder={
                    formData.inquiryType === "client"
                      ? "Describe your project, goals, and timeline..."
                      : "Describe the role, team, and what you're looking for..."
                  }
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-secondary/50 border-border focus:border-primary resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              {/* Success Message */}
              {submitStatus === "success" && (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-accent/10 border border-accent/20">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  <p className="text-sm text-accent">
                    Thank you for reaching out! I'll get back to you soon.
                  </p>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === "error" && (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                  <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                  <p className="text-sm text-destructive">
                    {errorMessage}
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
