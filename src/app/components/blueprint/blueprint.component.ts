import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoundService } from '../../services/sound.service';

interface BlueprintStep {
  stepNumber: string;
  duration: string;
  title: string;
  shortDesc: string;
  focus: string;
  deliverables: string[];
  techUsed: string[];
  color: string;
}

@Component({
  selector: 'app-blueprint',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="blueprint" class="relative py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16">
      
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sunset-rose/10 border border-sunset-rose/25 text-sunset-rose text-xs font-mono font-bold uppercase tracking-wider mb-3">
          <span class="w-1.5 h-1.5 rounded-full bg-sunset-rose"></span>
          The Proprietary Methodology
        </div>
        <h2 class="font-heading text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-3 sm:mb-4">
          The 30-Day <br class="hidden sm:inline" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan">
            MetaVex Transformation Pipeline
          </span>
        </h2>
        <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
          How we systematically extract your company from chaotic manual operations into an autonomous digital empire without missing a single day of business.
        </p>
      </div>

      <!-- Steps Selector Timeline - Luxury Light -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 sm:mb-8">
        @for (step of steps(); track step.stepNumber; let idx = $index) {
          <button 
            type="button"
            (click)="selectStep(idx)"
            class="p-4 rounded-2xl border text-left transition-all duration-200 relative overflow-hidden"
            [class.bg-white]="selectedIdx() === idx"
            [class.border-sunset-rose]="selectedIdx() === idx"
            [class.shadow-md]="selectedIdx() === idx"
            [class.bg-slate-50/80]="selectedIdx() !== idx"
            [class.border-slate-200]="selectedIdx() !== idx"
            [class.hover:border-slate-300]="selectedIdx() !== idx">
            
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-mono font-bold" [style.color]="step.color">
                STEP {{ step.stepNumber }}
              </span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                {{ step.duration }}
              </span>
            </div>
            
            <h4 class="font-heading font-bold text-sm text-slate-900 truncate">
              {{ step.title }}
            </h4>
          </button>
        }
      </div>

      <!-- Active Step Detailed Card - Light Luxury -->
      @if (currentStep()) {
        <div class="rounded-3xl bg-white/90 border border-slate-200/90 p-6 sm:p-12 backdrop-blur-2xl shadow-[0_15px_40px_rgba(15,23,42,0.05)] relative overflow-hidden">
          
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <!-- Left Info (Span 7) -->
            <div class="lg:col-span-7">
              <div class="flex items-center gap-3 mb-4">
                <span class="px-3 py-1 rounded-full text-xs font-mono font-bold" [style.background]="currentStep()!.color + '15'" [style.color]="currentStep()!.color">
                  STAGE {{ currentStep()!.stepNumber }} OF 04
                </span>
                <span class="text-xs font-mono text-slate-500 font-semibold">
                  Execution Window: {{ currentStep()!.duration }}
                </span>
              </div>

              <h3 class="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
                {{ currentStep()!.title }}
              </h3>

              <p class="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                {{ currentStep()!.shortDesc }}
              </p>

              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
                <p class="text-xs font-mono uppercase text-slate-500 font-bold mb-1">Strategic Objective:</p>
                <p class="text-sm font-semibold text-slate-900">{{ currentStep()!.focus }}</p>
              </div>

              <!-- Tech Stack Tags -->
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-xs font-mono text-slate-500 font-semibold">Tech & Systems:</span>
                @for (tech of currentStep()!.techUsed; track tech) {
                  <span class="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700 font-semibold">
                    {{ tech }}
                  </span>
                }
              </div>
            </div>

            <!-- Right Deliverables Checklist (Span 5) -->
            <div class="lg:col-span-5 p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
              <h5 class="text-xs font-mono uppercase text-sunset-rose tracking-wider font-bold mb-4 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-sunset-rose"></span>
                Confirmed Deliverables
              </h5>

              <ul class="space-y-3">
                @for (deliv of currentStep()!.deliverables; track deliv) {
                  <li class="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                    <span class="text-emerald-600 font-bold mt-0.5">✓</span>
                    <span>{{ deliv }}</span>
                  </li>
                }
              </ul>

              <div class="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-mono text-slate-500 font-semibold">
                <span>Phase Readiness</span>
                <span class="text-emerald-700 font-bold">100% Quality Inspected</span>
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
      title: 'Audit & Growth Strategy Roadmap',
      shortDesc: 'We deeply review your current website speed, past Meta ad spends, customer inquiry handling, and repetitive staff tasks to find where you are losing money.',
      focus: 'Pinpoint exact leaks in your customer funnel and define realistic sales & lead targets.',
      deliverables: [
        'Website Speed & Mobile Usability Report',
        'Meta Ad Account & Budget Waste Diagnostic',
        'Lead Response & Customer Journey Analysis',
        'Custom 30-Day Growth & Execution Roadmap'
      ],
      techUsed: ['Google PageSpeed', 'Meta Pixel Helper', 'Funnel Mapping', 'Process Audit'],
      color: '#FF2E63'
    },
    {
      stepNumber: '02',
      duration: 'Days 6 — 18',
      title: 'Fast Mobile Website & Ad Creative Build',
      shortDesc: 'We develop your ultra-fast, mobile-first website with 1-tap WhatsApp chat buttons, Razorpay/UPI payment gateway, and high-converting ad visuals.',
      focus: 'Give you a world-class digital presence that loads in < 1.2s and makes customers trust you immediately.',
      deliverables: [
        'Lightning-Fast Mobile-First Website or Web App',
        'Sub-1.2s Load Speed Optimized for 4G/5G Indian Networks',
        'High-Converting Ad Creatives (Reels, Carousels, Hooks)',
        'Razorpay, Cashfree & UPI Payment Integration'
      ],
      techUsed: ['Angular 19', 'Tailwind CSS', 'Razorpay UPI', 'Figma'],
      color: '#7C3AED'
    },
    {
      stepNumber: '03',
      duration: 'Days 19 — 25',
      title: 'Meta Ads Launch & WhatsApp Lead Automation',
      shortDesc: 'We set up and launch your data-driven Facebook & Instagram ad campaigns and connect your 24/7 automated WhatsApp lead responder.',
      focus: 'Bring genuine, qualified buyer inquiries straight to your phone with zero manual delay.',
      deliverables: [
        'Server-Side Meta Conversions API (CAPI) Setup',
        'High-Intent Buyer Audience Targeting & Testing',
        'Instant WhatsApp Auto-Responder & PDF Catalog Bot',
        'Automated Google Sheets / Zoho CRM Lead Sync'
      ],
      techUsed: ['Meta CAPI', 'WhatsApp Cloud API', 'Google Sheets CRM', 'Webhooks'],
      color: '#0284C7'
    },
    {
      stepNumber: '04',
      duration: 'Days 26 — 30',
      title: 'Live Launch, Team Training & Ongoing Scale',
      shortDesc: 'We test every link, form, and payment flow with live test orders. Then we train your staff on how to view leads and provide transparent weekly reporting.',
      focus: 'Ensure 100% smooth daily operations with zero downtime and ongoing campaign scaling.',
      deliverables: [
        'End-to-End System Quality Check & Testing',
        'Simple Staff Training on Managing Leads & CRM',
        'Weekly Transparent ROAS & Lead Reports',
        'Dedicated WhatsApp Support Channel with Our Team'
      ],
      techUsed: ['Live Testing', 'Team Training', 'Transparent Analytics', 'Priority Support'],
      color: '#FF0055'
    }
  ]);

  public currentStep = signal<BlueprintStep | null>(null);

  constructor() {
    this.currentStep.set(this.steps()[0]);
  }

  public selectStep(idx: number) {
    this.sound.playClick();
    this.selectedIdx.set(idx);
    this.currentStep.set(this.steps()[idx]);
  }
}
