import { test, expect } from '@playwright/test';

test.describe('GreenKart Shop Catalog & Cart', () => {
  test('Validate wishlist and compare actions for product cards', async ({ page }) => {
    await page.goto('https://www.green-kart.in/shop');

    const product = page.locator('article').filter({ hasText: 'Matar / Green Peas' });
    const actions = product.locator('a, button').filter({ hasText: /Add to wishlist|Compare/i });

    await expect(product).toBeVisible();
    await expect(actions).toHaveCount(2);

    await actions.nth(0).click();
    await expect(product).toBeVisible();

    await actions.nth(1).click();
    await expect(product).toBeVisible();
  });
});
