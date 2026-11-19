import { describe, expect, it } from "vitest"
import { readFileSync } from "node:fs"
import { portfolioConfig } from "../lib/portfolio-config"
import { resumeEducation, resumeExperience, resumeLanguages, resumeSkills } from "../lib/portfolio-data"

const resumePage = readFileSync("app/resume/page.tsx", "utf8")
const resumeTemplate = readFileSync("components/resume-template.tsx", "utf8")

describe("portfolio and resume consistency", () => {
  it("uses the approved identity and public contact strategy", () => {
    expect(portfolioConfig).toMatchObject({
      name: "Mohamed Ezzat (Sonbol)",
      professionalTitle: "Digital Solutions & Technology Consultant",
      linkedin: "https://linkedin.com/in/mohamedsonbol",
    })
    expect(portfolioConfig).not.toHaveProperty("email")
    expect(portfolioConfig).not.toHaveProperty("phone")
    expect(portfolioConfig).not.toHaveProperty("location")
  })

  it("contains the approved experience, project, education, and language data", () => {
    expect(resumeExperience.map(({ company, dates }) => [company, dates])).toEqual([
      ["Freelance Web Developer", "July 2025 – Present"],
      ["Samsung SDS", "April 2024 – July 2025"],
      ["Accenture", "January 2021 – April 2024"],
    ])
    expect(resumeExperience[0].paragraphs.join(" ")).toContain("DR. CHOICE")
    expect(resumeExperience[0].paragraphs.join(" ")).toContain("OmPay")
    expect(JSON.stringify(resumeExperience)).not.toMatch(/Adel|Bebcard/i)
    expect(resumeExperience.every((item) => !("bullets" in item) && !("description" in item))).toBe(true)
    expect(resumeExperience.every(({ paragraphs }) => paragraphs.length >= 2 && paragraphs.length <= 3)).toBe(true)
    expect(resumeEducation).toEqual([{ institution: "Al Shola Private High School for Boys", dates: "2009 – 2013", qualification: "High School Diploma" }])
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
