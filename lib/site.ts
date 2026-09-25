export const siteName = "Tidewatch"

export const siteDescription =
  "Uptime checks every 30 seconds, instant alerts, and a status page for small SaaS teams. Concept demo by Sameer Zaman."

export const builderUrl = "https://sameer-zaman.vercel.app"

export const demoEmailNote =
  "This is a demo, so your email is only kept temporarily."

export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000"
  try {
    return new URL(raw).origin
  } catch {
    return "http://localhost:3000"
  }
}
