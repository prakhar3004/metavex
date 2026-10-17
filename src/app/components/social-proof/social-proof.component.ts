import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoundService } from '../../services/sound.service';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  metric: string;
  avatar: string;
  quote: string;
  linkedin: string;
  verified: boolean;
}

@Component({
  selector: 'app-social-proof',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative py-24 overflow-hidden">
      
      <!-- Infinite Brand Partner Marquee - Light Luxury -->
      <div class="mb-20">
        <p class="text-center text-xs font-mono uppercase tracking-widest text-slate-500 font-bold mb-8">
          Trusted By Growing Indian Brands, Manufacturers & Service Businesses 🇮🇳
        </p>

        <!-- Marquee Track Wrapper -->
        <div class="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div class="ticker-track flex items-center gap-12 py-3">
            @for (brand of brands(); track brand.name) {
              <div class="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/85 border border-slate-200 shadow-sm backdrop-blur-md shrink-0 hover:border-sunset-rose/40 hover:shadow-md transition-all">
                <span class="text-lg font-mono font-bold text-sunset-rose">{{ brand.icon }}</span>
                <span class="font-heading font-extrabold text-sm sm:text-base text-slate-800 tracking-wider">
                  {{ brand.name }}
                </span>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                  {{ brand.tag }}
                </span>
              </div>
            }
            <!-- Duplicate for seamless loop -->
            @for (brand of brands(); track brand.name + '-dup') {
              <div class="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/85 border border-slate-200 shadow-sm backdrop-blur-md shrink-0 hover:border-sunset-rose/40 hover:shadow-md transition-all">
                <span class="text-lg font-mono font-bold text-sunset-rose">{{ brand.icon }}</span>
                <span class="font-heading font-extrabold text-sm sm:text-base text-slate-800 tracking-wider">
                  {{ brand.name }}
                </span>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                  {{ brand.tag }}
                </span>
              </div>
            }
          </div>
        </div>
      </div>

      <!-- Testimonials Grid - Luxury Light -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center max-w-2xl mx-auto mb-16">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sunset-rose/10 border border-sunset-rose/25 text-sunset-rose text-xs font-mono font-bold uppercase tracking-wider mb-3">
            Real Client Reviews
          </div>
          <h3 class="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
            What Founders Say About Working With Us
          </h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (item of testimonials(); track item.name) {
            <div class="rounded-3xl bg-white/90 border border-slate-200/90 hover:border-sunset-rose/40 p-6 sm:p-8 backdrop-blur-xl shadow-[0_10px_30px_rgba(15,23,42,0.04)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              
              <div>
                <!-- Metric Badge & LinkedIn Tag -->
                <div class="flex items-center justify-between mb-6">
                  <span class="px-3 py-1 rounded-xl bg-sunset-rose/10 border border-sunset-rose/25 text-sunset-rose text-xs font-mono font-bold">
                    {{ item.metric }}
                  </span>

                  @if (item.verified) {
                    <span class="flex items-center gap-1 text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-semibold">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Verified Client
                    </span>
                  }
                </div>

                <p class="text-slate-600 text-sm sm:text-base leading-relaxed italic mb-6">
                  "{{ item.quote }}"
                </p>
              </div>

              <!-- Author Info -->
              <div class="flex items-center gap-3 pt-4 border-t border-slate-200">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-sunset-rose to-electric-violet p-[2px] shadow-sm">
                  <div class="w-full h-full rounded-full bg-white flex items-center justify-center font-heading font-black text-slate-900 text-xs">
                    {{ item.avatar }}
                  </div>
                </div>
                <div>
                  <h4 class="font-heading font-bold text-sm text-slate-900">{{ item.name }}</h4>
                  <p class="text-xs text-slate-500 font-mono font-medium">{{ item.role }}, {{ item.company }}</p>
                </div>
              </div>

            </div>
          }
        </div>

      </div>

    </section>
  `
})
export class SocialProofComponent {
  public sound = inject(SoundService);

  public brands = signal([
    { name: 'VEDIC WEAR', icon: '✦', tag: 'D2C Fashion' },
    { name: 'APEX TOOLS', icon: '◈', tag: 'B2B Exporter' },
    { name: 'SMILECRAFT', icon: '▲', tag: 'Dental Clinics' },
    { name: 'URBANSPACE', icon: '⬡', tag: 'Real Estate' },
    { name: 'ROYAL HERBS', icon: '❖', tag: 'Ayurveda D2C' },
    { name: 'PRIME LOGISTICS', icon: '●', tag: 'Freight & Supply' }
  ]);

  public testimonials = signal<Testimonial[]>([
    {
      name: 'Rohit Verma',
      role: 'Founder',
      company: 'Vedic Wear (Jaipur)',
      metric: '4.6x ROAS • ₹22L/Month',
      avatar: 'RV',
      quote: 'Our old website took 6+ seconds to open on phones, and customers were dropping off before checkout. MetaVex built an ultra-fast mobile site and set up WhatsApp cart recovery. Our ad ROAS jumped to 4.6x and sales scaled to ₹22 Lakhs/month.',
      linkedin: 'https://linkedin.com',
      verified: true
    },
    {
      name: 'Amitabh Patel',
      role: 'Director',
      company: 'Apex Precision Tools (Ahmedabad)',
      metric: '120+ Verified Inquiries/Mo',
      avatar: 'AP',
      quote: 'Earlier, buyer inquiries would sit in our emails for 2-3 days before someone replied manually. With MetaVex’s WhatsApp catalog bot, buyers get technical specs and quotes in 15 seconds. We closed 3 new domestic distributor contracts in month one.',
      linkedin: 'https://linkedin.com',
      verified: true
    },
    {
      name: 'Dr. Neha Sharma',
      role: 'Clinic Director',
      company: 'SmileCraft Dental (Bengaluru)',
      metric: '65% Fewer No-Shows',
      avatar: 'NS',
      quote: 'Our reception staff used to spend hours every day making reminder calls. MetaVex automated our WhatsApp appointment bookings and reminders. Patient no-shows dropped by 65%, and the whole clinic runs without any front desk panic.',
      linkedin: 'https://linkedin.com',
      verified: true
    }
  ]);
}
