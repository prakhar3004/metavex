import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  ...['', 'services', 'comparison', 'calculator', 'case-studies', 'process', 'contact']
    .map(path => ({ path, renderMode: RenderMode.Prerender as const })),
  { path: '**', renderMode: RenderMode.Client }
];
