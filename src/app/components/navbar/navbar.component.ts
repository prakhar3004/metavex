import { Component, Output, EventEmitter, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="sticky top-0 inset-x-0 z-50 w-full bg-white/92 backdrop-blur-2xl border-b border-slate-200/80 shadow-[0_4px_25px_rgba(15,23,42,0.03)] transition-all duration-300">
      <nav class="w-full max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        
        <!-- Logo -->
        <a routerLink="/" (click)="onLogoClick()" class="flex items-center gap-2 sm:gap-3 group focus:outline-none shrink-0">
          <div class="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden shadow-xs group-hover:shadow-md transition-all duration-300 ring-1 ring-slate-200">
            <img src="logo.png" alt="MetaVex Digital Logo" class="w-full h-full object-cover">
          </div>

          <div class="flex flex-col">
            <div class="flex items-center gap-1 sm:gap-1.5">
              <span class="font-heading font-black text-sm sm:text-base tracking-wider text-slate-900">METAVEX</span>
              <span class="text-[9px] sm:text-[10px] font-mono px-1 sm:px-1.5 py-0.5 rounded bg-sunset-rose/10 text-sunset-rose border border-sunset-rose/25 tracking-widest font-bold uppercase">DIGITAL</span>
            </div>
            <span class="text-[9px] font-mono tracking-widest text-slate-500 uppercase -mt-0.5 font-semibold hidden md:inline">Growth & Automation Partner</span>
          </div>
        </a>

        <!-- Desktop Navigation Links - Real Pages (Multi-Page Routing) -->
        <div class="hidden lg:flex items-center gap-1 xl:gap-2">
          
          <a 
            routerLink="/" 
            [routerLinkActiveOptions]="{ exact: true }"
            routerLinkActive="bg-slate-100 text-slate-950 font-extrabold shadow-2xs"
            (click)="sound.playClick()"
            class="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-950 hover:bg-slate-100/80 transition-all whitespace-nowrap">
            Home
          </a>

          <a 
            routerLink="/services" 
            routerLinkActive="bg-slate-100 text-slate-950 font-extrabold shadow-2xs"
            (click)="sound.playClick()"
            class="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-950 hover:bg-slate-100/80 transition-all whitespace-nowrap">
            Services
          </a>

          <a 
            routerLink="/comparison" 
            routerLinkActive="bg-slate-100 text-slate-950 font-extrabold shadow-2xs"
            (click)="sound.playClick()"
            class="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-950 hover:bg-slate-100/80 transition-all whitespace-nowrap">
            Comparison
          </a>

          <a 
            routerLink="/calculator" 
            routerLinkActive="bg-sunset-rose/15 text-sunset-rose font-extrabold shadow-2xs"
            (click)="sound.playClick()"
            class="px-3 py-1.5 rounded-xl text-xs font-bold text-sunset-rose hover:bg-sunset-rose/10 transition-all flex items-center gap-1.5 whitespace-nowrap">
            <span class="w-1.5 h-1.5 rounded-full bg-sunset-rose animate-pulse"></span>
            ROI Calculator
          </a>

          <a 
            routerLink="/case-studies" 
            routerLinkActive="bg-slate-100 text-slate-950 font-extrabold shadow-2xs"
            (click)="sound.playClick()"
            class="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-950 hover:bg-slate-100/80 transition-all whitespace-nowrap">
            Case Studies
          </a>

          <a 
            routerLink="/process" 
            routerLinkActive="bg-slate-100 text-slate-950 font-extrabold shadow-2xs"
            (click)="sound.playClick()"
            class="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-950 hover:bg-slate-100/80 transition-all whitespace-nowrap">
            Process
          </a>

          <a 
            routerLink="/contact" 
            routerLinkActive="bg-slate-100 text-slate-950 font-extrabold shadow-2xs"
            (click)="sound.playClick()"
            class="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-950 hover:bg-slate-100/80 transition-all whitespace-nowrap">
            Contact
          </a>

        </div>

        <!-- Right Side: Availability Badge & CTAs -->
        <div class="flex items-center gap-1.5 sm:gap-3 shrink-0">
          
          <!-- Live Capacity Badge (Large Desktop Only) -->
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
            <span class="relative px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full bg-slate-900 group-hover:bg-slate-950 flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold text-white transition-colors duration-200 whitespace-nowrap">
              <span class="hidden sm:inline">Free Growth Audit</span>
              <span class="sm:hidden">Free Audit</span>
              <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sunset-rose group-hover:translate-x-0.5 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </button>

          <!-- Mobile Hamburger Toggle -->
          <button 
            type="button"
            (click)="toggleMobileMenu()"
            class="lg:hidden p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-950 focus:outline-none shrink-0"
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

      <!-- Mobile Backdrop Overlay (Click to close) -->
      @if (mobileMenuOpen()) {
        <div 
          (click)="closeMobileMenu()" 
          class="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 transition-opacity duration-300">
        </div>
      }

      <!-- Mobile Navigation Drawer -->
      @if (mobileMenuOpen()) {
        <div class="lg:hidden fixed inset-x-3 sm:inset-x-6 top-16 sm:top-20 p-4 sm:p-5 rounded-2xl bg-white/98 backdrop-blur-3xl border border-slate-200 shadow-2xl flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-4 duration-300 z-50 max-h-[calc(100dvh-5rem)] overflow-y-auto">
          
          <a 
            routerLink="/" 
            [routerLinkActiveOptions]="{ exact: true }"
            routerLinkActive="bg-slate-100 font-extrabold text-slate-950"
            (click)="closeMobileMenu()" 
            class="px-3.5 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 flex items-center justify-between transition-colors">
            <span>🏠 Home</span>
            <span class="text-xs font-mono text-slate-400">00</span>
          </a>

          <a 
            routerLink="/services" 
            routerLinkActive="bg-rose-50 text-sunset-rose font-extrabold"
            (click)="closeMobileMenu()" 
            class="px-3.5 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 flex items-center justify-between transition-colors">
            <span>⚡ 5 Core Growth Services</span>
            <span class="text-xs font-mono text-sunset-rose font-bold">01</span>
          </a>

          <a 
            routerLink="/comparison" 
            routerLinkActive="bg-sky-50 text-cyber-cyan font-extrabold"
            (click)="closeMobileMenu()" 
            class="px-3.5 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 flex items-center justify-between transition-colors">
            <span>⚖️ Before vs After: Reality Check</span>
            <span class="text-xs font-mono text-cyber-cyan font-bold">02</span>
          </a>

          <a 
            routerLink="/calculator" 
            routerLinkActive="bg-rose-50 text-sunset-rose font-extrabold"
            (click)="closeMobileMenu()" 
            class="px-3.5 py-3 rounded-xl text-sm font-bold text-sunset-rose hover:bg-sunset-rose/10 flex items-center justify-between transition-colors">
            <span>📊 Calculate ROI & Hours Saved</span>
            <span class="text-xs font-mono text-sunset-rose">03</span>
          </a>

          <a 
            routerLink="/case-studies" 
            routerLinkActive="bg-slate-100 text-slate-950 font-extrabold"
            (click)="closeMobileMenu()" 
            class="px-3.5 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 flex items-center justify-between transition-colors">
            <span>📁 Real Indian Client Case Studies</span>
            <span class="text-xs font-mono text-slate-500 font-bold">04</span>
          </a>

          <a 
            routerLink="/process" 
            routerLinkActive="bg-emerald-50 text-emerald-800 font-extrabold"
            (click)="closeMobileMenu()" 
            class="px-3.5 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 flex items-center justify-between transition-colors">
            <span>🛣️ Our 30-Day Working Process</span>
            <span class="text-xs font-mono text-emerald-600 font-bold">05</span>
          </a>

          <a 
            routerLink="/contact" 
            routerLinkActive="bg-purple-50 text-electric-violet font-extrabold"
            (click)="closeMobileMenu()" 
            class="px-3.5 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 flex items-center justify-between transition-colors">
            <span>📞 Contact & Direct WhatsApp</span>
            <span class="text-xs font-mono text-electric-violet font-bold">06</span>
          </a>

          <div class="pt-3.5 mt-1 border-t border-slate-200 flex items-center justify-between gap-3">
            <span class="text-xs font-mono text-emerald-700 flex items-center gap-1.5 font-bold">
              <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              3 Slots Available
            </span>
            <button 
              type="button" 
              (click)="onOpenLeadModal()"
              class="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan text-xs font-bold text-white shadow-md active:scale-95 transition-all">
              Get Free Audit →
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

  public closeMobileMenu() {
    this.sound.playClick();
    this.mobileMenuOpen.set(false);
  }

  public onLogoClick() {
    this.sound.playClick();
    this.closeMobileMenu();
  }

  public onOpenLeadModal() {
    this.sound.playChime();
    this.mobileMenuOpen.set(false);
    this.openLeadModal.emit();
  }
}
