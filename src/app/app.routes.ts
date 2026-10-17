import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(module => module.HomeComponent),
    title: 'MetaVex Digital | Websites, Meta Ads & WhatsApp Automation',
    data: { description: "Make your business easier to find, understand, and contact with websites, Meta ads, and WhatsApp workflows from MetaVex Digital." }
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services-page/services-page.component').then(module => module.ServicesPageComponent),
    title: 'Digital Services | Websites, Ads & Automation | MetaVex',
    data: { description: "Explore website development, Facebook and Instagram ads, WhatsApp follow-ups, social content, and business automation for your needs." }
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
