import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28">
      <p class="font-mono text-sm font-bold text-sunset-rose">404 · Page Not Found</p>
      <h1 class="mt-4 font-heading text-3xl font-extrabold text-slate-900 sm:text-5xl">Let’s Get You to the Right Place.</h1>
      <p class="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-600">This link may be incomplete or the page may have moved. Explore our services or tell us what you are looking for.</p>
      <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <a routerLink="/services" class="rounded-xl bg-slate-900 px-6 py-3 font-heading text-sm font-bold text-white">Explore Services</a>
        <a routerLink="/contact" class="rounded-xl border border-slate-200 bg-white px-6 py-3 font-heading text-sm font-bold text-slate-900">Contact Our Team</a>
      </div>
    </section>
  `
})
export class NotFoundComponent {}
