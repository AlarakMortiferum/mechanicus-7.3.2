const { test, expect } = require('@playwright/test');
const { email, password } = require('../user');

test('Успешная авторизация', async ({ page }) => {
  await page.goto('https://netology.ru');
  await page.waitForLoadState('load');

  await page.click('text=Войти');

  await page.waitForSelector('.modal_signIn__AaVg4');

  await page.click('text=Войти по почте');

  await page.waitForSelector('input[name="email"]');

  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);

  await page.click('button[data-testid="login-submit-btn"]');

  await page.waitForURL('**/profile/**');
  await page.waitForLoadState('networkidle');

  await expect(page.locator('h2:has-text("Моё обучение")')).toBeVisible();

  await expect(page.locator('a:has-text("Моё обучение")')).toBeVisible();

  await expect(page.locator('text=Домашнее задание по теме «Jest и Playwright»')).toBeVisible();

  const loginButton = page.locator('text=Войти').first();
  await expect(loginButton).not.toBeVisible();
});

test('Неуспешная авторизация', async ({ page }) => {
  await page.goto('https://netology.ru');
  await page.waitForLoadState('load');

  await page.click('text=Войти');
  await page.waitForSelector('.modal_signIn__AaVg4');

  await page.click('text=Войти по почте');
  await page.waitForSelector('input[name="email"]');

  await page.fill('input[name="email"]', 'invalid@example.com');
  await page.fill('input[name="password"]', 'wrongpassword');

  await page.click('button[data-testid="login-submit-btn"]');


  await expect(page.locator('text=Вы ввели неправильно логин или пароль')).toBeVisible();
});