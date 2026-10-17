import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoundService } from '../../services/sound.service';

interface BlueprintStep {
  stepNumber: string;
  duration: string;
  title: string;
  tagline: string;
  shortDesc: string;
  strategicFocus: string;
  deliverables: { text: string; badge: string }[];
  techUsed: string[];
  themeColor: string;
  icon: string;
  kpiHighlight: string;
  kpiLabel: string;
}

@Component({
  selector: 'app-blueprint',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="blueprint" class="relative py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16 overflow-hidden">
      
      <!-- Ambient Background Glows -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-sunset-rose/10 via-electric-violet/10 to-cyber-cyan/10 rounded-full blur-[130px] pointer-events-none"></div>

      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sunset-rose/10 border border-sunset-rose/25 text-sunset-rose text-xs font-mono font-bold uppercase tracking-wider mb-3.5 shadow-xs">
          <span class="w-2 h-2 rounded-full bg-sunset-rose animate-ping"></span>
          The Proprietary Methodology
        </div>
        
        <h2 class="font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
          The 30-Day <br class="hidden sm:inline" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan drop-shadow-sm">
            MetaVex Transformation Pipeline
          </span>
        </h2>
        
        <p class="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          How we systematically extract your company from slow websites and blind ad spending into an autonomous, high-ROAS digital engine — without disrupting your daily business.
        </p>
      </div>

      <!-- ======================================================== -->
      <!-- ULTRA-MODERN PIPELINE TIMELINE TRACK                     -->
      <!-- ======================================================== -->
      <div class="relative mb-8 sm:mb-12">
        
        <!-- Connecting Progress Bar Behind Nodes (Desktop) -->
        <div class="hidden md:block absolute top-[28px] left-[6%] right-[6%] h-[3px] bg-slate-200/90 rounded-full -z-0">
          <div 
            class="h-full bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan rounded-full transition-all duration-500 shadow-sm"
            [style.width]="progressWidth()"></div>
        </div>

        <!-- 4 Interactive Pipeline Stepper Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 relative z-10">
          @for (step of steps(); track step.stepNumber; let idx = $index) {
            <button 
              type="button"
              (click)="selectStep(idx)"
              class="group p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden backdrop-blur-xl flex flex-col justify-between"
              [class.bg-white]="selectedIdx() === idx"
              [class.border-sunset-rose]="selectedIdx() === idx"
              [class.shadow-xl]="selectedIdx() === idx"
              [class.scale-[1.02]]="selectedIdx() === idx"
              [class.bg-white/70]="selectedIdx() !== idx"
              [class.border-slate-200]="selectedIdx() !== idx"
              [class.hover:border-slate-300]="selectedIdx() !== idx"
              [class.hover:bg-white/90]="selectedIdx() !== idx">
              
              <!-- Top Step Header -->
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2">
                  <span 
                    class="w-7 h-7 rounded-full flex items-center justify-center font-heading font-black text-xs transition-colors"
                    [class.bg-sunset-rose]="selectedIdx() === idx"
                    [class.text-white]="selectedIdx() === idx"
                    [class.bg-slate-100]="selectedIdx() !== idx"
                    [class.text-slate-700]="selectedIdx() !== idx">
                    {{ step.icon }}
                  </span>
                  <span class="text-xs font-mono font-bold" [style.color]="step.themeColor">
                    STAGE {{ step.stepNumber }}
                  </span>
                </div>

                <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-bold">
                  {{ step.duration }}
                </span>
              </div>
              
              <!-- Title (Full & Clear, No Truncation) -->
              <div>
                <h4 class="font-heading font-bold text-sm sm:text-base text-slate-900 leading-snug group-hover:text-sunset-rose transition-colors mb-1">
                  {{ step.title }}
                </h4>
                <p class="text-[11px] font-mono text-slate-500 font-medium">
                  {{ step.tagline }}
                </p>
              </div>

              <!-- Active Status Underline Indicator -->
              <div 
                class="w-full h-1 rounded-full mt-3 transition-all duration-300"
                [class.bg-gradient-to-r]="selectedIdx() === idx"
                [class.from-sunset-rose]="selectedIdx() === idx"
                [class.to-electric-violet]="selectedIdx() === idx"
                [class.opacity-100]="selectedIdx() === idx"
                [class.opacity-0]="selectedIdx() !== idx"></div>
            </button>
          }
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- ACTIVE STEP COCKPIT CONTAINER (Modern Glass Card)        -->
      <!-- ======================================================== -->
      @if (currentStep()) {
        <div class="rounded-2xl sm:rounded-3xl bg-white/95 border border-slate-200/90 p-4 sm:p-8 md:p-10 lg:p-12 backdrop-blur-2xl shadow-[0_20px_50px_rgba(15,23,42,0.06)] relative overflow-hidden transition-all duration-300">
          
          <!-- Subtle Accent Corner Glow -->
          <div 
            class="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none transition-all duration-500"
            [style.background]="currentStep()!.themeColor"></div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            <!-- Left Info Panel (Span 7) -->
            <div class="lg:col-span-7 flex flex-col justify-between">
              <div>
                
                <!-- Live Stage Status Pill -->
                <div class="flex flex-wrap items-center gap-2.5 mb-4">
                  <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold border"
                    [style.background]="currentStep()!.themeColor + '12'"
                    [style.borderColor]="currentStep()!.themeColor + '35'"
                    [style.color]="currentStep()!.themeColor">
                    <span class="w-2 h-2 rounded-full animate-pulse" [style.background]="currentStep()!.themeColor"></span>
                    STAGE {{ currentStep()!.stepNumber }} OF 04 • {{ currentStep()!.duration }}
                  </span>

                  <span class="text-xs font-mono text-slate-500 font-semibold bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                    Target Execution: {{ currentStep()!.duration }}
                  </span>
                </div>

                <!-- Main Step Title -->
                <h3 class="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                  {{ currentStep()!.title }}
                </h3>

                <!-- Short Clear Description -->
                <p class="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                  {{ currentStep()!.shortDesc }}
                </p>

                <!-- Strategic Focus Callout -->
                <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-50 to-white border border-slate-200/90 shadow-xs mb-6">
                  <div class="flex items-center gap-2 mb-1.5">
                    <span class="text-sm">🎯</span>
                    <p class="text-xs font-mono uppercase text-sunset-rose font-bold tracking-wider">
                      Strategic Objective & Milestone:
                    </p>
                  </div>
                  <p class="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                    {{ currentStep()!.strategicFocus }}
                  </p>
                </div>
              </div>

              <!-- Tech Stack & Navigation Controls -->
              <div>
                <div class="mb-6">
                  <p class="text-xs font-mono uppercase text-slate-500 font-bold mb-2.5">
                    Systems, Tools & Architecture Deployed:
                  </p>
                  <div class="flex flex-wrap gap-2">
                    @for (tech of currentStep()!.techUsed; track tech) {
                      <span class="px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700 font-semibold shadow-xs">
                        {{ tech }}
                      </span>
                    }
                  </div>
                </div>

                <!-- Step Stepper Buttons -->
                <div class="flex items-center gap-3 pt-4 border-t border-slate-200">
                  <button 
                    type="button"
                    (click)="prevStep()"
                    [disabled]="selectedIdx() === 0"
                    class="px-4 py-2 rounded-xl text-xs font-heading font-bold border transition-all flex items-center gap-1.5"
                    [class.opacity-40]="selectedIdx() === 0"
                    [class.cursor-not-allowed]="selectedIdx() === 0"
                    [class.border-slate-200]="selectedIdx() > 0"
                    [class.hover:bg-slate-100]="selectedIdx() > 0">
                    ← Previous Phase
                  </button>

                  <button 
                    type="button"
                    (click)="nextStep()"
                    [disabled]="selectedIdx() === steps().length - 1"
                    class="px-4 py-2 rounded-xl text-xs font-heading font-bold transition-all flex items-center gap-1.5 text-white"
                    [style.background]="currentStep()!.themeColor"
                    [class.opacity-40]="selectedIdx() === steps().length - 1"
                    [class.cursor-not-allowed]="selectedIdx() === steps().length - 1">
                    Next Phase →
                  </button>
                </div>
              </div>

            </div>

            <!-- Right Verification Terminal & Deliverables (Span 5) -->
            <div class="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-sm relative">
              
              <div>
                <!-- Terminal Header -->
                <div class="flex items-center justify-between pb-3.5 mb-5 border-b border-slate-200">
                  <div class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span class="text-xs font-mono uppercase text-slate-700 tracking-wider font-bold">
                      Confirmed Deliverables
                    </span>
                  </div>
                  <span class="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold">
                    Phase Protocol
                  </span>
                </div>

                <!-- Key Metric Highlight for this stage -->
                <div class="p-4 rounded-xl bg-white border border-slate-200 mb-5 shadow-xs">
                  <p class="font-heading font-black text-2xl" [style.color]="currentStep()!.themeColor">
                    {{ currentStep()!.kpiHighlight }}
                  </p>
                  <p class="text-[11px] font-mono text-slate-500 mt-0.5 font-bold uppercase">
                    {{ currentStep()!.kpiLabel }}
                  </p>
                </div>

                <!-- Deliverables List with Badges -->
                <ul class="space-y-3">
                  @for (deliv of currentStep()!.deliverables; track deliv.text) {
                    <li class="flex items-start justify-between gap-3 p-2.5 rounded-xl bg-white/80 border border-slate-200/80 text-xs sm:text-sm text-slate-700 font-medium">
                      <div class="flex items-start gap-2.5">
                        <span class="text-emerald-600 font-bold mt-0.5">✓</span>
                        <span class="leading-snug">{{ deliv.text }}</span>
                      </div>
                      <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0">
                        {{ deliv.badge }}
                      </span>
                    </li>
                  }
                </ul>
              </div>

              <!-- Phase Readiness Footer -->
              <div class="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-mono">
                <span class="text-slate-500 font-medium">Phase Readiness:</span>
                <span class="inline-flex items-center gap-1.5 text-emerald-700 font-bold">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  100% Quality Inspected
                </span>
              </div>

            </div>

          </div>

        </div>
      }

    </section>
  `
})
export class BlueprintComponent {
  public sound = inject(SoundService);
  public selectedIdx = signal<number>(0);

  public steps = signal<BlueprintStep[]>([
    {
      stepNumber: '01',
      duration: 'Days 1 — 5',
      title: 'Audit & Funnel Leak Detection',
      tagline: 'Discovery & Opportunity Mapping',
      icon: '01',
      shortDesc: 'We deeply analyze your current mobile website speed, past Meta ad spends, customer inquiry handling, and repetitive staff tasks to find where money is actively leaking.',
      strategicFocus: 'Pinpoint exact customer drop-offs and define realistic revenue & lead targets before spending any ad budget.',
      deliverables: [
        { text: 'Full Mobile Speed & Core Web Vitals Diagnostic', badge: 'Tech Audit' },
        { text: 'Meta Ad Account Waste & Budget Diagnostic', badge: 'Ad Audit' },
        { text: 'Customer Lead Drop-off & Response Time Analysis', badge: 'Funnel Map' },
        { text: 'Custom 30-Day Technical & Marketing Blueprint', badge: 'Roadmap' }
      ],
      techUsed: ['Google PageSpeed', 'Meta Pixel Helper', 'Funnel Mapping', 'Process Audit'],
      themeColor: '#FF2E63',
      kpiHighlight: '100% Leak Visibility',
      kpiLabel: 'Zero blind ad spending or guesswork'
    },
    {
      stepNumber: '02',
      duration: 'Days 6 — 18',
      title: 'Fast Mobile Web & Ad Creative Build',
      tagline: 'High-Converting Assets Engine',
      icon: '02',
      shortDesc: 'We develop your ultra-fast, mobile-first website with 1-tap WhatsApp chat buttons, Razorpay/UPI checkout, and scroll-stopping ad creatives tested for Indian audiences.',
      strategicFocus: 'Give your brand a world-class digital presence that loads in under 1.2s on Jio/Airtel 4G networks.',
      deliverables: [
        { text: 'Lightning-Fast Headless Mobile Web App (< 1.2s)', badge: 'Frontend' },
        { text: '1-Click Razorpay, Cashfree & UPI Payment Flow', badge: 'Payments' },
        { text: 'High-Converting Meta Ad Creatives (Reels & Hooks)', badge: 'Creatives' },
        { text: 'Zero-Friction Mobile Product/Service Catalogs', badge: 'Catalog' }
      ],
      techUsed: ['Angular 19', 'Tailwind CSS', 'Razorpay UPI', 'Figma', 'CDN Edge'],
      themeColor: '#7C3AED',
      kpiHighlight: '< 1.2s Load Speed',
      kpiLabel: 'Optimized for Indian mobile networks'
    },
    {
      stepNumber: '03',
      duration: 'Days 19 — 25',
      title: 'Meta Ads Launch & WhatsApp Automation',
      tagline: 'Traffic & 24/7 Lead Capture',
      icon: '03',
      shortDesc: 'We set up server-side Meta Conversions API (CAPI), launch targeted buyer campaigns, and connect your 24/7 automated WhatsApp responder to capture and qualify leads in under 30 seconds.',
      strategicFocus: 'Bring verified buyer inquiries directly to your sales team with zero manual delay or lost numbers.',
      deliverables: [
        { text: 'Server-Side Meta Conversions API (CAPI) Setup', badge: 'Meta CAPI' },
        { text: '24/7 Automated WhatsApp Lead Qualifier & PDF Bot', badge: 'WhatsApp' },
        { text: 'Real-Time Lead Routing to Google Sheets & Phone', badge: 'CRM Sync' },
        { text: 'High-Intent Audience Testing & Budget Allocation', badge: 'Campaign' }
      ],
      techUsed: ['Meta CAPI', 'WhatsApp Cloud API', 'Google Sheets CRM', 'Webhooks'],
      themeColor: '#0284C7',
      kpiHighlight: '< 30s Lead Reply',
      kpiLabel: 'Instant automated lead capture'
    },
    {
      stepNumber: '04',
      duration: 'Days 26 — 30',
      title: 'Quality Inspection, Handover & Scale',
      tagline: 'Live Testing & Weekly Reporting',
      icon: '04',
      shortDesc: 'We run live test transactions, stress-test lead webhooks, train your team on viewing and closing leads, and provide ongoing transparent weekly reporting.',
      strategicFocus: 'Ensure 100% smooth daily operations, zero website downtime, and ongoing ad scaling.',
      deliverables: [
        { text: 'End-to-End Live Payment & Webhook Stress Testing', badge: 'QA Verified' },
        { text: 'Simple 1-on-1 Staff Training on Managing CRM Leads', badge: 'Training' },
        { text: 'Transparent Weekly ROAS & Cost-Per-Lead Reports', badge: 'Reporting' },
        { text: 'Dedicated WhatsApp Priority Channel with Our Team', badge: 'Support' }
      ],
      techUsed: ['Live Testing', 'Team Training', 'Transparent Analytics', 'Priority Desk'],
      themeColor: '#10B981',
      kpiHighlight: '100% Handover Ready',
      kpiLabel: 'Ongoing scaling & dedicated support'
    }
  ]);

  public currentStep = signal<BlueprintStep | null>(null);

  constructor() {
    this.currentStep.set(this.steps()[0]);
  }

  public progressWidth(): string {
    const idx = this.selectedIdx();
    const count = this.steps().length;
    return `${((idx + 0.5) / count) * 100}%`;
  }

  public selectStep(idx: number) {
    this.sound.playClick();
    this.selectedIdx.set(idx);
    this.currentStep.set(this.steps()[idx]);
  }

  public nextStep() {
    if (this.selectedIdx() < this.steps().length - 1) {
      this.selectStep(this.selectedIdx() + 1);
    }
  }

  public prevStep() {
    if (this.selectedIdx() > 0) {
      this.selectStep(this.selectedIdx() - 1);
    }
  }
}
