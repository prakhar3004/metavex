import { Component, Output, EventEmitter, signal, computed, inject } from '@angular/core';
import { SoundService } from '../../services/sound.service';

export interface CalculatorMetrics {
  monthlyRevenue: number;
  manualHours: number;
  monthlyAdSpend: number;
  revenueChangePercent: number;
  automationSharePercent: number;
  projectedExtraRevenue: number;
  hoursSavedMonthly: number;
  annualRevenueChange: number;
}

type PlannerInput = 'monthlyRevenue' | 'manualHours' | 'monthlyAdSpend' | 'revenueChangePercent' | 'automationSharePercent';

@Component({
  selector: 'app-roi-calculator',
  standalone: true,
  templateUrl: './roi-calculator.component.html'
})
export class RoiCalculatorComponent {
  public sound = inject(SoundService);
  @Output() claimBlueprint = new EventEmitter<CalculatorMetrics>();

  // Example baselines. Scenario assumptions start at zero and are chosen by the visitor.
  public monthlyRevenue = signal(100000);
  public manualHours = signal(10);
  public monthlyAdSpend = signal(10000);
  public revenueChangePercent = signal(0);
  public automationSharePercent = signal(0);

  public projectedExtraRevenue = computed(() => Math.round(this.monthlyRevenue() * this.revenueChangePercent() / 100) || 0);
  public hoursSavedMonthly = computed(() => Math.round(this.manualHours() * 4 * this.automationSharePercent() / 100));
  public annualRevenueChange = computed(() => this.projectedExtraRevenue() * 12);
  public annualAdSpend = computed(() => this.monthlyAdSpend() * 12);

  public updateInput(field: PlannerInput, event: Event) {
    const value = Number((event.target as HTMLInputElement).value);
    if (!Number.isFinite(value)) return;
    const limits: Record<PlannerInput, [number, number]> = {
      monthlyRevenue: [0, 5000000], manualHours: [0, 60], monthlyAdSpend: [0, 1000000],
      revenueChangePercent: [-25, 50], automationSharePercent: [0, 100]
    };
    const [minimum, maximum] = limits[field];
    this[field].set(Math.max(minimum, Math.min(maximum, value)));
    this.sound.playTick();
  }

  public formatCurrency(value: number): string {
    return value.toLocaleString('en-IN');
  }

  public formatChange(value: number): string {
    return `${value < 0 ? '-' : '+'}₹${Math.abs(value).toLocaleString('en-IN')}`;
  }

  public onClaimBlueprint() {
    this.claimBlueprint.emit({
      monthlyRevenue: this.monthlyRevenue(),
      manualHours: this.manualHours(),
      monthlyAdSpend: this.monthlyAdSpend(),
      revenueChangePercent: this.revenueChangePercent(),
      automationSharePercent: this.automationSharePercent(),
      projectedExtraRevenue: this.projectedExtraRevenue(),
      hoursSavedMonthly: this.hoursSavedMonthly(),
      annualRevenueChange: this.annualRevenueChange()
    });
  }
}
