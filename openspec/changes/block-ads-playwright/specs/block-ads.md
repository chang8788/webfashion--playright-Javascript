# Specifications for Ad Blocking

## Utility Function Specification
- Ensure the function explicitly blocks the following domains using regex or glob matching:
  - `*googlesyndication.com*`
  - `*doubleclick.net*`
  - `*amazon-adsystem.com*`
  - `*googleadservices.com*`
  - `*adservice.google.com*`
- The function will be passed the Playwright `page` context.

## Integration Specification
- `tests/tc1-register-user.spec.js` must be updated to use `blockAds(page)`.
- `tests/tc2-login-user.spec.js` must be updated to use `blockAds(page)`.
