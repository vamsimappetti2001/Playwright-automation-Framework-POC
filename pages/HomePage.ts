import { expect, type Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { QuickTransactionPage } from './QuickTransactionPage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/Banking-Project-Demo\.html/, { timeout: 15_000 });
    await this.expectHeadingVisible('🏦 Sample Banking Application');
    await expect(this.page.getByText('Welcome to the Testers Talk Banking Application')).toBeVisible({ timeout: 10_000 });
  }

  async expectTransferAndBillPaymentTabsVisible(): Promise<void> {
    await expect(this.getButton('Transfers')).toBeVisible({ timeout: 10_000 });
    await expect(this.getButton('Bill Payments')).toBeVisible({ timeout: 10_000 });
  }

  async openQuickTransactions(): Promise<QuickTransactionPage> {
    await this.clickLink('💳 Quick Transactions');

    const quickTransactionPage = new QuickTransactionPage(this.page);
    await quickTransactionPage.expectLoaded();
    return quickTransactionPage;
  }
}
