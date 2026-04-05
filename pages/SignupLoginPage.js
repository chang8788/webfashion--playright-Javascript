const { expect } = require('@playwright/test');

class SignupLoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Signup elements
    this.signupNameInput = page.locator('[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('[data-qa="signup-email"]');
    this.signupBtn = page.locator('[data-qa="signup-button"]');

    // Login elements
    this.loginEmailInput = page.locator('[data-qa="login-email"]');
    this.loginPasswordInput = page.locator('[data-qa="login-password"]');
    this.loginBtn = page.locator('[data-qa="login-button"]');

    // Assertions
    this.newUserSignupHeader = page.getByRole('heading', { name: 'New User Signup!' });
    this.loginAccountHeader = page.getByRole('heading', { name: 'Login to your account' });
  }

  async verifySignupIsVisible() {
    await expect(this.newUserSignupHeader).toBeVisible();
  }

  async fillSignupDetails(name, email) {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
  }

  async clickSignup() {
    await this.signupBtn.click();
  }

  async verifyLoginIsVisible() {
    await expect(this.loginAccountHeader).toBeVisible();
  }

  async fillLoginDetails(email, password) {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(password);
  }

  async clickLogin() {
    await this.loginBtn.click();
  }

  async verifyLoginErrorIsVisible() {
    // The exact text is "Your email or password is incorrect!"
    const errorLocator = this.page.locator('form[action="/login"] p').filter({ hasText: 'Your email or password is incorrect!' });
    await expect(errorLocator).toBeVisible();
  }
}

module.exports = { SignupLoginPage };
