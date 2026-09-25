import { cn } from "cn"

const services = [
  {
    name: "API",
    state: "Operational",
    tone: "ok" as const,
    latency: "142 ms",
    marks: { 61: "warn" } as Record<number, "warn" | "down">,
  },
  {
    name: "Web app",
    state: "Operational",
    tone: "ok" as const,
    latency: "188 ms",
    marks: {} as Record<number, "warn" | "down">,
  },
  {
    name: "Checkout",
    state: "Degraded",
    tone: "warn" as const,
    latency: "640 ms",
    marks: { 48: "warn", 74: "down" } as Record<number, "warn" | "down">,
  },
]

const spark = [42, 40, 44, 38, 41, 46, 43, 39, 47, 52, 44, 41, 88, 70, 46, 40, 38, 36, 39, 37]

function barsBackground(marks: Record<number, "warn" | "down">) {
  const rects: string[] = []
  for (let index = 0; index < 90; index += 1) {
    const tone = marks[index] ?? "ok"
    const fill = tone === "down" ? "#F43F5E" : tone === "warn" ? "#F59E0B" : "#22C55E"
    rects.push(
      `<rect x="${index * 4}" y="0" width="3" height="24" rx="0.4" fill="${fill}"/>`,
    )
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 24" preserveAspectRatio="none">${rects.join("")}</svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

function Sparkline() {
  const width = 320
  const height = 52
  const max = Math.max(...spark)
  const min = Math.min(...spark)
  const points = spark
    .map((point, index) => {
      const x = (index / (spark.length - 1)) * width
      const y = height - ((point - min) / (max - min)) * (height - 8) - 4
      return `${x},${y}`
    })
    .join(" ")

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-12 w-full text-primary"
      role="img"
      aria-label="Response time over the last 24 hours"
    >
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={points}
      />
    </svg>
  )
}

export function ProductMock() {
  return (
    <div data-product-mock="" className="mock-enter relative">
      <div className="rounded-2xl border border-border bg-card p-4 shadow-[0_24px_60px_-28px_rgba(11,18,32,0.45)] sm:p-5 dark:shadow-none">
        <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
            <span className="size-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
            <span className="size-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
          </div>
          <p className="truncate font-mono text-xs text-muted-foreground">
            status.northpine.dev
          </p>
        </div>

        <p className="sr-only">Illustrated status board for the concept demo. Not live customer data.</p>

        <div className="mt-4 space-y-4">
          {services.map((service) => (
            <div key={service.name}>
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="font-medium">{service.name}</span>
                <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <span
                    className={cn(
                      "size-1.5 rounded-full",
                      service.tone === "warn" ? "bg-status-warn" : "bg-status-ok",
                    )}
                    aria-hidden="true"
                  />
                  {service.state}
                  <span>{service.latency}</span>
                </span>
              </div>
              <div
                className="mt-2 h-6"
                style={{
                  backgroundImage: barsBackground(service.marks),
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

        <div className="mt-5 border-t border-border pt-3">
          <div className="mb-1 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
            <span>Response time</span>
            <span>24h</span>
          </div>
          <Sparkline />
        </div>

        <div className="toast-enter mt-3 flex items-start gap-3 rounded-xl border border-[#22C55E]/30 bg-[#22C55E]/10 px-3 py-3">
          <span className="mt-1 size-2 shrink-0 rounded-full bg-status-ok" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium">Incident resolved</p>
            <p className="text-xs leading-5 text-muted-foreground">
              Checkout is operational again. Recovered in 4 minutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
