export type DeliveryStatus = "ACTIVE" | "PLANNED" | "REQUIRES DELIVERY CAPABILITY";

export interface ServiceDetail {
  id: string;
  slug: string;
  divisionNumber: string;
  divisionTitle: string;
  title: string;
  tagline: string;
  heroSubtitle: string;
  description: string;
  deliveryStatus: DeliveryStatus;
  badge: string;
  iconName: string;
  challenges: { title: string; desc: string }[];
  solutions: { title: string; desc: string }[];
  serviceOfferings: { title: string; desc: string }[];
  features: string[];
  benefits: string[];
  industries: string[];
  technologies: string[];
  relevantProjectSlugs: string[];
  faqs: { question: string; answer: string }[];
  relatedServiceSlugs: string[];
}

export const ALL_SERVICES: ServiceDetail[] = [
  // 01. SOFTWARE & ENTERPRISE SOLUTIONS
  {
    id: "srv-software-dev",
    slug: "software-development",
    divisionNumber: "01",
    divisionTitle: "Software & Enterprise Solutions",
    title: "Custom Software & Enterprise Architecture",
    tagline: "High-concurrency microservices, bespoke enterprise portals, and mission-critical workflows.",
    heroSubtitle: "Engineered for zero downtime, multi-branch operations, and deterministic business logic across Indian enterprises and public institutions.",
    description: "Royal Business Machine architects bespoke enterprise software systems replacing disjointed spreadsheets and fragile legacy tools with unified, bank-grade digital backbones.",
    deliveryStatus: "ACTIVE",
    badge: "Core Engineering",
    iconName: "Code2",
    challenges: [
      { title: "Fragmented Data Silos", desc: "Operations split between un-synced Excel sheets, legacy desktop software, and manual phone coordination." },
      { title: "High-Traffic Concurrency Bottlenecks", desc: "Systems crashing during peak demand cycles, admissions surges, or flash sales." },
      { title: "Security & Data Integrity Risks", desc: "Vulnerability to unauthorized data tampering, paper leaks, and un-audited employee access." }
    ],
    solutions: [
      { title: "Unified Microservices Backbone", desc: "Decoupled Next.js 16 and Node.js microservices with centralized PostgreSQL or MongoDB clusters." },
      { title: "High-Throughput Load Balancing", desc: "Edge CDN routing and Redis caching capable of sustaining 100,000+ concurrent requests." },
      { title: "Role-Based Access Control (RBAC)", desc: "Granular administrative permissions, cryptographic audit logs, and two-factor authentication." }
    ],
    serviceOfferings: [
      { title: "Custom ERP & CRM Development", desc: "Integrated resource planning and customer lifecycle management tailored to your workflows." },
      { title: "Hospital Management Systems (HMS)", desc: "Complete EHR, OPD/IPD scheduling, digital prescription pads, and pharmacy inventory." },
      { title: "School & College Management Portals", desc: "Automated student noticeboards, syllabus document vaults, and admissions workflows." },
      { title: "Manufacturing & Retail POS", desc: "Shop-floor inventory tracking, barcode reconciliation, and automated billing." },
      { title: "Multi-Commodity Logistics Software", desc: "Real-time FAT/SNF rate matrix, offline vehicle dispatch, and automated proforma invoices." }
    ],
    features: ["Bank-grade RBAC security", "Multi-tenant database tenancy", "Automated daily backups", "Offline-first capability"],
    benefits: ["98% reduction in manual clerical errors", "Real-time executive reporting", "Single-point execution accountability"],
    industries: ["Healthcare", "Higher Education", "Dairy & Logistics", "Manufacturing", "Government"],
    technologies: ["Next.js 16", "React 19", "Node.js", "Express", "PostgreSQL", "MongoDB", "Docker", "Redis"],
    relevantProjectSlugs: ["hms-multi-specialty-hospital-management-system", "govt-college-bharatpur-official-institutional-portal", "dairy-muneem-milk-procurement-logistics-app"],
    faqs: [
      { question: "How long does custom enterprise software take to build?", answer: "Typical development timelines range from 6 to 16 weeks depending on architectural scope, integrations, and compliance requirements." },
      { question: "Can the software function offline in rural branches?", answer: "Yes. We engineer offline-first data caching architectures using SQLite/IndexedDB that synchronize automatically when network connectivity is re-established." },
      { question: "Do you provide source code ownership?", answer: "Yes. Enterprise clients retain full proprietary intellectual property and source code ownership upon contract fulfillment." }
    ],
    relatedServiceSlugs: ["erp-solutions", "cloud-devops", "software-testing"]
  },
  {
    id: "srv-erp-solutions",
    slug: "erp-solutions",
    divisionNumber: "01",
    divisionTitle: "Software & Enterprise Solutions",
    title: "Enterprise ERP & Operations Management",
    tagline: "Integrated resource planning across finance, HR, inventory, and procurement.",
    heroSubtitle: "Consolidate accounting, multi-warehouse stock, supply chains, and employee attendance into a single real-time dashboard.",
    description: "Tailored ERP systems designed for Indian MSMEs, manufacturers, and institutions to automate manual accounting, inventory reconciliation, and statutory GST compliances.",
    deliveryStatus: "ACTIVE",
    badge: "Enterprise Systems",
    iconName: "Layers",
    challenges: [
      { title: "Inventory Stock Discrepancies", desc: "Warehouse stockouts and phantom inventory causing lost sales and order cancellations." },
      { title: "Delayed GST Invoicing", desc: "Manual invoicing taking days to reconcile with tax portals and commercial ledgers." }
    ],
    solutions: [
      { title: "Automated GST Invoicing Engine", desc: "One-click e-invoicing and e-way bill generation integrated directly with state tax standards." },
      { title: "Real-Time Multi-Warehouse Ledger", desc: "Perpetual inventory tracking with automated low-stock reorder triggers." }
    ],
    serviceOfferings: [
      { title: "Manufacturing & Raw Materials ERP", desc: "Bill of materials (BOM), batch tracking, and production stage telemetry." },
      { title: "Institutional Campus ERP", desc: "Fee collection portals, faculty registries, and exam marksheet generation." },
      { title: "Supply Chain & Procurement ERP", desc: "Vendor quotation management and purchase order fulfillment." }
    ],
    features: ["Automated GST invoice generation", "Barcode & QR scanning support", "Multi-branch consolidation"],
    benefits: ["Sales cycle cut from 48h to under 4h", "Eliminates duplicate inventory records"],
    industries: ["Manufacturing", "Commodity Trading", "Education", "Healthcare"],
    technologies: ["Node.js", "Express", "PostgreSQL", "Next.js", "Redis"],
    relevantProjectSlugs: ["pavitra-enterprise-multi-commodity-platform", "hms-multi-specialty-hospital-management-system"],
    faqs: [
      { question: "Can your ERP integrate with our existing Tally or legacy accounting software?", answer: "Yes, we build automated bidirectional API bridges and CSV data reconciliation pipelines." }
    ],
    relatedServiceSlugs: ["software-development", "data-analytics"]
  },

  // 02. WEB & MOBILE DEVELOPMENT
  {
    id: "srv-web-dev",
    slug: "web-development",
    divisionNumber: "02",
    divisionTitle: "Web & Mobile Development",
    title: "High-Performance Web Platforms & E-Commerce",
    tagline: "Next.js 16 architectures, ultra-fast loading speeds, and high-conversion storefronts.",
    heroSubtitle: "Engineered for high search visibility, WCAG accessibility, and seamless payment gateway checkouts.",
    description: "From public college portals handling 100,000+ simultaneous requests to luxury hospitality concierges, we develop modern web platforms that command aesthetic authority.",
    deliveryStatus: "ACTIVE",
    badge: "Web Engineering",
    iconName: "Globe",
    challenges: [
      { title: "Slow Page Speeds", desc: "Bloated templates leading to high bounce rates and penalized Google search rankings." },
      { title: "Mobile Layout Breakage", desc: "Websites failing to deliver smooth responsive experiences across diverse budget smartphones." }
    ],
    solutions: [
      { title: "Next.js 16 Static & Dynamic Hybrid", desc: "Sub-second initial page loads with Incremental Static Regeneration and edge caching." },
      { title: "Accessibility Compliance", desc: "WCAG 2.1 AA certified markup, responsive typography, and screen-reader accessibility." }
    ],
    serviceOfferings: [
      { title: "Corporate & Enterprise Websites", desc: "Bespoke digital flagships with cinematic motion graphics and luxury styling." },
      { title: "Direct-to-Consumer (D2C) E-Commerce", desc: "Tailored online storefronts with Razorpay, Cashfree, and automated courier tracking." },
      { title: "High-Traffic Institutional Portals", desc: "Public sector noticeboards, result publishing, and admissions workflows." }
    ],
    features: ["Core Web Vitals 95+ score", "Edge CDN deployment", "Integrated SEO schema", "Payment gateway integration"],
    benefits: ["240% increase in direct online sales", "100% uptime during examination peaks"],
    industries: ["Higher Education", "Hospitality", "Organic Agriculture", "Fashion Retail"],
    technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "Cloudflare CDN"],
    relevantProjectSlugs: ["jaivik-desh-organic-agriculture-ecommerce-platform", "govt-college-bharatpur-official-institutional-portal", "luxe-mumbai-lifestyle-hospitality-portal"],
    faqs: [
      { question: "Do you build custom code or use templates?", answer: "All our web platforms are 100% custom-coded in Next.js, React, and TypeScript without rigid third-party themes." }
    ],
    relatedServiceSlugs: ["mobile-app-development", "seo", "ui-ux-design"]
  },
  {
    id: "srv-mobile-dev",
    slug: "mobile-app-development",
    divisionNumber: "02",
    divisionTitle: "Web & Mobile Development",
    title: "Mobile App Development (iOS & Android)",
    tagline: "Cross-platform Flutter & React Native apps with offline sync and hardware integration.",
    heroSubtitle: "High-performance native apps with GPS tracking, biometric authentication, and thermal receipt printing.",
    description: "We engineer rugged, intuitive mobile applications designed for rural collection centers, field delivery agents, and urban consumer smartphones.",
    deliveryStatus: "ACTIVE",
    badge: "Mobile Engineering",
    iconName: "Smartphone",
    challenges: [
      { title: "Intermittent Rural Connectivity", desc: "Traditional apps failing in remote field locations with zero cellular coverage." },
      { title: "Slow Transaction Processing", desc: "Laggy checkouts and payment failures creating friction for retail users." }
    ],
    solutions: [
      { title: "Offline-First Synchronization", desc: "Local SQLite database caching with automated background sync when connectivity resumes." },
      { title: "Sub-Second Latency Engines", desc: "Optimized mobile pipelines supporting biometric touch authorization and instant receipt dispatch." }
    ],
    serviceOfferings: [
      { title: "Field Logistics & Procurement Apps", desc: "FAT/SNF milk pricing calculators, vehicle route tracking, and Bluetooth thermal printing." },
      { title: "Fintech & Mobile Wallets", desc: "QR payment settlements, ledger reconciliation, and biometric auth." },
      { title: "Customer Account & Loyalty Apps", desc: "Push notifications, reward points, and direct WhatsApp customer support." }
    ],
    features: ["Offline-first local caching", "Bluetooth hardware integration", "Biometric authentication", "Push notification engine"],
    benefits: ["98% error reduction in milk procurement", "Zero downtime in rural areas"],
    industries: ["Dairy & Logistics", "Fintech", "Retail", "Healthcare"],
    technologies: ["React Native", "Flutter", "Node.js", "SQLite", "Firebase", "WebSockets"],
    relevantProjectSlugs: ["dairy-muneem-milk-procurement-logistics-app", "fintech-mobile-wallet-micro-transactions-engine"],
    faqs: [
      { question: "Can a single app work on both Android and iOS?", answer: "Yes, we use React Native and Flutter frameworks to build high-performance cross-platform apps with 90%+ shared codebases." }
    ],
    relatedServiceSlugs: ["web-development", "ai-automation"]
  },

  // 03. AI & BUSINESS AUTOMATION
  {
    id: "srv-ai-automation",
    slug: "ai-automation",
    divisionNumber: "03",
    divisionTitle: "AI & Business Automation",
    title: "AI Agents & Workflow Automation",
    tagline: "Deterministic rule engines, automated document processing, and intelligent integrations.",
    heroSubtitle: "Automate repetitive clerical workflows with AI assistants, OCR extraction, and statutory legal mapping.",
    description: "Royal Business Machine designs explainable, human-in-the-loop AI systems—exemplified by our proprietary NyayaSetu legal FIR assistant and automated serial warranty lookup engines.",
    deliveryStatus: "ACTIVE",
    badge: "Applied AI",
    iconName: "Cpu",
    challenges: [
      { title: "LLM Hallucinations in High-Stakes Legal Contexts", desc: "Unreliable answers and fabricated statutes from generic public AI bots." },
      { title: "Hours Spent on Manual Data Entry", desc: "Staff manually extracting invoice numbers, customer warranty queries, and filing circulars." }
    ],
    solutions: [
      { title: "Deterministic Validation Engines", desc: "Hybrid architecture combining fast semantic embeddings with strict rule-based verification." },
      { title: "Intelligent Document Pipelines", desc: "Automated OCR extraction, contract parsing, and instant database ingestion." }
    ],
    serviceOfferings: [
      { title: "NyayaSetu Legal AI Assistant", desc: "BNS / IPC statute mapping and structured FIR drafting for law enforcement and legal aid." },
      { title: "Automated Warranty Verification Engines", desc: "Instant serial-number validity verification handling 1,500+ monthly customer lookups." },
      { title: "Custom Internal Knowledge AI Agents", desc: "Secure enterprise retrieval-augmented generation (RAG) querying confidential company documentation." }
    ],
    features: ["Strict human-in-the-loop explainability", "Zero data sharing with public LLMs", "Sub-second retrieval"],
    benefits: ["1,500+ monthly customer queries automated", "Zero legal citation hallucination"],
    industries: ["Legal & Governance", "Manufacturing", "Automotive", "Enterprise Services"],
    technologies: ["Python", "FastEmbed", "PostgreSQL Vector", "LangChain", "Deterministic Rules Engine"],
    relevantProjectSlugs: ["nyayasetu-ai-legal-awareness-fir-assistant", "flash-batteries-industrial-website-distributor-portal"],
    faqs: [
      { question: "Is my business data kept private?", answer: "Yes. All our AI models operate on private, isolated VPC instances with strict non-disclosure safeguards." }
    ],
    relatedServiceSlugs: ["whatsapp-automation", "software-development", "data-analytics"]
  },
  {
    id: "srv-whatsapp-automation",
    slug: "whatsapp-automation",
    divisionNumber: "03",
    divisionTitle: "AI & Business Automation",
    title: "WhatsApp AI & Conversational Automation",
    tagline: "Turn WhatsApp into an automated sales desk, appointment booker, and support concierge.",
    heroSubtitle: "Automated product catalogs, instant safari booking confirmations, and transactional alerts directly inside WhatsApp.",
    description: "Leverage the official Meta WhatsApp Business API to handle inquiries 24/7, accept orders, and send automated transactional receipts.",
    deliveryStatus: "ACTIVE",
    badge: "Conversational AI",
    iconName: "MessageSquare",
    challenges: [
      { title: "Delayed Customer Responses", desc: "Leads dropping off because inquiries aren't answered during non-business hours." }
    ],
    solutions: [
      { title: "24/7 Conversational Bot", desc: "Instant interactive menus, pricing quotations, and calendar booking links." }
    ],
    serviceOfferings: [
      { title: "WhatsApp E-Commerce & Catalogs", desc: "Browse items, add to cart, and generate payment links inside chat." },
      { title: "Instant Booking & Permit Alerts", desc: "Automated booking confirmation and PDF slip delivery." },
      { title: "Transactional Payment Receipts", desc: "Automated post-purchase invoice dispatches." }
    ],
    features: ["Official Meta Green Tick verification", "Multi-agent shared team inbox", "Automated webhook triggers"],
    benefits: ["Direct bookings increased by 180%", "Zero lead abandonment during off-hours"],
    industries: ["Hospitality", "Retail", "Healthcare", "Education"],
    technologies: ["Meta Cloud API", "Node.js", "Webhooks", "Redis"],
    relevantProjectSlugs: ["jim-corbett-wildlife-safari-resort-booking-portal", "dairy-muneem-milk-procurement-logistics-app"],
    faqs: [
      { question: "Does this use the official WhatsApp Business API?", answer: "Yes, we integrate through official Meta Business Solution Providers (BSPs) ensuring zero risk of phone number banning." }
    ],
    relatedServiceSlugs: ["sms-rcs", "ai-automation", "digital-marketing"]
  },

  // 04. DIGITAL MARKETING & ADVERTISING
  {
    id: "srv-digital-marketing",
    slug: "digital-marketing",
    divisionNumber: "04",
    divisionTitle: "Digital Marketing & Advertising",
    title: "Performance Digital Marketing & Lead Funnels",
    tagline: "Data-driven Google Ads, Meta campaigns, and high-ROI conversion funnels.",
    heroSubtitle: "Stop burning marketing budget on vanity impressions. We build measurable customer acquisition engines.",
    description: "From luxury hospitality promotions in Mumbai to regional educational admissions campaigns across Rajasthan, our performance marketing targets verified high-intent commercial buyers.",
    deliveryStatus: "ACTIVE",
    badge: "Performance Growth",
    iconName: "TrendingUp",
    challenges: [
      { title: "Wasted Ad Spend on Unqualified Clicks", desc: "High CPCs with low lead-to-customer conversion ratios." },
      { title: "Unreliable Attribution", desc: "Inability to trace which marketing channel actually generated high-ticket sales." }
    ],
    solutions: [
      { title: "Conversion API & Server-Side Tracking", desc: "Zero data loss from iOS privacy restrictions with direct server-to-ad-network event sync." },
      { title: "Hyper-Targeted B2B Funnels", desc: "Targeting institutional buyers, school principals, and wholesale distributors." }
    ],
    serviceOfferings: [
      { title: "Google Search & Shopping Ads", desc: "Capture high-intent purchase queries with negative keyword hardening." },
      { title: "Meta (Facebook & Instagram) Growth", desc: "Engaging video creatives, lookalike audiences, and direct WhatsApp lead generation." },
      { title: "High-Ticket B2B Lead Generation", desc: "Targeted outbound funnels for corporate contracts and institutional tenders." }
    ],
    features: ["Server-side tracking", "Weekly transparent ROAS dashboards", "Creative A/B testing"],
    benefits: ["240% increase in online sales", "Proven low cost-per-lead"],
    industries: ["Hospitality", "Fashion Apparel", "Agriculture", "Education"],
    technologies: ["Google Ads API", "Meta Conversions API", "Google Analytics 4", "Looker Studio"],
    relevantProjectSlugs: ["jaivik-desh-organic-agriculture-ecommerce-platform", "grand-palace-heritage-banquet-tourism-portal"],
    faqs: [
      { question: "What is your recommended minimum ad budget?", answer: "We recommend starting with at least ₹15,000 to ₹30,000/month in ad spend to ensure sufficient statistical data for conversion optimization." }
    ],
    relatedServiceSlugs: ["seo", "whatsapp-automation", "ui-ux-design"]
  },
  {
    id: "srv-seo",
    slug: "seo",
    divisionNumber: "04",
    divisionTitle: "Digital Marketing & Advertising",
    title: "Technical & Local Search Dominance (SEO/AEO/GEO)",
    tagline: "Achieve #1 organic rankings on Google and prepare for AI search engines (Perplexity, Gemini, ChatGPT).",
    heroSubtitle: "Dominate district and nationwide search results with technical schema, local Google Business Profiles, and Answer Engine Optimization.",
    description: "Our SEO engineering helped Jim Corbett Luxury Safaris achieve #1 district organic visibility and college portals rank across state education searches.",
    deliveryStatus: "ACTIVE",
    badge: "Search Authority",
    iconName: "Search",
    challenges: [
      { title: "Dominance by High-Commission Aggregators", desc: "OTAs and directories stealing organic search clicks and charging 20%+ commission fees." }
    ],
    solutions: [
      { title: "Hyper-Local SEO & Structured Schema", desc: "Target high-intent transactional search keywords to secure position #1 over generic aggregators." }
    ],
    serviceOfferings: [
      { title: "Local Multi-District Search Domination", desc: "Rank across Bharatpur, Jaipur, Alwar, Karauli, and surrounding commercial districts." },
      { title: "Technical Core Web Vitals Audit", desc: "Fix render blocking, cumulative layout shift, and server response latency." },
      { title: "Answer Engine Optimization (AEO/GEO)", desc: "Structured JSON-LD schema ensuring your company is cited by Gemini and ChatGPT search." }
    ],
    features: ["JSON-LD Schema implementation", "Local Google Business optimization", "Monthly keyword tracking"],
    benefits: ["#1 organic search visibility", "Zero recurring OTA commission costs"],
    industries: ["Tourism & Hospitality", "Higher Education", "Industrial Manufacturing"],
    technologies: ["Google Search Console", "Schema.org", "Next.js Metadata Route", "Screaming Frog"],
    relevantProjectSlugs: ["jim-corbett-wildlife-safari-resort-booking-portal", "apex-college-of-d-pharma-institutional-portal"],
    faqs: [
      { question: "How quickly can we rank on Google?", answer: "Technical fixes and Local Map Pack optimizations often show measurable gains within 30 to 60 days; competitive non-brand keywords typically mature over 90 to 180 days." }
    ],
    relatedServiceSlugs: ["digital-marketing", "web-development"]
  },

  // 05. BUSINESS COMMUNICATION SOLUTIONS
  {
    id: "srv-sms-rcs",
    slug: "sms-rcs",
    divisionNumber: "05",
    divisionTitle: "Business Communication Solutions",
    title: "SMS, RCS & Enterprise Messaging Infrastructure",
    tagline: "Transactional SMS gateways, Rich Communication Services (RCS), and mass alerts.",
    heroSubtitle: "Deliver critical OTPs, milk procurement slips, exam results, and promotional campaigns with 99.9% delivery reliability.",
    description: "Royal Business Machine partners with audited telecommunications infrastructure providers to provide high-throughput DLT-compliant SMS and rich interactive RCS messaging.",
    deliveryStatus: "ACTIVE",
    badge: "CPaaS Infrastructure",
    iconName: "Send",
    challenges: [
      { title: "Delayed OTP Delivery", desc: "Slow SMS routes causing user registration dropoffs and failed checkout attempts." },
      { title: "DLT Registration Hassles", desc: "Complex telecom regulatory compliance and template approval bottlenecks." }
    ],
    solutions: [
      { title: "Direct Tier-1 Telecom Gateways", desc: "Sub-5 second OTP delivery with automated fallback across secondary routes." },
      { title: "End-to-End DLT Compliance Handling", desc: "Assistance with entity registration, sender ID allocation, and template approvals." }
    ],
    serviceOfferings: [
      { title: "Transactional OTP & Alert Gateways", desc: "Bank-grade latency for mission-critical notifications and farmer payment slips." },
      { title: "Interactive RCS Messaging", desc: "Send rich media carousels, action buttons, and verified brand sender cards directly into Android Messages." },
      { title: "Bulk Promotional Campaigns", desc: "Cost-effective promotional dispatches targeted to opted-in enterprise customer segments." }
    ],
    features: ["DLT compliance assistance", "Sub-5 second OTP delivery", "Real-time delivery status reports", "RESTful API integration"],
    benefits: ["100% compliant with TRAI regulations", "Higher engagement via interactive RCS"],
    industries: ["Dairy & Logistics", "Education", "Banking & Finance", "Healthcare"],
    technologies: ["SMPP Protocol", "REST API", "DLT Gateway", "RCS Universal Profile"],
    relevantProjectSlugs: ["dairy-muneem-milk-procurement-logistics-app"],
    faqs: [
      { question: "Do you help with TRAI DLT registration?", answer: "Yes, our team assists enterprise clients with entity approval, header creation, and consent template approvals." }
    ],
    relatedServiceSlugs: ["voice-solutions", "whatsapp-automation", "call-centre"]
  },
  {
    id: "srv-voice-solutions",
    slug: "voice-solutions",
    divisionNumber: "05",
    divisionTitle: "Business Communication Solutions",
    title: "Automated Voice Calls & Outbound Dialing (OBD)",
    tagline: "Automated voice broadcasting, interactive IVR trees, and citizen service announcements.",
    heroSubtitle: "Reach thousands of regional users simultaneously with pre-recorded voice circulars in Hindi and regional dialects.",
    description: "Mass voice broadcasting infrastructure ideal for university examination reminders, public health advisories, and municipal alerts.",
    deliveryStatus: "ACTIVE",
    badge: "Voice Systems",
    iconName: "PhoneCall",
    challenges: [
      { title: "Low Literacy Barriers in Rural Markets", desc: "Text SMS messages failing to engage non-reading rural beneficiaries." }
    ],
    solutions: [
      { title: "Automated Vernacular Voice OBD", desc: "Crystal-clear recorded voice broadcasts delivering notifications in Hindi and regional languages." }
    ],
    serviceOfferings: [
      { title: "Outbound Dialing (OBD) Campaigns", desc: "Simultaneous voice dispatches for farmer meetings, exam schedules, and bill reminders." },
      { title: "Interactive Voice Response (IVR)", desc: "Automated multi-option customer self-service telephony menus." }
    ],
    features: ["Automated retry on busy lines", "Detailed call-pickup analytics", "Custom vernacular recording"],
    benefits: ["Reaches 100% of rural audience", "High response engagement"],
    industries: ["Agriculture & Dairy", "Higher Education", "Government & Public Sector"],
    technologies: ["SIP Trunking", "Telephony Gateways", "Text-to-Speech (TTS)", "IVR Dialers"],
    relevantProjectSlugs: ["dairy-muneem-milk-procurement-logistics-app"],
    faqs: [
      { question: "What happens if the recipient doesn't pick up?", answer: "Our system automatically schedules smart retries at configured intervals to ensure maximum message delivery." }
    ],
    relatedServiceSlugs: ["sms-rcs", "call-centre"]
  },

  // 06. CUSTOMER SUPPORT & CALL CENTRE
  {
    id: "srv-call-centre",
    slug: "call-centre",
    divisionNumber: "06",
    divisionTitle: "Customer Support & Call Centre",
    title: "Managed Call Centre & Inbound Helpline Solutions",
    tagline: "Dedicated inbound support desks, lead qualification, and customer onboarding.",
    heroSubtitle: "Deliver responsive, professional customer care integrated directly with your enterprise CRM.",
    description: "Planned for selective enterprise rollouts, our managed call center operations provide dedicated telephone agents handling customer support, admissions inquiries, and lead qualification.",
    deliveryStatus: "PLANNED",
    badge: "Managed Operations",
    iconName: "Headphones",
    challenges: [
      { title: "Inbound Support Bottlenecks", desc: "Small internal teams overwhelmed by warranty verification and basic inquiry calls." }
    ],
    solutions: [
      { title: "Dedicated Lead Qualification Desks", desc: "Trained operators fielding initial inquiries, screening budget fit, and routing hot leads to executive closers." }
    ],
    serviceOfferings: [
      { title: "Inbound Customer Support", desc: "Ticket creation, complaint handling, and warranty status lookup." },
      { title: "Outbound Admissions & Lead Qualification", desc: "Following up with student college applicants and commercial quotation inquiries." },
      { title: "CRM-Synchronized Call Logging", desc: "Every call recording and summary logged directly against customer records." }
    ],
    features: ["CRM integration", "Call recording & audit logs", "Hindi & English support parity"],
    benefits: ["Zero missed customer calls", "Accelerates lead qualification times"],
    industries: ["Higher Education", "Automotive", "Healthcare"],
    technologies: ["Cloud Telephony", "CRM API", "WebRTC"],
    relevantProjectSlugs: ["flash-batteries-industrial-website-distributor-portal"],
    faqs: [
      { question: "Is this service available immediately?", answer: "This service is currently in the planned phase for dedicated enterprise accounts. Contact our leadership desk to discuss capacity and deployment timelines." }
    ],
    relatedServiceSlugs: ["voice-solutions", "crm-solutions"]
  },

  // 07. UI/UX & CREATIVE STUDIO
  {
    id: "srv-ui-ux-design",
    slug: "ui-ux-design",
    divisionNumber: "07",
    divisionTitle: "UI/UX & Creative Studio",
    title: "UI/UX Architecture & Brand Identity Studio",
    tagline: "Luxury digital design systems, intuitive ergonomics, and turnkey physical corporate branding.",
    heroSubtitle: "Bridge digital web design with physical prestige: metallic visiting cards, packaging boxes, and high-impact design systems.",
    description: "Royal Business Machine uniquely pairs digital UI/UX engineering in Figma with state-of-the-art physical printing equipment for a truly unified brand presence.",
    deliveryStatus: "ACTIVE",
    badge: "Creative Studio",
    iconName: "Palette",
    challenges: [
      { title: "Mismatched Brand Identity", desc: "Premium online web presence paired with cheap, poorly printed visiting cards and packaging boxes." }
    ],
    solutions: [
      { title: "Omnichannel Brand Consistency", desc: "Unified design guidelines spanning Figma component libraries, physical foil-embossed corporate stationery, and digital lookbooks." }
    ],
    serviceOfferings: [
      { title: "Enterprise Web & Mobile UI/UX", desc: "Figma wireframes, interactive prototypes, and luxury dark/gold design tokens." },
      { title: "Turnkey Brand Identity Packages", desc: "Official logos, brand typography books, color standards, and business stationery." },
      { title: "Physical Foil & Packaging Printing", desc: "Custom die-cut metallic hangtags, embossed gold foil visiting cards, and luxury boxes." }
    ],
    features: ["Figma design system exports", "Custom physical die-cut tooling", "Motion graphics & 3D styling"],
    benefits: ["Commands premium pricing tiers", "Prestige shelf presence in retail showrooms"],
    industries: ["Fashion & Lifestyle", "Hospitality", "Corporate Enterprises"],
    technologies: ["Figma", "Adobe Illustrator", "Three.js", "Framer Motion", "Heidelberg Offset Printing"],
    relevantProjectSlugs: ["diya-creation-fashion-label-apparel-suite", "luxe-mumbai-lifestyle-hospitality-portal"],
    faqs: [
      { question: "Can you handle both the digital design and the physical printing?", answer: "Yes! Single-point accountability for digital software and high-precision physical printing is Royal Business Machine's signature advantage." }
    ],
    relatedServiceSlugs: ["web-development", "digital-marketing"]
  },

  // 08. CLOUD, DEVOPS & IT INFRASTRUCTURE
  {
    id: "srv-cloud-devops",
    slug: "cloud-devops",
    divisionNumber: "08",
    divisionTitle: "Cloud, DevOps & IT Infrastructure",
    title: "Cloud Infrastructure, DevOps & Server Hardening",
    tagline: "AWS, Google Cloud, Docker microservices, automated CI/CD, and 99.9% uptime architectures.",
    heroSubtitle: "Deploy scalable, fault-tolerant infrastructure built to withstand sudden traffic spikes and DDoS attacks.",
    description: "We architect, configure, and manage cloud infrastructures capable of serving high-concurrency public examination result announcements without slowdowns.",
    deliveryStatus: "ACTIVE",
    badge: "Cloud Architecture",
    iconName: "Cloud",
    challenges: [
      { title: "Server Crashes on Sudden Surges", desc: "Legacy shared servers going down when university exam circulars or press releases go live." }
    ],
    solutions: [
      { title: "Edge CDN & Auto-Scaling Container Pods", desc: "Dockerized container clusters that scale dynamically based on real-time request volume." }
    ],
    serviceOfferings: [
      { title: "Cloud Architecture (AWS / GCP / Vercel)", desc: "VPC setup, secure IAM access control, managed databases, and object storage." },
      { title: "Automated CI/CD Deployment Pipelines", desc: "Zero-downtime rolling releases with GitHub Actions and Docker registries." },
      { title: "Database Hardening & Automated Backups", desc: "Point-in-time PostgreSQL recovery, Redis cluster caching, and encryption at rest." }
    ],
    features: ["Automated daily offsite backups", "DDoS mitigation via Cloudflare Edge", "99.9% server uptime SLA"],
    benefits: ["Zero server crash during 100k+ surges", "Sub-200ms API response latency"],
    industries: ["Higher Education", "Fintech", "Healthcare"],
    technologies: ["Docker", "Kubernetes", "AWS", "Google Cloud", "PostgreSQL", "Redis", "GitHub Actions"],
    relevantProjectSlugs: ["govt-college-bharatpur-official-institutional-portal", "hms-multi-specialty-hospital-management-system"],
    faqs: [
      { question: "Do you provide ongoing server maintenance?", answer: "Yes, we offer monthly SLA-backed cloud management, security patch monitoring, and uptime supervision." }
    ],
    relatedServiceSlugs: ["software-development", "software-testing"]
  },

  // 09. SOFTWARE TESTING & CYBERSECURITY
  {
    id: "srv-software-testing",
    slug: "software-testing",
    divisionNumber: "09",
    divisionTitle: "Software Testing & Cybersecurity",
    title: "Software Testing, Security Audits & Forensics",
    tagline: "Penetration testing, automated QA regression, biometric security, and paper-leak prevention.",
    heroSubtitle: "Inviolable software quality assurance and forensic security protocols for educational and enterprise authorities.",
    description: "Royal Business Machine engineered proprietary Anti-Paper Leak examination distribution systems featuring dynamic candidate-specific steganographic watermarking and GPS geofencing.",
    deliveryStatus: "ACTIVE",
    badge: "Cybersecurity",
    iconName: "ShieldAlert",
    challenges: [
      { title: "Confidential Document Leaks", desc: "Compromised center staff photographing test papers with smartphones." }
    ],
    solutions: [
      { title: "Forensic Steganographic Watermarking", desc: "Invisible, traceable candidate and station identifiers embedded across every square centimeter." }
    ],
    serviceOfferings: [
      { title: "Anti-Leak Examination Security Software", desc: "GPS-locked document decryption and dynamic watermarking for regulatory boards." },
      { title: "Vulnerability Assessment & Pen Testing", desc: "Ethical security penetration audits detecting SQL injections, CSRF, and broken access control." },
      { title: "Automated QA & Load Testing", desc: "Simulate 50,000+ simultaneous virtual users to stress-test APIs and database queries." }
    ],
    features: ["AES-256 encryption", "Steganographic watermarking", "GPS geofencing", "Automated Playwright test suites"],
    benefits: ["Eliminated confidential document leak risks", "Identifies security vulnerabilities before launch"],
    industries: ["Government & Public Sector", "Higher Education", "Fintech"],
    technologies: ["Playwright", "Jest", "OWASP ZAP", "AES-256", "GPS Geolocation API"],
    relevantProjectSlugs: ["anti-paper-leak-secure-examination-software"],
    faqs: [
      { question: "Can you audit our existing website or software for security flaws?", answer: "Yes, we perform comprehensive vulnerability assessments and deliver a prioritized remediation roadmap." }
    ],
    relatedServiceSlugs: ["software-development", "cloud-devops"]
  },

  // 10. DATA ANALYTICS & BUSINESS INTELLIGENCE
  {
    id: "srv-data-analytics",
    slug: "data-analytics",
    divisionNumber: "10",
    divisionTitle: "Data Analytics & Business Intelligence",
    title: "Data Analytics, Dashboards & Business Intelligence",
    tagline: "Transform fragmented operational records into executive KPI dashboards and predictive forecasts.",
    heroSubtitle: "Real-time visibility into multi-branch milk procurement, hospital bed occupancy, and commercial trade revenues.",
    description: "We design tailored analytics pipelines that aggregate transactions across branches, calculate margins automatically, and alert leadership to operational bottlenecks.",
    deliveryStatus: "ACTIVE",
    badge: "Business Intelligence",
    iconName: "BarChart3",
    challenges: [
      { title: "Blind Spots in Multi-Branch Operations", desc: "Executive decisions delayed by days because branch data must be compiled manually." }
    ],
    solutions: [
      { title: "Real-Time Executive Dashboards", desc: "Live KPI tracking displaying daily revenue, branch procurement, and inventory turnover." }
    ],
    serviceOfferings: [
      { title: "Custom Business Intelligence Dashboards", desc: "Clean visual representations of revenue streams, sales cycles, and operational efficiency." },
      { title: "Automated Pricing & Calculation Engines", desc: "Real-time algorithmic formulas (e.g. Milk Fat & SNF rate matrix calculations)." },
      { title: "Automated Executive Reporting", desc: "Daily summary dispatches sent directly to leadership via email and WhatsApp." }
    ],
    features: ["Sub-second calculation speed", "Interactive drill-down charts", "Automated daily digests"],
    benefits: ["Real-time decision making", "Zero calculation discrepancies across collection centers"],
    industries: ["Dairy & Agriculture", "Healthcare", "Commercial Commodity Trading"],
    technologies: ["PostgreSQL", "Python", "Chart.js", "Redis", "Metabase"],
    relevantProjectSlugs: ["dairy-muneem-milk-procurement-logistics-app", "pavitra-enterprise-multi-commodity-platform"],
    faqs: [
      { question: "Can these dashboards be accessed on mobile phones?", answer: "Yes, all dashboards are fully responsive and optimized for mobile viewing by on-the-go business owners." }
    ],
    relatedServiceSlugs: ["software-development", "ai-automation"]
  },

  // 11. TRAINING & SKILL DEVELOPMENT
  {
    id: "srv-training",
    slug: "training",
    divisionNumber: "11",
    divisionTitle: "Training & Skill Development",
    title: "Institutional IT Training & Technology Workshops",
    tagline: "Practical software development, coding workshops, and turnkey institutional computer laboratory setups.",
    heroSubtitle: "Bridging the academic-industry gap for colleges and regional students across Rajasthan.",
    description: "Delivered through selective institutional partnerships and campus computer laboratories, we provide practical, hands-on training in modern software engineering.",
    deliveryStatus: "REQUIRES DELIVERY CAPABILITY",
    badge: "Institutional Training",
    iconName: "GraduationCap",
    challenges: [
      { title: "Theoretical Syllabi Mismatched with Industry", desc: "College graduates lacking practical experience in React, Next.js, and modern cloud deployment." }
    ],
    solutions: [
      { title: "Production-Grade Engineering Curriculum", desc: "Students build and deploy real web and mobile apps using Git, Node.js, and modern databases." }
    ],
    serviceOfferings: [
      { title: "Institutional Computer Lab Setup", desc: "Turnkey hardware provisioning, gigabit networking, and Linux terminal setups." },
      { title: "Full-Stack Web & Mobile Coding Bootcamps", desc: "Hands-on project-based instruction covering React, Next.js, and Flutter." },
      { title: "Corporate Software Workforce Training", desc: "Upskilling enterprise staff on newly deployed custom ERP and CRM systems." }
    ],
    features: ["Live deployment portfolio projects", "Institutional MOU frameworks", "Smart interactive panel integration"],
    benefits: ["Equips institutions with accredited IT facilities", "Hands-on production readiness"],
    industries: ["Higher Education", "Vocational Institutions", "Government Skill Programs"],
    technologies: ["Next.js", "React", "Python", "Linux", "Git"],
    relevantProjectSlugs: ["govt-college-bharatpur-official-institutional-portal", "apex-college-of-d-pharma-institutional-portal"],
    faqs: [
      { question: "How are these training programs delivered?", answer: "Programs are conducted directly at partnering college campuses or corporate client offices under formal institutional MOUs." }
    ],
    relatedServiceSlugs: ["software-development", "business-consulting"]
  },

  // 12. BUSINESS & INSTITUTIONAL CONSULTING
  {
    id: "srv-business-consulting",
    slug: "business-consulting",
    divisionNumber: "12",
    divisionTitle: "Business & Institutional Consulting",
    title: "Digital Transformation & Statutory Advisory",
    tagline: "Turnkey startup launchpacks, government tender execution, statutory Udyam/GST advisory, and IT strategy.",
    heroSubtitle: "Strategic advisory led by Founder & CEO Pavitra Arora, guiding businesses through technological and statutory growth.",
    description: "We provide high-level technology and operational consulting for business owners transitioning from legacy setups to scalable digital platforms.",
    deliveryStatus: "ACTIVE",
    badge: "Executive Advisory",
    iconName: "Briefcase",
    challenges: [
      { title: "High Failure Rate in Agency Coordination", desc: "Business owners juggling separate freelancers for design, coding, printing, and tax compliance." }
    ],
    solutions: [
      { title: "Single-Point Execution Partner", desc: "One accountable partner handling software architecture, statutory registration, and commercial launch." }
    ],
    serviceOfferings: [
      { title: "Startup Growth Launchpacks", desc: "Investor-grade pitch decks, unit economics modeling, and rapid 6-week MVP prototyping." },
      { title: "Government Tender Technical Execution", desc: "Drafting tender-compliant technical specifications, hardware BOMs, and SLA contracts." },
      { title: "Statutory Business Registration Guidance", desc: "Assistance with Udyam MSME certification, GST compliance, and enterprise merchant setups." }
    ],
    features: ["Direct consultation with CEO Pavitra Arora", "Investor-grade financial modeling", "Statutory compliance alignment"],
    benefits: ["Accelerates time-to-market", "Eliminates agency coordination friction"],
    industries: ["Startups & SMEs", "Government & Public Sector", "Commercial Enterprises"],
    technologies: ["Financial Modeling", "Udyam MSME", "Technical RFP Specs"],
    relevantProjectSlugs: ["govt-college-bharatpur-official-institutional-portal", "dairy-muneem-milk-procurement-logistics-app"],
    faqs: [
      { question: "Who leads the consulting engagements?", answer: "All strategic consulting engagements are led directly by Founder & CEO Pavitra Arora alongside senior engineering leads." }
    ],
    relatedServiceSlugs: ["software-development", "cloud-devops"]
  }
];

