import { type Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { HomePage } from './HomePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open(url: string): Promise<void> {
    await this.goto(url);
  }

  async loginAs(username: string, password: string, appName: string): Promise<HomePage> {
    await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('combobox', { name: 'App Name:' }).selectOption(appName);

    await Promise.all([
      this.page.waitForURL(/Banking-Project-Demo\.html/, {
        waitUntil: 'commit',
        timeout: 30_000,
      }),
      this.getButton('Login').click(),
    ]);

    const homePage = new HomePage(this.page);
    await homePage.expectLoaded();
    return homePage;
  }
}
