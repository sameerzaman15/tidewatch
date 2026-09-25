import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { demoEmailNote } from "@/lib/site"

export const metadata: Metadata = {
  title: "Thanks",
  description: "We received your note. Tidewatch is a concept demo.",
  alternates: { canonical: "/thanks" },
}

export default function ThanksPage() {
  return (
    <>
      <PageHeader
        eyebrow="Message received"
        title="Thanks, we got your note."
        description={demoEmailNote}
      />
      <div className="mx-auto w-full max-w-xl px-4 py-12 sm:px-6">
        <h2 className="font-heading text-2xl font-semibold">What happens next</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-base leading-7 text-muted-foreground">
          <li>We read notes in small batches during the private beta.</li>
          <li>You can look through pricing while you wait.</li>
          <li>Nothing here is a real sales pipeline. Tidewatch is a concept product.</li>
        </ol>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/">Back home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/#pricing">Review pricing</Link>
          </Button>
        </div>
      </div>
    </>
  )
}
