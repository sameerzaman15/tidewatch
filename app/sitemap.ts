import type { MetadataRoute } from "next"

import { getSiteUrl } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl()
  const paths = ["", "/contact", "/thanks", "/privacy", "/terms"]

  return paths.map((path) => ({
    url: new URL(path || "/", base).toString(),
    lastModified: new Date("2026-09-25"),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.6,
  }))
}
