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
  resumeTechnologies,
} from "@/lib/portfolio-data"

export const metadata: Metadata = {
  title: "Resume | Mohamed Sonbol",
  description: "Professional resume of Mohamed Sonbol — Technical Project Manager and Full-Stack Developer.",
}

export default function ResumePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f1f3f4] text-slate-950">
      <Navigation />
      <section className="px-4 pb-10 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36">
        <article className="mx-auto w-full max-w-[1180px] rounded-[4px] border border-slate-200 bg-white px-5 py-7 shadow-[0_2px_5px_rgba(15,23,42,0.16)] sm:px-8 sm:py-9 lg:px-10 lg:py-10">
          <header className="grid gap-7 border-b border-slate-200 pb-9 md:grid-cols-[230px_minmax(0,1fr)] md:items-start md:gap-9 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12">
            <div className="flex justify-center md:justify-start">
              <Image
                src="/avatar-portrait.jpg"
                alt="Portrait of Mohamed Sonbol"
                width={280}
                height={280}
                priority
                className="h-48 w-48 rounded-full object-cover sm:h-56 sm:w-56 lg:h-[280px] lg:w-[280px]"
              />
            </div>
            <div className="min-w-0">
              <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">{portfolio.name}</h1>
              <p className="mt-1 text-lg text-slate-600">Technical Project Manager | Full-Stack Developer</p>
              <div className="mt-5 border-t border-slate-200 pt-5">
                <h2 className="text-2xl font-medium">Technologies</h2>
                <div className="mt-3 flex flex-wrap gap-2" aria-label="Technologies">
                  {resumeTechnologies.map((technology) => (
                    <span key={technology} className="max-w-full rounded-full border border-[#8bbcf1] px-3.5 py-1.5 text-sm leading-5 text-[#146dcc]">
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
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="h-1 min-w-0 flex-1 bg-[#a9c9e9]" role="progressbar" aria-label={`${skill.name}: ${skill.percentage}%`} aria-valuenow={skill.percentage} aria-valuemin={0} aria-valuemax={100}>
                      <div className="h-full bg-[#1677c8]" style={{ width: `${skill.percentage}%` }} />
                    </div>
                    <span className="w-9 shrink-0 text-right text-sm text-slate-600">{skill.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 border-t border-slate-200 pt-5">
              <h3 className="text-lg font-medium">Expertise</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {resumeExpertise.map((item) => <span key={item} className="rounded-full border border-[#8bbcf1] px-3.5 py-1.5 text-sm text-[#146dcc]">{item}</span>)}
              </div>
            </div>
          </ResumeSection>

          <ResumeSection title="Experience">
            <div className="divide-y divide-slate-200">
              {resumeExperience.map((experience) => (
                <section key={`${experience.company}-${experience.role}`} className="py-5 first:pt-0 last:pb-0">
                  <h3 className="text-xl font-medium">{experience.company}</h3>
                  <p className="mt-1 text-base text-slate-600">{experience.dates}{experience.location ? ` | ${experience.location}` : ""}</p>
                  <p className="mt-1 font-medium">{experience.role}</p>
                  <p className="mt-1 max-w-5xl text-sm leading-6 text-slate-600">{experience.description}</p>
                </section>
              ))}
            </div>
          </ResumeSection>

          <ResumeSection title="Education">
            <div className="divide-y divide-slate-200">
              {resumeEducation.map((education) => (
                <section key={education.institution} className="py-5 first:pt-0 last:pb-0">
                  <h3 className="text-xl font-medium">{education.institution}</h3>
                  <p className="mt-1 text-base text-slate-600">{education.dates}{education.location ? ` | ${education.location}` : ""}</p>
                  <p className="mt-1 text-sm text-slate-600">{education.qualification}</p>
                </section>
              ))}
            </div>
          </ResumeSection>

          <ResumeSection title="Languages">
            <div className="grid gap-3 sm:grid-cols-3">
              {resumeLanguages.map((language) => (
                <div key={language.name} className="flex items-center justify-between border-b border-slate-200 pb-2 sm:block sm:border-0 sm:pb-0">
                  <span className="font-medium">{language.name}</span>
                  <span className="text-slate-600 sm:ml-2">— {language.level}</span>
                </div>
              ))}
            </div>
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
