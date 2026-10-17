import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-services-bento',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="services" class="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      <!-- Ambient Glows - Light Cyber Sunset -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-sunset-rose/5 rounded-full blur-[140px] pointer-events-none"></div>

      <!-- Section Title Header -->
      <div class="text-center max-w-3xl mx-auto mb-20">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sunset-rose/10 border border-sunset-rose/25 text-sunset-rose text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <span class="w-1.5 h-1.5 rounded-full bg-sunset-rose"></span>
          How We Help Your Business
        </div>
        <h2 class="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">
          5 Core Growth Services Built for <br class="hidden sm:inline" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan">
            Real Profit, Speed & Scale
          </span>
        </h2>
        <p class="text-slate-600 text-base sm:text-lg leading-relaxed">
          No empty jargon or tech buzzwords. Here is exactly how our services solve your everyday business problems, save your team hours of manual work, and bring you paying customers.
        </p>
      </div>

      <!-- Asymmetrical Bento Grid - Luxury Light -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">

        <!-- CARD 1: High-Performance Web & App Development (Span 7) -->
        <div class="lg:col-span-7 rounded-3xl bg-white/85 border border-slate-200/90 hover:border-sunset-rose/40 transition-all duration-300 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden group shadow-[0_10px_30px_rgba(15,23,42,0.04)] hover:shadow-xl">
          
          <div class="absolute -top-24 -right-24 w-64 h-64 bg-sunset-rose/10 rounded-full blur-3xl pointer-events-none"></div>

          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-sunset-rose/10 border border-sunset-rose/25 text-sunset-rose flex items-center justify-center font-bold text-lg shadow-sm">
                &lt;/&gt;
              </div>
              <div>
                <span class="text-[11px] font-mono text-sunset-rose uppercase tracking-wider font-bold">Service 01</span>
                <h3 class="font-heading text-xl font-bold text-slate-900">Fast Websites & Mobile Web Apps</h3>
              </div>
            </div>
            <span class="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-mono font-bold text-emerald-800">
              Conversions First
            </span>
          </div>

          <!-- Direct Benefit Highlight -->
          <div class="mb-5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span class="text-[11px] font-mono font-bold text-slate-800 uppercase block mb-1">💡 How This Benefits You:</span>
            <p class="text-xs text-slate-600 leading-relaxed">
              In India, 85%+ customers browse on mobile phones. If a website takes 4 seconds to load, 60% of people bounce away before seeing your offer. We build custom websites that load in &lt; 1.2 seconds, showcase your services clearly, and have 1-tap WhatsApp inquiry buttons and Razorpay/UPI checkout.
            </p>
          </div>

          <!-- Feature Cards Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div class="p-3 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
              <span class="text-base">⚡</span>
              <p class="text-xs font-bold text-slate-900 mt-1">&lt; 1.2s Load Speed</p>
              <p class="text-[10px] text-slate-500 mt-0.5">Stops visitor drop-off</p>
            </div>
            <div class="p-3 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
              <span class="text-base">📱</span>
              <p class="text-xs font-bold text-slate-900 mt-1">1-Tap WhatsApp Lead</p>
              <p class="text-[10px] text-slate-500 mt-0.5">Direct chat from mobile</p>
            </div>
            <div class="p-3 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
              <span class="text-base">💳</span>
              <p class="text-xs font-bold text-slate-900 mt-1">Razorpay & UPI Ready</p>
              <p class="text-[10px] text-slate-500 mt-0.5">Smooth Indian payments</p>
            </div>
          </div>

          <!-- Quick Metrics Bar -->
          <div class="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200 text-center">
            <div>
              <p class="text-xl font-heading font-extrabold text-slate-900">100%</p>
              <p class="text-[11px] font-mono text-slate-500 uppercase font-semibold">Mobile Friendly</p>
            </div>
            <div>
              <p class="text-xl font-heading font-extrabold text-sky-600">&lt; 1.2s</p>
              <p class="text-[11px] font-mono text-slate-500 uppercase font-semibold">Average Load Time</p>
            </div>
            <div>
              <p class="text-xl font-heading font-extrabold text-sunset-rose">+40%</p>
              <p class="text-[11px] font-mono text-slate-500 uppercase font-semibold">Conversion Uplift</p>
            </div>
          </div>

        </div>

        <!-- CARD 2: Meta Ads & High-ROAS Performance Marketing (Span 5) -->
        <div class="lg:col-span-5 rounded-3xl bg-white/85 border border-slate-200/90 hover:border-sunset-rose/40 transition-all duration-300 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden group shadow-[0_10px_30px_rgba(15,23,42,0.04)] hover:shadow-xl flex flex-col justify-between">
          
          <div class="absolute -top-24 -left-24 w-64 h-64 bg-sunset-rose/10 rounded-full blur-3xl pointer-events-none"></div>

          <div>
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-sunset-rose/10 border border-sunset-rose/25 text-sunset-rose flex items-center justify-center font-bold text-lg shadow-sm">
                  🎯
                </div>
                <div>
                  <span class="text-[11px] font-mono text-sunset-rose uppercase tracking-wider font-bold">Service 02</span>
                  <h3 class="font-heading text-xl font-bold text-slate-900">Meta Ads (FB & Instagram)</h3>
                </div>
              </div>
            </div>

            <!-- Direct Benefit Highlight -->
            <div class="mb-5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span class="text-[11px] font-mono font-bold text-slate-800 uppercase block mb-1">💡 How This Benefits You:</span>
              <p class="text-xs text-slate-600 leading-relaxed">
                Stop burning money on random post boosts that only bring fake likes. We build targeted ad funnels that find actual buyers ready to purchase or book your service, tracking every single rupee to real business revenue.
              </p>
            </div>

            <!-- Verified ROAS Gauge Card -->
            <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-sm mb-6">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-mono text-slate-600 font-semibold">Client Verified ROAS</span>
                <span class="px-2 py-0.5 rounded bg-sunset-rose/15 text-sunset-rose text-[11px] font-mono font-bold">Real Campaigns</span>
              </div>
              
              <div class="flex items-baseline gap-2 mb-3">
                <span class="text-4xl sm:text-5xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan">
                  3.8x - 5.2x
                </span>
                <span class="text-xs font-mono text-slate-700 font-bold">Return on Ad Spend</span>
              </div>

              <!-- Animated Multi-Segment Bar -->
              <div class="w-full h-3 rounded-full bg-slate-200 overflow-hidden flex shadow-inner">
                <div class="h-full bg-electric-violet w-[30%]" title="Cold Buyer Targeting"></div>
                <div class="h-full bg-cyber-cyan w-[35%]" title="High-Intent Inquiries"></div>
                <div class="h-full bg-sunset-rose w-[35%]" title="WhatsApp Retargeting"></div>
              </div>

              <div class="flex justify-between items-center text-[10px] font-mono text-slate-500 mt-2 font-medium">
                <span>Audience Targeting</span>
                <span>Offer Testing</span>
                <span class="text-sunset-rose font-bold">Direct Conversion</span>
              </div>
            </div>
          </div>

          <!-- Key Deliverables List -->
          <div class="space-y-2 pt-2 border-t border-slate-200">
            <div class="flex items-center gap-2 text-xs text-slate-700 font-medium">
              <span class="text-sunset-rose font-bold">✓</span> Meta Conversions API (CAPI) for 100% accurate tracking
            </div>
            <div class="flex items-center gap-2 text-xs text-slate-700 font-medium">
              <span class="text-sunset-rose font-bold">✓</span> Direct WhatsApp Lead Ads with instant buyer qualification
            </div>
          </div>

        </div>

        <!-- CARD 3: End-to-End Business Automation (Span 8) -->
        <div class="lg:col-span-8 rounded-3xl bg-white/85 border border-slate-200/90 hover:border-cyber-cyan/40 transition-all duration-300 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden group shadow-[0_10px_30px_rgba(15,23,42,0.04)] hover:shadow-xl">
          
          <div class="absolute -bottom-24 -right-24 w-80 h-80 bg-cyber-cyan/10 rounded-full blur-3xl pointer-events-none"></div>

          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center font-bold text-lg shadow-sm">
                🤖
              </div>
              <div>
                <span class="text-[11px] font-mono text-sky-600 uppercase tracking-wider font-bold">Service 03 — Biggest Time Saver</span>
                <h3 class="font-heading text-xl font-bold text-slate-900">WhatsApp & Business Workflow Automation</h3>
              </div>
            </div>
            <span class="px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-[11px] font-mono text-sky-800 font-bold">
              24/7 Lead Capture
            </span>
          </div>

          <!-- Direct Benefit Highlight -->
          <div class="mb-5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span class="text-[11px] font-mono font-bold text-slate-800 uppercase block mb-1">💡 How This Benefits You:</span>
            <p class="text-xs text-slate-600 leading-relaxed">
              When an inquiry comes at 9 PM or on Sunday, you shouldn't lose it. Our automated WhatsApp system responds within 15 seconds, sends your PDF catalog or price list, collects their name and requirement, and alerts your sales team immediately.
            </p>
          </div>

          <!-- Interactive Live Animated Automation Flowchart -->
          <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 relative overflow-hidden">
            
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 relative z-10">
              
              <!-- Node 1 -->
              <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-sky-400 transition-colors text-center">
                <span class="inline-block p-2 rounded-lg bg-sky-50 text-sky-600 mb-2">📥</span>
                <h5 class="font-heading text-xs font-bold text-slate-900">Lead Inquires</h5>
                <p class="text-[10px] font-mono text-slate-500 mt-1">From Ad or Website</p>
                <span class="mt-2 inline-block text-[9px] font-mono px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 font-semibold">Instant Alert</span>
              </div>

              <!-- Node 2 -->
              <div class="p-3.5 rounded-xl bg-white border border-sunset-rose/30 shadow-sm hover:border-sunset-rose transition-colors text-center relative">
                <span class="inline-block p-2 rounded-lg bg-rose-50 text-sunset-rose mb-2">💬</span>
                <h5 class="font-heading text-xs font-bold text-slate-900">WhatsApp Bot</h5>
                <p class="text-[10px] font-mono text-slate-500 mt-1">Sends Catalog & Info</p>
                <span class="mt-2 inline-block text-[9px] font-mono px-1.5 py-0.5 rounded bg-rose-100 text-sunset-rose font-semibold">&lt; 15s Reply</span>
              </div>

              <!-- Node 3 -->
              <div class="p-3.5 rounded-xl bg-white border border-purple-200 shadow-sm hover:border-electric-violet transition-colors text-center">
                <span class="inline-block p-2 rounded-lg bg-purple-50 text-electric-violet mb-2">📊</span>
                <h5 class="font-heading text-xs font-bold text-slate-900">Google Sheets Sync</h5>
                <p class="text-[10px] font-mono text-slate-500 mt-1">Zoho / Sheets CRM</p>
                <span class="mt-2 inline-block text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-100 text-electric-violet font-semibold">Zero Manual Entry</span>
              </div>

              <!-- Node 4 -->
              <div class="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-slate-400 transition-colors text-center">
                <span class="inline-block p-2 rounded-lg bg-slate-100 text-slate-700 mb-2">🔔</span>
                <h5 class="font-heading text-xs font-bold text-slate-900">Follow-up Reminder</h5>
                <p class="text-[10px] font-mono text-slate-500 mt-1">Auto SMS & WhatsApp</p>
                <span class="mt-2 inline-block text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">High Conversion</span>
              </div>

            </div>

            <!-- Pulsing Data Stream Connecting Bar -->
            <div class="mt-4 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-600 font-medium">
              <span class="flex items-center gap-1.5 text-sunset-rose font-bold">
                <span class="w-1.5 h-1.5 rounded-full bg-sunset-rose animate-ping"></span>
                Official WhatsApp Business API & Webhooks
              </span>
              <span>Saves 25+ Hours Every Week</span>
            </div>

          </div>

        </div>

        <!-- CARD 4: Social Media Dominance & Brand Storytelling (Span 4) -->
        <div class="lg:col-span-4 rounded-3xl bg-white/85 border border-slate-200/90 hover:border-electric-violet/40 transition-all duration-300 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden group shadow-[0_10px_30px_rgba(15,23,42,0.04)] hover:shadow-xl flex flex-col justify-between">
          
          <div class="absolute -top-24 -right-24 w-64 h-64 bg-electric-violet/10 rounded-full blur-3xl pointer-events-none"></div>

          <div>
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 text-electric-violet flex items-center justify-center font-bold text-lg shadow-sm">
                  🔥
                </div>
                <div>
                  <span class="text-[11px] font-mono text-electric-violet uppercase tracking-wider font-bold">Service 04</span>
                  <h3 class="font-heading text-lg font-bold text-slate-900">Brand Social Media & Reels</h3>
                </div>
              </div>
            </div>

            <!-- Direct Benefit Highlight -->
            <div class="mb-5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span class="text-[11px] font-mono font-bold text-slate-800 uppercase block mb-1">💡 How This Benefits You:</span>
              <p class="text-xs text-slate-600 leading-relaxed">
                Indian buyers trust brands that have active, authentic social media. We create high-engagement Reels, customer showcase videos, and carousel posts that prove your credibility and make people choose you over cheaper competitors.
              </p>
            </div>

            <!-- Creative Mockup Card Stack -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-4">
              <div class="flex items-center justify-between text-xs font-mono text-slate-600 mb-2 font-semibold">
                <span>Engagement Focus</span>
                <span class="text-sunset-rose font-bold">High Trust & Organic Reach</span>
              </div>
              <div class="w-full bg-slate-200 rounded-full h-2 overflow-hidden mb-2">
                <div class="bg-gradient-to-r from-sunset-rose to-electric-violet h-full w-[85%] rounded-full"></div>
              </div>
              <p class="text-[11px] text-slate-500">Short-form video hooks tailored for Indian audiences.</p>
            </div>
          </div>

          <div class="pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-mono text-slate-700 font-semibold">
            <span>Video Content</span>
            <span class="text-sky-600 font-bold">Reels + Carousels + Stories</span>
          </div>

        </div>

        <!-- CARD 5: Digital Consulting & Cloud ERP Transformation (Span 12 - Full Width Banner) -->
        <div class="lg:col-span-12 rounded-3xl bg-gradient-to-r from-white via-slate-50 to-white border border-slate-200/90 hover:border-sunset-rose/30 transition-all duration-300 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden group shadow-[0_10px_30px_rgba(15,23,42,0.04)] hover:shadow-xl">
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div class="max-w-2xl">
              <div class="flex items-center gap-2 mb-2">
                <span class="px-2.5 py-0.5 rounded-full bg-sunset-rose/10 border border-sunset-rose/25 text-sunset-rose text-[10px] font-mono font-bold uppercase">Service 05</span>
                <span class="text-slate-500 text-xs font-mono font-semibold">Operations Modernization</span>
              </div>
              <h4 class="font-heading text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                Business Digitalization & Cloud System Setup
              </h4>
              <p class="text-slate-600 text-xs sm:text-sm leading-relaxed mb-3">
                <strong class="text-slate-800">💡 How This Benefits You:</strong> If you are still keeping track of customer inquiries, orders, and pending payments on paper diaries or disorganized spreadsheets, things get lost. We set up simple cloud dashboards (accessible on your phone) so you can track your business performance from anywhere.
              </p>
              <div class="flex flex-wrap gap-2 text-[11px] font-mono text-slate-600">
                <span class="px-2 py-1 rounded-md bg-white border border-slate-200">✓ Centralized Customer Data</span>
                <span class="px-2 py-1 rounded-md bg-white border border-slate-200">✓ Invoicing & Payment Tracking</span>
                <span class="px-2 py-1 rounded-md bg-white border border-slate-200">✓ Staff Mobile Access</span>
              </div>
            </div>

            <div class="flex flex-wrap items-center gap-4">
              <div class="px-5 py-3 rounded-2xl bg-white border border-slate-200 text-center shadow-sm">
                <p class="font-heading font-extrabold text-lg text-slate-900">0%</p>
                <p class="text-[10px] font-mono text-slate-500 uppercase font-semibold">Data Loss</p>
              </div>
              <div class="px-5 py-3 rounded-2xl bg-white border border-slate-200 text-center shadow-sm">
                <p class="font-heading font-extrabold text-sunset-rose">100%</p>
                <p class="text-[10px] font-mono text-slate-500 uppercase font-semibold">Mobile Accessible</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>
  `
})
export class ServicesBentoComponent {
  public sound = inject(SoundService);
}
