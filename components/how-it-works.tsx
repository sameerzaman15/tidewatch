import { BellIcon, GlobeIcon, LinkIcon } from "lucide-react"

import { Stagger, StaggerItem } from "@/components/motion-bits"
import { steps } from "@/lib/content"

const icons = [LinkIcon, BellIcon, GlobeIcon]

export function HowItWorks() {
  return (
    <section className="py-16 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">How it works</p>
          <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            From a URL to a page your customers can trust
          </h2>
        </div>
        <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = icons[index] ?? LinkIcon
            return (
              <StaggerItem key={step.title} className="h-full" delay={index * 0.06}>
                <article className="h-full rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-primary">
                      0{index + 1}
                    </span>
                    <span className="inline-flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                  </div>
                  <h3 className="mt-6 font-heading text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.body}</p>
                </article>
              </StaggerItem>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
