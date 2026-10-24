import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Readable } from 'node:stream';
import fs from 'node:fs';
import vm from 'node:vm';
import { createLeadHandler, validateLead } from '../api/leads.mjs';

const lead = {
  leadId: 'test-0000-1111-2222', name: 'Example Person', business: 'Example Business',
  phone: '+91 9876543210', email: '', challenge: 'website', stage: 'private',
  requirements: 'A clearer catalog', sourcePage: '/contact', metrics: null
};
const env = { LEADS_WEBHOOK_URL: 'https://script.google.com/macros/s/example-deployment/exec', LEADS_WEBHOOK_SECRET: 'test-only-secret-that-is-longer-than-32-characters' };
async function send(handler, overrides = {}) {
  const request = { method: 'POST', headers: { 'content-type': 'application/json', host: 'metavex.digital', origin: 'https://metavex.digital' }, body: lead, ...overrides };
  const result = { headers: {} };
  const response = { setHeader(key, value) { result.headers[key] = value; }, end(value) { result.body = JSON.parse(value); result.status = this.statusCode; } };
  await handler(request, response);
  return result;
}

test('lead validation rejects spam, missing contact details and impossible planner inputs', () => {
  for (const change of [{ phone: '' }, { email: 'invalid' }, { name: '' }, { challenge: 'unknown' }, { stage: 'unknown' }, { websiteConfirmation: 'bot' }, { sourcePage: '//external.example' }, { metrics: { monthlyRevenue: Infinity } }]) {
    assert.throws(() => validateLead({ ...lead, ...change }));
  }
  const result = validateLead({ ...lead, metrics: { monthlyRevenue: 500000, manualHours: 20, monthlyAdSpend: 25000, revenueChangePercent: -10, automationSharePercent: 50, projectedExtraRevenue: 99999999 } });
  assert.equal(result.metrics.projectedExtraRevenue, -50000);
  assert.equal(result.metrics.hoursSavedMonthly, 40);
});

test('API accepts only same-origin JSON POST requests and bounds body size', async () => {
  const handler = createLeadHandler({ env: {} });
  assert.equal((await send(handler, { method: 'GET' })).status, 405);
  assert.equal((await send(handler, { headers: { 'content-type': 'text/plain' } })).status, 415);
  assert.equal((await send(handler, { headers: { 'content-type': 'application/json', host: 'metavex.digital', origin: 'https://other.example' } })).status, 403);
  assert.equal((await send(handler, { body: { ...lead, requirements: 'x'.repeat(17000) } })).status, 413);
  assert.equal((await send(handler, { body: '{bad-json' })).status, 422);
  const request = Readable.from([JSON.stringify(lead)]);
  Object.assign(request, { method: 'POST', headers: { 'content-type': 'application/json' } });
  assert.equal((await send(handler, request)).status, 503, 'a valid streamed body must not be falsely confirmed without configuration');
});

test('API forwards normalized leads privately and returns only a matching persistence receipt', async () => {
  let forwarded;
  const handler = createLeadHandler({ env, fetchImpl: async (url, options) => {
    assert.equal(url, env.LEADS_WEBHOOK_URL);
    forwarded = JSON.parse(options.body);
    return { ok: true, json: async () => ({ ok: true, persisted: true, leadId: lead.leadId }) };
  } });
  const result = await send(handler, { headers: { 'content-type': 'application/json', 'x-forwarded-for': '192.0.2.1' } });
  assert.equal(result.status, 200);
  assert.equal(forwarded.secret, env.LEADS_WEBHOOK_SECRET);
  assert.match(forwarded.fingerprint, /^[a-f0-9]{64}$/);
  assert.equal(result.headers['Cache-Control'], 'no-store');
  assert.deepEqual(Object.keys(result.body).sort(), ['leadId', 'ok', 'persisted']);
  assert.ok(!JSON.stringify(result.body).includes(lead.phone));
});

test('API never reports success for unconfirmed saves, limits, upstream errors or timeouts', async () => {
  for (const receipt of [{ ok: true }, { ok: true, persisted: true, leadId: 'wrong-id' }, { ok: false, code: 'SAVE_FAILED' }]) {
    const result = await send(createLeadHandler({ env, fetchImpl: async () => ({ ok: true, json: async () => receipt }) }));
    assert.equal(result.status, 502);
    assert.equal(result.body.ok, false);
  }
  const limited = await send(createLeadHandler({ env, fetchImpl: async () => ({ ok: true, json: async () => ({ code: 'RATE_LIMITED' }) }) }));
  assert.equal(limited.status, 429);
  const timeout = await send(createLeadHandler({ env, fetchImpl: async () => { const error = new Error('timeout'); error.name = 'TimeoutError'; throw error; } }));
  assert.equal(timeout.status, 504);
});

test('Apps Script preserves existing headers, rejects unauthenticated writes, deduplicates and treats formulas as text', () => {
  const rows = [];
  let headers;
  const sheet = {
    getLastRow: () => headers ? rows.length + 1 : 0,
    getRange(row) { return {
      setValues(values) { if (row === 1) headers = [...values[0]]; else rows.push(values[0]); return this; },
      getDisplayValues: () => [headers],
      setFontWeight() { return this; }, setBackground() { return this; }, setFontColor() { return this; }, setWrap() { return this; },
      createTextFinder(id) { return { matchEntireCell() { return this; }, findNext: () => rows.find(value => value[0] === id) }; }
    }; },
    setFrozenRows() {}, setColumnWidths() {}, setColumnWidth() {}
  };
  const properties = new Map([['LEADS_WEBHOOK_SECRET', env.LEADS_WEBHOOK_SECRET]]);
  const counts = new Map();
  const lock = { tryLock: () => true, hasLock: () => true, releaseLock() {} };
  const context = vm.createContext({
    SpreadsheetApp: { openById: () => ({ getSheetById: () => sheet }), flush() {} },
    PropertiesService: { getScriptProperties: () => ({ getProperty: key => properties.get(key), setProperty: (key, value) => properties.set(key, value) }) },
    ContentService: { MimeType: { JSON: 'json' }, createTextOutput: value => ({ setMimeType: () => JSON.parse(value) }) },
    LockService: { getScriptLock: () => lock }, CacheService: { getScriptCache: () => ({ get: key => counts.get(key), put: (key, value) => counts.set(key, value) }) },
    Utilities: { formatDate: () => '2026-10-17 12:00:00' }
  });
  vm.runInContext(fs.readFileSync(new URL('../integrations/google-sheets/Code.gs', import.meta.url), 'utf8'), context);
  context.setupLeadSheet();
  const event = payload => ({ postData: { contents: JSON.stringify(payload) } });
  assert.equal(context.doPost(event({ secret: 'wrong', lead })).ok, false);
  assert.equal(rows.length, 0);
  const payload = { secret: env.LEADS_WEBHOOK_SECRET, fingerprint: 'a'.repeat(64), lead: { ...lead, requirements: '=IMPORTXML("example")' } };
  assert.equal(context.doPost(event(payload)).persisted, true);
  assert.equal(context.doPost(event(payload)).persisted, true);
  assert.equal(rows.length, 1, 'retry must not add a duplicate');
  assert.equal(rows[0][8], '\'=IMPORTXML("example")');
  const original = [...headers];
  headers[0] = 'Existing different data';
  assert.throws(() => context.setupLeadSheet(), /SCHEMA_MISMATCH/);
  assert.equal(headers[0], 'Existing different data');
  headers = original;
});
