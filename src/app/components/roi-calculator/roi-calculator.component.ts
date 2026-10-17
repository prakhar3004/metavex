import { Component, Output, EventEmitter, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import confetti from 'canvas-confetti';
import { SoundService } from '../../services/sound.service';

export interface CalculatorMetrics {
  monthlyRevenue: number;
  manualHours: number;
  monthlyAdSpend: number;
  projectedExtraRevenue: number;
  hoursSavedMonthly: number;
  projectedRoas: number;
  annualValueUnlocked: number;
}

@Component({
  selector: 'app-roi-calculator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roi-calculator.component.html'
})
export class RoiCalculatorComponent {
  public sound = inject(SoundService);

  @Output() claimBlueprint = new EventEmitter<CalculatorMetrics>();

  // State Signals (in INR)
  public monthlyRevenue = signal<number>(500000); // 5 Lakhs
  public manualHours = signal<number>(20); // 20 hours/week
  public monthlyAdSpend = signal<number>(50000); // 50k INR

  // Computed Values
  public projectedExtraRevenue = computed(() => {
    const rev = this.monthlyRevenue();
    const adSpend = this.monthlyAdSpend();
    // 25% lift from faster website & instant WhatsApp response + ad ROAS improvement
    const organicLift = rev * 0.22;
    const adLift = adSpend * 1.5;
    return Math.round(organicLift + adLift);
  });

  public hoursSavedMonthly = computed(() => {
    // 70% of manual repetitive tasks saved via WhatsApp bot and workflow sync
    return Math.round(this.manualHours() * 4 * 0.70);
  });

  public projectedRoas = computed(() => {
    const spend = this.monthlyAdSpend();
    if (spend < 30000) return 3.6;
    if (spend < 100000) return 4.2;
    if (spend < 300000) return 4.8;
    return 5.2;
  });

  public annualValueUnlocked = computed(() => {
    const monthlyExtra = this.projectedExtraRevenue();
    // Realistic Indian labor hourly cost value ~₹350/hr
    const hourlyValue = 350;
    const savedLaborYearly = this.hoursSavedMonthly() * 12 * hourlyValue;
    return (monthlyExtra * 12) + savedLaborYearly;
  });

  public onRevenueChange(e: Event) {
    const val = Number((e.target as HTMLInputElement).value);
    this.monthlyRevenue.set(val);
    this.sound.playTick();
  }

  public onHoursChange(e: Event) {
    const val = Number((e.target as HTMLInputElement).value);
    this.manualHours.set(val);
    this.sound.playTick();
  }

  public onAdSpendChange(e: Event) {
    const val = Number((e.target as HTMLInputElement).value);
    this.monthlyAdSpend.set(val);
    this.sound.playTick();
  }

  public formatCurrency(num: number): string {
    return num.toLocaleString('en-IN');
  }

  public onClaimBlueprint() {
    this.sound.playChime();

    // Trigger celebration confetti - Cyber Sunset colors
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF2E63', '#8B5CF6', '#00F0FF', '#FFFFFF']
      });
    } catch {
      // fallback
    }

    const payload: CalculatorMetrics = {
      monthlyRevenue: this.monthlyRevenue(),
      manualHours: this.manualHours(),
      monthlyAdSpend: this.monthlyAdSpend(),
      projectedExtraRevenue: this.projectedExtraRevenue(),
      hoursSavedMonthly: this.hoursSavedMonthly(),
      projectedRoas: this.projectedRoas(),
      annualValueUnlocked: this.annualValueUnlocked()
    };

    this.claimBlueprint.emit(payload);
  }
}
