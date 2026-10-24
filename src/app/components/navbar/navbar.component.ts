import { Component, EventEmitter, HostListener, Output, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ModalDirective } from '../../directives/modal.directive';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ModalDirective],
  template: `
    <header class="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <nav aria-label="Main navigation" class="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:px-6 lg:px-8">
        <a routerLink="/" (click)="closeMobileMenu()" aria-label="MetaVex Digital home" class="inline-flex min-w-0 shrink-0 items-center gap-2 sm:gap-3">
          <img src="logo-72.png" alt="" width="36" height="36" class="h-9 w-9 shrink-0 rounded-xl object-cover ring-1 ring-slate-200" />
          <span class="min-w-0">
            <span class="flex flex-wrap items-center gap-1.5">
              <!-- Trailing space keeps "METAVEX DIGITAL" as two words in the HTML text Google reads. -->
              <span class="font-heading text-sm font-black tracking-wide text-slate-900 sm:text-base">METAVEX </span>
              <span class="hidden rounded border border-sunset-rose/25 bg-sunset-rose/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-sunset-rose sm:inline">DIGITAL</span>
            </span>
            <span class="hidden font-mono text-[9px] font-semibold uppercase tracking-wide text-slate-500 md:block">Websites, Ads & Automation</span>
          </span>
        </a>

        <div class="hidden min-w-0 items-center gap-1 xl:flex">
          @for (link of links; track link.path) {
            <a [routerLink]="link.path" routerLinkActive="bg-slate-100 text-slate-950" ariaCurrentWhenActive="page" (click)="sound.playClick()" class="rounded-xl px-2.5 py-3 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950">{{ link.label }}</a>
          }
        </div>

        <div class="flex shrink-0 items-center gap-2 sm:gap-3">
          <button type="button" (click)="sound.toggleMute()" [attr.aria-label]="sound.isMuted() ? 'Enable interface sounds' : 'Mute interface sounds'" [attr.aria-pressed]="!sound.isMuted()" class="hidden h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:text-sunset-rose sm:inline-flex">
            <svg aria-hidden="true" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              @if (sound.isMuted()) { <path d="m17 9 6 6m0-6-6 6" /> }
              @else { <path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" /> }
            </svg>
          </button>
          <button type="button" (click)="onOpenLeadModal()" class="min-h-11 rounded-full bg-slate-900 px-3 py-2.5 font-heading text-xs font-bold text-white transition-colors hover:bg-slate-800 sm:px-5">
            <span class="hidden sm:inline">Discuss My Business</span><span class="sm:hidden">Let’s Talk</span>
          </button>
          <button type="button" (click)="toggleMobileMenu()" [attr.aria-expanded]="mobileMenuOpen()" aria-controls="mobile-navigation" aria-label="Open navigation menu" class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 xl:hidden">
            <svg aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </nav>
    </header>

    @if (mobileMenuOpen()) {
      <dialog appModal (dismiss)="closeMobileMenu()" id="mobile-navigation" aria-labelledby="navigation-title" class="modal-overlay items-start px-3 pb-3 pt-6 sm:px-6">
        <div class="modal-panel w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-4 shadow-2xl sm:p-6">
          <div class="mb-4 flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <h2 id="navigation-title" class="font-heading text-lg font-bold text-slate-900">Explore MetaVex</h2>
            <button type="button" (click)="closeMobileMenu()" aria-label="Close navigation menu" class="h-11 w-11 shrink-0 rounded-full bg-slate-100 text-lg text-slate-700">✕</button>
          </div>
          <nav aria-label="Mobile navigation" class="flex flex-col gap-1">
            @for (link of links; track link.path) {
              <a [routerLink]="link.path" routerLinkActive="bg-slate-100" ariaCurrentWhenActive="page" (click)="closeMobileMenu()" class="min-w-0 rounded-xl px-3 py-3 hover:bg-slate-50">
                <span class="block font-heading text-sm font-bold text-slate-900">{{ link.label }}</span>
                <span class="mt-0.5 block text-xs leading-relaxed text-slate-500">{{ link.description }}</span>
              </a>
            }
          </nav>
          <button type="button" (click)="onOpenLeadModal()" class="mt-5 w-full rounded-xl bg-slate-900 px-4 py-3.5 font-heading text-sm font-bold text-white">Discuss My Business →</button>
          <button type="button" (click)="sound.toggleMute()" [attr.aria-pressed]="!sound.isMuted()" class="mt-2 w-full rounded-xl px-4 py-3 text-xs font-semibold text-slate-600">{{ sound.isMuted() ? 'Enable interface sounds' : 'Mute interface sounds' }}</button>
        </div>
      </dialog>
    }
  `
})
export class NavbarComponent {
  public readonly sound = inject(SoundService);
  public readonly mobileMenuOpen = signal(false);
  @Output() openLeadModal = new EventEmitter<void>();
  public readonly links = [
    { path: '/services', label: 'Services', description: 'Find help for your current business challenge.' },
    { path: '/comparison', label: 'Customer Journey', description: 'See where visitors and inquiries can get stuck.' },
    { path: '/calculator', label: 'Growth Planner', description: 'Explore a scenario using your own assumptions.' },
    { path: '/case-studies', label: 'Use Cases', description: 'Picture practical solutions for different businesses.' },
    { path: '/process', label: 'Process', description: 'Understand how we plan, build, and launch.' },
    { path: '/contact', label: 'Contact', description: 'Share your requirements and start a conversation.' }
  ];
  public toggleMobileMenu() {
    this.sound.playClick();
    this.mobileMenuOpen.update(open => !open);
  }
  public closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }
  @HostListener('window:resize')
  public onResize() {
    if (window.innerWidth >= 1280) this.closeMobileMenu();
  }
  public onOpenLeadModal() {
    this.closeMobileMenu();
    this.openLeadModal.emit();
  }
}
