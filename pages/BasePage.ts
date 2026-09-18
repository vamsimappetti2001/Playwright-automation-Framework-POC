import { expect, type Locator, type Page } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string): Promise<void> {
    await this.page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });
  }

  protected getButton(name: string): Locator {
    return this.page.getByRole('button', { name });
  }

  protected getLink(name: string): Locator {
    return this.page.getByRole('link', { name });
  }

  protected async clickButton(name: string): Promise<void> {
    await this.getButton(name).click();
  }

  protected async clickLink(name: string): Promise<void> {
    await this.getLink(name).click();
  }

  protected async expectHeadingVisible(name: string, timeout = 10_000): Promise<void> {
    await expect(this.page.getByRole('heading', { name })).toBeVisible({ timeout });
  }

  protected static escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
