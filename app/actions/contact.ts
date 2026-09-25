"use server"

import { redirect } from "next/navigation"

import { contactSchema, type ContactInput } from "@/lib/schemas"
import { addContact } from "@/lib/store"
import { MIN_SUBMIT_MS } from "@/lib/waitlist"

export type ContactActionResult =
  | { ok: true }
  | { ok: false; message: string }

export async function contactAction(input: {
  values: ContactInput
  honeypot: string
  renderedAt: string
}): Promise<ContactActionResult> {
  if (input.honeypot.trim()) {
    redirect("/thanks")
  }

  const rendered = Number(input.renderedAt)
  if (!Number.isFinite(rendered) || Date.now() - rendered < MIN_SUBMIT_MS) {
    return {
      ok: false,
      message: "Please wait a moment and try again.",
    }
  }

  const parsed = contactSchema.safeParse(input.values)
  if (!parsed.success) {
    return {
      ok: false,
      message: "Check the form and try again.",
    }
  }

  try {
    await addContact(parsed.data)
  } catch {
    return {
      ok: false,
      message: "Something went wrong. Please try again in a moment.",
    }
  }

  redirect("/thanks")
}
