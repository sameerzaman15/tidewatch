# Lighthouse

Mobile preset against a production build (`pnpm build && pnpm start`) for `/`. Chrome in this environment, Lighthouse 12, simulated slow 4G. Measured on 25 Sep 2026. Repeated runs scored 95, 95, and 95 for Performance.

| Category | Score |
| --- | --- |
| Performance | 95 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

- LCP element: the hero headline, "Know it's down before your customers do." It is in the server HTML and is not hidden by an animation.
- CLS: 0 (under 0.05).
- LCP: 2.8 s on the final run. FCP: 1.5 s. Total blocking time: 90 ms.
- First-load JS for `/`: **187.4 KB gzipped** (about 657 KB uncompressed). The aim was under 150 KB. React DOM and the Next.js runtime are most of that number, so the page does not reach the aim.
- The headline font is preloaded with `font-display: swap`. Body and mono use `font-display: optional` and are not preloaded, so a slow first view can keep the fallback instead of blocking the headline.

Command:

```bash
CHROME_PATH=/path/to/chrome npx lighthouse@12 http://127.0.0.1:3000/ \
  --form-factor=mobile \
  --screenEmulation.mobile \
  --only-categories=performance,accessibility,best-practices,seo
```
