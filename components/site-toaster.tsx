"use client"

import dynamic from "next/dynamic"

export const SiteToaster = dynamic(
  () => import("@/components/toaster-ready").then((mod) => mod.ReadyToaster),
  { ssr: false },
)

export function whenToasterReady() {
  return import("@/components/toaster-ready").then((mod) => mod.whenToasterReady())
}
