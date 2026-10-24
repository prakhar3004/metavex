import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { SITE } from '../site.config';
import { FAQS } from '../components/faq/faq.data';
import { SERVICE_PAGES, ServicePage } from '../pages/service-detail/service-pages.data';

@Injectable()
export class PageTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot) ?? 'METAVEX DIGITAL';
    this.title.setTitle(title);
    let page = snapshot.root;
    while (page.firstChild) page = page.firstChild;
    const description = (page.data['description'] as string | undefined) ?? '';
    const path = snapshot.url.split(/[?#]/)[0].replace(/\/$/, '') || '/';
    const url = SITE.url + (path === '/' ? '/' : path);
    const noindex = !!page.data['robots'];
    const service = SERVICE_PAGES.find(item => item.slug === page.data['service']);
    for (const name of ['description', 'twitter:description']) this.meta.updateTag({ name, content: description });
    for (const [property, content] of Object.entries({
      'og:description': description, 'og:title': title, 'og:url': url,
      'og:type': 'website', 'og:site_name': SITE.name, 'og:locale': 'en_IN',
      'og:image': SITE.url + SITE.socialImage.path, 'og:image:alt': SITE.socialImage.alt,
      'og:image:width': String(SITE.socialImage.width), 'og:image:height': String(SITE.socialImage.height)
    })) this.meta.updateTag({ property, content });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:image', content: SITE.url + SITE.socialImage.path });
    this.meta.updateTag({ name: 'twitter:image:alt', content: SITE.socialImage.alt });
    this.meta.updateTag({ name: 'robots', content: noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' });

    let canonical = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (noindex) canonical?.remove();
    else {
      if (!canonical) {
        canonical = this.document.createElement('link');
        canonical.rel = 'canonical';
        this.document.head.appendChild(canonical);
      }
      canonical.href = url;
    }
    this.updateStructuredData(title, description, path, url, noindex, service);
  }

  private updateStructuredData(title: string, description: string, path: string, url: string, noindex: boolean, service?: ServicePage): void {
    let script = this.document.getElementById('site-structured-data');
    if (noindex) { script?.remove(); return; }
    const organization = SITE.url + '/#organization';
    const website = SITE.url + '/#website';
    const graph: Record<string, unknown>[] = [
      {
        '@type': 'Organization', '@id': organization, name: SITE.name, alternateName: SITE.alternateNames,
        url: SITE.url + '/', description: SITE.description,
        logo: { '@type': 'ImageObject', url: SITE.url + '/logo.png', width: 512, height: 512 },
        image: SITE.url + SITE.socialImage.path,
        email: SITE.email, telephone: SITE.phone,
        areaServed: { '@type': 'Country', name: 'India' }, knowsAbout: SERVICE_PAGES.map(item => item.name),
        contactPoint: { '@type': 'ContactPoint', telephone: SITE.phone, email: SITE.email, contactType: 'customer enquiries', areaServed: 'IN' },
        ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {})
      },
      {
        '@type': 'WebSite', '@id': website, url: SITE.url + '/', name: SITE.name, alternateName: SITE.alternateNames,
        description: SITE.description, publisher: { '@id': organization }, inLanguage: SITE.language
      },
      {
        '@type': path === '/contact' ? 'ContactPage' : path === '/case-studies' ? 'CollectionPage' : 'WebPage',
        '@id': url + '#webpage', url, name: title, description, inLanguage: SITE.language,
        isPartOf: { '@id': website }, about: { '@id': organization },
        ...(path === '/' ? {} : { breadcrumb: { '@id': url + '#breadcrumb' } })
      }
    ];
    if (path !== '/') {
      const names: Record<string, string> = { '/services': 'Services', '/comparison': 'Customer Journey', '/calculator': 'Growth Planner', '/case-studies': 'Illustrative Use Cases', '/process': 'Our Process', '/contact': 'Contact' };
      const trail = [
        { name: 'Home', item: SITE.url + '/' },
        ...(service ? [{ name: 'Services', item: SITE.url + '/services' }] : []),
        { name: service?.label ?? names[path] ?? title, item: url }
      ];
      graph.push({ '@type': 'BreadcrumbList', '@id': url + '#breadcrumb', itemListElement: trail.map((crumb, index) => ({ '@type': 'ListItem', position: index + 1, ...crumb })) });
    }
    if (service) graph.push({
      '@type': 'Service', '@id': url + '#service', name: service.label, serviceType: service.name, description, url,
      provider: { '@id': organization }, areaServed: { '@type': 'Country', name: 'India' }
    });
    if (path === '/' || path === '/services') graph.push({
      '@type': 'OfferCatalog', '@id': url + '#services', name: 'MetaVex Digital services',
      itemListElement: SERVICE_PAGES.map(item => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: item.name, provider: { '@id': organization }, url: SITE.url + '/services/' + item.slug } }))
    });
    // These answers are rendered by FaqComponent on Home and Contact, and by each service detail page.
    const faqs = service?.faqs ?? (path === '/' || path === '/contact' ? FAQS : null);
    if (faqs) graph.push({
      '@type': 'FAQPage', '@id': url + '#faq', isPartOf: { '@id': url + '#webpage' },
      mainEntity: faqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } }))
    });
    if (!script) {
      script = this.document.createElement('script');
      script.id = 'site-structured-data';
      script.setAttribute('type', 'application/ld+json');
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
  }
}
