# MetaVex Digital

Angular 21 website for **https://metavex.digital**. Official phone and WhatsApp: **+91 9026231351**.

## Run locally

Use Node.js 22.12+ and pnpm. Install the locked dependencies, then start the website:

```powershell
pnpm install --frozen-lockfile
pnpm start
```

Open `http://localhost:4200/`. For lead capture, configure `.env.local` using `.env.example` and run `pnpm run api` in a second terminal. Angular proxies the lead API to port 4301.

## Verify and build

```powershell
pnpm run check
```

This runs Angular and Node syntax checks, 17 Node regression tests, the production build, and checks against the generated page HTML. `pnpm test` runs the regression tests alone. There is no configured Vitest or browser end-to-end runner.

The build prerenders seventeen public routes, including five service pages under `/services/`, an About page and three guides under `/guides/`, into `dist/metavex/browser`. Page content is present without JavaScript; forms and interactive tools require it. `vercel.json` serves each page's HTML and keeps `/api/leads` available as a Node function.

## Operations

- [Google Sheet deployment and environment setup](integrations/google-sheets/README.md)
- [SEO and Search Console launch steps](docs/SEO-LAUNCH.md)
- [Audit findings, verification and remaining work](docs/AUDIT.md)

Business details used in metadata live in `src/app/site.config.ts`. Service page content, names and FAQs live in `src/app/pages/service-detail/service-pages.data.ts`; guides live in `src/app/pages/guides/guides.data.ts`. When adding or changing a page, also update `public/sitemap.xml` (with `lastmod`) and `public/llms.txt`. Route titles/descriptions live in `src/app/app.routes.ts`; public FAQs and their matching schema share one data source. Keep `sitemap.xml`, server routes and hosting rewrites aligned when adding a page. The build verification catches mismatches for the current public pages.

No client outcomes, ratings, customer counts or sales guarantees should be added without evidence. Use cases are illustrative and growth planner results are visitor-controlled scenarios.
