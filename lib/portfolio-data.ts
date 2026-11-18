import { portfolioConfig } from "@/lib/portfolio-config"

export const portfolio = {
  ...portfolioConfig,
  title: portfolioConfig.professionalTitle,
  eyebrow: "Digital Solutions & Technology Consultant",
  intro: portfolioConfig.professionalSummary,
} as const

export { featuredProjects } from "@/lib/projects"

const resumeTechnologies = [
  "JavaScript debugging",
  "Browser console",
  "Network inspection",
  "Postman",
  "Terminal",
  "Root cause analysis",
  "SLA-driven incident management",
  "Google tagging",
  "Adobe data collection",
  "Server-side API validation",
  "Contentsquare",
  "Awin",
  "Jira",
  "Salesforce",
  "Zendesk",
  "Google Apps Script",
  "Python",
  "WordPress",
] as const

export const resumeSkills = [
  "JavaScript debugging",
  "Browser console",
  "Network inspection",
  "Postman",
  "Terminal",
  "Root cause analysis",
  "SLA-driven incident management",
  "Google tagging",
  "Adobe data collection",
  "Server-side API validation",
  "Contentsquare",
  "Awin",
  "Jira",
  "Salesforce",
  "Zendesk",
  "Google Apps Script",
  "Python",
  "WordPress",
] as const

export const resumeExpertise = [
  "Debugging and support",
  "Tracking and integrations",
  "Tools and automation",
] as const

export const resumeExperience = [
  {
    company: "Freelance Web Developer",
    dates: "July 2025 – Present",
    role: "Freelance Web Developer",
    description: "Built client websites linking frontends to backend APIs with AI-assisted development. DR. CHOICE (dr-choice.com), Oman e-commerce: built a bilingual WordPress/WooCommerce store and integrated the OmPay payment gateway.",
    bullets: [
      "Built client websites linking frontends to backend APIs with AI-assisted development.",
      "Built DR. CHOICE, a bilingual WordPress/WooCommerce store for Oman, and integrated the OmPay payment gateway.",
    ],
  },
  {
    company: "Samsung SDS",
    dates: "April 2024 – July 2025",
    role: "Technical Project Manager (Web Analytics & Integrations)",
    description: "Performed QA on first-party tagging across multiple languages across the EU for multiple flagship product launches, using Python. Owned technical sign-off, debugging, validation, and coordination across implementation and business teams.",
    bullets: [
      "Performed QA on first-party tagging across multiple languages across the EU for multiple flagship product launches, using Python.",
      "Approved technical implementations, mainly for Contentsquare, and handed them to the tagging team to build; owned the sign-off step.",
      "Debugged Google and Adobe data collection implementations and troubleshot live third-party integrations, including Contentsquare and Awin, using the terminal and vendor debugging extensions.",
      "Validated data with stakeholders and third-party vendors, ensuring correct data flow between Contentsquare and Samsung.",
      "Coordinated technical and business teams, resolved delivery blockers, and improved KPI reporting.",
    ],
  },
  {
    company: "Accenture",
    dates: "January 2021 – April 2024",
    role: "Customer Support Representative",
    description: "Delivered technical support to enterprise clients, managing critical incidents within strict SLA targets and debugging tagging, data collection, and API implementations.",
    bullets: [
      "Delivered technical support to enterprise clients, managing critical incidents within strict SLA targets using Jira, Salesforce, and Zendesk.",
      "Debugged Google tagging and Adobe data collection implementations using the browser console, network tab, terminal, and Postman, recommending JavaScript fixes.",
      "Validated server-side API implementations (Convergent API), testing against client documentation and investigating data discrepancies.",
      "Built a Google Sheets tool for the support team using Google Apps Script and Gmail to filter, track, and distribute ticket data, plus a browser extension that sped up troubleshooting.",
      "Led root cause analysis on recurring incidents and worked with cross-functional teams to reduce repeat issues and raise client satisfaction.",
    ],
  },
  {
    company: "Adel Abalkhail Real Estate",
    dates: "2018 – 2020",
    role: "Sales and Marketing Specialist",
    description: "Earlier experience in sales and marketing.",
    bullets: [],
  },
  {
    company: "Bebcard",
    dates: "2015 – 2017",
    role: "Frontend Developer",
    description: "Earlier frontend development experience focused on WordPress websites.",
    bullets: [],
  },
] as const

export const resumeEducation = [
  {
    institution: "Al Shola Private High School for Boys",
    dates: "2009 – 2013",
    qualification: "High School Diploma",
  },
] as const

export const resumeLanguages = [
  { name: "English", level: "Native" },
  { name: "Arabic", level: "Native" },
  { name: "Polish", level: "Beginner" },
] as const

export { resumeTechnologies }

export const technologyGroups = [
  { label: "Debugging and support", items: ["JavaScript debugging", "Browser console", "Network inspection", "Postman", "Terminal", "Root cause analysis", "SLA-driven incident management"] },
  { label: "Tracking and integrations", items: ["Google tagging", "Adobe data collection", "Server-side API validation", "Contentsquare", "Awin"] },
  { label: "Tools", items: ["Jira", "Salesforce", "Zendesk", "Google Apps Script", "Python", "WordPress"] },
] as const
