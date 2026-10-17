import { Component, Input, Output, EventEmitter, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LeadCaptureService } from '../../services/lead-capture.service';
import { SoundService } from '../../services/sound.service';
import { ModalDirective } from '../../directives/modal.directive';
import { CalculatorMetrics } from '../roi-calculator/roi-calculator.component';

@Component({
  selector: 'app-onboarding-wizard',
  standalone: true,
  imports: [FormsModule, ModalDirective],
  template: `
    <dialog appModal (dismiss)="onClose()" aria-labelledby="brief-dialog-title" class="modal-overlay items-center p-3 sm:p-6">

      <!-- Wizard Card Container - Luxury Light -->
      <div class="modal-panel relative w-full max-w-2xl min-w-0 overflow-y-auto rounded-2xl sm:rounded-3xl bg-white border border-slate-200 p-4 sm:p-8 md:p-10 shadow-2xl text-slate-900">

        <!-- Subtle Top Glow -->
        <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-sunset-rose/10 rounded-full blur-3xl pointer-events-none"></div>

        <!-- Header / Stepper Bar -->
        <div class="relative z-10 flex items-center justify-between pb-4 sm:pb-6 border-b border-slate-200 mb-6 sm:mb-8">
          <div class="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <span class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-sunset-rose/10 border border-sunset-rose/25 text-sunset-rose flex items-center justify-center font-bold text-xs sm:text-sm shadow-sm">
              0{{ currentStep() }}
            </span>
            <div>
              <h2 id="brief-dialog-title" class="text-xs font-mono uppercase tracking-wide text-slate-600 font-bold">Your Project Brief</h2>
              <p aria-live="polite" class="font-heading text-base sm:text-lg font-bold text-slate-900">Step {{ currentStep() }} of 4</p>
            </div>
          </div>

          <!-- Close Modal Button -->
          <button
            type="button"
            (click)="onClose()"
            aria-label="Close Modal" [disabled]="isSubmitting()"
            class="w-11 h-11 shrink-0 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-950 flex items-center justify-center transition-colors text-sm">
            ✕
          </button>
        </div>

        <!-- STEP 1: Bottleneck Extraction -->
        @if (currentStep() === 1) {
          <div class="animate-in fade-in slide-in-from-right-4 duration-200">
            <h4 class="font-heading text-lg sm:text-2xl font-bold text-slate-900 mb-1.5 sm:mb-2 leading-tight">
              What Would You Like to Improve First?
            </h4>
            <p class="text-slate-600 text-sm mb-5 sm:mb-6 leading-relaxed">
              Choose the challenge that feels closest to yours. We can explore the details together.
            </p>

            <div class="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
              @for (opt of bottleneckOptions; track opt.id) {
                <button
                  type="button"
                  (click)="selectBottleneck(opt.id)"
                  [attr.aria-pressed]="selectedBottleneck() === opt.id"
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
              What Stage Is Your Business At?
            </h4>
            <p class="text-slate-600 text-sm mb-5 sm:mb-6 leading-relaxed">
              Choose an approximate monthly revenue range, or skip sharing it. This simply gives us some context.
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-6 sm:mb-8">
              @for (rev of revenueTiers; track rev.id) {
                <button
                  type="button"
                  (click)="selectRevenueTier(rev.id)"
                  [attr.aria-pressed]="selectedRevenue() === rev.id"
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
              Tell Us a Little About Your Business
            </h4>
            <p class="text-slate-600 text-sm mb-5 sm:mb-6 leading-relaxed">
              Add your details and what you want to improve. Next, review the details before sending your request to our team.
            </p>

            <form #briefForm="ngForm" (ngSubmit)="briefForm.valid && submitLead()" class="space-y-3.5 sm:space-y-4 mb-6 sm:mb-8">
              <div>
                <label for="fullName" class="block text-[11px] sm:text-xs font-mono text-slate-700 font-semibold mb-1">Your Full Name *</label>
                <input
                  type="text"
                  id="fullName" name="fullName" autocomplete="name" maxlength="80"
                  [(ngModel)]="formName"
                  required
                  placeholder="e.g. Rahul Sharma"
                  class="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-sunset-rose text-xs sm:text-sm">
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label for="companyName" class="block text-[11px] sm:text-xs font-mono text-slate-700 font-semibold mb-1">Business / Brand Name *</label>
                  <input
                    type="text"
                    id="companyName" name="companyName" autocomplete="organization" maxlength="120"
                    [(ngModel)]="formCompany"
                    required
                    placeholder="e.g. Vedic Wear / Apex Tools"
                    class="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-sunset-rose text-xs sm:text-sm">
                </div>
                <div>
                  <label for="workEmail" class="block text-[11px] sm:text-xs font-mono text-slate-700 font-semibold mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    id="workEmail" name="workEmail" autocomplete="email" maxlength="254"
                    [(ngModel)]="formEmail"
                    #emailField="ngModel" [attr.aria-invalid]="emailField.touched && !validEmail ? true : null" aria-describedby="email-error"
                    email
                    placeholder="rahul@mycompany.in"
                    class="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-sunset-rose text-xs sm:text-sm">
                  @if (emailField.touched && !validEmail) {
                    <p id="email-error" role="alert" class="mt-2 text-xs text-rose-700">Enter a valid email address, or leave this optional field empty.</p>
                  }
                </div>
              </div>

              <div>
                <label for="phone" class="block text-[11px] sm:text-xs font-mono text-slate-700 font-semibold mb-1">Phone / WhatsApp Number *</label>
                <input
                  type="tel"
                  id="phone" name="phone" autocomplete="tel" maxlength="24"
                  [(ngModel)]="formPhone" required
                  #phoneField="ngModel" [attr.aria-invalid]="phoneField.touched && !validPhone ? true : null" aria-describedby="phone-error"
                  placeholder="+91 98765 43210"
                  class="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-sunset-rose text-xs sm:text-sm">
                @if (phoneField.touched && !validPhone) {
                  <p id="phone-error" role="alert" class="mt-2 text-xs text-rose-700">Enter a phone number with 7–15 digits so our team can reply.</p>
                }
                <span class="text-[10px] font-mono text-slate-500 mt-1 block font-medium">
                  We’ll use your details to respond to this request. You can review them before sending.
                </span>
              </div>

              <div>
                <label for="business-goal" class="block text-xs font-mono text-slate-700 font-semibold mb-1">What Would You Like Help With? (Optional)</label>
                <textarea id="business-goal" name="businessGoal" [(ngModel)]="formGoal" rows="3" maxlength="500" placeholder="Share your website, social page, or the problem you want to solve." class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sunset-rose text-sm"></textarea>
              </div>

              <div class="sr-only" aria-hidden="true">
                <label for="website-confirmation">Leave this field empty</label>
                <input id="website-confirmation" name="websiteConfirmation" [(ngModel)]="websiteConfirmation" tabindex="-1" autocomplete="off" />
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
                  [disabled]="briefForm.invalid || !canReview"
                  class="w-2/3 py-3 sm:py-3.5 rounded-xl bg-slate-900 hover:bg-slate-950 text-white font-heading font-extrabold text-xs sm:text-sm tracking-wide disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:scale-[1.01] transition-transform">
                  Review My Brief →
                </button>
              </div>
            </form>
          </div>
        }

        <!-- STEP 4: Review a draft before sending it yourself -->
        @if (currentStep() === 4) {
          <div class="animate-in fade-in duration-300">
            @if (savedLeadId()) {
              <div role="status" class="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:p-7">
                <h3 class="font-heading text-xl font-bold text-slate-900">Your Request Has Been Received.</h3>
                <p class="mt-3 text-sm leading-relaxed text-slate-700">Thank you, {{ formName }}. Our team has your requirements and contact details. We can discuss the scope and next steps with you.</p>
                <p class="mt-4 text-xs text-slate-600">Reference: {{ savedLeadId() }}</p>
                <button type="button" (click)="onClose()" class="mt-5 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white">Back to Website</button>
              </div>
            } @else {
            <span class="text-xs font-mono font-bold uppercase tracking-wider text-sunset-rose">Ready to Review</span>
            <h4 class="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 mt-2 mb-3">Here Is Your Brief, {{ formName }}.</h4>
            <p class="text-sm text-slate-600 leading-relaxed mb-5">Check your details, then send your request. Prefer to start a conversation directly? You can also use WhatsApp or email below.</p>
            <pre class="max-w-full whitespace-pre-wrap [overflow-wrap:anywhere] font-body text-sm leading-relaxed text-slate-700 bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 mb-5">{{ briefMessage }}</pre>
            <p class="text-xs text-slate-500 leading-relaxed mb-5">Your request is saved only after you tap Send My Request and receive a confirmation. We’ll contact you about this inquiry.</p>
            @if (submissionError()) {
              <p role="alert" class="mb-4 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm leading-relaxed text-rose-800">{{ submissionError() }}</p>
            }
            <button type="button" (click)="captureLead()" [disabled]="isSubmitting() || !canReview" [attr.aria-busy]="isSubmitting()" class="mb-4 w-full rounded-xl bg-slate-900 px-5 py-3.5 font-heading text-sm font-bold text-white disabled:opacity-50">{{ isSubmitting() ? 'Saving Your Request…' : 'Send My Request →' }}</button>
            <div class="flex flex-col sm:flex-row gap-3">
              <button type="button" [disabled]="isSubmitting()" (click)="prevStep()" class="px-5 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-heading font-bold text-sm">← Edit My Details</button>
              <a [href]="whatsAppDraftUrl" target="_blank" rel="noopener noreferrer" class="flex-1 text-center px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-heading font-bold text-sm">Open Draft in WhatsApp →</a>
            </div>
            <a [href]="emailDraftUrl" class="mt-3 block rounded-xl px-4 py-3 text-center text-sm font-semibold text-slate-700 underline underline-offset-4">Prefer email? Open an email draft</a>
            }
          </div>
        }

      </div>

    </dialog>
  `
})
export class OnboardingWizardComponent {
  public sound = inject(SoundService);
  private readonly leadCapture = inject(LeadCaptureService);
  public readonly isSubmitting = signal(false);
  public readonly submissionError = signal('');
  public readonly savedLeadId = signal('');
  private requestId = this.createLeadId();
  public websiteConfirmation = '';

