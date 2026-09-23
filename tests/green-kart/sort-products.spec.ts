import { test, expect } from '@playwright/test';

test.describe('GreenKart Shop Catalog & Cart', () => {
  test('Sort products by a different order and confirm ordering changes', async ({ page }) => {
    await page.goto('https://www.green-kart.in/shop');

    const sortButton = page.getByRole('button', { name: /Sort By/i }).first();
    await expect(sortButton).toBeVisible();

    await sortButton.click();

    const sortOptions = [
      'Newest Arrivals',
      'Featured',
      'Name (A-Z)',
      'Price - Low to High',
      'Price - High to Low',
    ];

    for (const option of sortOptions) {
      await expect(page.locator('body')).toContainText(option);
    }

    await page.getByText('Price - Low to High', { exact: true }).first().click();
    await expect(page).toHaveURL(/order=list_price\+asc/);
    await expect(page.locator('article').first()).toBeVisible();
    await expect(page.getByText('Price - Low to High', { exact: true }).first()).toBeVisible();

    await sortButton.click();
    await page.getByText('Price - High to Low', { exact: true }).first().click();
    await expect(page).toHaveURL(/order=list_price\+desc/);
    await expect(page.locator('article').first()).toBeVisible();
    await expect(page.getByText('Price - High to Low', { exact: true }).first()).toBeVisible();
  });
});
