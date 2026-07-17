import { test, expect } from '@playwright/test';

test.describe('IA MR3 GA Analytics Prototype', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders top bar', async ({ page }) => {
    await expect(page.getByText('Analytics', { exact: true })).toBeVisible();
  });

  test('renders sidebar navigation', async ({ page }) => {
    await expect(page.locator('nav button')).toHaveCount(5);
  });

  test('home section loads', async ({ page }) => {
    await expect(page.locator('.bg-white.rounded-\\[24px\\]').first()).toBeVisible();
  });

  test('library section renders original content', async ({ page }) => {
    await page.locator('nav button').nth(2).click();
    await expect(page.getByRole('heading', { name: 'Library' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Recents' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Search assets...' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Agent Performance Dashboard' })).toBeVisible();
  });

  test('monitoring section loads', async ({ page }) => {
    await page.locator('nav button').nth(1).click();
    await expect(page.locator('.bg-white.rounded-\\[24px\\]').first()).toBeVisible();
  });

  test('datasets section loads', async ({ page }) => {
    await page.locator('nav button').nth(3).click();
    await expect(page.locator('.bg-white.rounded-\\[24px\\]').first()).toBeVisible();
  });

  test('settings section loads', async ({ page }) => {
    await page.locator('nav button').nth(4).click();
    await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
  });

  test('matches design screenshot', async ({ page }) => {
    await expect(page).toHaveScreenshot('prototype-home.png', {
      fullPage: true,
      maxDiffPixels: 15000,
    });
  });
});
