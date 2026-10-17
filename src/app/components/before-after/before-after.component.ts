import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-before-after',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="gap" class="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden scroll-mt-20">
      
      <!-- Ambient Glow Highlights -->
      <div class="absolute top-1/3 left-1/4 w-96 h-96 bg-sunset-rose/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-[140px] pointer-events-none"></div>

      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sunset-rose/10 border border-sunset-rose/25 text-sunset-rose text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <span class="w-1.5 h-1.5 rounded-full bg-sunset-rose animate-ping"></span>
          Before vs After Comparison
        </div>
        <h2 class="font-heading text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 sm:mb-6">
          The Cost of <span class="text-slate-400 line-through decoration-red-500/80 decoration-3 sm:decoration-4">Manual Chaos</span> vs <br class="hidden sm:inline" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan">
            How MetaVex Scales Your Business
          </span>
        </h2>
        <p class="text-slate-600 text-sm sm:text-lg leading-relaxed">
          See the exact transformation: from missed leads and wasted ad spend to an automated, high-converting digital engine.
        </p>
      </div>

      <!-- Interactive View Mode Controller -->
      <div class="flex justify-center mb-8 sm:mb-12">
        <div class="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200/90 shadow-inner max-w-md w-full sm:w-auto">
          
          <button 
            type="button" 
            (click)="setView('compare')"
            class="flex-1 sm:flex-initial py-2.5 px-4 rounded-xl text-xs font-heading font-bold transition-all flex items-center justify-center gap-2"
            [class.bg-white]="currentView() === 'compare'"
            [class.text-slate-900]="currentView() === 'compare'"
            [class.shadow-md]="currentView() === 'compare'"
            [class.border]="currentView() === 'compare'"
            [class.border-slate-200]="currentView() === 'compare'"
            [class.text-slate-500]="currentView() !== 'compare'">
            <span>⚖️ Compare Both</span>
          </button>

          <button 
            type="button" 
            (click)="setView('metavex')"
            class="flex-1 sm:flex-initial py-2.5 px-4 rounded-xl text-xs font-heading font-bold transition-all flex items-center justify-center gap-2"
            [class.bg-white]="currentView() === 'metavex'"
            [class.text-emerald-700]="currentView() === 'metavex'"
            [class.shadow-md]="currentView() === 'metavex'"
            [class.border]="currentView() === 'metavex'"
            [class.border-slate-200]="currentView() === 'metavex'"
            [class.text-slate-500]="currentView() !== 'metavex'">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>With MetaVex</span>
          </button>

          <button 
            type="button" 
            (click)="setView('traditional')"
            class="flex-1 sm:flex-initial py-2.5 px-4 rounded-xl text-xs font-heading font-bold transition-all flex items-center justify-center gap-2"
            [class.bg-white]="currentView() === 'traditional'"
            [class.text-red-700]="currentView() === 'traditional'"
            [class.shadow-md]="currentView() === 'traditional'"
            [class.border]="currentView() === 'traditional'"
            [class.border-slate-200]="currentView() === 'traditional'"
            [class.text-slate-500]="currentView() !== 'traditional'">
            <span class="w-2 h-2 rounded-full bg-red-500"></span>
            <span>Traditional Setup</span>
          </button>

        </div>
      </div>

      <!-- ======================================================== -->
      <!-- COMPARISON CONTAINER (Zero Overlapping, 100% Responsive)  -->
      <!-- ======================================================== -->
      <div class="relative">

        <!-- Grid Container: 1 column on mobile, 2 columns on lg when in 'compare' mode -->
        <div 
          class="grid gap-6 sm:gap-8 items-stretch"
          [class.grid-cols-1]="currentView() !== 'compare'"
          [class.lg:grid-cols-2]="currentView() === 'compare'">

          <!-- ============================================== -->
          <!-- CARD A: TRADITIONAL SETUP (The Costly Way)     -->
          <!-- ============================================== -->
          @if (currentView() === 'compare' || currentView() === 'traditional') {
            <div class="rounded-3xl bg-gradient-to-br from-red-50/70 via-slate-50/40 to-orange-50/40 p-5 sm:p-8 border border-red-200 shadow-[0_10px_30px_rgba(239,68,68,0.05)] flex flex-col justify-between relative overflow-hidden transition-all duration-300">
              
              <!-- Subtle Background Pattern -->
              <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

              <div>
                <!-- Top Badge -->
                <div class="flex items-center justify-between mb-6 pb-4 border-b border-red-200/80">
                  <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 border border-red-200 text-red-700 font-mono text-xs font-bold tracking-wide">
                    <span class="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                    TRADITIONAL SETUP (CHAOTIC & MANUAL)
                  </span>
                  <span class="text-xs font-mono text-red-600 font-bold hidden sm:inline">The Cost of Inefficiency</span>
                </div>

                <!-- 4 Real Pain Points for Indian Businesses -->
                <div class="space-y-4 mb-6">
                  
                  <div class="p-4 rounded-2xl bg-white/90 border border-red-100 shadow-xs">
                    <div class="flex items-center gap-2.5 mb-1.5">
                      <span class="text-base">⏳</span>
                      <h4 class="font-heading font-bold text-slate-900 text-sm sm:text-base">Slow, Outdated Websites</h4>
                    </div>
                    <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Old WordPress or Wix sites taking 5+ seconds to open on Indian mobile networks. Over 50% of visitors leave before seeing your products or services.
                    </p>
                  </div>

                  <div class="p-4 rounded-2xl bg-white/90 border border-red-100 shadow-xs">
                    <div class="flex items-center gap-2.5 mb-1.5">
                      <span class="text-base">📉</span>
                      <h4 class="font-heading font-bold text-slate-900 text-sm sm:text-base">Blindly Boosting Instagram Posts</h4>
                    </div>
                    <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Spending ₹15,000–₹50,000/month on boosted posts with zero conversion API (CAPI) tracking or strategy. Random likes and comments, but zero buying customers.
                    </p>
                  </div>

                  <div class="p-4 rounded-2xl bg-white/90 border border-red-100 shadow-xs">
                    <div class="flex items-center gap-2.5 mb-1.5">
                      <span class="text-base">🧊</span>
                      <h4 class="font-heading font-bold text-slate-900 text-sm sm:text-base">Delayed Replies & Lost Inquiries</h4>
                    </div>
                    <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Inquiries sit in WhatsApp or direct messages for 4–24 hours. By the time someone replies manually, the customer has already purchased from a competitor.
                    </p>
                  </div>

                  <div class="p-4 rounded-2xl bg-white/90 border border-red-100 shadow-xs">
                    <div class="flex items-center gap-2.5 mb-1.5">
                      <span class="text-base">📂</span>
                      <h4 class="font-heading font-bold text-slate-900 text-sm sm:text-base">Manual Excel & Paper Registers</h4>
                    </div>
                    <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Copying phone numbers by hand, forgotten follow-up calls, lost customer history, and wasting 25+ hours each week on routine admin busywork.
                    </p>
                  </div>

                </div>
              </div>

              <!-- Traditional Setup Bottom Outcomes -->
              <div class="pt-4 border-t border-red-200/80">
                <div class="grid grid-cols-3 gap-2 text-center">
                  <div class="p-2 rounded-xl bg-red-100/60 border border-red-200/60">
                    <span class="text-[9px] sm:text-[10px] font-mono uppercase text-red-700 font-bold block">Response Time</span>
                    <p class="text-xs sm:text-sm font-mono font-black text-red-900 mt-0.5">4 - 24 Hours</p>
                  </div>
                  <div class="p-2 rounded-xl bg-red-100/60 border border-red-200/60">
                    <span class="text-[9px] sm:text-[10px] font-mono uppercase text-red-700 font-bold block">Average ROAS</span>
                    <p class="text-xs sm:text-sm font-mono font-black text-red-900 mt-0.5">1.2x (Burning)</p>
                  </div>
                  <div class="p-2 rounded-xl bg-red-100/60 border border-red-200/60">
                    <span class="text-[9px] sm:text-[10px] font-mono uppercase text-red-700 font-bold block">Lead Loss</span>
                    <p class="text-xs sm:text-sm font-mono font-black text-red-900 mt-0.5">40%+ Lost</p>
                  </div>
                </div>
              </div>

            </div>
          }

          <!-- ============================================== -->
          <!-- CARD B: METAVEX DIGITAL (The Profitable Engine) -->
          <!-- ============================================== -->
          @if (currentView() === 'compare' || currentView() === 'metavex') {
            <div class="rounded-3xl bg-gradient-to-br from-white via-slate-50/60 to-emerald-50/40 p-5 sm:p-8 border-2 border-sunset-rose/30 shadow-[0_15px_40px_rgba(255,46,99,0.06)] flex flex-col justify-between relative overflow-hidden transition-all duration-300">
              
              <!-- Radiant Corner Glows -->
              <div class="absolute -top-24 -right-24 w-64 h-64 bg-sunset-rose/10 rounded-full blur-3xl pointer-events-none"></div>
              <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-cyber-cyan/10 rounded-full blur-3xl pointer-events-none"></div>

              <div>
                <!-- Top Badge -->
                <div class="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
                  <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sunset-rose/10 border border-sunset-rose/30 text-sunset-rose font-mono text-xs font-bold tracking-wide shadow-xs">
                    <span class="w-2 h-2 rounded-full bg-sunset-rose animate-pulse"></span>
                    WITH METAVEX DIGITAL (AUTOMATED & PROFITABLE)
                  </span>
                  <span class="text-xs font-mono text-emerald-700 font-bold hidden sm:inline">The Scalable Standard</span>
                </div>

                <!-- 4 Real Solutions with Direct Fayda -->
                <div class="space-y-4 mb-6">
                  
                  <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-sunset-rose/30 transition-all">
                    <div class="flex items-center gap-2.5 mb-1.5">
                      <span class="text-base">⚡</span>
                      <h4 class="font-heading font-bold text-slate-900 text-sm sm:text-base">Lightning-Fast Web & Mobile Store</h4>
                    </div>
                    <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Custom modern architecture with <span class="text-sky-600 font-mono font-bold">&lt; 1.2s load time</span>, mobile-first design, direct 1-tap WhatsApp chat triggers, and instant Razorpay/UPI checkout.
                    </p>
                  </div>

                  <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-sunset-rose/30 transition-all">
                    <div class="flex items-center gap-2.5 mb-1.5">
                      <span class="text-base">📈</span>
                      <h4 class="font-heading font-bold text-slate-900 text-sm sm:text-base">High-ROAS Meta Ads (FB & Insta)</h4>
                    </div>
                    <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Server-side Meta Conversions API (CAPI), high-intent buyer targeting, and tested creative angles giving <span class="text-sunset-rose font-mono font-bold">3.5x to 5.5x verified ROAS</span>.
                    </p>
                  </div>

                  <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-sunset-rose/30 transition-all">
                    <div class="flex items-center gap-2.5 mb-1.5">
                      <span class="text-base">🤖</span>
                      <h4 class="font-heading font-bold text-slate-900 text-sm sm:text-base">Instant WhatsApp Lead Capture (24/7)</h4>
                    </div>
                    <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Inquiries automatically receive your PDF catalog, pricing, and answers in <span class="text-electric-violet font-mono font-bold">&lt; 15 seconds</span> on WhatsApp, capturing buyers 24/7.
                    </p>
                  </div>

                  <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-sunset-rose/30 transition-all">
                    <div class="flex items-center gap-2.5 mb-1.5">
                      <span class="text-base">💼</span>
                      <h4 class="font-heading font-bold text-slate-900 text-sm sm:text-base">Automated CRM & Sync Workflows</h4>
                    </div>
                    <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      All inquiries instantly synced to Google Sheets or CRM with automated follow-up reminders, eliminating manual entry and saving <span class="text-slate-900 font-mono font-bold">25+ hours / week</span>.
                    </p>
                  </div>

                </div>
              </div>

              <!-- MetaVex Bottom Outcomes -->
              <div class="pt-4 border-t border-slate-200">
                <div class="grid grid-cols-3 gap-2 text-center">
                  <div class="p-2 rounded-xl bg-sky-50 border border-sky-200">
                    <span class="text-[9px] sm:text-[10px] font-mono uppercase text-sky-700 font-bold block">Response Time</span>
                    <p class="text-xs sm:text-sm font-mono font-black text-sky-600 mt-0.5">&lt; 30 Seconds</p>
                  </div>
                  <div class="p-2 rounded-xl bg-rose-50 border border-rose-200">
                    <span class="text-[9px] sm:text-[10px] font-mono uppercase text-sunset-rose font-bold block">Average ROAS</span>
                    <p class="text-xs sm:text-sm font-mono font-black text-sunset-rose mt-0.5">3.8x - 5.2x</p>
                  </div>
                  <div class="p-2 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span class="text-[9px] sm:text-[10px] font-mono uppercase text-emerald-700 font-bold block">Lead Loss</span>
                    <p class="text-xs sm:text-sm font-mono font-black text-emerald-800 mt-0.5">&lt; 2% (Tracked)</p>
                  </div>
                </div>
              </div>

            </div>
          }

        </div>

      </div>

      <!-- ============================================== -->
      <!-- DIRECT VALUE COMPARISON METRICS TICKER         -->
      <!-- ============================================== -->
      <div class="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        
        <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
          <p class="text-[10px] sm:text-xs font-mono uppercase text-slate-500 font-bold mb-1">Speed to Response</p>
          <div class="flex items-center justify-center gap-1.5 sm:gap-2">
            <span class="text-xs sm:text-sm font-mono text-red-500 line-through">4-24 hrs</span>
            <span class="text-xs sm:text-sm text-slate-400">➔</span>
            <span class="text-base sm:text-xl font-heading font-black text-sky-600">&lt; 30 sec</span>
          </div>
        </div>

        <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
          <p class="text-[10px] sm:text-xs font-mono uppercase text-slate-500 font-bold mb-1">Meta Ads ROAS</p>
          <div class="flex items-center justify-center gap-1.5 sm:gap-2">
            <span class="text-xs sm:text-sm font-mono text-red-500 line-through">1.2x</span>
            <span class="text-xs sm:text-sm text-slate-400">➔</span>
            <span class="text-base sm:text-xl font-heading font-black text-sunset-rose">3.8x - 5.2x</span>
          </div>
        </div>

        <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
          <p class="text-[10px] sm:text-xs font-mono uppercase text-slate-500 font-bold mb-1">Weekly Admin Work</p>
          <div class="flex items-center justify-center gap-1.5 sm:gap-2">
            <span class="text-xs sm:text-sm font-mono text-red-500 line-through">25+ hrs</span>
            <span class="text-xs sm:text-sm text-slate-400">➔</span>
            <span class="text-base sm:text-xl font-heading font-black text-slate-900">Automated</span>
          </div>
        </div>

        <div class="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
          <p class="text-[10px] sm:text-xs font-mono uppercase text-slate-500 font-bold mb-1">Inquiry Conversion</p>
          <div class="flex items-center justify-center gap-1.5 sm:gap-2">
            <span class="text-xs sm:text-sm font-mono text-red-500 line-through">~1.5%</span>
            <span class="text-xs sm:text-sm text-slate-400">➔</span>
            <span class="text-base sm:text-xl font-heading font-black text-emerald-600">5.8%+</span>
          </div>
        </div>

      </div>

      <!-- Quick Summary Footnote -->
      <div class="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-mono text-slate-600 font-medium">
        <span class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-sunset-rose"></span>
          Avg. 312% Growth in Pipeline Velocity
        </span>
        <span class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-electric-violet"></span>
          Full Migration Deployed in 30 Days
        </span>
        <span class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-sky-600"></span>
          Zero Operational Downtime
        </span>
      </div>

    </section>
  `
})
export class BeforeAfterComponent {
  public sound = inject(SoundService);
  public currentView = signal<'compare' | 'metavex' | 'traditional'>('compare');

  public setView(view: 'compare' | 'metavex' | 'traditional') {
    this.sound.playClick();
    this.currentView.set(view);
  }
}
