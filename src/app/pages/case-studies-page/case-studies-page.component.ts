import { Component, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CaseStudiesComponent } from '../../components/case-studies/case-studies.component';
import { SocialProofComponent } from '../../components/social-proof/social-proof.component';

@Component({
  selector: 'app-case-studies-page',
  standalone: true,
  imports: [RouterLink, CaseStudiesComponent, SocialProofComponent],
  template: `
    <div class="pt-6 sm:pt-14 pb-16">

      <!-- Page Header -->
      <div class="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 mb-8 sm:mb-12 text-center">

        <!-- Breadcrumb -->
        <div class="flex items-center justify-center gap-2 mb-3">
          <a routerLink="/" class="text-xs font-mono text-slate-500 hover:text-slate-900">Home</a>
          <span class="text-xs font-mono text-slate-400">/</span>
          <span class="text-xs font-mono text-sunset-rose font-bold uppercase">Use Cases</span>
        </div>

        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sunset-rose/10 border border-sunset-rose/25 text-sunset-rose text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <span class="w-2 h-2 rounded-full bg-sunset-rose animate-ping"></span>
          Examples to Explore
        </div>

        <h1 class="font-heading text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-3 sm:mb-4">
          See How Your Business Could <br class="hidden sm:inline" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan">
            Work With Fewer Gaps.
          </span>
        </h1>

        <p class="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base leading-relaxed px-1 sm:px-0">
          Explore example approaches for product brands, suppliers, clinics, and property businesses. These are illustrative scenarios to help you picture a solution, not completed client projects or measured results.
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
            routerLink="/process"
            class="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-800 font-heading font-bold text-xs sm:text-sm hover:bg-slate-50 transition-all text-center">
            See How We Work →
          </a>
        </div>

      </div>

      <!-- Main Use Cases Grid with Expandable Modals -->
      <app-case-studies></app-case-studies>

      <!-- Working Principles -->
      <app-social-proof></app-social-proof>

    </div>
  `
})
export class CaseStudiesPageComponent {
  @Output() openLeadModal = new EventEmitter<void>();

  public onOpenAudit() {
    this.openLeadModal.emit();
  }
}
