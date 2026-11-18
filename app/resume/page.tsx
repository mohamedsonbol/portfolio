import type { Metadata } from "next"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  portfolio,
  resumeEducation,
  resumeExperience,
  resumeExpertise,
  resumeLanguages,
  resumeSkills,
} from "@/lib/portfolio-data"
import { portfolioConfig } from "@/lib/portfolio-config"

export const metadata: Metadata = {
  title: `Resume | ${portfolioConfig.name} | Digital Solutions & Technology Consultant`,
  description: `Professional resume of ${portfolioConfig.name} — Digital Solutions & Technology Consultant specialising in web development, e-commerce, digital analytics, integrations and AI-assisted automation.`,
  alternates: { canonical: "/resume" },
  openGraph: {
    title: `Resume | ${portfolioConfig.name} | Digital Solutions & Technology Consultant`,
    description: `Professional resume of ${portfolioConfig.name} — Digital Solutions & Technology Consultant specialising in web development, e-commerce, digital analytics, integrations and AI-assisted automation.`,
    url: "/resume",
    siteName: portfolioConfig.name,
    type: "profile",
    images: [{ url: portfolioConfig.socialImage, width: 1254, height: 1254, alt: "Portrait of Mohamed Sonbol" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Resume | ${portfolioConfig.name} | Digital Solutions & Technology Consultant`,
    description: `Professional resume of ${portfolioConfig.name} — Digital Solutions & Technology Consultant specialising in web development, e-commerce, digital analytics, integrations and AI-assisted automation.`,
    images: [portfolioConfig.socialImage],
  },
}

export default function ResumePage() {
  return (
    <main id="main-content" className="resume-page min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="print:hidden"><Navigation /></div>
      <section className="px-4 pb-16 pt-32 sm:px-6 lg:px-8 lg:pt-40 print:px-0 print:pb-0 print:pt-0">
        <article className="resume-document mx-auto w-full max-w-[1080px] rounded-2xl border border-border bg-[#F7F7F7] px-5 py-7 text-[#0A0A0A] shadow-2xl shadow-black/20 sm:px-8 sm:py-9 lg:px-12 lg:py-11 print:max-w-none print:rounded-none print:border-0 print:p-0 print:shadow-none">
          <header className="grid gap-7 border-b-2 border-[#8B5CF6] pb-8 md:grid-cols-[180px_minmax(0,1fr)] md:items-start md:gap-9 print:grid-cols-[150px_minmax(0,1fr)] print:gap-7 print:pb-6">
            <div className="flex justify-center md:justify-start">
              <Image
                src="/images/profile/portfolio-portrait-1.png"
                alt="Mohamed Ezzat Sonbol"
                width={240}
                height={240}
                priority
                className="h-44 w-44 rounded-2xl object-cover grayscale-[10%] sm:h-48 sm:w-48 print:h-36 print:w-36"
              />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#5B21B6]">Digital Solutions &amp; Technology Consultant</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl print:text-4xl">{portfolio.name}</h1>
              <p className="mt-2 text-lg font-medium text-[#5B21B6]">Digital Solutions &amp; Technology Consultant</p>
              <p className="mt-5 max-w-3xl text-sm leading-6 text-[#525252]">
                Digital solutions and technology consultant specialising in web development, e-commerce, digital analytics, integrations and AI-assisted automation. Diagnoses implementation issues, validates tracking and coordinates technical delivery.
              </p>
              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#525252]">
                <a href={portfolioConfig.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#5B21B6]">LinkedIn</a>
                <a href={portfolioConfig.websiteUrl} target="_blank" rel="noreferrer" className="hover:text-[#5B21B6]">Website</a>
              </div>
            </div>
          </header>

          <ResumeSection title="Core skills">
            <div className="flex flex-wrap gap-2">
              {resumeSkills.map((skill) => <span key={skill} className="rounded-full border border-[#C4B5FD] bg-[#EDE9FE] px-3 py-1.5 text-xs font-medium text-[#5B21B6]">{skill}</span>)}
            </div>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#DEDEDE] pt-5 text-sm font-medium text-[#5B21B6]">
              {resumeExpertise.map((item) => <span key={item}>{item}</span>)}
            </div>
          </ResumeSection>

          <ResumeSection title="Professional experience">
            <div className="space-y-8">
              {resumeExperience.map((experience) => (
                <section key={`${experience.company}-${experience.role}`} className="grid gap-2 border-l-2 border-[#8B5CF6] pl-5 print:break-inside-avoid md:grid-cols-[190px_minmax(0,1fr)] md:gap-7">
                  <div>
                    <p className="font-mono text-xs font-semibold leading-5 text-[#5B21B6]">{experience.dates}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{experience.company}</h3>
                    <p className="mt-1 text-sm font-medium text-[#5B21B6]">{experience.role}</p>
                    <p className="mt-3 text-sm leading-6 text-[#525252]">
                      {experience.company === "Samsung SDS"
                        ? "Performed QA on first-party tagging across multiple languages across the EU for multiple flagship product launches, using Python. Owned technical sign-off, debugging, validation, and coordination across implementation and business teams."
                        : experience.description}
                    </p>
                    {experience.bullets.length > 0 && (
                      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-[#525252]">
                        {experience.bullets.map((bullet) =>
                          experience.company === "Samsung SDS" && bullet.startsWith("Performed QA on first-party tagging across multiple languages across the EU")
                            ? null
                            : (
                                <li key={bullet}>{bullet}</li>
                              ),
                        )}
                      </ul>
                    )}
                  </div>
                </section>
              ))}
            </div>
          </ResumeSection>

          <div className="grid gap-8 md:grid-cols-2 print:grid-cols-2 print:gap-8">
            <ResumeSection title="Education">
              {resumeEducation.map((education) => (
                <div key={education.institution} className="print:break-inside-avoid">
                  <h3 className="text-base font-semibold">{education.qualification}</h3>
                  <p className="mt-1 text-sm text-[#525252]">{education.institution}</p>
                  <p className="mt-1 font-mono text-xs text-[#5B21B6]">{education.dates}</p>
                </div>
              ))}
            </ResumeSection>
            <ResumeSection title="Languages">
              <div className="space-y-2">
                {resumeLanguages.map((language) => (
                  <div key={language.name} className="flex justify-between gap-4 text-sm print:break-inside-avoid">
                    <span className="font-medium">{language.name}</span>
                    <span className="text-[#525252]">{language.level}</span>
                  </div>
                ))}
              </div>
            </ResumeSection>
          </div>
        </article>
      </section>
      <div className="print:hidden"><Footer /></div>
      <style>{`
        @page { size: A4; margin: 0.45in; }
        @media print {
          html, body { background: #F7F7F7 !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .resume-page { min-height: 0 !important; }
          .resume-document { color-adjust: exact; }
        }
      `}</style>
    </main>
  )
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-[#DEDEDE] py-7 last:border-b-0 print:break-inside-avoid print:py-5" aria-labelledby={`${title.toLowerCase().replaceAll(" ", "-")}-heading`}>
      <h2 id={`${title.toLowerCase().replaceAll(" ", "-")}-heading`} className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#5B21B6]">{title}</h2>
      {children}
    </section>
  )
}
