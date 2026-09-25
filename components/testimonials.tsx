import { testimonials } from "@/lib/content"

export function Testimonials() {
  return (
    <section className="py-16 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">Customers</p>
          <h2
            id="customers"
            className="mt-2 scroll-mt-24 font-heading text-3xl font-semibold tracking-tight text-balance md:text-4xl"
          >
            Teams who want the quiet kind of uptime
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Sample testimonials written for this concept.
          </p>
        </div>

        <div className="mt-8 hidden gap-4 md:columns-2 md:block lg:columns-3">
          {testimonials.map((item) => (
            <Quote key={item.name} item={item} />
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <p className="mb-3 text-xs text-muted-foreground">Swipe to read more</p>
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
            {testimonials.map((item) => (
              <Quote key={item.name} item={item} className="w-[85%] shrink-0 snap-center" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Quote({
  item,
  className,
}: {
  item: (typeof testimonials)[number]
  className?: string
}) {
  return (
    <figure
      className={`mb-4 break-inside-avoid rounded-2xl border border-border bg-card p-5 ${className ?? ""}`}
    >
      <blockquote className="text-sm leading-6 text-pretty">
        <p>&ldquo;{item.quote}&rdquo;</p>
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <span
          className="flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
          style={{ backgroundColor: item.color }}
          aria-hidden="true"
        >
          {item.initials}
        </span>
        <span>
          <span className="block text-sm font-medium">{item.name}</span>
          <span className="block text-xs text-muted-foreground">
            {item.role}, {item.company}
          </span>
        </span>
      </figcaption>
    </figure>
  )
}
