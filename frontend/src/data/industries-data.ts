export interface IndustrySolution {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  challenges: string[];
  solutions: string[];
  deliverables: string[];
  relevantServiceSlugs: string[];
  relevantProductSlugs: string[];
  caseStudySlugs: string[];
}

export const ALL_INDUSTRIES: IndustrySolution[] = [
  {
    id: "ind-education",
    slug: "education",
    name: "Education & EdTech",
    tagline: "Turnkey computer labs, 100,000+ concurrency college portals, and student noticeboards.",
    description: "Royal Business Machine delivers high-security academic web platforms, document vaults, regulatory PCI disclosure repositories, and smart classroom hardware for universities and government colleges.",
    iconName: "GraduationCap",
    challenges: [
      "Legacy servers crashing during annual examination result announcements.",
      "Regulatory scrutiny regarding mandatory public council disclosures.",
      "Rural students unable to access college circulars on low-bandwidth mobile networks."
    ],
    solutions: [
      "Next.js 16 SSG architecture with edge CDN caching sustaining 100,000+ simultaneous requests.",
      "Secure document vaults for syllabus guidelines and state tender notifications.",
      "WCAG 2.1 AA bilingual (Hindi/English) mobile-optimized accessibility."
    ],
    deliverables: ["Institutional Portals", "Student Noticeboard Dispatches", "Smart Lab Hardware Setup"],
    relevantServiceSlugs: ["software-development", "web-development", "training"],
    relevantProductSlugs: ["college-erp", "task-operations-manager"],
    caseStudySlugs: ["govt-college-bharatpur-official-institutional-portal", "govt-college-karauli-official-institutional-portal", "apex-college-of-d-pharma-institutional-portal"]
  },
  {
    id: "ind-healthcare",
    slug: "healthcare",
    name: "Healthcare & Clinical Systems",
    tagline: "Centralized multi-specialty clinical ERP, electronic health records (EHR), and pharmacy inventory.",
    description: "We deploy enterprise healthcare systems integrating OPD triage, bed allocation, digital prescription pads, diagnostic laboratory reports, and pharmacy dispensing queues.",
    iconName: "Activity",
    challenges: [
      "Fragmented paper records causing 3-hour patient discharge delays.",
      "Pharmacy stock discrepancies and lost medication charts.",
      "Lack of verifiable QR codes on critical diagnostic laboratory reports."
    ],
    solutions: [
      "HL7-compliant central EHR database with role-based access for doctors and nurses.",
      "Automated prescription-to-pharmacy fulfillment queues.",
      "Cryptographic QR code verification on patient test results."
    ],
    deliverables: ["Hospital Management Software (HMS)", "Doctor OPD Schedulers", "Pharmacy Inventory Ledgers"],
    relevantServiceSlugs: ["software-development", "cloud-devops", "data-analytics"],
    relevantProductSlugs: ["hospital-management-system", "appointment-system"],
    caseStudySlugs: ["hms-multi-specialty-hospital-management-system", "shri-haridutt-ayurvedic-medical-college-hospital"]
  },
  {
    id: "ind-hospitality",
    slug: "hospitality",
    name: "Hospitality & Eco-Tourism",
    tagline: "Direct reservation booking engines, safari permit systems, and banquet wedding showcases.",
    description: "Empowering luxury safari resorts, heritage banquets, and boutique concierges to capture direct bookings and eliminate steep 20%+ OTA commission fees.",
    iconName: "Utensils",
    challenges: [
      "High seasonality and total dependence on third-party aggregators.",
      "Difficulty visualizing heritage hall spaces for destination wedding planners."
    ],
    solutions: [
      "Localized SEO driving #1 district organic visibility for safari packages.",
      "360-degree virtual tour embeds and automated WhatsApp booking confirmations."
    ],
    deliverables: ["Direct Booking Engines", "Interactive Floorplan Portals", "WhatsApp Permit Confirmations"],
    relevantServiceSlugs: ["web-development", "seo", "digital-marketing", "whatsapp-automation"],
    relevantProductSlugs: ["banquet-manager", "whatsapp-automation-suite"],
    caseStudySlugs: ["jim-corbett-wildlife-safari-resort-booking-portal", "grand-palace-heritage-banquet-tourism-portal", "luxe-mumbai-lifestyle-hospitality-portal"]
  },
  {
    id: "ind-manufacturing",
    slug: "manufacturing",
    name: "Manufacturing & Heavy Industry",
    tagline: "Automated warranty lookup engines, raw material BOMs, and B2B distributor portals.",
    description: "Digitizing regional manufacturing operations with automated serial-number lookups, dealer network finders, and perpetual inventory tracking.",
    iconName: "Factory",
    challenges: [
      "Customer support centers overwhelmed with warranty lookup phone calls.",
      "Manual price lists causing days of delay in wholesale order confirmation."
    ],
    solutions: [
      "Automated serial-number database lookup engine handling 1,500+ monthly checks.",
      "Tiered B2B distributor portal with instant GST proforma generation."
    ],
    deliverables: ["Warranty Verification Engines", "B2B Dealer Portals", "Shop-Floor Inventory"],
    relevantServiceSlugs: ["software-development", "erp-solutions", "data-analytics"],
    relevantProductSlugs: ["inventory-pos", "crm-platform"],
    caseStudySlugs: ["flash-batteries-industrial-website-distributor-portal"]
  },
  {
    id: "ind-retail",
    slug: "retail-ecommerce",
    name: "Retail & E-Commerce",
    tagline: "Omnichannel D2C storefronts, automated shipping tariffs, and luxury physical packaging.",
    description: "Bridging digital e-commerce with physical shelf prestige: customized Razorpay online checkouts paired with foil-embossed clothing tags and packaging boxes.",
    iconName: "ShoppingBag",
    challenges: [
      "High shopping cart abandonment and complex weight-based courier rates.",
      "Inconsistent retail branding diluting luxury tier pricing power."
    ],
    solutions: [
      "Custom Next.js e-commerce storefront with automated courier API integrations.",
      "Full branding suites: metallic gold foil hangtags, woven labels, and luxury boxes."
    ],
    deliverables: ["Online Storefronts", "Automated Checkout", "Physical Foil Branding"],
    relevantServiceSlugs: ["web-development", "digital-marketing", "ui-ux-design"],
    relevantProductSlugs: ["crm-platform", "inventory-pos"],
    caseStudySlugs: ["jaivik-desh-organic-agriculture-ecommerce-platform", "diya-creation-fashion-label-apparel-suite"]
  },
  {
    id: "ind-real-estate",
    slug: "real-estate",
    name: "Real Estate & Architecture",
    tagline: "Virtual property walkthroughs, project brochure downloads, and lead routing CRMs.",
    description: "Showcasing commercial developments, townships, and luxury villas with interactive floorplans and automated lead routing.",
    iconName: "Home",
    challenges: [
      "Slow lead follow-up leading to cold sales inquiries.",
      "High cost of physical site visits for out-of-district buyers."
    ],
    solutions: [
      "High-speed digital walkthroughs and instant lead routing to sales agents via WhatsApp.",
      "Investor fact sheet document vaults with gated phone verification."
    ],
    deliverables: ["Virtual Walkthrough Portals", "Agent CRM Routing", "Digital Brochures"],
    relevantServiceSlugs: ["web-development", "digital-marketing", "whatsapp-automation"],
    relevantProductSlugs: ["lead-management-engine", "crm-platform"],
    caseStudySlugs: ["luxe-mumbai-lifestyle-hospitality-portal"]
  },
  {
    id: "ind-logistics",
    slug: "logistics-fleet",
    name: "Logistics & Fleet Operations",
    tagline: "Offline field logistics apps, vehicle route tracking, and automated driver ledgers.",
    description: "Operational software for rural procurement and urban distribution fleets, enabling real-time commodity pricing and offline receipt printing.",
    iconName: "Truck",
    challenges: [
      "Zero cellular connectivity in rural procurement centers.",
      "Disputes over variable grading calculations and delayed driver receipts."
    ],
    solutions: [
      "Offline-first SQLite local caching with automatic background synchronization.",
      "Bluetooth thermal printer integrations generating instant physical receipts."
    ],
    deliverables: ["Offline Field Apps", "Automated Pricing Engines", "Driver / Farmer Slips"],
    relevantServiceSlugs: ["mobile-app-development", "software-development", "sms-rcs"],
    relevantProductSlugs: ["dairy-muneem"],
    caseStudySlugs: ["dairy-muneem-milk-procurement-logistics-app"]
  },
  {
    id: "ind-agriculture",
    slug: "agriculture-dairy",
    name: "Agriculture & Dairy Cooperatives",
    tagline: "Milk procurement calculation engines, farm-to-table batch QR codes, and agri-storefronts.",
    description: "Empowering farmer-producer organizations (FPOs) and dairy cooperatives with automated Fat/SNF calculations and direct-to-consumer digital channels.",
    iconName: "Sprout",
    challenges: [
      "Calculation disputes at milk pooling centers hurting farmer trust.",
      "Intermediaries capturing the bulk of commodity profits."
    ],
    solutions: [
      "Automated Fat/SNF computational pricing matrix eliminating manual errors by 98%.",
      "Direct-to-consumer organic e-commerce storefronts boosting sales by 240%."
    ],
    deliverables: ["Milk Procurement Terminal Apps", "Batch Traceability QR Codes", "D2C Stores"],
    relevantServiceSlugs: ["mobile-app-development", "web-development", "data-analytics"],
    relevantProductSlugs: ["dairy-muneem"],
    caseStudySlugs: ["dairy-muneem-milk-procurement-logistics-app", "jaivik-desh-organic-agriculture-ecommerce-platform"]
  },
  {
    id: "ind-professional-services",
    slug: "professional-services",
    name: "Professional & Legal Services",
    tagline: "AI-assisted incident drafting, statutory compliance portals, and quotation pipelines.",
    description: "Civic technology and commercial platforms enabling law firms, tax consultancies, and chartered accountants to streamline client intake.",
    iconName: "Briefcase",
    challenges: [
      "Unvetted public AI tools producing hallucinated statutes.",
      "Long proposal turnaround times causing lost commercial opportunities."
    ],
    solutions: [
      "Deterministic legal AI (NyayaSetu) combining embeddings with strict BNS/IPC rule validation.",
      "Automated quotation dispatch reducing proposal cycles from 48h to under 4h."
    ],
    deliverables: ["Legal AI Incident Drafts", "B2B Quotation Portals", "Automated Proformas"],
    relevantServiceSlugs: ["ai-automation", "software-development", "business-consulting"],
    relevantProductSlugs: ["crm-platform", "task-operations-manager"],
    caseStudySlugs: ["nyayasetu-ai-legal-awareness-fir-assistant", "pavitra-enterprise-multi-commodity-platform"]
  },
  {
    id: "ind-startups-smes",
    slug: "startups-smes",
    name: "Startups & Emerging MSMEs",
    tagline: "Turnkey MVP prototyping, investor-grade pitch decks, and statutory MSME/Udyam setups.",
    description: "Executive advisory and rapid engineering sprints led by Founder & CEO Pavitra Arora, launching tested digital products in 6 to 8 weeks.",
    iconName: "Rocket",
    challenges: [
      "High agency coordination overhead with fragmented freelancers.",
      "Lack of defensible unit economics modeling for early-stage investors."
    ],
    solutions: [
      "Single-point execution partner handling tech, pitch decks, and legal registration.",
      "Investor-grade financial models and functional production-ready MVPs."
    ],
    deliverables: ["MVP Prototyping", "Pitch Deck Suites", "Statutory Launchpacks"],
    relevantServiceSlugs: ["business-consulting", "web-development", "ui-ux-design"],
    relevantProductSlugs: ["lead-management-engine", "crm-platform"],
    caseStudySlugs: ["fintech-mobile-wallet-micro-transactions-engine"]
  },
  {
    id: "ind-government",
    slug: "government-institutions",
    name: "Government & Public Sector",
    tagline: "Forensic anti-leak examination software, public grievance portals, and bilingual tenders.",
    description: "Mission-critical public sector engineering adhering to strict security protocols, candidate steganographic watermarking, and WCAG accessibility.",
    iconName: "Landmark",
    challenges: [
      "Confidential examination paper leaks via unauthorized smartphone photography.",
      "Legacy government portals crashing during result seasons."
    ],
    solutions: [
      "Steganographic candidate-specific watermarking and GPS geofenced decryption.",
      "High-availability edge CDN infrastructure handling 100k+ concurrent visitors."
    ],
    deliverables: ["Anti-Leak Test Software", "Accessible Public Portals", "Tender Vaults"],
    relevantServiceSlugs: ["software-testing", "software-development", "ai-automation"],
    relevantProductSlugs: ["college-erp"],
    caseStudySlugs: ["anti-paper-leak-secure-examination-software", "govt-college-bharatpur-official-institutional-portal", "nyayasetu-ai-legal-awareness-fir-assistant"]
  }
];
