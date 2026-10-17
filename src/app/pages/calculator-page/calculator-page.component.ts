import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RoiCalculatorComponent, CalculatorMetrics } from '../../components/roi-calculator/roi-calculator.component';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-calculator-page',
  standalone: true,
  imports: [CommonModule, RouterLink, RoiCalculatorComponent],
  template: `
    <div class="pt-6 sm:pt-14 pb-16">
      
      <!-- Page Header -->
      <div class="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 mb-8 sm:mb-12 text-center">
        
        <!-- Breadcrumb -->
        <div class="flex items-center justify-center gap-2 mb-3">
          <a routerLink="/" class="text-xs font-mono text-slate-500 hover:text-slate-900">Home</a>
          <span class="text-xs font-mono text-slate-400">/</span>
          <span class="text-xs font-mono text-sunset-rose font-bold uppercase">ROI Calculator</span>
        </div>

        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sunset-rose/10 border border-sunset-rose/25 text-sunset-rose text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <span class="w-2 h-2 rounded-full bg-sunset-rose animate-ping"></span>
          Business Value Simulator
        </div>

        <h1 class="font-heading text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-3 sm:mb-4">
          Calculate Your Projected <br class="hidden sm:inline" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan">
            Revenue Lift & Hours Saved.
          </span>
        </h1>

        <p class="max-w-2xl mx-auto text-slate-600 text-xs sm:text-base leading-relaxed px-1 sm:px-0">
          Move the sliders below with your current monthly revenue, staff busywork hours, and ad spend to simulate your business’s financial upside from modern web speed and WhatsApp automation.
        </p>

      </div>

      <!-- Main Calculator Component -->
      <app-roi-calculator (claimBlueprint)="onClaimBlueprint($event)"></app-roi-calculator>

      <!-- Transparent Methodology & FAQ Section -->
      <section class="max-w-5xl mx-auto px-3.5 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div class="rounded-2xl sm:rounded-3xl bg-white border border-slate-200 p-4 sm:p-8 md:p-10 shadow-sm">
          
          <div class="mb-6">
            <span class="text-xs font-mono text-sunset-rose uppercase tracking-wider font-bold">Transparent Calculation Methodology</span>
            <h3 class="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              How These Numbers Are Modeled
            </h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs sm:text-sm text-slate-600">
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <strong class="text-slate-900 font-bold block mb-1">1. Speed & Conversion Lift:</strong>
              Google and Indian e-commerce benchmarks show that reducing mobile load time from 5s to under 1.2s typically recovers 18%–25% of drop-off visitors.
            </div>

            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <strong class="text-slate-900 font-bold block mb-1">2. Staff Hours Saved:</strong>
              Automating customer FAQs, catalog PDF dispatch, and lead qualification via WhatsApp Cloud API saves an average of 70% repetitive admin hours.
            </div>

            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <strong class="text-slate-900 font-bold block mb-1">3. Meta Ads ROAS Modeling:</strong>
              Server-side Conversions API (CAPI) tracking prevents pixel signal loss, improving audience targeting accuracy and stabilizing ROAS at 2.8x - 4.2x.
            </div>
          </div>

        </div>
      </section>

    </div>
  `
})
export class CalculatorPageComponent {
  public sound = inject(SoundService);
  @Output() claimBlueprint = new EventEmitter<CalculatorMetrics>();

  public onClaimBlueprint(metrics: CalculatorMetrics) {
    this.sound.playChime();
    this.claimBlueprint.emit(metrics);
  }
}
