import { Component, signal, inject } from '@angular/core';
import { SoundService } from '../../services/sound.service';

@Component({
  selector: 'app-before-after',
  standalone: true,
  template: `
    <section id="comparison" class="relative py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16">
      <div class="text-center max-w-3xl mx-auto mb-8">
        <span class="text-xs font-mono text-sunset-rose uppercase tracking-wider font-bold">Connect the Customer Journey</span>
        <h2 class="font-heading text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mt-3 mb-4">From “I’m Interested”<br /><span class="text-transparent bg-clip-text bg-gradient-to-r from-sunset-rose via-electric-violet to-cyber-cyan">to “Let’s Talk.”</span></h2>
        <p class="text-sm sm:text-lg text-slate-600 leading-relaxed">Make it easier for people to understand your offer, ask a question, and get a useful response. Start with the gap that needs the most attention.</p>
      </div>
      <div class="flex justify-center mb-6">
        <div class="inline-flex flex-wrap justify-center gap-1 p-1.5 bg-slate-100 rounded-2xl border border-slate-200" role="group" aria-label="Compare customer journey approaches">
          @for (view of views; track view.id) {
            <button type="button" (click)="setView(view.id)" [attr.aria-pressed]="currentView() === view.id" [class.bg-white]="currentView() === view.id" [class.shadow-sm]="currentView() === view.id" class="px-3 sm:px-5 py-2.5 rounded-xl font-heading font-bold text-xs sm:text-sm text-slate-800 transition-all">{{ view.label }}</button>
          }
        </div>
      </div>
      <div class="grid grid-cols-1 gap-5 sm:gap-6" [class.lg:grid-cols-2]="currentView() === 'compare'">
        @if (currentView() !== 'metavex') {
          <div class="bg-white border border-rose-200 rounded-3xl p-5 sm:p-8 shadow-sm">
            <p class="text-xs font-mono uppercase tracking-wider text-rose-600 font-bold mb-2">Common Gaps</p>
            <h3 class="font-heading text-xl sm:text-2xl font-bold text-slate-900 mb-5">When Every Step Takes Extra Effort</h3>
            <div class="space-y-4">
              @for (item of comparisons; track item.area) {
                <div class="p-4 rounded-2xl bg-rose-50/50 border border-rose-100">
                  <h4 class="text-sm font-heading font-bold text-slate-900 mb-1">{{ item.area }}</h4>
                  <p class="text-sm text-slate-600 leading-relaxed">{{ item.gap }}</p>
                </div>
              }
            </div>
          </div>
        }
        @if (currentView() !== 'traditional') {
          <div class="bg-white border border-sky-200 rounded-3xl p-5 sm:p-8 shadow-sm">
            <p class="text-xs font-mono uppercase tracking-wider text-sky-700 font-bold mb-2">What We Can Help You Build</p>
            <h3 class="font-heading text-xl sm:text-2xl font-bold text-slate-900 mb-5">A Clearer Path to a Conversation</h3>
            <div class="space-y-4">
              @for (item of comparisons; track item.area) {
                <div class="p-4 rounded-2xl bg-sky-50/50 border border-sky-100">
                  <h4 class="text-sm font-heading font-bold text-slate-900 mb-1">{{ item.area }}</h4>
                  <p class="text-sm text-slate-600 leading-relaxed">{{ item.approach }}</p>
                </div>
              }
            </div>
          </div>
        }
      </div>
      <p class="text-center text-xs sm:text-sm text-slate-500 mt-5">Example workflows. Your setup and scope will depend on your business needs.</p>
    </section>
  `
})
export class BeforeAfterComponent {
  public sound = inject(SoundService);
  public currentView = signal<'compare' | 'metavex' | 'traditional'>('compare');
  public readonly views: { id: 'compare' | 'metavex' | 'traditional'; label: string }[] = [
    { id: 'compare', label: 'Side by Side' },
    { id: 'traditional', label: 'Common Gaps' },
    { id: 'metavex', label: 'A Better Setup' }
  ];
  public readonly comparisons = [
    { area: 'Website', gap: 'Visitors have to search for what you offer, what it includes, and how to contact you.', approach: 'Mobile-friendly pages that explain your offer and make an inquiry easy to start.' },
    { area: 'Advertising', gap: 'Clicks and engagement are visible, but their connection to inquiries or sales is unclear.', approach: 'Campaign goals, audience tests, and suitable tracking to help you review business outcomes.' },
    { area: 'Customer Replies', gap: 'Common questions wait in a queue while your team handles the day’s work.', approach: 'Planned replies and catalog sharing, with a clear handover to your team when needed.' },
    { area: 'Follow-Ups', gap: 'Lead details are spread across chats and spreadsheets, making the next action hard to track.', approach: 'A shared lead view and reminders that help your team see who needs a follow-up.' }
  ];
  public setView(view: 'compare' | 'metavex' | 'traditional') {
    this.sound.playClick();
    this.currentView.set(view);
  }
}
