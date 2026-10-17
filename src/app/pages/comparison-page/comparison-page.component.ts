import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BeforeAfterComponent } from '../../components/before-after/before-after.component';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-comparison-page',
  standalone: true,
  imports: [CommonModule, RouterLink, BeforeAfterComponent],
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
          Operational Reality Check
        </div>

        <h1 class="font-heading text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-3 sm:mb-4">
          The Cost of Manual Chaos vs <br class="hidden sm:inline" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan">
            Autonomous Digital Scaling.
          </span>
        </h1>

        <p class="max-w-2xl mx-auto text-slate-600 text-xs sm:text-base leading-relaxed px-1 sm:px-0">
          See the transparent, side-by-side operational differences between running a business on slow templates and manual phone calls versus MetaVex high-converting automation.
        </p>

        <!-- Quick CTAs -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6 px-2 sm:px-0">
          <button 
            type="button"
            (click)="onOpenAudit()"
            class="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan text-white font-heading font-bold text-xs sm:text-sm shadow-md hover:scale-105 transition-all">
            Get Free Funnel Leak Audit
          </button>
          <a 
            routerLink="/case-studies"
            class="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-800 font-heading font-bold text-xs sm:text-sm hover:bg-slate-50 transition-all text-center">
            See Real Client Proof →
          </a>
        </div>

      </div>

      <!-- Main Before/After Component -->
      <app-before-after></app-before-after>

      <!-- 4 Common Indian Business Traps We Solve -->
      <section class="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 mt-12 sm:mt-20">
        <div class="rounded-2xl sm:rounded-3xl bg-white border border-slate-200 p-4 sm:p-8 md:p-10 shadow-sm">
          
          <div class="max-w-2xl mb-8">
            <span class="text-xs font-mono text-sunset-rose uppercase tracking-wider font-bold">Root Cause Analysis</span>
            <h3 class="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Why Most Indian Businesses Waste 50% of Their Marketing Budget
            </h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div class="p-5 rounded-2xl bg-red-50/60 border border-red-200">
              <span class="text-xs font-mono font-bold text-red-700 uppercase">Trap #1: Heavy WordPress Templates on Mobile</span>
              <h4 class="font-heading font-bold text-base text-slate-900 mt-2 mb-1.5">Paying for Ads, Losing on Page Speed</h4>
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Over 70% of Indian web traffic comes on mobile phones over 4G/Jio. When an ad click opens a bloated site taking 6+ seconds, users exit before ever seeing your products. You pay Meta for the click, but get 0 leads.
              </p>
            </div>

            <div class="p-5 rounded-2xl bg-red-50/60 border border-red-200">
              <span class="text-xs font-mono font-bold text-red-700 uppercase">Trap #2: Boosting Posts Without Conversion API</span>
              <h4 class="font-heading font-bold text-base text-slate-900 mt-2 mb-1.5">Getting Vanity Likes, Zero Buying Customers</h4>
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Clicking the blue "Boost Post" button on Instagram optimizes for cheap engagement (likes and comments), not purchases or high-intent inquiries. Without Meta CAPI tracking, Meta’s algorithm never learns who actually buys.
              </p>
            </div>

            <div class="p-5 rounded-2xl bg-red-50/60 border border-red-200">
              <span class="text-xs font-mono font-bold text-red-700 uppercase">Trap #3: 4-to-24 Hour Inquiry Response Delays</span>
              <h4 class="font-heading font-bold text-base text-slate-900 mt-2 mb-1.5">Losing Hot Leads to Faster Competitors</h4>
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                When an Indian buyer messages your business, they are actively looking to buy right now. If your team replies 8 hours later or the next morning, 40%+ of buyers have already bought from someone who replied in 2 minutes.
              </p>
            </div>

            <div class="p-5 rounded-2xl bg-red-50/60 border border-red-200">
              <span class="text-xs font-mono font-bold text-red-700 uppercase">Trap #4: Manual Excel Copy-Pasting</span>
              <h4 class="font-heading font-bold text-base text-slate-900 mt-2 mb-1.5">Staff Wasting 20+ Hours on Administrative Busywork</h4>
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Writing down phone numbers on paper, sending brochures manually one by one, and forgetting follow-ups leads to massive operational friction. MetaVex automates this entire pipeline into Google Sheets and WhatsApp.
              </p>
            </div>

          </div>

          <!-- Bottom Action -->
          <div class="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p class="font-heading font-bold text-sm text-slate-900">Stop the leaks in your customer funnel.</p>
              <p class="text-xs text-slate-500 font-mono">Let our engineering team audit your digital operations for free.</p>
            </div>
            <button 
              type="button" 
              (click)="onOpenAudit()"
              class="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-heading font-bold text-xs hover:bg-slate-950 transition-colors">
              Schedule Free Audit
            </button>
          </div>

        </div>
      </section>

    </div>
  `
})
export class ComparisonPageComponent {
  public sound = inject(SoundService);
  @Output() openLeadModal = new EventEmitter<void>();

  public onOpenAudit() {
    this.sound.playChime();
    this.openLeadModal.emit();
  }
}
