# Search visibility for metavex.design

The production build generates complete HTML for the seven public pages. Each has its own title, description, canonical URL, social preview metadata, H1 and structured data. Internal navigation uses real links. The sitemap excludes missing pages and the lead API. Unknown server URLs should return the custom HTTP 404 page; unknown client-side routes show the app's missing-page view with `noindex`.

Organization and contact markup uses only the published name, logo, email and owner-confirmed phone **+91 9026231351**. There is no invented address, rating, customer count, certification, testimonial, award, or client result. The use-case page explicitly describes examples. The growth planner uses visitor-controlled assumptions with neutral defaults.

FAQs on Home and Contact share the same data as their FAQPage markup. This supports a consistent machine-readable description; it does not promise Google FAQ rich results. Service markup reflects the services actually visible on the website.

## After publishing

1. Connect `metavex.design` to the intended Vercel project and confirm HTTPS works. If `www.metavex.design` is connected too, confirm the configured permanent redirect reaches the apex domain without a loop.
2. Confirm all seven canonical URLs return HTTP 200 with their own content. Confirm an invented URL returns HTTP 404, and `/api/leads` reaches the function rather than HTML. Preview deployments should remain excluded from indexing; check Vercel's preview `X-Robots-Tag` response before sharing them widely.
3. Open [Google Search Console](https://search.google.com/search-console) as the site owner, add the **Domain property** `metavex.design`, and add Google's exact verification TXT record through the domain's DNS provider. No ownership verification token has been fabricated or submitted by this code.
4. Submit `https://metavex.design/sitemap.xml`. Use URL Inspection on the homepage and important service/contact pages. Check the rendered HTML and request indexing where appropriate.
5. Review Page Indexing, Crawl Stats, Core Web Vitals and search performance as real data becomes available. Correct reported problems and keep content current. A sitemap submission is not an indexing confirmation.

## AEO and GEO approach

Clear questions, direct answers, descriptive service text, readable HTML and consistent business details help people and crawlers understand what the business offers. Keep future case studies evidence-based, identify their dates and scope, and publish results only with permission and supporting records. Add real team information, location and service details only after the owner confirms them.

Google says its existing SEO practices apply to AI Overviews and AI Mode, with no special additional technical requirements or AI schema. No `llms.txt` ranking claim, hidden keyword pages, fabricated reviews or guaranteed citations are included. Indexing, rankings, AI citations and rich results remain decisions made by each search service.

## Repeatable local verification

```powershell
pnpm run check
```

The build runs `scripts/verify-seo.mjs` against the actual generated HTML. It checks content, titles, descriptions, one H1 per page, canonical/social URLs, schema, visible FAQs, official phone, sitemap coverage, assets and the hosting route configuration. It is not a substitute for live Search Console checks, real browser layout inspection, or field performance measurement.

References: [Angular prerendering](https://angular.dev/guide/ssr), [Google AI features and websites](https://developers.google.com/search/docs/appearance/ai-features), [crawlable links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable), [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview).
