import { OgImage, ogContentType, ogSize } from "@/lib/og"

export const alt = "Talk to sales. Tidewatch concept demo."
export const size = ogSize
export const contentType = ogContentType

export default function ContactOpenGraphImage() {
  return OgImage({
    title: "Talk to sales.",
    subtitle: "A concept demo by Sameer Zaman",
  })
}
