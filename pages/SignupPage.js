const { expect } = require('@playwright/test');

class SignupPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.enterAccountInfoHeader = page.locator('h2:has-text("Enter Account Information")');
    this.titleMrRadio = page.locator('#id_gender1');
    this.passwordInput = page.locator('[data-qa="password"]');
    this.daysSelect = page.locator('[data-qa="days"]');
    this.monthsSelect = page.locator('[data-qa="months"]');
    this.yearsSelect = page.locator('[data-qa="years"]');
    
    this.newsletterCheckbox = page.locator('#newsletter');
    this.optinCheckbox = page.locator('#optin');

    this.firstNameInput = page.locator('[data-qa="first_name"]');
    this.lastNameInput = page.locator('[data-qa="last_name"]');
    this.companyInput = page.locator('[data-qa="company"]');
    this.addressInput = page.locator('[data-qa="address"]');
    this.address2Input = page.locator('[data-qa="address2"]');
    this.countrySelect = page.locator('[data-qa="country"]');
    this.stateInput = page.locator('[data-qa="state"]');
    this.cityInput = page.locator('[data-qa="city"]');
    this.zipcodeInput = page.locator('[data-qa="zipcode"]');
    this.mobileNumberInput = page.locator('[data-qa="mobile_number"]');

    this.createAccountBtn = page.locator('[data-qa="create-account"]');
  }

  async verifyEnterAccountInfoIsVisible() {
    await expect(this.enterAccountInfoHeader).toBeVisible();
  }

  async fillAccountDetails(password, day, month, year) {
    await this.titleMrRadio.check();
    await this.passwordInput.fill(password);
    await this.daysSelect.selectOption(day);
    await this.monthsSelect.selectOption(month);
    await this.yearsSelect.selectOption(year);
  }

  async selectNewsletterAndOptin() {
    await this.newsletterCheckbox.check();
    await this.optinCheckbox.check();
  }

  async fillAddressDetails(details) {
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.companyInput.fill(details.company);
    await this.addressInput.fill(details.address);
    await this.address2Input.fill(details.address2);
    await this.countrySelect.selectOption(details.country);
    await this.stateInput.fill(details.state);
    await this.cityInput.fill(details.city);
    await this.zipcodeInput.fill(details.zipcode);
    await this.mobileNumberInput.fill(details.mobile);
  }

  async clickCreateAccount() {
    await this.createAccountBtn.click();
  }
}

module.exports = { SignupPage };
