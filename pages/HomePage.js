const { expect } = require('@playwright/test');

class HomePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.signupLoginBtn = page.getByRole('link', { name: 'Signup / Login' });
    this.homeLink = page.getByRole('link', { name: 'Home' });
  }

  async goto() {
    await this.page.goto('/');
  }

  async verifyHomePageIsVisible() {
    await expect(this.page).toHaveURL(/.*automationexercise.com/);
    await expect(this.homeLink).toHaveCSS('color', 'rgb(255, 165, 0)'); // Home link is orange when active, or just check visibility
    // Alternative: check if the logo or carousel is visible
    const logo = this.page.locator('img[alt="Website for automation practice"]');
    await expect(logo).toBeVisible();
  }

  async clickSignupLogin() {
    await this.signupLoginBtn.click();
  }
}

module.exports = { HomePage };
