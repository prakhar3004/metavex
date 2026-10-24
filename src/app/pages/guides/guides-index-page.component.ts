import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GUIDES } from './guides.data';

@Component({
  selector: 'app-guides-index-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="pt-6 sm:pt-14 pb-12 sm:pb-16">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 text-center">
        <nav aria-label="Breadcrumb" class="flex items-center justify-center gap-2 mb-3">
          <a routerLink="/" class="text-xs font-mono text-slate-500 hover:text-slate-900">Home</a>
          <span class="text-xs font-mono text-slate-400">/</span>
          <span class="text-xs font-mono text-sunset-rose font-bold uppercase" aria-current="page">Guides</span>
        </nav>
        <h1 class="font-heading text-2xl xs:text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">Guides for Growing Indian Businesses</h1>
        <p class="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base leading-relaxed">Practical, sourced answers about websites, Facebook and Instagram ads, and WhatsApp for business, written by the MetaVex Digital team and updated when platform rules change.</p>
      </div>

      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        @for (guide of guides; track guide.slug) {
          <article class="flex flex-col p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-sunset-rose/30 hover:shadow-md transition-all">
            <h2 class="font-heading font-bold text-base sm:text-lg text-slate-900 mb-2 leading-snug">
              <a [routerLink]="'/guides/' + guide.slug" class="hover:text-sunset-rose transition-colors">{{ guide.title }}</a>
            </h2>
            <p class="text-sm leading-relaxed text-slate-600 mb-4 flex-1">{{ guide.keyTakeaways[0] }}</p>
            <p class="text-xs font-mono text-slate-500">Updated <time [attr.datetime]="guide.updated">{{ guide.updated }}</time> • {{ guide.readMinutes }} min read</p>
          </article>
        }
      </div>

      <p class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 text-sm text-slate-600 text-center">Have a question we have not answered? <a routerLink="/contact" class="font-semibold text-electric-violet underline underline-offset-4">Ask the MetaVex team.</a></p>
    </div>
  `
})
export class GuidesIndexPageComponent {
  public readonly guides = GUIDES;
}
