import { test, expect } from '@playwright/test';

test.describe('GreenKart Shop Catalog & Cart', () => {
  test('Add a product to the cart from the catalog and validate cart state', async ({ page }) => {
    await page.goto('https://www.green-kart.in/shop');

    const greenPeas = page.locator('article').filter({ hasText: 'Matar / Green Peas' });
    await expect(greenPeas).toBeVisible();
    await greenPeas.getByRole('button', { name: 'Add to Cart' }).click();

    const cartBadge = page.getByText('0').nth(0);
    await expect(cartBadge).not.toBeVisible();

    const kiwi = page.locator('article').filter({ hasText: 'Kiwi' });
    await kiwi.getByRole('button', { name: 'Add to Cart' }).click();

    await expect(page.getByText('Matar / Green Peas')).toBeVisible();
    await expect(page.getByText('Kiwi')).toBeVisible();
  });
});
