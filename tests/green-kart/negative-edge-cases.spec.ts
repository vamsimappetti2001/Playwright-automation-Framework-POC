import { test, expect } from '@playwright/test';

test.describe('GreenKart Shop Catalog & Cart', () => {
  test('Perform negative and edge-case checks on the catalog and filters', async ({ page }) => {
    await page.goto('https://www.green-kart.in/shop');

    const productGrid = page.locator('article');
    await expect(productGrid.first()).toBeVisible();

    await page.reload();
    await expect(page.getByRole('heading', { name: 'All products' })).toBeVisible();

    await page.getByRole('link', { name: 'Fruits' }).first().click();
    await expect(page).toHaveURL(/\/shop\/category\/fruits-1/);

    await page.getByRole('button', { name: /Sort By/i }).first().click();
    await page.getByText('Price - High to Low', { exact: true }).first().click();
    await expect(page).toHaveURL(/order=list_price\+desc/);

    await page.setViewportSize({ width: 375, height: 812 });
    await expect(productGrid.first()).toBeVisible();

    await page.setViewportSize({ width: 1280, height: 900 });
    await expect(productGrid.first()).toBeVisible();
  });
});
