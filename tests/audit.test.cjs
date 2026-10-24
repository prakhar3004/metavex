const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const { Subject } = require('rxjs');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const sound = { playClick() {}, playTick() {}, playChime() {} };
const decorator = () => () => {};
const signal = initial => {
  let current = initial;
  const value = () => current;
  value.set = next => { current = next; };
  value.update = updater => { current = updater(current); };
  return value;
};
class EventEmitter extends Subject { emit(value) { this.next(value); } }
class ElementRef {}
const documentToken = Symbol('DOCUMENT');

// Exercise component logic without constructing Angular's browser renderer.
function load(file, options = {}) {
  const core = {
    Component: decorator, Injectable: decorator, Directive: decorator,
    Input: decorator, Output: decorator, HostListener: decorator, ViewChild: decorator,
    signal, computed: callback => callback, EventEmitter, ElementRef,
    afterNextRender: callback => { if (options.globals?.window) callback(); },
    ChangeDetectionStrategy: { OnPush: 0 },
    inject: token => options.inject ? options.inject(token) : sound
  };
  const exports = {};
  const source = ts.transpileModule(read(file), {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, experimentalDecorators: true }
  }).outputText;
  vm.runInNewContext(source, {
    exports, console,
    require: name => {
      if (name === '@angular/core') return core;
      if (name === '@angular/common') return { DOCUMENT: documentToken };
      if (name === 'rxjs') return require('rxjs');
      return options.modules?.[name] ?? {};
    },
    ...options.globals
  }, { filename: file });
  return exports;
}

function makePlanner() {
  const { RoiCalculatorComponent } = load('src/app/components/roi-calculator/roi-calculator.component.ts');
  return new RoiCalculatorComponent();
}

function makeBrief(options) {
  const { OnboardingWizardComponent } = load('src/app/components/onboarding-wizard/onboarding-wizard.component.ts', options);
  return new OnboardingWizardComponent();
}

test('planner starts neutral and calculates positive, negative, zero and annual scenarios', () => {
  const planner = makePlanner();
  assert.equal(planner.projectedExtraRevenue(), 0);
  assert.equal(planner.hoursSavedMonthly(), 0);
  planner.monthlyRevenue.set(500000);
  planner.manualHours.set(20);
  planner.revenueChangePercent.set(10);
  planner.automationSharePercent.set(50);
  assert.equal(planner.projectedExtraRevenue(), 50000);
  assert.equal(planner.hoursSavedMonthly(), 40);
  assert.equal(planner.annualRevenueChange(), 600000);
  planner.monthlyAdSpend.set(25000);
  assert.equal(planner.annualAdSpend(), 300000);
  assert.equal(planner.projectedExtraRevenue(), 50000, 'ad budget must not manufacture revenue');
  planner.revenueChangePercent.set(-10);
  assert.equal(planner.projectedExtraRevenue(), -50000);
  assert.equal(planner.formatChange(-50000), '-₹50,000');
  planner.monthlyRevenue.set(0);
  assert.equal(planner.projectedExtraRevenue(), 0, 'zero revenue must not return negative zero');
});

test('planner rejects non-finite values and bounds input to the supported scenario', () => {
  const planner = makePlanner();
  const change = (field, value) => planner.updateInput(field, { target: { value } });
  change('monthlyRevenue', '-1');
  assert.equal(planner.monthlyRevenue(), 0);
  change('monthlyRevenue', '999999999');
  assert.equal(planner.monthlyRevenue(), 5000000);
  change('monthlyRevenue', 'NaN');
  assert.equal(planner.monthlyRevenue(), 5000000);
  change('revenueChangePercent', '-90');
  assert.equal(planner.revenueChangePercent(), -25);
  change('automationSharePercent', '200');
  assert.equal(planner.automationSharePercent(), 100);
  let payload;
  planner.claimBlueprint.subscribe(value => { payload = value; });
  planner.onClaimBlueprint();
  assert.equal(payload.revenueChangePercent, -25);
  assert.equal(payload.automationSharePercent, 100);
});

test('brief cannot skip required choices or advance outside its four steps', () => {
  const brief = makeBrief();
  brief.prevStep();
  assert.equal(brief.currentStep(), 1);
  brief.nextStep();
  assert.equal(brief.currentStep(), 1);
  brief.selectBottleneck('website');
  brief.nextStep();
  assert.equal(brief.currentStep(), 2);
  brief.nextStep();
  assert.equal(brief.currentStep(), 2);
  brief.selectRevenueTier('private');
  brief.nextStep();
  assert.equal(brief.currentStep(), 3);
  brief.submitLead();
  assert.equal(brief.currentStep(), 3);
  brief.formName = '  ';
  brief.formCompany = 'Example';
  assert.equal(brief.canReview, false);
});

