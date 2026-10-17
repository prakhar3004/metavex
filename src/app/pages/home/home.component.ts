import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeroCanvasComponent } from '../../components/hero-canvas/hero-canvas.component';
import { BeforeAfterComponent } from '../../components/before-after/before-after.component';
import { ServicesBentoComponent } from '../../components/services-bento/services-bento.component';
import { RoiCalculatorComponent, CalculatorMetrics } from '../../components/roi-calculator/roi-calculator.component';
import { CaseStudiesComponent } from '../../components/case-studies/case-studies.component';
import { BlueprintComponent } from '../../components/blueprint/blueprint.component';
import { SocialProofComponent } from '../../components/social-proof/social-proof.component';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HeroCanvasComponent,
    BeforeAfterComponent,
    ServicesBentoComponent,
    RoiCalculatorComponent,
    CaseStudiesComponent,
    BlueprintComponent,
    SocialProofComponent
  ],
  template: `
    <div>
      <!-- ========================================== -->
      <!-- HERO SECTION: "The Digital Metamorphosis" -->
      <!-- ========================================== -->
      <section id="hero" class="relative pt-8 sm:pt-12 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        <!-- 3D WebGL Interactive Three.js Canvas (Absolute Background) -->
        <div class="absolute inset-0 z-0 opacity-90 pointer-events-auto">
          <app-hero-canvas></app-hero-canvas>
        </div>

        <!-- Ambient Gradient Overlays for High-Contrast Text Legibility (Refined Light Mode) -->
        <div class="absolute inset-0 bg-radial-vignette pointer-events-none z-10"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-[#FAFBFC] pointer-events-none z-10"></div>
        
        <!-- Hero Foreground Content -->
        <div class="relative z-20 max-w-5xl mx-auto text-center flex flex-col items-center">
          
          <!-- Live Status Pill - Cyber Sunset Light -->
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/95 border border-sunset-rose/30 backdrop-blur-xl shadow-xs mb-4 animate-float-slow">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sunset-rose opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-sunset-rose"></span>
            </span>
            <span class="text-xs font-mono font-medium text-slate-700">
              Digital Growth & Automation Engine • <strong class="text-sunset-rose font-bold">Built for Indian Businesses 🇮🇳</strong>
            </span>
          </div>

          <!-- Main Headline (Honest, High Impact, Benefit-Focused) -->
          <h1 class="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.1] mb-3 sm:mb-4">
            Grow Your Business Online With
            <span class="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan drop-shadow-[0_4px_25px_rgba(255,46,99,0.22)]">
              High-Converting Tech, Ads & Automation.
            </span>
          </h1>

          <!-- High-Conversion Subtitle: Direct Fayda / Benefit -->
          <p class="max-w-2xl text-slate-600 text-sm sm:text-lg font-normal leading-relaxed mb-6 sm:mb-7 text-balance">
            We help ambitious Indian brands and growing businesses stop wasting money on slow websites and blind ad spending. We build fast modern web platforms, high-ROAS Meta campaigns, and automated WhatsApp lead systems that convert inquiries into paying customers.
          </p>

          <!-- Dual Magnetic CTAs -->
          <div class="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-8 sm:mb-10 w-full sm:w-auto">
            
            <!-- Primary CTA Button - Cyber Sunset -->
            <button 
              type="button"
              (click)="onOpenAudit()"
              class="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan text-white font-heading font-extrabold text-sm sm:text-base tracking-wide shadow-neon-rose hover:shadow-neon-cyan/50 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-3 group">
              <span>Get Free 30-Min Growth Audit</span>
              <svg class="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

            <!-- Secondary Explore Services CTA -->
            <a 
              routerLink="/services"
              class="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white/90 hover:bg-white border border-slate-200/90 hover:border-sunset-rose/40 text-slate-800 hover:text-slate-950 font-heading font-bold text-sm sm:text-base tracking-wide backdrop-blur-xl shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2">
              <span>Explore All 5 Services</span>
              <span class="text-xs font-mono text-sunset-rose">→</span>
            </a>

          </div>

          <!-- Micro Trust Signals Bar - Grounded & Believable -->
          <div class="w-full max-w-4xl p-1 rounded-2xl gradient-border-wrapper shadow-lg">
            <div class="gradient-border-inner p-3.5 sm:p-5 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
              
              <div>
                <p class="font-heading font-extrabold text-xl sm:text-2xl text-slate-900">&lt; 1.2s</p>
                <p class="text-[10px] sm:text-[11px] font-mono text-slate-500 uppercase mt-0.5 font-bold tracking-wider">Mobile Load Speed</p>
              </div>

              <div>
                <p class="font-heading font-extrabold text-xl sm:text-2xl text-sunset-rose">2.8x - 4.2x</p>
                <p class="text-[10px] sm:text-[11px] font-mono text-slate-500 uppercase mt-0.5 font-bold tracking-wider">Typical Client ROAS</p>
              </div>

              <div>
                <p class="font-heading font-extrabold text-xl sm:text-2xl text-cyber-cyan">18+ hrs</p>
                <p class="text-[10px] sm:text-[11px] font-mono text-slate-500 uppercase mt-0.5 font-bold tracking-wider">Saved / Wk via Automation</p>
              </div>

              <div>
                <p class="font-heading font-extrabold text-xl sm:text-2xl text-electric-violet">&lt; 30s</p>
                <p class="text-[10px] sm:text-[11px] font-mono text-slate-500 uppercase mt-0.5 font-bold tracking-wider">WhatsApp Response Time</p>
              </div>

            </div>
          </div>

        </div>

      </section>

      <!-- 2. QUICK NAVIGATION PORTAL (Browse Dedicated Pages) -->
      <section class="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
          <div class="text-center max-w-2xl mx-auto mb-6">
            <span class="text-xs font-mono text-sunset-rose uppercase tracking-wider font-bold">Dedicated Portals</span>
            <h3 class="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              Explore MetaVex By Category
            </h3>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <a routerLink="/services" class="p-4 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-sunset-rose/40 text-center transition-all hover:shadow-md group">
              <span class="text-2xl block mb-2">⚡</span>
              <span class="font-heading font-bold text-xs sm:text-sm text-slate-900 block group-hover:text-sunset-rose">Services</span>
              <span class="text-[10px] font-mono text-slate-500">Tech & Ads</span>
            </a>

            <a routerLink="/comparison" class="p-4 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-sunset-rose/40 text-center transition-all hover:shadow-md group">
              <span class="text-2xl block mb-2">⚖️</span>
              <span class="font-heading font-bold text-xs sm:text-sm text-slate-900 block group-hover:text-sunset-rose">Comparison</span>
              <span class="text-[10px] font-mono text-slate-500">Before vs After</span>
            </a>

            <a routerLink="/calculator" class="p-4 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-sunset-rose/40 text-center transition-all hover:shadow-md group">
              <span class="text-2xl block mb-2">📊</span>
              <span class="font-heading font-bold text-xs sm:text-sm text-slate-900 block group-hover:text-sunset-rose">Calculator</span>
              <span class="text-[10px] font-mono text-slate-500">ROI Simulator</span>
            </a>

            <a routerLink="/case-studies" class="p-4 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-sunset-rose/40 text-center transition-all hover:shadow-md group">
              <span class="text-2xl block mb-2">📁</span>
              <span class="font-heading font-bold text-xs sm:text-sm text-slate-900 block group-hover:text-sunset-rose">Case Studies</span>
              <span class="text-[10px] font-mono text-slate-500">Verified Proof</span>
            </a>

            <a routerLink="/process" class="p-4 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-sunset-rose/40 text-center transition-all hover:shadow-md group">
              <span class="text-2xl block mb-2">🛣️</span>
              <span class="font-heading font-bold text-xs sm:text-sm text-slate-900 block group-hover:text-sunset-rose">30-Day Process</span>
              <span class="text-[10px] font-mono text-slate-500">Transformation</span>
            </a>

            <a routerLink="/contact" class="p-4 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-sunset-rose/40 text-center transition-all hover:shadow-md group">
              <span class="text-2xl block mb-2">📞</span>
              <span class="font-heading font-bold text-xs sm:text-sm text-slate-900 block group-hover:text-sunset-rose">Contact Us</span>
              <span class="text-[10px] font-mono text-slate-500">Direct WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      <!-- 3. BEFORE vs AFTER COMPARISON HIGHLIGHT -->
      <app-before-after></app-before-after>

      <!-- 4. CORE SERVICES BENTO GRID -->
      <app-services-bento></app-services-bento>

      <!-- 5. INTERACTIVE ROI CALCULATOR -->
      <app-roi-calculator (claimBlueprint)="onClaimBlueprint($event)"></app-roi-calculator>

      <!-- 6. VERIFIED CASE STUDIES -->
      <app-case-studies></app-case-studies>

      <!-- 7. 30-DAY BLUEPRINT PROCESS -->
      <app-blueprint></app-blueprint>

      <!-- 8. AUTHENTIC SOCIAL PROOF -->
      <app-social-proof></app-social-proof>

    </div>
  `
})
export class HomeComponent {
  public sound = inject(SoundService);

  @Output() openLeadModal = new EventEmitter<CalculatorMetrics | undefined>();

  public onOpenAudit() {
    this.sound.playChime();
    this.openLeadModal.emit();
  }

  public onClaimBlueprint(metrics: CalculatorMetrics) {
    this.sound.playChime();
    this.openLeadModal.emit(metrics);
  }
}
