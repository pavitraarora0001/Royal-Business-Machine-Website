export type ProductStatus = "AVAILABLE" | "IN DEVELOPMENT" | "PLANNED";

export interface SoftwareProduct {
  id: string;
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  status: ProductStatus;
  pricingStatus: string;
  demoAvailable: boolean;
  features: string[];
  keyBenefits: string[];
  technologies: string[];
  idealFor: string[];
  iconName: string;
  caseStudySlug?: string;
  verifiedClient?: string;
}

export const ALL_PRODUCTS: SoftwareProduct[] = [
  {
    id: "prod-dairy-muneem",
    slug: "dairy-muneem",
    name: "Dairy Muneem",
    category: "Agritech & Logistics",
    tagline: "Offline-first milk procurement, FAT/SNF rate computational engine, and farmer ledger app.",
    description: "End-to-end mobile logistics software deployed across 40+ rural collection centers. Computes milk pricing dynamically based on laboratory fat and SNF testing, generates instant thermal slips via Bluetooth, and updates farmer account ledgers offline.",
    status: "AVAILABLE",
    pricingStatus: "Turnkey Enterprise Contract (Custom Setup)",
    demoAvailable: true,
    features: [
      "Real-time Milk Fat & SNF computational engine",
      "Offline-first SQLite synchronization",
      "Instant Bluetooth thermal receipt printing",
      "Automated farmer SMS payment alerts",
      "Multi-center central ledger consolidation"
    ],
    keyBenefits: [
      "98% reduction in procurement calculation errors",
      "Seamless operation in zero-cellular rural collection points",
      "Automated daily payment disbursements"
    ],
    technologies: ["React Native", "Node.js", "Express", "MongoDB", "SQLite", "Bluetooth Thermal SDK"],
    idealFor: ["Dairy Cooperatives", "Milk Pooling Points", "Dairy Processing Plants"],
    iconName: "Truck",
    caseStudySlug: "dairy-muneem-milk-procurement-logistics-app",
    verifiedClient: "Regional Dairy Cooperative & Procurement Centers"
  },
  {
    id: "prod-hms",
    slug: "hospital-management-system",
    name: "Royal HMS (Hospital Management System)",
    category: "Healthcare Infrastructure",
    tagline: "Centralized multi-specialty clinical ERP, electronic health records (EHR), and pharmacy inventory.",
    description: "Enterprise hospital management platform connecting outpatient check-ins, bed management, inpatient doctor rounds, diagnostic laboratories, and pharmacy dispensing into a unified, HL7-compliant digital workspace.",
    status: "AVAILABLE",
    pricingStatus: "Annual License & On-Premise Deployment",
    demoAvailable: true,
    features: [
      "HL7-compliant Electronic Health Records (EHR)",
      "OPD / IPD bed and nursing allocation workflows",
      "Doctor digital prescription pads with pharmacy link",
      "In-house diagnostic lab report QR verification",
      "Role-Based Access Control (RBAC) across hospital wings"
    ],
    keyBenefits: [
      "Patient discharge times cut from 3 hours to under 25 minutes",
      "100% elimination of paper chart loss",
      "Zero pharmacy inventory stockouts"
    ],
    technologies: ["React / Next.js", "PostgreSQL", "Node.js", "Docker", "RBAC", "HL7 Standard"],
    idealFor: ["Multi-Specialty Hospitals", "Diagnostic Clinic Chains", "Nursing Homes"],
    iconName: "Activity",
    caseStudySlug: "hms-multi-specialty-hospital-management-system",
    verifiedClient: "Private Healthcare Group & Clinical Centers"
  },
  {
    id: "prod-college-erp",
    slug: "college-erp",
    name: "CampusCore Institutional ERP",
    category: "Higher Education",
    tagline: "High-concurrency college portal, result publishing, syllabus document vault, and admissions.",
    description: "Institutional web and management portal built to handle 100,000+ simultaneous student visits during annual examination results without downtime. Incorporates public tender repositories, faculty directories, and bilingual circular dispatches.",
    status: "AVAILABLE",
    pricingStatus: "Institutional Annual Contract",
    demoAvailable: true,
    features: [
      "100,000+ concurrent request architecture",
      "Automated student noticeboard PDF dispatches",
      "WCAG 2.1 AA certified accessibility compliance",
      "Bilingual Hindi and English content management",
      "PCI and state university regulatory disclosure vaults"
    ],
    keyBenefits: [
      "100% server uptime during peak result announcements",
      "75% faster circular distribution to rural students",
      "Direct digital admissions application intake"
    ],
    technologies: ["Next.js 16", "TypeScript", "Tailwind CSS", "Cloudflare CDN", "PostgreSQL"],
    idealFor: ["Government Colleges", "Pharmacy & Medical Colleges", "Private Universities"],
    iconName: "GraduationCap",
    caseStudySlug: "govt-college-bharatpur-official-institutional-portal",
    verifiedClient: "Government College, Bharatpur & Higher Education Dept"
  },
  {
    id: "prod-crm",
    slug: "crm-platform",
    name: "Royal Lead & Client CRM",
    category: "Sales & Pipeline Management",
    tagline: "Multi-channel lead capture, team quotation assignment, and conversion tracking.",
    description: "Integrated customer relationship management suite capturing leads across website forms, phone inquiries, and WhatsApp campaigns. Features automated quotation dispatch, stage tracking, and executive activity audits.",
    status: "AVAILABLE",
    pricingStatus: "Tiered User Subscription",
    demoAvailable: true,
    features: [
      "Automated lead capture from web forms & WhatsApp",
      "Pipeline stage tracking (New, Contacted, Proposal Sent, Converted)",
      "Employee assignment and internal follow-up notes",
      "Export to CSV and automated sales performance reports",
      "Cryptographic activity logging"
    ],
    keyBenefits: [
      "Accelerated response time to incoming commercial leads",
      "Full transparency over sales team productivity",
      "Zero forgotten customer follow-ups"
    ],
    technologies: ["Next.js", "Node.js", "Express", "MongoDB", "JWT Auth"],
    idealFor: ["Commercial B2B Enterprises", "Agencies", "Industrial Distributors"],
    iconName: "Users",
    caseStudySlug: "pavitra-enterprise-multi-commodity-platform"
  },
  {
    id: "prod-inventory-pos",
    slug: "inventory-pos",
    name: "OmniStock Inventory & POS",
    category: "Retail & Manufacturing",
    tagline: "Perpetual stock tracking, automated low-stock alerts, and serial number warranty verification.",
    description: "Multi-warehouse inventory software supporting barcode scanning, wholesale price tiers, automated serial-number lookups, and rapid point-of-sale checkout.",
    status: "AVAILABLE",
    pricingStatus: "Per-Location Deployment",
    demoAvailable: true,
    features: [
      "Automated serial-number battery/hardware warranty lookups",
      "Barcode & QR scanning support",
      "Automated minimum threshold reorder alerts",
      "Multi-store / warehouse inventory transfers",
      "Integrated thermal invoice receipt printing"
    ],
    keyBenefits: [
      "Automated over 1,500 monthly warranty lookups",
      "Eliminates manual customer support phone calls",
      "Real-time warehouse stock accuracy"
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Google Maps API"],
    idealFor: ["Automotive Battery Distributors", "Retail Store Chains", "Wholesale Depots"],
    iconName: "Layers",
    caseStudySlug: "flash-batteries-industrial-website-distributor-portal",
    verifiedClient: "Automotive & Industrial Battery Manufacturer"
  },
  {
    id: "prod-banquet-manager",
    slug: "banquet-manager",
    name: "GrandPalace Banquet & Venue Suite",
    category: "Hospitality & Venues",
    tagline: "Visual floorplan allocation, wedding package quote generation, and booking calendar.",
    description: "Venue management software for heritage properties and wedding banquets. Enables dynamic hall capacity filtering, interactive floorplan visualization, and automated WhatsApp quote requests.",
    status: "AVAILABLE",
    pricingStatus: "Annual Venue License",
    demoAvailable: true,
    features: [
      "Interactive 360-degree virtual tour embedding",
      "Hall capacity and seasonal dining menu calculators",
      "Date-range availability reservation calendar",
      "Automated proforma invoice & deposit tracking",
      "Direct WhatsApp booking confirmation"
    ],
    keyBenefits: [
      "45+ high-ticket wedding event bookings generated in season 1",
      "Eliminated date double-booking risks",
      "Streamlined out-of-district client consultations"
    ],
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "WhatsApp Webhook"],
    idealFor: ["Heritage Banquet Halls", "Luxury Safari Resorts", "Event Centers"],
    iconName: "Utensils",
    caseStudySlug: "grand-palace-heritage-banquet-tourism-portal",
    verifiedClient: "Heritage Tourism & Royal Banquet Venue"
  },
  {
    id: "prod-lead-engine",
    slug: "lead-management-engine",
    name: "InquiryHub Lead Capture Engine",
    category: "Marketing & Conversion",
    tagline: "Unified inquiry routing, spam protection, and instant executive WhatsApp alerts.",
    description: "Embeddable lead collection infrastructure with built-in email verification, duplicate detection, and direct executive notifications.",
    status: "AVAILABLE",
    pricingStatus: "Included in Enterprise Web Builds",
    demoAvailable: true,
    features: [
      "Spam-resistant honeypot verification",
      "Instant WhatsApp & email notifications to leadership",
      "Source campaign and UTM attribution tracking",
      "Direct integration with central CRM database"
    ],
    keyBenefits: [
      "Instant alert to leadership within 3 seconds of form submission",
      "Zero lost inbound customer inquiries"
    ],
    technologies: ["Node.js", "MongoDB", "Nodemailer", "Meta WhatsApp API"],
    idealFor: ["Service Companies", "Colleges", "Healthcare Providers"],
    iconName: "Send"
  },
  {
    id: "prod-whatsapp-automation",
    slug: "whatsapp-automation-suite",
    name: "AutoChat WhatsApp Automation Engine",
    category: "Conversational CPaaS",
    tagline: "Official Meta API conversational sales desk, catalog browser, and notification engine.",
    description: "Automated business messaging handling 24/7 client inquiries, catalog browsing, and automated transactional receipts without risky unofficial scraping tools.",
    status: "AVAILABLE",
    pricingStatus: "Tiered Message Volume + API License",
    demoAvailable: true,
    features: [
      "Official Meta WhatsApp Cloud API connection",
      "Automated multi-step interactive conversation menus",
      "Dynamic catalog browsing and quotation links",
      "Post-purchase transactional receipt dispatch"
    ],
    keyBenefits: [
      "180% surge in direct safari and hospitality bookings",
      "Instant 24/7 query resolution"
    ],
    technologies: ["Meta Cloud API", "Node.js", "Webhooks", "Redis"],
    idealFor: ["E-Commerce Brands", "Hotels & Safaris", "Colleges"],
    iconName: "MessageSquare",
    caseStudySlug: "jim-corbett-wildlife-safari-resort-booking-portal"
  },
  {
    id: "prod-appointment-system",
    slug: "appointment-system",
    name: "ClinicSync Doctor & OPD Scheduler",
    category: "Healthcare",
    tagline: "Specialty doctor scheduling, OPD slot booking, and herbal repository archives.",
    description: "Web and mobile appointment engine integrating clinical schedules, patient consultation tokens, and regulatory herbal botanical archives.",
    status: "AVAILABLE",
    pricingStatus: "Hospital Annual Setup",
    demoAvailable: true,
    features: [
      "Doctor specialty and OPD timetable schedules",
      "Direct patient token and date reservation",
      "SMS appointment reminders and doctor pad sync",
      "NCISM regulatory compliance documentation"
    ],
    keyBenefits: [
      "Centralized patient intake across clinical specialties",
      "Reduced clinic waiting room congestion"
    ],
    technologies: ["Next.js", "React", "Node.js", "Tailwind CSS"],
    idealFor: ["Ayurvedic Medical Colleges", "Private Clinics", "Teaching Hospitals"],
    iconName: "Calendar",
    caseStudySlug: "shri-haridutt-ayurvedic-medical-college-hospital",
    verifiedClient: "Ayurvedic Medical Institution & Hospital"
  },
  {
    id: "prod-hrms",
    slug: "enterprise-hrms",
    name: "Royal Staff HRMS & Payroll",
    category: "Human Resources",
    tagline: "Biometric attendance integration, leave management, automated salary slip generator.",
    description: "Modern enterprise human resource system designed for multi-location Indian businesses. Automates biometric time-clock ingestion, statutory PF/ESI calculations, and automated salary slip dispatch.",
    status: "IN DEVELOPMENT",
    pricingStatus: "Per-Employee Subscription (Launching Q2 2026)",
    demoAvailable: false,
    features: [
      "Biometric device time-clock API synchronization",
      "Statutory PF, ESI, and TDS salary calculation",
      "One-click PDF payslip generation and email dispatch",
      "Employee self-service leave portal"
    ],
    keyBenefits: [
      "Reduces HR monthly payroll processing from 5 days to 2 hours",
      "Eliminates manual attendance calculation disputes"
    ],
    technologies: ["Next.js 16", "PostgreSQL", "Node.js", "PDFKit"],
    idealFor: ["Manufacturing Plants", "Colleges", "Corporate Offices"],
    iconName: "Users"
  },
  {
    id: "prod-task-manager",
    slug: "task-operations-manager",
    name: "TaskFlow Project & Sprint Hub",
    category: "Project Operations",
    tagline: "Internal milestone tracking, client review boards, and sprint burndown charts.",
    description: "Lightweight, high-speed project management system built for engineering and creative agencies managing client deliverables across physical and digital disciplines.",
    status: "IN DEVELOPMENT",
    pricingStatus: "Internal Beta / Enterprise Access",
    demoAvailable: false,
    features: [
      "Kanban boards and sprint milestones",
      "Client milestone signoff and approval portal",
      "Git commit and pull-request synchronization",
      "Daily team task standup logs"
    ],
    keyBenefits: [
      "Transparent client progress tracking",
      "Clear milestone-based billing checkpoints"
    ],
    technologies: ["React 19", "Next.js", "PostgreSQL", "WebSockets"],
    idealFor: ["Software Teams", "Creative Agencies", "Engineering Firms"],
    iconName: "CheckSquare"
  },
  {
    id: "prod-business-analytics",
    slug: "business-analytics-platform",
    name: "Royal Vision Business Intelligence",
    category: "Data & BI",
    tagline: "Predictive revenue modeling, multi-branch margin forecasting, and anomaly detection.",
    description: "Planned enterprise data visualization platform connecting point-of-sale, procurement, and accounting data to deliver automated executive forecasts.",
    status: "PLANNED",
    pricingStatus: "Roadmap Item (Planned 2027)",
    demoAvailable: false,
    features: [
      "Multi-branch financial aggregation",
      "Predictive inventory reorder forecasting",
      "Anomaly detection in supplier invoice rates"
    ],
    keyBenefits: [
      "Empowers founders with automated margin analysis",
      "Identifies uncollected customer receivables"
    ],
    technologies: ["Python", "FastAPI", "PostgreSQL", "Metabase / Apache Superset"],
    idealFor: ["Mid-Market Enterprises", "Commodity Traders", "Hospital Chains"],
    iconName: "BarChart3"
  }
];
