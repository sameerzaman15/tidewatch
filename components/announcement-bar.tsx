"use client"

import { XIcon } from "lucide-react"

import { builderUrl } from "@/lib/site"

const storageKey = "tidewatch-announce-dismissed"

export function AnnouncementBar() {
  return (
    <div className="announce-bar border-b border-primary/20 bg-primary/10">
      <div className="mx-auto flex w-full max-w-6xl items-start gap-2 px-4 py-2 sm:items-center sm:px-6">
        <p className="min-w-0 flex-1 text-sm leading-5 text-foreground">
          Concept project: Tidewatch is a fictional product designed and built by
          Sameer Zaman as a portfolio demo.{" "}
          <a
            href={builderUrl}
            target="_blank"
            rel="noopener"
            className="font-medium text-foreground underline underline-offset-4"
          >
            See who built it
          </a>
        </p>
        <button
          type="button"
          aria-label="Dismiss announcement"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-foreground hover:bg-primary/10"
          onClick={() => {
            try {
              localStorage.setItem(storageKey, "1")
            } catch {
              // Still hide it for this view.
            }
            document.documentElement.dataset.announce = "off"
          }}
        >
          <XIcon className="size-4" />
        </button>
      </div>
    </div>
  )
}
