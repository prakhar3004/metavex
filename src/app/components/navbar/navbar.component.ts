import { Component, Output, EventEmitter, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="sticky top-0 inset-x-0 z-50 w-full bg-white/92 backdrop-blur-2xl border-b border-slate-200/80 shadow-[0_4px_25px_rgba(15,23,42,0.03)] transition-all duration-300">
      <nav class="w-full max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        
        <!-- Logo -->
        <a href="#" (click)="onNavClick('#hero', $event)" class="flex items-center gap-3 group focus:outline-none shrink-0">
          <div class="relative w-9 h-9 rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300 ring-1 ring-slate-200">
            <img src="logo.png" alt="MetaVex Digital Logo" class="w-full h-full object-cover">
          </div>

          <div class="flex flex-col">
            <div class="flex items-center gap-1.5">
              <span class="font-heading font-black text-base tracking-wider text-slate-900">METAVEX</span>
              <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sunset-rose/10 text-sunset-rose border border-sunset-rose/25 tracking-widest font-bold uppercase">DIGITAL</span>
            </div>
            <span class="text-[9px] font-mono tracking-widest text-slate-500 uppercase -mt-0.5 font-semibold hidden sm:inline">Growth & Automation Partner</span>
          </div>
        </a>

        <!-- Desktop Navigation Links - Single Clean Row (Zero Wrapping, Zero Double Box) -->
        <div class="hidden lg:flex items-center gap-1 xl:gap-2">
          <a href="#services" (click)="onNavClick('#services', $event)" class="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-all whitespace-nowrap">
            Services
          </a>
          <a href="#gap" (click)="onNavClick('#gap', $event)" class="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-all whitespace-nowrap">
            Comparison
          </a>
          <a href="#calculator" (click)="onNavClick('#calculator', $event)" class="px-3.5 py-2 rounded-xl text-xs font-bold text-sunset-rose hover:bg-sunset-rose/10 transition-all flex items-center gap-1.5 whitespace-nowrap">
            <span class="w-1.5 h-1.5 rounded-full bg-sunset-rose animate-pulse"></span>
            ROI Calculator
          </a>
          <a href="#case-studies" (click)="onNavClick('#case-studies', $event)" class="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-all whitespace-nowrap">
            Case Studies
          </a>
          <a href="#blueprint" (click)="onNavClick('#blueprint', $event)" class="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-all whitespace-nowrap">
            Process
          </a>
        </div>

        <!-- Right Side: Availability Badge & CTAs -->
        <div class="flex items-center gap-3 shrink-0">
          
          <!-- Live Capacity Badge -->
          <div class="hidden 2xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-[11px] font-mono text-emerald-800 font-semibold shadow-xs whitespace-nowrap">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Accepting 3 Clients</span>
          </div>

          <!-- Sound Effects Synthesizer Toggle -->
          <button 
            type="button"
            (click)="toggleSound()"
            [title]="sound.isMuted() ? 'Enable UI sound' : 'Mute UI sound'"
            class="w-8 h-8 rounded-full flex items-center justify-center bg-white border border-slate-200 text-slate-500 hover:text-sunset-rose hover:border-sunset-rose/40 shadow-xs transition-all duration-200 focus:outline-none shrink-0"
            aria-label="Toggle Sound Effects">
            @if (sound.isMuted()) {
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 5L6 9H2v6h4l5 4V5z"/>
                <line x1="23" y1="9" x2="17" y2="15"/>
                <line x1="17" y1="9" x2="23" y2="15"/>
              </svg>
            } @else {
              <div class="flex items-center gap-0.5 h-3">
                <span class="w-0.5 bg-sunset-rose rounded-full animate-[pulse_0.8s_ease-in-out_infinite] h-2"></span>
                <span class="w-0.5 bg-electric-violet rounded-full animate-[pulse_1.2s_ease-in-out_infinite] h-3"></span>
                <span class="w-0.5 bg-cyber-cyan rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-1.5"></span>
              </div>
            }
          </button>

          <!-- Primary Growth Call CTA - Cyber Sunset Luxury -->
          <button 
            type="button"
            (click)="onOpenLeadModal()"
            class="relative group p-[1px] rounded-full overflow-hidden shadow-neon-rose hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 shrink-0">
            <span class="absolute inset-0 bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan animate-shimmer bg-[length:200%_auto]"></span>
            <span class="relative px-4 sm:px-5 py-2 rounded-full bg-slate-900 group-hover:bg-slate-950 flex items-center gap-2 text-xs font-bold text-white transition-colors duration-200 whitespace-nowrap">
              <span>Free Growth Audit</span>
              <svg class="w-3.5 h-3.5 text-sunset-rose group-hover:translate-x-0.5 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </button>

          <!-- Mobile Hamburger Toggle -->
          <button 
            type="button"
            (click)="toggleMobileMenu()"
            class="lg:hidden p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-950 focus:outline-none"
            aria-label="Toggle Mobile Menu">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              @if (!mobileMenuOpen()) {
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7"/>
              } @else {
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              }
            </svg>
          </button>

        </div>
      </nav>

      <!-- Mobile Navigation Drawer -->
      @if (mobileMenuOpen()) {
        <div class="lg:hidden fixed inset-x-4 top-20 p-5 rounded-2xl bg-white/95 backdrop-blur-3xl border border-slate-200 shadow-2xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-4 duration-300 z-50">
          <a href="#services" (click)="onNavClick('#services', $event)" class="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 flex items-center justify-between">
            <span>5 Core Growth Services & Benefits</span>
            <span class="text-xs font-mono text-sunset-rose font-bold">01</span>
          </a>
          <a href="#gap" (click)="onNavClick('#gap', $event)" class="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 flex items-center justify-between">
            <span>Before vs After: What Changes</span>
            <span class="text-xs font-mono text-cyber-cyan font-bold">02</span>
          </a>
          <a href="#calculator" (click)="onNavClick('#calculator', $event)" class="px-4 py-2.5 rounded-xl text-sm font-bold text-sunset-rose hover:bg-sunset-rose/10 flex items-center justify-between">
            <span>Calculate ROI & Hours Saved</span>
            <span class="text-xs font-mono text-sunset-rose">03</span>
          </a>
          <a href="#case-studies" (click)="onNavClick('#case-studies', $event)" class="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 flex items-center justify-between">
            <span>Real Indian Client Case Studies</span>
            <span class="text-xs font-mono text-slate-500 font-bold">04</span>
          </a>
          <a href="#blueprint" (click)="onNavClick('#blueprint', $event)" class="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 flex items-center justify-between">
            <span>Our 4-Step Working Process</span>
            <span class="text-xs font-mono text-emerald-600 font-bold">05</span>
          </a>

          <div class="pt-3 border-t border-slate-200 flex items-center justify-between">
            <span class="text-xs font-mono text-emerald-700 flex items-center gap-1.5 font-bold">
              <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              3 Slots Available
            </span>
            <button 
              type="button"
              (click)="onOpenLeadModal()"
              class="px-4 py-2 rounded-xl bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan text-xs font-bold text-white shadow-md">
              Get Free Audit
            </button>
          </div>
        </div>
      }
    </header>
  `
})
export class NavbarComponent {
  public sound = inject(SoundService);
  public mobileMenuOpen = signal<boolean>(false);

  @Output() openLeadModal = new EventEmitter<void>();

  public toggleSound() {
    this.sound.toggleMute();
  }

  public toggleMobileMenu() {
    this.sound.playClick();
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
  }

  public onNavClick(target: string, event: Event) {
    event.preventDefault();
    this.sound.playClick();
    this.mobileMenuOpen.set(false);

    if (typeof document !== 'undefined') {
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  public onOpenLeadModal() {
    this.sound.playChime();
    this.mobileMenuOpen.set(false);
    this.openLeadModal.emit();
  }
}
