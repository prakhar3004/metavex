import { Component, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModalDirective } from '../../directives/modal.directive';
import { SoundService } from '../../services/sound.service';

interface BusinessUseCase {
  id: string;
  category: string;
  title: string;
  challenge: string;
  approach: string;
  steps: string[];
  measures: string;
  tags: string[];
  color: string;
}

@Component({
  selector: 'app-case-studies',
  standalone: true,
  imports: [RouterLink, ModalDirective],
  template: `
    <section id="case-studies" class="relative py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16">
      <div class="text-center max-w-3xl mx-auto mb-8">
        <span class="text-xs font-mono font-bold uppercase tracking-wider text-sunset-rose">Picture a Practical Solution</span>
        <h2 class="font-heading text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mt-3 mb-4">Different Businesses.<br /><span class="text-transparent bg-clip-text bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan">Familiar Customer Challenges.</span></h2>
        <p class="text-sm sm:text-lg text-slate-600 leading-relaxed">See how a clearer website and connected follow-ups could fit your business.</p>
        <p class="mt-4 p-3 sm:p-4 rounded-2xl bg-sky-50 border border-sky-200 text-xs sm:text-sm text-sky-800 leading-relaxed"><strong>Illustrative use cases:</strong> These are example approaches, not completed client projects, testimonials, or measured results.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        @for (item of useCases; track item.id) {
          <article class="relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-5 sm:p-7 shadow-sm flex flex-col">
            <div class="absolute top-0 inset-x-0 h-1" [style.background]="item.color"></div>
            <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span class="text-xs font-mono font-bold text-slate-600">{{ item.category }}</span>
              <span class="text-[10px] font-mono uppercase font-bold text-sunset-rose bg-rose-50 px-2 py-1 rounded-lg">Example Scenario</span>
            </div>
            <h3 class="font-heading font-bold text-lg sm:text-xl text-slate-900 mb-3">{{ item.title }}</h3>
            <p class="text-sm text-slate-600 leading-relaxed mb-4">{{ item.challenge }}</p>
            <div class="p-4 bg-slate-50 border border-slate-200 rounded-2xl mb-4">
              <p class="text-xs font-bold text-slate-900 mb-1">A Possible Starting Point</p>
              <p class="text-sm text-slate-600 leading-relaxed">{{ item.approach }}</p>
            </div>
            <div class="flex flex-wrap gap-2 mb-5">
              @for (tag of item.tags; track tag) {
                <span class="px-2 py-1 rounded-lg bg-white border border-slate-200 text-[11px] text-slate-600 font-mono">{{ tag }}</span>
              }
            </div>
            <button type="button" (click)="openModal(item)" class="mt-auto text-left font-heading font-bold text-sm text-sunset-rose hover:text-electric-violet py-2" [attr.aria-label]="'Explore example: ' + item.title">Explore This Approach →</button>
          </article>
        }
      </div>
      @if (activeModal(); as item) {
        <dialog appModal (dismiss)="closeModal()" aria-labelledby="use-case-title" class="modal-overlay items-center p-3 sm:p-6">
          <div class="modal-panel relative w-full max-w-3xl min-w-0 overflow-y-auto rounded-3xl bg-white p-5 sm:p-9 shadow-2xl" (click)="$event.stopPropagation()">
            <button type="button" aria-label="Close example" (click)="closeModal()" class="absolute top-4 right-4 rounded-full w-11 h-11 bg-slate-100 text-slate-700">✕</button>
            <p class="text-xs font-mono text-sunset-rose font-bold uppercase tracking-wider mb-3 pr-10">Illustrative Use Case · {{ item.category }}</p>
            <h3 id="use-case-title" class="font-heading text-xl sm:text-3xl font-bold text-slate-900 mb-5 pr-8">{{ item.title }}</h3>
            <h4 class="font-heading font-bold text-slate-900 mb-2">The Challenge</h4>
            <p class="text-sm text-slate-600 leading-relaxed mb-5">{{ item.challenge }}</p>
            <h4 class="font-heading font-bold text-slate-900 mb-3">A Possible Setup</h4>
            <ul class="space-y-3 mb-5">
              @for (step of item.steps; track step) {
                <li class="flex items-start gap-3 text-sm text-slate-600 leading-relaxed"><span class="text-sunset-rose font-bold">✓</span><span>{{ step }}</span></li>
              }
            </ul>
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-5">
              <h4 class="text-sm font-bold text-slate-900 mb-1">What to Measure</h4>
              <p class="text-sm text-slate-600 leading-relaxed">{{ item.measures }}</p>
            </div>
            <p class="text-xs text-slate-500 mb-5">The final scope depends on your tools, budget, and requirements. This example does not predict a result.</p>
            <a routerLink="/contact" (click)="closeModal()" class="inline-flex rounded-xl bg-slate-900 text-white px-5 py-3 text-sm font-heading font-bold">Discuss a Similar Challenge →</a>
          </div>
        </dialog>
      }
    </section>
  `
})
export class CaseStudiesComponent {
  public sound = inject(SoundService);
  public activeModal = signal<BusinessUseCase | null>(null);
  public readonly useCases: BusinessUseCase[] = [
    {
      id: 'retail', category: 'Product Brands & Retail', color: '#FF2E63',
      title: 'Help Shoppers Move From Browsing to an Inquiry',
      challenge: 'People ask about sizes, pricing, and delivery across different chats. Your team repeats the same answers while shoppers wait.',
      approach: 'A clear mobile catalog with a direct WhatsApp inquiry and useful product details.',
      steps: ['Organise product information, options, and common questions on mobile-friendly pages.', 'Add product-specific WhatsApp inquiries so your team knows what the shopper is asking about.', 'Plan catalog replies and follow-up reminders around your ordering process.'],
      measures: 'Product inquiries, reply time, completed orders, and questions that still need a manual answer.',
      tags: ['Mobile Catalog', 'WhatsApp Inquiries', 'Follow-Ups']
    },
    {
      id: 'b2b', category: 'Manufacturers & B2B Suppliers', color: '#7C3AED',
      title: 'Make Quote Requests Easier to Handle',
      challenge: 'Buyers need specifications and prices, but inquiries arrive without the details your sales team needs to prepare a quote.',
      approach: 'A searchable product catalog and a short inquiry flow that collects relevant requirements.',
      steps: ['Present specifications and downloadable product information in a clear catalog.', 'Collect the product, quantity, and requirement through a focused inquiry form or WhatsApp flow.', 'Send inquiry details to a shared lead list with an owner and a next action.'],
      measures: 'Complete quote requests, time to prepare a reply, follow-up status, and sales conversations.',
      tags: ['Product Specifications', 'Quote Requests', 'Lead Tracking']
    },
    {
      id: 'appointments', category: 'Clinics & Appointment Businesses', color: '#0284C7',
      title: 'Make Booking Details Easier to Find',
      challenge: 'People need service information, directions, and appointment availability. Staff answer the same questions while managing bookings.',
      approach: 'Clear service pages, a booking inquiry, and reminders linked to your agreed appointment process.',
      steps: ['Explain services, location, and how to request an appointment on a mobile-friendly page.', 'Collect preferred times and route the inquiry to the team for availability confirmation.', 'Plan confirmation and reminder messages with a way to reschedule or speak to staff.'],
      measures: 'Booking inquiries, confirmed appointments, attendance, and staff time spent on routine questions.',
      tags: ['Service Pages', 'Booking Inquiries', 'Reminders']
    },
    {
      id: 'property', category: 'Property & Consultation Businesses', color: '#10B981',
      title: 'Give Your Sales Team More Useful Inquiry Details',
      challenge: 'Inquiries arrive with little context, so your team spends time finding out the budget, location, and requirement before a useful conversation can start.',
      approach: 'A focused landing page and a short inquiry flow that asks the questions your team actually needs.',
      steps: ['Match the landing page to the specific offer promoted in the ad.', 'Ask for the customer’s requirement, preferred location, and budget range where relevant.', 'Share suitable information and route the inquiry to a team member for a personal follow-up.'],
      measures: 'Relevant inquiries, contact rate, scheduled conversations, and follow-up completion.',
      tags: ['Focused Landing Page', 'Inquiry Questions', 'Team Handover']
    }
  ];
  public openModal(item: BusinessUseCase) {
    this.sound.playClick();
    this.activeModal.set(item);
  }
  public closeModal() {
    this.activeModal.set(null);
  }
}
