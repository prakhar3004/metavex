# Website audit — 17 October 2026

Scope: content credibility, navigation, responsive layout safeguards, accessibility, runtime behavior, form capture, dependencies and search readiness. The owner-authorized production deployment is live at **https://metavex.digital**. Search Console ownership and real browser layout verification remain separate checks.

## Corrections completed

| Area | Result |
| --- | --- |
| Content | Clearer problem-led headlines, service explanations and CTAs across all seven pages. Removed invented client proof, measured outcomes, fixed growth claims, scarcity and automatic calendar confirmations. |
| Use cases | Explicitly labeled example approaches, rather than presented as completed customer projects. |
| Planner | Neutral assumptions, positive/negative scenarios, visible formulas and no revenue manufactured from ad spend. |
| Navigation | Home removed from desktop and mobile menus; the logo still provides a home link. Tablet navigation uses the compact menu. |
| Contacts | Phone, WhatsApp drafts, footer, contact page, fallback links and structured data use +91 9026231351. |
| Layout | Wrapping flex/grid layouts, minimum-width corrections, responsive card columns, clearer body copy, restrained background artwork and no decorative marketing text behind the headline. |
| Accessibility | Skip link, focus outlines, labeled controls, explicit button types, keyboard-native dialogs, background inertness, scroll-lock cleanup and reduced-motion support. |
| Runtime | Route subscription cleanup, safe blocked-storage handling, sounds muted by default, guarded WebGL and deferred desktop-only graphics. |
| Loading | Lazy page components and removal of unused animation/icon packages. Production initial assets are approximately 415 kB raw / 107 kB estimated transfer; the desktop 3D chunk is deferred. These are build estimates, not field speed measurements. |
| Leads | Server validation, private shared secret, bounded requests, honeypot, rate control, stable retry IDs, duplicate prevention and formula-like text protection. Success requires a matching persisted receipt. |
| SEO | Seven prerendered pages; distinct titles/descriptions; apex-domain canonicals; social metadata; Organization, Website, page, service, breadcrumb and matching FAQ schema; sitemap; robots; proper missing-page behavior. |
| Hosting | Ordered routes apply security headers and the www-to-apex redirect before serving public HTML, assets and the API. Unknown paths explicitly return the custom HTTP 404 page. This corrects the default homepage fallback observed during live verification. |

## Verification

- Angular strict compilation and Node entrypoint syntax checks.
- 17 regression tests covering planner edge cases, required phone/email validation, editable contact drafts, retries and double submissions, route cleanup, dialogs, navigation, metadata, template parsing, API validation and save failures, plus mocked Apps Script duplicate/header/formula handling.
- Production build emits seven static routes within the configured asset budgets.
- `scripts/verify-seo.mjs` checks every generated page for rendered content, a single H1, unique metadata, correct canonical/social URLs, schema, visible FAQ answers, crawlable links, official phone and existing assets. It also checks sitemap/robots/404 and hosting rewrites.
- Dependency audit: no known production dependency advisories at the time of this audit. The selector-parser advisory was addressed with a targeted version override.

Component tests use a lightweight Angular mock harness and the real Angular template parser; they do not prove browser rendering or hydration. Apps Script tests use a fake spreadsheet and do not write to the owner's actual Google Sheet.

Integration verification on 17 October 2026 used the owner's deployed Apps Script URL through both the local website proxy and the live **metavex.digital/api/leads** function. Clearly labeled local and production test submissions returned HTTP 200 with matching `persisted: true` receipts. Retries used the same IDs. The endpoint and secret are configured locally and in Vercel Production as sensitive variables. Spreadsheet rows were not independently read, and the browser form UI was not automated.

Production deployment: `dpl_5zxgAHSN8UPfeEYPUiz7Xp4K9CzT` ([Vercel deployment](https://vercel.com/thinkprakhar1998-9758s-projects/metavex/5zxgAHSN8UPfeEYPUiz7Xp4K9CzT)). Live HTTP checks passed for all seven public pages, their prerendered content, canonical URLs, schema and security headers; robots and sitemap; initial assets; permanent www/trailing-slash redirects; custom HTTP 404 responses; and the lead API. The `.env.local` URL returns HTTP 404. Production retries referenced `metavex-live-test-c3981237-4068-4f73-b5dd-aaafa479dad4`.

## Remaining verification and owner setup

1. **Real browser QA:** no enabled browser surface was available to the agent. Pixel layout, zoom, mobile keyboard behavior, touch interaction and browser hydration have not been visually verified. Check Home, every dedicated page, mobile menu, case dialogs and every form step at 320, 375, 390, 768, 1024, 1280 and 1440 px, plus 200% zoom and reduced motion. Confirm long names and messages wrap with no clipping. No Lighthouse score or zero-overlap certification is claimed.
2. **Google Sheet row review:** both local and production API saves have been confirmed by the deployed Apps Script. Check the two labeled integration tests and confirm each request ID appears once; see [the integration guide](../integrations/google-sheets/README.md).
3. **Indexing:** the confirmed primary domain is **metavex.digital**. Canonicals, sitemap, metadata and redirects use it, and the deployment is live. Complete Search Console ownership and submit the sitemap as described in [the launch guide](SEO-LAUNCH.md). Actual indexing, rankings and AI citations are not confirmed or guaranteed.
4. **Build-time dependency advisory:** `braces@3.0.3`, pulled in by Tailwind's file/glob tooling, still has [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm). No patched upstream version was listed. It is used by build tooling against repository patterns and is not shipped as browser runtime code. The full dependency audit therefore still reports one high advisory. Avoid building untrusted glob configuration and monitor the upstream fix; do not describe the entire dependency tree as vulnerability-free.

The code changes improve the observed issues and provide repeatable checks. They do not replace production monitoring, real browser testing or evidence for future business claims.
