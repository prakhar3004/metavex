import { createHmac } from 'node:crypto';

const MAX_BYTES = 16_384;
const CHALLENGES = new Set(['leads', 'website', 'manual', 'silos']);
const STAGES = new Set(['starting', 'early', 'growing', 'established', 'private']);
const text = (value, maximum) => typeof value === 'string' ? value.trim().slice(0, maximum) : '';

export function validateLead(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('INVALID');
  const lead = {
    leadId: text(input.leadId, 80), name: text(input.name, 80), business: text(input.business, 120),
    email: text(input.email, 254), phone: text(input.phone, 24),
    challenge: text(input.challenge, 30), stage: text(input.stage, 30),
    requirements: text(input.requirements, 500), sourcePage: text(input.sourcePage, 160),
    metrics: null
  };
  const digits = lead.phone.replace(/\D/g, '');
  if (input.websiteConfirmation || !/^[a-zA-Z0-9-]{16,80}$/.test(lead.leadId)
      || !lead.name || !lead.business || !CHALLENGES.has(lead.challenge) || !STAGES.has(lead.stage)
      || !/^\+?[\d\s().-]+$/.test(lead.phone) || digits.length < 7 || digits.length > 15
      || (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email))
      || !lead.sourcePage.startsWith('/') || lead.sourcePage.startsWith('//')) throw new Error('INVALID');
  if (input.metrics != null) {
    const ranges = {
      monthlyRevenue: [0, 5_000_000], manualHours: [0, 60], monthlyAdSpend: [0, 1_000_000],
      revenueChangePercent: [-25, 50], automationSharePercent: [0, 100]
    };
    const metrics = {};
    for (const [key, [minimum, maximum]] of Object.entries(ranges)) {
      const value = input.metrics[key];
      if (typeof value !== 'number' || !Number.isFinite(value) || value < minimum || value > maximum) throw new Error('INVALID');
      metrics[key] = value;
    }
    // Recompute outputs on the server; never trust a client-provided result.
    metrics.projectedExtraRevenue = Math.round(metrics.monthlyRevenue * metrics.revenueChangePercent / 100) || 0;
    metrics.hoursSavedMonthly = Math.round(metrics.manualHours * 4 * metrics.automationSharePercent / 100);
    lead.metrics = metrics;
  }
  return lead;
}

async function readBody(request) {
  if (Number(request.headers['content-length'] ?? 0) > MAX_BYTES) throw new Error('TOO_LARGE');
  if (request.body != null) {
    const body = typeof request.body === 'string' || Buffer.isBuffer(request.body) ? String(request.body) : JSON.stringify(request.body);
    if (Buffer.byteLength(body) > MAX_BYTES) throw new Error('TOO_LARGE');
    return JSON.parse(body);
  }
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    const buffer = Buffer.from(chunk);
    size += buffer.length;
    if (size > MAX_BYTES) throw new Error('TOO_LARGE');
    chunks.push(buffer);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

function reply(response, status, body) {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.end(JSON.stringify(body));
}

export function createLeadHandler({ env = process.env, fetchImpl = fetch } = {}) {
  return async function handler(request, response) {
    if (request.method !== 'POST') {
      response.setHeader('Allow', 'POST');
      return reply(response, 405, { ok: false, code: 'METHOD_NOT_ALLOWED' });
    }
    if (!String(request.headers['content-type'] ?? '').toLowerCase().startsWith('application/json')) {
      return reply(response, 415, { ok: false, code: 'JSON_REQUIRED' });
    }
    const origin = request.headers.origin;
    if (origin) {
      try {
        const parsed = new URL(origin);
        if (!['http:', 'https:'].includes(parsed.protocol)
            || (parsed.host !== request.headers.host && origin !== env.LEADS_ALLOWED_ORIGIN)) throw new Error();
      } catch { return reply(response, 403, { ok: false, code: 'ORIGIN_REJECTED' }); }
    }
    let lead;
    try { lead = validateLead(await readBody(request)); }
    catch (error) { return reply(response, error.message === 'TOO_LARGE' ? 413 : 422, { ok: false, code: 'INVALID_REQUEST' }); }
    const endpoint = env.LEADS_WEBHOOK_URL ?? '';
    const secret = env.LEADS_WEBHOOK_SECRET ?? '';
    if (!/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(endpoint) || secret.length < 32) {
      return reply(response, 503, { ok: false, code: 'CAPTURE_NOT_CONFIGURED' });
    }
    const address = String(request.headers['x-forwarded-for'] ?? request.socket?.remoteAddress ?? 'unknown').split(',')[0].trim();
    const fingerprint = createHmac('sha256', secret).update(address).digest('hex');
    try {
      const upstream = await fetchImpl(endpoint, {
        method: 'POST', redirect: 'follow', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret, fingerprint, lead }), signal: AbortSignal.timeout(15_000)
      });
      const receipt = await upstream.json();
      if (upstream.ok && receipt.ok === true && receipt.leadId === lead.leadId && receipt.persisted === true) {
        return reply(response, 200, { ok: true, persisted: true, leadId: receipt.leadId });
      }
      return reply(response, receipt.code === 'RATE_LIMITED' ? 429 : 502, { ok: false, code: receipt.code === 'RATE_LIMITED' ? 'RATE_LIMITED' : 'SAVE_FAILED' });
    } catch (error) {
      return reply(response, error.name === 'TimeoutError' || error.name === 'AbortError' ? 504 : 502, { ok: false, code: 'SAVE_FAILED' });
    }
  };
}

export default createLeadHandler();
