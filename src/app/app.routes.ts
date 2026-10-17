import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServicesPageComponent } from './pages/services-page/services-page.component';
import { ComparisonPageComponent } from './pages/comparison-page/comparison-page.component';
import { CalculatorPageComponent } from './pages/calculator-page/calculator-page.component';
import { CaseStudiesPageComponent } from './pages/case-studies-page/case-studies-page.component';
import { ProcessPageComponent } from './pages/process-page/process-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent, 
    title: 'METAVEX DIGITAL — Web Development, Meta Ads & Automation for Indian Businesses' 
  },
  { 
    path: 'services', 
    component: ServicesPageComponent, 
    title: 'Services — High-Speed Web, Meta Ads & WhatsApp Automation | METAVEX' 
  },
  { 
    path: 'comparison', 
    component: ComparisonPageComponent, 
    title: 'Comparison — The Cost of Manual Chaos vs MetaVex Scaling | METAVEX' 
  },
  { 
    path: 'calculator', 
    component: CalculatorPageComponent, 
    title: 'ROI Calculator — Simulate Revenue Lift & Hours Saved | METAVEX' 
  },
  { 
    path: 'case-studies', 
    component: CaseStudiesPageComponent, 
    title: 'Case Studies — Verified Client Proof & Implementation Audits | METAVEX' 
  },
  { 
    path: 'process', 
    component: ProcessPageComponent, 
    title: 'Process — 30-Day MetaVex Transformation Pipeline | METAVEX' 
  },
  { 
    path: 'contact', 
    component: ContactPageComponent, 
    title: 'Contact — Direct WhatsApp & Growth Audit | METAVEX' 
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];
