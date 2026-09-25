import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "#0B1220",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            background: "#2DD4BF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="72" height="72" viewBox="0 0 32 32">
            <path
              d="M4 20c3.2-3.6 5.2-3.6 8.4 0s5.2 3.6 8.4 0 5.2-3.6 8.4 0"
              fill="none"
              stroke="#042F2E"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
            <path
              d="M4 13c3.2-3.6 5.2-3.6 8.4 0s5.2 3.6 8.4 0 5.2-3.6 8.4 0"
              fill="none"
              stroke="#042F2E"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    ),
    size,
  )
}
