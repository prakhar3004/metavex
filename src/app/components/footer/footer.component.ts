import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="relative bg-slate-100/90 border-t border-slate-200/80 pt-24 pb-12 overflow-hidden">
      
      <!-- Top Subtle Glow Line - Cyber Sunset -->
      <div class="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-sunset-rose/40 to-transparent"></div>
      <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-sunset-rose/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <!-- Massive Typographic Display -->
        <div class="text-center mb-16">
          <p class="text-xs font-mono uppercase tracking-widest text-sunset-rose mb-3 font-bold">
            Ready To Grow Your Business?
          </p>
          <h2 class="font-heading text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-slate-900 via-slate-800 to-slate-500 select-none">
            LET'S BUILD YOUR GROWTH ENGINE
          </h2>
          <p class="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mt-4 mb-8">
            Stop losing potential customers to slow loading times, missed messages, and blind ad spend. Get a clean, high-performing digital system that generates real revenue.
          </p>

          <a 
            href="#hero" 
            (click)="onScrollTop($event)"
            class="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan text-white font-heading font-black text-sm uppercase tracking-wider shadow-neon-rose hover:scale-105 active:scale-95 transition-all duration-200">
            <span>Get Free Growth Audit & Strategy</span>
            <span>→</span>
          </a>
        </div>

        <!-- 4 Core Client Commitments (Replaces fake clocks) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-3xl bg-white/80 border border-slate-200/90 backdrop-blur-xl mb-16 shadow-sm">
          <div class="p-4 rounded-2xl bg-white/95 border border-slate-200/70 shadow-xs text-center sm:text-left">
            <span class="text-xl mb-1 block">🔒</span>
            <p class="font-heading font-bold text-xs text-slate-900">100% Asset Ownership</p>
            <p class="text-[11px] text-slate-500 mt-1">You own all your Meta Ad accounts, domain, code, and customer data.</p>
          </div>

          <div class="p-4 rounded-2xl bg-white/95 border border-slate-200/70 shadow-xs text-center sm:text-left">
            <span class="text-xl mb-1 block">🤝</span>
            <p class="font-heading font-bold text-xs text-slate-900">No Long Lock-in Contracts</p>
            <p class="text-[11px] text-slate-500 mt-1">We work on clear monthly milestones and performance deliverables.</p>
          </div>

          <div class="p-4 rounded-2xl bg-white/95 border border-slate-200/70 shadow-xs text-center sm:text-left">
            <span class="text-xl mb-1 block">💬</span>
            <p class="font-heading font-bold text-xs text-slate-900">Direct WhatsApp Group</p>
            <p class="text-[11px] text-slate-500 mt-1">Direct priority chat with your dedicated developer and ad manager.</p>
          </div>

          <div class="p-4 rounded-2xl bg-white/95 border border-slate-200/70 shadow-xs text-center sm:text-left">
            <span class="text-xl mb-1 block">🚀</span>
            <p class="font-heading font-bold text-xs text-slate-900">Fast 30-Day Turnaround</p>
            <p class="text-[11px] text-slate-500 mt-1">From initial audit to live high-converting site and active ads in 3-4 weeks.</p>
          </div>
        </div>

        <!-- Links & Info Columns -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-10 pb-16 border-b border-slate-200">
          
          <div class="md:col-span-1">
            <div class="flex items-center gap-2 mb-3">
              <span class="font-heading font-extrabold text-lg text-slate-900">METAVEX</span>
              <span class="text-[9px] font-mono px-1.5 py-0.5 rounded bg-sunset-rose/10 text-sunset-rose border border-sunset-rose/30 uppercase font-bold">DIGITAL</span>
            </div>
            <p class="text-xs text-slate-600 leading-relaxed mb-4">
              Digital growth and business automation partner for ambitious Indian brands, manufacturers, and growing businesses.
            </p>
            <div class="flex items-center gap-2 text-xs font-mono text-emerald-700 font-semibold">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Built in India for Growing Businesses 🇮🇳
            </div>
          </div>

          <div>
            <h5 class="text-xs font-mono uppercase tracking-widest text-slate-900 mb-4 font-bold">Services & Benefits</h5>
            <ul class="space-y-2 text-xs text-slate-600">
              <li><a href="#services" class="hover:text-sunset-rose transition-colors">Fast Mobile Websites & Stores</a></li>
              <li><a href="#services" class="hover:text-sunset-rose transition-colors">High-ROAS Meta Ads (FB & Insta)</a></li>
              <li><a href="#services" class="hover:text-sunset-rose transition-colors">WhatsApp & Lead Automation</a></li>
              <li><a href="#services" class="hover:text-sunset-rose transition-colors">Brand Reels & Social Content</a></li>
              <li><a href="#services" class="hover:text-sunset-rose transition-colors">Cloud System & Operations Setup</a></li>
            </ul>
          </div>

          <div>
            <h5 class="text-xs font-mono uppercase tracking-widest text-slate-900 mb-4 font-bold">Explore</h5>
            <ul class="space-y-2 text-xs text-slate-600">
              <li><a href="#calculator" class="hover:text-sunset-rose transition-colors">Calculate ROI & Time Saved</a></li>
              <li><a href="#gap" class="hover:text-sunset-rose transition-colors">Before vs After Comparison</a></li>
              <li><a href="#case-studies" class="hover:text-sunset-rose transition-colors">Real Client Case Studies</a></li>
              <li><a href="#blueprint" class="hover:text-sunset-rose transition-colors">Our 4-Step Working Process</a></li>
            </ul>
          </div>

          <div>
            <h5 class="text-xs font-mono uppercase tracking-widest text-slate-900 mb-4 font-bold">Direct Contact</h5>
            <p class="text-xs text-slate-600 leading-relaxed mb-2">
              Hubs: Bengaluru & Mumbai Tech Corridors<br/>
              Support: Mon — Sat, 9:30 AM — 7:00 PM IST
            </p>
            <p class="text-xs font-mono font-bold text-sunset-rose mt-2">
              hello&#64;metavexdigital.com
            </p>
            <p class="text-xs font-mono text-slate-600 mt-1">
              WhatsApp: +91 98765 43210
            </p>
          </div>

        </div>

        <!-- Bottom Copyright & Architecture Notice -->
        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© 2026 METAVEX DIGITAL. Engineered with Angular 19 Standalone, Three.js & Tailwind CSS.</p>
          <div class="flex items-center gap-4">
            <span class="hover:text-slate-800 cursor-pointer">Security Policy</span>
            <span class="hover:text-slate-800 cursor-pointer">CAPI Privacy Terms</span>
            <span class="hover:text-slate-800 cursor-pointer">SLA Guarantee</span>
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
