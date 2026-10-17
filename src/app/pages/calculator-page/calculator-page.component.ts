import { Component, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RoiCalculatorComponent, CalculatorMetrics } from '../../components/roi-calculator/roi-calculator.component';

@Component({
  selector: 'app-calculator-page',
  standalone: true,
  imports: [RouterLink, RoiCalculatorComponent],
  template: `
    <div class="pt-6 sm:pt-14 pb-16">

      <!-- Page Header -->
      <div class="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 mb-8 sm:mb-12 text-center">

        <!-- Breadcrumb -->
        <div class="flex items-center justify-center gap-2 mb-3">
          <a routerLink="/" class="text-xs font-mono text-slate-500 hover:text-slate-900">Home</a>
          <span class="text-xs font-mono text-slate-400">/</span>
          <span class="text-xs font-mono text-sunset-rose font-bold uppercase">Growth Planner</span>
        </div>

        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sunset-rose/10 border border-sunset-rose/25 text-sunset-rose text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <span class="w-2 h-2 rounded-full bg-sunset-rose animate-ping"></span>
          Explore Your Own Assumptions
        </div>

        <h1 class="font-heading text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-3 sm:mb-4">
          Explore a Change. <br class="hidden sm:inline" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan">
            Understand the Numbers.
          </span>
        </h1>

        <p class="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base leading-relaxed px-1 sm:px-0">
          Choose a revenue change and a possible share of work to automate. This simple planner shows what those assumptions mean in rupees and hours, without predicting a result.
        </p>

      </div>

      <!-- Main Calculator Component -->
      <app-roi-calculator (claimBlueprint)="onClaimBlueprint($event)"></app-roi-calculator>

      <!-- Transparent Methodology & FAQ Section -->
      <section class="max-w-5xl mx-auto px-3.5 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div class="rounded-2xl sm:rounded-3xl bg-white border border-slate-200 p-4 sm:p-8 md:p-10 shadow-sm">

          <div class="mb-6">
            <span class="text-xs font-mono text-sunset-rose uppercase tracking-wider font-bold">The Arithmetic Behind the Scenario</span>
            <h2 class="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              Every Assumption Is Visible
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs sm:text-sm text-slate-600">
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <strong class="text-slate-900 font-bold block mb-1">1. Revenue Change:</strong>
              Monthly revenue multiplied by the percentage change you choose. The annual figure multiplies that change by 12. Neither figure estimates profit.
            </div>

            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <strong class="text-slate-900 font-bold block mb-1">2. Potential Time Freed:</strong>
              Weekly repetitive hours multiplied by 4 weeks and your chosen automation percentage, rounded to whole hours. Actual feasibility needs a workflow review.
            </div>

            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <strong class="text-slate-900 font-bold block mb-1">3. Ad Budget:</strong>
              Annual ad budget is monthly spend multiplied by 12. It is shown separately; the tool does not assume that more ad spend creates more revenue or a particular ROAS.
            </div>
          </div>

        </div>
      </section>

    </div>
  `
})
export class CalculatorPageComponent {
  @Output() claimBlueprint = new EventEmitter<CalculatorMetrics>();

  public onClaimBlueprint(metrics: CalculatorMetrics) {
    this.claimBlueprint.emit(metrics);
  }
}
