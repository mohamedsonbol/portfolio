export const portfolio = {
  name: "Mohamed Sonbol",
  location: "Warsaw, Poland",
  title: "Technical Project Manager & Full-Stack Developer",
  eyebrow: "TECHNICAL PROJECT MANAGER · FULL-STACK DEVELOPER",
  intro:
    "I build digital products, implement analytics systems, and connect business requirements with reliable technology.",
  social: {
    linkedin: "https://www.linkedin.com/in/mohamedsonbol/",
    instagram: "https://www.instagram.com/rastezzy/",
    github: "https://github.com/mohamedsonbol",
  },
} as const

export const featuredProjects = [
  {
    name: "DR. CHOICE",
    category: "E-Commerce",
    summary: "Bilingual e-commerce experience with product catalog, WooCommerce integration, and OMPAY checkout.",
    image: "/ecommerce-shopping-website-dark-theme.jpg",
    tags: ["WooCommerce", "JavaScript", "OMPAY"],
  },
  {
    name: "Pioneera",
    category: "Full-Stack",
    summary: "Arabic digital publishing platform combining a Next.js frontend with an editorial CMS workflow.",
    image: "/developer-portfolio-website-dark-theme-modern.jpg",
    tags: ["Next.js", "CMS", "TypeScript"],
  },
  {
    name: "Sonbol Labs",
    category: "Experiments",
    summary: "A digital solutions and AI-focused development studio for practical product experiments.",
    image: "/ai-content-generation-interface-dark.jpg",
    tags: ["AI", "Product Strategy", "Web Apps"],
  },
] as const

export const resumeTechnologies = [
  "JavaScript",
  "TypeScript",
  "Python",
  "React",
  "Next.js",
  "Node.js",
  "MongoDB",
  "PostgreSQL",
  "HTML",
  "CSS",
  "WordPress",
  "WooCommerce",
  "Shopify",
  "Git/GitHub",
  "REST APIs",
  "Selenium",
  "WebdriverIO",
  "Appium",
  "Google Tag Manager",
  "GA4",
  "Adobe Analytics",
  "Adobe Launch",
  "Tealium",
  "Looker",
  "Jira",
  "Salesforce",
  "GDPR compliance",
] as const

export const resumeSkills = [
  { name: "Project Management", percentage: 100 },
  { name: "Critical Thinking", percentage: 90 },
  { name: "Communication", percentage: 90 },
  { name: "Pressure Handling", percentage: 90 },
  { name: "Technical Solutions", percentage: 90 },
  { name: "Researching", percentage: 90 },
  { name: "Debugging", percentage: 90 },
] as const

export const resumeExpertise = [
  "Full-Stack Development", "Digital Analytics", "Quality Assurance", "Technical Support", "Project Delivery",
] as const

export const resumeExperience = [
  {
    company: "Sauce Labs",
    dates: "Jul 2025 – Oct 2025",
    location: "Warsaw, Poland",
    role: "Support Engineer",
    description: "Provided technical support for customers using web and mobile testing tools. Investigated issues, reproduced defects, analyzed test behavior, and communicated practical resolutions across customer and engineering teams.",
  },
  {
    company: "Samsung SDS",
    dates: "Apr 2024 – Jul 2025",
    location: "Warsaw, Poland",
    role: "Technical Project Manager",
    description: "Coordinated technical project delivery across cross-functional teams and supported Adobe Analytics, Adobe Launch, and Google Tag Manager implementations across client-side and server-side environments. Led implementation planning, data-quality reviews, debugging, and delivery alignment with business requirements.",
  },
  {
    company: "Accenture",
    dates: "Jan 2021 – Apr 2024",
    location: "Warsaw, Poland",
    role: "Technical Support Specialist",
    description: "Provided technical support for clients with JavaScript, APIs, websites, and digital analytics requirements. Debugged implementations, analyzed issues, shared technical guidance, and collaborated with team members on client delivery.",
  },
  {
    company: "Adel Abalkhail Real Estate",
    dates: "Oct 2018 – Jan 2020",
    location: "Dubai",
    role: "Technical Marketer",
    description: "Supported digital marketing activity and technical requirements for real estate campaigns, combining marketing coordination with website, analytics, and online content work.",
  },
  {
    company: "Bebcard",
    dates: "Dec 2017 – Mar 2018",
    location: "",
    role: "Frontend Developer",
    description: "Developed and maintained frontend interfaces, translating product requirements into responsive web experiences and supporting implementation fixes across the application.",
  },
] as const

export const resumeEducation = [
  {
    institution: "University of the People",
    dates: "Jan 2021 – Present",
    location: "",
    qualification: "Computer Science",
  },
  {
    institution: "Al Shola Private High School",
    dates: "2010 – 2013",
    location: "Sharjah, United Arab Emirates",
    qualification: "High School Diploma (Mathematics)",
  },
] as const

export const resumeLanguages = [
  { name: "English", level: "Native" },
  { name: "Arabic", level: "Native" },
  { name: "Polish", level: "Intermediate" },
] as const

export const technologyGroups = [
  { label: "Frontend", items: ["JavaScript", "TypeScript", "React", "Next.js", "HTML", "CSS", "Tailwind"] },
  { label: "Backend", items: ["Node.js", "REST APIs", "PostgreSQL", "MongoDB", "Supabase"] },
  { label: "Analytics", items: ["GA4", "GTM", "Server-Side GTM", "Adobe Analytics", "Adobe Launch", "Tealium"] },
  { label: "Delivery", items: ["Git", "GitHub", "Docker", "Jira", "Vercel"] },
] as const
