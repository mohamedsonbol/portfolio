import type { MetadataRoute } from "next"
import { portfolioConfig } from "@/lib/portfolio-config"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: portfolioConfig.websiteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${portfolioConfig.websiteUrl}/projects`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${portfolioConfig.websiteUrl}/resume`, changeFrequency: "monthly", priority: 0.8 },
  ]
}
