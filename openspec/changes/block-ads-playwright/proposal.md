# Proposal: Block Ads to Improve Playwright Test Stability

## Motivation
Test executions on `automationexercise.com` are currently failing (often manifesting as timeouts) because of full-screen intrusive Google Ads (specifically Google Vignette overlays) blocking user interaction. When Playwright attempts to locate and click elements hidden behind these ads, it hangs until timeout.

## Proposed Solution
We need a robust solution to block these advertisements natively within the Playwright framework. We will use Playwright's `page.route` capability to abort any network request sent to known ad domains, effectively preventing ads from loading and preventing the UI from being obstructed. This approach also improves test execution speed significantly.

## Scope
- Implement a global network interception mechanism.
- Add a reusable utility `utils/adBlocker.js` containing common ad domains and intercept logic.
- Apply this ad blocker utility to existing e2e test files.
