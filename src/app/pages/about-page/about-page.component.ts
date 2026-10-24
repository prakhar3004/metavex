import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../site.config';
import { SERVICE_PAGES } from '../service-detail/service-pages.data';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="pt-6 sm:pt-14 pb-12 sm:pb-16">

      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12 text-center">
        <nav aria-label="Breadcrumb" class="flex items-center justify-center gap-2 mb-3">
          <a routerLink="/" class="text-xs font-mono text-slate-500 hover:text-slate-900">Home</a>
          <span class="text-xs font-mono text-slate-400">/</span>
          <span class="text-xs font-mono text-sunset-rose font-bold uppercase" aria-current="page">About</span>
        </nav>
        <h1 class="font-heading text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">About MetaVex Digital</h1>
        <p class="max-w-3xl mx-auto text-slate-600 text-sm sm:text-lg leading-relaxed">{{ description }} We help businesses across India connect their website, marketing, and day-to-day customer follow-ups, so interested people can understand the offer and reach the team.</p>
      </div>

      <!-- At a glance -->
      <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14" aria-labelledby="glance-heading">
        <div class="rounded-2xl sm:rounded-3xl bg-white border border-slate-200 p-5 sm:p-8 shadow-sm">
          <h2 id="glance-heading" class="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 mb-5">MetaVex Digital at a Glance</h2>
          <dl class="divide-y divide-slate-100 text-sm sm:text-base">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 py-3">
              <dt class="font-semibold text-slate-900">Name</dt>
              <dd class="sm:col-span-2 text-slate-700">MetaVex Digital (also written Metavex Digital)</dd>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 py-3">
              <dt class="font-semibold text-slate-900">Website</dt>
              <dd class="sm:col-span-2 text-slate-700">metavex.digital</dd>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 py-3">
              <dt class="font-semibold text-slate-900">What we do</dt>
              <dd class="sm:col-span-2 text-slate-700">Website development, Facebook and Instagram ads, WhatsApp automation, social media content and Reels, and business workflow automation</dd>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 py-3">
              <dt class="font-semibold text-slate-900">Who we work with</dt>
              <dd class="sm:col-span-2 text-slate-700">Small and growing businesses across India</dd>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 py-3">
              <dt class="font-semibold text-slate-900">Pricing</dt>
              <dd class="sm:col-span-2 text-slate-700">A written breakdown of fees and third-party costs before work starts</dd>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 py-3">
              <dt class="font-semibold text-slate-900">Contact</dt>
              <dd class="sm:col-span-2 text-slate-700">
                <a href="tel:+919026231351" class="font-semibold text-electric-violet underline underline-offset-4">+91 9026231351</a> (call or WhatsApp) ·
                <a href="mailto:metavexdigital@gmail.com" class="font-semibold text-electric-violet underline underline-offset-4 break-all">metavexdigital&#64;gmail.com</a>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <!-- How we work -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14" aria-labelledby="approach-heading">
        <h2 id="approach-heading" class="font-heading text-xl sm:text-3xl font-extrabold text-slate-900 text-center mb-6 sm:mb-8">How We Work</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          @for (item of principles; track item.title) {
            <article class="p-5 sm:p-7 bg-white border border-slate-200 rounded-2xl sm:rounded-3xl shadow-sm">
              <h3 class="font-heading font-bold text-lg text-slate-900 mb-2">{{ item.title }}</h3>
              <p class="text-sm leading-relaxed text-slate-600">{{ item.description }}</p>
            </article>
          }
        </div>
        <p class="mt-5 text-center text-sm text-slate-600">Read the full <a routerLink="/process" class="font-semibold text-electric-violet underline underline-offset-4">project process</a>.</p>
      </section>

      <!-- What we do not promise -->
      <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14" aria-labelledby="promises-heading">
        <div class="rounded-2xl sm:rounded-3xl bg-slate-50 border border-slate-200 p-5 sm:p-8">
          <h2 id="promises-heading" class="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 mb-3">What We Will Not Promise</h2>
          <ul class="space-y-2.5 text-sm sm:text-base leading-relaxed text-slate-700">
            <li class="flex items-start gap-3"><span class="text-sunset-rose font-bold shrink-0" aria-hidden="true">✕</span><span>A guaranteed number of leads, sales, or a fixed return on ad spend.</span></li>
            <li class="flex items-start gap-3"><span class="text-sunset-rose font-bold shrink-0" aria-hidden="true">✕</span><span>A guaranteed position on Google or in AI search results.</span></li>
            <li class="flex items-start gap-3"><span class="text-sunset-rose font-bold shrink-0" aria-hidden="true">✕</span><span>Fake reviews, invented case studies, or results we cannot show.</span></li>
          </ul>
          <p class="mt-4 text-sm text-slate-600 leading-relaxed">Instead, we agree on what to measure, share what the data shows, and decide the next step with you. Examples on our <a routerLink="/case-studies" class="font-semibold text-electric-violet underline underline-offset-4">use cases page</a> are clearly labelled as illustrative.</p>
        </div>
      </section>

      <!-- Services -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14" aria-labelledby="about-services-heading">
        <h2 id="about-services-heading" class="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 text-center mb-5">Our Services</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          @for (service of services; track service.slug) {
            <a [routerLink]="'/services/' + service.slug" class="p-4 rounded-2xl bg-white border border-slate-200 hover:border-sunset-rose/40 shadow-xs hover:shadow-md transition-all group">
              <span class="text-xl block mb-1.5" aria-hidden="true">{{ service.icon }}</span>
              <span class="font-heading font-bold text-sm text-slate-900 group-hover:text-sunset-rose">{{ service.label }} →</span>
            </a>
          }
        </div>
        <p class="mt-5 text-center text-sm text-slate-600">Prefer to learn first? Browse our <a routerLink="/guides" class="font-semibold text-electric-violet underline underline-offset-4">guides</a>.</p>
      </section>

      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <button type="button" (click)="onOpenAudit()" class="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan text-white font-heading font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all">Discuss My Business</button>
      </div>

    </div>
  `
})
export class AboutPageComponent {
  @Output() openLeadModal = new EventEmitter<void>();
  public readonly description = SITE.description;
  public readonly services = SERVICE_PAGES;
  public readonly principles = [
    { title: 'Understand the Problem First', description: 'We start with how your business works and where customers get stuck, then suggest a useful starting point.' },
    { title: 'Agree on the Work', description: 'Deliverables, costs, responsibilities, and milestones are set out in a written proposal before you commit.' },
    { title: 'Review What Matters', description: 'We choose measures that match the project, review the results with you, and use them to decide what to improve next.' }
  ];

  public onOpenAudit() {
    this.openLeadModal.emit();
  }
}
