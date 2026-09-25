import { expect, test, type Page } from "@playwright/test"

async function waitForSections(page: Page) {
  await page.evaluate(() => document.fonts.ready)
  await expect(page.getByRole("heading", { name: "Add a URL" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Multi-region checks" })).toBeVisible()
  await expect(page.getByText("Incident resolved")).toBeVisible()
  await expect(page.getByText("30s")).toBeVisible()
}

test("desktop light screenshot", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.emulateMedia({ colorScheme: "light" })
  await page.addInitScript(() => {
    localStorage.setItem("theme", "light")
    localStorage.removeItem("tidewatch-announce-dismissed")
  })
  await page.goto("/")
  await waitForSections(page)
  await page.screenshot({
    path: "docs/screenshot-desktop.png",
    fullPage: true,
  })
})

test("mobile dark screenshot", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ colorScheme: "dark" })
  await page.addInitScript(() => {
    localStorage.setItem("theme", "dark")
    localStorage.removeItem("tidewatch-announce-dismissed")
  })
  await page.goto("/")
  await waitForSections(page)
  await page.screenshot({
    path: "docs/screenshot-mobile.png",
    fullPage: true,
  })
})
