export const faqs = [
  {
    question: "How is Tidewatch different from a cron ping?",
    answer:
      "A cron ping only tells you a job started. Tidewatch requests your URL from several regions, checks the status code and timing, and opens an incident your customers can read.",
  },
  {
    question: "What counts as downtime?",
    answer:
      "A monitor is down when checks fail from at least two regions in a row, or when response time stays above the limit you set. One slow region does not page the team.",
  },
  {
    question: "Can I use my own domain?",
    answer:
      "Yes. Team and Business plans serve the status page on a domain you own, with your logo and colors.",
  },
  {
    question: "Do you store response bodies?",
    answer:
      "No. Tidewatch keeps the status code, timing, and any headers you choose. Response bodies are dropped after the check finishes.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes. The Hobby plan includes 3 monitors, checks every 5 minutes, and 1 status page. No card needed.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. You can cancel whenever you like. Access stays on until the end of the period you already paid for.",
  },
  {
    question: "When does the beta open?",
    answer:
      "Private beta invites go out in small batches. Join the waitlist and we will email you when a seat is ready.",
  },
] as const

export const plans = [
  {
    name: "Hobby",
    monthly: 0,
    blurb: "For a side project that still deserves a status page.",
    featured: false,
    cta: "Start free",
    features: [
      "3 monitors",
      "5 minute checks",
      "1 status page",
      "Email alerts",
    ],
  },
  {
    name: "Team",
    monthly: 19,
    blurb: "For a small SaaS team that wants to hear about downtime first.",
    featured: true,
    cta: "Join the waitlist",
    features: [
      "50 monitors",
      "30 second checks",
      "SMS alerts",
      "Custom domain",
    ],
  },
  {
    name: "Business",
    monthly: 49,
    blurb: "For teams that need SSO, an audit log, and a human on support.",
    featured: false,
    cta: "Join the waitlist",
    features: [
      "Unlimited monitors",
      "SSO",
      "Audit log",
      "Priority support",
    ],
  },
] as const

export type ComparisonValue = string | boolean

export const comparisonRows: {
  label: string
  values: [ComparisonValue, ComparisonValue, ComparisonValue]
}[] = [
  { label: "Monitors", values: ["3", "50", "Unlimited"] },
  { label: "Check interval", values: ["5 min", "30 sec", "30 sec"] },
  { label: "Status pages", values: ["1", "5", "Unlimited"] },
  { label: "Regions", values: ["3", "8", "12"] },
  { label: "Email alerts", values: [true, true, true] },
  { label: "Slack and webhooks", values: [false, true, true] },
  { label: "SMS alerts", values: [false, true, true] },
  { label: "Custom domain", values: [false, true, true] },
  { label: "Incident history", values: ["7 days", "90 days", "1 year"] },
  { label: "SSL and domain warnings", values: [false, true, true] },
  { label: "On-call schedules", values: [false, true, true] },
  { label: "SSO", values: [false, false, true] },
  { label: "Audit log", values: [false, false, true] },
  { label: "Support", values: ["Community", "Email", "Priority"] },
]

export const testimonials = [
  {
    quote:
      "We caught a bad deploy at 2am before a single customer wrote in. The status page did the explaining for us.",
    name: "Maya Chen",
    role: "Founder",
    company: "Northpine",
    initials: "MC",
    color: "#0F766E",
  },
  {
    quote:
      "The 30 second checks are the difference between a quiet fix and a morning full of tickets.",
    name: "Luis Ortega",
    role: "Engineering lead",
    company: "Quillstack",
    initials: "LO",
    color: "#1E3A5F",
  },
  {
    quote:
      "Setup took one sitting. The on-call schedule is the first one my team actually follows.",
    name: "Priya Nair",
    role: "CTO",
    company: "Orbitly",
    initials: "PN",
    color: "#0E7490",
  },
  {
    quote:
      "We replaced three tools with Tidewatch. Alerts land in Slack, and the status page looks like ours.",
    name: "Jonah Ellis",
    role: "Platform",
    company: "Ferncast",
    initials: "JE",
    color: "#3F6212",
  },
  {
    quote:
      "Support used to hear about outages from customers. Now we hear about them from Tidewatch, and we already have a note to share.",
    name: "Amira Solano",
    role: "Head of support",
    company: "Loomwork",
    initials: "AS",
    color: "#7C2D12",
  },
  {
    quote:
      "The incident timeline is what our enterprise prospects ask to see. It makes a small team look prepared.",
    name: "Chris Adler",
    role: "Co-founder",
    company: "Brightlane",
    initials: "CA",
    color: "#4C1D95",
  },
] as const

export const wordmarks = [
  "Northpine",
  "Quillstack",
  "Orbitly",
  "Ferncast",
  "Loomwork",
  "Brightlane",
] as const

export const steps = [
  {
    title: "Add a URL",
    body: "Paste the address you want watched, choose regions, and set how long a check may take.",
  },
  {
    title: "Pick who gets alerted",
    body: "Send Slack, email, SMS, or a webhook. Route it by the hours your team is on call.",
  },
  {
    title: "Share your status page",
    body: "Publish a page on your domain so customers see the same picture you do.",
  },
] as const

export const features = [
  {
    title: "Multi-region checks",
    body: "Confirm an outage from more than one place before you wake anyone up.",
    span: "md:col-span-4",
  },
  {
    title: "Instant alerts",
    body: "Page the person on call in under a minute.",
    span: "md:col-span-2",
    chips: ["Slack", "Email", "SMS", "Webhooks"],
  },
  {
    title: "Branded status pages",
    body: "Your logo, your domain, and a page customers already trust.",
    span: "md:col-span-3",
  },
  {
    title: "Incident timeline",
    body: "Every update in order, from investigating to resolved.",
    span: "md:col-span-3",
  },
  {
    title: "SSL and domain expiry warnings",
    body: "A quiet warning weeks before a certificate or domain lapses.",
    span: "md:col-span-2",
  },
  {
    title: "Team on-call schedules",
    body: "Rotations, handoffs, and a backup if the first person misses the page.",
    span: "md:col-span-4",
  },
] as const

export function annualPrice(monthly: number) {
  const value = monthly * 0.8
  if (Number.isInteger(value)) return value.toString()
  return value.toFixed(2)
}
