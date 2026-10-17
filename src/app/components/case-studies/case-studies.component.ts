import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoundService } from '../../services/sound.service';

export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  metricHighlight: string;
  metricLabel: string;
  title: string;
  desc: string;
  tags: string[];
  gradient: string;
  problem: string;
  solution: string;
  stack: string[];
  metrics: { label: string; value: string }[];
}

@Component({
  selector: 'app-case-studies',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="case-studies" class="relative py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4 sm:gap-6">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sunset-rose/10 border border-sunset-rose/25 text-sunset-rose text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <span class="w-1.5 h-1.5 rounded-full bg-sunset-rose"></span>
            Battle-Tested Case Studies
          </div>
          <h2 class="font-heading text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Proven Proof Over <br class="hidden sm:inline" />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan">
              Marketing Promises
            </span>
          </h2>
        </div>
        <p class="text-slate-600 text-xs sm:text-sm max-w-md">
          Explore real-world case studies detailing how we converted bottlenecked companies into automated, high-margin market leaders.
        </p>
      </div>

      <!-- Case Studies Cards Grid - Luxury Light -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        @for (item of caseStudies(); track item.id) {
          <div 
            class="group rounded-3xl bg-white/85 border border-slate-200/90 hover:border-sunset-rose/40 p-6 sm:p-8 backdrop-blur-xl shadow-[0_10px_30px_rgba(15,23,42,0.04)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden cursor-pointer"
            (click)="openModal(item)">
            
            <!-- Radiant Background Glow on Hover -->
            <div 
              class="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
              [style.background]="item.gradient"></div>

            <div>
              <!-- Top Industry & Tag -->
              <div class="flex items-center justify-between mb-4">
                <span class="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold">
                  {{ item.industry }}
                </span>
                <span class="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700 font-semibold">
                  {{ item.client }}
                </span>
              </div>

              <!-- Huge Metric Highlight -->
              <div class="mb-4">
                <p class="text-4xl sm:text-5xl font-heading font-black text-slate-900">
                  {{ item.metricHighlight }}
                </p>
                <p class="text-xs font-mono text-sunset-rose mt-1 font-bold">
                  {{ item.metricLabel }}
                </p>
              </div>

              <!-- Title & Desc -->
              <h3 class="font-heading text-xl font-bold text-slate-900 mb-3 group-hover:text-sunset-rose transition-colors">
                {{ item.title }}
              </h3>
              <p class="text-slate-600 text-sm leading-relaxed mb-6">
                {{ item.desc }}
              </p>
            </div>

            <!-- Tags & Modal Trigger -->
            <div>
              <div class="flex flex-wrap gap-2 mb-6">
                @for (tag of item.tags; track tag) {
                  <span class="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[11px] font-mono text-slate-600 font-medium">
                    {{ tag }}
                  </span>
                }
              </div>

              <div class="flex items-center justify-between pt-4 border-t border-slate-200 text-xs font-mono text-slate-600 group-hover:text-slate-950 font-semibold transition-colors">
                <span>View Complete Architecture & Proof</span>
                <span class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-sunset-rose group-hover:text-white transition-all duration-200">
                  →
                </span>
              </div>
            </div>

          </div>
        }
      </div>

      <!-- Case Study Modal / Drawer - Light Theme -->
      @if (activeModal()) {
        <div class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            class="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-2xl text-slate-800">
            
            <!-- Close Button -->
            <button 
              type="button"
              (click)="closeModal()"
              class="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-950 flex items-center justify-center transition-colors">
              ✕
            </button>

            <!-- Modal Content Header -->
            <div class="mb-6">
              <span class="text-xs font-mono text-sunset-rose font-bold uppercase tracking-wider">
                Case Study Breakdown • {{ activeModal()?.client }}
              </span>
              <h3 class="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                {{ activeModal()?.title }}
              </h3>
            </div>

            <!-- Metrics Highlights -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-8">
              @for (m of activeModal()?.metrics; track m.label) {
                <div class="text-center">
                  <p class="font-heading font-extrabold text-xl text-sunset-rose">{{ m.value }}</p>
                  <p class="text-[10px] font-mono text-slate-500 uppercase mt-0.5 font-bold">{{ m.label }}</p>
                </div>
              }
            </div>

            <!-- Problem vs Solution -->
            <div class="space-y-6 text-sm leading-relaxed mb-8">
              <div class="p-4 rounded-2xl bg-red-50 border border-red-200">
                <h4 class="font-heading font-bold text-red-800 text-xs uppercase tracking-wider mb-2">
                  The Bottleneck Before MetaVex:
                </h4>
                <p class="text-red-950 text-xs sm:text-sm">
                  {{ activeModal()?.problem }}
                </p>
              </div>

              <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <h4 class="font-heading font-bold text-emerald-800 text-xs uppercase tracking-wider mb-2">
                  The MetaVex Transformation Blueprint:
                </h4>
                <p class="text-emerald-950 text-xs sm:text-sm">
                  {{ activeModal()?.solution }}
                </p>
              </div>
            </div>

            <!-- Tech Stack Pills -->
            <div class="mb-8">
              <h5 class="text-xs font-mono uppercase text-slate-500 font-bold mb-3">Architectural Components Deployed:</h5>
              <div class="flex flex-wrap gap-2">
                @for (s of activeModal()?.stack; track s) {
                  <span class="px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 font-mono text-xs font-semibold">
                    {{ s }}
                  </span>
                }
              </div>
            </div>

            <button 
              type="button"
              (click)="closeModal()"
              class="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-950 text-white font-heading font-bold text-sm shadow-md transition-all">
              Close Breakdown
            </button>

          </div>
        </div>
      }

    </section>
  `
})
export class CaseStudiesComponent {
  public sound = inject(SoundService);
  public activeModal = signal<CaseStudy | null>(null);

  public caseStudies = signal<CaseStudy[]>([
    {
      id: 'd2c',
      client: 'VEDIC WEAR (D2C)',
      industry: 'Fashion & E-Commerce',
      metricHighlight: '4.6x ROAS',
      metricLabel: 'Scaled from ₹3.5L to ₹22L Monthly Sales',
      title: 'Fast Mobile Store + Meta Ads & WhatsApp Recovery',
      desc: 'Replaced a slow 6-second template with an ultra-fast mobile store, cutting cart abandonment and scaling Meta ads with tested creative angles and 1-tap UPI checkout.',
      tags: ['Fast Mobile Web', 'Meta Ads CAPI', 'UPI Checkout', 'Cart Recovery'],
      gradient: '#FF2E63',
      problem: 'High ad cost on Facebook, slow mobile loading (6.2s), and 65% cart abandonment because customers dropped off before the payment page loaded.',
      solution: 'Built a sub-1.2s mobile storefront with Razorpay UPI 1-click checkout. Integrated Meta Conversions API (CAPI) and an automated WhatsApp abandoned cart sequence that recovered 35% of lost orders.',
      stack: ['Angular Standalone', 'Tailwind CSS', 'Meta CAPI', 'Razorpay UPI', 'WhatsApp API'],
      metrics: [
        { label: 'Meta ROAS', value: '4.6x' },
        { label: 'Mobile Speed', value: '1.1s' },
        { label: 'Cart Recovery', value: '+35%' },
        { label: 'Monthly Sales', value: '₹22 Lakhs' }
      ]
    },
    {
      id: 'b2b',
      client: 'APEX TOOLS (B2B)',
      industry: 'Manufacturing & Industrial',
      metricHighlight: '120+ Leads/Mo',
      metricLabel: 'Zero Missed Inquiries Across Domestic & Export',
      title: 'Modern B2B Catalog App + 24/7 WhatsApp RFQ Bot',
      desc: 'Transformed an outdated static brochure website into an interactive digital product catalog with instant WhatsApp Request-for-Quote (RFQ) automation.',
      tags: ['B2B Web Catalog', 'WhatsApp RFQ Bot', 'Google Sheets CRM', 'Fast Loading'],
      gradient: '#7C3AED',
      problem: 'Buyers had to fill lengthy contact forms and wait 24-48 hours for a quotation. Over 40% of potential buyers bought from competitors who answered faster.',
      solution: 'Built a lightning-fast digital catalog where buyers can download technical PDF specs in 1 click and get instant price estimates on WhatsApp within 15 seconds.',
      stack: ['Angular Modern', 'WhatsApp Cloud API', 'Google Sheets Sync', 'Tailwind CSS'],
      metrics: [
        { label: 'Response Time', value: '< 30s' },
        { label: 'Monthly RFQs', value: '120+' },
        { label: 'Hours Saved/Wk', value: '20 hrs' },
        { label: 'Lead Conversion', value: '+55%' }
      ]
    },
    {
      id: 'healthcare',
      client: 'SMILECRAFT DENTAL',
      industry: 'Healthcare & Wellness Clinic',
      metricHighlight: '65% Less No-Shows',
      metricLabel: '180+ Automated Monthly Patient Bookings',
      title: 'Local High-Intent Ads + Automated WhatsApp Appointment Engine',
      desc: 'Eliminated manual phone confirmation chaos by connecting targeted local Meta/Google ads directly to an automated WhatsApp booking and reminder engine.',
      tags: ['Local Meta Ads', 'WhatsApp Booking', 'Automated Reminders', 'Zero Paperwork'],
      gradient: '#0284C7',
      problem: 'Clinic receptionist was spending 5 hours daily making reminder calls, yet 25% of patients didn’t show up, wasting valuable doctor chair time.',
      solution: 'Ran targeted local Meta ads for specific treatments with instant WhatsApp booking, automatic appointment confirmations, and SMS/WhatsApp reminders 2 hours before the visit.',
      stack: ['Meta Local Ads', 'WhatsApp Automation', 'Google Calendar Sync', 'SMS Gateway'],
      metrics: [
        { label: 'No-Show Rate', value: 'Down 65%' },
        { label: 'Monthly Bookings', value: '180+' },
        { label: 'Staff Time Saved', value: '18 hrs/wk' },
        { label: 'Patient Rating', value: '4.9/5' }
      ]
    },
    {
      id: 'realestate',
      client: 'URBANSPACE ADVISORY',
      industry: 'Property Advisory & Real Estate',
      metricHighlight: '₹4.2Cr Sales',
      metricLabel: '82% Genuine Buyer Verification',
      title: 'High-Intent Meta Lead Funnel & Instant CRM Routing',
      desc: 'Replaced generic lead forms with multi-step qualifying questions, automated WhatsApp brochure delivery, and instant team phone alerts.',
      tags: ['Buyer Qualifying Ads', 'WhatsApp Brochure', 'Instant Lead Alert', 'CRM Pipeline'],
      gradient: '#FF2E63',
      problem: 'Spending ₹60,000/month on Facebook ads but getting 70% junk numbers, non-serious inquiries, or people looking for unrelated rental properties.',
      solution: 'Implemented multi-step qualifying ad questions with OTP mobile verification and instant WhatsApp delivery of floor plans, notifying agents within 60 seconds.',
      stack: ['Meta Ads Manager', 'WhatsApp API', 'HubSpot/Zoho CRM', 'Webhooks'],
      metrics: [
        { label: 'Verified Buyers', value: '82%' },
        { label: 'Cost Per Lead', value: '-45%' },
        { label: 'Response Speed', value: '< 1 min' },
        { label: 'Deals Closed', value: '₹4.2Cr' }
      ]
    }
  ]);

  public openModal(item: CaseStudy) {
    this.sound.playClick();
    this.activeModal.set(item);
  }

  public closeModal() {
    this.sound.playClick();
    this.activeModal.set(null);
  }
}
