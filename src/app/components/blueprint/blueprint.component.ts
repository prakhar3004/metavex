import { Component, signal, inject } from '@angular/core';
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
  imports: [],
  template: `
    <section id="blueprint" class="relative py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16 overflow-hidden">

      <!-- Ambient Background Glows -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-sunset-rose/10 via-electric-violet/10 to-cyber-cyan/10 rounded-full blur-[130px] pointer-events-none"></div>

      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sunset-rose/10 border border-sunset-rose/25 text-sunset-rose text-xs font-mono font-bold uppercase tracking-wider mb-3.5 shadow-xs">
          <span class="w-2 h-2 rounded-full bg-sunset-rose animate-ping"></span>
          How We Work
        </div>

        <h2 class="font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
          From First Conversation to <br class="hidden sm:inline" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan drop-shadow-sm">
            a Setup Your Team Can Use
          </span>
        </h2>

        <p class="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Understand the challenge, agree on a plan, build the right pieces, and test them with your team. Milestones and timing are agreed for your project.
        </p>
      </div>

      <!-- ======================================================== -->
      <!-- ULTRA-MODERN PIPELINE TIMELINE TRACK                     -->
      <!-- ======================================================== -->
      <div class="relative mb-8 sm:mb-12">

        <!-- Connecting Progress Bar Behind Nodes (Desktop) -->
        <div class="hidden lg:block absolute top-[28px] left-[6%] right-[6%] h-[3px] bg-slate-200/90 rounded-full -z-0">
          <div
            class="h-full bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan rounded-full transition-all duration-500 shadow-sm"
            [style.width]="progressWidth()"></div>
        </div>

        <!-- 4 Interactive Pipeline Stepper Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 relative z-10">
          @for (step of steps(); track step.stepNumber; let idx = $index) {
            <button
              type="button"
              (click)="selectStep(idx)"
              [attr.aria-pressed]="selectedIdx() === idx"
              class="group min-w-0 p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden backdrop-blur-xl flex flex-col justify-between"
              [class.bg-white]="selectedIdx() === idx"
              [class.border-sunset-rose]="selectedIdx() === idx"
              [class.shadow-xl]="selectedIdx() === idx"
              [class.scale-[1.02]]="selectedIdx() === idx"
              [class.bg-white/70]="selectedIdx() !== idx"
              [class.border-slate-200]="selectedIdx() !== idx"
              [class.hover:border-slate-300]="selectedIdx() !== idx"
              [class.hover:bg-white/90]="selectedIdx() !== idx">

              <!-- Top Step Header -->
              <div class="flex flex-wrap gap-2 items-center justify-between mb-3">
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
                    Project stage: {{ currentStep()!.duration }}
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
                      What This Stage Is For:
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
                    Tools We May Use:
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
                <div class="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200">
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
                <div class="flex flex-wrap gap-2 items-center justify-between pb-3.5 mb-5 border-b border-slate-200">
                  <div class="flex items-center gap-2">
                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span class="text-xs font-mono uppercase text-slate-700 tracking-wider font-bold">
                      Possible Deliverables
                    </span>
                  </div>
                  <span class="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold">
                    Scope Dependent
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
                    <li class="flex flex-col xl:flex-row items-start justify-between gap-3 p-2.5 rounded-xl bg-white/80 border border-slate-200/80 text-xs sm:text-sm text-slate-700 font-medium">
                      <div class="flex min-w-0 items-start gap-2.5">
                        <span class="text-emerald-600 font-bold mt-0.5 shrink-0">✓</span>
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
              <div class="mt-6 pt-4 border-t border-slate-200 flex flex-wrap gap-3 items-center justify-between text-xs font-mono">
                <span class="text-slate-500 font-medium">Before Moving On:</span>
                <span class="inline-flex items-center gap-1.5 text-emerald-700 font-bold">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Review Together
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
        "stepNumber": "01",
        "duration": "Discovery",
        "title": "Understand Your Business",
        "tagline": "Find the Most Useful Starting Point",
        "icon": "01",
        "shortDesc": "We look at your offer, website, marketing, and inquiry process. You tell us what is working, what is difficult, and what you want to improve.",
        "strategicFocus": "Identify the priority, the information we need, and what a useful outcome would look like.",
        "deliverables": [
            {
                "text": "Review of your current website and customer journey",
                "badge": "Review"
            },
            {
                "text": "Discussion of your offer, audience, and goals",
                "badge": "Context"
            },
            {
                "text": "List of practical priorities",
                "badge": "Priorities"
            },
            {
                "text": "Proposed scope, costs, and milestones",
                "badge": "Proposal"
            }
        ],
        "techUsed": [
            "Website Review",
            "Journey Mapping",
            "Business Discussion"
        ],
        "themeColor": "#BE185D",
        "kpiHighlight": "Clear Priorities",
        "kpiLabel": "Know what to work on first"
    },
    {
        "stepNumber": "02",
        "duration": "Design & Build",
        "title": "Build Around the Agreed Goal",
        "tagline": "Turn the Plan Into Something You Can Review",
        "icon": "02",
        "shortDesc": "We create the pages, campaign assets, or workflows included in your scope. You review the direction and share feedback at the agreed milestones.",
        "strategicFocus": "Make your offer easy to understand and the next customer action easy to take.",
        "deliverables": [
            {
                "text": "Page layouts and copy for the agreed scope",
                "badge": "Website"
            },
            {
                "text": "Inquiry or payment flow where needed",
                "badge": "Customer Flow"
            },
            {
                "text": "Campaign creatives where included",
                "badge": "Content"
            },
            {
                "text": "Workflow setup matched to your tools",
                "badge": "Automation"
            }
        ],
        "techUsed": [
            "Web Development",
            "Content Design",
            "Payment Tools",
            "Workflow Setup"
        ],
        "themeColor": "#7C3AED",
        "kpiHighlight": "Useful by Design",
        "kpiLabel": "Built around your customers and team"
    },
    {
        "stepNumber": "03",
        "duration": "Connect & Test",
        "title": "Check the Whole Customer Journey",
        "tagline": "Make Sure the Pieces Work Together",
        "icon": "03",
        "shortDesc": "We test the agreed inquiry flows, tracking, and integrations. Campaign and WhatsApp launches depend on account access and any required platform approvals.",
        "strategicFocus": "Check what the customer sees, where an inquiry goes, and how your team takes over.",
        "deliverables": [
            {
                "text": "Mobile layout and inquiry flow checks",
                "badge": "Testing"
            },
            {
                "text": "Tracking checks where included",
                "badge": "Analytics"
            },
            {
                "text": "Automated reply and team handover checks",
                "badge": "WhatsApp"
            },
            {
                "text": "Lead routing checks in your selected tools",
                "badge": "Lead Flow"
            }
        ],
        "techUsed": [
            "Mobile Testing",
            "Tracking Tools",
            "WhatsApp Business API",
            "CRM or Sheets"
        ],
        "themeColor": "#0369A1",
        "kpiHighlight": "Connected Steps",
        "kpiLabel": "Test the path from visit to follow-up"
    },
    {
        "stepNumber": "04",
        "duration": "Launch & Handover",
        "title": "Launch With a Clear Next Step",
        "tagline": "Help Your Team Use What We Build",
        "icon": "04",
        "shortDesc": "We review the setup with you, share the agreed handover materials, and discuss what to monitor after launch. Ongoing support is defined in your project plan.",
        "strategicFocus": "Give your team the information and access needed to manage the agreed setup.",
        "deliverables": [
            {
                "text": "Launch review and agreed final checks",
                "badge": "Launch"
            },
            {
                "text": "Account access and source file handover as agreed",
                "badge": "Handover"
            },
            {
                "text": "Walkthrough for your team",
                "badge": "Guidance"
            },
            {
                "text": "Reporting and support plan where included",
                "badge": "Next Steps"
            }
        ],
        "techUsed": [
            "Team Walkthrough",
            "Project Notes",
            "Analytics Review"
        ],
        "themeColor": "#047857",
        "kpiHighlight": "Ready to Use",
        "kpiLabel": "Handover and support agreed in advance"
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
    if (!Number.isInteger(idx) || idx < 0 || idx >= this.steps().length) return;
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
