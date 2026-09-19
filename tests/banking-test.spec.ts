import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import config from '../config.json';
import transferTestData from '../test-data/Transfer_TestData.json';

test('Verify Quick Transactions Flow', async ({ page }) => {
  test.setTimeout(120_000);

  await page.route(/youtube\.com|youtube-nocookie\.com|ytimg\.com|googlevideo\.com|doubleclick\.net/, route => route.abort());

  const loginPage = new LoginPage(page);
  await loginPage.open(config.url);

  const homePage = await loginPage.loginAs(config.username, config.password, config.appName);
  const quickTransactionPage = await homePage.openQuickTransactions();
  const reference = await quickTransactionPage.createTransfer(transferTestData);

  const historyPage = await quickTransactionPage.openHistory();
  await historyPage.expectTransactionReference(reference);
});

test('Verify transfer and bill payment tabs on homepage', async ({ page }) => {
  test.setTimeout(120_000);

  await page.route(/youtube\.com|youtube-nocookie\.com|ytimg\.com|googlevideo\.com|doubleclick\.net/, route => route.abort());

  const loginPage = new LoginPage(page);

  await loginPage.open(config.url);
  const loggedInHomePage = await loginPage.loginAs(config.username, config.password, config.appName);
  await loggedInHomePage.expectLoaded();
  await loggedInHomePage.expectTransferAndBillPaymentTabsVisible();
});