import { Stagger, StaggerItem } from "@/components/motion-bits"
import { features } from "@/lib/content"

export function Features() {
  return (
    <section className="bg-card/40 py-16 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">Features</p>
          <h2
            id="features"
            className="mt-2 scroll-mt-24 font-heading text-3xl font-semibold tracking-tight text-balance md:text-4xl"
          >
            The monitoring stack a small team will actually use
          </h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">
            Six pieces, one product. No enterprise bundle, no surprise add-ons.
          </p>
        </div>
        <Stagger className="mt-10 grid gap-4 md:grid-cols-6">
          {features.map((feature, index) => (
            <StaggerItem key={feature.title} className={feature.span} delay={index * 0.06}>
              <article className="lift-card h-full rounded-2xl border border-border bg-card p-6">
                <h3 className="font-heading text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{feature.body}</p>
                {"chips" in feature ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {feature.chips.map((chip) => (
                      <li
                        key={chip}
                        className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium"
                      >
                        {chip}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
