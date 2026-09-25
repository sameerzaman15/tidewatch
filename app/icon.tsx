import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          background: "#0F766E",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 32 32">
          <path
            d="M4 20c3.2-3.6 5.2-3.6 8.4 0s5.2 3.6 8.4 0 5.2-3.6 8.4 0"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M4 13c3.2-3.6 5.2-3.6 8.4 0s5.2 3.6 8.4 0 5.2-3.6 8.4 0"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    size,
  )
}
