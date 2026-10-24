// Tells IndexNow search engines (Bing, Yandex, Seznam, Naver) that the sitemap URLs changed.
// Run after a production deploy: npm run indexnow. Google does not use IndexNow; use Search Console for Google.
import fs from 'node:fs';

const host = 'metavex.digital';
const [keyFile] = fs.readdirSync('public').filter(name => /^[0-9a-f]{32}\.txt$/.test(name));
if (!keyFile) throw new Error('IndexNow key file public/<32-hex-key>.txt is missing');
const key = keyFile.slice(0, -4);
const sitemap = fs.readFileSync('public/sitemap.xml', 'utf8');
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);

const live = await fetch(`https://${host}/${keyFile}`);
if (!live.ok || (await live.text()).trim() !== key) throw new Error(`Deploy first: https://${host}/${keyFile} must return the key`);

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${keyFile}`, urlList })
});
console.log(`IndexNow HTTP ${response.status} for ${urlList.length} URLs`);
if (!response.ok) process.exitCode = 1;
