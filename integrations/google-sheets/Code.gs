// Deploy this script from the spreadsheet owner's Google account.
const LEAD_SPREADSHEET_ID = '12u53bB6dwodEZS2aepGuyXqPhm35FxxoBPEiIsXDSJk';
const LEAD_SHEET_GID = 0;
const LEAD_HEADERS = [
  'Lead ID', 'Submitted At (IST)', 'Name', 'Business', 'Phone', 'Email',
  'Challenge', 'Business Stage', 'Requirements', 'Source Page',
  'Monthly Revenue (INR)', 'Manual Hours Per Week', 'Monthly Ad Budget (INR)',
  'Revenue Change Assumption (%)', 'Automation Assumption (%)',
  'Illustrative Monthly Revenue Change (INR)', 'Illustrative Hours Freed Per Month', 'Status'
];

function leadSheet_() {
  const sheet = SpreadsheetApp.openById(LEAD_SPREADSHEET_ID).getSheetById(LEAD_SHEET_GID);
  if (!sheet) throw new Error('The target tab with gid=0 was not found.');
  return sheet;
}

function checkHeaders_(sheet) {
  const header = sheet.getRange(1, 1, 1, LEAD_HEADERS.length).getDisplayValues()[0];
  if (!LEAD_HEADERS.every(function (label, index) { return header[index] === label; })) {
    throw new Error('SCHEMA_MISMATCH');
  }
}

// Run once. Existing content is preserved; a nonempty tab with different headers is rejected.
function setupLeadSheet() {
  const sheet = leadSheet_();
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, LEAD_HEADERS.length).setValues([LEAD_HEADERS]);
    sheet.getRange(1, 1, 1, LEAD_HEADERS.length).setFontWeight('bold').setBackground('#0f172a').setFontColor('#ffffff').setWrap(true);
    sheet.setFrozenRows(1);
    sheet.setColumnWidths(1, LEAD_HEADERS.length, 180);
    sheet.setColumnWidth(9, 320);
  } else {
    checkHeaders_(sheet);
  }
  const properties = PropertiesService.getScriptProperties();
  if (!properties.getProperty('LEADS_WEBHOOK_SECRET')) {
    properties.setProperty('LEADS_WEBHOOK_SECRET', (Utilities.getUuid() + Utilities.getUuid()).replace(/-/g, ''));
  }
  // The secret is available in Project Settings > Script Properties, never in logs or source.
}

function json_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}

function literal_(value) {
  const text = String(value == null ? '' : value);
  return /^[\s]*[=+\-@]/.test(text) ? "'" + text : text;
}

function doPost(event) {
  let lock;
  try {
    if (!event || !event.postData || event.postData.contents.length > 20000) return json_({ ok: false, code: 'INVALID_REQUEST' });
    const request = JSON.parse(event.postData.contents);
    const secret = PropertiesService.getScriptProperties().getProperty('LEADS_WEBHOOK_SECRET');
    if (!secret || request.secret !== secret) return json_({ ok: false, code: 'UNAUTHORIZED' });
    const lead = request.lead;
    if (!lead || !/^[A-Za-z0-9-]{16,80}$/.test(lead.leadId) || !lead.name || !lead.business || !lead.phone
        || !/^[a-f0-9]{64}$/.test(request.fingerprint)) return json_({ ok: false, code: 'INVALID_REQUEST' });
    lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) return json_({ ok: false, code: 'BUSY' });
    const sheet = leadSheet_();
    checkHeaders_(sheet);
    const lastRow = sheet.getLastRow();
    // A retry after a lost response returns the same receipt without adding a second row.
    if (lastRow > 1 && sheet.getRange(2, 1, lastRow - 1, 1).createTextFinder(lead.leadId).matchEntireCell(true).findNext()) {
      return json_({ ok: true, persisted: true, leadId: lead.leadId });
    }
    const cache = CacheService.getScriptCache();
    const bucket = 'lead-rate-' + request.fingerprint + '-' + Math.floor(Date.now() / 900000);
    const count = Number(cache.get(bucket) || 0);
    if (count >= 10) return json_({ ok: false, code: 'RATE_LIMITED' });
    const metrics = lead.metrics || {};
    const challenges = { leads: 'Ads without clear results', website: 'Website improvements', manual: 'Repetitive tasks', silos: 'Scattered customer information' };
    const stages = { starting: 'Pre-launch or pre-revenue', early: 'Below INR 1 lakh / month', growing: 'INR 1 lakh-5 lakh / month', established: 'Above INR 5 lakh / month', private: 'Prefer not to share' };
    const row = [
      lead.leadId, Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd HH:mm:ss'),
      literal_(lead.name), literal_(lead.business), literal_(lead.phone), literal_(lead.email),
      literal_(challenges[lead.challenge] || lead.challenge), literal_(stages[lead.stage] || lead.stage), literal_(lead.requirements), literal_(lead.sourcePage),
      metrics.monthlyRevenue == null ? '' : metrics.monthlyRevenue,
      metrics.manualHours == null ? '' : metrics.manualHours,
      metrics.monthlyAdSpend == null ? '' : metrics.monthlyAdSpend,
      metrics.revenueChangePercent == null ? '' : metrics.revenueChangePercent,
      metrics.automationSharePercent == null ? '' : metrics.automationSharePercent,
      metrics.projectedExtraRevenue == null ? '' : metrics.projectedExtraRevenue,
      metrics.hoursSavedMonthly == null ? '' : metrics.hoursSavedMonthly,
      'New'
    ];
    sheet.getRange(lastRow + 1, 1, 1, row.length).setValues([row]);
    SpreadsheetApp.flush();
    cache.put(bucket, String(count + 1), 900);
    return json_({ ok: true, persisted: true, leadId: lead.leadId });
  } catch (error) {
    return json_({ ok: false, code: error.message === 'SCHEMA_MISMATCH' ? 'SCHEMA_MISMATCH' : 'SAVE_FAILED' });
  } finally {
    if (lock && lock.hasLock()) lock.releaseLock();
  }
}
