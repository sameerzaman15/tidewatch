import { expect, test, type Page } from "@playwright/test"

async function readyForm(page: Page, formId: string) {
  await page.getByRole("button", { name: /Theme is/ }).waitFor()
  const form = page.locator(`#${formId}`)
  await form.locator('input[name="rendered_at"]').evaluate((input: HTMLInputElement) => {
    input.value = String(Date.now() - 2000)
  })
  return form
}

test("waitlist shows a success toast and rejects a bad email", async ({ page }) => {
  await page.setExtraHTTPHeaders({ "x-forwarded-for": "203.0.113.21" })
  await page.goto("/")
  const form = await readyForm(page, "hero-waitlist")

  await form.locator("input[name='email']").fill("not-an-email")
  await form.getByRole("button", { name: "Join the waitlist" }).click()
  await expect(form.getByText("Enter a valid email.")).toBeVisible()
  await expect(page.getByText("You're on the list")).toHaveCount(0)

  await form.locator("input[name='email']").fill("ada@example.com")
  await form.getByRole("button", { name: "Join the waitlist" }).click()
  await expect(page.getByText("You're on the list. We'll email you when your invite is ready.")).toBeVisible()
})

test("duplicate gmail aliases are already on the list", async ({ page }) => {
  await page.setExtraHTTPHeaders({ "x-forwarded-for": "203.0.113.22" })
  await page.goto("/")
  const form = await readyForm(page, "hero-waitlist")

  await form.locator("input[name='email']").fill("johndoe@gmail.com")
  await form.getByRole("button", { name: "Join the waitlist" }).click()
  await expect(
    page.getByText("You're on the list. We'll email you when your invite is ready."),
  ).toBeVisible()

  await readyForm(page, "hero-waitlist")
  await form.locator("input[name='email']").fill("JOHN.doe+test@gmail.com")
  await form.getByRole("button", { name: "Join the waitlist" }).click()
  await expect(page.getByText("You're already on the list")).toBeVisible()
})

test("theme choice persists across reloads", async ({ page }) => {
  await page.goto("/")
  const toggle = page.getByRole("button", { name: /Theme is/ })
  await toggle.click()
  await toggle.click()
  await expect(page.locator("html")).toHaveClass(/dark/)
  await page.reload()
  await expect(page.locator("html")).toHaveClass(/dark/)
  expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("dark")
})

test("mobile menu traps focus and closes on Escape and link tap", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 })
  await page.goto("/")
  await page.locator("[aria-label^='Theme is']").waitFor({ state: "attached" })
  await page.getByRole("button", { name: "Open menu" }).click()
  const dialog = page.getByRole("dialog")
  await expect(dialog).toBeVisible()
  await expect
    .poll(() =>
      page.evaluate(() =>
        Boolean(document.activeElement?.closest("[role='dialog']")),
      ),
    )
    .toBe(true)

  await page.keyboard.press("Escape")
  await expect(dialog).toBeHidden()

  await page.getByRole("button", { name: "Open menu" }).click()
  await page.getByRole("dialog").getByRole("link", { name: "Features" }).click()
  await expect(page.getByRole("dialog")).toBeHidden()
  const heading = page.locator("#features")
  await expect(heading).toBeInViewport()
  const headingBox = await heading.boundingBox()
  const headerBox = await page.locator("header").boundingBox()
  expect(headingBox && headerBox && headingBox.y >= headerBox.y + headerBox.height - 2).toBeTruthy()
})

test("pages do not scroll sideways", async ({ page }) => {
  const widths = [320, 375, 768, 1024, 1440]
  for (const path of ["/", "/contact", "/privacy", "/terms", "/thanks"]) {
    for (const width of widths) {
      await page.setViewportSize({ width, height: 800 })
      await page.goto(path)
      const overflows = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      )
      expect(overflows, `${path} at ${width}px`).toBe(false)
    }
  }
})

test("pricing toggle switches the Team price", async ({ page }) => {
  await page.goto("/#pricing")
  await expect(page.getByText("$19", { exact: true })).toBeVisible()
  await page.getByRole("switch", { name: "Annual billing" }).click()
  await expect(page.getByText("$15.20", { exact: true })).toBeVisible()
})

test("contact form redirects to thanks", async ({ page }) => {
  await page.goto("/contact")
  await page.locator('input[name="rendered_at"]').evaluate((input: HTMLInputElement) => {
    input.value = String(Date.now() - 2000)
  })
  await page.getByLabel("Name").fill("Ada Lovelace")
  await page.getByLabel("Work email").fill("ada@example.com")
  await page.getByLabel("Company").fill("Analytical Engines")
  await page.getByLabel("Team size").click()
  await page.getByRole("option", { name: "2 to 10" }).click()
  await page.getByLabel("Message").fill("We would like monitors on the public API.")
  await page.getByRole("button", { name: "Send message" }).click()
  await expect(page).toHaveURL(/\/thanks$/)
  await expect(page.getByText("This is a demo, so your email is only kept temporarily.")).toBeVisible()
})

test("reduced motion keeps the hero headline still", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/")
  const headline = page.getByRole("heading", { level: 1 })
  await expect(headline).toBeVisible()
  const before = await headline.evaluate((element) => ({
    opacity: getComputedStyle(element).opacity,
    transform: getComputedStyle(element).transform,
  }))
  await page.waitForTimeout(400)
  const after = await headline.evaluate((element) => ({
    opacity: getComputedStyle(element).opacity,
    transform: getComputedStyle(element).transform,
  }))
  expect(before.opacity).toBe("1")
  expect(after).toEqual(before)
})

test("faq accordion opens from the keyboard", async ({ page }) => {
  await page.goto("/#faq")
  const trigger = page.getByRole("button", { name: "How is Tidewatch different from a cron ping?" })
  await trigger.scrollIntoViewIfNeeded()
  await trigger.focus()
  await page.keyboard.press("Enter")
  await expect(trigger).toHaveAttribute("aria-expanded", "true")
  await expect(page.getByText("A cron ping only tells you a job started.")).toBeVisible()
  await page.keyboard.press("ArrowDown")
  await expect(page.getByRole("button", { name: "What counts as downtime?" })).toBeFocused()
})

test("concept labels and footer credit are present", async ({ page }) => {
  await page.goto("/")
  await expect(
    page.getByText(
      "Concept project: Tidewatch is a fictional product designed and built by Sameer Zaman as a portfolio demo.",
    ),
  ).toBeVisible()
  await expect(page.getByText("Sample testimonials written for this concept.")).toBeVisible()
  const credit = page.getByRole("link", { name: "Built by Sameer Zaman" })
  await expect(credit).toHaveAttribute("href", "https://sameer-zaman.vercel.app")
  await expect(credit).toHaveAttribute("target", "_blank")
  await expect(credit).toHaveAttribute("rel", /noopener/)
  await expect(page.getByText("Tidewatch is a concept product. Not a real company.")).toBeVisible()
})
