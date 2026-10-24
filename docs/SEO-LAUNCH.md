# Search visibility for metavex.digital

Production is live at **https://metavex.digital** as of 17 October 2026. Live checks confirmed the seven canonical pages, robots and sitemap, permanent www redirect and custom HTTP 404 behavior. Search Console ownership and indexing have not been confirmed.

The production build generates complete HTML for the twelve public pages: seven core pages plus five service pages (website development, Meta ads, WhatsApp automation, social media content, business automation), each targeting its own search intent with Service, breadcrumb and FAQ schema. Each has its own title, description, canonical URL, social preview metadata, H1 and structured data. Internal navigation uses real links. The sitemap excludes missing pages and the lead API. Unknown server URLs should return the custom HTTP 404 page; unknown client-side routes show the app's missing-page view with `noindex`.

Organization and contact markup uses only the published name, logo, email and owner-confirmed phone **+91 9026231351**. There is no invented address, rating, customer count, certification, testimonial, award, or client result. The use-case page explicitly describes examples. The growth planner uses visitor-controlled assumptions with neutral defaults.

FAQs on Home and Contact share the same data as their FAQPage markup. This supports a consistent machine-readable description; it does not promise Google FAQ rich results. Service markup reflects the services actually visible on the website.

## After publishing

1. Connect `metavex.digital` to the intended Vercel project and confirm HTTPS works. If `www.metavex.digital` is connected too, confirm the configured permanent redirect reaches the apex domain without a loop.
2. Confirm all twelve canonical URLs return HTTP 200 with their own content. Confirm an invented URL returns HTTP 404, and `/api/leads` reaches the function rather than HTML. Preview deployments should remain excluded from indexing; check Vercel's preview `X-Robots-Tag` response before sharing them widely.
3. Open [Google Search Console](https://search.google.com/search-console) as the site owner, add the **Domain property** `metavex.digital`, and add Google's exact verification TXT record through the domain's DNS provider. No ownership verification token has been fabricated or submitted by this code.
4. Submit `https://metavex.digital/sitemap.xml`. Use URL Inspection on the homepage and important service/contact pages. Check the rendered HTML and request indexing where appropriate.
5. Review Page Indexing, Crawl Stats, Core Web Vitals and search performance as real data becomes available. Correct reported problems and keep content current. A sitemap submission is not an indexing confirmation.

## Ranking for the brand name "metavex"

A web search on 24 October 2026 did not return metavex.digital for "metavex". The results were an academic MetaVex drafting-tool paper, a "Metavex" supplement label, a music track, a Figma template and the differently spelled MetaVexa. None is an active business site, so an indexed, well-linked homepage has a strong chance to lead. Google still decides; nothing here guarantees position 1.

On-site signals now in place: brand-first homepage title and description; "MetaVex Digital" in the hero and first paragraph; a visible "What is MetaVex Digital?" FAQ; `WebSite` and `Organization` schema with `alternateName` (MetaVex, Metavex Digital, metavex.digital) for Google's site name; a real MetaVex favicon (it was Angular's default) and a 1200×630 share image.

Off-site steps only the owner can do, in order of impact:

1. Complete steps 3–4 above (Search Console, sitemap, URL Inspection → Request indexing on the homepage). Nothing ranks before it is indexed.
2. Create a **Google Business Profile** named exactly "MetaVex Digital" as a service-area business (the address can be hidden), with the website, phone and categories such as "Website designer" and "Marketing agency".
3. Create or claim official **LinkedIn, Instagram, Facebook and YouTube** pages with the same name, logo, phone and a link to <https://metavex.digital>. Then add their URLs to `sameAs` in `src/app/site.config.ts` so the schema links the brand entity.
4. List the business, with identical name, phone, email and website, on Indian and agency directories such as Justdial, IndiaMART, Sulekha, Clutch and GoodFirms.
5. Add the site to **Bing Webmaster Tools** (import from Search Console). Bing results feed Copilot and ChatGPT search. After each production deploy, `npm run indexnow` notifies Bing and other IndexNow engines of the sitemap URLs.

Ready-to-paste profile text and categories are in [BRAND-PROFILE-KIT.md](BRAND-PROFILE-KIT.md).
6. Link to <https://metavex.digital> from WhatsApp Business, email signatures, proposals and client project footers where clients agree.

## AEO and GEO approach

Clear questions, direct answers, descriptive service text, readable HTML and consistent business details help people and crawlers understand what the business offers. Keep future case studies evidence-based, identify their dates and scope, and publish results only with permission and supporting records. Add real team information, location and service details only after the owner confirms them.

Google says its existing SEO practices apply to AI Overviews and AI Mode, with no special additional technical requirements or AI schema. Indexing, rankings, AI citations and rich results remain decisions made by each search service.

What the site does for answer engines (checked 24 October 2026):

- **Crawler access:** GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Googlebot, Google-Extended, Bingbot and CCBot all receive HTTP 200 and full prerendered HTML. No JavaScript is needed to read content. Keep `robots.txt` open unless the owner decides to opt out of a specific AI crawler.
- **Entity clarity:** an About page with an at-a-glance fact list, `AboutPage` schema, `Organization` schema with `alternateName` and `sameAs` (the official Facebook page), and a footer link back to that profile.
- **Quotable answers:** every guide opens with a "Short answer" and key takeaways; every service page has an "at a glance" facts box and visible FAQs mirrored in `FAQPage` schema.
- **Freshness and sources:** guides carry `Article` schema with `datePublished`, `dateModified`, `citation` links to official sources, and `article:modified_time`. The sitemap has `lastmod` dates; the build fails if a guide's sitemap date and `dateModified` disagree. When a guide changes, update `updated` in `guides.data.ts` and its sitemap `lastmod` together.
- **`llms.txt`:** a plain Markdown summary of the business and its pages for AI tools that read it. Google does not use it for ranking, and support among other services varies; it is a convenience, not a ranking lever. The build fails if a public page is missing from it.
- **IndexNow:** `npm run indexnow` after each deploy notifies Bing (which feeds Copilot and ChatGPT search) and other IndexNow engines.

What moves AI citations most is outside the site: consistent mentions of MetaVex Digital on other sites (Google Business Profile, directories, LinkedIn, Facebook, YouTube, industry articles), genuine reviews, and new guides that answer questions customers actually ask. Add a guide only when it is accurate, sourced and useful; thin pages written for keywords can hurt more than help.

## Repeatable local verification

```powershell
pnpm run check
```

The build runs `scripts/verify-seo.mjs` against the actual generated HTML. It checks content, titles, descriptions, one H1 per page, canonical/social URLs, schema, visible FAQs, official phone, sitemap coverage, assets and the hosting route configuration. It is not a substitute for live Search Console checks, real browser layout inspection, or field performance measurement.

References: [Angular prerendering](https://angular.dev/guide/ssr), [Google AI features and websites](https://developers.google.com/search/docs/appearance/ai-features), [crawlable links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable), [sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview).
