# Design: Block Ads via Network Interception

## Architecture Overview
Rather than dealing with ad DOM elements arbitrarily popping up, we will intercept the requests matching Google Ads/Analytics URLs at the network layer and abort them before they process. Playwright provides `page.route()` to do exactly this.

## Components
1. **`utils/adBlocker.js`**:
   - A utility function `blockAds(page)` that takes a Playwright `Page` object.
   - It will intercept common ad/tracking domains (e.g., `*doubleclick.net*`, `*googlesyndication.com*`).
   - For every matched route, it calls `route.abort()`.

2. **Integration into Tests**:
   - Inside `tests/tc1-register-user.spec.js` and `tests/tc2-login-user.spec.js`, we will invoke `await blockAds(page)` immediately inside `test.beforeEach(async ({ page }) => { ... })`.

## Alternative Approaches Considered & Rejected
- **AdBlock Extension**: Requires complex persistent browser context, less stable in headless CI mode.
- **CSS Hiding**: Too reactive. Network interception is proactive and speeds up testing.
