import { test, expect } from '@playwright/test';

test.describe('GreenKart Shop Catalog & Cart', () => {
  test('Apply the price range filter and verify results', async ({ page }) => {
    await page.goto('https://www.green-kart.in/shop');

    const priceRangeButton = page.getByRole('button', { name: /Price Range/i });
    await expect(priceRangeButton).toBeVisible();

    const rangeInputs = page.locator('input[type="range"]');
    await expect(rangeInputs).toHaveCount(4);

    const rangePanel = page.locator('#products_grid_before');
    await expect(rangePanel.getByText('₹ 15.00')).toBeVisible();
    await expect(rangePanel.getByText('₹ 300.00')).toBeVisible();

    await expect(page.locator('article').first()).toBeVisible();
    await expect(page.getByRole('heading', { name: 'All products' })).toBeVisible();
  });
});
