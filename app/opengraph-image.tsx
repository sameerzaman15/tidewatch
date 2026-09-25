import { OgImage, ogContentType, ogSize } from "@/lib/og"

export const alt = "Tidewatch: Know it's down before your customers do."
export const size = ogSize
export const contentType = ogContentType

export default function OpenGraphImage() {
  return OgImage({
    title: "Know it's down before your customers do.",
    subtitle: "Uptime monitoring for small SaaS teams",
  })
}
