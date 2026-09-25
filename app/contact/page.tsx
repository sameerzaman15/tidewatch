import type { Metadata } from "next"

import { ContactForm } from "@/components/contact-form"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Talk to sales",
  description:
    "Tell Tidewatch about your team. Concept demo contact form by Sameer Zaman.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Talk to sales",
    description:
      "Tell Tidewatch about your team. Concept demo contact form by Sameer Zaman.",
    url: "/contact",
  },
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to sales"
        description="Tell us about your team and the monitors you want covered. This form is part of the concept demo."
      />
      <div className="mx-auto w-full max-w-xl px-4 py-12 sm:px-6 md:py-16">
        <ContactForm />
      </div>
    </>
  )
}
