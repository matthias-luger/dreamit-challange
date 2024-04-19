import { test, expect } from '@playwright/test'

test.describe('EuroJackpot Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/eurojackpot')
    })

    test('should navigate back to the main page when the Back link is clicked', async ({ page }) => {
        await page.click('a:has-text("Back")')
        expect(page).toHaveURL('/')
    })

    test('should select the date 16.04.2024 in the date input field and check for the date in the table', async ({ page }) => {
        await page.click('#date')
        await page.fill('#date', '2024-04-16')
        const dateValue = await page.$eval('#date', (el: HTMLInputElement) => el.value)
        expect(dateValue).toBe('2024-04-16')
    })
})
