export const SITE = {
  url: 'https://metavex.digital',
  name: 'MetaVex Digital',
  phone: '+919026231351',
  email: 'metavexdigital@gmail.com',
  language: 'en-IN',
  // Other names people search for. Google reads these from WebSite/Organization schema for the site name.
  alternateNames: ['MetaVex', 'Metavex Digital', 'metavex.digital'],
  description: 'MetaVex Digital is an Indian digital services startup that builds websites, runs Facebook and Instagram ads, and sets up WhatsApp follow-ups and business automation.',
  socialImage: { path: '/og-image.png', width: 1200, height: 630, alt: 'MetaVex Digital: websites, Meta ads and WhatsApp automation' },
  // Add only official profiles the owner controls (Instagram, LinkedIn, Facebook, Google Business Profile, etc.).
  sameAs: [] as string[]
} as const;

// Service names, pages and FAQs live in src/app/pages/service-detail/service-pages.data.ts.
