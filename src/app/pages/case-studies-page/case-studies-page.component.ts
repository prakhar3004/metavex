import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CaseStudiesComponent } from '../../components/case-studies/case-studies.component';
import { SocialProofComponent } from '../../components/social-proof/social-proof.component';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-case-studies-page',
  standalone: true,
  imports: [CommonModule, RouterLink, CaseStudiesComponent, SocialProofComponent],
  template: `
    <div class="pt-8 sm:pt-14 pb-16">
      
      <!-- Page Header -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 text-center">
        
        <!-- Breadcrumb -->
        <div class="flex items-center justify-center gap-2 mb-3">
          <a routerLink="/" class="text-xs font-mono text-slate-500 hover:text-slate-900">Home</a>
          <span class="text-xs font-mono text-slate-400">/</span>
          <span class="text-xs font-mono text-sunset-rose font-bold uppercase">Case Studies</span>
        </div>

        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sunset-rose/10 border border-sunset-rose/25 text-sunset-rose text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <span class="w-2 h-2 rounded-full bg-sunset-rose animate-ping"></span>
          Verified Implementation Records
        </div>

        <h1 class="font-heading text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">
          Real Client Transformations & <br class="hidden sm:inline" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan">
            Verifiable Growth Blueprints.
          </span>
        </h1>

        <p class="max-w-2xl mx-auto text-slate-600 text-sm sm:text-base leading-relaxed">
          Zero inflated vanity numbers or Photoshop claims. Deep-dive case studies detailing how we audited, rebuilt, and automated digital operations for Indian brands.
        </p>

        <!-- Quick CTAs -->
        <div class="flex flex-wrap items-center justify-center gap-3 mt-6">
          <button 
            type="button"
            (click)="onOpenAudit()"
            class="px-6 py-3 rounded-2xl bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan text-white font-heading font-bold text-xs sm:text-sm shadow-md hover:scale-105 transition-all">
            Get Free 30-Min Growth Audit
          </button>
          <a 
            routerLink="/process"
            class="px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-800 font-heading font-bold text-xs sm:text-sm hover:bg-slate-50 transition-all">
            See Our 30-Day Process →
          </a>
        </div>

      </div>

      <!-- Main Case Studies Grid with Expandable Modals -->
      <app-case-studies></app-case-studies>

      <!-- Authentic Client Reviews & Marquee -->
      <app-social-proof></app-social-proof>

    </div>
  `
})
export class CaseStudiesPageComponent {
  public sound = inject(SoundService);
  @Output() openLeadModal = new EventEmitter<void>();

  public onOpenAudit() {
    this.sound.playChime();
    this.openLeadModal.emit();
  }
}
