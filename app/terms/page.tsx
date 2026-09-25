import type { Metadata } from "next"

import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Terms",
  description: "Demo terms text for the Tidewatch concept project.",
  alternates: { canonical: "/terms" },
}

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms"
        description="Demo text. Tidewatch is a concept product, not a real company. These are not terms of service."
      />
      <article className="mx-auto w-full max-w-3xl space-y-4 px-4 py-12 text-base leading-7 text-muted-foreground sm:px-6">
        <p className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-foreground">
          Demo text. This page is a placeholder in a portfolio project by Sameer Zaman.
        </p>
        <p>
          Tidewatch does not offer a paid service, a service level agreement, or
          support. Prices, features, and testimonials on the site are sample
          content written for the concept.
        </p>
        <p>
          You can use the public demo to look around and submit the forms. Do not
          rely on it to monitor a real application.
        </p>
      </article>
    </>
  )
}
