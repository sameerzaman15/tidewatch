import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tidewatch",
    short_name: "Tidewatch",
    description: "Concept demo of an uptime monitoring and status page product.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B1220",
    theme_color: "#0F766E",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  }
}
