"use client"

import { useState } from "react"
import { MessageCircle, Mail, Send, CheckCircle2, AlertCircle } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useI18n } from "@/lib/i18n"

type FormStatus = "idle" | "sending" | "success" | "error"

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  projectType: string
  budget: string
  timeline: string
  message: string
}

export default function ContactPage() {
  const { t, dir } = useI18n()
  const [status, setStatus] = useState<FormStatus>("idle")
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  })

  const whatsappLink = "https://wa.me/48732785743?text=Hi%20Mohamed%2C%20I'd%20like%20to%20discuss%20a%20project."

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")

    // Create mailto link with form data
    const subject = `New Inquiry: ${formData.projectType || "Project"} from ${formData.name}`
    const body = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || "Not provided"}
Company: ${formData.company || "Not provided"}
Project Type: ${formData.projectType || "Not specified"}
Budget: ${formData.budget || "Not specified"}
Timeline: ${formData.timeline || "Not specified"}

Message:
${formData.message}
    `.trim()

    // Open mailto
    window.location.href = `mailto:mohamed@sonbol.dev?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    
    // Show success after a short delay
    setTimeout(() => {
      setStatus("success")
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        projectType: "",
        budget: "",
        timeline: "",
        message: "",
      })
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const projectTypes = t.contact.form.projectTypes
  const budgets = t.contact.form.budgets
  const timelines = t.contact.form.timelines

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <section className="pt-32 pb-24 px-6 flex-1">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.contact.title}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.contact.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-3xl border border-border p-8">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  {t.contact.form.title}
                </h2>

                {status === "success" ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="h-16 w-16 text-accent mx-auto mb-4" />
                    <p className="text-lg font-medium text-accent">{t.contact.form.success}</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t.contact.form.name} <span className="text-destructive">*</span>
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={t.contact.form.namePlaceholder}
                          required
                          dir={dir}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t.contact.form.email} <span className="text-destructive">*</span>
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={t.contact.form.emailPlaceholder}
                          required
                          dir="ltr"
                        />
                      </div>
                    </div>

                    {/* Phone & Company Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t.contact.form.phone}
                        </label>
                        <Input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder={t.contact.form.phonePlaceholder}
                          dir="ltr"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t.contact.form.company}
                        </label>
                        <Input
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder={t.contact.form.companyPlaceholder}
                          dir={dir}
                        />
                      </div>
                    </div>

                    {/* Project Type */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t.contact.form.projectType} <span className="text-destructive">*</span>
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        required
                        className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        dir={dir}
                      >
                        <option value="">--</option>
                        <option value="website">{projectTypes.website}</option>
                        <option value="ecommerce">{projectTypes.ecommerce}</option>
                        <option value="analytics">{projectTypes.analytics}</option>
                        <option value="consulting">{projectTypes.consulting}</option>
                        <option value="job">{projectTypes.job}</option>
                        <option value="other">{projectTypes.other}</option>
                      </select>
                    </div>

                    {/* Budget & Timeline Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t.contact.form.budget}
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          dir={dir}
                        >
                          <option value="">{budgets.select}</option>
                          <option value="small">{budgets.small}</option>
                          <option value="medium">{budgets.medium}</option>
                          <option value="large">{budgets.large}</option>
                          <option value="enterprise">{budgets.enterprise}</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t.contact.form.timeline}
                        </label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleChange}
                          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          dir={dir}
                        >
                          <option value="">{timelines.select}</option>
                          <option value="urgent">{timelines.urgent}</option>
                          <option value="short">{timelines.short}</option>
                          <option value="medium">{timelines.medium}</option>
                          <option value="long">{timelines.long}</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t.contact.form.message} <span className="text-destructive">*</span>
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t.contact.form.messagePlaceholder}
                        required
                        rows={5}
                        dir={dir}
                      />
                    </div>

                    {status === "error" && (
                      <div className="flex items-center gap-2 text-destructive">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">{t.contact.form.error}</span>
                      </div>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full gap-2"
                      disabled={status === "sending"}
                    >
                      {status === "sending" ? (
                        t.contact.form.sending
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          {t.contact.form.submit}
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-[#25D366]/20 to-[#25D366]/5 rounded-3xl border border-[#25D366]/30 p-8 sticky top-32">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-[#25D366]/20">
                    <MessageCircle className="h-6 w-6 text-[#25D366]" />
                  </div>
                  <h3 className="text-lg font-semibold">{t.contact.whatsapp.title}</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  {t.contact.whatsapp.description}
                </p>
                <Button
                  size="lg"
                  className="w-full gap-2 bg-[#25D366] hover:bg-[#25D366]/90 text-white"
                  asChild
                >
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    {t.contact.whatsapp.button}
                  </a>
                </Button>

                {/* Availability */}
                <div className="mt-8 pt-6 border-t border-[#25D366]/20">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
                    </span>
                    <span className="text-sm">
                      {t.contact.availability.available} {t.contact.availability.forProjects}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
