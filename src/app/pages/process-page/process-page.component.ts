import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlueprintComponent } from '../../components/blueprint/blueprint.component';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-process-page',
  standalone: true,
  imports: [CommonModule, RouterLink, BlueprintComponent],
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
          The Proprietary Methodology
        </div>

        <h1 class="font-heading text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">
          The 30-Day <br class="hidden sm:inline" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan">
            MetaVex Transformation Pipeline.
          </span>
        </h1>

        <p class="max-w-2xl mx-auto text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
          From chaotic manual operations to an automated, high-ROAS digital engine. Here is the exact week-by-week protocol we deploy for every client.
        </p>

        <!-- Quick CTAs -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mt-6 max-w-md sm:max-w-none mx-auto">
          <button 
            type="button"
            (click)="onOpenAudit()"
            class="w-full sm:w-auto px-6 py-3.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan text-white font-heading font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all text-center">
            Schedule 30-Day Kickoff Call
          </button>
          <a 
            routerLink="/services"
            class="w-full sm:w-auto px-6 py-3.5 sm:py-3 rounded-xl sm:rounded-2xl bg-white border border-slate-200 text-slate-800 font-heading font-bold text-xs sm:text-sm hover:bg-slate-50 transition-all text-center">
            Explore Services Included →
          </a>
        </div>

      </div>

      <!-- Main Modern Blueprint Component -->
      <app-blueprint></app-blueprint>

      <!-- Communication & Guarantee Protocol -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 md:mt-20">
        <div class="rounded-2xl sm:rounded-3xl bg-white border border-slate-200 p-4 sm:p-8 md:p-10 shadow-sm">
          
          <div class="max-w-2xl mb-6 sm:mb-8">
            <span class="text-xs font-mono text-sunset-rose uppercase tracking-wider font-bold">Client Onboarding Standard</span>
            <h3 class="font-heading text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 mt-1">
              How We Communicate During The 30 Days
            </h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div class="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200">
              <span class="text-2xl mb-2 block">📱</span>
              <h4 class="font-heading font-bold text-sm sm:text-base text-slate-900 mb-1">Dedicated WhatsApp Group</h4>
              <p class="text-xs text-slate-600 leading-relaxed font-mono">
                Direct group with our lead tech engineer and Meta ad strategist. No ticketing systems or waiting days for email replies.
              </p>
            </div>

            <div class="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200">
              <span class="text-2xl mb-2 block">📊</span>
              <h4 class="font-heading font-bold text-sm sm:text-base text-slate-900 mb-1">Weekly Video Progress Reports</h4>
              <p class="text-xs text-slate-600 leading-relaxed font-mono">
                A 5-minute Loom video walking you through exact ROAS metrics, lead volume, page speed benchmarks, and next steps every Monday.
              </p>
            </div>

            <div class="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200">
              <span class="text-2xl mb-2 block">🔒</span>
              <h4 class="font-heading font-bold text-sm sm:text-base text-slate-900 mb-1">100% Asset Ownership</h4>
              <p class="text-xs text-slate-600 leading-relaxed font-mono">
                You retain complete administrative access to your ad accounts, pixel data, WhatsApp bot scripts, and website source code.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  `
})
export class ProcessPageComponent {
  public sound = inject(SoundService);
  @Output() openLeadModal = new EventEmitter<void>();

  public onOpenAudit() {
    this.sound.playChime();
    this.openLeadModal.emit();
  }
}
