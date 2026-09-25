import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-start px-4 py-24 sm:px-6">
      <p className="font-mono text-sm text-primary">404</p>
      <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight">
        This page is off the map.
      </h1>
      <p className="mt-4 text-base leading-7 text-muted-foreground">
        That URL is not part of the Tidewatch concept demo. Head back to the
        homepage and the status board.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Back home</Link>
      </Button>
    </div>
  )
}
