// Guide content, Article schema and FAQ schema all read from here.
// Keep facts current: update `updated` and the sitemap lastmod whenever a guide changes, and cite official sources.
export interface GuideSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  table?: { headers: string[]; rows: string[][] };
}

export interface Guide {
  slug: string;
  title: string;
  summary: string;
  published: string;
  updated: string;
  readMinutes: number;
  keyTakeaways: string[];
  sections: GuideSection[];
  faqs: { question: string; answer: string }[];
  sources: { label: string; url: string }[];
  relatedService: string;
}

export const GUIDES: readonly Guide[] = [
  {
    slug: 'whatsapp-business-app-vs-api',
    title: 'WhatsApp Business App vs WhatsApp Business API: Which Does Your Business Need?',
    summary: 'Use the free WhatsApp Business app if one or two people reply to customers from a phone and the number of chats is manageable. Move to the WhatsApp Business Platform (the API) when several team members need one number, you want automated replies and flows, inquiries must reach your CRM or Google Sheets, or you need approved template messages such as order updates and reminders. The API is paid per delivered message under Meta\'s pricing, plus any provider or setup costs.',
    published: '2026-10-24',
    updated: '2026-10-24',
    readMinutes: 7,
    keyTakeaways: [
      'The WhatsApp Business app is free and runs on a phone, with optional linked devices such as WhatsApp Web.',
      'The WhatsApp Business Platform (API) has no app of its own. You use it through Meta\'s Cloud API, a provider, or a custom integration.',
      'Since 1 July 2025, Meta charges per delivered template message instead of per conversation.',
      'From 1 October 2026, utility templates sent in reply to customers are charged, and each business number gets 1,000 free service messages a month.',
      'Both options require you to follow WhatsApp\'s Business Messaging Policy, including customer opt-in for messages you start.'
    ],
    sections: [
      {
        heading: 'What is the WhatsApp Business app?',
        paragraphs: [
          'The WhatsApp Business app is a free app from Meta for small businesses. You install it on an Android phone or iPhone, register your business number, and reply to customers yourself. It includes a business profile, a product or service catalog, quick replies, greeting and away messages, and labels to organise chats. The same account can also be used on linked devices such as WhatsApp Web.'
        ]
      },
      {
        heading: 'What is the WhatsApp Business Platform (API)?',
        paragraphs: [
          'The WhatsApp Business Platform, usually called the WhatsApp Business API, is Meta\'s service for businesses that need automation or a team inbox. There is no separate app to download. Your number connects to software, either directly through Meta\'s Cloud API or through a business solution provider. That software then powers a shared inbox, chatbots, automated notifications, and integrations with tools such as CRMs and Google Sheets.'
        ]
      },
      {
        heading: 'WhatsApp Business app vs API: side-by-side comparison',
        table: {
          headers: ['', 'WhatsApp Business app', 'WhatsApp Business Platform (API)'],
          rows: [
            ['Cost', 'Free to download and use', 'Paid per delivered message under Meta\'s pricing, plus any provider or setup fees'],
            ['Who replies', 'You or your team from the phone and linked devices', 'Several team members through a shared inbox or software'],
            ['Automation', 'Greeting and away messages, quick replies', 'Chatbots, flows, automated notifications and reminders'],
            ['Messaging customers first', 'Broadcast lists, delivered only to contacts who saved your number', 'Approved message templates sent to customers who opted in'],
            ['Integrations', 'Very limited', 'CRM, Google Sheets, e-commerce, payment and website integrations'],
            ['Setup', 'Minutes, on your phone', 'Meta business account, number registration and template approval'],
            ['Best for', 'Owner-led businesses with manageable chat volume', 'Teams with high volume, automation or integration needs']
          ]
        }
      },
      {
        heading: 'How WhatsApp Business API pricing works in 2026',
        paragraphs: [
          'Since 1 July 2025, Meta charges per delivered message rather than per 24-hour conversation. Template messages are charged by category: marketing, utility, and authentication. Rates differ by country and change over time, so check Meta\'s current rate card for India before you set a budget.',
          'Two windows matter. The customer service window opens for 24 hours each time a customer messages or calls you, and resets with every new customer message. Inside it you can reply with free-form messages. When a customer messages you from a Click to WhatsApp ad and you reply within the service window, a free entry point window opens; Meta currently states it can stay open for up to 7 days and does not charge for most messages in it.',
          'From 1 October 2026, utility templates sent in reply to a customer are charged, and service messages are free only up to 1,000 per business phone number each month, with charges from the 1,001st. Volume tiers can lower rates for utility and authentication messages at higher monthly volumes. These details were checked against Meta\'s pricing page on 24 October 2026.'
        ]
      },
      {
        heading: 'When the WhatsApp Business app is enough',
        list: [
          'One or two people can reply to every chat within a reasonable time.',
          'Most conversations start with the customer messaging you.',
          'You do not need chats recorded in a CRM or spreadsheet automatically.',
          'Your budget for messaging tools is close to zero.'
        ]
      },
      {
        heading: 'Signs it is time to move to the API',
        list: [
          'Several staff need to answer from the same business number.',
          'Inquiries are missed at night, on weekends, or during busy hours.',
          'You want to send order updates, appointment reminders, or payment links automatically.',
          'Leads from ads and your website need to be recorded in Google Sheets or a CRM.',
          'You run Click to WhatsApp ads and want to track what happens after the click.'
        ]
      },
      {
        heading: 'What to plan before switching',
        list: [
          'Decide which number to use. Moving an existing app number to the API has conditions, and Meta\'s options for using one number on both have changed recently, so confirm the current rules for your number.',
          'Set up a Meta business portfolio with a display name that matches your business.',
          'Write message templates for the updates you plan to send, following Meta\'s template guidelines.',
          'Add opt-in wording to your website forms and ads so customers agree to receive messages.',
          'Decide who takes over a chat when automation cannot answer.'
        ]
      }
    ],
    faqs: [
      { question: 'Is the WhatsApp Business API free?', answer: 'No. Meta does not charge a subscription for the Cloud API, but it charges per delivered template message by category, and from 1 October 2026 service messages beyond 1,000 a month per number are charged. Providers may add their own platform fees.' },
      { question: 'What is a WhatsApp message template?', answer: 'A message format approved by Meta that businesses use to contact customers outside the 24-hour customer service window, such as order updates, reminders, or offers. Templates are categorised as marketing, utility, or authentication.' },
      { question: 'Can I send bulk promotional messages on WhatsApp?', answer: 'Only to customers who opted in, using approved marketing templates on the API. Broadcast lists in the Business app reach only contacts who saved your number. Unwanted messages can lead to blocks and limits on your number.' },
      { question: 'Can I use the WhatsApp Business app and the API on the same number?', answer: 'It depends on Meta\'s current rules and your provider. A number registered on the API traditionally could not stay in the regular app; Meta has since introduced options for some businesses to use both, so confirm the current rules before migrating.' }
    ],
    sources: [
      { label: 'Meta: Pricing on the WhatsApp Business Platform', url: 'https://developers.facebook.com/docs/whatsapp/pricing' },
      { label: 'WhatsApp Business Messaging Policy', url: 'https://business.whatsapp.com/policy' },
      { label: 'WhatsApp Business app overview', url: 'https://business.whatsapp.com/products/business-app' }
    ],
    relatedService: 'whatsapp-automation'
  },
  {
    slug: 'meta-ads-for-small-business-india',
    title: 'Facebook and Instagram Ads for Small Businesses in India: A Practical Guide',
    summary: 'To run Facebook and Instagram ads well, start with one clear goal, choose the matching campaign objective in Meta Ads Manager, and set up tracking with the Meta Pixel, conversion events, or lead forms. Send people somewhere they can act quickly, such as a focused landing page or a WhatsApp chat. Begin with a test budget you can afford, review results weekly, and judge ads on inquiries and sales rather than likes.',
    published: '2026-10-24',
    updated: '2026-10-24',
    readMinutes: 8,
    keyTakeaways: [
      'Meta Ads Manager has six campaign objectives: Awareness, Traffic, Engagement, Leads, App promotion, and Sales.',
      'Choose the objective that matches the action you want, because Meta optimises delivery for that action.',
      'Set up tracking first. Without the Meta Pixel, conversion events, or lead forms, you cannot tell which ads bring customers.',
      'Click to WhatsApp ads suit Indian businesses that close sales in conversation, provided someone replies quickly.',
      'Boosting a post is quick, but Ads Manager gives more control over objectives, audiences, and tracking.'
    ],
    sections: [
      {
        heading: 'Boosted posts or Ads Manager?',
        paragraphs: [
          'Boosting a post from your Facebook Page or Instagram profile is the fastest way to advertise, but it offers fewer choices. Ads Manager lets you choose the campaign objective, audience, placements, budget, and tracking, and compare ads side by side. Boosts suit simple reach; Ads Manager is the better choice when the goal is inquiries or sales.'
        ]
      },
      {
        heading: 'Choose the right campaign objective',
        table: {
          headers: ['Objective', 'Use it when', 'Example'],
          rows: [
            ['Awareness', 'You want many relevant people to see and remember your brand', 'Opening a new store in your city'],
            ['Traffic', 'You want visits to a website, app, or profile', 'Sending people to a new product page'],
            ['Engagement', 'You want messages, video views, or interactions', 'Starting WhatsApp or Messenger conversations'],
            ['Leads', 'You want contact details or qualified conversations', 'Instant forms for property or course inquiries'],
            ['App promotion', 'You want app installs or in-app actions', 'A booking or delivery app'],
            ['Sales', 'You want purchases or other valuable website actions', 'An online store with the Meta Pixel installed']
          ]
        }
      },
      {
        heading: 'Set up tracking before you spend',
        paragraphs: [
          'Install the Meta Pixel on your website and set up standard events such as Lead, Contact, or Purchase. Where possible, also send events from your server through the Conversions API, which keeps measurement more reliable when browsers limit tracking. For instant forms and WhatsApp chats, decide in advance how you will record which inquiries became customers.'
        ],
        list: [
          'Verify your website domain in Meta business settings.',
          'Choose events that match your goal, such as Lead or Purchase.',
          'Test events in Meta Events Manager before launching.',
          'Record lead outcomes in a sheet or CRM, so you can judge cost per customer and not only cost per lead.'
        ]
      },
      {
        heading: 'Click to WhatsApp ads for Indian businesses',
        paragraphs: [
          'Many customers prefer to ask a question before buying. Click to WhatsApp ads open a chat with your business instead of a website, which suits services, considered purchases, and local businesses. They only work when someone replies quickly, so prepare quick replies or an automated first message and ask a few qualifying questions to spot serious inquiries.',
          'On the WhatsApp Business Platform, chats that start from these ads can open a free entry point window in which Meta does not charge for most messages. Read our WhatsApp app vs API guide for how this works.'
        ]
      },
      {
        heading: 'How much should a small business spend?',
        paragraphs: [
          'There is no single right budget. Start with an amount you can afford without expecting immediate profit, run each test long enough to gather data, and compare cost per inquiry and cost per sale with your margins. Increase spend gradually on ads that bring customers instead of doubling budgets overnight.',
          'Meta\'s guidance is that an ad set generally needs about 50 optimisation events within a week to leave the learning phase. With a small budget, optimise for an event that happens often enough, such as leads or messages, rather than rare purchases.'
        ]
      },
      {
        heading: 'Creative that works for small businesses',
        list: [
          'Show the product, service, or result in the first seconds of a video.',
          'Use vertical 9:16 video for Reels and Stories placements.',
          'State the price, offer, or location when it helps people decide.',
          'Use real photos of your shop, team, or products where possible.',
          'Test two or three variations instead of a single ad, then keep what performs.'
        ]
      },
      {
        heading: 'Common mistakes to avoid',
        list: [
          'Choosing Engagement when you need sales or inquiries.',
          'Sending ad traffic to a slow homepage instead of a focused page or chat.',
          'Changing budgets and audiences every day before results settle.',
          'Judging ads by likes or clicks instead of inquiries and sales.',
          'Leaving WhatsApp or form inquiries waiting hours for a reply.',
          'Running ads without reading Meta\'s Advertising Standards for your category.'
        ]
      }
    ],
    faqs: [
      { question: 'What is the minimum budget for Facebook ads in India?', answer: 'Meta sets small minimum daily budgets that depend on currency and bid strategy, so small tests are possible. A useful test budget is one that produces enough leads or messages to compare ads, which depends on your industry and offer.' },
      { question: 'Are Instagram ads and Facebook ads managed separately?', answer: 'No. Both run from Meta Ads Manager, and one campaign can show ads on Facebook, Instagram, Messenger, and Meta Audience Network, depending on the placements you choose.' },
      { question: 'How long do Meta ads take to show results?', answer: 'Ads can start delivering within hours of approval, but allow at least a week for each test because results are unstable during the learning phase. Judge performance on inquiries and sales over several weeks.' },
      { question: 'Do I need a website to advertise on Facebook and Instagram?', answer: 'No. Ads can send people to WhatsApp, Messenger, Instagram Direct, an instant form, or your profile. A website or landing page helps with tracking and gives people more information before they contact you.' }
    ],
    sources: [
      { label: 'Meta Business Help Center: Choose the right ad objective', url: 'https://www.facebook.com/business/help/1438417719786914' },
      { label: 'Meta Business Help Center: About the learning phase', url: 'https://www.facebook.com/business/help/112167992830700' },
      { label: 'Meta for Developers: Conversions API', url: 'https://developers.facebook.com/docs/marketing-api/conversions-api' },
      { label: 'Meta Advertising Standards', url: 'https://transparency.meta.com/policies/ad-standards/' }
    ],
    relatedService: 'meta-ads'
  },
  {
    slug: 'business-website-checklist',
    title: 'Business Website Checklist for Indian Businesses (2026)',
    summary: 'A business website should load quickly on a phone, explain within seconds what you offer and where you serve, and make it easy to call, WhatsApp, or send an inquiry. Before launch, check mobile usability, page speed, contact options, trust details, search basics such as page titles and a sitemap, privacy notices for any personal data you collect, and that every form and payment flow works on the live domain.',
    published: '2026-10-24',
    updated: '2026-10-24',
    readMinutes: 6,
    keyTakeaways: [
      'Design for phones first. Google mainly uses the mobile version of a site for indexing and ranking.',
      'Aim for good Core Web Vitals: Largest Contentful Paint within 2.5 seconds, Interaction to Next Paint under 200 milliseconds, and Cumulative Layout Shift below 0.1.',
      'Put your phone, WhatsApp, and service area where visitors find them without searching.',
      'Give every page a unique title and description, and submit a sitemap in Google Search Console.',
      'If your website collects personal data, plan for India\'s DPDP Act. Its Rules were notified in November 2025, and most obligations apply from May 2027.'
    ],
    sections: [
      {
        heading: 'Clarity: can visitors understand you in five seconds?',
        list: [
          'The main headline says what you do and who it is for.',
          'Your city, region, or "across India" service area is visible.',
          'Each main service has its own page with details and a next step.',
          'Prices, starting prices, or the factors that affect price are explained.',
          'Every page ends with a clear action: call, WhatsApp, book, or buy.'
        ]
      },
      {
        heading: 'Mobile experience and speed',
        list: [
          'Test on a mid-range Android phone using mobile data, not only office Wi-Fi.',
          'Buttons and links are large enough to tap without zooming.',
          'Images are compressed and sized for their display, ideally in WebP or AVIF.',
          'Core Web Vitals are checked in PageSpeed Insights and later in Search Console.',
          'No pop-ups cover the main content on mobile.'
        ]
      },
      {
        heading: 'Contact and inquiries',
        list: [
          'Click-to-call and WhatsApp links open correctly on phones.',
          'Forms ask only for details you will use.',
          'Visitors see a confirmation after submitting, and your team is notified.',
          'Inquiries are recorded in a sheet or CRM, not only in an inbox.',
          'One person is responsible for replying, with a target response time.'
        ]
      },
      {
        heading: 'Trust signals',
        list: [
          'Business name, phone, and service area match your Google Business Profile.',
          'Real photos of your work, team, or premises replace generic stock images where possible.',
          'Reviews and case studies are genuine and shared with permission.',
          'Payment, refund, and cancellation terms are published if you sell online.',
          'Every page loads over HTTPS.'
        ]
      },
      {
        heading: 'Search basics (SEO)',
        list: [
          'Each page has a unique title and meta description.',
          'Each page has one clear main heading.',
          'URLs are short and descriptive, for example /services/website-development.',
          'A sitemap.xml and robots.txt are published.',
          'Google Search Console and Bing Webmaster Tools are verified, and the sitemap is submitted.',
          'Structured data describes your organisation, services, and FAQs, matching what is visible on the page.',
          'Related pages link to each other.'
        ]
      },
      {
        heading: 'Privacy and payments',
        list: [
          'A privacy notice explains what personal data you collect, why, and how people can contact you about it.',
          'Customers agree before you send marketing messages on WhatsApp, SMS, or email.',
          'Online payments go through an RBI-authorised payment aggregator that supports UPI and cards.'
        ]
      },
      {
        heading: 'Launch day',
        list: [
          'Test every form, link, and payment on the live domain.',
          'Install analytics and confirm visits are recorded.',
          'Redirect old URLs to their new pages with 301 redirects when replacing a site.',
          'Check that missing pages show a helpful 404 page.',
          'Confirm the domain is registered in your business name and that you hold every login.'
        ]
      }
    ],
    faqs: [
      { question: 'How long does it take to build a business website?', answer: 'A simple site with a few pages can often be finished in a few weeks once the content is ready. Larger sites with online payments or integrations take longer. Content and approvals are usually the slowest part.' },
      { question: 'Do I need a website if I already have Instagram and WhatsApp?', answer: 'Social profiles help, but you do not control their reach or layout. A website gives you a permanent place to explain your services, appear in Google searches, run trackable ads, and collect inquiries.' },
      { question: 'What is a good loading time for a business website?', answer: 'Google treats a Largest Contentful Paint of 2.5 seconds or less as good, measured on real visits. Test on a mid-range phone over mobile data, not only on fast office Wi-Fi.' },
      { question: 'Who should own the domain and hosting?', answer: 'You should. Register the domain in your business name with your own email, and make sure you receive admin access to the hosting, website, and analytics when the project is handed over.' }
    ],
    sources: [
      { label: 'Google Search Central: Mobile-first indexing', url: 'https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing' },
      { label: 'web.dev: Web Vitals', url: 'https://web.dev/articles/vitals' },
      { label: 'Google Search Central: SEO starter guide', url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide' },
      { label: 'PIB: Digital Personal Data Protection Rules, 2025', url: 'https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf' }
    ],
    relatedService: 'website-development'
  }
];
