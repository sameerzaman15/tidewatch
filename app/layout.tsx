import type { Metadata } from "next"
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google"

import { AnnouncementBar } from "@/components/announcement-bar"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import { SiteToaster } from "@/components/site-toaster"
import { getSiteUrl, siteDescription, siteName } from "@/lib/site"

import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "optional",
  preload: false,
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "optional",
  preload: false,
})

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-display",
  display: "swap",
  preload: true,
})

const siteUrl = getSiteUrl()

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Uptime monitoring for small teams`,
    template: "%s | Tidewatch",
  },
  description: siteDescription,
  keywords: [
    "uptime monitoring",
    "status page",
    "incident alerts",
    "SaaS monitoring",
    "Tidewatch",
  ],
  applicationName: siteName,
  authors: [{ name: "Sameer Zaman", url: "https://sameer-zaman.vercel.app" }],
  creator: "Sameer Zaman",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName,
    locale: "en_US",
    title: "Know it's down before your customers do.",
    description: siteDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Know it's down before your customers do.",
    description: siteDescription,
  },
  robots:
    process.env.NODE_ENV === "production"
      ? { index: true, follow: true }
      : { index: false, follow: false },
}

const announceScript = `try{if(localStorage.getItem("tidewatch-announce-dismissed")==="1"){document.documentElement.dataset.announce="off"}}catch(e){}`

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script dangerouslySetInnerHTML={{ __html: announceScript }} />
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-3 focus:text-primary-foreground"
          >
            Skip to content
          </a>
          <AnnouncementBar />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <SiteToaster position="top-center" offset={16} />
        </ThemeProvider>
      </body>
    </html>
  )
}
