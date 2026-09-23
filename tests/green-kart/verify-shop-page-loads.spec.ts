import { test, expect } from '@playwright/test';

test.describe('GreenKart Shop Catalog & Cart', () => {
  test('Verify shop page loads and product catalog is visible', async ({ page }) => {
    await page.goto('https://www.green-kart.in/shop');

    await expect(page).toHaveTitle(/Products \| GreenKart/);
    await expect(page.getByRole('heading', { name: 'All products' })).toBeVisible();

    const products = page.locator('article');
    await expect(products.first()).toBeVisible();
    await expect(products.filter({ hasText: 'Matar / Green Peas' })).toBeVisible();
    await expect(products.filter({ hasText: 'Kiwi' })).toBeVisible();

    await expect(page.getByRole('link', { name: 'Fruits' }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Price Range/i })).toBeVisible();
  });
});