export const SERVICE_DIVISIONS_LIST = [
  { id: "div-01", number: "01", title: "Software & Enterprise Solutions", icon: "Code2", slugs: ["software-development", "erp-solutions"] },
  { id: "div-02", number: "02", title: "Web & Mobile Development", icon: "Globe", slugs: ["web-development", "mobile-app-development"] },
  { id: "div-03", number: "03", title: "AI & Business Automation", icon: "Cpu", slugs: ["ai-automation", "whatsapp-automation"] },
  { id: "div-04", number: "04", title: "Digital Marketing & Advertising", icon: "TrendingUp", slugs: ["digital-marketing", "seo"] },
  { id: "div-05", number: "05", title: "Business Communication Solutions", icon: "Send", slugs: ["sms-rcs", "voice-solutions"] },
  { id: "div-06", number: "06", title: "Customer Support & Call Centre", icon: "Headphones", slugs: ["call-centre"] },
  { id: "div-07", number: "07", title: "UI/UX & Creative Studio", icon: "Palette", slugs: ["ui-ux-design"] },
  { id: "div-08", number: "08", title: "Cloud, DevOps & IT Infrastructure", icon: "Cloud", slugs: ["cloud-devops"] },
  { id: "div-09", number: "09", title: "Software Testing & Cybersecurity", icon: "ShieldAlert", slugs: ["software-testing"] },
  { id: "div-10", number: "10", title: "Data Analytics & Business Intelligence", icon: "BarChart3", slugs: ["data-analytics"] },
  { id: "div-11", number: "11", title: "Training & Skill Development", icon: "GraduationCap", slugs: ["training"] },
  { id: "div-12", number: "12", title: "Business & Institutional Consulting", icon: "Briefcase", slugs: ["business-consulting"] },
];
