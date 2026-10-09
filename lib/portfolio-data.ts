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

export const technologyGroups = [
  { label: "Frontend", items: ["JavaScript", "TypeScript", "React", "Next.js", "HTML", "CSS", "Tailwind"] },
  { label: "Backend", items: ["Node.js", "REST APIs", "PostgreSQL", "MongoDB", "Supabase"] },
  { label: "Analytics", items: ["GA4", "GTM", "Server-Side GTM", "Adobe Analytics", "Adobe Launch", "Tealium"] },
  { label: "Delivery", items: ["Git", "GitHub", "Docker", "Jira", "Vercel"] },
] as const
