// One entry per public service page. Page content, Service schema and FAQ schema all read from here.
// Only describe work MetaVex offers. Do not add unverified results, ratings or guarantees.
export interface ServicePage {
  slug: string;
  name: string;
  label: string;
  icon: string;
  eyebrow: string;
  h1: string;
  intro: string;
  forWhom: string[];
  included: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  costFactors: string[];
  faqs: { question: string; answer: string }[];
  whatsapp: string;
}

export const SERVICE_PAGES: readonly ServicePage[] = [
  {
    slug: 'website-development',
    name: 'Website development',
    label: 'Website Development',
    icon: '⚡',
    eyebrow: 'Website Development Services',
    h1: 'Website Development for Growing Indian Businesses',
    intro: 'MetaVex Digital designs and builds fast, mobile-first websites that explain what you offer and make it easy for visitors to call, WhatsApp, book, or pay. Whether you need a new business website, a few landing pages, or an online store, we plan each page around the questions your customers ask before they contact you.',
    forWhom: [
      'Visitors reach your website but rarely call, message, or fill in a form.',
      'Your current site is slow or hard to use on a phone.',
      'Customers keep asking questions your website should already answer.',
      'You are launching a new business, product, or service and need a credible online home.'
    ],
    included: [
      { title: 'Mobile-first design', text: 'Layouts planned for phones first, then tablets and desktops, with readable text and easy-to-tap buttons.' },
      { title: 'Clear service and product pages', text: 'Pages that explain what you offer, who it is for, and what happens after someone gets in touch.' },
      { title: 'WhatsApp, call and form inquiries', text: 'Contact options placed where visitors need them, with inquiries routed to your team.' },
      { title: 'Payments, booking or catalogs', text: 'Online payments, appointment booking, or product catalogs when your project needs them.' },
      { title: 'Search-ready foundations', text: 'Page titles, descriptions, structured data, a sitemap, and fast loading so search engines can understand your pages.' },
      { title: 'Hosting, launch and handover', text: 'Domain, hosting, and launch setup, with access and basic editing guidance handed over to you.' }
    ],
    steps: [
      { title: 'Understand your business', text: 'We discuss your offer, customers, current website, and what you want visitors to do.' },
      { title: 'Agree on pages and scope', text: 'You receive a written plan of pages, features, costs, content responsibilities, and milestones.' },
      { title: 'Design, build and test', text: 'We build the pages and test them on phones and desktops, including forms and contact links.' },
      { title: 'Launch and review', text: 'We launch, confirm that inquiries reach you, and agree on what to improve next.' }
    ],
    costFactors: [
      'Number of pages and how much content needs to be written',
      'Features such as payments, booking, catalogs, or integrations',
      'Whether you are rebuilding an existing site or starting fresh',
      'Ongoing hosting, maintenance, and support requirements'
    ],
    faqs: [
      { question: 'How much does website development cost with MetaVex Digital?', answer: 'It depends on the number of pages, features, integrations, and support you need. You receive a written breakdown of fees, hosting, and any recurring platform costs before the work starts.' },
      { question: 'Can you improve my existing website instead of rebuilding it?', answer: 'Yes, when that makes sense. We review your current site first. Targeted changes to content, speed, or contact options may be enough; a rebuild is suggested only when the current setup limits what you need.' },
      { question: 'Will my website work well on mobile phones?', answer: 'Yes. Every layout is planned for phones first and tested on common screen sizes, because many visitors browse on their phones.' },
      { question: 'Do you help with SEO when building a website?', answer: 'We set up the technical foundations, including page titles, descriptions, structured data, a sitemap, and fast-loading pages. Rankings depend on competition, content, and time, so no position on Google is guaranteed.' }
    ],
    whatsapp: 'Hi MetaVex Team, I want to discuss a website for my business.'
  },
  {
    slug: 'meta-ads',
    name: 'Facebook and Instagram advertising',
    label: 'Meta Ads',
    icon: '🎯',
    eyebrow: 'Facebook & Instagram Ads',
    h1: 'Facebook & Instagram Ads Management (Meta Ads)',
    intro: 'MetaVex Digital plans, sets up, and manages Facebook and Instagram ad campaigns for businesses across India. We connect your offer, audience, creative, and landing page or WhatsApp flow, then review the inquiry and sales data available to decide what to test next.',
    forWhom: [
      'You spend on boosted posts or ads but cannot tell what they bring in.',
      'Ads get clicks or likes, but few people send an inquiry or buy.',
      'You want to test a new product, service, or location before committing a larger budget.',
      'Nobody on your team has time to manage campaigns and review results each week.'
    ],
    included: [
      { title: 'Campaign planning', text: 'Objectives, audiences, budget split, and offers agreed around your margins and capacity.' },
      { title: 'Pixel and conversion tracking', text: 'Meta Pixel and conversion event setup where your website or platform supports it.' },
      { title: 'Ad creative and copy', text: 'Images, short videos, and ad text prepared or adapted from your material, with variations to test.' },
      { title: 'Landing page or WhatsApp flow', text: 'A clear next step after the click, whether a landing page, a form, or a WhatsApp conversation.' },
      { title: 'Testing and optimisation', text: 'Audience, message, and creative tests reviewed on an agreed schedule.' },
      { title: 'Plain-language reporting', text: 'Reports on spend, inquiries, and cost per result, based on the data available.' }
    ],
    steps: [
      { title: 'Review your offer and numbers', text: 'We look at your offer, margins, past ads, and who buys from you.' },
      { title: 'Plan and set up', text: 'You approve the campaign plan, budget, tracking, and creative before anything goes live.' },
      { title: 'Launch and test', text: 'Campaigns go live with a small set of planned tests on audience, message, and creative.' },
      { title: 'Review and refine', text: 'We review results on the agreed schedule and move spend toward what is working.' }
    ],
    costFactors: [
      'Your monthly ad budget, which is paid directly to Meta and separate from our fee',
      'Number of campaigns, audiences, and locations',
      'How much new creative, video, or copy is needed each month',
      'Tracking, landing page, or WhatsApp setup required before launch'
    ],
    faqs: [
      { question: 'What budget do I need for Facebook and Instagram ads?', answer: 'There is no single right number. It depends on your product, location, and goal. We discuss a test budget you are comfortable with. Ad spend is paid directly to Meta, separate from our management fee.' },
      { question: 'Can you guarantee leads or sales from Meta ads?', answer: 'No. Results depend on your offer, market, budget, and how quickly inquiries are followed up. We agree on what to measure and review what the data shows.' },
      { question: 'Do I need a website to run Meta ads?', answer: 'Not always. Ads can lead to a WhatsApp chat, a Meta lead form, or your Instagram profile. A focused landing page often makes tracking and follow-up easier.' },
      { question: 'Who owns the ad account and data?', answer: 'We recommend running campaigns in your own Meta Business account and sharing access with us, so the account, pages, and data stay yours.' }
    ],
    whatsapp: 'Hi MetaVex Team, I want to discuss Facebook and Instagram ads for my business.'
  },
  {
    slug: 'whatsapp-automation',
    name: 'WhatsApp replies and follow-up workflows',
    label: 'WhatsApp Automation',
    icon: '💬',
    eyebrow: 'WhatsApp Business Automation',
    h1: 'WhatsApp Automation for Business: Replies, Catalogs & Follow-Ups',
    intro: 'MetaVex Digital sets up WhatsApp workflows that answer common questions, share catalogs or price lists, collect inquiry details, and remind your team to follow up. Customers get a faster first reply, and your team steps in when a real conversation is needed.',
    forWhom: [
      'Your team answers the same questions on WhatsApp many times a day.',
      'Inquiries from ads or your website are missed or followed up late.',
      'Customer details are scattered across chats and are hard to track.',
      'You want to send updates or reminders without copying messages by hand.'
    ],
    included: [
      { title: 'Automated first replies', text: 'Greetings, menus, and answers to frequent questions, written in your tone.' },
      { title: 'Catalog and price sharing', text: 'Product, service, or price information sent when customers ask for it.' },
      { title: 'Inquiry details collection', text: 'Questions about requirement, location, or budget asked before handover.' },
      { title: 'Team handover', text: 'Conversations passed to the right person when a customer needs a human reply.' },
      { title: 'Google Sheets or CRM updates', text: 'Inquiries recorded in Google Sheets or your CRM so they are not lost in chats.' },
      { title: 'WhatsApp Business API setup', text: 'Account and message template setup, subject to Meta approval.' }
    ],
    steps: [
      { title: 'Map your conversations', text: 'We list the questions customers ask and where your team spends the most time.' },
      { title: 'Design the flow', text: 'You approve the replies, questions, and handover points before setup.' },
      { title: 'Set up and test', text: 'We configure the workflow and test it with real scenarios from your business.' },
      { title: 'Go live and adjust', text: 'After launch, we review unanswered questions and improve replies where needed.' }
    ],
    costFactors: [
      'Whether you use the free WhatsApp Business app or the WhatsApp Business API',
      'Number of flows, questions, and integrations',
      'Meta per-message charges and any provider fees, which are billed separately',
      'Changes and support needed after launch'
    ],
    faqs: [
      { question: 'What is the difference between the WhatsApp Business app and the API?', answer: 'The free app suits small teams replying from one phone and offers quick replies, greetings, and a catalog. The API supports automation, several team members, and integrations, and needs Meta approval of your account and message templates.' },
      { question: 'Will automation replace my team on WhatsApp?', answer: 'No. Automation handles first replies and routine questions, then hands the conversation to your team when a customer needs help or is ready to buy.' },
      { question: 'Can WhatsApp inquiries be saved to Google Sheets or a CRM?', answer: 'Yes. Inquiry details can be recorded in Google Sheets, Zoho, or another CRM that supports integration, so your team can track follow-ups.' },
      { question: 'Is WhatsApp automation allowed?', answer: 'Yes, when it follows WhatsApp Business policies. Promotional messages need customer opt-in and approved templates, and flows are set up with those rules in mind.' }
    ],
    whatsapp: 'Hi MetaVex Team, I want to discuss WhatsApp automation for my business.'
  },
  {
    slug: 'social-media-content',
    name: 'Social media content and reels',
    label: 'Social Media & Reels',
    icon: '🔥',
    eyebrow: 'Social Media Content & Reels',
    h1: 'Social Media Content & Instagram Reels for Your Business',
    intro: 'MetaVex Digital plans and creates Instagram Reels, posts, carousels, and stories that explain your products, answer common questions, and give people a reason to follow and contact your business. Content is planned around your customers, not only around trends.',
    forWhom: [
      'Your social profiles are inactive or updated without a plan.',
      'You post regularly, but the content rarely leads to inquiries.',
      'Your products or services are easier to understand on video.',
      'You need consistent content but do not have time to plan and edit it.'
    ],
    included: [
      { title: 'Monthly content plan', text: 'Topics based on your products, offers, customer questions, and seasons.' },
      { title: 'Reels and short videos', text: 'Scripts, shot lists, and editing for Reels using your footage or planned shoots.' },
      { title: 'Posts and carousels', text: 'Designed posts and carousels that explain features, prices, or processes.' },
      { title: 'Captions and hashtags', text: 'Clear captions with a call to action, and relevant hashtags.' },
      { title: 'Profile optimisation', text: 'Bio, highlights, and contact buttons set up so visitors can reach you.' },
      { title: 'Monthly review', text: 'A look at reach, saves, profile visits, and messages to plan the next month.' }
    ],
    steps: [
      { title: 'Understand your brand', text: 'We learn about your products, customers, and the questions they ask.' },
      { title: 'Plan the calendar', text: 'You approve a monthly plan of topics and formats before production.' },
      { title: 'Create and approve', text: 'We create the content and share it for your review before publishing.' },
      { title: 'Publish and review', text: 'Content is published on schedule, and the results guide the next plan.' }
    ],
    costFactors: [
      'Number of Reels, posts, and stories per month',
      'Whether filming is needed or you provide the footage',
      'Number of platforms, such as Instagram, Facebook, or YouTube Shorts',
      'Replying to comments and messages on your behalf'
    ],
    faqs: [
      { question: 'Do you shoot videos or do I provide the footage?', answer: 'Both are possible. Many businesses record simple clips on a phone using our shot list, and we edit them. Professional shoots can be discussed as part of the scope.' },
      { question: 'How many posts and Reels should my business publish?', answer: 'Consistency matters more than volume. We suggest a realistic number based on your goals, budget, and the material you can supply, then adjust after reviewing results.' },
      { question: 'Can social media content bring inquiries, not just likes?', answer: 'It can help when content answers real customer questions and makes the next step clear. We track profile visits and messages, but no number of followers, leads, or sales is guaranteed.' },
      { question: 'Can this content also be used in ads?', answer: 'Yes. If you choose our Meta ads service, posts and Reels that perform well organically can be tested as ads to reach more of the right people.' }
    ],
    whatsapp: 'Hi MetaVex Team, I want to discuss social media content and Reels for my business.'
  },
  {
    slug: 'business-automation',
    name: 'Business workflow automation',
    label: 'Business Automation',
    icon: '🤖',
    eyebrow: 'Business Workflow Automation',
    h1: 'Business Workflow Automation for Leads, Orders & Follow-Ups',
    intro: 'MetaVex Digital connects the tools your business already uses, such as website forms, WhatsApp, Google Sheets, CRMs, and payment apps, so leads, orders, and follow-ups stay organised in one place. Less copying between apps means fewer missed customers and more time for real work.',
    forWhom: [
      'Leads arrive from ads, website forms, and WhatsApp and are tracked in different places.',
      'Your team copies the same details between apps and spreadsheets every day.',
      'Follow-ups, payment reminders, or order updates depend on someone remembering.',
      'You cannot easily see how many inquiries came in or what happened to them.'
    ],
    included: [
      { title: 'Leads in one place', text: 'Website, ad, and WhatsApp inquiries recorded in Google Sheets or a CRM.' },
      { title: 'Follow-up reminders', text: 'Automatic reminders to your team or customers at agreed stages.' },
      { title: 'Order and payment tracking', text: 'Order status, invoices, or payment details organised in a shared view.' },
      { title: 'Team notifications', text: 'Alerts by email or WhatsApp when a new lead or order needs attention.' },
      { title: 'Simple dashboards', text: 'A clear view of inquiries, stages, and pending follow-ups.' },
      { title: 'Documentation and handover', text: 'A short guide so your team knows how each workflow runs.' }
    ],
    steps: [
      { title: 'Map your current process', text: 'We follow how a lead or order moves through your business today.' },
      { title: 'Choose what to automate', text: 'You approve the workflows, tools, and costs before setup.' },
      { title: 'Build and test', text: 'We connect the tools and test each workflow with sample data.' },
      { title: 'Train and improve', text: 'Your team learns the new process, and we refine it after real use.' }
    ],
    costFactors: [
      'Number of workflows and tools to connect',
      'Whether your tools support integrations or need custom work',
      'Subscription costs for any automation or CRM platform',
      'Ongoing changes, monitoring, and support'
    ],
    faqs: [
      { question: 'Which tools can you connect?', answer: 'Common choices include website forms, WhatsApp, Google Sheets, Gmail, Zoho, and payment platforms. We confirm what your current tools support before proposing a workflow.' },
      { question: 'Do I need to buy new software for automation?', answer: 'Not always. We start with the tools you already use. If a paid platform would help, you see its cost before deciding.' },
      { question: 'Is my business too small for automation?', answer: 'Not necessarily. Even a simple workflow, such as saving every inquiry to one sheet and sending a reminder, can save time for a small team.' },
      { question: 'What happens if an automation stops working?', answer: 'Workflows are documented and tested before handover. Support and monitoring can be included in your plan so problems are noticed and fixed.' }
    ],
    whatsapp: 'Hi MetaVex Team, I want to discuss automating my business workflows.'
  }
];
