import { Injectable } from '@angular/core';
import { CalculatorMetrics } from '../components/roi-calculator/roi-calculator.component';

export interface LeadSubmission {
  leadId: string;
  name: string;
  business: string;
  phone: string;
  email: string;
  challenge: string;
  stage: string;
  requirements: string;
  sourcePage: string;
  websiteConfirmation: string;
  metrics: CalculatorMetrics | null;
}

@Injectable({ providedIn: 'root' })
export class LeadCaptureService {
  public async saveLead(lead: LeadSubmission): Promise<string> {
    const response = await fetch('/api/leads', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead), signal: AbortSignal.timeout(20_000)
    });
    const receipt = await response.json();
    if (!response.ok || receipt?.ok !== true || receipt.persisted !== true || receipt.leadId !== lead.leadId) {
      throw new Error(response.status === 429
        ? 'Several requests have been sent recently. Please wait a little, or contact us directly.'
        : 'We could not save your request right now. Your details are still here. Please retry or contact us directly.');
    }
    return receipt.leadId;
  }
}
