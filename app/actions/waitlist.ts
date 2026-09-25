"use server"

import { headers } from "next/headers"

import { processWaitlist } from "@/lib/waitlist"
import type { WaitlistFormState } from "@/lib/waitlist-state"

export async function waitlistAction(
  _prev: WaitlistFormState,
  formData: FormData,
): Promise<WaitlistFormState> {
  const headerList = await headers()
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "local"

  const result = await processWaitlist({
    email: String(formData.get("email") ?? ""),
    honeypot: String(formData.get("company_website") ?? ""),
    renderedAt: String(formData.get("rendered_at") ?? ""),
    ip,
  })

  return { ...result, id: Date.now() }
}
