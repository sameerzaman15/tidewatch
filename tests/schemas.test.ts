import { describe, expect, it } from "vitest"

import { contactSchema, waitlistEmailSchema } from "@/lib/schemas"

describe("waitlistEmailSchema", () => {
  it("accepts a normal email", () => {
    expect(waitlistEmailSchema.parse("ada@example.com")).toBe("ada@example.com")
  })

  it("trims whitespace", () => {
    expect(waitlistEmailSchema.parse("  ada@example.com  ")).toBe("ada@example.com")
  })

  it("rejects an invalid email", () => {
    const result = waitlistEmailSchema.safeParse("not-an-email")
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Enter a valid email.")
    }
  })

  it("rejects an empty email", () => {
    const result = waitlistEmailSchema.safeParse("   ")
    expect(result.success).toBe(false)
  })

  it("rejects emails longer than 254 characters", () => {
    const local = "a".repeat(250)
    const result = waitlistEmailSchema.safeParse(`${local}@example.com`)
    expect(result.success).toBe(false)
  })
})

describe("contactSchema", () => {
  it("accepts a complete note", () => {
    const parsed = contactSchema.parse({
      name: "Ada Lovelace",
      email: "ada@example.com",
      company: "Analytical",
      teamSize: "2-10",
      message: "We want monitors on the API.",
    })
    expect(parsed.company).toBe("Analytical")
  })

  it("rejects a short message", () => {
    const result = contactSchema.safeParse({
      name: "Ada Lovelace",
      email: "ada@example.com",
      company: "Analytical",
      teamSize: "2-10",
      message: "short",
    })
    expect(result.success).toBe(false)
  })
})
