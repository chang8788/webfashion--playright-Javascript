# Implementation Tasks

## Phase 1: Framework Setup
- [x] 1. Initialize empty Playwright project via `npm init playwright@latest` configured for generic Javascript.
- [x] 2. Install dependencies: `npm install --save-dev @faker-js/faker`.
- [x] 3. Update `playwright.config.js` with appropriate test directory, base URL `https://automationexercise.com`, and browser setups.

## Phase 2: Create Page Objects
- [x] 1. Create `pages/HomePage.js`.
- [x] 2. Create `pages/SignupLoginPage.js`.
- [x] 3. Create `pages/SignupPage.js`.
- [x] 4. Create `pages/AccountPage.js`.
- [x] 5. Create `utils/dataHelper.js` for `@faker-js/faker` data generation.

## Phase 3: Implement Test Case 1 (Register User)
- [x] 1. Create `tests/tc1-register-user.spec.js`.
- [x] 2. Implement Steps 1-18 utilizing POM, validating all expected text and UI elements.

## Phase 4: Implement Test Case 2 (Login User with correct email)
- [x] 1. Create `tests/tc2-login-user.spec.js`.
- [x] 2. Implement Steps 1-10 utilizing POM. Pre-requisite: ensure a registered user exists or tests create one dynamically.

## Phase 5: Verification
- [x] 1. Run tests with `npx playwright test`.
- [x] 2. Ensure tests pass locally in headless and headed mode.