  @Input() prefillMetrics?: CalculatorMetrics | null;
  @Output() close = new EventEmitter<void>();

  public currentStep = signal<number>(1);
  public selectedBottleneck = signal<string>('');
  public selectedRevenue = signal<string>('');

  // Form Fields
  public formName = '';
  public formCompany = '';
  public formEmail = '';
  public formPhone = '';
  public formGoal = '';

  public bottleneckOptions = [
    {
      id: 'leads',
      icon: '📉',
      title: 'Ads Without Clear Results',
      desc: 'I want a clearer link between ad spend and useful inquiries.'
    },
    {
      id: 'website',
      icon: '⏳',
      title: 'A Website That Needs Work',
      desc: 'I need a clearer website or an easier way for visitors to contact me.'
    },
    {
      id: 'manual',
      icon: '📂',
      title: 'Too Many Repetitive Tasks',
      desc: 'I repeat answers, share catalogs, and track follow-ups manually.'
    },
    {
      id: 'silos',
      icon: '🧩',
      title: 'Scattered Customer Information',
      desc: 'I need a simpler way to connect leads, orders, and team updates.'
    }
  ];

  public revenueTiers = [
    { id: 'starting', tier: 'Just Starting', label: 'Pre-launch or pre-revenue', desc: 'Building a first website or customer journey' },
    { id: 'early', tier: 'Early Business', label: 'Below ₹1 lakh / month', desc: 'Finding a practical next step' },
    { id: 'growing', tier: 'Growing Business', label: '₹1 lakh–₹5 lakh / month', desc: 'Improving marketing and follow-ups' },
    { id: 'established', tier: 'Established Business', label: 'Above ₹5 lakh / month', desc: 'Connecting the tools and processes already in place' },
    { id: 'private', tier: 'Prefer Not to Share', label: 'Skip revenue details', desc: 'Discuss the challenge without sharing financials' }
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
    if (this.currentStep() === 1 && !this.selectedBottleneck()) return;
    if (this.currentStep() === 2 && !this.selectedRevenue()) return;
    this.currentStep.set(Math.min(4, this.currentStep() + 1));
  }

