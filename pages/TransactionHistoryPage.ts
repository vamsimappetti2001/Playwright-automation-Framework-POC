import { expect, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class TransactionHistoryPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectLoaded(): Promise<void> {
    await this.expectHeadingVisible('📊 Transaction History');
  }

  async expectTransactionReference(reference: string): Promise<void> {
    const escapedReference = BasePage.escapeRegExp(reference);
    await expect(this.page.getByText(new RegExp(`Ref: ${escapedReference}`))).toBeVisible({ timeout: 10_000 });
  }
}
