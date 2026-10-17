import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const output = path.resolve('dist/metavex/browser');
const base = 'https://metavex.design';
const routes = ['', 'services', 'comparison', 'calculator', 'case-studies', 'process', 'contact'];
const titles = new Set();
const descriptions = new Set();
const strip = value => value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const sitemap = fs.readFileSync(path.join(output, 'sitemap.xml'), 'utf8');
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);

for (const route of routes) {
  const url = base + '/' + route;
  const html = fs.readFileSync(path.join(output, route, 'index.html'), 'utf8');
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1];
  assert.ok(title && description, `${route}: missing metadata`);
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
  assert.equal(graph.find(node => ['WebPage', 'CollectionPage', 'ContactPage'].includes(node['@type'])).url, url);
  assert.ok(!JSON.stringify(schema).includes('aggregateRating'), 'unverified ratings must not appear in schema');
  const faq = graph.find(node => node['@type'] === 'FAQPage');
  assert.equal(!!faq, route === '' || route === 'contact', `${route}: FAQ schema must match visible content`);
  if (faq) for (const question of faq.mainEntity) {
    const escape = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    assert.ok(main.includes(escape(question.name)), `${route}: FAQ question not rendered`);
    assert.ok(main.includes(escape(question.acceptedAnswer.text)), `${route}: FAQ answer not rendered`);
  }
  for (const asset of html.matchAll(/(?:src|href)="([^"?#]+\.(?:js|css|png|ico))"/g)) {
    if (/^https?:/.test(asset[1])) continue;
    assert.ok(fs.existsSync(path.join(output, asset[1].replace(/^\//, ''))), `${route}: missing asset ${asset[1]}`);
  }
  console.log(`PASS /${route}: rendered content, H1, metadata, canonical, schema, links and assets`);
}
assert.equal(locations.length, routes.length, 'sitemap must contain only public canonical pages');
assert.match(fs.readFileSync(path.join(output, 'robots.txt'), 'utf8'), /Sitemap: https:\/\/metavex\.design\/sitemap\.xml/);
assert.match(fs.readFileSync(path.join(output, '404.html'), 'utf8'), /noindex,follow/);
const hosting = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
assert.ok(!hosting.rewrites.some(rule => rule.source.includes('(.*)')), 'catch-all rewrites can swallow API and 404 responses');
for (const route of routes.filter(Boolean)) assert.ok(hosting.rewrites.some(rule => rule.source === '/' + route && rule.destination === '/' + route + '/index.html'));
console.log('PASS sitemap, robots, 404 and hosting route configuration');