  public prevStep() {
    if (this.isSubmitting()) return;
    if (this.currentStep() === 4) {
      this.requestId = this.createLeadId();
      this.submissionError.set('');
    }
    this.sound.playClick();
    this.currentStep.set(Math.max(1, this.currentStep() - 1));
  }

  public get validEmail(): boolean {
    const email = this.formEmail.trim();
    return !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  public get validPhone(): boolean {
    const phone = this.formPhone.trim();
    const digits = phone.replace(/\D/g, '');
    return /^\+?[\d\s().-]+$/.test(phone) && digits.length >= 7 && digits.length <= 15;
  }

  public get canReview(): boolean {
    return !!this.formName.trim() && !!this.formCompany.trim()
      && !!this.selectedBottleneck() && !!this.selectedRevenue()
      && !!this.formPhone.trim() && this.validEmail && this.validPhone;
  }

  public submitLead() {
    if (!this.canReview) return;
    this.sound.playClick();
    this.currentStep.set(4);
  }

  public get briefMessage(): string {
    const challenge = this.bottleneckOptions.find(option => option.id === this.selectedBottleneck());
    const stage = this.revenueTiers.find(option => option.id === this.selectedRevenue());
    const lines = [
      'Hi MetaVex Digital, I would like to discuss my business.',
      '',
      `Name: ${this.formName.trim()}`,
      `Business: ${this.formCompany.trim()}`,
      `Main challenge: ${challenge?.title ?? 'To discuss'}`,
      `Business stage: ${stage?.label ?? 'Not shared'}`
    ];
    if (this.formEmail.trim()) lines.push(`Email: ${this.formEmail.trim()}`);
    if (this.formPhone.trim()) lines.push(`Phone: ${this.formPhone.trim()}`);
    if (this.formGoal.trim()) lines.push(`My requirements: ${this.formGoal.trim()}`);
    const metrics = this.prefillMetrics;
    if (metrics) {
      const inr = (value: number) => `${value < 0 ? '-' : ''}₹${Math.abs(value).toLocaleString('en-IN')}`;
      lines.push('', 'Planning scenario (my assumptions, not a forecast):',
        `Monthly revenue baseline: ${inr(metrics.monthlyRevenue)}`,
        `Repetitive work: ${metrics.manualHours} hours/week`,
        `Monthly ad budget: ${inr(metrics.monthlyAdSpend)}`,
        `Revenue change assumption: ${metrics.revenueChangePercent}%`,
        `Automation share assumption: ${metrics.automationSharePercent}%`,
        `Illustrative monthly revenue change: ${inr(metrics.projectedExtraRevenue)}`,
        `Illustrative hours freed: ${metrics.hoursSavedMonthly}/month`);
    }
    return lines.join('\n');
  }

  public get whatsAppDraftUrl(): string {
    return `https://wa.me/919026231351?text=${encodeURIComponent(this.briefMessage)}`;
  }

  public get emailDraftUrl(): string {
    return `mailto:metavexdigital@gmail.com?subject=${encodeURIComponent('Project inquiry from ' + this.formCompany.trim())}&body=${encodeURIComponent(this.briefMessage)}`;
  }

  private createLeadId(): string {
    return globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
  }

  public async captureLead(): Promise<void> {
    if (!this.canReview || this.isSubmitting() || this.savedLeadId()) return;
    this.isSubmitting.set(true);
    this.submissionError.set('');
    try {
      const leadId = await this.leadCapture.saveLead({
        leadId: this.requestId, name: this.formName.trim(), business: this.formCompany.trim(),
        phone: this.formPhone.trim(), email: this.formEmail.trim(), challenge: this.selectedBottleneck(),
        stage: this.selectedRevenue(), requirements: this.formGoal.trim(),
        sourcePage: typeof location !== 'undefined' ? location.pathname : '/',
        websiteConfirmation: this.websiteConfirmation, metrics: this.prefillMetrics ?? null
      });
      this.savedLeadId.set(leadId);
    } catch {
      this.submissionError.set('We could not save your request right now. Your details are still here. Please retry, or contact us on WhatsApp or email below.');
    } finally {
      this.isSubmitting.set(false);
    }
  }

  public onClose() {
    if (this.isSubmitting()) return;
    this.close.emit();
  }
}
