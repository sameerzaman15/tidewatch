import type { Metadata } from "next"

import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Privacy",
  description: "Demo privacy text for the Tidewatch concept project.",
  alternates: { canonical: "/privacy" },
}

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy"
        description="Demo text. Tidewatch is a concept product, not a real company. This is not a privacy policy."
      />
      <article className="mx-auto w-full max-w-3xl space-y-4 px-4 py-12 text-base leading-7 text-muted-foreground sm:px-6">
        <p className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-foreground">
          Demo text. This page is a placeholder in a portfolio project by Sameer Zaman.
        </p>
        <p>
          The waitlist and contact forms keep what you type in memory on the server
          that handled the request. That memory resets when the server process
          restarts. If the optional Upstash Redis variables are set, the same
          entries are stored there instead. If a webhook URL is set, a copy is
          also posted to that address.
        </p>
        <p>
          The demo does not sell data, run ads, or build a profile of you. Do not
          submit secrets or a real customer list.
        </p>
      </article>
    </>
  )
}
