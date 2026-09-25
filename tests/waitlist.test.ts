import { afterEach, describe, expect, it } from "vitest"

import { resetRateLimitForTests } from "@/lib/rate-limit"
import { resetStoreForTests } from "@/lib/store"
import { processWaitlist } from "@/lib/waitlist"

describe("processWaitlist", () => {
  afterEach(() => {
    resetStoreForTests()
    resetRateLimitForTests()
  })

  const ready = (now: number) => String(now - 2000)

  it("ignores a filled honeypot", async () => {
    const now = Date.now()
    const result = await processWaitlist({
      email: "ada@example.com",
      honeypot: "https://spam.example",
      renderedAt: ready(now),
      ip: "203.0.113.10",
      now,
    })
    expect(result.status).toBe("ignored")
  })

  it("ignores a submission faster than 1.5 seconds", async () => {
    const now = Date.now()
    const result = await processWaitlist({
      email: "ada@example.com",
      honeypot: "",
      renderedAt: String(now - 400),
      ip: "203.0.113.11",
      now,
    })
    expect(result.status).toBe("ignored")
  })

  it("returns a field error for an invalid email", async () => {
    const now = Date.now()
    const result = await processWaitlist({
      email: "not-an-email",
      honeypot: "",
      renderedAt: ready(now),
      ip: "203.0.113.12",
      now,
    })
    expect(result.status).toBe("invalid")
    expect(result.fieldError).toBe("Enter a valid email.")
  })

  it("flags the gmail alias as already on the list", async () => {
    const now = Date.now()
    const first = await processWaitlist({
      email: "johndoe@gmail.com",
      honeypot: "",
      renderedAt: ready(now),
      ip: "203.0.113.13",
      now,
    })
    const second = await processWaitlist({
      email: "JOHN.doe+test@gmail.com",
      honeypot: "",
      renderedAt: ready(now),
      ip: "203.0.113.14",
      now,
    })
    expect(first.status).toBe("success")
    expect(second.status).toBe("duplicate")
    expect(second.message).toBe("You're already on the list.")
  })

  it("rate limits the 6th submission from one IP", async () => {
    const now = Date.now()
    for (let index = 0; index < 5; index += 1) {
      const result = await processWaitlist({
        email: `person${index}@example.com`,
        honeypot: "",
        renderedAt: ready(now),
        ip: "203.0.113.50",
        now,
      })
      expect(result.status).toBe("success")
    }

    const blocked = await processWaitlist({
      email: "person6@example.com",
      honeypot: "",
      renderedAt: ready(now),
      ip: "203.0.113.50",
      now,
    })
    expect(blocked.status).toBe("rate_limited")
    expect(blocked.message).toMatch(/wait a few minutes/i)
  })
})
