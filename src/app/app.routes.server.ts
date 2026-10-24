import { RenderMode, ServerRoute } from '@angular/ssr';
import { SERVICE_PAGES } from './pages/service-detail/service-pages.data';

export const serverRoutes: ServerRoute[] = [
  ...['', 'services', 'comparison', 'calculator', 'case-studies', 'process', 'contact']
    .map(path => ({ path, renderMode: RenderMode.Prerender as const })),
  ...SERVICE_PAGES.map(page => ({ path: 'services/' + page.slug, renderMode: RenderMode.Prerender as const })),
  { path: '**', renderMode: RenderMode.Client }
];
