import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-social-proof',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="relative py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="text-center max-w-2xl mx-auto mb-8">
        <span class="text-xs font-mono uppercase tracking-wider text-sunset-rose font-bold">A Startup With a Straightforward Approach</span>
        <h2 class="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4">A Good Project Starts With Clarity.</h2>
        <p class="text-sm sm:text-base text-slate-600 leading-relaxed">We are building MetaVex Digital around practical work and open conversations. Here is how we approach a new project.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        @for (item of principles; track item.title) {
          <article class="p-5 sm:p-7 bg-white border border-slate-200 rounded-3xl shadow-sm">
            <span class="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-sunset-rose/10 text-sunset-rose font-mono font-bold mb-4">{{ item.number }}</span>
            <h3 class="font-heading font-bold text-lg text-slate-900 mb-2">{{ item.title }}</h3>
            <p class="text-sm leading-relaxed text-slate-600">{{ item.description }}</p>
          </article>
        }
      </div>
      <div class="text-center mt-7">
        <a routerLink="/contact" class="inline-flex items-center justify-center rounded-xl bg-slate-900 text-white px-6 py-3 font-heading font-bold text-sm hover:bg-slate-950 transition-colors">Let’s Talk About Your Project →</a>
      </div>
    </section>
  `
})
export class SocialProofComponent {
  public readonly principles = [
    { number: '01', title: 'Understand the Problem First', description: 'Tell us how your business works and where customers get stuck. We use that context to suggest a useful starting point.' },
    { number: '02', title: 'Agree on the Work', description: 'Set out deliverables, costs, responsibilities, and milestones in a written proposal, so you can assess the plan before committing.' },
    { number: '03', title: 'Review What Matters', description: 'Choose measures that match the project, from inquiry completion to follow-up handling. Use the results to decide what to improve next.' }
  ];
}
