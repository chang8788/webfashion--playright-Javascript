const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { SignupLoginPage } = require('../pages/SignupLoginPage');
const { SignupPage } = require('../pages/SignupPage');
const { AccountPage } = require('../pages/AccountPage');
const { generateRandomUser } = require('../utils/dataHelper');
const { blockAds } = require('../utils/adBlocker');

test.beforeEach(async ({ page }) => {
  await blockAds(page);
});

test('Test Case 2: Login User with correct email and password', async ({ page }) => {
  const homePage = new HomePage(page);
  const signupLoginPage = new SignupLoginPage(page);
  const signupPage = new SignupPage(page);
  const accountPage = new AccountPage(page);

  const user = generateRandomUser();

  // --- Pre-requisite: Create user to login with ---
  await homePage.goto();
  await homePage.clickSignupLogin();
  await signupLoginPage.fillSignupDetails(user.name, user.email);
  await signupLoginPage.clickSignup();
  await signupPage.fillAccountDetails(user.password, user.day, user.month, user.year);
  await signupPage.fillAddressDetails(user);
  await signupPage.clickCreateAccount();
  await accountPage.clickContinue();
  // Logout to start the actual test
  await page.getByRole('link', { name: 'Logout' }).click();
  // ------------------------------------------------

  // 1. Launch browser && 2. Navigate to url
  await homePage.goto();

  // 3. Verify that home page is visible successfully
  await homePage.verifyHomePageIsVisible();

  // 4. Click on 'Signup / Login' button
  await homePage.clickSignupLogin();

  // 5. Verify 'Login to your account' is visible
  await signupLoginPage.verifyLoginIsVisible();

  // 6. Enter correct email address and password
  await signupLoginPage.fillLoginDetails(user.email, user.password);

  // 7. Click 'login' button
  await signupLoginPage.clickLogin();

  // 8. Verify that 'Logged in as username' is visible
  await accountPage.verifyLoggedInAs(user.name);

  // 9. Click 'Delete Account' button
  await accountPage.clickDeleteAccount();

  // 10. Verify that 'ACCOUNT DELETED!' is visible
  await accountPage.verifyAccountDeletedIsVisible();
});
