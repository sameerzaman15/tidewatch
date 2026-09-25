import { afterEach, describe, expect, it, vi } from "vitest"

import { addContact, addWaitlist, count, resetStoreForTests } from "@/lib/store"

describe("store dedupe", () => {
  afterEach(() => {
    resetStoreForTests()
    delete process.env.WAITLIST_WEBHOOK_URL
    vi.restoreAllMocks()
  })

  it("treats gmail aliases as one signup", async () => {
    expect(await addWaitlist("johndoe@gmail.com")).toBe("added")
    expect(await addWaitlist("JOHN.doe+test@gmail.com")).toBe("duplicate")
    expect(await count()).toEqual({ waitlist: 1, contacts: 0 })
  })

  it("stores a contact", async () => {
    await addContact({
      name: "Ada Lovelace",
      email: "ada@example.com",
      company: "Analytical",
      teamSize: "2-10",
      message: "We want monitors on the API.",
    })
    expect(await count()).toEqual({ waitlist: 0, contacts: 1 })
  })

  it("posts a new waitlist entry to the optional webhook", async () => {
    process.env.WAITLIST_WEBHOOK_URL = "https://example.com/hook"
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("ok"))

    await addWaitlist("ada@example.com")
    expect(fetchMock).toHaveBeenCalledTimes(1)

    fetchMock.mockClear()
    await addWaitlist("ada@example.com")
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
