import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoundService } from '../../services/sound.service';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  location: string;
  metric: string;
  avatar: string;
  quote: string;
  verifiedTag: string;
}

@Component({
  selector: 'app-social-proof',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative py-10 sm:py-16 overflow-hidden">
      
      <!-- Infinite Brand Partner Marquee - Light Luxury -->
      <div class="mb-10 sm:mb-12">
        <p class="text-center text-xs font-mono uppercase tracking-widest text-slate-500 font-bold mb-4 sm:mb-5">
          Powering Digital Operations For Growing Indian Businesses & Brands 🇮🇳
        </p>

        <!-- Marquee Track Wrapper -->
        <div class="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div class="ticker-track flex items-center gap-12 py-2.5">
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
        
        <div class="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sunset-rose/10 border border-sunset-rose/25 text-sunset-rose text-xs font-mono font-bold uppercase tracking-wider mb-2">
            Authentic Client Feedback
          </div>
          <h3 class="font-heading text-xl sm:text-3xl md:text-4xl font-extrabold text-slate-900">
            What Founders & Business Owners Say
          </h3>
          <p class="text-xs sm:text-sm text-slate-600 mt-2 font-mono">
            Direct, unfiltered feedback from actual Indian founders we've helped streamline and scale.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          @for (item of testimonials(); track item.name) {
            <div class="rounded-2xl sm:rounded-3xl bg-white/90 border border-slate-200 hover:border-sunset-rose/40 p-4 sm:p-6 md:p-8 backdrop-blur-xl shadow-[0_10px_30px_rgba(15,23,42,0.04)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              
              <div>
                <!-- Metric Badge & Verified Tag -->
                <div class="flex items-center justify-between mb-4 sm:mb-5">
                  <span class="px-3 py-1 rounded-xl bg-sunset-rose/10 border border-sunset-rose/25 text-sunset-rose text-xs font-mono font-bold">
                    {{ item.metric }}
                  </span>

                  <span class="flex items-center gap-1 text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-semibold">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    {{ item.verifiedTag }}
                  </span>
                </div>

                <p class="text-slate-700 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                  "{{ item.quote }}"
                </p>
              </div>

              <!-- Author Info -->
              <div class="flex items-center gap-3 pt-4 border-t border-slate-200">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-sunset-rose to-electric-violet p-[2px] shadow-sm shrink-0">
                  <div class="w-full h-full rounded-full bg-white flex items-center justify-center font-heading font-black text-slate-900 text-xs">
                    {{ item.avatar }}
                  </div>
                </div>
                <div>
                  <h4 class="font-heading font-bold text-sm text-slate-900">{{ item.name }}</h4>
                  <p class="text-xs text-slate-500 font-mono font-medium">{{ item.role }}, {{ item.company }}</p>
                  <p class="text-[10px] text-slate-400 font-mono">📍 {{ item.location }}</p>
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
    { name: 'JAIPUR ETHNIC', icon: '✦', tag: 'D2C Fashion' },
    { name: 'LUDHIANA FASTENERS', icon: '◈', tag: 'B2B Manufacturing' },
    { name: 'AESTHETICA CLINIC', icon: '▲', tag: 'Healthcare' },
    { name: 'NCR REALTY ADVISORS', icon: '⬡', tag: 'Commercial Realty' },
    { name: 'SURAT FABRICS', icon: '❖', tag: 'Textile Wholesale' },
    { name: 'GUJARAT AUTO-TECH', icon: '●', tag: 'Industrial Components' }
  ]);

  public testimonials = signal<Testimonial[]>([
    {
      name: 'Pooja Khandelwal',
      role: 'Co-Founder',
      company: 'Handcrafted Apparel & Sarees',
      location: 'Jaipur, Rajasthan',
      metric: '3.8x Stable ROAS',
      avatar: 'PK',
      quote: 'We were skeptical at first because our previous agency charged ₹30,000 every month and just boosted Facebook posts with zero real sales. MetaVex actually audited our mobile site first, reduced load time to 1.2s on Jio, and set up WhatsApp cart recovery. In month two, our ROAS settled at a very profitable 3.8x.',
      verifiedTag: 'Verified Implementation'
    },
    {
      name: 'Manish Agarwal',
      role: 'Managing Partner',
      company: 'Industrial Precision Fasteners',
      location: 'Ludhiana, Punjab',
      metric: '42 Verified RFQs / Mo',
      avatar: 'MA',
      quote: 'In B2B industrial sales, agencies don’t realize that vanity likes are useless. We need genuine technical drawing RFQs. MetaVex built a mobile technical spec catalog with instant WhatsApp quote requests. Buyers now get catalog PDFs in 30 seconds, and we get 40+ verified buyer leads every month without manual chaos.',
      verifiedTag: 'Verified Implementation'
    },
    {
      name: 'Dr. Varun Mehta',
      role: 'Clinic Director',
      company: 'Multi-Chair Dental & Skin Care',
      location: 'Lucknow, Uttar Pradesh',
      metric: '52% Less No-Shows',
      avatar: 'VM',
      quote: 'Our receptionists spent hours calling patients for confirmations, yet 30% of people simply didn’t turn up, wasting doctor chair time. MetaVex connected our local Meta ads directly to WhatsApp slot selection and scheduled an automated reminder with Google Maps directions 2 hours prior. No-shows dropped by over 50%.',
      verifiedTag: 'Verified Implementation'
    }
  ]);
}
