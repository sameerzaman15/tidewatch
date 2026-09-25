"use client"

import { LazyMotion, MotionConfig, domAnimation, m, useReducedMotion } from "motion/react"

import { useIsClient } from "@/components/use-is-client"

const viewport = { once: true, amount: 0.2 } as const
const ease = [0.22, 1, 0.36, 1] as const

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()
  const ready = useIsClient()

  if (!ready || reduce !== false) {
    return (
      <div className={className} data-reveal="">
        {children}
      </div>
    )
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <m.div
          className={className}
          data-reveal=""
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, delay, ease }}
        >
          {children}
        </m.div>
      </MotionConfig>
    </LazyMotion>
  )
}

export function Stagger({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()
  const ready = useIsClient()

  if (!ready || reduce !== false) {
    return <div className={className}>{children}</div>
  }

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <m.div
          className={className}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {children}
        </m.div>
      </MotionConfig>
    </LazyMotion>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()
  const ready = useIsClient()

  if (!ready || reduce !== false) {
    return (
      <div className={className} data-reveal="">
        {children}
      </div>
    )
  }

  return (
    <m.div
      className={className}
      data-reveal=""
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
      }}
    >
      {children}
    </m.div>
  )
}
