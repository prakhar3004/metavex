import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SERVICE_PAGES } from '../service-detail/service-pages.data';
import { GUIDES } from './guides.data';

@Component({
  selector: 'app-guide-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <article class="pt-6 sm:pt-14 pb-12 sm:pb-16">

      <!-- Article Header -->
      <header class="max-w-3xl mx-auto px-4 sm:px-6 mb-8 sm:mb-10">
        <nav aria-label="Breadcrumb" class="flex flex-wrap items-center gap-2 mb-4">
          <a routerLink="/" class="text-xs font-mono text-slate-500 hover:text-slate-900">Home</a>
          <span class="text-xs font-mono text-slate-400">/</span>
          <a routerLink="/guides" class="text-xs font-mono text-slate-500 hover:text-slate-900">Guides</a>
        </nav>

        <h1 class="font-heading text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.15] mb-4">{{ guide.title }}</h1>

        <p class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-slate-500">
          <span>By <a routerLink="/about" class="font-semibold text-slate-700 hover:text-sunset-rose">MetaVex Digital</a></span>
          <span aria-hidden="true">•</span>
          <span>Updated <time [attr.datetime]="guide.updated">{{ formatDate(guide.updated) }}</time></span>
          <span aria-hidden="true">•</span>
          <span>{{ guide.readMinutes }} min read</span>
        </p>
      </header>

      <div class="max-w-3xl mx-auto px-4 sm:px-6">

        <!-- Short answer (the summary AI answers and featured snippets can quote) -->
        <section class="rounded-2xl sm:rounded-3xl bg-white border-2 border-sunset-rose/25 p-5 sm:p-7 shadow-sm mb-6" aria-labelledby="short-answer-heading">
          <h2 id="short-answer-heading" class="text-xs font-mono text-sunset-rose uppercase tracking-wider font-bold mb-2">Short Answer</h2>
          <p class="text-base sm:text-lg leading-relaxed text-slate-800">{{ guide.summary }}</p>
        </section>

        <section class="rounded-2xl sm:rounded-3xl bg-slate-50 border border-slate-200 p-5 sm:p-7 mb-10 sm:mb-12" aria-labelledby="takeaways-heading">
          <h2 id="takeaways-heading" class="font-heading text-lg sm:text-xl font-extrabold text-slate-900 mb-3">Key Takeaways</h2>
          <ul class="space-y-2.5">
            @for (item of guide.keyTakeaways; track item) {
              <li class="flex items-start gap-3 text-sm sm:text-base leading-relaxed text-slate-700">
                <span class="text-emerald-600 font-bold shrink-0" aria-hidden="true">✓</span>
                <span>{{ item }}</span>
              </li>
            }
          </ul>
        </section>

        @for (section of guide.sections; track section.heading) {
          <section class="mb-10 sm:mb-12">
            <h2 class="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 mb-3 sm:mb-4">{{ section.heading }}</h2>
            @for (paragraph of section.paragraphs ?? []; track $index) {
              <p class="text-sm sm:text-base leading-relaxed text-slate-700 mb-4">{{ paragraph }}</p>
            }
            @if (section.list) {
              <ul class="space-y-2.5">
                @for (item of section.list; track item) {
                  <li class="flex items-start gap-3 text-sm sm:text-base leading-relaxed text-slate-700">
                    <span class="text-sunset-rose font-bold shrink-0" aria-hidden="true">›</span>
                    <span>{{ item }}</span>
                  </li>
                }
              </ul>
            }
            @if (section.table; as table) {
              <!-- Real table from sm up; stacked cards on phones so nothing scrolls sideways. -->
              <table class="hidden sm:table w-full text-left text-sm border-collapse rounded-2xl overflow-hidden border border-slate-200 bg-white">
                <thead class="bg-slate-50">
                  <tr>
                    @for (header of table.headers; track $index) {
                      <th scope="col" class="p-3 font-heading font-bold text-slate-900 border-b border-slate-200 align-top">{{ header }}</th>
                    }
                  </tr>
                </thead>
                <tbody>
                  @for (row of table.rows; track $index) {
                    <tr class="border-b border-slate-100 last:border-0">
                      @for (cell of row; track $index; let first = $first) {
                        @if (first) {
                          <th scope="row" class="p-3 font-semibold text-slate-900 align-top">{{ cell }}</th>
                        } @else {
                          <td class="p-3 text-slate-700 leading-relaxed align-top">{{ cell }}</td>
                        }
                      }
                    </tr>
                  }
                </tbody>
              </table>
              <div class="sm:hidden space-y-3">
                @for (row of table.rows; track $index) {
                  <div class="rounded-2xl border border-slate-200 bg-white p-4">
                    <p class="font-heading font-bold text-sm text-slate-900 mb-2">{{ row[0] }}</p>
                    @for (cell of row.slice(1); track $index; let index = $index) {
                      <p class="text-sm leading-relaxed text-slate-700"><span class="font-semibold text-slate-900">{{ table.headers[index + 1] }}:</span> {{ cell }}</p>
                    }
                  </div>
                }
              </div>
            }
          </section>
        }

        <!-- Related service -->
        @if (service) {
          <section class="rounded-2xl sm:rounded-3xl bg-white border border-slate-200 p-5 sm:p-7 shadow-sm mb-10 sm:mb-12">
            <p class="text-xs font-mono text-sunset-rose uppercase tracking-wider font-bold mb-1">Need Help With This?</p>
            <h2 class="font-heading text-lg sm:text-xl font-extrabold text-slate-900 mb-2">{{ service.eyebrow }} by MetaVex Digital</h2>
            <p class="text-sm leading-relaxed text-slate-600 mb-4">{{ service.intro }}</p>
            <div class="flex flex-col sm:flex-row gap-3">
              <a [routerLink]="'/services/' + service.slug" class="px-5 py-3 rounded-xl bg-slate-900 text-white font-heading font-bold text-xs sm:text-sm text-center hover:bg-slate-950 transition-colors">See {{ service.label }} Service →</a>
              <button type="button" (click)="onOpenAudit()" class="px-5 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 font-heading font-bold text-xs sm:text-sm hover:bg-slate-50 transition-colors">Discuss My Business</button>
            </div>
          </section>
        }

        <!-- FAQs (mirrored in FAQPage schema) -->
        <section class="mb-10 sm:mb-12" aria-labelledby="guide-faq-heading">
          <h2 id="guide-faq-heading" class="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 mb-4">Frequently Asked Questions</h2>
          <div class="space-y-3">
            @for (faq of guide.faqs; track faq.question) {
              <details class="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                <summary class="min-h-11 cursor-pointer font-heading text-sm sm:text-base font-bold text-slate-900 leading-relaxed py-2">{{ faq.question }}</summary>
                <p class="pt-2 text-sm sm:text-base leading-relaxed text-slate-600">{{ faq.answer }}</p>
              </details>
            }
          </div>
        </section>

        <!-- Sources -->
        <section class="mb-10 sm:mb-12" aria-labelledby="sources-heading">
          <h2 id="sources-heading" class="font-heading text-lg font-extrabold text-slate-900 mb-3">Sources</h2>
          <ul class="space-y-2 text-sm">
            @for (source of guide.sources; track source.url) {
              <li><a [href]="source.url" target="_blank" rel="noopener noreferrer" class="text-electric-violet underline underline-offset-4 break-words">{{ source.label }}</a></li>
            }
          </ul>
          <p class="mt-3 text-xs text-slate-500 leading-relaxed">Platform rules and prices change. Check the linked official pages before making decisions. This guide is general information, not legal or financial advice.</p>
        </section>

        <!-- More guides -->
        <section aria-labelledby="more-guides-heading">
          <h2 id="more-guides-heading" class="font-heading text-lg font-extrabold text-slate-900 mb-3">More Guides</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            @for (other of others; track other.slug) {
              <a [routerLink]="'/guides/' + other.slug" class="p-4 rounded-2xl bg-white border border-slate-200 hover:border-sunset-rose/40 hover:shadow-md transition-all font-heading font-bold text-sm text-slate-900 hover:text-sunset-rose">{{ other.title }} →</a>
            }
          </div>
        </section>

      </div>
    </article>
  `
})
export class GuidePageComponent {
  @Output() openLeadModal = new EventEmitter<void>();
  private readonly slug = inject(ActivatedRoute).snapshot.data['guide'] as string;
  public readonly guide = GUIDES.find(item => item.slug === this.slug) ?? GUIDES[0];
  public readonly others = GUIDES.filter(item => item !== this.guide);
  public readonly service = SERVICE_PAGES.find(item => item.slug === this.guide.relatedService);

  public formatDate(date: string) {
    return new Date(date + 'T00:00:00Z').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  }

  public onOpenAudit() {
    this.openLeadModal.emit();
  }
}
