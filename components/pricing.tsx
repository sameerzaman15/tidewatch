"use client"

import { CheckIcon, MinusIcon } from "lucide-react"
import { useState } from "react"
import { cn } from "cn"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { annualPrice, comparisonRows, plans, type ComparisonValue } from "@/lib/content"

export function Pricing() {
  const [annual, setAnnual] = useState(false)
  const [open, setOpen] = useState(false)

  return (
    <section className="bg-card/40 py-16 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-primary">Pricing</p>
            <h2
              id="pricing"
              className="mt-2 scroll-mt-24 font-heading text-3xl font-semibold tracking-tight text-balance md:text-4xl"
            >
              Simple plans. Annual saves 20%.
            </h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              Start with three monitors free. Move up when the team grows.
            </p>
          </div>
          <div className="flex min-h-11 items-center gap-3">
            <span className={cn("text-sm", !annual && "font-medium text-foreground")}>
              Monthly
            </span>
            <Switch
              checked={annual}
              onCheckedChange={setAnnual}
              aria-label="Annual billing"
            />
            <span className={cn("text-sm", annual && "font-medium text-foreground")}>
              Annual
            </span>
            <Badge variant="secondary">Save 20%</Badge>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {plans.map((plan) => {
            const price = annual ? annualPrice(plan.monthly) : String(plan.monthly)
            return (
              <article
                key={plan.name}
                className={cn(
                  "flex flex-col rounded-2xl border bg-card p-6",
                  plan.featured
                    ? "order-1 border-primary ring-2 ring-primary md:order-2"
                    : plan.name === "Hobby"
                      ? "order-2 md:order-1"
                      : "order-3",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-heading text-xl font-semibold">{plan.name}</h3>
                  {plan.featured ? <Badge>Most popular</Badge> : null}
                </div>
                <p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">
                  {plan.blurb}
                </p>
                <p className="mt-6 flex items-end gap-1" aria-live="polite">
                  <span className="sr-only">
                    ${price} per month{annual && plan.monthly > 0 ? ", billed annually" : ""}
                  </span>
                  <span
                    key={`${plan.name}-${annual ? "annual" : "monthly"}`}
                    aria-hidden="true"
                    className="price-pop inline-block font-mono text-4xl font-semibold tracking-tight"
                  >
                    ${price}
                  </span>
                  <span className="mb-1 text-sm text-muted-foreground">/mo</span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {plan.monthly === 0
                    ? "No card needed"
                    : annual
                      ? "Billed annually"
                      : "Billed monthly"}
                </p>
                <ul className="mt-6 space-y-2 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckIcon className="size-4 text-status-ok" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-8 w-full" variant={plan.featured ? "default" : "outline"}>
                  <a href="#waitlist">{plan.cta}</a>
                </Button>
              </article>
            )
          })}
        </div>

        <div className="mt-8">
          <Button
            type="button"
            variant="outline"
            className="md:hidden"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Hide full comparison" : "Compare all features"}
          </Button>
          <div className={cn("mt-4 max-w-full", open ? "block" : "hidden md:block")}>
            <div className="max-w-full overflow-x-auto rounded-2xl border border-border">
              <table className="w-full min-w-[40rem] border-collapse text-sm">
                <caption className="sr-only">Plan comparison</caption>
                <thead className="bg-muted/60">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left font-medium">
                      Feature
                    </th>
                    {plans.map((plan) => (
                      <th key={plan.name} scope="col" className="px-4 py-3 text-left font-medium">
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.label} className="border-t border-border">
                      <th scope="row" className="px-4 py-3 text-left font-normal">
                        {row.label}
                      </th>
                      {row.values.map((value, index) => (
                        <td key={`${row.label}-${index}`} className="px-4 py-3">
                          <Cell value={value} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Cell({ value }: { value: ComparisonValue }) {
  if (value === true) {
    return <CheckIcon className="size-4 text-status-ok" aria-label="Included" />
  }
  if (value === false) {
    return <MinusIcon className="size-4 text-muted-foreground" aria-label="Not included" />
  }
  return <span>{value}</span>
}
