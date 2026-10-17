import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { OnboardingWizardComponent } from './components/onboarding-wizard/onboarding-wizard.component';
import { CustomCursorComponent } from './components/custom-cursor/custom-cursor.component';
import { CalculatorMetrics } from './components/roi-calculator/roi-calculator.component';
import { SoundService } from './services/sound.service';

interface RoutedLeadSource {
  openLeadModal?: EventEmitter<CalculatorMetrics | undefined>;
  claimBlueprint?: EventEmitter<CalculatorMetrics>;
}

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, OnboardingWizardComponent, CustomCursorComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnDestroy {
  private readonly sound = inject(SoundService);
  public readonly showLeadModal = signal(false);
  public readonly prefilledMetrics = signal<CalculatorMetrics | null>(null);
  private routeSubscriptions = new Subscription();

  public openLeadModal(metrics?: CalculatorMetrics) {
    this.sound.playChime();
    this.prefilledMetrics.set(metrics ?? null);
    this.showLeadModal.set(true);
  }

  public closeLeadModal() {
    this.showLeadModal.set(false);
  }

  public onRouteActivate(component: RoutedLeadSource) {
    this.onRouteDeactivate();
    if (component.openLeadModal) {
      this.routeSubscriptions.add(component.openLeadModal.subscribe(metrics => this.openLeadModal(metrics)));
    }
    if (component.claimBlueprint) {
      this.routeSubscriptions.add(component.claimBlueprint.subscribe(metrics => this.openLeadModal(metrics)));
    }
  }

  public onRouteDeactivate() {
    this.routeSubscriptions.unsubscribe();
    this.routeSubscriptions = new Subscription();
    this.closeLeadModal();
  }

  ngOnDestroy() {
    this.routeSubscriptions.unsubscribe();
  }
}
