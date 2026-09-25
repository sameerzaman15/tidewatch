import type { Metadata } from "next"
import dynamic from "next/dynamic"

import { Faq } from "@/components/faq"
import { Features } from "@/components/features"
import { FinalCta } from "@/components/final-cta"
import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { JsonLd } from "@/components/json-ld"
import { SocialProof } from "@/components/social-proof"
import { Testimonials } from "@/components/testimonials"
import { siteDescription } from "@/lib/site"

const FeatureTabs = dynamic(() =>
  import("@/components/feature-tabs").then((mod) => mod.FeatureTabs),
)

const Pricing = dynamic(() =>
  import("@/components/pricing").then((mod) => mod.Pricing),
)

export const metadata: Metadata = {
  title: "Know it's down before your customers do.",
  description: siteDescription,
  alternates: { canonical: "/" },
}

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Hero />
      <SocialProof />
      <HowItWorks />
      <Features />
      <FeatureTabs />
      <Pricing />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  )
}
