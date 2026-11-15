export interface PortfolioCategory {
  id: string;
  name: string;
  shortLabel: string;
  slug: string;
  description: string;
  subdisciplines: string[];
  icon: string;
  order: number;
}

export interface CaseStudyProject {
  id: string | number;
  slug: string;
  title: string;
  client: string;
  industry: string;
  categories: string[];
  primaryCategory: string;
  contractValue?: string;
  projectDate: string;
  duration?: string;
  teamSize?: number;
  description: string;
  requirements: string;
  challenge: string;
  solution: string;
  outcome: string;
  technologies: string[];
  coverImage: string;
  gallery: string[];
  featured: boolean;
  isActive: boolean;
  projectUrl?: string;
  stats?: { label: string; value: string }[];
}

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  {
    id: "app-dev",
    name: "Application Development",
    shortLabel: "Applications",
    slug: "application-development",
    description:
      "High-availability enterprise systems, cross-platform mobile apps, bespoke ERPs, CRM platforms, and mission-critical SaaS architectures.",
    subdisciplines: [
      "Mobile apps (iOS & Android)",
      "Cross-platform Flutter & React Native",
      "SaaS product engineering",
      "Enterprise ERP & CRM systems",
      "Custom business applications",
    ],
    icon: "Smartphone",
    order: 1,
  },
  {
    id: "ai-auto",
    name: "AI & Business Automation",
    shortLabel: "AI Automation",
    slug: "ai-business-automation",
    description:
      "Autonomous AI agents, deterministic legal and compliance engines, automated invoice dispatch, warranty lookup engines, and intelligent integrations.",
    subdisciplines: [
      "AI agents & assistive LLMs",
      "Deterministic legal & compliance engines",
      "Workflow & invoice automation",
      "Automated verification engines",
      "Intelligent API integrations",
    ],
    icon: "Cpu",
    order: 2,
  },
  {
    id: "digital-mktg",
    name: "Digital Marketing",
    shortLabel: "Digital Marketing",
    slug: "digital-marketing",
    description:
      "Data-driven growth funnels, performance marketing, direct-to-consumer online conversions, luxury brand positioning, and social media campaigns.",
    subdisciplines: [
      "Social media marketing & campaigns",
      "Performance Google & Meta Ads",
      "Direct-to-consumer (D2C) growth",
      "Content strategy & brand lookbooks",
      "Conversion rate optimization (CRO)",
    ],
    icon: "Megaphone",
    order: 3,
  },
  {
    id: "web-sol",
    name: "Web Solutions",
    shortLabel: "Web Solutions",
    slug: "web-solutions",
    description:
      "Next.js 16 portals, high-concurrency institutional web platforms, e-commerce storefronts, and accessible public agency websites.",
    subdisciplines: [
      "High-concurrency web platforms",
      "Direct-to-consumer e-commerce",
      "Institutional and academic portals",
      "Custom B2B wholesale portals",
      "Modern Next.js & React redesigns",
    ],
    icon: "Globe",
    order: 4,
  },
  {
    id: "seo-sol",
    name: "SEO Solutions",
    shortLabel: "SEO Solutions",
    slug: "seo-solutions",
    description:
      "Technical audit engineering, multi-location local search visibility, regulatory compliance SEO, schema architecture, and Answer Engine Optimization (AEO/GEO).",
    subdisciplines: [
      "Technical SEO & Core Web Vitals",
      "Local multi-district search domination",
      "On-page & Off-page search architecture",
      "Answer Engine Optimization (AEO)",
      "Generative Engine Optimization (GEO)",
    ],
    icon: "Search",
    order: 5,
  },
];

