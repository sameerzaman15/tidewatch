import { CountUp } from "@/components/count-up"
import { Reveal } from "@/components/motion-bits"
import { wordmarks } from "@/lib/content"

const stats = [
  { value: 30, suffix: "s", label: "check interval" },
  { value: 12, suffix: "", label: "regions" },
  { value: 60, prefix: "< ", suffix: "s", label: "alert time" },
  { value: 99.99, suffix: "%", decimals: 2, label: "uptime SLA" },
]

export function SocialProof() {
  return (
    <section className="border-y border-border bg-card/50 py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <h2 className="text-center text-sm font-medium tracking-wide text-muted-foreground uppercase">
            Trusted by teams shipping every day
          </h2>
          <ul className="mt-8 grid grid-cols-2 items-center gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
            {wordmarks.map((name) => (
              <li key={name} className="flex justify-center">
                <Wordmark name={name} />
              </li>
            ))}
          </ul>
        </Reveal>
        <dl className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-background px-4 py-5">
              <dd className="font-heading text-3xl font-semibold tracking-tight">
                <CountUp
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </dd>
              <dt className="mt-1 text-sm text-muted-foreground">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Wordmark({ name }: { name: string }) {
  const width = name.length * 13
  return (
    <svg
      width={width}
      height="32"
      viewBox={`0 0 ${width} 32`}
      role="img"
      aria-label={name}
      className="h-8 max-w-full text-slate-400 dark:text-slate-500"
    >
      <text
        x="0"
        y="23"
        fill="currentColor"
        fontSize="20"
        fontWeight="600"
        letterSpacing="-0.4"
        style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
      >
        {name}
      </text>
    </svg>
  )
}
