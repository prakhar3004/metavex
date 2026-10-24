import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(module => module.HomeComponent),
    title: 'MetaVex Digital | Websites, Meta Ads & WhatsApp Automation',
    data: { description: "MetaVex Digital helps Indian businesses get found and contacted with fast websites, Facebook & Instagram ads, and WhatsApp follow-up automation." }
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services-page/services-page.component').then(module => module.ServicesPageComponent),
    title: 'Digital Services | Websites, Ads & Automation | MetaVex',
    data: { description: "Explore website development, Facebook and Instagram ads, WhatsApp follow-ups, social content, and business automation for your needs." }
  },
  {
    path: 'services/website-development',
    loadComponent: () => import('./pages/service-detail/service-detail-page.component').then(module => module.ServiceDetailPageComponent),
    title: 'Website Development Services in India | MetaVex Digital',
    data: { service: 'website-development', description: "Mobile-first website development for Indian businesses: clear service pages, WhatsApp and call inquiries, payments, and fast, search-ready builds." }
  },
  {
    path: 'services/meta-ads',
    loadComponent: () => import('./pages/service-detail/service-detail-page.component').then(module => module.ServiceDetailPageComponent),
    title: 'Facebook & Instagram Ads Agency (Meta Ads) | MetaVex',
    data: { service: 'meta-ads', description: "Facebook and Instagram ads management for Indian businesses: campaign planning, pixel tracking, creative testing, and clear reports on inquiries." }
  },
  {
    path: 'services/whatsapp-automation',
    loadComponent: () => import('./pages/service-detail/service-detail-page.component').then(module => module.ServiceDetailPageComponent),
    title: 'WhatsApp Business Automation & API Setup | MetaVex',
    data: { service: 'whatsapp-automation', description: "Automate WhatsApp replies, catalog sharing, lead collection, and follow-ups, with WhatsApp Business API setup for Indian businesses." }
  },
  {
    path: 'services/social-media-content',
    loadComponent: () => import('./pages/service-detail/service-detail-page.component').then(module => module.ServiceDetailPageComponent),
    title: 'Social Media Content & Instagram Reels | MetaVex',
    data: { service: 'social-media-content', description: "Instagram Reels, posts, and carousels planned around your customers: social media content that explains your products and invites inquiries." }
  },
  {
    path: 'services/business-automation',
    loadComponent: () => import('./pages/service-detail/service-detail-page.component').then(module => module.ServiceDetailPageComponent),
    title: 'Business Workflow Automation & Lead Tracking | MetaVex',
    data: { service: 'business-automation', description: "Connect website forms, WhatsApp, Google Sheets, and CRMs so leads, orders, and follow-ups stay organised. Business automation for Indian teams." }
  },
  {
    path: 'comparison',
    loadComponent: () => import('./pages/comparison-page/comparison-page.component').then(module => module.ComparisonPageComponent),
    title: 'Customer Journey Gaps | Website, Ads & Follow-Ups | MetaVex',
    data: { description: "Find gaps in your website, advertising, customer replies, and follow-ups. Explore practical ways to connect the customer journey." }
  },
  {
    path: 'calculator',
    loadComponent: () => import('./pages/calculator-page/calculator-page.component').then(module => module.CalculatorPageComponent),
    title: 'Growth Planner | Revenue & Time Scenarios | MetaVex',
    data: { description: "Explore revenue and time scenarios using your own assumptions. See transparent formulas in the MetaVex growth planner." }
  },
  {
    path: 'case-studies',
    loadComponent: () => import('./pages/case-studies-page/case-studies-page.component').then(module => module.CaseStudiesPageComponent),
    title: 'Example Business Solutions & Use Cases | MetaVex',
    data: { description: "Explore illustrative website and automation use cases for retailers, suppliers, appointment businesses, and property teams." }
  },
  {
    path: 'process',
    loadComponent: () => import('./pages/process-page/process-page.component').then(module => module.ProcessPageComponent),
    title: 'Our Process | Plan, Build, Test & Launch | MetaVex',
    data: { description: "Understand how MetaVex plans, builds, tests, and hands over a project, with scope and milestones agreed for your business." }
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact-page/contact-page.component').then(module => module.ContactPageComponent),
    title: 'Contact MetaVex Digital | Discuss Your Project',
    data: { description: "Discuss your website, ads, or automation project with MetaVex Digital. Send a brief, WhatsApp +91 9026231351, or email our team." }
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(module => module.NotFoundComponent),
    title: 'Page Not Found | METAVEX DIGITAL',
    data: { description: 'This page could not be found. Explore MetaVex services or contact our team for help.', robots: 'noindex,follow' }
  }
];
