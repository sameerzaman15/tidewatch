"use client"

import Link from "next/link"

import { ThemeSegment } from "@/components/theme-toggle"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

const links = [
  { href: "/#features", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#customers", label: "Customers" },
  { href: "/#faq", label: "FAQ" },
]

export function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <Sheet
      open
      onOpenChange={(next) => {
        if (!next) onClose()
      }}
    >
      <SheetContent side="right" className="w-[min(100%,22rem)]">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Jump to a section or join the waitlist.</SheetDescription>
        </SheetHeader>
        <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
          {links.map((link) => (
            <SheetClose asChild key={link.href}>
              <Link
                href={link.href}
                className="flex min-h-11 items-center rounded-lg px-3 text-lg font-medium"
              >
                {link.label}
              </Link>
            </SheetClose>
          ))}
          <SheetClose asChild>
            <Link
              href="/contact"
              className="flex min-h-11 items-center rounded-lg px-3 text-lg font-medium"
            >
              Talk to sales
            </Link>
          </SheetClose>
        </nav>
        <div className="mt-auto px-4 pb-6">
          <ThemeSegment />
        </div>
      </SheetContent>
    </Sheet>
  )
}
