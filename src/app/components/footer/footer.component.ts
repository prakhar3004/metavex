import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="relative bg-gradient-to-b from-[#FAFBFC] via-slate-50 to-slate-100 border-t border-slate-200/90 pt-10 sm:pt-14 pb-8 sm:pb-10 overflow-hidden">

      <!-- Subtle Top Gradient Glow Accent -->
      <div class="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-sunset-rose/50 to-transparent"></div>
      <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-r from-sunset-rose/10 via-electric-violet/10 to-cyber-cyan/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <!-- Top CTA Card - High Conversion Banner -->
        <div class="mb-8 sm:mb-10 p-4 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-[0_15px_40px_rgba(15,23,42,0.04)] relative overflow-hidden">
          <div class="absolute -top-20 -right-20 w-64 h-64 bg-sunset-rose/10 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute -bottom-20 -left-20 w-64 h-64 bg-cyber-cyan/10 rounded-full blur-3xl pointer-events-none"></div>

          <div class="relative z-10 flex flex-col xl:flex-row lg:items-center lg:justify-between gap-5 sm:gap-8">
            <div class="max-w-2xl">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sunset-rose/10 border border-sunset-rose/25 text-sunset-rose text-xs font-mono font-bold uppercase tracking-wider mb-2.5 sm:mb-3">
                <span class="w-1.5 h-1.5 rounded-full bg-sunset-rose animate-ping"></span>
                Choose Your Next Step
              </div>
              <h2 class="font-heading text-xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 leading-[1.2]">
                Your Next Customer Needs <br class="hidden sm:inline" />
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan">
                  a Clear Path to You.
                </span>
              </h2>
              <p class="text-slate-600 text-sm mt-2.5 leading-relaxed">
                Help people understand your offer, ask a question, and hear back. Tell us where that journey gets difficult for your business.
              </p>
            </div>

            <div class="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0">
              <a
                href="https://wa.me/919026231351?text=Hi%20MetaVex%20Team%2C%20I%20want%20to%20grow%20my%20business%20online.%20Can%20we%20connect%3F"
                target="_blank"
                rel="noopener noreferrer"
                class="px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group">
                <span class="text-base">💬</span>
                <span>Chat on WhatsApp</span>
              </a>

              <a
                routerLink="/contact"
                class="px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-950 text-white font-heading font-bold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group">
                <span>Discuss My Project</span>
                <span class="text-sunset-rose group-hover:translate-x-0.5 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>

        <!-- 4 Core Client Commitments -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
          <div class="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-sunset-rose/30 transition-all">
            <div class="w-8 h-8 rounded-xl bg-rose-50 text-sunset-rose flex items-center justify-center text-base mb-2 font-bold">🔒</div>
            <p class="font-heading font-bold text-xs text-slate-900">Clear Project Scope</p>
            <p class="text-[11px] text-slate-500 mt-1 leading-relaxed">Agree on deliverables, costs, and access before work starts.</p>
          </div>

          <div class="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-sunset-rose/30 transition-all">
            <div class="w-8 h-8 rounded-xl bg-purple-50 text-electric-violet flex items-center justify-center text-base mb-2 font-bold">🤝</div>
            <p class="font-heading font-bold text-xs text-slate-900">Start With One Priority</p>
            <p class="text-[11px] text-slate-500 mt-1 leading-relaxed">Choose the work that addresses your current challenge.</p>
          </div>

          <div class="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-sunset-rose/30 transition-all">
            <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-base mb-2 font-bold">💬</div>
            <p class="font-heading font-bold text-xs text-slate-900">Talk to Our Team</p>
            <p class="text-[11px] text-slate-500 mt-1 leading-relaxed">Share questions and requirements directly on WhatsApp.</p>
          </div>

          <div class="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-sunset-rose/30 transition-all">
            <div class="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center text-base mb-2 font-bold">🚀</div>
            <p class="font-heading font-bold text-xs text-slate-900">A Timeline That Fits</p>
            <p class="text-[11px] text-slate-500 mt-1 leading-relaxed">Set milestones around your scope, inputs, and approvals.</p>
          </div>
        </div>

        <!-- Main Footer 4-Column Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-200">

          <!-- Brand & Mission (Span 4) -->
          <div class="lg:col-span-4">
            <a routerLink="/" class="inline-flex items-center gap-3 mb-3 group">
              <div class="w-9 h-9 rounded-xl overflow-hidden shadow-xs ring-1 ring-slate-200 shrink-0">
                <img src="logo.png" alt="MetaVex Digital Logo" width="36" height="36" loading="lazy" decoding="async" class="w-full h-full object-cover">
              </div>
              <div class="flex items-center gap-1.5">
                <span class="font-heading font-black text-xl text-slate-900 tracking-wider">METAVEX</span>
                <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sunset-rose/10 text-sunset-rose border border-sunset-rose/30 uppercase font-bold">DIGITAL</span>
              </div>
            </a>

            <p class="text-sm text-slate-600 leading-relaxed mb-4 max-w-sm">
              MetaVex Digital is a startup helping Indian businesses connect their websites, marketing, and day-to-day customer follow-ups.
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
              <li><a routerLink="/services" class="hover:text-sunset-rose transition-colors flex items-center gap-1.5"><span>›</span> Fast Mobile Websites & Stores</a></li>
              <li><a routerLink="/services" class="hover:text-sunset-rose transition-colors flex items-center gap-1.5"><span>›</span> Facebook & Instagram Ads</a></li>
              <li><a routerLink="/services" class="hover:text-sunset-rose transition-colors flex items-center gap-1.5"><span>›</span> WhatsApp & Lead Automation</a></li>
              <li><a routerLink="/services" class="hover:text-sunset-rose transition-colors flex items-center gap-1.5"><span>›</span> Brand Reels & Social Content</a></li>
              <li><a routerLink="/services" class="hover:text-sunset-rose transition-colors flex items-center gap-1.5"><span>›</span> Cloud Systems & Operations</a></li>
            </ul>
          </div>

          <!-- Explore Navigation (Span 2) -->
          <div class="lg:col-span-2">
            <h5 class="text-xs font-mono uppercase tracking-widest text-slate-900 mb-4 font-bold">Explore</h5>
            <ul class="space-y-2.5 text-xs text-slate-600 font-medium">
              <li><a routerLink="/" class="hover:text-sunset-rose transition-colors">Home</a></li>
              <li><a routerLink="/services" class="hover:text-sunset-rose transition-colors">Services</a></li>
              <li><a routerLink="/comparison" class="hover:text-sunset-rose transition-colors">Customer Journey</a></li>
              <li><a routerLink="/calculator" class="hover:text-sunset-rose transition-colors">Growth Planner</a></li>
              <li><a routerLink="/case-studies" class="hover:text-sunset-rose transition-colors">Use Cases</a></li>
              <li><a routerLink="/process" class="hover:text-sunset-rose transition-colors">Our Process</a></li>
              <li><a routerLink="/contact" class="hover:text-sunset-rose transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <!-- Direct Contact (Span 3) - NO ADDRESS, STRICTLY PHONE & EMAIL -->
          <div class="lg:col-span-3">
            <h5 class="text-xs font-mono uppercase tracking-widest text-slate-900 mb-4 font-bold">Direct Contact</h5>

            <div class="space-y-3">
              <!-- Phone / WhatsApp Card -->
              <a
                href="tel:+919026231351"
                class="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-emerald-500/50 hover:shadow-md transition-all flex items-center gap-3 group">
                <div class="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-bold shrink-0 group-hover:scale-105 transition-transform">
                  📞
                </div>
                <div>
                  <span class="text-[10px] font-mono uppercase text-slate-500 font-semibold block">Call / WhatsApp</span>
                  <span class="text-xs sm:text-sm font-heading font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    +91 9026231351
                  </span>
                </div>
              </a>

              <!-- Email Card -->
              <a
                href="mailto:metavexdigital@gmail.com"
                class="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-sunset-rose/50 hover:shadow-md transition-all flex items-center gap-3 group">
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
                  href="https://wa.me/919026231351?text=Hello%20MetaVex%20Team%2C%20I%20am%20interested%20in%20your%20services."
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
          <p>© {{ currentYear }} METAVEX DIGITAL. All Rights Reserved.</p>
          <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-slate-600">
            <a href="mailto:metavexdigital@gmail.com?subject=Privacy%20query" class="hover:text-slate-900">Privacy Questions</a>
            <span>•</span>
            <a routerLink="/contact" class="hover:text-slate-900">Discuss Project Terms</a>
            <span>•</span>
            <a href="mailto:metavexdigital@gmail.com" class="hover:text-slate-900">Contact Support</a>
          </div>
        </div>

      </div>

    </footer>
  `
})
export class FooterComponent {
  public readonly currentYear = new Date().getFullYear();

}