test('brief requires a phone, validates optional email and safely encodes editable drafts', () => {
  const brief = makeBrief();
  brief.selectedBottleneck.set('website');
  brief.selectedRevenue.set('private');
  brief.formName = '  Preview & QA  ';
  brief.formCompany = 'Brand & Co';
  brief.formGoal = 'Mobile catalog\nSizes & enquiries';
  assert.equal(brief.canReview, false);
  brief.formPhone = '+91 98765 43210';
  assert.equal(brief.canReview, true);
  brief.formEmail = 'not-an-email';
  assert.equal(brief.canReview, false);
  brief.formEmail = 'hello@example.com';
  brief.formPhone = 'wrong number';
  assert.equal(brief.canReview, false);
  brief.formPhone = '+91 98765 43210';
  assert.equal(brief.canReview, true);
  brief.submitLead();
  assert.equal(brief.currentStep(), 4);
  const url = new URL(brief.whatsAppDraftUrl);
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, '/919026231351');
  assert.equal(url.searchParams.get('text'), brief.briefMessage);
  assert.match(brief.briefMessage, /Name: Preview & QA/);
  assert.match(brief.briefMessage, /Skip revenue details/);
  const email = new URL(brief.emailDraftUrl);
  assert.equal(email.protocol, 'mailto:');
  assert.equal(email.searchParams.get('body'), brief.briefMessage);
  brief.formEmail = '';
  brief.formPhone = '';
  assert.doesNotMatch(brief.briefMessage, /Email:|Phone:/);
  const planner = makePlanner();
  planner.revenueChangePercent.set(-10);
  planner.claimBlueprint.subscribe(metrics => { brief.prefillMetrics = metrics; });
  planner.onClaimBlueprint();
  assert.match(brief.briefMessage, /my assumptions, not a forecast/);
  assert.match(brief.briefMessage, /Revenue change assumption: -10%/);
  brief.prevStep();
  assert.equal(brief.currentStep(), 3);
});

test('blocked preference storage does not crash site startup or sound controls', () => {
  const blockedWindow = {};
  Object.defineProperty(blockedWindow, 'localStorage', { get() { throw new Error('Storage blocked'); } });
  const { SoundService } = load('src/app/services/sound.service.ts', { globals: { window: blockedWindow } });
  const service = new SoundService();
  assert.equal(service.isMuted(), true, 'new visitors start with sound off');
  assert.doesNotThrow(() => service.toggleMute());
  assert.doesNotThrow(() => service.playClick());
  assert.equal(service.isMuted(), false);
});

test('unsupported WebGL does not crash the page and touch devices do not activate the custom cursor', () => {
  const { HeroCanvasComponent } = load('src/app/components/hero-canvas/hero-canvas.component.ts', {
    globals: { window: { matchMedia: () => ({ matches: true }) } },
    inject: () => ({ runOutsideAngular: callback => callback() })
  });
  const hero = new HeroCanvasComponent();
  hero.canvasRef = { nativeElement: { hidden: false } };
  hero.initThree = () => { throw new Error('WebGL unavailable'); };
  assert.doesNotThrow(() => hero.ngAfterViewInit());
  assert.equal(hero.canvasRef.nativeElement.hidden, true);
  assert.doesNotThrow(() => hero.ngOnDestroy());
  const { CustomCursorComponent } = load('src/app/components/custom-cursor/custom-cursor.component.ts', {
    globals: { window: { matchMedia: () => ({ matches: false }) } }
  });
  const cursor = new CustomCursorComponent();
  cursor.ngOnInit();
  cursor.onMouseEnter();
  cursor.onMouseMove({ clientX: 100, clientY: 100 });
  assert.equal(cursor.isVisible(), false);
});

test('route transitions release old CTA subscriptions and clear stale planner context', () => {
  const { App } = load('src/app/app.ts');
  const app = new App();
  const oldPage = new EventEmitter();
  app.onRouteActivate({ openLeadModal: oldPage });
  oldPage.emit({ monthlyRevenue: 123 });
  assert.equal(app.showLeadModal(), true);
  assert.equal(app.prefilledMetrics().monthlyRevenue, 123);
  app.onRouteActivate({});
  oldPage.emit({ monthlyRevenue: 999 });
  assert.equal(app.showLeadModal(), false);
  app.openLeadModal();
  assert.equal(app.prefilledMetrics(), null);
  app.ngOnDestroy();
  assert.equal(oldPage.observers.length, 0);
});

