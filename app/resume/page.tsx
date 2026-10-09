import type { Metadata } from "next"
import Image from "next/image"
import { Download } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { portfolio, resumeEducation, resumeExperience, resumeSkills, resumeTechnologies } from "@/lib/portfolio-data"

export const metadata: Metadata = {
  title: "Resume | Mohamed Sonbol",
  description: "Professional resume of Mohamed Sonbol — Technical Project Manager and Full-Stack Developer.",
}

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-[#f1f3f4] text-slate-950">
      <Navigation />
      <section className="px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <article className="mx-auto max-w-[1180px] rounded-[4px] border border-slate-200 bg-white px-6 py-8 shadow-[0_2px_5px_rgba(15,23,42,0.16)] sm:px-8 lg:px-10 lg:py-10">
          <header className="grid gap-8 border-b border-slate-200 pb-10 md:grid-cols-[300px_minmax(0,1fr)] md:items-center lg:gap-12">
            <div className="flex justify-center md:justify-start">
              <Image
                src="/avatar-portrait.jpg"
                alt="Portrait of Mohamed Sonbol"
                width={280}
                height={280}
                priority
                className="h-52 w-52 rounded-full object-cover sm:h-60 sm:w-60 lg:h-[280px] lg:w-[280px]"
              />
            </div>
            <div>
              <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">{portfolio.name}</h1>
                  <p className="mt-1 text-lg text-slate-600">Technical Project Manager | Full-Stack Developer</p>
                </div>
                <a
                  href="/Resume.pdf"
                  download="Mohamed-Sonbol-Resume.pdf"
                  className="inline-flex w-fit shrink-0 items-center gap-2 rounded-md bg-[#1677c8] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1267ad] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1677c8]"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download PDF
                </a>
              </div>
              <div className="pt-5">
                <h2 className="text-2xl font-medium">Technologies</h2>
                <div className="mt-3 flex flex-wrap gap-2" aria-label="Technologies">
                  {resumeTechnologies.map((technology) => (
                    <span key={technology} className="rounded-full border border-[#8bbcf1] px-4 py-1.5 text-sm text-[#146dcc]">
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </header>

          <ResumeSection title="Skills">
            <div className="space-y-5">
              {resumeSkills.map((skill) => (
                <div key={skill.name} className="grid gap-2 sm:grid-cols-[230px_minmax(0,1fr)] sm:items-center sm:gap-6">
                  <span className="text-base">{skill.name}</span>
                  {skill.percentage === null ? (
                    <span className="text-sm text-slate-500">Experience demonstrated across projects and delivery work</span>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="h-1 w-full bg-[#a9c9e9]" role="progressbar" aria-label={`${skill.name}: ${skill.percentage}%`} aria-valuenow={skill.percentage} aria-valuemin={0} aria-valuemax={100}>
                        <div className="h-full bg-[#1677c8]" style={{ width: `${skill.percentage}%` }} />
                      </div>
                      <span className="w-9 text-right text-sm text-slate-600">{skill.percentage}%</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ResumeSection>

          <ResumeSection title="Experience">
            <div className="divide-y divide-slate-200">
              {resumeExperience.map((experience) => (
                <section key={experience.company} className="py-5 first:pt-0 last:pb-0">
                  <h3 className="text-xl font-medium">{experience.company}</h3>
                  <p className="mt-1 text-base text-slate-600">{experience.dates} | {experience.location}</p>
                  <p className="mt-1 font-medium">{experience.role}</p>
                  <p className="mt-1 max-w-5xl text-sm leading-6 text-slate-600">{experience.description}</p>
                </section>
              ))}
            </div>
          </ResumeSection>

          <ResumeSection title="Education">
            <h3 className="text-xl font-medium">{resumeEducation.institution}</h3>
            <p className="mt-1 text-base text-slate-600">{resumeEducation.dates} | {resumeEducation.location}</p>
            <p className="mt-1 text-sm text-slate-600">{resumeEducation.qualification}</p>
          </ResumeSection>
        </article>
      </section>
      <Footer />
    </main>
  )
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-slate-200 py-8 last:border-b-0 lg:py-9" aria-labelledby={`${title.toLowerCase()}-heading`}>
      <h2 id={`${title.toLowerCase()}-heading`} className="mb-7 text-2xl font-medium">{title}</h2>
      {children}
    </section>
  )
}
