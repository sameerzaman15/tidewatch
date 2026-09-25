"use client"

import { useEffect, useRef, useState } from "react"

export function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return
    const node = ref.current
    if (!node) return

    let frame = 0
    let observer: IntersectionObserver | undefined

    const animateFromZero = () => {
      const start = performance.now()
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / 900)
        const eased = 1 - (1 - progress) ** 3
        setDisplay(value * eased)
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame((now) => {
        setDisplay(0)
        tick(now)
      })
    }

    const rect = node.getBoundingClientRect()
    const alreadyVisible = rect.top < window.innerHeight * 0.92 && rect.bottom > 0

    if (alreadyVisible) {
      animateFromZero()
    } else {
      frame = requestAnimationFrame(() => setDisplay(0))
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return
          observer?.disconnect()
          animateFromZero()
        },
        { threshold: 0.4 },
      )
      observer.observe(node)
    }

    return () => {
      cancelAnimationFrame(frame)
      observer?.disconnect()
    }
  }, [value])

  const text = decimals > 0 ? display.toFixed(decimals) : Math.round(display).toString()

  return (
    <span ref={ref} className="inline-block min-w-[4.5ch] font-mono tabular-nums">
      {prefix}
      {text}
      {suffix}
    </span>
  )
}
