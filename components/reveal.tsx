"use client"

import { useEffect, useRef, type ReactNode } from "react"

function usePlayOnView(delay: number) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const play = () => {
      if (delay > 0) node.style.animationDelay = `${delay}s`
      node.dataset.reveal = "play"
    }

    const rect = node.getBoundingClientRect()
    const inView = rect.top < window.innerHeight * 0.9 && rect.bottom > 0
    if (inView) {
      play()
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        observer.disconnect()
        play()
      },
      { threshold: 0.15 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [delay])

  return ref
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = usePlayOnView(delay)
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

export function Stagger({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={className}>{children}</div>
}

export function StaggerItem({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = usePlayOnView(delay)
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
