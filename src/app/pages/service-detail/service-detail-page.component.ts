import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SITE } from '../../site.config';
import { SERVICE_PAGES } from './service-pages.data';

@Component({
  selector: 'app-service-detail-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="pt-6 sm:pt-14 pb-12 sm:pb-16">

      <!-- Page Header -->
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14 text-center">
        <nav aria-label="Breadcrumb" class="flex flex-wrap items-center justify-center gap-2 mb-3">
          <a routerLink="/" class="text-xs font-mono text-slate-500 hover:text-slate-900">Home</a>
          <span class="text-xs font-mono text-slate-400">/</span>
          <a routerLink="/services" class="text-xs font-mono text-slate-500 hover:text-slate-900">Services</a>
          <span class="text-xs font-mono text-slate-400">/</span>
          <span class="text-xs font-mono text-sunset-rose font-bold uppercase" aria-current="page">{{ page.label }}</span>
        </nav>

        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sunset-rose/10 border border-sunset-rose/25 text-sunset-rose text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-4 max-w-full">
          <span aria-hidden="true">{{ page.icon }}</span>
          {{ page.eyebrow }}
        </div>

        <h1 class="font-heading text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.15] mb-4">
          {{ page.h1 }}
        </h1>

        <p class="max-w-3xl mx-auto text-slate-600 text-sm sm:text-base leading-relaxed">{{ page.intro }}</p>

        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mt-6 max-w-md sm:max-w-none mx-auto">
          <button
            type="button"
            (click)="onOpenAudit()"
            class="w-full sm:w-auto px-6 py-3.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan text-white font-heading font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all text-center">
            Discuss My Project
          </button>
          <a
            [href]="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full sm:w-auto px-6 py-3.5 sm:py-3 rounded-xl sm:rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-xs sm:text-sm shadow-md transition-all text-center">
            💬 WhatsApp +91 9026231351
          </a>
        </div>
      </div>

      <!-- Who it helps -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16" aria-labelledby="fit-heading">
        <div class="rounded-2xl sm:rounded-3xl bg-white border border-slate-200 p-4 sm:p-8 md:p-10 shadow-sm">
          <span class="text-xs font-mono text-sunset-rose uppercase tracking-wider font-bold">Is This Right for You?</span>
          <h2 id="fit-heading" class="font-heading text-xl sm:text-3xl font-extrabold text-slate-900 mt-1 mb-5 sm:mb-6">When {{ page.label }} Can Help</h2>
          <ul class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            @for (item of page.forWhom; track item) {
              <li class="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm leading-relaxed text-slate-700">
                <span class="text-emerald-600 font-bold shrink-0" aria-hidden="true">✓</span>
                <span>{{ item }}</span>
              </li>
            }
          </ul>
        </div>
      </section>

      <!-- What's included -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16" aria-labelledby="included-heading">
        <div class="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <span class="text-xs font-mono text-sunset-rose uppercase tracking-wider font-bold">What We Can Include</span>
          <h2 id="included-heading" class="font-heading text-xl sm:text-3xl font-extrabold text-slate-900 mt-1">What Your {{ page.label }} Project Covers</h2>
          <p class="text-sm text-slate-600 mt-2 leading-relaxed">Your proposal lists the exact deliverables. Choose the parts your business needs.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          @for (item of page.included; track item.title) {
            <article class="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-sunset-rose/30 transition-colors">
              <h3 class="font-heading font-bold text-base text-slate-900 mb-2">{{ item.title }}</h3>
              <p class="text-sm leading-relaxed text-slate-600">{{ item.text }}</p>
            </article>
          }
        </div>
      </section>

      <!-- How it works -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16" aria-labelledby="steps-heading">
        <div class="rounded-2xl sm:rounded-3xl bg-white border border-slate-200 p-4 sm:p-8 md:p-10 shadow-sm">
          <span class="text-xs font-mono text-sunset-rose uppercase tracking-wider font-bold">How It Works</span>
          <h2 id="steps-heading" class="font-heading text-xl sm:text-3xl font-extrabold text-slate-900 mt-1 mb-5 sm:mb-6">From First Conversation to Launch</h2>
          <ol class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            @for (step of page.steps; track step.title; let index = $index) {
              <li class="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <span class="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-sunset-rose/10 text-sunset-rose font-mono font-bold mb-3">0{{ index + 1 }}</span>
                <h3 class="font-heading font-bold text-sm sm:text-base text-slate-900 mb-1.5">{{ step.title }}</h3>
                <p class="text-sm leading-relaxed text-slate-600">{{ step.text }}</p>
              </li>
            }
          </ol>
          <p class="mt-5 text-sm text-slate-600">See the full <a routerLink="/process" class="font-semibold text-electric-violet underline underline-offset-4">MetaVex project process</a>.</p>
        </div>
      </section>

      <!-- Cost factors -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16" aria-labelledby="cost-heading">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6 items-start">
          <div class="lg:col-span-2">
            <span class="text-xs font-mono text-sunset-rose uppercase tracking-wider font-bold">Pricing</span>
            <h2 id="cost-heading" class="font-heading text-xl sm:text-3xl font-extrabold text-slate-900 mt-1 mb-3">What Affects the Cost</h2>
            <p class="text-sm leading-relaxed text-slate-600">There is no fixed package price. You receive a written breakdown of our fees and any third-party costs before deciding. To explore the numbers first, try the <a routerLink="/calculator" class="font-semibold text-electric-violet underline underline-offset-4">growth planner</a>.</p>
          </div>
          <ul class="lg:col-span-3 space-y-3">
            @for (factor of page.costFactors; track factor) {
              <li class="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs text-sm leading-relaxed text-slate-700">
                <span class="text-sunset-rose font-bold shrink-0" aria-hidden="true">›</span>
                <span>{{ factor }}</span>
              </li>
            }
          </ul>
        </div>
      </section>

      <!-- FAQs (mirrored in FAQPage schema) -->
      <section class="max-w-4xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16" aria-labelledby="service-faq-heading">
        <h2 id="service-faq-heading" class="font-heading text-xl sm:text-3xl font-extrabold text-slate-900 text-center mb-6 sm:mb-8">{{ page.label }} Questions</h2>
        <div class="space-y-3">
          @for (faq of page.faqs; track faq.question) {
            <details class="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
              <summary class="min-h-11 cursor-pointer font-heading text-sm sm:text-base font-bold text-slate-900 leading-relaxed py-2">{{ faq.question }}</summary>
              <p class="pt-2 text-sm sm:text-base leading-relaxed text-slate-600">{{ faq.answer }}</p>
            </details>
          }
        </div>
      </section>

      <!-- Related services -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="related-heading">
        <div class="rounded-2xl sm:rounded-3xl bg-white border border-slate-200 p-4 sm:p-8 shadow-sm">
          <h2 id="related-heading" class="font-heading text-lg sm:text-2xl font-extrabold text-slate-900 mb-4 sm:mb-5">Other MetaVex Digital Services</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            @for (other of others; track other.slug) {
              <a [routerLink]="'/services/' + other.slug" class="p-4 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-sunset-rose/40 transition-all hover:shadow-md group">
                <span class="text-xl block mb-1.5" aria-hidden="true">{{ other.icon }}</span>
                <span class="font-heading font-bold text-sm text-slate-900 group-hover:text-sunset-rose">{{ other.label }} →</span>
              </a>
            }
          </div>
          <div class="mt-6 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p class="text-sm text-slate-600">Not sure where to start? <a routerLink="/services" class="font-semibold text-electric-violet underline underline-offset-4">Compare all services</a> or tell us about your business.</p>
            <button
              type="button"
              (click)="onOpenAudit()"
              class="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 text-white font-heading font-bold text-xs sm:text-sm hover:bg-slate-950 transition-colors">
              Talk Through My Requirements
            </button>
          </div>
        </div>
      </section>

    </div>
  `
})
export class ServiceDetailPageComponent {
  @Output() openLeadModal = new EventEmitter<void>();
  private readonly slug = inject(ActivatedRoute).snapshot.data['service'] as string;
  public readonly page = SERVICE_PAGES.find(item => item.slug === this.slug) ?? SERVICE_PAGES[0];
  public readonly others = SERVICE_PAGES.filter(item => item !== this.page);
  public readonly whatsappUrl = `https://wa.me/${SITE.phone.replace('+', '')}?text=${encodeURIComponent(this.page.whatsapp)}`;

  public onOpenAudit() {
    this.openLeadModal.emit();
  }
}
