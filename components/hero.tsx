import { Badge } from "@/components/ui/badge"
import { ProductMock } from "@/components/product-mock"
import { WaitlistForm } from "@/components/waitlist-form"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="hero-dots pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:py-20">
        <div className="max-w-xl">
          <Badge variant="secondary" className="h-7 px-3">
            Now in private beta
          </Badge>
          <h1 className="mt-5 font-heading text-[clamp(2.5rem,5.2vw,4.5rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-balance">
            Know it&apos;s down before your customers do.
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-8 text-pretty text-muted-foreground">
            Checks every 30 seconds from 12 regions, instant alerts for the
            people on call, and a status page your customers trust.
          </p>
          <div className="mt-8 max-w-lg">
            <WaitlistForm id="hero-waitlist" />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Free for 3 monitors. No card needed.
          </p>
        </div>
        <ProductMock />
      </div>
    </section>
  )
}
