import { Component, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlueprintComponent } from '../../components/blueprint/blueprint.component';

@Component({
  selector: 'app-process-page',
  standalone: true,
  imports: [RouterLink, BlueprintComponent],
  template: `
    <div class="pt-6 sm:pt-14 pb-12 sm:pb-16">

      <!-- Page Header -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 text-center">

        <!-- Breadcrumb -->
        <div class="flex items-center justify-center gap-2 mb-3">
          <a routerLink="/" class="text-xs font-mono text-slate-500 hover:text-slate-900">Home</a>
          <span class="text-xs font-mono text-slate-400">/</span>
          <span class="text-xs font-mono text-sunset-rose font-bold uppercase">Working Process</span>
        </div>

        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sunset-rose/10 border border-sunset-rose/25 text-sunset-rose text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <span class="w-2 h-2 rounded-full bg-sunset-rose animate-ping"></span>
          From First Conversation to Launch
        </div>

        <h1 class="font-heading text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">
          A Clear Plan. <br class="hidden sm:inline" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan">
            A Practical Way Forward.
          </span>
        </h1>

        <p class="max-w-2xl mx-auto text-slate-600 text-sm md:text-base leading-relaxed">
          We start by understanding your business, agree on the work, then build and test it with you. Your timeline depends on the scope, content, access, and any platform approvals.
        </p>

        <!-- Quick CTAs -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mt-6 max-w-md sm:max-w-none mx-auto">
          <button
            type="button"
            (click)="onOpenAudit()"
            class="w-full sm:w-auto px-6 py-3.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan text-white font-heading font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all text-center">
            Discuss My Project
          </button>
          <a
            routerLink="/services"
            class="w-full sm:w-auto px-6 py-3.5 sm:py-3 rounded-xl sm:rounded-2xl bg-white border border-slate-200 text-slate-800 font-heading font-bold text-xs sm:text-sm hover:bg-slate-50 transition-all text-center">
            Explore Our Services →
          </a>
        </div>

      </div>

      <!-- Main Modern Blueprint Component -->
      <app-blueprint></app-blueprint>

      <!-- Project communication and handover -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 md:mt-20">
        <div class="rounded-2xl sm:rounded-3xl bg-white border border-slate-200 p-4 sm:p-8 md:p-10 shadow-sm">

          <div class="max-w-2xl mb-6 sm:mb-8">
            <span class="text-xs font-mono text-sunset-rose uppercase tracking-wider font-bold">Working Together</span>
            <h2 class="font-heading text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">
              Know What Is Happening and What Comes Next
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div class="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200">
              <span class="text-2xl mb-2 block">📱</span>
              <h4 class="font-heading font-bold text-sm sm:text-base text-slate-900 mb-1">An Agreed Contact Channel</h4>
              <p class="text-xs text-slate-600 leading-relaxed font-mono">
                Agree on a contact person and channel at the start, so you know where to ask questions and share feedback.
              </p>
            </div>

            <div class="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200">
              <span class="text-2xl mb-2 block">📊</span>
              <h4 class="font-heading font-bold text-sm sm:text-base text-slate-900 mb-1">Progress You Can Review</h4>
              <p class="text-xs text-slate-600 leading-relaxed font-mono">
                Your project plan sets the update schedule. Review the work, discuss open questions, and agree on the next milestone.
              </p>
            </div>

            <div class="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200">
              <span class="text-2xl mb-2 block">🔒</span>
              <h4 class="font-heading font-bold text-sm sm:text-base text-slate-900 mb-1">Clear Access and Handover</h4>
              <p class="text-xs text-slate-600 leading-relaxed font-mono">
                We agree on account access, source files, third-party tools, and handover details in your proposal before work begins.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  `
})
export class ProcessPageComponent {
  @Output() openLeadModal = new EventEmitter<void>();

  public onOpenAudit() {
    this.openLeadModal.emit();
  }
}
