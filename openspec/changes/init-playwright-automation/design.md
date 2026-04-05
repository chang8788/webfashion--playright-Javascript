# Design: Playwright Javascript Automation

## Architecture Overview
The project will use `@playwright/test` framework. We will follow a Page Object Model (POM) design pattern.

### Components
1. **Pages (POM)**:
   - `HomePage.js`: Handles interactions on `https://automationexercise.com/`. Includes verifying home page is visible and clicking 'Signup / Login'.
   - `SignupLoginPage.js`: Handles filling registration names/emails, logging in, verifying UI elements.
   - `SignupPage.js`: Handles the extended form for entering account details (Name, Password, Address, etc.).
   - `AccountPage.js`: Handles verification of account creation, logged in state, and account deletion functionality.

2. **Tests**:
   - `tests/tc1-register-user.spec.js`: Implements the 18 steps for Test Case 1.
   - `tests/tc2-login-user.spec.js`: Implements the 10 steps for Test Case 2.

3. **Utils/Data**:
   - `utils/dataHelper.js`: Functions to generate dynamic data (e.g., unique email for registration). Using `@faker-js/faker` library.

### Dependencies
- `@playwright/test`
- `@faker-js/faker`
