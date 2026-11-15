"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/section-header";
import { CtaBanner } from "@/components/cta-banner";
import {
  Code,
  Monitor,
  Search,
  PenTool,
  Printer,
  Lightbulb,
  GraduationCap,
  Cpu,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Layers
} from "lucide-react";

export interface ServiceCategory {
  id: string;
  title: string;
  icon: any;
  badge: string;
  dedicatedUrl?: string;
  description: string;
  services: {
    name: string;
    description: string;
    deliverables: string[];
  }[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "software",
    title: "IT & Software Development",
    icon: Code,
    badge: "Enterprise Core",
    dedicatedUrl: "/services/web-development",
    description: "Custom enterprise software architectures built from scratch to automate operations, eliminate manual bottlenecks, and support high concurrency.",
    services: [
      {
        name: "Custom Software Development",
        description: "Bespoke business applications tailored exactly to your unique organizational workflows and security protocols.",
        deliverables: ["Tailored Business Logic", "Source Code Ownership", "Cloud Deployment Architecture"],
      },
      {
        name: "Web Application Development",
        description: "High-speed, responsive web applications engineered with Next.js, React, Node.js, and distributed databases.",
        deliverables: ["Responsive UI/UX", "Secure REST/GraphQL APIs", "Zero-Downtime CI/CD"],
      },
      {
        name: "Mobile App Development",
        description: "Native and hybrid iOS/Android apps built with Flutter and React Native. Featured in Dairy Muneem.",
        deliverables: ["App Store & Play Store Publishing", "Offline Sync", "Push Notification Architecture"],
      },
      {
        name: "SaaS Development",
        description: "Multi-tenant software architectures featuring subscription billing, usage metering, and tenant isolation.",
        deliverables: ["Multi-Tenant DB", "Stripe/Razorpay Subscriptions", "Tenant Management Dashboard"],
      },
      {
        name: "ERP Systems",
        description: "Centralized enterprise resource planning connecting inventory, human resources, payroll, and financial reports.",
        deliverables: ["Role-Based Access (RBAC)", "Department Data Sync", "Automated GST/Tax Invoicing"],
      },
      {
        name: "CRM Systems",
        description: "Customer relationship management software with automated lead capturing, WhatsApp triggers, and sales funnels.",
        deliverables: ["Lead Pipeline Stages", "WhatsApp/SMS Integration", "Conversion Analytics"],
      },
      {
        name: "Automation Systems",
        description: "Automated business scripts and robotic process automation eliminating repetitive manual spreadsheet data entry.",
        deliverables: ["Zapier/Custom Webhook Pipelines", "Automated Report Generation", "Cron Schedulers"],
      },
    ],
  },
  {
    id: "web",
    title: "Website & E-Commerce",
    icon: Monitor,
    badge: "High-Ticket Web",
    dedicatedUrl: "/services/web-development",
    description: "High-conversion corporate brand portals, institutional web properties, and digital storefronts engineered for fast page loads.",
    services: [
      {
        name: "Corporate Websites",
        description: "High-authority corporate digital portals establishing market trust with enterprise clients and investors.",
        deliverables: ["Custom Editorial Design", "WCAG 2.1 Accessibility", "Interactive Hero Animations"],
      },
      {
        name: "E-Commerce Platforms",
        description: "Turnkey online stores with product variations, discount engines, inventory synchronization, and Razorpay integration.",
        deliverables: ["Cart & Secure Checkout", "Payment Gateway Integration", "Shipping Logistics Hookup"],
      },
      {
        name: "Portfolio Websites",
        description: "Editorial visual showcases for architectural firms, creative studios, executives, and luxury ventures.",
        deliverables: ["High-Res Media Caching", "Smooth Page Transitions", "Lead Inquiry Modals"],
      },
      {
        name: "Booking & Reservation Systems",
        description: "Automated appointment scheduling and cottage/safari booking engines with real-time calendar availability.",
        deliverables: ["Calendar Slot Sync", "Automated Email Confirmation", "Deposit Collection Engine"],
      },
      {
        name: "Custom Dashboards",
        description: "Executive business intelligence portals with dynamic charts, exportable reports, and user access levels.",
        deliverables: ["Real-time Data Visualization", "Excel/PDF Exporting", "Secure Token Auth"],
      },
    ],
  },
  {
    id: "marketing",
    title: "Digital Marketing & SEO",
    icon: Search,
    badge: "Performance ROI",
    dedicatedUrl: "/services/digital-marketing",
    description: "Data-driven visibility campaigns designed to dominate search rankings, drive high-intent inquiries, and maximize ad spend efficiency.",
    services: [
      {
        name: "Search Engine Optimization (SEO)",
        description: "Technical search audits, semantic keyword mapping, high-authority backlink building, and Google Search Console management.",
        deliverables: ["Top 3 Keyword Target Plan", "Speed Optimization (Core Web Vitals)", "Local SEO Map Dominance"],
      },
      {
        name: "Social Media Marketing (SMM)",
        description: "Visual grid curation, professional B2B content creation, and active community engagement across LinkedIn and Instagram.",
        deliverables: ["Monthly Content Calendar", "Graphic Design Assets", "Audience Engagement Reports"],
      },
      {
        name: "Google Ads (PPC) Management",
        description: "Precision search intent ad campaigns, display remarketing, and negative keyword filtering to lower CAC.",
        deliverables: ["High-Converting Ad Copy", "A/B Landing Page Testing", "Conversion Tracking Setup"],
      },
      {
        name: "Meta Ads (Facebook & Instagram)",
        description: "Lookalike and demographic audience funnels driving qualified consumer and business inquiries directly to WhatsApp.",
        deliverables: ["Creative Ad Visuals", "Pixel & CAPI Setup", "Weekly ROI Reporting"],
      },
      {
        name: "Branding & Awareness Campaigns",
        description: "Multi-channel corporate PR blitzes, executive branding, and viral video marketing campaigns.",
        deliverables: ["Campaign Strategy Blueprint", "Press Release Copy", "Cross-Platform Distribution"],
      },
    ],
  },
  {
    id: "design",
    title: "Design & Brand Identity",
    icon: PenTool,
    badge: "Creative Studio",
    description: "Distinctive visual identities, design tokens, and digital product ergonomics that command prestige in your industry.",
    services: [
      {
        name: "Logo Design & Vector Marks",
        description: "Timeless corporate emblems delivered with full vector packages (.ai, .svg, .eps, .png), monochrome variants, and favicon sets.",
        deliverables: ["3 Initial Concepts", "Unlimited Revisions", "Complete Vector Source Files"],
      },
      {
        name: "UI/UX Design Systems",
        description: "Figma wireframes, high-fidelity clickable prototypes, design token libraries, and responsive human-factors ergonomics.",
        deliverables: ["Interactive Figma Prototype", "Design Token Library", "Component States & Styles"],
      },
      {
        name: "Brand Identity Manuals",
        description: "Comprehensive brand guideline documents covering color theory, typography hierarchy, tone of voice, and usage dos & don'ts.",
        deliverables: ["40+ Page Brand Bible", "Typography Licensing Guide", "Cohesive Asset Library"],
      },
      {
        name: "Packaging & Label Design",
        description: "Physical packaging, custom shipping boxes, bottle labels, hang tags, and unboxing collateral calibrated for press tolerances.",
        deliverables: ["Print-Ready Dielines", "3D Product Mockups", "Material Finish Recommendations"],
      },
    ],
  },
  {
    id: "printing",
    title: "Physical Printing Services",
    icon: Printer,
    badge: "In-House Press",
    description: "In-house physical printing infrastructure delivering tangible corporate prestige from metallic cards to apparel tags.",
    services: [
      {
        name: "Visiting Cards & Metallic Cards",
        description: "Velvet matte finish, gold foil stamping, metallic sheen, embossed spot UV, and NFC smart digital visiting cards.",
        deliverables: ["Premium Cardstock (450+ GSM)", "Foil & Spot UV Accents", "Smart NFC Chip Encoding"],
      },
      {
        name: "Flyers, Posters & Brochures",
        description: "Tri-fold and bi-fold corporate brochures, promotional event posters, and comprehensive multi-page product catalogs.",
        deliverables: ["Gloss / Matte Laminations", "Heavy Duty GSM", "Bulk Packaging & Shipping"],
      },
      {
        name: "Pamphlets, Stickers & Decals",
        description: "Custom die-cut brand stickers, outdoor vinyl decals, product seal labels, and marketing distribution pamphlets.",
        deliverables: ["Waterproof Vinyl Options", "Custom Die-Cut Shapes", "High-Volume Print Runs"],
      },
      {
        name: "Clothing Tags & Apparel Labels",
        description: "Luxury hangtags for fashion brands, woven collar labels, price tags, and security garment seal stickers.",
        deliverables: ["Thick Board Tags with Eyelets", "Custom String Attachment", "Barcode / SKU Printing"],
      },
      {
        name: "Identity Cards & Lanyards",
        description: "Smart RFID/NFC employee ID cards, student barcode badges, and custom silk-screen printed corporate lanyards.",
        deliverables: ["Durable PVC Plastic Cards", "NFC Chip / Barcode Sync", "Custom Satin Lanyards with Clips"],
      },
    ],
  },
  {
    id: "startup",
    title: "Startup & Business Advisory",
    icon: Lightbulb,
    badge: "Growth Advisory",
    dedicatedUrl: "/services/consulting",
    description: "Turnkey incubation and acceleration services designed to scale founders from initial ideation to funded market reality.",
    services: [
      {
        name: "Startup Business Consulting",
        description: "Business model validation, unit economics modeling, customer acquisition strategy, and competitive moat definition.",
        deliverables: ["TAM / SAM / SOM Analysis", "Unit Economics Framework", "GTM Strategic Plan"],
      },
      {
        name: "Investor Pitch Deck Design",
        description: "Slide-by-slide venture capital pitch decks crafted to Y-Combinator standards, highlighting traction and financial forecasts.",
        deliverables: ["15-Slide Master Deck", "Editable PPTX & PDF", "Financial Projection Sheets"],
      },
      {
        name: "Company Registration & Compliance",
        description: "Advisory through Udyam MSME certification, GST registration, trademark filing, and statutory legal structuring.",
        deliverables: ["Udyam MSME Filing Support", "GST Documentation Prep", "Trademark Class Selection"],
      },
      {
        name: "Financial Modeling & Forecasts",
        description: "Detailed 3-to-5 year financial spreadsheets calculating burn rate, runway, CAC-to-LTV ratios, and scenario modeling.",
        deliverables: ["Excel Financial Model", "Sensitivity Analysis", "Valuation Benchmarking"],
      },
      {
        name: "MVP Rapid Development",
        description: "Rapid 4-to-8 week prototyping sprints turning product concepts into tested market reality with working user funnels.",
        deliverables: ["Working Web/App Prototype", "Analytics Setup", "Initial User Feedback Loop"],
      },
    ],
  },
  {
    id: "education",
    title: "Education & Institutional Training",
    icon: GraduationCap,
    badge: "Campus Labs",
    description: "Equipping students, colleges, and corporate organizations with practical, industry-grade digital and hardware competencies.",
    services: [
      {
        name: "Web & Cloud Development Bootcamps",
        description: "Practical hands-on training covering React, Next.js, Node.js, cloud databases, and real-world project development.",
        deliverables: ["Live Project Mentorship", "Git/GitHub Workflows", "Course Completion Certificate"],
      },
      {
        name: "Mobile App Development Training",
        description: "Hands-on Flutter and React Native bootcamps covering cross-platform architecture, APIs, and state management.",
        deliverables: ["Full Mobile App Capstone", "App Store Publishing Demo", "Interview Preparation"],
      },
      {
        name: "Digital Marketing & Performance Strategy",
        description: "Comprehensive workshops covering SEO audits, Google Ads manager, Meta campaigns, and analytics tools.",
        deliverables: ["Live Ad Budget Exercises", "SEO Audit Checklists", "Google Certification Guide"],
      },
      {
        name: "AI & Machine Learning Literacy",
        description: "Applied workshops demystifying artificial intelligence, prompt engineering, and automated business data analysis.",
        deliverables: ["Python Data Science Basics", "Applied AI Tools Masterclass", "Workflow Automation Practice"],
      },
      {
        name: "Smart Lab Hardware Setup & Robotics",
        description: "Turnkey computer laboratory installation, smart classroom audio-visual integration, and educational robotics kits.",
        deliverables: ["Hardware Procurement & Setup", "Networking & System Config", "Annual Maintenance Contract"],
      },
    ],
  },
  {
    id: "advanced",
    title: "Advanced AI & Industry 4.0",
    icon: Cpu,
    badge: "Next-Gen Tech",
    description: "Cutting-edge artificial intelligence, IoT telemetry arrays, and robotics engineered for enterprise differentiation.",
    services: [
      {
        name: "Artificial Intelligence & LLM Solutions",
        description: "Custom NLP pipelines, document intelligence engines, automated customer bots, and predictive analytics models.",
        deliverables: ["Custom Trained AI Models", "API Integration Layer", "Data Privacy Safeguards"],
      },
      {
        name: "IoT & Telemetry Systems",
        description: "Smart industrial sensor integration, remote environmental monitoring, and real-time dashboard telemetry.",
        deliverables: ["Microcontroller Firmware", "Real-Time Telemetry Dashboard", "Alert & Threshold Triggers"],
      },
      {
        name: "Educational & Industrial Robotics",
        description: "Custom programmable robotic arms, sensor arrays, and STEM educational kits for institutional laboratories.",
        deliverables: ["Hardware Assembly", "Control Software & Firmware", "Trainer Manuals"],
      },
      {
        name: "Cloud Architecture & DevOps Pipelines",
        description: "AWS, GCP, and Azure cloud migrations with containerized Docker environments, Kubernetes, and CI/CD pipelines.",
        deliverables: ["Infrastructure as Code", "Zero-Downtime Pipeline", "Automated Backup & Failover"],
      },
      {
        name: "Cyber Security & Compliance Audits",
        description: "Penetration testing, vulnerability assessments, SSL encryption enforcement, and data protection compliance audits.",
        deliverables: ["Vulnerability Audit Report", "Remediation Checklist", "Security Hardening Implementation"],
      },
    ],
  },
];

