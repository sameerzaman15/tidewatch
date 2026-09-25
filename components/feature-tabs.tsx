"use client"

import type { ReactNode } from "react"
import { useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const monitors = [
  ["api.northpine.dev", "Operational", "142 ms", "ok"],
  ["app.northpine.dev", "Operational", "188 ms", "ok"],
  ["checkout.northpine.dev", "Degraded", "640 ms", "warn"],
  ["hooks.quillstack.dev", "Operational", "96 ms", "ok"],
] as const

export function FeatureTabs() {
  const [value, setValue] = useState("monitors")

  return (
    <section className="py-16 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">A closer look</p>
          <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            Monitors, a public page, and the alert that lands
          </h2>
        </div>
        <Tabs value={value} onValueChange={setValue} className="mt-8">
          <TabsList className="h-auto! w-full max-w-full justify-start overflow-x-auto rounded-full bg-muted p-1">
            <TabsTrigger value="monitors" className="h-11 shrink-0 rounded-full px-4">
              Monitors
            </TabsTrigger>
            <TabsTrigger value="status" className="h-11 shrink-0 rounded-full px-4">
              Status page
            </TabsTrigger>
            <TabsTrigger value="alerts" className="h-11 shrink-0 rounded-full px-4">
              Alerts
            </TabsTrigger>
          </TabsList>
          <Panel value="monitors">
            <ul className="divide-y divide-border">
              {monitors.map(([name, state, latency, tone]) => (
                <li key={name} className="flex items-center justify-between gap-3 py-3">
                  <span className="min-w-0 truncate font-mono text-sm">{name}</span>
                  <span className="flex shrink-0 items-center gap-2 text-sm text-muted-foreground">
                    <span
                      className={tone === "warn" ? "size-2 rounded-full bg-status-warn" : "size-2 rounded-full bg-status-ok"}
                      aria-hidden="true"
                    />
                    {state}
                    <span className="font-mono text-xs">{latency}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel value="status">
            <div className="overflow-hidden rounded-xl border border-border">
              <div className="bg-primary px-4 py-3 text-sm font-medium text-primary-foreground">
                Northpine status
              </div>
              <div className="space-y-3 p-4">
                <p className="text-sm font-medium">All systems operational</p>
                {["API", "Web app", "Checkout"].map((name) => (
                  <div key={name} className="flex items-center justify-between text-sm">
                    <span>{name}</span>
                    <span className="text-muted-foreground">Operational</span>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground">Subscribe to updates by email.</p>
              </div>
            </div>
          </Panel>
          <Panel value="alerts">
            <div className="rounded-xl border border-border bg-background p-4">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Alert
              </p>
              <p className="mt-2 font-heading text-xl font-semibold">
                Checkout is down in two regions.
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Sent to the on-call rotation in under a minute.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {["Slack", "Email", "SMS", "Webhook"].map((chip) => (
                  <li
                    key={chip}
                    className="rounded-full border border-border px-3 py-1 text-xs font-medium"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            </div>
          </Panel>
        </Tabs>
      </div>
    </section>
  )
}

function Panel({
  value,
  children,
}: {
  value: string
  children: ReactNode
}) {
  return (
    <TabsContent value={value} className="mt-4 min-h-[280px] rounded-2xl border border-border bg-card p-4 sm:p-6">
      <div className="panel-fade">{children}</div>
    </TabsContent>
  )
}