test('native modal lifecycle preserves nested scroll locks and restores original styles', () => {
  const document = { documentElement: { style: { overflow: 'auto' } } };
  let scrollLock;
  const dialog = { open: false, showModal() { this.open = true; }, close() { this.open = false; } };
  const exports = load('src/app/directives/modal.directive.ts', {
    inject: token => token === documentToken ? document : token === ElementRef ? { nativeElement: dialog } : scrollLock
  });
  scrollLock = new exports.ModalScrollLock();
  const modal = new exports.ModalDirective();
  let dismissals = 0;
  modal.dismiss.subscribe(() => { dismissals++; });
  modal.ngAfterViewInit();
  assert.equal(dialog.open, true);
  assert.equal(document.documentElement.style.overflow, 'hidden');
  scrollLock.lock();
  modal.onBackdropClick({ target: {} });
  assert.equal(dismissals, 0);
  modal.onBackdropClick({ target: dialog });
  modal.onCancel({ preventDefault() {} });
  assert.equal(dismissals, 2);
  modal.ngOnDestroy();
  assert.equal(dialog.open, false);
  assert.equal(document.documentElement.style.overflow, 'hidden');
  scrollLock.unlock();
  assert.equal(document.documentElement.style.overflow, 'auto');
});

test('navigation exposes valid destinations without a Home menu item', () => {
  const { NavbarComponent } = load('src/app/components/navbar/navbar.component.ts', { globals: { window: { innerWidth: 1280 } } });
  const nav = new NavbarComponent();
  assert.equal(nav.links.length, 6);
  assert.ok(nav.links.every(link => link.path !== '/' && link.label !== 'Home'));
  nav.toggleMobileMenu();
  assert.equal(nav.mobileMenuOpen(), true);
  nav.onResize();
  assert.equal(nav.mobileMenuOpen(), false);
});

test('page metadata updates descriptions and resets noindex after leaving an unknown URL', () => {
  class TitleStrategy { buildTitle(snapshot) { return snapshot.title; } }
  const tags = new Map();
  const meta = { updateTag(tag) { tags.set(tag.name ?? tag.property, tag.content); } };
  let title;
  class Meta {}
  class Title {}
  const elements = [];
  const document = {
    head: { querySelector: () => elements.find(element => element.rel === 'canonical'), appendChild: element => elements.push(element) },
    getElementById: id => elements.find(element => element.id === id),
    createElement: () => ({ setAttribute(name, value) { this[name] = value; }, remove() { elements.splice(elements.indexOf(this), 1); } })
  };
  const { PageTitleStrategy } = load('src/app/services/page-title.strategy.ts', {
    modules: { '@angular/router': { TitleStrategy }, '@angular/platform-browser': { Meta, Title },
      '../site.config': load('src/app/site.config.ts'), '../components/faq/faq.data': load('src/app/components/faq/faq.data.ts') },
    inject: token => token === documentToken ? document : token === Title ? { setTitle(value) { title = value; } } : meta
  });
  const strategy = new PageTitleStrategy();
  strategy.updateTitle({ url: '/missing', title: 'Not Found', root: { data: { description: 'Missing page', robots: 'noindex,follow' } } });
  assert.equal(tags.get('robots'), 'noindex,follow');
  strategy.updateTitle({ url: '/services?utm_source=test#intro', title: 'Services', root: { firstChild: { data: { description: 'Useful services' } } } });
  assert.equal(title, 'Services');
  assert.equal(tags.get('description'), 'Useful services');
  assert.equal(tags.get('og:description'), 'Useful services');
  assert.match(tags.get('robots'), /^index,follow/);
  assert.equal(elements.find(element => element.rel === 'canonical').href, 'https://metavex.digital/services');
  const graph = JSON.parse(elements.find(element => element.id === 'site-structured-data').textContent)['@graph'];
  assert.equal(graph.find(node => node['@type'] === 'Organization').telephone, '+919026231351');
  assert.ok(graph.find(node => node['@type'] === 'WebSite').alternateName.includes('MetaVex'), 'site name schema must list the short brand name');
  assert.ok(!('sameAs' in graph.find(node => node['@type'] === 'Organization')), 'no empty or invented profile links');
  assert.equal(tags.get('og:image'), 'https://metavex.digital/og-image.png');
  assert.equal(tags.get('twitter:card'), 'summary_large_image');
  assert.ok(!graph.some(node => node['@type'] === 'FAQPage'), 'no FAQ schema on a page without visible FAQs');
  strategy.updateTitle({ url: '/missing', title: 'Not Found', root: { data: { robots: 'noindex,follow' } } });
  assert.equal(elements.length, 0, 'unknown URLs must not retain canonical or schema from the previous page');
});

