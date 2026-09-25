import Link from "next/link"

import { WaitlistForm } from "@/components/waitlist-form"

export function FinalCta() {
  return (
    <section className="py-16 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl bg-[#0B1220] px-6 py-12 text-white md:px-12 md:py-16 dark:bg-[#13233B] dark:ring-1 dark:ring-white/10">
          <h2
            id="waitlist"
            className="scroll-mt-24 max-w-2xl font-heading text-3xl font-semibold tracking-tight text-balance md:text-5xl"
          >
            Your customers shouldn&apos;t be your monitoring.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-white/75">
            Join the private beta. We will email you when a seat is ready.
          </p>
          <div className="mt-8 max-w-xl">
            <WaitlistForm id="final-waitlist" tone="inverse" />
          </div>
          <p className="mt-6 text-sm text-white/80">
            <Link href="/contact" className="inline-flex min-h-11 items-center font-medium underline-offset-4 hover:underline">
              Talk to sales
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
