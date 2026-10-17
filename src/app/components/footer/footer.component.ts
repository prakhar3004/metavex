import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="relative bg-gradient-to-b from-[#FAFBFC] via-slate-50 to-slate-100 border-t border-slate-200/90 pt-10 sm:pt-14 pb-8 sm:pb-10 overflow-hidden">
      
      <!-- Subtle Top Gradient Glow Accent -->
      <div class="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-sunset-rose/50 to-transparent"></div>
      <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-r from-sunset-rose/10 via-electric-violet/10 to-cyber-cyan/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <!-- Top CTA Card - High Conversion Banner -->
        <div class="mb-10 p-6 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-[0_15px_40px_rgba(15,23,42,0.04)] relative overflow-hidden">
          <div class="absolute -top-20 -right-20 w-64 h-64 bg-sunset-rose/10 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute -bottom-20 -left-20 w-64 h-64 bg-cyber-cyan/10 rounded-full blur-3xl pointer-events-none"></div>

          <div class="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 sm:gap-8">
            <div class="max-w-2xl">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sunset-rose/10 border border-sunset-rose/25 text-sunset-rose text-xs font-mono font-bold uppercase tracking-wider mb-3">
                <span class="w-1.5 h-1.5 rounded-full bg-sunset-rose animate-ping"></span>
                Scale Your Business Online
              </div>
              <h2 class="font-heading text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
                Ready to Build Your Automated <br class="hidden sm:inline" />
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan">
                  Digital Growth Engine?
                </span>
              </h2>
              <p class="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed">
                Stop losing potential buyers to slow websites and delayed replies. Get a fast, high-converting digital setup that generates real revenue.
              </p>
            </div>

            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a 
                href="https://wa.me/919026231315?text=Hi%20MetaVex%20Team%2C%20I%20want%20to%20grow%20my%20business%20online.%20Can%20we%20connect%3F" 
                target="_blank"
                rel="noopener noreferrer"
                class="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group">
                <span class="text-base">💬</span>
                <span>Chat on WhatsApp</span>
              </a>

              <a 
                href="#hero" 
                (click)="onScrollTop($event)"
                class="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-950 text-white font-heading font-bold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group">
                <span>Free Growth Audit</span>
                <span class="text-sunset-rose group-hover:translate-x-0.5 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>

        <!-- 4 Core Client Commitments -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          <div class="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-sunset-rose/30 transition-all">
            <div class="w-8 h-8 rounded-xl bg-rose-50 text-sunset-rose flex items-center justify-center text-base mb-2 font-bold">🔒</div>
            <p class="font-heading font-bold text-xs text-slate-900">100% Asset Ownership</p>
            <p class="text-[11px] text-slate-500 mt-1 leading-relaxed">You own all your ad accounts, domain, code, and customer data.</p>
          </div>

          <div class="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-sunset-rose/30 transition-all">
            <div class="w-8 h-8 rounded-xl bg-purple-50 text-electric-violet flex items-center justify-center text-base mb-2 font-bold">🤝</div>
            <p class="font-heading font-bold text-xs text-slate-900">No Long Lock-in Contracts</p>
            <p class="text-[11px] text-slate-500 mt-1 leading-relaxed">Work with clear monthly milestones and performance deliverables.</p>
          </div>

          <div class="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-sunset-rose/30 transition-all">
            <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-base mb-2 font-bold">💬</div>
            <p class="font-heading font-bold text-xs text-slate-900">Direct WhatsApp Group</p>
            <p class="text-[11px] text-slate-500 mt-1 leading-relaxed">Direct priority chat with your dedicated developer and marketing lead.</p>
          </div>

          <div class="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-sunset-rose/30 transition-all">
            <div class="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center text-base mb-2 font-bold">🚀</div>
            <p class="font-heading font-bold text-xs text-slate-900">Fast 30-Day Turnaround</p>
            <p class="text-[11px] text-slate-500 mt-1 leading-relaxed">From initial audit to live high-converting site and active ads in 30 days.</p>
          </div>
        </div>

        <!-- Main Footer 4-Column Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-200">
          
          <!-- Brand & Mission (Span 4) -->
          <div class="lg:col-span-4">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-9 h-9 rounded-xl overflow-hidden shadow-xs ring-1 ring-slate-200 shrink-0">
                <img src="logo.png" alt="MetaVex Digital Logo" class="w-full h-full object-cover">
              </div>
              <div class="flex items-center gap-1.5">
                <span class="font-heading font-black text-xl text-slate-900 tracking-wider">METAVEX</span>
                <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sunset-rose/10 text-sunset-rose border border-sunset-rose/30 uppercase font-bold">DIGITAL</span>
              </div>
            </div>

            <p class="text-xs text-slate-600 leading-relaxed mb-4 max-w-sm">
              Digital growth and business automation partner for ambitious Indian brands, manufacturers, and growing businesses.
            </p>

            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-800 font-semibold">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Built in India for Growing Businesses 🇮🇳</span>
            </div>
          </div>

          <!-- Services Links (Span 3) -->
          <div class="lg:col-span-3">
            <h5 class="text-xs font-mono uppercase tracking-widest text-slate-900 mb-4 font-bold">Services & Benefits</h5>
            <ul class="space-y-2.5 text-xs text-slate-600 font-medium">
              <li><a href="#services" class="hover:text-sunset-rose transition-colors flex items-center gap-1.5"><span>›</span> Fast Mobile Websites & Stores</a></li>
              <li><a href="#services" class="hover:text-sunset-rose transition-colors flex items-center gap-1.5"><span>›</span> High-ROAS Meta Ads (FB & Insta)</a></li>
              <li><a href="#services" class="hover:text-sunset-rose transition-colors flex items-center gap-1.5"><span>›</span> WhatsApp & Lead Automation</a></li>
              <li><a href="#services" class="hover:text-sunset-rose transition-colors flex items-center gap-1.5"><span>›</span> Brand Reels & Social Content</a></li>
              <li><a href="#services" class="hover:text-sunset-rose transition-colors flex items-center gap-1.5"><span>›</span> Cloud Systems & Operations</a></li>
            </ul>
          </div>

          <!-- Quick Navigation (Span 2) -->
          <div class="lg:col-span-2">
            <h5 class="text-xs font-mono uppercase tracking-widest text-slate-900 mb-4 font-bold">Quick Links</h5>
            <ul class="space-y-2.5 text-xs text-slate-600 font-medium">
              <li><a href="#calculator" class="hover:text-sunset-rose transition-colors">ROI Calculator</a></li>
              <li><a href="#gap" class="hover:text-sunset-rose transition-colors">Before vs After</a></li>
              <li><a href="#case-studies" class="hover:text-sunset-rose transition-colors">Case Studies</a></li>
              <li><a href="#blueprint" class="hover:text-sunset-rose transition-colors">4-Step Process</a></li>
            </ul>
          </div>

          <!-- Direct Contact (Span 3) - NO ADDRESS, STRICTLY PHONE & EMAIL -->
          <div class="lg:col-span-3">
            <h5 class="text-xs font-mono uppercase tracking-widest text-slate-900 mb-4 font-bold">Direct Contact</h5>
            
            <div class="space-y-3">
              <!-- Phone / WhatsApp Card -->
              <a 
                href="tel:+919026231315" 
                class="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-emerald-500/50 hover:shadow-md transition-all flex items-center gap-3 group block">
                <div class="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-bold shrink-0 group-hover:scale-105 transition-transform">
                  📞
                </div>
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-500 font-semibold block">Call / WhatsApp</span>
                  <span class="text-xs sm:text-sm font-heading font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    +91 9026231315
                  </span>
                </div>
              </a>

              <!-- Email Card -->
              <a 
                href="mailto:metavexdigital@gmail.com" 
                class="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-sunset-rose/50 hover:shadow-md transition-all flex items-center gap-3 group block">
                <div class="w-9 h-9 rounded-xl bg-rose-50 text-sunset-rose flex items-center justify-center text-sm font-bold shrink-0 group-hover:scale-105 transition-transform">
                  ✉️
                </div>
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-500 font-semibold block">Email Us</span>
                  <span class="text-xs sm:text-sm font-heading font-bold text-slate-900 group-hover:text-sunset-rose transition-colors break-all">
                    metavexdigital&#64;gmail.com
                  </span>
                </div>
              </a>

              <!-- Quick WhatsApp CTA Link -->
              <div class="pt-1">
                <a 
                  href="https://wa.me/919026231315?text=Hello%20MetaVex%20Team%2C%20I%20am%20interested%20in%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700 hover:text-emerald-800 transition-colors">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Available on WhatsApp ➔</span>
                </a>
              </div>

            </div>
          </div>

        </div>

        <!-- Bottom Bar -->
        <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© 2026 METAVEX DIGITAL. All Rights Reserved.</p>
          <div class="flex items-center gap-4 text-slate-600">
            <span class="hover:text-slate-900 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span class="hover:text-slate-900 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span class="hover:text-slate-900 cursor-pointer">Direct Support</span>
          </div>
        </div>

      </div>

    </footer>
  `
})
export class FooterComponent {
  public sound = inject(SoundService);

  public onScrollTop(e: Event) {
    e.preventDefault();
    this.sound.playClick();
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
