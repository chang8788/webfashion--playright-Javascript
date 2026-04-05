# Implementation Tasks

## Phase 1: Create Ad Blocker Utility
- [x] 1. Create `utils/adBlocker.js`.
- [x] 2. Implement the `blockAds` function using `page.route` with common ad domain patterns.

## Phase 2: Integrate Ad Blocker into Tests
- [x] 1. Update `tests/tc1-register-user.spec.js` to include a `test.beforeEach` block calling `blockAds(page)`.
- [x] 2. Update `tests/tc2-login-user.spec.js` to include a `test.beforeEach` block calling `blockAds(page)`.
- [x] 3. Run tests using `npx playwright test` to verify ads are blocked and timeouts are resolved.

## Phase 3: Verification
- [x] 1. Run `npx playwright test` and ensure tests pass without timing out due to ad overlays.
