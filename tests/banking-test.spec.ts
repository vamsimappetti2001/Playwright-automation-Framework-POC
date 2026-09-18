import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Verify Quick Transactions Flow', async ({ page }) => {
  test.setTimeout(120_000);

  await page.route(/youtube\.com|youtube-nocookie\.com|ytimg\.com|googlevideo\.com|doubleclick\.net/, route => route.abort());

  const loginPage = new LoginPage(page);
  await loginPage.open('https://bakkappan.github.io/Testers-Talk-Practice-Site/');

  const homePage = await loginPage.loginAs('TestersTalk', 'TestersTalk', 'banking');
  const quickTransactionPage = await homePage.openQuickTransactions();
  const reference = await quickTransactionPage.createTransfer({
    amount: '100',
    account: '1234567890',
    description: 'Playwright transfer test',
  });

  const historyPage = await quickTransactionPage.openHistory();
  await historyPage.expectTransactionReference(reference);
});