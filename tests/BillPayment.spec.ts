import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://bakkappan.github.io/Testers-Talk-Practice-Site/');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('TestersTalk');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('TestersTalk');
  await page.getByLabel('App Name:').selectOption('banking');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Bill Payments' }).click();
  await page.getByRole('textbox', { name: 'Service Provider: *' }).click();
  await page.getByRole('textbox', { name: 'Service Provider: *' }).fill('test');
  await page.getByRole('textbox', { name: 'Account/Reference Number: *' }).click();
  await page.getByRole('textbox', { name: 'Account/Reference Number: *' }).fill('1234');
  await page.getByRole('spinbutton', { name: 'Amount ($): *' }).click();
  await page.getByRole('spinbutton', { name: 'Amount ($): *' }).fill('12344.7');
  await page.getByLabel('Payment Method:').selectOption('savings');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('spinbutton', { name: 'Amount ($): *' }).click();
  await page.getByRole('spinbutton', { name: 'Amount ($): *' }).fill('120');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByRole('button', { name: 'View History' }).click();
  await page.getByRole('heading', { name: '📊 Transaction History' }).click();
  await page.getByText('electricity payment to test').click();
});