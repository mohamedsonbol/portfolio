export type ProjectSource = "case-study" | "github" | "codepen"

export interface Project {
  id: string
  slug: string
  name: string
  category: string
  summary: string
  image: string
  tags: string[]
  source: ProjectSource
  language?: string
  sourceUrl?: string
  liveUrl?: string
}

export const featuredProjects: Project[] = [
  {
    id: "dr-choice",
    slug: "dr-choice",
    name: "DR. CHOICE",
    category: "E-Commerce",
    summary:
      "Bilingual e-commerce experience with product catalog, WooCommerce integration, and OmPay checkout.",
    image: "/dr-choice-hero.png",
    tags: ["WooCommerce", "JavaScript", "OmPay"],
    source: "case-study",
    sourceUrl: "https://dr-choice.com",
  },
  {
    id: "pioneera",
    slug: "pioneera",
    name: "Pioneera",
    category: "Full-Stack",
    summary:
      "Arabic digital publishing platform combining a Next.js frontend with an editorial CMS workflow.",
    image: "/pioneera-hero.png",
    tags: ["Next.js", "CMS", "TypeScript"],
    source: "case-study",
    sourceUrl: "https://pioneera.net",
  },
  {
    id: "sonbol-labs",
    slug: "sonbol-labs",
    name: "Sonbol Labs",
    category: "Experiments",
    summary:
      "A digital solutions and AI-focused development studio for practical product experiments.",
    image: "/sonbolabs-hero.png",
    tags: ["AI", "Product Strategy", "Web Apps"],
    source: "case-study",
    sourceUrl: "https://sonbolabs.exceptionalgrp.com",
  },
]

export const githubProjects: Project[] = [
  {
    id: "routing-app",
    slug: "routing-app",
    name: "routing-app",
    category: "Web Development",
    summary:
      "A routing application with dynamic navigation and state management, deployed on Vercel.",
    language: "JavaScript",
    tags: ["React", "Next.js", "Routing"],
    source: "github",
    sourceUrl: "https://github.com/mohamedsonbol/routing-app",
    liveUrl: "https://routing-app-two.vercel.app",
    image: "/developer-portfolio-website-dark-theme-modern.jpg",
  },
  {
    id: "moblog",
    slug: "moblog",
    name: "moBlog",
    category: "Full-Stack",
    summary:
      "A full-stack blog platform with user authentication, CRUD operations, and responsive design.",
    language: "EJS",
    tags: ["Node.js", "Express", "MongoDB", "EJS"],
    source: "github",
    sourceUrl: "https://github.com/mohamedsonbol/moBlog",
    liveUrl: "https://blogapp-f2xu.onrender.com/blogs",
    image: "/ai-content-generation-interface-dark.jpg",
  },
  {
    id: "react-gallery",
    slug: "react-gallery",
    name: "react-gallery",
    category: "Web Development",
    summary:
      "A React gallery app that fetches images from an API and displays them in a responsive grid using Material-UI.",
    language: "JavaScript",
    tags: ["React", "Material-UI", "API"],
    source: "github",
    sourceUrl: "https://github.com/mohamedsonbol/react-gallery",
    image: "/cloud-collaboration-dashboard-dark-theme.jpg",
  },
  {
    id: "yelp-camp-refactored",
    slug: "yelp-camp-refactored",
    name: "yelp-camp-refactored",
    category: "Full-Stack",
    summary:
      "Refactored YelpCamp project built with Express.js featuring authentication, authorization, and RESTful API design.",
    language: "JavaScript",
    tags: ["Express", "MongoDB", "REST API", "Auth"],
    source: "github",
    sourceUrl: "https://github.com/mohamedsonbol/yelp-camp-refactored",
    image: "/ecommerce-shopping-website-dark-theme.jpg",
  },
]

export const archiveProjects = githubProjects