export const PORTFOLIO_PROJECTS: CaseStudyProject[] = [
  {
    id: "prj-1",
    slug: "dairy-muneem-milk-procurement-logistics-app",
    title: "Dairy Muneem — Milk Procurement & Logistics App",
    client: "Regional Dairy Cooperative & Procurement Centers",
    industry: "Dairy Logistics & Agriculture",
    categories: ["Application Development", "AI & Business Automation"],
    primaryCategory: "Application Development",
    contractValue: "₹2,50,000 Contract",
    projectDate: "2024",
    duration: "4 Months",
    teamSize: 5,
    description:
      "End-to-end mobile logistics software featuring a real-time Milk Fat and SNF computational pricing engine, automated daily farmer ledger updates, and SMS slip generation.",
    requirements:
      "Rural dairy collection points in Rajasthan required an offline-capable mobile terminal to calculate milk payouts based on laboratory Fat/SNF ratios, print on-spot receipts, and automatically synchronize ledger records once network connectivity was restored.",
    challenge:
      "Manual recordkeeping in paper ledgers led to computational discrepancies, delayed settlements to smallholder farmers, and frequent disputes over variable fat percentages. Intermittent cellular connectivity at remote milk pooling points prevented conventional cloud-only apps from functioning.",
    solution:
      "Architected an offline-first mobile application using SQLite local caching with two-way reconciliation when connectivity is available. Integrated an ultra-fast Fat/SNF calculation matrix complying with regional cooperative pricing norms, coupled with instant thermal Bluetooth printing and automated SMS delivery.",
    outcome:
      "Reduced procurement calculation errors by 98%; operates offline seamlessly across 40+ rural collection centers.",
    technologies: ["React Native", "Node.js", "Express", "MongoDB", "SQLite", "SMS Gateway", "Bluetooth Thermal SDK"],
    coverImage: "/assets/company/logo-symbol.png",
    gallery: ["/assets/company/logo-symbol.png", "/assets/company/logo-horizontal.png"],
    featured: true,
    isActive: true,
    stats: [
      { label: "Calculation Error Reduction", value: "98%" },
      { label: "Rural Collection Centers", value: "40+" },
      { label: "Sync Mode", value: "Offline-First" },
    ],
  },
  {
    id: "prj-2",
    slug: "hms-multi-specialty-hospital-management-system",
    title: "HMS — Multi-Specialty Hospital Management System",
    client: "Private Healthcare Group & Clinical Centers",
    industry: "Healthcare & Clinical Operations",
    categories: ["Application Development"],
    primaryCategory: "Application Development",
    contractValue: "₹3,50,000 Contract",
    projectDate: "2024",
    duration: "6 Months",
    teamSize: 6,
    description:
      "Centralized hospital ERP featuring electronic health records (EHR), OPD/IPD flows, doctor prescription pads, in-house pharmacy inventory, and lab report QR verification.",
    requirements:
      "A growing regional hospital network required a unified digital infrastructure spanning patient intake, outpatient consultations, inpatient bed allocation, operation theater scheduling, digital lab reports, and automated billing desks.",
    challenge:
      "Physical paper files caused severe delays in patient transfers between OPD and in-patient wards, while manual pharmacy dispensing frequently resulted in stock-outs of critical medication. Discharge workflows took upwards of 3 hours per patient.",
    solution:
      "Engineered an enterprise healthcare management system incorporating role-based access control (RBAC), HL7 compliant EHR storage, automated prescription-to-pharmacy dispensing queues, and cryptographic QR verification on patient lab reports.",
    outcome:
      "Cut patient discharge waiting times from 3 hours to under 25 minutes; eliminated paper chart losses entirely.",
    technologies: ["React", "Next.js", "PostgreSQL", "Node.js", "Docker", "RBAC", "HL7 Standard"],
    coverImage: "/assets/company/logo-symbol.png",
    gallery: ["/assets/company/logo-symbol.png", "/assets/company/logo-horizontal.png"],
    featured: true,
    isActive: true,
    stats: [
      { label: "Discharge Wait Time", value: "25 min (from 3 hr)" },
      { label: "Paper Chart Loss", value: "0%" },
      { label: "Department Integration", value: "100%" },
    ],
  },
  {
    id: "prj-3",
    slug: "govt-college-bharatpur-official-institutional-portal",
    title: "Govt College Bharatpur — Official Institutional Portal",
    client: "Government College, Bharatpur (Higher Education Dept)",
    industry: "Higher Education & Public Sector",
    categories: ["Web Solutions", "SEO Solutions"],
    primaryCategory: "Web Solutions",
    contractValue: "₹50,000 Contract",
    projectDate: "2023",
    duration: "2 Months",
    teamSize: 4,
    description:
      "High-security institutional web portal featuring automated student noticeboard PDF dispatches, faculty directories, and admissions inquiry workflows.",
    requirements:
      "The institution needed a robust, bilingual, WCAG-accessible digital platform capable of serving over 15,000 undergraduate and postgraduate students without crashing during annual university exam results and admissions announcements.",
    challenge:
      "Legacy portal crashed consistently during result days due to un-cached database queries. Mobile viewing on low-cost smartphones was broken, creating accessibility bottlenecks for rural students.",
    solution:
      "Built a Next.js static site generation (SSG) architecture backed by incremental static regeneration (ISR) and Cloudflare edge caching. Formatted the site to meet strict government WCAG 2.1 accessibility guidelines and bilingual Hindi/English content delivery.",
    outcome:
      "Handled over 100,000 concurrent page requests during annual examination cycles with 100% server uptime.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "WCAG 2.1 Accessibility", "Cloud CDN"],
    coverImage: "/assets/company/logo-symbol.png",
    gallery: ["/assets/company/logo-symbol.png", "/assets/company/logo-horizontal.png"],
    featured: true,
    isActive: true,
    stats: [
      { label: "Peak Concurrent Requests", value: "100,000+" },
      { label: "Examination Uptime", value: "100%" },
      { label: "Accessibility Level", value: "WCAG 2.1" },
    ],
  },
  {
    id: "prj-4",
    slug: "govt-college-karauli-official-institutional-portal",
    title: "Govt College Karauli — Official Institutional Portal",
    client: "Government College, Karauli (Higher Education Dept)",
    industry: "Higher Education & Public Sector",
    categories: ["Web Solutions", "SEO Solutions"],
    primaryCategory: "Web Solutions",
    contractValue: "₹50,000 Contract",
    projectDate: "2023",
    duration: "2 Months",
    teamSize: 3,
    description:
      "Bilingual (Hindi/English) institutional portal hosting academic syllabus archives, public tenders, and mobile-optimized access for rural students.",
    requirements:
      "Deployment of an official administrative college website with transparent publication of state tender notifications, academic circulars, faculty achievements, and scholarship criteria.",
    challenge:
      "Administrative staff had no technical webmaster background, requiring an intuitive publishing system to upload PDF circulars, syllabus guidelines, and time-sensitive state directives.",
    solution:
      "Developed a lightweight Next.js and Tailwind web portal with an optimized document vault, structured metadata for Google search indexing, and automated PDF compression for low-bandwidth mobile devices.",
    outcome:
      "Accelerated circular and notice distribution by 75%; eliminated reliance on physical campus bulletin boards.",
    technologies: ["Next.js", "React", "Node.js", "Tailwind CSS", "CDN Caching"],
    coverImage: "/assets/company/logo-symbol.png",
    gallery: ["/assets/company/logo-symbol.png", "/assets/company/logo-horizontal.png"],
    featured: true,
    isActive: true,
    stats: [
      { label: "Notice Distribution Speed", value: "+75%" },
      { label: "Mobile Data Optimization", value: "Ultra-Light" },
    ],
  },
  {
    id: "prj-5",
    slug: "jaivik-desh-organic-agriculture-ecommerce-platform",
    title: "Jaivik Desh — Organic Agriculture E-Commerce Platform",
    client: "Jaivik Desh Natural Farming & Commodity Enterprise",
    industry: "Organic Agriculture & Direct-to-Consumer",
    categories: ["Web Solutions", "Digital Marketing"],
    primaryCategory: "Web Solutions",
    contractValue: "₹75,000 Contract",
    projectDate: "2024",
    duration: "3 Months",
    teamSize: 4,
    description:
      "High-conversion direct-to-consumer online storefront for certified organic farm produce with automated shipping label generation and farm-to-table traceability.",
    requirements:
      "A farmer-producer enterprise required a custom direct-to-consumer e-commerce portal to eliminate wholesale intermediaries and ship organic grains, mustard oil, and pulses directly to urban consumers nationwide.",
    challenge:
      "The producer struggled with high cart abandonment on third-party marketplace listings, complex weight-based shipping tariffs across India, and the need to verify organic certification credentials per batch.",
    solution:
      "Built a tailored Next.js e-commerce storefront with integrated Razorpay payment gateway, automated postal weight calculations, and farm-to-table batch QR codes verifying lab test results. Paired with targeted Meta conversion funnels.",
    outcome:
      "240% increase in direct-to-consumer online sales within the first 90 days following platform launch.",
    technologies: ["Next.js", "Tailwind CSS", "Razorpay API", "Automated Cart", "Logistics API"],
    coverImage: "/assets/company/logo-symbol.png",
    gallery: ["/assets/company/logo-symbol.png", "/assets/company/logo-horizontal.png"],
    featured: true,
    isActive: true,
    stats: [
      { label: "Direct Online Sales", value: "+240%" },
      { label: "Time to First Milestone", value: "90 Days" },
      { label: "Traceability", value: "Batch QR Code" },
    ],
  },
  {
    id: "prj-6",
    slug: "jim-corbett-wildlife-safari-resort-booking-portal",
    title: "Jim Corbett — Wildlife Safari & Resort Booking Portal",
    client: "Luxury Jungle Safari & Resort Operator (Jim Corbett)",
    industry: "Tourism & Luxury Hospitality",
    categories: ["Web Solutions", "SEO Solutions", "Digital Marketing"],
    primaryCategory: "Web Solutions",
    contractValue: "₹50,000 Contract",
    projectDate: "2023",
    duration: "2 Months",
    teamSize: 4,
    description:
      "High-resolution eco-tourism portal featuring automated jeep safari permit reservation, cottage booking calendar, and instant WhatsApp booking confirmation.",
    requirements:
      "The safari resort needed to capture high-intent travelers searching for premium wildlife safaris, national park permits, and wilderness accommodation while eliminating hefty OTA commission fees.",
    challenge:
      "Intense competition from generic travel aggregators and high seasonality required outstanding search ranking for specific luxury wildlife keywords, along with an intuitive safari date reservation system.",
    solution:
      "Engineered an ultra-fast visual web portal with structured Local Business and Tourism Schema, rich multimedia safari gallery, an interactive date-range availability calendar, and dynamic WhatsApp inquiry integration.",
    outcome:
      "Achieved #1 organic search visibility for luxury private safaris in the district; direct bookings rose 180%.",
    technologies: ["React / Next.js", "Tailwind CSS", "Date-Range Engine", "Payment Gateway", "WhatsApp API"],
    coverImage: "/assets/company/logo-symbol.png",
    gallery: ["/assets/company/logo-symbol.png", "/assets/company/logo-horizontal.png"],
    featured: true,
    isActive: true,
    stats: [
      { label: "Organic Search Ranking", value: "#1 District Position" },
      { label: "Direct Bookings", value: "+180%" },
      { label: "OTA Commission Savings", value: "Substantial" },
    ],
  },
  {
    id: "prj-7",
    slug: "nyayasetu-ai-legal-awareness-fir-assistant",
    title: "NyayaSetu — AI Legal Awareness & FIR Assistant",
    client: "E-Governance Pilot & Legal Aid Platforms",
    industry: "Applied AI & Civic Technology",
    categories: ["AI & Business Automation", "Application Development"],
    primaryCategory: "AI & Business Automation",
    contractValue: "Proprietary IP",
    projectDate: "2024",
    duration: "5 Months",
    teamSize: 5,
    description:
      "AI-powered, SaaS e-governance platform mapping citizen incident narratives into verified IPC/BNS sections with structured FIR drafting assistance for police.",
    requirements:
      "Design an explainable, deterministic legal AI tool capable of converting plain-language Hindi and English grievance statements into legally sound FIR drafts mapped to India's updated Bharatiya Nyaya Sanhita (BNS) statutes.",
    challenge:
      "Standard LLMs produce hallucinations, citation errors, and unverified penal codes, which is unacceptable in legal jurisprudence and police reporting contexts.",
    solution:
      "Developed a dual-engine architecture combining local fast embedding semantic search with deterministic rule validation. The system mandates human-in-the-loop verification before drafting official police incident records.",
    outcome:
      "Significantly reduces FIR preparation times while maintaining strict human-in-the-loop legal explainability.",
    technologies: ["Python", "FastEmbed", "Next.js", "PostgreSQL", "Deterministic Rule Engine", "LangChain"],
    coverImage: "/assets/company/logo-symbol.png",
    gallery: ["/assets/company/logo-symbol.png", "/assets/company/logo-horizontal.png"],
    featured: true,
    isActive: true,
    stats: [
      { label: "Statute Mapping", value: "BNS / IPC Compatible" },
      { label: "Verification Model", value: "Deterministic Rule Engine" },
    ],
  },
  {
    id: "prj-8",
    slug: "anti-paper-leak-secure-examination-software",
    title: "Anti-Paper Leak Secure Examination Software",
    client: "Educational Examination Authorities",
    industry: "Information Security & Public Sector",
    categories: ["Application Development", "AI & Business Automation"],
    primaryCategory: "Application Development",
    contractValue: "Proprietary Security IP",
    projectDate: "2024",
    duration: "6 Months",
    teamSize: 5,
    description:
      "Multi-layered digital workflow preventing confidential paper leaks via dynamic candidate-specific watermarking and GPS-locked document distribution.",
    requirements:
      "Examination regulatory boards required an inviolable digital pipeline to distribute sensitive question papers to physical testing centers without risk of unauthorized photographic leaks or pre-exam disclosures.",
    challenge:
      "Conventional encrypted PDFs can still be photographed by compromised center staff using unauthorized smartphones, leaving no forensic trace of the source of the leak.",
    solution:
      "Engineered a proprietary forensic watermarking engine that steganographically encodes center IDs, timestamp coordinates, and candidate station hashes across every square centimeter of the displayed test page, paired with GPS-fenced decryption keys.",
    outcome:
      "Eliminates unauthorized photographic reproduction with traceable forensic watermarks.",
    technologies: ["Node.js", "Dynamic Watermark Engine", "Biometric Auth", "AES-256", "GPS Geofencing"],
    coverImage: "/assets/company/logo-symbol.png",
    gallery: ["/assets/company/logo-symbol.png", "/assets/company/logo-horizontal.png"],
    featured: false,
    isActive: true,
    stats: [
      { label: "Encryption Standard", value: "AES-256 + Geofence" },
      { label: "Forensic Traceability", value: "Steganographic Watermarking" },
    ],
  },
  {
    id: "prj-9",
    slug: "apex-college-of-d-pharma-institutional-portal",
    title: "Apex College of D-Pharma Institutional Portal",
    client: "Apex Pharmacy College",
    industry: "Pharmacy & Higher Education",
    categories: ["Web Solutions", "SEO Solutions"],
    primaryCategory: "Web Solutions",
    contractValue: "₹45,000 Contract",
    projectDate: "2023",
    duration: "1.5 Months",
    teamSize: 3,
    description:
      "Accreditation-compliant portal displaying laboratory facilities, PCI regulatory disclosures, student enrollment portals, and syllabus archives.",
    requirements:
      "The pharmacy college required an official compliance web portal strictly aligning with the Pharmacy Council of India (PCI) mandatory disclosure guidelines and facilitating transparent admission requests.",
    challenge:
      "The college needed to maintain verifiable regulatory compliance records for PCI inspection committees while attracting prospective pharmacy students across neighboring districts.",
    solution:
      "Designed a clean, medical-grade academic portal featuring a dedicated public disclosure repository, verified lab infrastructure photography, and a location-optimized SEO profile.",
    outcome:
      "Streamlined PCI compliance verification audits and boosted direct student enrollment inquiries.",
    technologies: ["Next.js", "Tailwind CSS", "Document Vault", "SEO Meta Suite"],
    coverImage: "/assets/company/logo-symbol.png",
    gallery: ["/assets/company/logo-symbol.png", "/assets/company/logo-horizontal.png"],
    featured: false,
    isActive: true,
    stats: [
      { label: "Compliance Alignment", value: "PCI Regulatory Standards" },
      { label: "Enrollment Inquiries", value: "Direct Digital Intake" },
    ],
  },
  {
    id: "prj-10",
    slug: "luxe-mumbai-lifestyle-hospitality-portal",
    title: "Luxe Mumbai Lifestyle & Hospitality Portal",
    client: "Luxury Boutique Hospitality Concierge",
    industry: "Luxury Hospitality & Lifestyle",
    categories: ["Web Solutions", "Digital Marketing"],
    primaryCategory: "Web Solutions",
    contractValue: "₹65,000 Contract",
    projectDate: "2024",
    duration: "2 Months",
    teamSize: 4,
    description:
      "Ultra-luxury visual digital presentation featuring smooth editorial page transitions, private suite galleries, and VIP concierge inquiry workflows.",
    requirements:
      "A boutique luxury property in Mumbai required a bespoke digital presentation that commanded international prestige, showcasing private penthouses, chauffeur services, and Michelin-inspired culinary experiences.",
    challenge:
      "Mass-market booking engines and rigid templates diminished the perceived exclusivity of the brand, leading to lower room rates and missed high-net-worth reservations.",
    solution:
      "Created an editorial web experience utilizing bespoke typography, smooth cinematic micro-interactions, high-resolution visual storytelling, and a discreet VIP concierge reservation funnel.",
    outcome:
      "Positioned the property among Mumbai's premier elite concierge destinations with high booking conversion.",
    technologies: ["React", "GSAP", "Tailwind CSS", "High-Res Image CDN", "Concierge Modal Funnel"],
    coverImage: "/assets/company/logo-symbol.png",
    gallery: ["/assets/company/logo-symbol.png", "/assets/company/logo-horizontal.png"],
    featured: false,
    isActive: true,
    stats: [
      { label: "Brand Positioning", value: "High-Net-Worth Concierge" },
      { label: "Inquiry Conversion", value: "Direct VIP Channel" },
    ],
  },
  {
    id: "prj-11",
    slug: "flash-batteries-industrial-website-distributor-portal",
    title: "Flash Batteries Industrial Website & Distributor Portal",
    client: "Automotive & Industrial Battery Manufacturer",
    industry: "Automotive & Manufacturing",
    categories: ["Web Solutions", "AI & Business Automation"],
    primaryCategory: "Web Solutions",
    contractValue: "₹60,000 Contract",
    projectDate: "2023",
    duration: "2.5 Months",
    teamSize: 4,
    description:
      "Industrial B2B portal featuring an interactive serial-number battery warranty lookup, dealer locator, and wholesale distributor inquiry funnel.",
    requirements:
      "A regional battery manufacturing company required an automated system allowing battery purchasers to enter product serial numbers to verify warranty validity and find certified service centers.",
    challenge:
      "Customer support centers were overwhelmed with warranty verification phone calls, leading to long hold times and friction between authorized retail dealers and the plant.",
    solution:
      "Built a high-performance B2B web portal incorporating an automated serial-number database lookup engine, GPS-assisted authorized dealer locator, and dealer onboarding inquiry portal.",
    outcome:
      "Automated over 1,500 monthly warranty verifications without requiring manual customer care calls.",
    technologies: ["Next.js", "Node.js", "Warranty Verification DB", "Google Maps API"],
    coverImage: "/assets/company/logo-symbol.png",
    gallery: ["/assets/company/logo-symbol.png", "/assets/company/logo-horizontal.png"],
    featured: false,
    isActive: true,
    stats: [
      { label: "Monthly Automated Lookups", value: "1,500+" },
      { label: "Call Center Overhead", value: "Significantly Reduced" },
    ],
  },
  {
    id: "prj-12",
    slug: "shri-haridutt-ayurvedic-medical-college-hospital",
    title: "Shri Haridutt Ayurvedic Medical College & Hospital",
    client: "Ayurvedic Medical Institution & Hospital",
    industry: "Healthcare & Ayurveda",
    categories: ["Web Solutions", "SEO Solutions"],
    primaryCategory: "Web Solutions",
    contractValue: "₹45,000 Contract",
    projectDate: "2023",
    duration: "2 Months",
    teamSize: 3,
    description:
      "Complete institutional and hospital portal integrating botanical herbal garden archives, doctor appointment scheduling, and NCISM regulatory compliance.",
    requirements:
      "An Ayurvedic medical teaching hospital required a modern web platform to showcase clinical OPD services, botanical medicinal plant repositories, and fulfill National Commission for Indian System of Medicine (NCISM) requirements.",
    challenge:
      "Prospective students and local patients could not locate official clinic schedules online, resulting in under-utilized Ayurvedic specialty departments.",
    solution:
      "Developed a clean, mobile-optimized medical portal with structured OPD timetables, herbal botanical archives, automated appointment requests, and regional local SEO optimizations.",
    outcome:
      "Centralized student admission notices and public patient healthcare clinic schedules.",
    technologies: ["React", "Next.js", "Tailwind CSS", "Appointment Engine", "Local SEO Schema"],
    coverImage: "/assets/company/logo-symbol.png",
    gallery: ["/assets/company/logo-symbol.png", "/assets/company/logo-horizontal.png"],
    featured: false,
    isActive: true,
    stats: [
      { label: "Accreditation Standard", value: "NCISM Compliant" },
      { label: "Public Patient Access", value: "Direct Online Scheduling" },
    ],
  },
  {
    id: "prj-13",
    slug: "pavitra-enterprise-multi-commodity-platform",
    title: "Pavitra Enterprise Multi-Commodity Platform",
    client: "Commercial Trading & Distribution Group",
    industry: "Wholesale Commodity Trading & Logistics",
    categories: ["Application Development", "AI & Business Automation"],
    primaryCategory: "Application Development",
    contractValue: "₹85,000 Contract",
    projectDate: "2024",
    duration: "3 Months",
    teamSize: 4,
    description:
      "B2B commercial trading portal providing digital product catalogs, wholesale quotation requests, automated GST invoice dispatch, and delivery tracking.",
    requirements:
      "A fast-growing multi-commodity distributor needed to digitize its bulk order pipeline, allowing commercial buyers to request volume quotations and receive automated GST-compliant proforma invoices.",
    challenge:
      "Manual phone negotiations and paper proformas resulted in 48-hour order processing lag times and frequent reconciliation delays.",
    solution:
      "Created an enterprise B2B portal featuring tier-based wholesale pricing, automated PDF quotation and GST invoice generation, and order dispatch tracking.",
    outcome:
      "Digitized commercial order workflows, reducing sales cycle from 48 hours to under 4 hours.",
    technologies: ["Next.js", "Express", "MongoDB", "PDF Invoice Engine", "Automated Email Gateway"],
    coverImage: "/assets/company/logo-symbol.png",
    gallery: ["/assets/company/logo-symbol.png", "/assets/company/logo-horizontal.png"],
    featured: false,
    isActive: true,
    stats: [
      { label: "Sales Cycle Duration", value: "< 4 Hours (from 48 Hours)" },
      { label: "Invoice Workflow", value: "100% Automated GST" },
    ],
  },
  {
    id: "prj-14",
    slug: "grand-palace-heritage-banquet-tourism-portal",
    title: "Grand Palace Heritage Banquet & Tourism Portal",
    client: "Heritage Tourism & Royal Banquet Venue",
    industry: "Event Venues & Heritage Tourism",
    categories: ["Web Solutions", "Digital Marketing"],
    primaryCategory: "Web Solutions",
    contractValue: "₹55,000 Contract",
    projectDate: "2023",
    duration: "2 Months",
    teamSize: 3,
    description:
      "Visual storytelling portal showcasing heritage banquet halls, royal wedding packages, seasonal dining menus, and digital booking request workflows.",
    requirements:
      "A premier heritage venue required an evocative digital portal to showcase grand ballroom architectures, catering packages, and event capacities to destination wedding planners.",
    challenge:
      "Prospective out-of-state wedding planners could not easily visualize the venue layout, resulting in long deliberation cycles and lost high-value bookings.",
    solution:
      "Architected a high-resolution visual storytelling portal featuring dynamic hall capacity filters, interactive floorplan highlights, and a structured wedding quote generator.",
    outcome:
      "Generated over 45 high-ticket royal wedding event bookings in its first operating season.",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "Booking Modals", "Visual Floorplans"],
    coverImage: "/assets/company/logo-symbol.png",
    gallery: ["/assets/company/logo-symbol.png", "/assets/company/logo-horizontal.png"],
    featured: false,
    isActive: true,
    stats: [
      { label: "Seasonal Wedding Bookings", value: "45+ High-Ticket Contracts" },
      { label: "Visual Presentation", value: "Interactive Spatial Showcase" },
    ],
  },
  {
    id: "prj-15",
    slug: "diya-creation-fashion-label-apparel-suite",
    title: "Diya Creation Fashion Label & Apparel Hangtag Suite",
    client: "Designer Fashion & Apparel House",
    industry: "Fashion Apparel & Physical Branding",
    categories: ["Digital Marketing", "Web Solutions"],
    primaryCategory: "Digital Marketing",
    contractValue: "₹40,000 Contract",
    projectDate: "2023",
    duration: "1.5 Months",
    teamSize: 3,
    description:
      "Turnkey brand identity project delivering physical metallic clothing tags, woven care labels, custom packaging boxes, and digital lookbooks.",
    requirements:
      "An emerging ethnic fashion brand required cohesive omnichannel branding across physical apparel tags and digital distributor lookbooks.",
    challenge:
      "Inconsistent packaging across retail showrooms diluted consumer perception and prevented premium pricing tier adoption.",
    solution:
      "Executed a comprehensive branding suite featuring custom foil-embossed metallic hangtags, woven designer neck labels, luxury shipping boxes, and an interactive digital seasonal lookbook.",
    outcome:
      "Established prestige retail shelf presence across regional multi-brand apparel showrooms.",
    technologies: ["Custom Die-Cutting", "Embossed Gold Foil", "Illustrator Vector Suite", "Digital Lookbook"],
    coverImage: "/assets/company/logo-symbol.png",
    gallery: ["/assets/company/logo-symbol.png", "/assets/company/logo-horizontal.png"],
    featured: false,
    isActive: true,
    stats: [
      { label: "Retail Presentation", value: "Prestige Tier Positioning" },
      { label: "Branding Scope", value: "Physical + Digital Lookbook" },
    ],
  },
  {
    id: "prj-16",
    slug: "fintech-mobile-wallet-micro-transactions-engine",
    title: "Fintech Mobile Wallet & Micro-Transactions Engine",
    client: "Regional Microfinance & Payments Client",
    industry: "Financial Technology & Digital Payments",
    categories: ["Application Development", "AI & Business Automation"],
    primaryCategory: "Application Development",
    contractValue: "₹1,80,000 Contract",
    projectDate: "2024",
    duration: "4 Months",
    teamSize: 5,
    description:
      "High-speed mobile payment application prototype featuring QR-code merchant settlements, peer-to-peer wallet transfers, and instant transaction receipts.",
    requirements:
      "A regional microfinance operator required a secure, lightweight payments prototype enabling merchant QR settlements and instantaneous peer-to-peer micro-transfers with biometric authorization.",
    challenge:
      "Transaction latency and ledger reconciliation errors posed significant user friction during peak merchant business hours.",
    solution:
      "Developed a Flutter-based mobile interface backed by an immutable ledger data pipeline, double-entry bookkeeping safeguards, and sub-second transaction dispatch.",
    outcome:
      "Demonstrated sub-second transaction latency with bank-grade biometric authorization.",
    technologies: ["Flutter", "Node.js", "Express", "Biometric Auth", "Ledger Database", "WebSocket Engine"],
    coverImage: "/assets/company/logo-symbol.png",
    gallery: ["/assets/company/logo-symbol.png", "/assets/company/logo-horizontal.png"],
    featured: false,
    isActive: true,
    stats: [
      { label: "Transaction Latency", value: "< 1 Second" },
      { label: "Security Verification", value: "Biometric Hardware-Backed" },
    ],
  },
];
