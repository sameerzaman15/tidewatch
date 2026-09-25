import { ImageResponse } from "next/og"

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = "image/png"

export function OgImage({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  const bars = Array.from({ length: 26 })

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B1220",
          color: "#F8FAFC",
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              background: "#2DD4BF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="36" height="36" viewBox="0 0 32 32">
              <path
                d="M4 20c3.2-3.6 5.2-3.6 8.4 0s5.2 3.6 8.4 0 5.2-3.6 8.4 0"
                fill="none"
                stroke="#042F2E"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <path
                d="M4 13c3.2-3.6 5.2-3.6 8.4 0s5.2 3.6 8.4 0 5.2-3.6 8.4 0"
                fill="none"
                stroke="#042F2E"
                strokeWidth="2.4"
                strokeLinecap="round"
                opacity="0.55"
              />
            </svg>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: -0.5 }}>
            Tidewatch
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -2,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 28, color: "#94A3B8" }}>{subtitle}</div>
          <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
            {bars.map((_, index) => (
              <div
                key={index}
                style={{
                  width: 16,
                  height: 28,
                  borderRadius: 3,
                  background: "#22C55E",
                }}
              />
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            color: "#94A3B8",
            fontSize: 22,
          }}
        >
          Concept by Sameer Zaman
        </div>
      </div>
    ),
    ogSize,
  )
}
