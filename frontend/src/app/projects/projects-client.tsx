"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CtaBanner } from "@/components/cta-banner";
import {
  FolderGit2,
  ArrowRight,
  Filter
} from "lucide-react";

type ProjectCategory =
  | "All"
  | "Enterprise Software"
  | "Mobile Apps"
  | "Websites & E-Commerce"
  | "Government & Education"
  | "Branding & Printing";

interface ProjectItem {
  id: number;
  title: string;
  category: ProjectCategory;
  client: string;
  contractValue?: string;
  description: string;
  outcome: string;
  technologies: string[];
  featured?: boolean;
}

const projectsData: ProjectItem[] = [
  {
    id: 1,
    title: "Dairy Muneem — Milk Procurement & Logistics App",
    category: "Mobile Apps",
    client: "Regional Dairy Cooperative & Procurement Centers",
    contractValue: "₹2,50,000 Contract",
    description: "End-to-end mobile logistics software featuring a real-time Milk Fat and SNF computational pricing engine, automated daily farmer ledger updates, and SMS slip generation.",
    outcome: "Reduced procurement calculation errors by 98%; operates offline seamlessly across 40+ rural collection centers.",
    technologies: ["React Native / Flutter", "Node.js", "Express", "MongoDB", "SMS Gateway"],
    featured: true,
  },
  {
    id: 2,
    title: "HMS — Multi-Specialty Hospital Management System",
    category: "Enterprise Software",
    client: "Private Healthcare Group & Clinical Centers",
    contractValue: "₹3,50,000 Contract",
    description: "Centralized hospital ERP featuring electronic health records (EHR), OPD/IPD flows, doctor prescription pads, in-house pharmacy inventory, and lab report QR verification.",
    outcome: "Cut patient discharge waiting times from 3 hours to under 25 minutes; eliminated paper chart losses entirely.",
    technologies: ["React / Next.js", "PostgreSQL", "RBAC", "Docker", "HL7 Standard"],
    featured: true,
  },
  {
    id: 3,
    title: "Govt College Bharatpur — Official Institutional Portal",
    category: "Government & Education",
    client: "Government College, Bharatpur (Higher Education Dept)",
    contractValue: "₹50,000 Contract",
    description: "High-security institutional web portal featuring automated student noticeboard PDF dispatches, faculty directories, and admissions inquiry workflows.",
    outcome: "Handled over 100,000 concurrent page requests during annual examination cycles with 100% server uptime.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "WCAG 2.1 Accessibility", "Cloud CDN"],
    featured: true,
  },
  {
    id: 4,
    title: "Govt College Karauli — Official Institutional Portal",
    category: "Government & Education",
    client: "Government College, Karauli (Higher Education Dept)",
    contractValue: "₹50,000 Contract",
    description: "Bilingual (Hindi/English) institutional portal hosting academic syllabus archives, public tenders, and mobile-optimized access for rural students.",
    outcome: "Accelerated circular and notice distribution by 75%; eliminated reliance on physical campus bulletin boards.",
    technologies: ["Next.js", "React", "Node.js", "Tailwind CSS", "CDN Caching"],
    featured: true,
  },
  {
    id: 5,
    title: "Jaivik Desh — Organic Agriculture E-Commerce Platform",
    category: "Websites & E-Commerce",
    client: "Jaivik Desh Natural Farming & Commodity Enterprise",
    contractValue: "₹75,000 Contract",
    description: "High-conversion direct-to-consumer online storefront for certified organic farm produce with automated shipping label generation and farm-to-table traceability.",
    outcome: "240% increase in direct-to-consumer online sales within the first 90 days following platform launch.",
    technologies: ["Next.js", "Tailwind CSS", "Razorpay API", "Automated Cart", "Logistics API"],
    featured: true,
  },
  {
    id: 6,
    title: "Jim Corbett — Wildlife Safari & Resort Booking Portal",
    category: "Websites & E-Commerce",
    client: "Luxury Jungle Safari & Resort Operator (Jim Corbett)",
    contractValue: "₹50,000 Contract",
    description: "High-resolution eco-tourism portal featuring automated jeep safari permit reservation, cottage booking calendar, and instant WhatsApp booking confirmation.",
    outcome: "Achieved #1 organic search visibility for luxury private safaris in the district; direct bookings rose 180%.",
    technologies: ["React / Next.js", "Tailwind CSS", "Date-Range Engine", "Payment Gateway"],
    featured: true,
  },
  {
    id: 7,
    title: "NyayaSetu — AI Legal Awareness & FIR Assistant",
    category: "Enterprise Software",
    client: "E-Governance Pilot & Legal Aid Platforms",
    contractValue: "Proprietary IP",
    description: "AI-powered, SaaS e-governance platform mapping citizen incident narratives into verified IPC/BNS sections with structured FIR drafting assistance for police.",
    outcome: "Significantly reduces FIR preparation times while maintaining strict human-in-the-loop legal explainability.",
    technologies: ["Python", "FastEmbed", "Next.js", "PostgreSQL", "Deterministic Rule Engine"],
    featured: true,
  },
  {
    id: 8,
    title: "Anti-Paper Leak Secure Examination Software",
    category: "Enterprise Software",
    client: "Educational Examination Authorities",
    contractValue: "Proprietary Security IP",
    description: "Multi-layered digital workflow preventing confidential paper leaks via dynamic candidate-specific watermarking and GPS-locked document distribution.",
    outcome: "Eliminates unauthorized photographic reproduction with traceable forensic watermarks.",
    technologies: ["Node.js", "Dynamic Watermark Engine", "Biometric Auth", "AES-256"],
  },
  {
    id: 9,
    title: "Apex College of D-Pharma Institutional Portal",
    category: "Government & Education",
    client: "Apex Pharmacy College",
    description: "Accreditation-compliant portal displaying laboratory facilities, PCI regulatory disclosures, student enrollment portals, and syllabus archives.",
    outcome: "Streamlined PCI compliance verification audits and boosted direct student enrollment inquiries.",
    technologies: ["Next.js", "Tailwind CSS", "Document Vault", "SEO Meta Suite"],
  },
  {
    id: 10,
    title: "Luxe Mumbai Lifestyle & Hospitality Portal",
    category: "Websites & E-Commerce",
    client: "Luxury Boutique Hospitality Concierge",
    description: "Ultra-luxury visual digital presentation featuring smooth editorial page transitions, private suite galleries, and VIP concierge inquiry workflows.",
    outcome: "Positioned the property among Mumbai's premier elite concierge destinations with high booking conversion.",
    technologies: ["React", "GSAP", "Tailwind CSS", "High-Res Image CDN"],
  },
  {
    id: 11,
    title: "Flash Batteries Industrial Website & Distributor Portal",
    category: "Websites & E-Commerce",
    client: "Automotive & Industrial Battery Manufacturer",
    description: "Industrial B2B portal featuring an interactive serial-number battery warranty lookup, dealer locator, and wholesale distributor inquiry funnel.",
    outcome: "Automated over 1,500 monthly warranty verifications without requiring manual customer care calls.",
    technologies: ["Next.js", "Node.js", "Warranty Verification DB", "Google Maps API"],
  },
  {
    id: 12,
    title: "Shri Haridutt Ayurvedic Medical College & Hospital",
    category: "Government & Education",
    client: "Ayurvedic Medical Institution & Hospital",
    description: "Complete institutional and hospital portal integrating botanical herbal garden archives, doctor appointment scheduling, and NCISM regulatory compliance.",
    outcome: "Centralized student admission notices and public patient healthcare clinic schedules.",
    technologies: ["React", "Next.js", "Tailwind CSS", "Appointment Engine"],
  },
  {
    id: 13,
    title: "Pavitra Enterprise Multi-Commodity Platform",
    category: "Enterprise Software",
    client: "Commercial Trading & Distribution Group",
    description: "B2B commercial trading portal providing digital product catalogs, wholesale quotation requests, automated GST invoice dispatch, and delivery tracking.",
    outcome: "Digitized commercial order workflows, reducing sales cycle from 48 hours to under 4 hours.",
    technologies: ["Next.js", "Express", "MongoDB", "PDF Invoice Engine"],
  },
  {
    id: 14,
    title: "Grand Palace Heritage Banquet & Tourism Portal",
    category: "Websites & E-Commerce",
    client: "Heritage Tourism & Royal Banquet Venue",
    description: "Visual storytelling portal showcasing heritage banquet halls, royal wedding packages, seasonal dining menus, and digital booking request workflows.",
    outcome: "Generated over 45 high-ticket royal wedding event bookings in its first operating season.",
    technologies: ["Next.js", "Framer Motion", "360 Virtual Tour Embeds", "Booking Modals"],
  },
  {
    id: 15,
    title: "Diya Creation Fashion Label & Apparel Hangtag Suite",
    category: "Branding & Printing",
    client: "Designer Fashion & Apparel House",
    description: "Turnkey brand identity project delivering physical metallic clothing tags, woven care labels, custom packaging boxes, and digital lookbooks.",
    outcome: "Established prestige retail shelf presence across regional multi-brand apparel showrooms.",
    technologies: ["Custom Die-Cutting", "Embossed Gold Foil", "Illustrator Vector Suite", "Press Tooling"],
  },
  {
    id: 16,
    title: "Fintech Mobile Wallet & Micro-Transactions Engine",
    category: "Mobile Apps",
    client: "Regional Microfinance & Payments Client",
    description: "High-speed mobile payment application prototype featuring QR-code merchant settlements, peer-to-peer wallet transfers, and instant transaction receipts.",
    outcome: "Demonstrated sub-second transaction latency with bank-grade biometric authorization.",
    technologies: ["Flutter", "Node.js", "Biometric Auth", "Ledger Database"],
  },
];

