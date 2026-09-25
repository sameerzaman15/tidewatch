import { consumeRateLimit } from "@/lib/rate-limit"
import { waitlistEmailSchema } from "@/lib/schemas"
import { addWaitlist } from "@/lib/store"

export const MIN_SUBMIT_MS = 1500

export type WaitlistStatus =
  | "idle"
  | "success"
  | "duplicate"
  | "invalid"
  | "rate_limited"
  | "ignored"
  | "error"

export type WaitlistResult = {
  status: WaitlistStatus
  fieldError?: string
  message?: string
}

export async function processWaitlist(input: {
  email: string
  honeypot: string
  renderedAt: string
  ip: string
  now?: number
}): Promise<WaitlistResult> {
  if (input.honeypot.trim()) {
    return { status: "ignored" }
  }

  const now = input.now ?? Date.now()
  const rendered = Number(input.renderedAt)
  if (!Number.isFinite(rendered) || now - rendered < MIN_SUBMIT_MS) {
    return { status: "ignored" }
  }

  const limit = await consumeRateLimit(input.ip, now)
  if (!limit.allowed) {
    return {
      status: "rate_limited",
      message:
        "Too many attempts from this network. Please wait a few minutes and try again.",
    }
  }

  const parsed = waitlistEmailSchema.safeParse(input.email)
  if (!parsed.success) {
    return {
      status: "invalid",
      fieldError: parsed.error.issues[0]?.message ?? "Enter a valid email.",
    }
  }

  try {
    const result = await addWaitlist(parsed.data)
    if (result === "duplicate") {
      return {
        status: "duplicate",
        message: "You're already on the list.",
      }
    }
    return {
      status: "success",
      message: "You're on the list. We'll email you when your invite is ready.",
    }
  } catch {
    return {
      status: "error",
      message: "Something went wrong. Please try again in a moment.",
    }
  }
}