export function ServicesDirectoryClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("software");
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const currentCategory = serviceCategories.find((cat) => cat.id === selectedCategory) || serviceCategories[0];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* 1. Directory Header */}
      <section className="py-20 lg:py-28 bg-white dark:bg-charcoal border-b border-border text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/25">
            <Layers className="w-3.5 h-3.5" />
            <span>Complete Services Architecture</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-charcoal dark:text-warm-white font-heading">
            Enterprise Services & <span className="gold-gradient-text">Infrastructure</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-muted dark:text-slate-light leading-relaxed max-w-3xl mx-auto font-normal">
            8 core service categories encompassing over 40 specialized offerings. Engineered for businesses, institutions, and founders seeking turnkey execution without multi-vendor friction.
          </p>
        </div>
      </section>

      {/* 2. Interactive Category Tabs */}
      <section className="py-8 bg-warm-white dark:bg-charcoal/70 border-b border-border sticky top-20 z-30 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {serviceCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setExpandedService(null);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-charcoal text-warm-white dark:bg-gold dark:text-charcoal shadow-sm"
                    : "bg-white dark:bg-graphite text-slate-muted hover:text-charcoal dark:hover:text-white border border-border"
                }`}
              >
                <cat.icon className="w-4 h-4 shrink-0" />
                <span>{cat.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Selected Category Showcase */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12 p-8 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center">
                  <currentCategory.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
                  {currentCategory.badge}
                </span>
              </div>
              <h2 className="text-3xl font-extrabold text-charcoal dark:text-warm-white font-heading">
                {currentCategory.title}
              </h2>
              <p className="text-sm text-slate-muted max-w-2xl leading-relaxed">
                {currentCategory.description}
              </p>
            </div>

            {currentCategory.dedicatedUrl && (
              <Link
                href={currentCategory.dedicatedUrl}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-charcoal dark:bg-gold text-warm-white dark:text-charcoal text-xs font-bold uppercase tracking-wider hover:bg-gold transition-colors shrink-0"
              >
                <span>Dedicated Service Deep Dive</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* Granular Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentCategory.services.map((sub, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-charcoal border border-border p-7 flex flex-col justify-between hover:border-gold/50 shadow-sm transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-gold font-mono">
                      #{String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-muted bg-warm-white dark:bg-graphite px-2 py-0.5 rounded border border-border">
                      Full Turnkey
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-charcoal dark:text-warm-white mb-2 font-heading">
                    {sub.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-muted leading-relaxed mb-6 font-normal">
                    {sub.description}
                  </p>

                  <div className="space-y-2 mb-6 border-t border-border/60 pt-4">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-muted">Standard Deliverables</div>
                    <ul className="space-y-1.5">
                      {sub.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="text-xs text-charcoal/80 dark:text-warm-white/80 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <Link
                    href={`/contact?service=${encodeURIComponent(sub.name)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:text-gold-dark transition-colors"
                  >
                    <span>Request Custom Scope & Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Dedicated Service Pages Quick Jump */}
      <section className="py-20 bg-warm-white dark:bg-charcoal/50 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <SectionHeader
            badge="Dedicated Service Pages"
            title="Explore In-Depth Solutions"
            subtitle="Access full technical architectures, deliverables, and case studies for our primary disciplines."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/services/web-development"
              className="p-6 rounded-2xl bg-white dark:bg-charcoal border border-border hover:border-gold transition-all group"
            >
              <h4 className="font-bold text-charcoal dark:text-warm-white group-hover:text-gold transition-colors mb-1 font-heading">
                Web & Cloud
              </h4>
              <p className="text-xs text-slate-muted mb-4">Enterprise portals, Next.js apps & SaaS architectures</p>
              <span className="text-xs font-bold text-gold flex items-center gap-1">
                Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              href="/services/mobile-apps"
              className="p-6 rounded-2xl bg-white dark:bg-charcoal border border-border hover:border-gold transition-all group"
            >
              <h4 className="font-bold text-charcoal dark:text-warm-white group-hover:text-gold transition-colors mb-1 font-heading">
                Mobile Applications
              </h4>
              <p className="text-xs text-slate-muted mb-4">iOS, Android, cross-platform apps & Dairy Muneem</p>
              <span className="text-xs font-bold text-gold flex items-center gap-1">
                Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              href="/services/digital-marketing"
              className="p-6 rounded-2xl bg-white dark:bg-charcoal border border-border hover:border-gold transition-all group"
            >
              <h4 className="font-bold text-charcoal dark:text-warm-white group-hover:text-gold transition-colors mb-1 font-heading">
                Digital Marketing & SEO
              </h4>
              <p className="text-xs text-slate-muted mb-4">Search dominance, Google Ads, Meta funnels & ROI</p>
              <span className="text-xs font-bold text-gold flex items-center gap-1">
                Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              href="/services/consulting"
              className="p-6 rounded-2xl bg-white dark:bg-charcoal border border-border hover:border-gold transition-all group"
            >
              <h4 className="font-bold text-charcoal dark:text-warm-white group-hover:text-gold transition-colors mb-1 font-heading">
                Startup Consulting
              </h4>
              <p className="text-xs text-slate-muted mb-4">Pitch decks, financial modeling & MVP sprints</p>
              <span className="text-xs font-bold text-gold flex items-center gap-1">
                Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Conversion CTA */}
      <CtaBanner
        title="Need a Custom Multi-Service Package?"
        subtitle="We provide bespoke turnkey packages unifying web development, mobile apps, digital marketing, and in-house printing."
      />
    </div>
  );
}
