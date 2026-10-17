import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoundService } from '../../services/sound.service';

export interface CaseStudy {
  id: string;
  clientCategory: string;
  location: string;
  timeline: string;
  metricHighlight: string;
  metricLabel: string;
  title: string;
  desc: string;
  tags: string[];
  gradient: string;
  beforeBaseline: {
    speedOrResponse: string;
    roasOrQuality: string;
    lostMetric: string;
  };
  afterResult: {
    speedOrResponse: string;
    roasOrQuality: string;
    gainMetric: string;
  };
  theProblem: string;
  theFix: string[];
  keyTakeaway: string;
  stack: string[];
}

@Component({
  selector: 'app-case-studies',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="case-studies" class="relative py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4 sm:gap-6">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sunset-rose/10 border border-sunset-rose/25 text-sunset-rose text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <span class="w-1.5 h-1.5 rounded-full bg-sunset-rose"></span>
            Verified Implementation Records
          </div>
          <h2 class="font-heading text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Real Client Transformations & <br class="hidden sm:inline" />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan">
              Practical Implementation Blueprints
            </span>
          </h2>
        </div>
        <p class="text-slate-600 text-xs sm:text-sm max-w-md">
          Zero inflated vanity numbers or Photoshop claims. Real engineering audits, authentic before/after baselines, and practical growth mechanisms for Indian businesses.
        </p>
      </div>

      <!-- Honest Transparency & NDA Notice -->
      <div class="flex items-start sm:items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs text-slate-600 mb-8 sm:mb-10 font-mono">
        <span class="text-base shrink-0">🛡️</span>
        <div>
          <strong class="text-slate-900 font-bold">Client Confidentiality & Data Integrity:</strong>
          Per mutual NDA agreements, client trade names are presented with industry descriptors, but all operational audit logs, Google/Meta ad benchmarks, and automated workflows are 100% authentic implementation files.
        </div>
      </div>

      <!-- Case Studies Cards Grid - Luxury Light -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        @for (item of caseStudies(); track item.id) {
          <div 
            class="group rounded-2xl sm:rounded-3xl bg-white/90 border border-slate-200 hover:border-sunset-rose/40 p-4 sm:p-8 backdrop-blur-xl shadow-[0_10px_30px_rgba(15,23,42,0.04)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden cursor-pointer"
            (click)="openModal(item)">
            
            <!-- Radiant Background Glow on Hover -->
            <div 
              class="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
              [style.background]="item.gradient"></div>

            <div>
              <!-- Top Location, Industry & Timeline -->
              <div class="flex flex-wrap items-center justify-between gap-2 mb-3.5 sm:mb-4">
                <span class="text-[11px] sm:text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <span>📍 {{ item.location }}</span>
                  <span>•</span>
                  <span>{{ item.timeline }}</span>
                </span>
                <span class="px-2.5 py-0.5 sm:py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] sm:text-xs font-mono text-slate-700 font-semibold">
                  {{ item.clientCategory }}
                </span>
              </div>

              <!-- Real Metric Highlight (Grounded & Honest) -->
              <div class="mb-3.5 sm:mb-4">
                <p class="text-2xl sm:text-4xl font-heading font-black text-slate-900">
                  {{ item.metricHighlight }}
                </p>
                <p class="text-[11px] sm:text-xs font-mono text-sunset-rose mt-1 font-bold">
                  {{ item.metricLabel }}
                </p>
              </div>

              <!-- Title & Desc -->
              <h3 class="font-heading text-base sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-sunset-rose transition-colors">
                {{ item.title }}
              </h3>
              <p class="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5">
                {{ item.desc }}
              </p>

              <!-- Honest Before vs After Mini-Comparison Bar -->
              <div class="grid grid-cols-2 gap-2 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/80 mb-4 sm:mb-5 text-[10px] sm:text-[11px] font-mono">
                <div class="border-r border-slate-200/80 pr-1.5 sm:pr-2">
                  <span class="text-red-700 font-bold block mb-1">✕ BEFORE:</span>
                  <p class="text-slate-600 truncate">• {{ item.beforeBaseline.speedOrResponse }}</p>
                  <p class="text-slate-600 truncate">• {{ item.beforeBaseline.roasOrQuality }}</p>
                </div>
                <div class="pl-1 sm:pl-1.5">
                  <span class="text-emerald-700 font-bold block mb-1">✓ METAVEX:</span>
                  <p class="text-slate-900 font-bold truncate">• {{ item.afterResult.speedOrResponse }}</p>
                  <p class="text-slate-900 font-bold truncate">• {{ item.afterResult.roasOrQuality }}</p>
                </div>
              </div>
            </div>

            <!-- Tags & Modal Trigger -->
            <div>
              <div class="flex flex-wrap gap-1 sm:gap-1.5 mb-4 sm:mb-5">
                @for (tag of item.tags; track tag) {
                  <span class="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg bg-slate-100 border border-slate-200 text-[10px] sm:text-[11px] font-mono text-slate-600 font-medium">
                    {{ tag }}
                  </span>
                }
              </div>

              <div class="flex items-center justify-between pt-3 sm:pt-4 border-t border-slate-200 text-[11px] sm:text-xs font-mono text-slate-600 group-hover:text-slate-950 font-semibold transition-colors">
                <span class="truncate mr-2">View Architecture Breakdown</span>
                <span class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-sunset-rose group-hover:text-white transition-all duration-200 shrink-0">
                  →
                </span>
              </div>
            </div>

          </div>
        }
      </div>

      <!-- Case Study Modal / Drawer - Light Theme -->
      @if (activeModal()) {
        <div class="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            class="relative w-full max-w-3xl max-h-[92dvh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-white border border-slate-200 p-4 sm:p-8 md:p-10 shadow-2xl text-slate-800">
            
            <!-- Close Button -->
            <button 
              type="button"
              (click)="closeModal()"
              class="absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-950 flex items-center justify-center transition-colors">
              ✕
            </button>

            <!-- Modal Content Header -->
            <div class="mb-5 sm:mb-6 pr-8">
              <span class="text-[10px] sm:text-xs font-mono text-sunset-rose font-bold uppercase tracking-wider block">
                Audit & Implementation • {{ activeModal()?.clientCategory }} ({{ activeModal()?.location }})
              </span>
              <h3 class="font-heading text-lg sm:text-2xl font-extrabold text-slate-900 mt-1">
                {{ activeModal()?.title }}
              </h3>
            </div>

            <!-- Honest Scorecard -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6 font-mono text-xs">
              <div class="p-3 rounded-xl bg-red-50/80 border border-red-200 text-red-950">
                <p class="font-bold text-red-800 text-[11px] uppercase tracking-wider mb-2">Previous Baseline (Bottleneck):</p>
                <p class="mb-1">⚠️ Load/Speed: <strong>{{ activeModal()?.beforeBaseline?.speedOrResponse }}</strong></p>
                <p class="mb-1">⚠️ Performance: <strong>{{ activeModal()?.beforeBaseline?.roasOrQuality }}</strong></p>
                <p>⚠️ Money Lost: <strong>{{ activeModal()?.beforeBaseline?.lostMetric }}</strong></p>
              </div>

              <div class="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-950">
                <p class="font-bold text-emerald-800 text-[11px] uppercase tracking-wider mb-2">Verified Result with MetaVex:</p>
                <p class="mb-1">✅ Load/Speed: <strong>{{ activeModal()?.afterResult?.speedOrResponse }}</strong></p>
                <p class="mb-1">✅ Performance: <strong>{{ activeModal()?.afterResult?.roasOrQuality }}</strong></p>
                <p>✅ Tangible Gain: <strong>{{ activeModal()?.afterResult?.gainMetric }}</strong></p>
              </div>
            </div>

            <!-- Problem vs Solution Breakdown -->
            <div class="space-y-4 text-xs sm:text-sm leading-relaxed mb-6">
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 class="font-heading font-bold text-slate-900 text-xs uppercase tracking-wider mb-1.5 flex items-center gap-2">
                  <span class="text-red-600">●</span> 1. The Core Bottleneck (Why Money Was Leaking):
                </h4>
                <p class="text-slate-600">
                  {{ activeModal()?.theProblem }}
                </p>
              </div>

              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 class="font-heading font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span class="text-emerald-600">●</span> 2. What MetaVex Actually Implemented:
                </h4>
                <ul class="space-y-1.5 text-slate-700">
                  @for (fix of activeModal()?.theFix; track fix) {
                    <li class="flex items-start gap-2">
                      <span class="text-emerald-600 font-bold shrink-0">✓</span>
                      <span>{{ fix }}</span>
                    </li>
                  }
                </ul>
              </div>

              <div class="p-4 rounded-2xl bg-sunset-rose/5 border border-sunset-rose/20">
                <h4 class="font-heading font-bold text-sunset-rose text-xs uppercase tracking-wider mb-1">
                  💡 Honest Takeaway for Similar Businesses:
                </h4>
                <p class="text-slate-700 text-xs sm:text-sm">
                  {{ activeModal()?.keyTakeaway }}
                </p>
              </div>
            </div>

            <!-- Tech Stack Pills -->
            <div class="mb-6">
              <h5 class="text-xs font-mono uppercase text-slate-500 font-bold mb-2.5">Specific Components Deployed:</h5>
              <div class="flex flex-wrap gap-2">
                @for (s of activeModal()?.stack; track s) {
                  <span class="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 font-mono text-xs font-semibold">
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
      clientCategory: 'D2C Apparel & Ethnic Wear',
      location: 'Jaipur, Rajasthan',
      timeline: '6-Week Implementation',
      metricHighlight: '3.8x Stable ROAS',
      metricLabel: 'From 1.4x baseline • Recovered 28% abandoned carts',
      title: 'Mobile Speed Optimization & 1-Click WhatsApp Cart Recovery',
      desc: 'Fixed a slow 5.8-second mobile store that was bleeding ad spend, deploying instant Razorpay UPI checkout and automated WhatsApp checkout recovery.',
      tags: ['1.2s Fast Mobile Web', 'Meta Conversions API (CAPI)', '1-Click UPI', 'WhatsApp Bot'],
      gradient: '#FF2E63',
      beforeBaseline: {
        speedOrResponse: '5.8s load time on Jio 4G',
        roasOrQuality: '1.4x ROAS (barely break-even)',
        lostMetric: '65% dropped off before payment screen'
      },
      afterResult: {
        speedOrResponse: '1.2s instant mobile load',
        roasOrQuality: '3.8x stable ad ROAS',
        gainMetric: '28% abandoned carts converted on WhatsApp'
      },
      theProblem: 'The brand was spending ₹40,000–₹60,000/month on Meta ads. Due to uncompressed high-res catalog photos and bloated Shopify plugins, mobile bounce rate was over 62%. Customers gave up before the payment page loaded, causing cost per acquisition to exceed product margins.',
      theFix: [
        'Migrated critical product landing pages to sub-1.2s lightweight code with optimized WebP images and mobile CDN caching.',
        'Installed server-side Meta Conversions API (CAPI) with first-party cookie deduplication, allowing Meta’s algorithm to find genuine buyers rather than casual window-shoppers.',
        'Set up an automated WhatsApp checkout recovery trigger via Cloud API: customers leaving without paying received a polite discount nudge within 15 minutes with a 1-tap pre-filled UPI link.'
      ],
      keyTakeaway: 'For Indian D2C brands, page speed and WhatsApp checkout recovery matter more than increasing ad budget. Fixing these two leaks doubled ad efficiency without spending a single extra rupee on ads.',
      stack: ['Angular Fast Frontend', 'Meta CAPI Gateway', 'WhatsApp Cloud API', 'Razorpay UPI Webhooks'],
    },
    {
      id: 'b2b',
      clientCategory: 'B2B Precision Fasteners & Tools',
      location: 'Ludhiana, Punjab',
      timeline: '4-Week Implementation',
      metricHighlight: '42 Verified RFQs / Month',
      metricLabel: 'Response time cut from 48 hours to under 45 seconds',
      title: 'Digital Spec Catalog + Automated WhatsApp RFQ Engine',
      desc: 'Transformed an old static brochure into an interactive mobile spec catalog, letting buyers download technical PDFs and request instant price quotations on WhatsApp.',
      tags: ['B2B Product Catalog', 'WhatsApp RFQ Bot', 'Google Sheets CRM Sync', 'Instant Spec PDF'],
      gradient: '#7C3AED',
      beforeBaseline: {
        speedOrResponse: '24–48 hr quotation delay',
        roasOrQuality: '10-field manual contact form',
        lostMetric: '40% inquiries lost to faster competitors'
      },
      afterResult: {
        speedOrResponse: '< 45s WhatsApp response',
        roasOrQuality: '42 verified buyer inquiries/month',
        gainMetric: '18 hours/week manual admin time saved'
      },
      theProblem: 'Industrial buyers visiting the website were forced to fill out long static contact forms that landed in an unmonitored info@ email box. By the time the sales team called back 2 days later, buyers had already ordered samples from competitor suppliers in Gujarat or Maharashtra.',
      theFix: [
        'Built a clean, mobile-optimized catalog where buyers can search technical specs (dimensions, grade, tensile strength) and download 1-click specification sheets.',
        'Replaced contact forms with an interactive "Instant WhatsApp RFQ" button that prompts the buyer for material grade and quantity, then logs the lead into Google Sheets with instant phone notification to the sales engineer.',
        'Set up automated WhatsApp response sending the exact technical catalog PDF and estimated price range within 30 seconds.'
      ],
      keyTakeaway: 'In Indian B2B markets, speed to quotation wins the contract. Closing response time from 48 hours to 45 seconds directly stopped deals from leaking to competitors.',
      stack: ['Interactive Web Catalog', 'WhatsApp Cloud API', 'Google Sheets CRM Automation', 'Cloudflare CDN'],
    },
    {
      id: 'healthcare',
      clientCategory: 'Multi-Chair Dental & Wellness Clinic',
      location: 'Lucknow & Kanpur, UP',
      timeline: '3-Week Implementation',
      metricHighlight: '52% Fewer Patient No-Shows',
      metricLabel: '85+ monthly automated WhatsApp appointments',
      title: 'Local Treatment Funnel & Automated Slot Confirmation',
      desc: 'Replaced random social media boosting with targeted local Meta ads connected directly to automated WhatsApp appointment booking and 2-hour reminder alerts.',
      tags: ['Local Meta Ads', 'WhatsApp Booking Bot', 'Calendar Sync', 'Location Pin Reminders'],
      gradient: '#0284C7',
      beforeBaseline: {
        speedOrResponse: 'Manual phone confirmation chaos',
        roasOrQuality: 'Untargeted Facebook boost clicks',
        lostMetric: '30% booked patients failed to show up'
      },
      afterResult: {
        speedOrResponse: 'Automated 2-hr reminder with GPS pin',
        roasOrQuality: '85+ qualified treatment bookings/mo',
        gainMetric: 'Saved 15 receptionist phone hours/week'
      },
      theProblem: 'The clinic was spending ₹25,000/month on generic Facebook boost posts, getting calls from people seeking free advice or outside their service area. Furthermore, receptionists spent 4 hours every day calling patients, yet 3 out of 10 booked patients failed to show up, leaving expensive doctor chairs idle.',
      theFix: [
        'Designed high-intent local Meta ad creatives for specific dental and aesthetic treatments (aligners, dental implants, root canal) with geo-targeting within an 8km radius.',
        'Connected ads directly to a WhatsApp Business flow where patients pick their preferred doctor, date, and morning/evening slot in 4 taps.',
        'Automated appointment confirmations with Google Calendar sync, and scheduled an automatic reminder 2 hours prior with clinic Google Maps directions.'
      ],
      keyTakeaway: 'Clinics do not need viral reach; they need high-intent local patients with automated attendance reminders. Eliminating no-shows created immediate profit without increasing ad spend.',
      stack: ['Meta Ads Manager (Local Geo)', 'WhatsApp Flow API', 'Google Calendar Webhooks', 'Automated SMS'],
    },
    {
      id: 'realestate',
      clientCategory: 'Commercial Property & Workspace Advisory',
      location: 'Gurugram & Noida, NCR',
      timeline: '4-Week Implementation',
      metricHighlight: '74% Genuine Buyer Screening',
      metricLabel: 'Cost per verified buyer lead reduced by 38%',
      title: 'Multi-Step Qualifying Funnel & Instant Lead Alert Webhook',
      desc: 'Eliminated junk numbers and broker spam by introducing a 3-step WhatsApp screening quiz, instant brochure delivery, and real-time sales phone alerts.',
      tags: ['Buyer Screening Quiz', 'WhatsApp OTP Verification', 'Instant Brochure Delivery', 'CRM Routing'],
      gradient: '#FF2E63',
      beforeBaseline: {
        speedOrResponse: '3–6 hour delay in sales calling leads',
        roasOrQuality: 'Generic Facebook instant form with 75% junk',
        lostMetric: 'Sales reps wasted full days calling bad leads'
      },
      afterResult: {
        speedOrResponse: '< 60 second phone alert to sales manager',
        roasOrQuality: '74% verified genuine investor inquiries',
        gainMetric: 'Cost per verified lead dropped from ₹410 to ₹255'
      },
      theProblem: 'Standard Facebook instant lead forms were flooded with invalid numbers, students, and brokers pretending to be buyers. Sales executives spent hours calling 100 leads only to find 10 genuine investors, driving team morale down and inflating acquisition costs.',
      theFix: [
        'Replaced standard instant forms with a 3-step interactive qualifying questionnaire (budget tier, commercial vs retail, investment horizon).',
        'Implemented WhatsApp delivery of master layout floor plans and pricing sheets, ensuring the phone number entered is active on WhatsApp.',
        'Configured real-time Webhook notifications directly to senior sales managers on WhatsApp within 60 seconds of a qualified submission.'
      ],
      keyTakeaway: 'Filtering leads before they reach sales reps saves hundreds of wasted calling hours and allows reps to focus on serious, verified investors immediately.',
      stack: ['Meta Custom Lead Funnel', 'WhatsApp Cloud API', 'Zoho CRM Webhook Sync', 'Automated PDF Dispatch'],
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
