import { Component, OnInit, OnDestroy, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { OnboardingWizardComponent } from './components/onboarding-wizard/onboarding-wizard.component';
import { CustomCursorComponent } from './components/custom-cursor/custom-cursor.component';
import { CalculatorMetrics } from './components/roi-calculator/roi-calculator.component';
import { SoundService } from './services/sound.service';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    OnboardingWizardComponent,
    CustomCursorComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  public sound = inject(SoundService);

  public showLeadModal = signal<boolean>(false);
  public prefilledMetrics = signal<CalculatorMetrics | null>(null);

  private lenis: Lenis | null = null;
  private rafId: number | null = null;

  ngOnInit() {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Initialize Lenis smooth scroll
      try {
        this.lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true
        });

        this.lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
          this.lenis?.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
      } catch (err) {
        console.warn('Smooth scroll initialization fallback', err);
      }
    }
  }

  public openLeadModal(metrics?: CalculatorMetrics) {
    this.sound.playChime();
    if (metrics) {
      this.prefilledMetrics.set(metrics);
    }
    this.showLeadModal.set(true);
  }

  public closeLeadModal() {
    this.sound.playClick();
    this.showLeadModal.set(false);
  }

  public onRouteActivate(componentInstance: any) {
    // Connect child page modal emitters dynamically if present
    if (componentInstance && componentInstance.openLeadModal) {
      componentInstance.openLeadModal.subscribe((metrics?: CalculatorMetrics) => {
        this.openLeadModal(metrics);
      });
    }
    if (componentInstance && componentInstance.claimBlueprint) {
      componentInstance.claimBlueprint.subscribe((metrics: CalculatorMetrics) => {
        this.openLeadModal(metrics);
      });
    }
  }

  ngOnDestroy() {
    if (this.lenis) {
      this.lenis.destroy();
    }
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }
}
