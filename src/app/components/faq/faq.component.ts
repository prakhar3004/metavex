import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FAQS } from './faq.data';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16" aria-labelledby="faq-heading">
      <div class="mb-6 sm:mb-8 text-center">
        <h2 id="faq-heading" class="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">A Few Answers Before You Start</h2>
        <p class="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">Understand the scope, costs, and next steps before making a decision.</p>
      </div>
      <div class="space-y-3">
        @for (faq of faqs; track faq.question) {
          <details class="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
            <summary class="min-h-11 cursor-pointer font-heading text-sm sm:text-base font-bold text-slate-900 leading-relaxed py-2">{{ faq.question }}</summary>
            <p class="pt-2 text-sm sm:text-base leading-relaxed text-slate-600">{{ faq.answer }}</p>
          </details>
        }
      </div>
      <p class="mt-6 text-center text-sm leading-relaxed text-slate-600">Have a different question? <a routerLink="/contact" class="font-semibold text-electric-violet underline underline-offset-4">Tell us what you need.</a></p>
    </section>
  `
})
export class FaqComponent {
  readonly faqs = FAQS;
}