const categoriesList: ProjectCategory[] = [
  "All",
  "Enterprise Software",
  "Mobile Apps",
  "Websites & E-Commerce",
  "Government & Education",
  "Branding & Printing",
];

export function ProjectsClient() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return projectsData;
    return projectsData.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* 1. Header */}
      <section className="py-20 lg:py-28 bg-white dark:bg-charcoal border-b border-border text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/25">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Proven Deployments (50+)</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-charcoal dark:text-warm-white font-heading">
            Enterprise Portfolio & <span className="gold-gradient-text">Case Studies</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-muted dark:text-slate-light leading-relaxed max-w-3xl mx-auto font-normal">
            Explore authentic, high-impact software architectures, mobile apps, government college portals, and branding suites delivered across India&apos;s emerging markets.
          </p>
        </div>
      </section>

      {/* 2. Category Filter Bar */}
      <section className="py-6 bg-warm-white dark:bg-charcoal/70 border-b border-border sticky top-20 z-30 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-bold text-slate-muted uppercase tracking-wider flex items-center gap-1.5 mr-2 shrink-0">
              <Filter className="w-3.5 h-3.5 text-gold" /> Filter:
            </span>
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-charcoal text-warm-white dark:bg-gold dark:text-charcoal shadow-sm"
                    : "bg-white dark:bg-graphite text-slate-muted hover:text-charcoal dark:hover:text-white border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Projects Showcase Grid */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`rounded-3xl bg-white dark:bg-charcoal border ${
                    project.featured ? "border-gold/50 shadow-md ring-1 ring-gold/20" : "border-border shadow-sm hover:border-gold/40"
                  } p-8 flex flex-col justify-between transition-all group`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
                        {project.category}
                      </span>
                      {project.contractValue && (
                        <span className="text-xs font-semibold text-slate-muted">
                          {project.contractValue}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold text-charcoal dark:text-warm-white mb-2 font-heading group-hover:text-gold transition-colors">
                      {project.title}
                    </h3>

                    <div className="text-xs font-semibold text-gold mb-3">
                      Client: {project.client}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-muted leading-relaxed mb-4 font-normal">
                      {project.description}
                    </p>

                    <div className="p-3.5 rounded-xl bg-warm-white dark:bg-graphite/60 border border-border mb-6">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-charcoal dark:text-warm-white mb-1">
                        Verified Outcome:
                      </div>
                      <p className="text-xs text-slate-muted leading-relaxed">
                        {project.outcome}
                      </p>
                    </div>

                    <div className="space-y-1.5 mb-6">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-muted">Tech Stack</div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] px-2.5 py-1 rounded-lg bg-warm-white dark:bg-graphite border border-border text-charcoal/80 dark:text-warm-white/80"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <Link
                      href={`/contact?project=${encodeURIComponent(project.title)}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:text-gold-dark transition-colors"
                    >
                      <span>Inquire About Similar Architecture</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* 4. Conversion CTA */}
      <CtaBanner
        title="Have a Complex Project in Mind?"
        subtitle="We scope, architect, build, and deploy high-concurrency systems tailored to your timeline and budget."
      />
    </div>
  );
}
