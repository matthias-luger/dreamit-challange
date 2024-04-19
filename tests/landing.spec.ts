import { test, expect } from '@playwright/test'

test.describe('Landing Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test('should navigate to EuroJackpot page when the Euro Jackpot link is clicked', async ({ page }) => {
        await page.click('a:has-text("Euro Jackpot")')
        expect(page).toHaveURL('/eurojackpot')
    })

    test('should display the text "LuckyDraws"', async ({ page }) => {
        const text = await page.textContent('body')
        expect(text).toContain('LuckyDraws')
    })
})
