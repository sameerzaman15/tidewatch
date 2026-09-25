export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="border-b border-border">
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 md:py-24">
        <p className="text-sm font-medium text-primary">{eyebrow}</p>
        <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-balance md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
