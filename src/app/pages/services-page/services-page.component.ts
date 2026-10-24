import { Component, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServicesBentoComponent } from '../../components/services-bento/services-bento.component';
import { SERVICE_PAGES } from '../service-detail/service-pages.data';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [RouterLink, ServicesBentoComponent],
  template: `
    <div class="pt-6 sm:pt-14 pb-16">

      <!-- Page Header -->
      <div class="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 mb-8 sm:mb-14 text-center">

        <!-- Breadcrumb & Badge -->
        <div class="flex items-center justify-center gap-2 mb-3">
          <a routerLink="/" class="text-xs font-mono text-slate-500 hover:text-slate-900">Home</a>
          <span class="text-xs font-mono text-slate-400">/</span>
          <span class="text-xs font-mono text-sunset-rose font-bold uppercase">Services</span>
        </div>

        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sunset-rose/10 border border-sunset-rose/25 text-sunset-rose text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <span class="w-2 h-2 rounded-full bg-sunset-rose animate-ping"></span>
          Choose What Your Business Needs
        </div>

        <h1 class="font-heading text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-3 sm:mb-4">
          A Clearer Website. Better Follow-Ups. <br class="hidden sm:inline" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan">
            A More Connected Business.
          </span>
        </h1>

        <p class="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base leading-relaxed px-1 sm:px-0">
          Whether you need a better website, a focused ad campaign, or less manual work, start with the problem holding you back. We help you choose a practical place to begin.
        </p>

        <!-- Quick Action CTAs -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 px-2 sm:px-0">
          <button
            type="button"
            (click)="onOpenAudit()"
            class="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan text-white font-heading font-bold text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all">
            Discuss My Business
          </button>

          <a
            routerLink="/calculator"
            class="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-800 font-heading font-bold text-xs sm:text-sm hover:bg-slate-50 transition-all text-center">
            Explore a Growth Scenario →
          </a>
        </div>

      </div>

      <!-- Main Services Bento Grid Component -->
      <app-services-bento></app-services-bento>

      <!-- Links to each service detail page -->
      <section class="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 mt-4 sm:mt-6" aria-labelledby="service-pages-heading">
        <h2 id="service-pages-heading" class="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 mb-4 text-center">Explore Each Service in Detail</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          @for (service of servicePages; track service.slug) {
            <a [routerLink]="'/services/' + service.slug" class="p-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 hover:border-sunset-rose/40 shadow-xs hover:shadow-md transition-all group">
              <span class="text-xl block mb-1.5" aria-hidden="true">{{ service.icon }}</span>
              <span class="font-heading font-bold text-sm text-slate-900 group-hover:text-sunset-rose block">{{ service.label }} →</span>
              <span class="text-xs text-slate-500 mt-1 block leading-relaxed">{{ service.eyebrow }}</span>
            </a>
          }
        </div>
      </section>

      <!-- Detailed Breakdown Table of Deliverables -->
      <section class="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 mt-12 sm:mt-20">
        <div class="rounded-2xl sm:rounded-3xl bg-white border border-slate-200 p-4 sm:p-8 md:p-10 shadow-sm">

          <div class="max-w-2xl mb-8">
            <span class="text-xs font-mono text-sunset-rose uppercase tracking-wider font-bold">Plan Your Scope</span>
            <h2 class="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              What We Can Build Around Your Needs
            </h2>
            <p class="text-sm text-slate-600 mt-2">
              Your proposal sets out the deliverables, timeline, costs, and access arrangements. Choose one service or combine the parts your business needs.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <span class="text-2xl mb-3 block">⚡</span>
              <h4 class="font-heading font-bold text-base text-slate-900 mb-2">Web Engineering</h4>
              <ul class="space-y-2 text-xs font-mono text-slate-600">
                <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Mobile layout and page speed improvements</li>
                <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Payment integration where needed</li>
                <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Clear service or product pages</li>
                <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Hosting and launch setup</li>
              </ul>
            </div>

            <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <span class="text-2xl mb-3 block">📈</span>
              <h4 class="font-heading font-bold text-base text-slate-900 mb-2">Meta & Instagram Ads</h4>
              <ul class="space-y-2 text-xs font-mono text-slate-600">
                <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Conversion tracking setup where suitable</li>
                <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Audience, offer, and creative testing</li>
                <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Goals based on your budget and margins</li>
                <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Reporting schedule agreed in your plan</li>
              </ul>
            </div>

            <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <span class="text-2xl mb-3 block">💬</span>
              <h4 class="font-heading font-bold text-base text-slate-900 mb-2">WhatsApp Automation</h4>
              <ul class="space-y-2 text-xs font-mono text-slate-600">
                <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Automated replies to common questions</li>
                <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Catalog sharing and inquiry collection</li>
                <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Lead updates in your CRM or Sheets</li>
                <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> API setup subject to platform approval</li>
              </ul>
            </div>

          </div>

          <!-- Bottom CTA -->
          <div class="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p class="font-heading font-bold text-sm text-slate-900">Need a custom combination of services?</p>
              <p class="text-xs text-slate-500 font-mono">Tell us where things get stuck. We can discuss the priorities before you commit to a project.</p>
            </div>
            <button
              type="button"
              (click)="onOpenAudit()"
              class="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-heading font-bold text-xs hover:bg-slate-950 transition-colors">
              Talk Through My Requirements
            </button>
          </div>

        </div>
      </section>

    </div>
  `
})
export class ServicesPageComponent {
  @Output() openLeadModal = new EventEmitter<void>();
  public readonly servicePages = SERVICE_PAGES;

  public onOpenAudit() {
    this.openLeadModal.emit();
  }
}
