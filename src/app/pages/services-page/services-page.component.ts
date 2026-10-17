import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServicesBentoComponent } from '../../components/services-bento/services-bento.component';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ServicesBentoComponent],
  template: `
    <div class="pt-8 sm:pt-14 pb-16">
      
      <!-- Page Header -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14 text-center">
        
        <!-- Breadcrumb & Badge -->
        <div class="flex items-center justify-center gap-2 mb-3">
          <a routerLink="/" class="text-xs font-mono text-slate-500 hover:text-slate-900">Home</a>
          <span class="text-xs font-mono text-slate-400">/</span>
          <span class="text-xs font-mono text-sunset-rose font-bold uppercase">Services</span>
        </div>

        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sunset-rose/10 border border-sunset-rose/25 text-sunset-rose text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <span class="w-2 h-2 rounded-full bg-sunset-rose animate-ping"></span>
          Full-Stack Growth & Automation Capabilities
        </div>

        <h1 class="font-heading text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">
          Engineered For Speed, Ads ROAS & <br class="hidden sm:inline" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan">
            Zero-Leak Inquiries.
          </span>
        </h1>

        <p class="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base leading-relaxed">
          We don’t do generic social media posts or bloated templates. We build custom high-speed web apps, high-intent Meta campaigns, and automated WhatsApp systems that convert Indian consumers.
        </p>

        <!-- Quick Action CTAs -->
        <div class="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8">
          <button 
            type="button"
            (click)="onOpenAudit()"
            class="px-6 py-3 rounded-2xl bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan text-white font-heading font-bold text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all">
            Get Free 30-Min Service Audit
          </button>
          
          <a 
            routerLink="/calculator"
            class="px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-800 font-heading font-bold text-xs sm:text-sm hover:bg-slate-50 transition-all">
            Calculate Your ROI →
          </a>
        </div>

      </div>

      <!-- Main Services Bento Grid Component -->
      <app-services-bento></app-services-bento>

      <!-- Detailed Breakdown Table of Deliverables -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20">
        <div class="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-sm">
          
          <div class="max-w-2xl mb-8">
            <span class="text-xs font-mono text-sunset-rose uppercase tracking-wider font-bold">Standard vs MetaVex Delivery</span>
            <h3 class="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              What Is Included In Every Engagement
            </h3>
            <p class="text-xs sm:text-sm text-slate-600 mt-2">
              Transparent deliverables with clear ownership. You own 100% of your code, ad accounts, and WhatsApp bots.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <span class="text-2xl mb-3 block">⚡</span>
              <h4 class="font-heading font-bold text-base text-slate-900 mb-2">Web Engineering</h4>
              <ul class="space-y-2 text-xs font-mono text-slate-600">
                <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Sub-1.2s Load Speed on Jio 4G</li>
                <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> 1-Click Razorpay & Cashfree UPI</li>
                <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Zero WordPress / Wix Plugin Bloat</li>
                <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Cloudflare Global Edge CDN</li>
              </ul>
            </div>

            <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <span class="text-2xl mb-3 block">📈</span>
              <h4 class="font-heading font-bold text-base text-slate-900 mb-2">Meta & Instagram Ads</h4>
              <ul class="space-y-2 text-xs font-mono text-slate-600">
                <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Server-Side Meta CAPI Tracking</li>
                <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> High-Intent Creative Hooks & Reels</li>
                <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> 2.8x - 4.2x Targeted ROAS</li>
                <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Weekly Transparent Ad Reports</li>
              </ul>
            </div>

            <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <span class="text-2xl mb-3 block">💬</span>
              <h4 class="font-heading font-bold text-base text-slate-900 mb-2">WhatsApp Automation</h4>
              <ul class="space-y-2 text-xs font-mono text-slate-600">
                <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Instant &lt; 30s Lead Responder</li>
                <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Automated PDF Catalog / RFQ Bot</li>
                <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Real-Time Google Sheets / CRM Sync</li>
                <li class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Official Meta Cloud API (Zero Bans)</li>
              </ul>
            </div>

          </div>

          <!-- Bottom CTA -->
          <div class="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p class="font-heading font-bold text-sm text-slate-900">Need a custom combination of services?</p>
              <p class="text-xs text-slate-500 font-mono">We audit your current tech stack for free and propose only what brings revenue.</p>
            </div>
            <button 
              type="button" 
              (click)="onOpenAudit()"
              class="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-heading font-bold text-xs hover:bg-slate-950 transition-colors">
              Request Free Strategy Audit
            </button>
          </div>

        </div>
      </section>

    </div>
  `
})
export class ServicesPageComponent {
  public sound = inject(SoundService);
  @Output() openLeadModal = new EventEmitter<void>();

  public onOpenAudit() {
    this.sound.playChime();
    this.openLeadModal.emit();
  }
}
