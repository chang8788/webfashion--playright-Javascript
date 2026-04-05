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

test('Test Case 1: Register User', async ({ page }) => {
  const homePage = new HomePage(page);
  const signupLoginPage = new SignupLoginPage(page);
  const signupPage = new SignupPage(page);
  const accountPage = new AccountPage(page);

  const user = generateRandomUser();

  // 1. Launch browser && 2. Navigate to url 'http://automationexercise.com'
  await homePage.goto();
  
  // 3. Verify that home page is visible successfully
  await homePage.verifyHomePageIsVisible();

  // 4. Click on 'Signup / Login' button
  await homePage.clickSignupLogin();

  // 5. Verify 'New User Signup!' is visible
  await signupLoginPage.verifySignupIsVisible();

  // 6. Enter name and email address
  await signupLoginPage.fillSignupDetails(user.name, user.email);

  // 7. Click 'Signup' button
  await signupLoginPage.clickSignup();

  // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
  await signupPage.verifyEnterAccountInfoIsVisible();

  // 9. Fill details: Title, Name, Email, Password, Date of birth
  await signupPage.fillAccountDetails(user.password, user.day, user.month, user.year);

  // 10. Select checkbox 'Sign up for our newsletter!'
  // 11. Select checkbox 'Receive special offers from our partners!'
  await signupPage.selectNewsletterAndOptin();

  // 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
  await signupPage.fillAddressDetails(user);

  // 13. Click 'Create Account button'
  await signupPage.clickCreateAccount();

  // 14. Verify that 'ACCOUNT CREATED!' is visible
  await accountPage.verifyAccountCreatedIsVisible();

  // 15. Click 'Continue' button
  await accountPage.clickContinue();

  // 16. Verify that 'Logged in as username' is visible
  await accountPage.verifyLoggedInAs(user.name);

  // 17. Click 'Delete Account' button
  await accountPage.clickDeleteAccount();

  // 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
  await accountPage.verifyAccountDeletedIsVisible();
  await accountPage.clickContinue();
});
