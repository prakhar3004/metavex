import { Component, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaqComponent } from '../../components/faq/faq.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [RouterLink, FaqComponent],
  template: `
    <div class="pt-8 sm:pt-14 pb-16">

      <!-- Page Header -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 text-center">

        <!-- Breadcrumb -->
        <div class="flex items-center justify-center gap-2 mb-3">
          <a routerLink="/" class="text-xs font-mono text-slate-500 hover:text-slate-900">Home</a>
          <span class="text-xs font-mono text-slate-400">/</span>
          <span class="text-xs font-mono text-sunset-rose font-bold uppercase">Contact</span>
        </div>

        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sunset-rose/10 border border-sunset-rose/25 text-sunset-rose text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <span class="w-2 h-2 rounded-full bg-sunset-rose animate-ping"></span>
          Let’s Talk About Your Business
        </div>

        <h1 class="font-heading text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">
          Tell Us What Is Holding <br class="hidden sm:inline" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan">
            Your Business Back.
          </span>
        </h1>

        <p class="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base leading-relaxed">
          A website that is hard to use? Ads that are hard to measure? Too much time spent following up? Share the challenge and we can discuss a sensible next step.
        </p>

      </div>

      <!-- Main Contact Grid -->
      <section class="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">

          <!-- Left Column: Direct Contact Details & Working Channels (Span 5) -->
          <div class="lg:col-span-5 space-y-4 sm:space-y-6">

            <!-- WhatsApp Direct Card (Primary Contact Method for India) -->
            <div class="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-emerald-50/40 border border-emerald-200/90 shadow-sm relative overflow-hidden">
              <div class="flex flex-wrap gap-2 items-center justify-between mb-4">
                <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] sm:text-xs font-mono font-bold">
                  START A CONVERSATION
                </span>
                <span class="text-xs font-mono text-emerald-600 font-semibold">WhatsApp</span>
              </div>

              <h2 class="font-heading font-extrabold text-lg sm:text-xl text-slate-900 mb-2">
                Chat Directly on WhatsApp
              </h2>
              <p class="text-sm text-slate-600 mb-5 sm:mb-6 leading-relaxed">
                Send your website or social page and tell us what you want to improve. Starting from scratch? Share your business idea instead.
              </p>

              <a
                href="https://wa.me/919026231351?text=Hi%20MetaVex%20Digital%2C%20I%20would%20like%20to%20discuss%20my%20business%20and%20project."
                target="_blank"
                rel="noopener noreferrer"
                class="w-full py-3.5 px-4 sm:px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-heading font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2.5 sm:gap-3 shadow-md hover:scale-[1.02] transition-all">
                <span class="text-base sm:text-lg">💬</span>
                <span>Message +91 9026231351</span>
              </a>
            </div>

            <!-- Email & Direct Call Card -->
            <div class="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-4 sm:space-y-5">
              <div>
                <span class="text-[10px] sm:text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">Direct Email</span>
                <a href="mailto:metavexdigital@gmail.com" class="block font-heading font-extrabold text-base sm:text-lg text-slate-900 mt-1 break-all">
                  metavexdigital&#64;gmail.com
                </a>
                <p class="text-xs font-mono text-slate-500 mt-0.5">Share your requirements by email</p>
              </div>

              <div class="pt-3.5 sm:pt-4 border-t border-slate-100">
                <span class="text-[10px] sm:text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">Direct Phone</span>
                <a href="tel:+919026231351" class="block font-heading font-extrabold text-base sm:text-lg text-slate-900 mt-1">
                  +91 9026231351
                </a>
                <p class="text-xs font-mono text-slate-500 mt-0.5">Message us to arrange a suitable call time</p>
              </div>

              <div class="pt-3.5 sm:pt-4 border-t border-slate-100">
                <span class="text-[10px] sm:text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">Planning a Project?</span>
                <div class="flex items-center gap-2 mt-1">
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span class="font-heading font-bold text-xs sm:text-sm text-emerald-800">Let’s discuss scope and availability</span>
                </div>
              </div>
            </div>

          </div>

          <!-- Right Column: Interactive Audit Application (Span 7) -->
          <div class="lg:col-span-7 p-4 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-sm">
            <div class="mb-5 sm:mb-6">
              <span class="text-xs font-mono text-sunset-rose font-bold uppercase tracking-wider">Start With Your Priorities</span>
              <h2 class="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                Not Sure Which Service You Need?
              </h2>
              <p class="text-sm text-slate-600 mt-2 leading-relaxed">
                Tell us how you currently attract customers and handle inquiries. We can help you work out what needs attention first.
              </p>
            </div>

            <!-- Launch Audit Wizard Button -->
            <div class="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-sunset-rose/10 via-electric-violet/10 to-cyber-cyan/10 border border-sunset-rose/25 text-center my-5 sm:my-6">
              <span class="text-2xl sm:text-3xl block mb-2 sm:mb-3">🚀</span>
              <h4 class="font-heading font-bold text-sm sm:text-base text-slate-900 mb-1">Prepare a Short Project Brief</h4>
              <p class="text-sm text-slate-600 mb-4 max-w-md mx-auto">
                Answer a few questions, add your contact details, and review your request before sending it to our team.
              </p>
              <button
                type="button"
                (click)="onOpenAudit()"
                class="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan text-white font-heading font-bold text-xs sm:text-sm shadow-md hover:scale-105 transition-all">
                Prepare My Brief →
              </button>
            </div>


          </div>

        </div>
      </section>
      <app-faq></app-faq>

    </div>
  `
})
export class ContactPageComponent {
  @Output() openLeadModal = new EventEmitter<void>();

  public onOpenAudit() {
    this.openLeadModal.emit();
  }
}
