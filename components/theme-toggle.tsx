"use client"

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "cn"

import { useIsClient } from "@/components/use-is-client"
import { Button } from "@/components/ui/button"

const order = ["system", "light", "dark"] as const

const labels: Record<(typeof order)[number], string> = {
  system: "Theme is system. Switch to light.",
  light: "Theme is light. Switch to dark.",
  dark: "Theme is dark. Switch to system.",
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const mounted = useIsClient()

  if (!mounted) {
    return <span className={cn("inline-flex size-11", className)} aria-hidden />
  }

  const current = order.includes(theme as (typeof order)[number])
    ? (theme as (typeof order)[number])
    : "system"
  const next = order[(order.indexOf(current) + 1) % order.length]
  const Icon = current === "dark" ? MoonIcon : current === "light" ? SunIcon : MonitorIcon

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className={className}
      aria-label={labels[current]}
      onClick={() => setTheme(next)}
    >
      <Icon />
    </Button>
  )
}

export function ThemeSegment({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const mounted = useIsClient()

  const options = [
    { value: "light", label: "Light", icon: SunIcon },
    { value: "dark", label: "Dark", icon: MoonIcon },
    { value: "system", label: "System", icon: MonitorIcon },
  ] as const

  return (
    <div
      role="group"
      aria-label="Theme"
      className={cn(
        "inline-flex rounded-full border border-border bg-card p-1",
        className,
      )}
    >
      {options.map((option) => {
        const selected = mounted && theme === option.value
        const Icon = option.icon
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            className={cn(
              "inline-flex h-11 items-center gap-1.5 rounded-full px-3 text-sm font-medium",
              selected
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
            onClick={() => setTheme(option.value)}
          >
            <Icon className="size-4" />
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
