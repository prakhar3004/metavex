import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="pt-8 sm:pt-14 pb-16">
      
      <!-- Page Header -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 text-center">
        
        <!-- Breadcrumb -->
        <div class="flex items-center justify-center gap-2 mb-3">
          <a routerLink="/" class="text-xs font-mono text-slate-500 hover:text-slate-900">Home</a>
          <span class="text-xs font-mono text-slate-400">/</span>
          <span class="text-xs font-mono text-sunset-rose font-bold uppercase">Contact & Audit</span>
        </div>

        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sunset-rose/10 border border-sunset-rose/25 text-sunset-rose text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <span class="w-2 h-2 rounded-full bg-sunset-rose animate-ping"></span>
          Direct Engineering Contact
        </div>

        <h1 class="font-heading text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">
          Speak Directly With Our <br class="hidden sm:inline" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan">
            Growth & Tech Engineers.
          </span>
        </h1>

        <p class="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base leading-relaxed">
          No junior account reps or scripted sales pitches. Connect directly with the people who will write your code and manage your campaigns.
        </p>

      </div>

      <!-- Main Contact Grid -->
      <section class="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          <!-- Left Column: Direct Contact Details & Working Channels (Span 5) -->
          <div class="lg:col-span-5 space-y-4 sm:space-y-6">
            
            <!-- WhatsApp Direct Card (Primary Contact Method for India) -->
            <div class="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-emerald-50/40 border border-emerald-200/90 shadow-sm relative overflow-hidden">
              <div class="flex items-center justify-between mb-4">
                <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] sm:text-xs font-mono font-bold">
                  ● INSTANT RESPONSE
                </span>
                <span class="text-xs font-mono text-emerald-600 font-semibold">&lt; 15 Mins</span>
              </div>

              <h3 class="font-heading font-extrabold text-lg sm:text-xl text-slate-900 mb-2">
                Chat Directly on WhatsApp
              </h3>
              <p class="text-xs sm:text-sm text-slate-600 mb-5 sm:mb-6 leading-relaxed">
                Connect directly with our founding team. Send us your website link and current ad spend for an instant preliminary review.
              </p>

              <a 
                href="https://wa.me/919026231315?text=Hi%20MetaVex%20Team%2C%20I%20want%20to%20audit%20my%20website%20and%20ads." 
                target="_blank" 
                rel="noopener"
                class="w-full py-3.5 px-4 sm:px-6 rounded-2xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-heading font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2.5 sm:gap-3 shadow-md hover:scale-[1.02] transition-all">
                <span class="text-base sm:text-lg">💬</span>
                <span>Message +91 9026231315</span>
              </a>
            </div>

            <!-- Email & Direct Call Card -->
            <div class="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4 sm:space-y-5">
              <div>
                <span class="text-[10px] sm:text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">Direct Email</span>
                <p class="font-heading font-extrabold text-base sm:text-lg text-slate-900 mt-1 break-all">
                  metavexdigital&#64;gmail.com
                </p>
                <p class="text-xs font-mono text-slate-500 mt-0.5">Replies guaranteed within 4 hours</p>
              </div>

              <div class="pt-3.5 sm:pt-4 border-t border-slate-100">
                <span class="text-[10px] sm:text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">Direct Phone</span>
                <p class="font-heading font-extrabold text-base sm:text-lg text-slate-900 mt-1">
                  +91 9026231315
                </p>
                <p class="text-xs font-mono text-slate-500 mt-0.5">Mon — Sat: 9:30 AM to 7:30 PM IST</p>
              </div>

              <div class="pt-3.5 sm:pt-4 border-t border-slate-100">
                <span class="text-[10px] sm:text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">Current Client Intake</span>
                <div class="flex items-center gap-2 mt-1">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span class="font-heading font-bold text-xs sm:text-sm text-emerald-800">Accepting 3 New Brands This Month</span>
                </div>
              </div>
            </div>

          </div>

          <!-- Right Column: Interactive Audit Application (Span 7) -->
          <div class="lg:col-span-7 p-4 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-sm">
            <div class="mb-5 sm:mb-6">
              <span class="text-xs font-mono text-sunset-rose font-bold uppercase tracking-wider">Zero Obligation</span>
              <h3 class="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                Request Your 30-Min Growth & Tech Audit
              </h3>
              <p class="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                We will analyze your current mobile load speed, check your Meta pixel health, and show you where inquiries are leaking.
              </p>
            </div>

            <!-- Launch Audit Wizard Button -->
            <div class="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-sunset-rose/10 via-electric-violet/10 to-cyber-cyan/10 border border-sunset-rose/25 text-center my-5 sm:my-6">
              <span class="text-2xl sm:text-3xl block mb-2 sm:mb-3">🚀</span>
              <h4 class="font-heading font-bold text-sm sm:text-base text-slate-900 mb-1">Interactive 4-Step Audit Application</h4>
              <p class="text-xs text-slate-600 mb-4 max-w-md mx-auto">
                Tell us your current business revenue tier and primary bottleneck to get a customized roadmap.
              </p>
              <button 
                type="button" 
                (click)="onOpenAudit()"
                class="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan text-white font-heading font-bold text-xs sm:text-sm shadow-md hover:scale-105 transition-all">
                Launch 2-Min Audit Application →
              </button>
            </div>

            <!-- Trust FAQ Accordion -->
            <div class="space-y-3 pt-6 border-t border-slate-200 text-xs sm:text-sm">
              <h4 class="font-heading font-bold text-sm text-slate-900 mb-3">Frequently Asked Questions:</h4>
              
              <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <strong class="text-slate-900 block mb-1">How much does a typical 30-day transformation cost?</strong>
                <p class="text-slate-600 text-xs leading-relaxed font-mono">
                  We price based on deliverables (custom high-speed website, Meta CAPI setup, WhatsApp automation bot). No hidden retainers or confusing agency percentages.
                </p>
              </div>

              <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <strong class="text-slate-900 block mb-1">Do we have to rebuild our existing website from scratch?</strong>
                <p class="text-slate-600 text-xs leading-relaxed font-mono">
                  Not always. If your current site is salvageable, we optimize speed and integrate WhatsApp and Meta CAPI. If it is beyond repair, we build a sub-1.2s headless storefront.
                </p>
              </div>

              <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <strong class="text-slate-900 block mb-1">Who actually manages our ad spend and WhatsApp API?</strong>
                <p class="text-slate-600 text-xs leading-relaxed font-mono">
                  You do. You retain 100% administrative ownership of your Razorpay account, Meta Ads Manager, and WhatsApp Cloud API credentials.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  `
})
export class ContactPageComponent {
  public sound = inject(SoundService);
  @Output() openLeadModal = new EventEmitter<void>();

  public onOpenAudit() {
    this.sound.playChime();
    this.openLeadModal.emit();
  }
}
