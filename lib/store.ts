import { canonicalEmail } from "same-email"

import type { ContactInput } from "@/lib/schemas"

export type WaitlistAddResult = "added" | "duplicate"

type WaitlistEntry = {
  email: string
  canonical: string
  createdAt: string
}

type StoredContact = ContactInput & { createdAt: string }

const memory = {
  waitlist: new Map<string, WaitlistEntry>(),
  contacts: [] as StoredContact[],
}

export function resetStoreForTests() {
  memory.waitlist.clear()
  memory.contacts.length = 0
}

function redisConfigured() {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
  )
}

async function redis() {
  const { Redis } = await import("@upstash/redis")
  return new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  })
}

async function postWebhook(body: unknown) {
  const url = process.env.WAITLIST_WEBHOOK_URL
  if (!url) return
  try {
    await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(4000),
    })
  } catch {
    // The signup still succeeds if the optional webhook is down.
  }
}

export async function addWaitlist(email: string): Promise<WaitlistAddResult> {
  const canonical = canonicalEmail(email)
  if (!canonical) {
    throw new Error("Invalid email")
  }

  const createdAt = new Date().toISOString()

  if (redisConfigured()) {
    const client = await redis()
    const key = `tidewatch:waitlist:${canonical}`
    const existing = await client.get(key)
    if (existing) return "duplicate"
    await client.set(key, JSON.stringify({ email, canonical, createdAt }))
    await client.incr("tidewatch:waitlist:count")
  } else if (memory.waitlist.has(canonical)) {
    return "duplicate"
  } else {
    memory.waitlist.set(canonical, { email, canonical, createdAt })
  }

  await postWebhook({ type: "waitlist", email, canonical, createdAt })
  return "added"
}

export async function addContact(payload: ContactInput): Promise<void> {
  const createdAt = new Date().toISOString()
  const entry = { ...payload, createdAt }

  if (redisConfigured()) {
    const client = await redis()
    await client.rpush("tidewatch:contacts", JSON.stringify(entry))
  } else {
    memory.contacts.push(entry)
  }

  await postWebhook({ type: "contact", ...entry })
}

export async function count(): Promise<{ waitlist: number; contacts: number }> {
  if (redisConfigured()) {
    const client = await redis()
    const waitlist = Number((await client.get("tidewatch:waitlist:count")) ?? 0)
    const contacts = await client.llen("tidewatch:contacts")
    return { waitlist, contacts }
  }

  return {
    waitlist: memory.waitlist.size,
    contacts: memory.contacts.length,
  }
}
