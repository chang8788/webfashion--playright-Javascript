const { test } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { SignupLoginPage } = require('../pages/SignupLoginPage');
const { blockAds } = require('../utils/adBlocker');
const { faker } = require('@faker-js/faker');

test.beforeEach(async ({ page }) => {
  await blockAds(page);
});

test('Test Case 3: Login User with incorrect email and password', async ({ page }) => {
  const homePage = new HomePage(page);
  const signupLoginPage = new SignupLoginPage(page);

  // 1. Launch browser
  // 2. Navigate to url 'http://automationexercise.com'
  await homePage.navigate();

  // 3. Verify that home page is visible successfully
  await homePage.verifyHomePageIsVisible();

  // 4. Click on 'Signup / Login' button
  await homePage.clickSignupLogin();

  // 5. Verify 'Login to your account' is visible
  await signupLoginPage.verifyLoginIsVisible();

  // 6. Enter incorrect email address and password
  const incorrectEmail = faker.internet.email();
  const incorrectPassword = faker.internet.password();
  await signupLoginPage.fillLoginDetails(incorrectEmail, incorrectPassword);

  // 7. Click 'login' button
  await signupLoginPage.clickLogin();

  // 8. Verify error 'Your email or password is incorrect!' is visible
  await signupLoginPage.verifyLoginErrorIsVisible();
});
