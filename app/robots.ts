import type { MetadataRoute } from "next"
import { portfolioConfig } from "@/lib/portfolio-config"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    host: portfolioConfig.websiteUrl,
    sitemap: `${portfolioConfig.websiteUrl}/sitemap.xml`,
  }
}
