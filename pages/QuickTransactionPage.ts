import { expect, type Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { TransactionHistoryPage } from './TransactionHistoryPage';

export class QuickTransactionPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectLoaded(): Promise<void> {
    await this.expectHeadingVisible('💳 Quick Transactions');
  }

  async createTransfer({ amount, account, description }: { amount: string; account: string; description: string }): Promise<string> {
    await this.page.getByRole('combobox', { name: 'Transaction Type:' }).selectOption('transfer');
    await this.page.locator('#transactionAmount').fill(amount);
    await this.page.locator('#transferAccount').fill(account);
    await this.page.getByRole('textbox', { name: 'Description:' }).fill(description);
    await this.clickButton('Submit');

    await this.expectHeadingVisible('🔍 Transaction Confirmation');
    await this.clickButton('Confirm');

    await this.expectHeadingVisible('✅ Transaction Successful');
    const referenceElement = this.page.getByText(/TXN-\d+-\d+/).first();
    await expect(referenceElement).toBeVisible({ timeout: 10_000 });

    const reference = (await referenceElement.textContent())?.trim();
    expect(reference).toMatch(/^TXN-\d+-\d+$/);

    return reference as string;
  }

  async openHistory(): Promise<TransactionHistoryPage> {
    await this.clickButton('View History');

    const historyPage = new TransactionHistoryPage(this.page);
    await historyPage.expectLoaded();
    return historyPage;
  }
}
