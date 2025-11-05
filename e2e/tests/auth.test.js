const { test, expect } = require('@playwright/test');
const { email, password } = require('../user');

test('Успешная авторизация', async ({ page }) => {
  await page.goto('https://netology.ru');
  await page.waitForLoadState('load');

  // Кликаем кнопку "Войти" на главной странице
  await page.click('text=Войти');

  // Ждем появления модального окна авторизации
  await page.waitForSelector('.modal_signIn__AaVg4');

  // Кликаем "Войти по почте" чтобы показать поля ввода
  await page.click('text=Войти по почте');

  // Ждем появления полей формы
  await page.waitForSelector('input[name="email"]');

  // Заполняем форму
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);

  // Кликаем кнопку входа
  await page.click('button[data-testid="login-submit-btn"]');

  // Ждем перехода на страницу профиля
  await page.waitForURL('**/profile');

  // Проверяем успешную авторизацию
  await expect(page).toHaveURL(/profile/);
});

test('Неуспешная авторизация', async ({ page }) => {
  await page.goto('https://netology.ru');
  await page.waitForLoadState('load');

  await page.click('text=Войти');
  await page.waitForSelector('.modal_signIn__AaVg4');

  // Кликаем "Войти по почте"
  await page.click('text=Войти по почте');
  await page.waitForSelector('input[name="email"]');

  // Используем неверные данные
  await page.fill('input[name="email"]', 'invalid@example.com');
  await page.fill('input[name="password"]', 'wrongpassword');

  await page.click('button[data-testid="login-submit-btn"]');

  // Проверяем сообщение об ошибке
  await expect(page.locator('text=Вы ввели неправильно логин или пароль')).toBeVisible();
});