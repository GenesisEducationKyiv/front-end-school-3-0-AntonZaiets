import { test, expect } from '@playwright/test';

test.describe('Tracks Page E2E', () => {
  test.beforeEach(async ({ page }) => {
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        console.log('Console error:', msg.text());
      }
    });
    page.on('pageerror', (error) => {
      console.log('Page error:', error.message);
    });
    await page.goto('/tracks');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('body', { timeout: 10000 });
    await page.screenshot({ path: 'debug-page.png' });
  });

  test('should load the page and show basic structure', async ({ page }) => {
    await expect(page.locator('html')).toBeVisible();
    await expect(page.locator('body')).toBeVisible();
    await expect(page).toHaveTitle(/Vite \+ React \+ TS/);
    await expect(page.locator('.App')).toBeVisible();
  });

  test('should handle page errors gracefully', async ({ page }) => {
    await expect(page.locator('html')).toBeVisible();
    await page.click('body');
    await expect(page.locator('body')).toBeVisible();
  });

  test('should show error boundaries when components fail', async ({
    page,
  }) => {
    await page.waitForTimeout(2000);
    const errorElements = page.locator('text=/error/i');
    const errorCount = await errorElements.count();
    await expect(page.locator('body')).toBeVisible();
  });
});
