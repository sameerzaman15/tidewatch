import Link from "next/link"

import { Logo } from "@/components/logo"
import { ThemeSegment } from "@/components/theme-toggle"
import { builderUrl } from "@/lib/site"

const columns = [
  {
    title: "Product",
    links: [
      { href: "/#features", label: "Features" },
      { href: "/#pricing", label: "Pricing" },
      { href: "/#customers", label: "Customers" },
      { href: "/#faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/contact", label: "Talk to sales" },
      { href: builderUrl, label: "Portfolio", external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <Link href="/" className="inline-flex rounded-md">
            <Logo />
          </Link>
          <p className="max-w-xs text-sm leading-6 text-muted-foreground">
            Uptime monitoring and public status pages for small SaaS teams.
          </p>
          <ThemeSegment />
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-sm font-semibold">{column.title}</p>
            <ul className="mt-3 space-y-1">
              {column.links.map((link) => (
                <li key={link.label}>
                  {"external" in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex min-h-11 items-center text-sm text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="inline-flex min-h-11 items-center text-sm text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-muted-foreground sm:px-6">
          <p>© 2026 Tidewatch (concept)</p>
          <p className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
            <a
              href={builderUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center font-medium text-foreground underline-offset-4 hover:underline"
            >
              Built by Sameer Zaman
            </a>
            <span>Tidewatch is a concept product. Not a real company.</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
