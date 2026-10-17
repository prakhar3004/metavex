import { Component, Input, Output, EventEmitter, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import confetti from 'canvas-confetti';
import { SoundService } from '../../services/sound.service';
import { CalculatorMetrics } from '../roi-calculator/roi-calculator.component';

@Component({
  selector: 'app-onboarding-wizard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
      
      <!-- Wizard Card Container - Luxury Light -->
      <div class="relative w-full max-w-2xl max-h-[92dvh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-white border border-slate-200 p-4 sm:p-8 md:p-10 shadow-2xl text-slate-900">
        
        <!-- Subtle Top Glow -->
        <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-sunset-rose/10 rounded-full blur-3xl pointer-events-none"></div>

        <!-- Header / Stepper Bar -->
        <div class="relative z-10 flex items-center justify-between pb-4 sm:pb-6 border-b border-slate-200 mb-6 sm:mb-8">
          <div class="flex items-center gap-2.5 sm:gap-3">
            <span class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-sunset-rose/10 border border-sunset-rose/25 text-sunset-rose flex items-center justify-center font-bold text-xs sm:text-sm shadow-sm">
              0{{ currentStep() }}
            </span>
            <div>
              <span class="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">MetaVex Growth Qualifier</span>
              <h3 class="font-heading text-base sm:text-lg font-bold text-slate-900">Step {{ currentStep() }} of 4</h3>
            </div>
          </div>

          <!-- Close Modal Button -->
          <button 
            type="button"
            (click)="onClose()"
            aria-label="Close Modal"
            class="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-950 flex items-center justify-center transition-colors text-sm">
            ✕
          </button>
        </div>

        <!-- STEP 1: Bottleneck Extraction -->
        @if (currentStep() === 1) {
          <div class="animate-in fade-in slide-in-from-right-4 duration-200">
            <h4 class="font-heading text-lg sm:text-2xl font-bold text-slate-900 mb-1.5 sm:mb-2 leading-tight">
              What is your biggest business hurdle right now?
            </h4>
            <p class="text-slate-600 text-xs sm:text-sm mb-5 sm:mb-6 leading-relaxed">
              Select your primary challenge so we prepare the exact solution for your business.
            </p>

            <div class="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
              @for (opt of bottleneckOptions; track opt.id) {
                <button 
                  type="button"
                  (click)="selectBottleneck(opt.id)"
                  class="w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left flex items-center justify-between transition-all duration-200 group"
                  [class.bg-rose-50/40]="selectedBottleneck() === opt.id"
                  [class.border-sunset-rose]="selectedBottleneck() === opt.id"
                  [class.shadow-sm]="selectedBottleneck() === opt.id"
                  [class.bg-slate-50/70]="selectedBottleneck() !== opt.id"
                  [class.border-slate-200]="selectedBottleneck() !== opt.id"
                  [class.hover:border-slate-300]="selectedBottleneck() !== opt.id">
                  
                  <div class="flex items-center gap-3 sm:gap-3.5 pr-2">
                    <span class="text-lg sm:text-xl p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white shadow-sm shrink-0">{{ opt.icon }}</span>
                    <div>
                      <p class="font-heading font-bold text-xs sm:text-sm text-slate-900 group-hover:text-sunset-rose transition-colors leading-snug">
                        {{ opt.title }}
                      </p>
                      <p class="text-[11px] sm:text-xs text-slate-500 leading-normal">{{ opt.desc }}</p>
                    </div>
                  </div>

                  <span class="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-xs shrink-0"
                    [class.border-sunset-rose]="selectedBottleneck() === opt.id"
                    [class.bg-sunset-rose]="selectedBottleneck() === opt.id"
                    [class.text-white]="selectedBottleneck() === opt.id">
                    @if (selectedBottleneck() === opt.id) { ✓ }
                  </span>
                </button>
              }
            </div>

            <button 
              type="button"
              [disabled]="!selectedBottleneck()"
              (click)="nextStep()"
              class="w-full py-3.5 sm:py-4 rounded-xl bg-slate-900 hover:bg-slate-950 text-white font-heading font-bold text-xs sm:text-sm tracking-wide disabled:opacity-40 disabled:cursor-not-allowed shadow-md transition-all">
              Continue to Step 2 →
            </button>
          </div>
        }

        <!-- STEP 2: Target Revenue & Horizon -->
        @if (currentStep() === 2) {
          <div class="animate-in fade-in slide-in-from-right-4 duration-200">
            <h4 class="font-heading text-lg sm:text-2xl font-bold text-slate-900 mb-1.5 sm:mb-2 leading-tight">
              What is your current monthly revenue?
            </h4>
            <p class="text-slate-600 text-xs sm:text-sm mb-5 sm:mb-6 leading-relaxed">
              This helps us recommend the right budget allocation and growth strategy for your scale.
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-6 sm:mb-8">
              @for (rev of revenueTiers; track rev.id) {
                <button 
                  type="button"
                  (click)="selectRevenueTier(rev.id)"
                  class="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all duration-200 group"
                  [class.bg-rose-50/40]="selectedRevenue() === rev.id"
                  [class.border-sunset-rose]="selectedRevenue() === rev.id"
                  [class.shadow-sm]="selectedRevenue() === rev.id"
                  [class.bg-slate-50/70]="selectedRevenue() !== rev.id"
                  [class.border-slate-200]="selectedRevenue() !== rev.id"
                  [class.hover:border-slate-300]="selectedRevenue() !== rev.id">
                  
                  <span class="text-[10px] sm:text-xs font-mono text-sunset-rose font-bold uppercase">{{ rev.tier }}</span>
                  <p class="font-heading font-extrabold text-base sm:text-lg text-slate-900 mt-0.5 group-hover:text-sunset-rose transition-colors">
                    {{ rev.label }}
                  </p>
                  <p class="text-[10px] sm:text-[11px] text-slate-500 mt-1 leading-normal">{{ rev.desc }}</p>
                </button>
              }
            </div>

            <div class="flex items-center gap-2.5 sm:gap-3">
              <button 
                type="button"
                (click)="prevStep()"
                class="w-1/3 py-3.5 sm:py-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-heading font-semibold text-xs sm:text-sm hover:bg-slate-200 transition-colors">
                ← Back
              </button>
              <button 
                type="button"
                [disabled]="!selectedRevenue()"
                (click)="nextStep()"
                class="w-2/3 py-3.5 sm:py-4 rounded-xl bg-slate-900 hover:bg-slate-950 text-white font-heading font-bold text-xs sm:text-sm tracking-wide disabled:opacity-40 disabled:cursor-not-allowed shadow-md transition-all">
                Contact Details →
              </button>
            </div>
          </div>
        }

        <!-- STEP 3: Business Details & Contact -->
        @if (currentStep() === 3) {
          <div class="animate-in fade-in slide-in-from-right-4 duration-200">
            <h4 class="font-heading text-lg sm:text-2xl font-bold text-slate-900 mb-1.5 sm:mb-2 leading-tight">
              Where should we send your Growth Audit?
            </h4>
            <p class="text-slate-600 text-xs sm:text-sm mb-5 sm:mb-6 leading-relaxed">
              Our growth consultant will review your business inputs and share a personalized audit within 15 minutes.
            </p>

            <form (ngSubmit)="submitLead()" class="space-y-3.5 sm:space-y-4 mb-6 sm:mb-8">
              <div>
                <label class="block text-[11px] sm:text-xs font-mono text-slate-700 font-semibold mb-1">Your Full Name *</label>
                <input 
                  type="text" 
                  name="fullName"
                  [(ngModel)]="formName" 
                  required
                  placeholder="e.g. Rahul Sharma"
                  class="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-sunset-rose text-xs sm:text-sm">
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label class="block text-[11px] sm:text-xs font-mono text-slate-700 font-semibold mb-1">Business / Brand Name *</label>
                  <input 
                    type="text" 
                    name="companyName"
                    [(ngModel)]="formCompany" 
                    required
                    placeholder="e.g. Vedic Wear / Apex Tools"
                    class="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-sunset-rose text-xs sm:text-sm">
                </div>
                <div>
                  <label class="block text-[11px] sm:text-xs font-mono text-slate-700 font-semibold mb-1">Email Address *</label>
                  <input 
                    type="email" 
                    name="workEmail"
                    [(ngModel)]="formEmail" 
                    required
                    placeholder="rahul@mycompany.in"
                    class="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-sunset-rose text-xs sm:text-sm">
                </div>
              </div>

              <div>
                <label class="block text-[11px] sm:text-xs font-mono text-slate-700 font-semibold mb-1">WhatsApp Number *</label>
                <input 
                  type="tel" 
                  name="phone"
                  [(ngModel)]="formPhone" 
                  required
                  placeholder="+91 98765 43210"
                  class="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-sunset-rose text-xs sm:text-sm">
                <span class="text-[10px] font-mono text-slate-500 mt-1 block font-medium">
                  *We will send your audit summary directly to your WhatsApp. No spam ever.
                </span>
              </div>

              <div class="flex items-center gap-2.5 sm:gap-3 pt-2">
                <button 
                  type="button"
                  (click)="prevStep()"
                  class="w-1/3 py-3 sm:py-3.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-heading font-semibold text-xs sm:text-sm hover:bg-slate-200 transition-colors">
                  ← Back
                </button>
                <button 
                  type="submit"
                  [disabled]="!formName || !formCompany || !formEmail || !formPhone"
                  class="w-2/3 py-3 sm:py-3.5 rounded-xl bg-slate-900 hover:bg-slate-950 text-white font-heading font-extrabold text-xs sm:text-sm tracking-wide disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:scale-[1.01] transition-transform">
                  Get Free Growth Plan 🚀
                </button>
              </div>
            </form>
          </div>
        }

        <!-- STEP 4: Success & Instant Calendar Booking -->
        @if (currentStep() === 4) {
          <div class="text-center py-2 sm:py-4 animate-in fade-in duration-300">
            <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 mx-auto flex items-center justify-center text-2xl sm:text-3xl mb-3 sm:mb-4">
              ✓
            </div>

            <span class="px-2.5 sm:px-3 py-1 rounded-full bg-sunset-rose/10 border border-sunset-rose/25 text-sunset-rose text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider">
              Webhook Dispatched • Ref: #MVX-{{ confirmationId }}
            </span>

            <h4 class="font-heading text-xl sm:text-3xl font-extrabold text-slate-900 mt-3 mb-2 leading-tight">
              Transmission Confirmed, {{ formName }}!
            </h4>

            <p class="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed mb-5 sm:mb-6">
              Our automated AI qualification pipeline has processed your company profile for <strong class="text-slate-900">{{ formCompany }}</strong>. An executive audit summary has been queued for dispatch.
            </p>

            <!-- Calendar Booking Container Simulation - Light -->
            <div class="p-3.5 sm:p-6 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 text-left mb-5 sm:mb-6">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 sm:pb-4 border-b border-slate-200 mb-3 sm:mb-4">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                  <span class="text-xs font-mono font-bold text-slate-900">Select Your Private 30-Min Strategy Call</span>
                </div>
                <span class="text-[10px] font-mono text-slate-500">Timezone: Asia/Kolkata (IST)</span>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button 
                  type="button" 
                  (click)="confirmSlot('Tomorrow, 3:00 PM IST')"
                  class="p-2.5 sm:p-3 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-sunset-rose text-center transition-colors">
                  <p class="text-[10px] sm:text-xs font-mono text-slate-500 font-medium">Tomorrow</p>
                  <p class="text-xs sm:text-sm font-bold text-slate-900">3:00 PM IST</p>
                </button>
                <button 
                  type="button" 
                  (click)="confirmSlot('Tomorrow, 5:30 PM IST')"
                  class="p-2.5 sm:p-3 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-sunset-rose text-center transition-colors">
                  <p class="text-[10px] sm:text-xs font-mono text-slate-500 font-medium">Tomorrow</p>
                  <p class="text-xs sm:text-sm font-bold text-slate-900">5:30 PM IST</p>
                </button>
                <button 
                  type="button" 
                  (click)="confirmSlot('Friday, 11:00 AM IST')"
                  class="p-2.5 sm:p-3 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-sunset-rose text-center transition-colors col-span-2 sm:col-span-1">
                  <p class="text-[10px] sm:text-xs font-mono text-slate-500 font-medium">Friday</p>
                  <p class="text-xs sm:text-sm font-bold text-slate-900">11:00 AM IST</p>
                </button>
              </div>

              @if (bookedSlot()) {
                <div class="mt-3 sm:mt-4 p-2.5 sm:p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-center text-xs font-mono text-emerald-800 font-bold">
                  🎉 Confirmed for {{ bookedSlot() }}. Calendar invitation sent to {{ formEmail }}.
                </div>
              }
            </div>

            <button 
              type="button"
              (click)="onClose()"
              class="w-full py-3 sm:py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 font-heading font-bold text-xs sm:text-sm transition-colors">
              Return to Website
            </button>
          </div>
        }

      </div>

    </div>
  `
})
export class OnboardingWizardComponent {
  public sound = inject(SoundService);

  @Input() prefillMetrics?: CalculatorMetrics | null;
  @Output() close = new EventEmitter<void>();

  public currentStep = signal<number>(1);
  public selectedBottleneck = signal<string>('');
  public selectedRevenue = signal<string>('');
  public bookedSlot = signal<string>('');
  public confirmationId = Math.floor(100000 + Math.random() * 900000);

  // Form Fields
  public formName = '';
  public formCompany = '';
  public formEmail = '';
  public formPhone = '';

  public bottleneckOptions = [
    {
      id: 'leads',
      icon: '📉',
      title: 'Lead Bleed & Low ROAS',
      desc: 'High ad spending on Meta with unprofitable customer acquisition.'
    },
    {
      id: 'website',
      icon: '⏳',
      title: 'Slow, Clunky Web Experience',
      desc: 'High mobile bounce rates and static templates that fail to convert.'
    },
    {
      id: 'manual',
      icon: '📂',
      title: 'Manual Admin Grunt Work',
      desc: 'Drowning in spreadsheets, manual WhatsApp messaging, and slow invoices.'
    },
    {
      id: 'silos',
      icon: '🧩',
      title: 'Disjointed Enterprise Silos',
      desc: 'CRM, payments, ERP, and customer data are completely disconnected.'
    }
  ];

  public revenueTiers = [
    { id: 'tier1', tier: 'Scale-Up', label: '< $25,000 / mo', desc: 'Accelerating foundational digital growth' },
    { id: 'tier2', tier: 'Growth Enterprise', label: '$25,000 — $100,000 / mo', desc: 'Scaling full-funnel Meta & automation' },
    { id: 'tier3', tier: 'Market Leader', label: '$100,000 — $500,000 / mo', desc: 'Complex microservices & multi-region CAPI' },
    { id: 'tier4', tier: 'Enterprise Titan', label: '$500,000+ / mo', desc: 'Complete autonomous digital ecosystem' }
  ];

  public selectBottleneck(id: string) {
    this.sound.playClick();
    this.selectedBottleneck.set(id);
  }

  public selectRevenueTier(id: string) {
    this.sound.playClick();
    this.selectedRevenue.set(id);
  }

  public nextStep() {
    this.sound.playClick();
    this.currentStep.set(this.currentStep() + 1);
  }

  public prevStep() {
    this.sound.playClick();
    this.currentStep.set(this.currentStep() - 1);
  }

  public submitLead() {
    this.sound.playChime();
    this.currentStep.set(4);

    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#FF2E63', '#7C3AED', '#0284C7', '#0F172A']
      });
    } catch {
      // fallback
    }
  }

  public confirmSlot(slot: string) {
    this.sound.playChime();
    this.bookedSlot.set(slot);
  }

  public onClose() {
    this.sound.playClick();
    this.close.emit();
  }
}
