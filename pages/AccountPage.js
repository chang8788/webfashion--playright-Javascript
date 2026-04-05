const { expect } = require('@playwright/test');

class AccountPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.accountCreatedHeader = page.locator('[data-qa="account-created"]');
    this.continueBtn = page.locator('[data-qa="continue-button"]');
    
    this.loggedInUserText = page.locator('text=Logged in as');
    this.deleteAccountBtn = page.getByRole('link', { name: 'Delete Account' });
    this.accountDeletedHeader = page.locator('[data-qa="account-deleted"]');
  }

  async verifyAccountCreatedIsVisible() {
    await expect(this.accountCreatedHeader).toBeVisible();
  }

  async clickContinue() {
    await this.continueBtn.click();
  }

  async verifyLoggedInAs(username) {
    await expect(this.page.locator(`text=Logged in as ${username}`)).toBeVisible();
  }

  async clickDeleteAccount() {
    await this.deleteAccountBtn.click();
  }

  async verifyAccountDeletedIsVisible() {
    await expect(this.accountDeletedHeader).toBeVisible();
  }
}

module.exports = { AccountPage };