test('brief retries failures with the same ID, prevents double submits and confirms only a saved request', async () => {
  let reject;
  let resolve;
  const requests = [];
  const capture = { saveLead(payload) { requests.push(payload); return new Promise((yes, no) => { resolve = yes; reject = no; }); } };
  class LeadCaptureService {}
  const brief = makeBrief({ modules: { '../../services/lead-capture.service': { LeadCaptureService } }, inject: token => token === LeadCaptureService ? capture : sound });
  brief.selectedBottleneck.set('website');
  brief.selectedRevenue.set('private');
  brief.formName = 'Example';
  brief.formCompany = 'Test Business';
  brief.formPhone = '+91 9876543210';
  brief.submitLead();
  const first = brief.captureLead();
  assert.equal(brief.isSubmitting(), true);
  await brief.captureLead();
  assert.equal(requests.length, 1);
  assert.equal(brief.savedLeadId(), '');
  reject(new Error('Network failure'));
  await first;
  assert.equal(brief.isSubmitting(), false);
  assert.match(brief.submissionError(), /could not save/);
  assert.equal(brief.formName, 'Example');
  const retry = brief.captureLead();
  assert.equal(requests[0].leadId, requests[1].leadId);
  resolve(requests[1].leadId);
  await retry;
  assert.equal(brief.savedLeadId(), requests[1].leadId);
  await brief.captureLead();
  assert.equal(requests.length, 2);
});

test('all Angular templates parse; links, assets, labels and button types are valid', async () => {
  const { parseTemplate } = await import('@angular/compiler');
  const routeSource = read('src/app/app.routes.ts');
  const routes = new Set([...routeSource.matchAll(/path: '([^']*)'/g)].map(match => '/' + match[1]));
  const templates = [];
  function collect(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) collect(fullPath);
      else if (entry.name.endsWith('.html')) templates.push([fullPath, fs.readFileSync(fullPath, 'utf8')]);
      else if (entry.name.endsWith('.ts')) {
        const source = ts.createSourceFile(fullPath, fs.readFileSync(fullPath, 'utf8'), ts.ScriptTarget.Latest, true);
        function visit(node) {
          if (ts.isPropertyAssignment(node) && node.name.getText(source) === 'template' && ts.isNoSubstitutionTemplateLiteral(node.initializer)) templates.push([fullPath, node.initializer.text]);
          ts.forEachChild(node, visit);
        }
        visit(source);
      }
    }
  }
  collect(path.join(root, 'src/app'));
  assert.ok(templates.length >= 20);
  for (const [file, content] of templates) {
    const parsed = parseTemplate(content, file);
    assert.equal(parsed.errors, null, `${file}: ${parsed.errors?.join('\n')}`);
    const elements = [];
    const visit = node => {
      if (node.name && Array.isArray(node.attributes)) elements.push(node);
      for (const key of ['children', 'branches', 'cases']) for (const child of node[key] ?? []) visit(child);
      for (const key of ['placeholder', 'loading', 'error', 'empty']) if (node[key]) visit(node[key]);
    };
    parsed.nodes.forEach(visit);
    const ids = new Set();
    for (const element of elements) {
      const attrs = Object.fromEntries(element.attributes.map(attribute => [attribute.name, attribute.value]));
      if (attrs.id) { assert.ok(!ids.has(attrs.id), `${file}: duplicate id ${attrs.id}`); ids.add(attrs.id); }
      if (element.name === 'button') assert.ok(['button', 'submit', 'reset'].includes(attrs.type), `${file}: button missing type`);
      if (attrs.routerLink != null) assert.ok(routes.has(attrs.routerLink), `${file}: missing route ${attrs.routerLink}`);
      if (attrs.href) assert.doesNotMatch(attrs.href, /^(javascript:|#$)/, `${file}: placeholder or unsafe link`);
      if (attrs.target === '_blank') assert.ok(attrs.rel?.split(/\s+/).includes('noopener'), `${file}: unsafe external target`);
      if (element.name === 'img') {
        assert.ok('alt' in attrs, `${file}: image missing alt`);
        assert.ok(attrs.width && attrs.height, `${file}: image missing dimensions`);
        assert.ok(fs.existsSync(path.join(root, 'public', attrs.src)), `${file}: missing asset ${attrs.src}`);
      }
    }
    for (const element of elements) {
      const attrs = Object.fromEntries(element.attributes.map(attribute => [attribute.name, attribute.value]));
      if (element.name === 'label' && attrs.for) assert.ok(ids.has(attrs.for), `${file}: label points to missing control`);
    }
  }
});
