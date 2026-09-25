import { faqs, plans } from "@/lib/content"
import { getSiteUrl, siteDescription, siteName } from "@/lib/site"

export function JsonLd() {
  const url = getSiteUrl()
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: siteName,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: siteDescription,
        url,
        offers: plans.map((plan) => ({
          "@type": "Offer",
          name: plan.name,
          price: String(plan.monthly),
          priceCurrency: "USD",
          description: plan.features.join(", "),
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  )
}
