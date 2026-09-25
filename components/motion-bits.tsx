"use client"

import dynamic from "next/dynamic"

export const Reveal = dynamic(() =>
  import("@/components/reveal").then((mod) => mod.Reveal),
)

export const Stagger = dynamic(() =>
  import("@/components/reveal").then((mod) => mod.Stagger),
)

export const StaggerItem = dynamic(() =>
  import("@/components/reveal").then((mod) => mod.StaggerItem),
)
