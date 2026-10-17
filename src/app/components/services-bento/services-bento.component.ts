import { Component } from '@angular/core';

@Component({
  selector: 'app-services-bento',
  standalone: true,
  imports: [],
  template: `
    <section id="services" class="relative py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16">

      <!-- Ambient Glows - Light Cyber Sunset -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-sunset-rose/5 rounded-full blur-[140px] pointer-events-none"></div>

      <!-- Section Title Header -->
      <div class="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sunset-rose/10 border border-sunset-rose/25 text-sunset-rose text-xs font-mono font-bold uppercase tracking-wider mb-3">
          <span class="w-1.5 h-1.5 rounded-full bg-sunset-rose"></span>
          How We Help Your Business
        </div>
        <h2 class="font-heading text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-3 sm:mb-4">
          Start With the Problem. <br class="hidden sm:inline" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan">
            Build What Solves It.
          </span>
        </h2>
        <p class="text-slate-600 text-base sm:text-lg leading-relaxed">
          Your website, ads, and follow-ups should support the same goal: helping interested people take the next step. Choose the service that addresses your biggest gap.
        </p>
      </div>

      <!-- Asymmetrical Bento Grid - Luxury Light -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">

        <!-- CARD 1: High-Performance Web & App Development (Span 7) -->
        <div class="lg:col-span-7 rounded-3xl bg-white/85 border border-slate-200/90 hover:border-sunset-rose/40 transition-all duration-300 p-4 sm:p-8 backdrop-blur-xl relative overflow-hidden group shadow-[0_10px_30px_rgba(15,23,42,0.04)] hover:shadow-xl">

          <div class="absolute -top-24 -right-24 w-64 h-64 bg-sunset-rose/10 rounded-full blur-3xl pointer-events-none"></div>

          <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div class="flex items-center gap-2.5 sm:gap-3">
              <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sunset-rose/10 border border-sunset-rose/25 text-sunset-rose flex items-center justify-center font-bold text-base sm:text-lg shadow-sm shrink-0">
                &lt;/&gt;
              </div>
              <div>
                <span class="text-[10px] sm:text-[11px] font-mono text-sunset-rose uppercase tracking-wider font-bold">Service 01</span>
                <h3 class="font-heading text-lg sm:text-xl font-bold text-slate-900">Websites That Explain Your Offer</h3>
              </div>
            </div>
            <span class="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] sm:text-[11px] font-mono font-bold text-emerald-800">
              Clear Next Steps
            </span>
          </div>

          <!-- Direct Benefit Highlight -->
          <div class="mb-5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span class="text-[11px] font-mono font-bold text-slate-800 uppercase block mb-1">How We Help:</span>
            <p class="text-sm text-slate-600 leading-relaxed">
              If visitors struggle to understand your offer or contact you, a new design alone is not enough. We build mobile-friendly pages with clear information, straightforward inquiries, and payment options where needed.
            </p>
          </div>

          <!-- Feature Cards Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div class="p-3 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
              <span class="text-base">⚡</span>
              <p class="text-xs font-bold text-slate-900 mt-1">Speed-Focused Build</p>
              <p class="text-[10px] text-slate-500 mt-0.5">Easier mobile browsing</p>
            </div>
            <div class="p-3 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
              <span class="text-base">📱</span>
              <p class="text-xs font-bold text-slate-900 mt-1">WhatsApp Inquiry</p>
              <p class="text-[10px] text-slate-500 mt-0.5">Direct chat from mobile</p>
            </div>
            <div class="p-3 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
              <span class="text-base">💳</span>
              <p class="text-xs font-bold text-slate-900 mt-1">Payment Integration</p>
              <p class="text-[10px] text-slate-500 mt-0.5">When your project needs it</p>
            </div>
          </div>

          <!-- Quick Metrics Bar -->
          <div class="grid grid-cols-3 gap-2 pt-3 sm:pt-4 border-t border-slate-200 text-center">
            <div>
              <p class="text-lg sm:text-xl font-heading font-extrabold text-slate-900">Mobile</p>
              <p class="text-[9px] sm:text-[11px] font-mono text-slate-500 uppercase font-semibold">Friendly Layout</p>
            </div>
            <div>
              <p class="text-lg sm:text-xl font-heading font-extrabold text-sky-600">Clear</p>
              <p class="text-[9px] sm:text-[11px] font-mono text-slate-500 uppercase font-semibold">Service Pages</p>
            </div>
            <div>
              <p class="text-lg sm:text-xl font-heading font-extrabold text-sunset-rose">Simple</p>
              <p class="text-[9px] sm:text-[11px] font-mono text-slate-500 uppercase font-semibold">Inquiry Flow</p>
            </div>
          </div>

        </div>

        <!-- CARD 2: Meta ads planning and measurement -->
        <div class="lg:col-span-5 rounded-3xl bg-white/85 border border-slate-200/90 hover:border-sunset-rose/40 transition-all duration-300 p-4 sm:p-8 backdrop-blur-xl relative overflow-hidden group shadow-[0_10px_30px_rgba(15,23,42,0.04)] hover:shadow-xl flex flex-col justify-between">

          <div class="absolute -top-24 -left-24 w-64 h-64 bg-sunset-rose/10 rounded-full blur-3xl pointer-events-none"></div>

          <div>
            <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div class="flex items-center gap-2.5 sm:gap-3">
                <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sunset-rose/10 border border-sunset-rose/25 text-sunset-rose flex items-center justify-center font-bold text-base sm:text-lg shadow-sm shrink-0">
                  🎯
                </div>
                <div>
                  <span class="text-[10px] sm:text-[11px] font-mono text-sunset-rose uppercase tracking-wider font-bold">Service 02</span>
                  <h3 class="font-heading text-lg sm:text-xl font-bold text-slate-900">Meta Ads (FB & Instagram)</h3>
                </div>
              </div>
            </div>

            <!-- Direct Benefit Highlight -->
            <div class="mb-5 p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span class="text-[10px] sm:text-[11px] font-mono font-bold text-slate-800 uppercase block mb-1">How We Help:</span>
              <p class="text-sm text-slate-600 leading-relaxed">
                Ads need more than attention. We connect your offer, audience, and landing page, then test the message and review the available inquiry or sales data to guide the next decision.
              </p>
            </div>

            <!-- Campaign approach -->
            <div class="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-sm mb-5 sm:mb-6">
              <div class="flex flex-wrap gap-2 items-center justify-between mb-2">
                <span class="text-xs font-mono text-slate-600 font-semibold">Campaign Approach</span>
                <span class="px-2 py-0.5 rounded bg-sunset-rose/15 text-sunset-rose text-[10px] sm:text-[11px] font-mono font-bold">Test & Review</span>
              </div>

              <div class="flex items-baseline gap-2 mb-3 flex-wrap">
                <span class="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan">
                  Learn & Refine
                </span>
                <span class="text-[11px] sm:text-xs font-mono text-slate-700 font-bold">Goals set around your business</span>
              </div>

              <!-- Animated Multi-Segment Bar -->
              <div class="w-full h-3 rounded-full bg-slate-200 overflow-hidden flex shadow-inner">
                <div class="h-full bg-electric-violet w-[30%]" title="Audience planning"></div>
                <div class="h-full bg-cyber-cyan w-[35%]" title="Creative testing"></div>
                <div class="h-full bg-sunset-rose w-[35%]" title="Results review"></div>
              </div>

              <div class="flex flex-wrap gap-2 justify-between items-center text-[10px] font-mono text-slate-500 mt-2 font-medium">
                <span>Audience Targeting</span>
                <span>Offer Testing</span>
                <span class="text-sunset-rose font-bold">Track Inquiries</span>
              </div>
            </div>
          </div>

          <!-- Key Deliverables List -->
          <div class="space-y-2 pt-2 border-t border-slate-200">
            <div class="flex items-center gap-2 text-xs text-slate-700 font-medium">
              <span class="text-sunset-rose font-bold">✓</span> Conversion tracking matched to your setup
            </div>
            <div class="flex items-center gap-2 text-xs text-slate-700 font-medium">
              <span class="text-sunset-rose font-bold">✓</span> WhatsApp inquiry flows with useful lead questions
            </div>
          </div>

        </div>

        <!-- CARD 3: End-to-End Business Automation (Span 8) -->
        <div class="lg:col-span-8 rounded-3xl bg-white/85 border border-slate-200/90 hover:border-cyber-cyan/40 transition-all duration-300 p-4 sm:p-8 backdrop-blur-xl relative overflow-hidden group shadow-[0_10px_30px_rgba(15,23,42,0.04)] hover:shadow-xl">

          <div class="absolute -bottom-24 -right-24 w-80 h-80 bg-cyber-cyan/10 rounded-full blur-3xl pointer-events-none"></div>

          <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div class="flex items-center gap-2.5 sm:gap-3">
              <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center font-bold text-base sm:text-lg shadow-sm shrink-0">
                🤖
              </div>
              <div>
                <span class="text-[10px] sm:text-[11px] font-mono text-sky-600 uppercase tracking-wider font-bold">Service 03</span>
                <h3 class="font-heading text-lg sm:text-xl font-bold text-slate-900">WhatsApp Replies & Follow-Ups</h3>
              </div>
            </div>
            <span class="px-2.5 py-0.5 rounded-full bg-sky-50 border border-sky-200 text-[10px] sm:text-[11px] font-mono text-sky-800 font-bold">
              Keep Inquiries Organised
            </span>
          </div>

          <!-- Direct Benefit Highlight -->
          <div class="mb-5 p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <span class="text-[10px] sm:text-[11px] font-mono font-bold text-slate-800 uppercase block mb-1">How We Help:</span>
            <p class="text-sm text-slate-600 leading-relaxed">
              Repeating the same answers takes time. We can set up WhatsApp replies, catalog sharing, and lead collection, with a handover to your team when a customer needs a real conversation.
            </p>
          </div>

          <!-- Interactive Live Animated Automation Flowchart -->
          <div class="p-4 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 relative overflow-hidden">

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 relative z-10">

              <!-- Node 1 -->
              <div class="p-3 sm:p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-sky-400 transition-colors text-center">
                <span class="inline-block p-1.5 sm:p-2 rounded-lg bg-sky-50 text-sky-600 mb-1 sm:mb-2 text-base">📥</span>
                <h5 class="font-heading text-[11px] sm:text-xs font-bold text-slate-900">New Inquiry</h5>
                <p class="text-[9px] sm:text-[10px] font-mono text-slate-500 mt-0.5">Ad or Website</p>
                <span class="mt-1.5 inline-block text-[9px] font-mono px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 font-semibold">Capture Details</span>
              </div>

              <!-- Node 2 -->
              <div class="p-3 sm:p-3.5 rounded-xl bg-white border border-sunset-rose/30 shadow-xs hover:border-sunset-rose transition-colors text-center relative">
                <span class="inline-block p-1.5 sm:p-2 rounded-lg bg-rose-50 text-sunset-rose mb-1 sm:mb-2 text-base">💬</span>
                <h5 class="font-heading text-[11px] sm:text-xs font-bold text-slate-900">WhatsApp Bot</h5>
                <p class="text-[9px] sm:text-[10px] font-mono text-slate-500 mt-0.5">Sends Catalog</p>
                <span class="mt-1.5 inline-block text-[9px] font-mono px-1.5 py-0.5 rounded bg-rose-100 text-sunset-rose font-semibold">Planned Replies</span>
              </div>

              <!-- Node 3 -->
              <div class="p-3 sm:p-3.5 rounded-xl bg-white border border-purple-200 shadow-xs hover:border-electric-violet transition-colors text-center">
                <span class="inline-block p-1.5 sm:p-2 rounded-lg bg-purple-50 text-electric-violet mb-1 sm:mb-2 text-base">📊</span>
                <h5 class="font-heading text-[11px] sm:text-xs font-bold text-slate-900">Sheets Sync</h5>
                <p class="text-[9px] sm:text-[10px] font-mono text-slate-500 mt-0.5">Zoho / Sheets</p>
                <span class="mt-1.5 inline-block text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-100 text-electric-violet font-semibold">Less Copy-Paste</span>
              </div>

              <!-- Node 4 -->
              <div class="p-3 sm:p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-slate-400 transition-colors text-center">
                <span class="inline-block p-1.5 sm:p-2 rounded-lg bg-slate-100 text-slate-700 mb-1 sm:mb-2 text-base">🔔</span>
                <h5 class="font-heading text-[11px] sm:text-xs font-bold text-slate-900">Follow-up</h5>
                <p class="text-[9px] sm:text-[10px] font-mono text-slate-500 mt-0.5">Auto Reminders</p>
                <span class="mt-1.5 inline-block text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">Stay on Track</span>
              </div>

            </div>

            <!-- Pulsing Data Stream Connecting Bar -->
            <div class="mt-3.5 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-600 font-medium gap-2">
              <span class="flex items-center gap-1.5 text-sunset-rose font-bold">
                <span class="w-1.5 h-1.5 rounded-full bg-sunset-rose animate-ping"></span>
                WhatsApp Business API Setup
              </span>
              <span>Workflows matched to your team</span>
            </div>

          </div>

        </div>

        <!-- CARD 4: Social Media Dominance & Brand Storytelling (Span 4) -->
        <div class="lg:col-span-4 rounded-3xl bg-white/85 border border-slate-200/90 hover:border-electric-violet/40 transition-all duration-300 p-4 sm:p-8 backdrop-blur-xl relative overflow-hidden group shadow-[0_10px_30px_rgba(15,23,42,0.04)] hover:shadow-xl flex flex-col justify-between">

          <div class="absolute -top-24 -right-24 w-64 h-64 bg-electric-violet/10 rounded-full blur-3xl pointer-events-none"></div>

          <div>
            <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div class="flex items-center gap-2.5 sm:gap-3">
                <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-50 border border-purple-200 text-electric-violet flex items-center justify-center font-bold text-base sm:text-lg shadow-sm shrink-0">
                  🔥
                </div>
                <div>
                  <span class="text-[10px] sm:text-[11px] font-mono text-electric-violet uppercase tracking-wider font-bold">Service 04</span>
                  <h3 class="font-heading text-lg sm:text-xl font-bold text-slate-900">Brand Social Media & Reels</h3>
                </div>
              </div>
            </div>

            <!-- Direct Benefit Highlight -->
            <div class="mb-5 p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span class="text-[10px] sm:text-[11px] font-mono font-bold text-slate-800 uppercase block mb-1">How We Help:</span>
              <p class="text-sm text-slate-600 leading-relaxed">
                Give people a useful reason to follow your brand. We plan Reels, posts, and carousels around your products, common questions, and the details that help customers understand your business.
              </p>
            </div>

            <!-- Creative Mockup Card Stack -->
            <div class="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-4">
              <div class="flex flex-wrap gap-2 items-center justify-between text-xs font-mono text-slate-600 mb-2 font-semibold">
                <span>Content Planning</span>
                <span class="text-sunset-rose font-bold">Clear, Consistent Messaging</span>
              </div>
              <div class="w-full bg-slate-200 rounded-full h-2 overflow-hidden mb-2">
                <div class="bg-gradient-to-r from-sunset-rose to-electric-violet h-full w-[85%] rounded-full"></div>
              </div>
              <p class="text-[10px] sm:text-[11px] text-slate-500">Content topics shaped around your customers and offer.</p>
            </div>
          </div>

          <div class="pt-3 sm:pt-4 border-t border-slate-200 flex flex-wrap gap-2 items-center justify-between text-xs font-mono text-slate-700 font-semibold">
            <span>Video Content</span>
            <span class="text-sky-600 font-bold">Reels + Carousels + Stories</span>
          </div>

        </div>

        <!-- CARD 5: Digital Consulting & Cloud ERP Transformation (Span 12 - Full Width Banner) -->
        <div class="lg:col-span-12 rounded-3xl bg-gradient-to-r from-white via-slate-50 to-white border border-slate-200/90 hover:border-sunset-rose/30 transition-all duration-300 p-4 sm:p-8 backdrop-blur-xl relative overflow-hidden group shadow-[0_10px_30px_rgba(15,23,42,0.04)] hover:shadow-xl">
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
            <div class="max-w-2xl">
              <div class="flex items-center gap-2 mb-2">
                <span class="px-2.5 py-0.5 rounded-full bg-sunset-rose/10 border border-sunset-rose/25 text-sunset-rose text-[10px] font-mono font-bold uppercase">Service 05</span>
                <span class="text-slate-500 text-xs font-mono font-semibold">Simpler Daily Operations</span>
              </div>
              <h4 class="font-heading text-lg sm:text-2xl font-bold text-slate-900 mb-2">
                Keep Leads, Orders & Follow-Ups Together
              </h4>
              <p class="text-slate-600 text-sm leading-relaxed mb-3">
                <strong class="text-slate-800">How We Help:</strong> When customer details are scattered across chats and spreadsheets, follow-ups get harder. We can connect your tools and organise lead, order, or payment information in one shared view.
              </p>
              <div class="flex flex-wrap gap-2 text-[10px] sm:text-[11px] font-mono text-slate-600">
                <span class="px-2 py-1 rounded-md bg-white border border-slate-200">✓ Centralized Customer Data</span>
                <span class="px-2 py-1 rounded-md bg-white border border-slate-200">✓ Invoicing & Payment Tracking</span>
                <span class="px-2 py-1 rounded-md bg-white border border-slate-200">✓ Staff Mobile Access</span>
              </div>
            </div>

            <div class="flex flex-wrap items-center gap-3 sm:gap-4">
              <div class="px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
                <p class="font-heading font-extrabold text-base sm:text-lg text-slate-900">Shared</p>
                <p class="text-[9px] sm:text-[10px] font-mono text-slate-500 uppercase font-semibold">Team View</p>
              </div>
              <div class="px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-white border border-slate-200 text-center shadow-xs">
                <p class="font-heading font-extrabold text-base sm:text-lg text-sunset-rose">Mobile</p>
                <p class="text-[9px] sm:text-[10px] font-mono text-slate-500 uppercase font-semibold">Team Access</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>
  `
})
export class ServicesBentoComponent {
}
