import { test } from "@playwright/test"

test("desktop light screenshot", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.emulateMedia({ colorScheme: "light" })
  await page.addInitScript(() => {
    localStorage.setItem("theme", "light")
    localStorage.removeItem("tidewatch-announce-dismissed")
  })
  await page.goto("/")
  await page.evaluate(() => document.fonts.ready)
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
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({
    path: "docs/screenshot-mobile.png",
    fullPage: true,
  })
})
