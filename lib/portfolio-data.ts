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
  "WordPress",
  "WooCommerce",
  "Shopify",
  "Git/GitHub",
  "REST APIs",
  "Google Tag Manager",
  "GA4",
  "Adobe Analytics",
  "Adobe Launch",
  "Tealium",
] as const

export const resumeSkills = [
  { name: "Project Management", percentage: 100 },
  { name: "Critical Thinking", percentage: 90 },
  { name: "Communication", percentage: 90 },
  { name: "Technical Solutions", percentage: 90 },
  { name: "Research", percentage: 90 },
  { name: "Debugging", percentage: 90 },
  { name: "Full-Stack Development", percentage: null },
  { name: "Digital Analytics", percentage: null },
] as const

export const resumeExperience = [
  {
    company: "Samsung SDS",
    dates: "2024–Present",
    location: "Warsaw, Poland",
    role: "Technical Project Manager",
    description:
      "Coordinate technical project delivery across cross-functional teams, including Adobe Analytics, Adobe Launch, and Google Tag Manager implementations across client-side and server-side environments. Lead implementation planning, data-quality reviews, debugging, and delivery alignment with business requirements.",
  },
  {
    company: "Accenture",
    dates: "2021–2024",
    location: "Warsaw, Poland",
    role: "Digital Technical Analyst / Technical Support Specialist",
    description:
      "Supported clients with technical requirements, JavaScript debugging, API integrations, and digital analytics implementations. Investigated website and tracking issues, translated technical findings into practical guidance, and collaborated with teams on reliable client delivery.",
  },
] as const

export const resumeEducation = {
  institution: "Al Shola Private School",
  dates: "2010–2013",
  location: "Sharjah, United Arab Emirates",
  qualification: "High School Diploma (Mathematics)",
} as const

export const technologyGroups = [
  { label: "Frontend", items: ["JavaScript", "TypeScript", "React", "Next.js", "HTML", "CSS", "Tailwind"] },
  { label: "Backend", items: ["Node.js", "REST APIs", "PostgreSQL", "MongoDB", "Supabase"] },
  { label: "Analytics", items: ["GA4", "GTM", "Server-Side GTM", "Adobe Analytics", "Adobe Launch", "Tealium"] },
  { label: "Delivery", items: ["Git", "GitHub", "Docker", "Jira", "Vercel"] },
] as const
