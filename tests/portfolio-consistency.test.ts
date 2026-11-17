import { describe, expect, it } from "vitest"
import { readFileSync } from "node:fs"
import { portfolioConfig } from "../lib/portfolio-config"
import { resumeEducation, resumeExperience, resumeLanguages, resumeSkills } from "../lib/portfolio-data"

const resumePage = readFileSync("app/resume/page.tsx", "utf8")
const resumeTemplate = readFileSync("components/resume-template.tsx", "utf8")

describe("portfolio and resume consistency", () => {
  it("uses the approved identity and contact details", () => {
    expect(portfolioConfig).toMatchObject({
      name: "Mohamed Ezzat (Sonbol)",
      professionalTitle: "Technical Support Engineer | JavaScript | Integrations",
      location: "Warsaw, Poland",
      email: "mhmdezzat.eng@gmail.com",
      phone: "+48 732 785 743",
      linkedin: "https://linkedin.com/in/mohamedsonbol",
    })
  })

  it("contains the approved experience, project, education, and language data", () => {
    expect(resumeExperience.map(({ company, dates }) => [company, dates])).toEqual([
      ["Freelance Web Developer", "July 2025 – Present"],
      ["Samsung SDS", "April 2024 – July 2025"],
      ["Accenture", "January 2021 – April 2024"],
      ["Adel Abalkhail Real Estate", "2018 – 2020"],
      ["Bebcard", "2015 – 2017"],
    ])
    expect(resumeExperience[0].description).toContain("DR. CHOICE")
    expect(resumeExperience[0].description).toContain("OmPay")
    expect(resumeEducation).toEqual([{ institution: "Al Shola Private High School for Boys", dates: "2009 – 2013", location: "", qualification: "High School Diploma" }])
    expect(resumeEducation.some((item) => /university|bachelor|master|degree/i.test(JSON.stringify(item)))).toBe(false)
    expect(resumeLanguages).toEqual([
      { name: "English", level: "Native" },
      { name: "Arabic", level: "Native" },
      { name: "Polish", level: "Beginner" },
    ])
    expect(resumeSkills).toContain("JavaScript debugging")
  })

  it("has shared-data consumers", () => {
    expect(resumePage).toContain("resumeExperience")
    expect(resumePage).toContain("resumeEducation")
    expect(resumePage).toContain("portfolioConfig.websiteUrl")
    expect(resumeTemplate).toContain("resumeExperience.map")
    expect(resumeTemplate).toContain("resumeEducation.map")
  })
})
