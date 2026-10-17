import { Component, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BeforeAfterComponent } from '../../components/before-after/before-after.component';

@Component({
  selector: 'app-comparison-page',
  standalone: true,
  imports: [RouterLink, BeforeAfterComponent],
  template: `
    <div class="pt-6 sm:pt-14 pb-16">

      <!-- Page Header -->
      <div class="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 mb-8 sm:mb-12 text-center">

        <!-- Breadcrumb -->
        <div class="flex items-center justify-center gap-2 mb-3">
          <a routerLink="/" class="text-xs font-mono text-slate-500 hover:text-slate-900">Home</a>
          <span class="text-xs font-mono text-slate-400">/</span>
          <span class="text-xs font-mono text-sunset-rose font-bold uppercase">Comparison</span>
        </div>

        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sunset-rose/10 border border-sunset-rose/25 text-sunset-rose text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <span class="w-2 h-2 rounded-full bg-sunset-rose animate-ping"></span>
          Find the Gaps
        </div>

        <h1 class="font-heading text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-3 sm:mb-4">
          Where Do Interested Customers <br class="hidden sm:inline" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan">
            Get Stuck?
          </span>
        </h1>

        <p class="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base leading-relaxed px-1 sm:px-0">
          Look at the steps between a first visit and a sales conversation. A clearer page, easier inquiry, or better follow-up may be the most useful place to start.
        </p>

        <!-- Quick CTAs -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6 px-2 sm:px-0">
          <button
            type="button"
            (click)="onOpenAudit()"
            class="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan text-white font-heading font-bold text-xs sm:text-sm shadow-md hover:scale-105 transition-all">
            Discuss My Business
          </button>
          <a
            routerLink="/case-studies"
            class="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-800 font-heading font-bold text-xs sm:text-sm hover:bg-slate-50 transition-all text-center">
            Explore Example Solutions →
          </a>
        </div>

      </div>

      <!-- Main Before/After Component -->
      <app-before-after></app-before-after>

      <!-- 4 Common Indian Business Traps We Solve -->
      <section class="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 mt-12 sm:mt-20">
        <div class="rounded-2xl sm:rounded-3xl bg-white border border-slate-200 p-4 sm:p-8 md:p-10 shadow-sm">

          <div class="max-w-2xl mb-8">
            <span class="text-xs font-mono text-sunset-rose uppercase tracking-wider font-bold">Common Friction Points</span>
            <h2 class="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Four Places Your Customer Journey Can Break Down
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div class="p-5 rounded-2xl bg-red-50/60 border border-red-200">
              <span class="text-xs font-mono font-bold text-red-700 uppercase">1. A Difficult Mobile Experience</span>
              <h4 class="font-heading font-bold text-base text-slate-900 mt-2 mb-1.5">The Click Arrives. The Page Gets in the Way.</h4>
              <p class="text-sm text-slate-600 leading-relaxed">
                If your page is slow, hard to read, or unclear about what to do next, visitors may leave. We focus on mobile usability, clear offers, and an easy way to contact you.
              </p>
            </div>

            <div class="p-5 rounded-2xl bg-red-50/60 border border-red-200">
              <span class="text-xs font-mono font-bold text-red-700 uppercase">2. Ads Without a Clear Goal</span>
              <h4 class="font-heading font-bold text-base text-slate-900 mt-2 mb-1.5">Activity Is Easy to See. Business Value Needs Tracking.</h4>
              <p class="text-sm text-slate-600 leading-relaxed">
                An ad needs a goal that matches your business. We plan the audience, message, and next step, then set up suitable tracking to help you assess inquiries or sales.
              </p>
            </div>

            <div class="p-5 rounded-2xl bg-red-50/60 border border-red-200">
              <span class="text-xs font-mono font-bold text-red-700 uppercase">3. Inquiries Waiting for a Reply</span>
              <h4 class="font-heading font-bold text-base text-slate-900 mt-2 mb-1.5">Interest Needs a Clear Next Step.</h4>
              <p class="text-sm text-slate-600 leading-relaxed">
                When messages arrive during a busy day, follow-ups can slip. Automated acknowledgements and inquiry details can help your team pick up the conversation with context.
              </p>
            </div>

            <div class="p-5 rounded-2xl bg-red-50/60 border border-red-200">
              <span class="text-xs font-mono font-bold text-red-700 uppercase">4. Scattered Customer Information</span>
              <h4 class="font-heading font-bold text-base text-slate-900 mt-2 mb-1.5">Less Searching. More Time for the Conversation.</h4>
              <p class="text-sm text-slate-600 leading-relaxed">
                If inquiries live across chats, notebooks, and spreadsheets, it is hard to see who needs a reply. A shared lead list and follow-up reminders can make the work easier to manage.
              </p>
            </div>

          </div>

          <!-- Bottom Action -->
          <div class="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p class="font-heading font-bold text-sm text-slate-900">Which of these sounds familiar?</p>
              <p class="text-xs text-slate-500 font-mono">Start with the issue that affects your customers most.</p>
            </div>
            <button
              type="button"
              (click)="onOpenAudit()"
              class="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-heading font-bold text-xs hover:bg-slate-950 transition-colors">
              Talk Through My Challenge
            </button>
          </div>

        </div>
      </section>

    </div>
  `
})
export class ComparisonPageComponent {
  @Output() openLeadModal = new EventEmitter<void>();

  public onOpenAudit() {
    this.openLeadModal.emit();
  }
}
