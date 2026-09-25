"use client"

import { useEffect, type ComponentProps } from "react"

import { Toaster } from "@/components/ui/sonner"

let toasterReady = Promise.resolve()
let markReady = () => {}

function resetToasterReady() {
  toasterReady = new Promise<void>((resolve) => {
    markReady = resolve
  })
}

resetToasterReady()

export function whenToasterReady() {
  return toasterReady
}

export function ReadyToaster(props: ComponentProps<typeof Toaster>) {
  useEffect(() => {
    markReady()
    return () => {
      resetToasterReady()
    }
  }, [])

  return <Toaster {...props} />
}
