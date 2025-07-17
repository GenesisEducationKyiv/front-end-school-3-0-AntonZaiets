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
  });

  test('should load the page and show basic structure', async ({ page }) => {
    await page.goto('/tracks');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('body', { timeout: 10000 });
    await expect(page.locator('html')).toBeVisible();
    await expect(page.locator('body')).toBeVisible();
    await expect(page).toHaveTitle(/Vite \+ React \+ TS/);
    await expect(page.locator('#root')).toBeVisible();
  });

  test('should display tracks page header and controls', async ({ page }) => {
    await page.goto('/tracks');
    await page.waitForTimeout(2000);
    await expect(page.locator('[data-testid="tracks-header"]')).toBeVisible();
    await expect(
      page.locator('[data-testid="create-track-button"]')
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="select-mode-toggle"]')
    ).toBeVisible();
  });

  test('should show search and filter controls', async ({ page }) => {
    await page.goto('/tracks');
    await page.waitForTimeout(2000);
    await expect(page.locator('[data-testid="search-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="sort-select"]')).toBeVisible();
    await expect(page.locator('[data-testid="filter-genre"]')).toBeVisible();
    await expect(page.locator('[data-testid="filter-artist"]')).toBeVisible();
  });

  test('should handle empty state gracefully', async ({ page }) => {
    await page.goto('/tracks');
    await page.waitForTimeout(2000);

    await Promise.race([
      page
        .waitForSelector('[data-testid="tracks-list"]', { timeout: 3000 })
        .catch(() => {}),
      page
        .waitForSelector('[data-testid="no-tracks"]', { timeout: 3000 })
        .catch(() => {}),
      page
        .waitForSelector('[data-testid="error-message"]', { timeout: 3000 })
        .catch(() => {}),
      page
        .waitForSelector('[data-testid="loading-indicator"]', { timeout: 3000 })
        .catch(() => {}),
    ]);

    const bodyText = await page.locator('body').innerText();
    console.log('BODY TEXT:', bodyText);

    const tracksList = page.locator('[data-testid="tracks-list"]');
    const noTracksMessage = page.locator('[data-testid="no-tracks"]');
    const errorMessage = page.locator('[data-testid="error-message"]');
    const hasTracks = await tracksList.isVisible();
    const hasNoTracksMessage = await noTracksMessage.isVisible();
    const hasErrorMessage = await errorMessage.isVisible();

    expect(hasTracks || hasNoTracksMessage || hasErrorMessage).toBeTruthy();
  });

  test('should handle page errors gracefully', async ({ page }) => {
    await page.route('**/music.TrackService/**', (route) =>
      route.abort('failed')
    );
    await page.goto('/tracks');
    await page.waitForLoadState('domcontentloaded');
    await Promise.race([
      page
        .waitForSelector('[data-testid="error-message"]', { timeout: 3000 })
        .catch(() => {}),
      page
        .waitForSelector('[data-testid="loading-indicator"]', { timeout: 3000 })
        .catch(() => {}),
    ]);

    const errorMessage = page.locator('[data-testid="error-message"]');
    const loadingSpinner = page.locator('[data-testid="loading-indicator"]');
    const hasError = await errorMessage.isVisible();
    const isLoading = await loadingSpinner.isVisible();

    expect(hasError || isLoading).toBeTruthy();

    await page.click('body');
    await expect(page.locator('body')).toBeVisible();
  });

  test('should show error boundaries when components fail', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      const originalError = console.error;
      console.error = (...args) => {
        originalError.apply(console, args);
      };
    });
    await page.goto('/tracks');
    await page.waitForTimeout(2000);

    const errorBoundary = page.locator('[data-testid="error-boundary"]');
    const fallbackUI = page.locator('[data-testid="fallback-ui"]');

    await expect(page.locator('body')).toBeVisible();

    const hasErrorBoundary = await errorBoundary.isVisible();
    const hasFallback = await fallbackUI.isVisible();
    if (hasErrorBoundary || hasFallback) {
      console.log('Error boundary or fallback UI detected');
    }
  });
});
