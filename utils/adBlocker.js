/**
 * Blocks common ad domains on a given page by intercepting network requests.
 * @param {import('@playwright/test').Page} page
 */
async function blockAds(page) {
  // Layer 1: Network interception with Regex guarantees we catch cross-folder paths
  const adDomains = [
    /.*googlesyndication\.com.*/,
    /.*doubleclick\.net.*/,
    /.*amazon-adsystem\.com.*/,
    /.*googleadservices\.com.*/,
    /.*adservice\.google\.com.*/,
    /.*adform\.net.*/,
    /.*vignette.*/
  ];

  for (const domain of adDomains) {
    await page.route(domain, route => {
      route.abort();
    });
  }

  // Layer 2: CSS Injection as a robust fallback to hide any escaped ad overlays
  await page.addInitScript(() => {
    document.addEventListener('DOMContentLoaded', () => {
      const style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = 'iframe, .adsbygoogle { display: none !important; z-index: -9999 !important; }';
      document.head.appendChild(style);
    });
  });
}

module.exports = { blockAds };
