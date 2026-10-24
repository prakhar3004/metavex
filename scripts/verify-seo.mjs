import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const output = path.resolve('dist/metavex/browser');
const base = 'https://metavex.digital';
const servicePages = ['website-development', 'meta-ads', 'whatsapp-automation', 'social-media-content', 'business-automation'].map(slug => 'services/' + slug);
const guidePages = ['whatsapp-business-app-vs-api', 'meta-ads-for-small-business-india', 'business-website-checklist'].map(slug => 'guides/' + slug);
const routes = ['', 'services', ...servicePages, 'about', 'guides', ...guidePages, 'comparison', 'calculator', 'case-studies', 'process', 'contact'];
const titles = new Set();
const descriptions = new Set();
const strip = value => value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const sitemap = fs.readFileSync(path.join(output, 'sitemap.xml'), 'utf8');
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
const lastmods = new Map([...sitemap.matchAll(/<loc>([^<]+)<\/loc><lastmod>(\d{4}-\d{2}-\d{2})<\/lastmod>/g)].map(match => [match[1], match[2]]));
const llms = fs.readFileSync(path.join(output, 'llms.txt'), 'utf8');

for (const route of routes) {
  const url = base + '/' + route;
  const html = fs.readFileSync(path.join(output, route, 'index.html'), 'utf8');
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1];
  assert.ok(title && description, `${route}: missing metadata`);
  assert.ok(title.replace(/&amp;/g, '&').length <= 60 && description.replace(/&amp;/g, '&').length <= 160, `${route}: title or description will be truncated in results`);
  assert.ok(!titles.has(title) && !descriptions.has(description), `${route}: duplicate metadata`);
  titles.add(title); descriptions.add(description);
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${route}: expected one main heading`);
  assert.ok(html.includes(`rel="canonical" href="${url}"`), `${route}: wrong canonical`);
  assert.ok(html.includes(`property="og:url" content="${url}"`), `${route}: wrong social URL`);
  assert.doesNotMatch(html, /name="robots" content="noindex/i, `${route}: unexpectedly blocked from indexing`);
  assert.ok(locations.includes(url), `${route}: missing from sitemap`);
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? '';
  assert.ok(strip(main).length > 500, `${route}: missing prerendered page content`);
  assert.match(html, /href="\/services"/, `${route}: missing crawlable internal links`);
  assert.match(html, /href="tel:\+919026231351"/, `${route}: missing official phone`);
  const schema = JSON.parse(html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)?.[1] ?? 'null');
  assert.equal(schema?.['@context'], 'https://schema.org');
  const graph = schema['@graph'];
  assert.equal(graph.find(node => node['@type'] === 'Organization').telephone, '+919026231351');
  for (const profile of graph.find(node => node['@type'] === 'Organization').sameAs ?? []) {
    assert.ok(html.includes(`href="${profile}"`), `${route}: sameAs profile ${profile} must also be a visible link`);
  }
  const site = graph.find(node => node['@type'] === 'WebSite');
  assert.ok(site.name === 'MetaVex Digital' && site.alternateName.includes('MetaVex'), `${route}: brand site name schema missing`);
  assert.ok(!strip(html).includes('METAVEXDIGITAL'), `${route}: brand words run together in page text`);
  const image = html.match(/property="og:image" content="([^"]+)"/)?.[1] ?? '';
  assert.ok(image.startsWith(base + '/') && fs.existsSync(path.join(output, image.slice(base.length + 1))), `${route}: missing social image`);
  assert.equal(graph.find(node => ['WebPage', 'CollectionPage', 'ContactPage', 'AboutPage'].includes(node['@type'])).url, url);
  assert.ok(lastmods.has(url), `${route}: sitemap entry needs a lastmod date`);
  assert.ok(llms.includes(url), `${route}: missing from llms.txt`);
  assert.ok(!JSON.stringify(schema).includes('aggregateRating'), 'unverified ratings must not appear in schema');
  const faq = graph.find(node => node['@type'] === 'FAQPage');
  assert.equal(!!faq, route === '' || route === 'contact' || servicePages.includes(route) || guidePages.includes(route), `${route}: FAQ schema must match visible content`);
  if (servicePages.includes(route)) {
    assert.equal(graph.find(node => node['@type'] === 'Service')?.url, url, `${route}: missing Service schema`);
    assert.equal(graph.find(node => node['@type'] === 'BreadcrumbList').itemListElement.length, 3, `${route}: breadcrumb must include Services`);
  }
  if (guidePages.includes(route)) {
    const article = graph.find(node => node['@type'] === 'Article');
    assert.ok(article?.datePublished && article.citation?.length, `${route}: guides need Article dates and sources`);
    assert.equal(lastmods.get(url), article.dateModified, `${route}: sitemap lastmod must match the guide's dateModified`);
    assert.match(html, new RegExp(`property="article:modified_time" content="${article.dateModified}"`), `${route}: missing article modified time`);
    assert.equal(graph.find(node => node['@type'] === 'BreadcrumbList').itemListElement.length, 3, `${route}: breadcrumb must include Guides`);
  }
  if (faq) for (const question of faq.mainEntity) {
    const escape = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    assert.ok(main.includes(escape(question.name)), `${route}: FAQ question not rendered`);
    assert.ok(main.includes(escape(question.acceptedAnswer.text)), `${route}: FAQ answer not rendered`);
  }
  for (const asset of html.matchAll(/(?:src|href)="([^"?#]+\.(?:js|css|png|ico|webmanifest))"/g)) {
    if (/^https?:/.test(asset[1])) continue;
    assert.ok(fs.existsSync(path.join(output, asset[1].replace(/^\//, ''))), `${route}: missing asset ${asset[1]}`);
  }
  console.log(`PASS /${route}: rendered content, H1, metadata, canonical, schema, links and assets`);
}
assert.equal(locations.length, routes.length, 'sitemap must contain only public canonical pages');
assert.match(fs.readFileSync(path.join(output, 'robots.txt'), 'utf8'), /Sitemap: https:\/\/metavex\.digital\/sitemap\.xml/);
assert.match(fs.readFileSync(path.join(output, '404.html'), 'utf8'), /noindex,follow/);
const hosting = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
const filesystemIndex = hosting.routes.findIndex(rule => rule.handle === 'filesystem');
const missingPageIndex = hosting.routes.findIndex(rule => rule.src === '/(.*)' && rule.dest === '/404.html' && rule.status === 404);
assert.ok(filesystemIndex >= 0 && missingPageIndex > filesystemIndex, 'missing URLs must return 404 after static files and API functions are checked');
assert.ok(!hosting.routes.some(rule => rule.src === '/(.*)' && rule.dest === '/index.html'), 'a homepage fallback creates soft 404s');
for (const route of routes.filter(Boolean)) assert.ok(hosting.routes.slice(0, filesystemIndex).some(rule => rule.src === '/' + route && rule.dest === '/' + route + '/index.html'));
assert.ok(hosting.routes.slice(0, filesystemIndex).some(rule => rule.headers?.['X-Frame-Options'] === 'DENY' && rule.continue === true), 'security headers must run before filesystem matching');
assert.ok(hosting.routes.slice(0, filesystemIndex).some(rule => rule.has?.some(condition => condition.type === 'host' && condition.value === 'www.metavex.digital') && rule.status === 308 && rule.headers?.Location === 'https://metavex.digital/$1'), 'www must permanently redirect to the canonical domain');
for (const property of ['rewrites', 'redirects', 'headers', 'trailingSlash']) assert.ok(!(property in hosting), 'keep ordered routing in one routes array to preserve headers and redirects');
console.log('PASS sitemap, robots, 404 and hosting route configuration');
