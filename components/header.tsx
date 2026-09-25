"use client"

import { MenuIcon } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useEffect, useState } from "react"
import { cn } from "cn"

const LazyMenu = dynamic(() =>
  import("@/components/mobile-menu").then((mod) => mod.MobileMenu),
)

import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

const links = [
  { href: "/#features", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#customers", label: "Customers" },
  { href: "/#faq", label: "FAQ" },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-transparent",
        scrolled &&
          "border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-2 px-4 sm:gap-3 sm:px-6">
        <Link href="/" aria-label="Tidewatch home" className="mr-auto min-w-0 rounded-md">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex h-11 items-center rounded-lg px-3 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden sm:block">
          <ThemeToggle />
        </div>

        <Button asChild className="px-3 sm:px-4">
          <Link href="/#waitlist" aria-label="Join the waitlist">
            <span className="sm:hidden">Join</span>
            <span className="hidden sm:inline">Join the waitlist</span>
          </Link>
        </Button>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="lg:hidden"
          aria-label="Open menu"
          aria-expanded={menu}
          onClick={() => setMenu(true)}
        >
          <MenuIcon />
        </Button>
        {menu ? <LazyMenu onClose={() => setMenu(false)} /> : null}
      </div>
    </header>
  )
}
