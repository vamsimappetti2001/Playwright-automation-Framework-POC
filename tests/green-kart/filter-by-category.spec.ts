import { test, expect } from '@playwright/test';

test.describe('GreenKart Shop Catalog & Cart', () => {
  test('Filter products by category and validate product list changes', async ({ page }) => {
    await page.goto('https://www.green-kart.in/shop');

    const fruitsLink = page.getByRole('link', { name: 'Fruits' }).first();
    await expect(fruitsLink).toBeVisible();
    await expect(page.getByRole('link', { name: 'All Products' }).first()).toBeVisible();

    await fruitsLink.click();
    await expect(page).toHaveURL(/\/shop\/category\/fruits-1/);
    await expect(page).toHaveTitle(/Fruits \| GreenKart/);

    const fruitProducts = page.locator('article');
    await expect(fruitProducts.filter({ hasText: 'Kiwi' })).toBeVisible();
    await expect(fruitProducts.filter({ hasText: 'Anar' })).toBeVisible();

    await page.getByRole('link', { name: 'Vegetables' }).first().click();
    await expect(page).toHaveURL(/\/shop\/category\/vegetables-\d+/);
    await expect(page).toHaveTitle(/Vegetables \| GreenKart/);
    await expect(page.locator('article').filter({ hasText: 'Matar / Green Peas' })).toBeVisible();
  });
});
