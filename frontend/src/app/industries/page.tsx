import type { Metadata } from "next";
import Link from "next/link";
import { CtaBanner } from "@/components/cta-banner";
import { RevealOnScroll, TiltCard } from "@/components/motion";
import {
  GraduationCap,
  Activity,
  ShoppingBag,
  Factory,
  Utensils,
  Home,
  Truck,
  Sprout,
  Building2,
  Landmark,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Industries We Empower (10 Specialized Sectors) | Royal Business Machine",
  description:
    "Tailored digital infrastructure, custom ERPs, mobile apps, and automation for Education, Healthcare, Retail, Manufacturing, Hospitality, Real Estate, Logistics, Agriculture, Govt, and Finance.",
};

const industries = [
  {
    name: "Education & EdTech",
    icon: GraduationCap,
    desc: "Smart classroom hardware setups, university examination portals, campus ERPs, student fee collection, and practical coding laboratories.",
    deliverables: ["Smart Lab Infrastructure", "Student Information Systems", "High-Traffic Noticeboards"],
  },
  {
    name: "Healthcare & Pharmaceuticals",
    icon: Activity,
    desc: "Multi-specialty hospital management software (HMS), electronic health records, doctor appointment scheduling, and pharmacy inventory.",
    deliverables: ["OPD / IPD Workflows", "Doctor Prescription Modules", "Diagnostic Lab QR Sync"],
  },
  {
    name: "Retail & Consumer Goods",
    icon: ShoppingBag,
    desc: "Omnichannel e-commerce platforms, point-of-sale (POS) systems, barcode inventory synchronization, and direct WhatsApp reordering.",
    deliverables: ["Online Storefronts", "Automated Checkout", "Inventory Tracking"],
  },
  {
    name: "Manufacturing & Heavy Industry",
    icon: Factory,
    desc: "IoT shop-floor sensor arrays, equipment telemetry dashboards, raw material supply chain tracking, and distributor quotation portals.",
    deliverables: ["Industrial Telemetry", "Distributor Portals", "Warranty Verification DBs"],
  },
  {
    name: "Hospitality & Eco-Tourism",
    icon: Utensils,
    desc: "Luxury safari reservation engines, resort cottage availability calendars, banquet inquiry systems, and automated WhatsApp confirmations.",
    deliverables: ["Direct Booking Engines", "Date-Range Availability", "Automated Billing & SMS"],
  },
  {
    name: "Real Estate & Architecture",
    icon: Home,
    desc: "Interactive property listing portals, high-resolution 360-degree virtual tour embeds, lead routing CRMs, and investor brochure downloads.",
    deliverables: ["Virtual Tour Integration", "Agent Lead Routing", "Investor Fact Sheets"],
  },
  {
    name: "Logistics & Fleet Operations",
    icon: Truck,
    desc: "Rural and regional milk/commodity procurement logistics (Dairy Muneem), GPS vehicle dispatch, driver ledgers, and weighbridge integrations.",
    deliverables: ["Offline Field Apps", "Automated Pricing Calculators", "Farmer / Driver Slips"],
  },
  {
    name: "Agriculture & Commodity Trading",
    icon: Sprout,
    desc: "Agri-tech e-commerce (Jaivik Desh), farmer commodity ledgers, farm-to-table traceability stories, and wholesale B2B quotation portals.",
    deliverables: ["Commodity Trading Portals", "Direct-to-Consumer Stores", "Traceability QR Tags"],
  },
  {
    name: "Government & Public Sector",
    icon: Building2,
    desc: "State higher education institutional portals, citizen grievance e-governance systems (NyayaSetu), and anti-paper leak test software.",
    deliverables: ["High-Security Watermarking", "WCAG 2.1 Accessibility", "Tender & Circular Dispatches"],
  },
  {
    name: "Financial Services & Fintech",
    icon: Landmark,
    desc: "Secure mobile wallets, microfinance loan tracking ledgers, automated GST invoice dispatch, and payment gateway reconciliation.",
    deliverables: ["Biometric Auth Security", "Ledger Accounting", "Instant Transaction Receipts"],
  },
];

export default function IndustriesPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* 1. Header */}
      <section className="py-20 lg:py-28 bg-white dark:bg-charcoal border-b border-border text-center relative overflow-hidden">
        {/* Subtle gold ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gold/5 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-6 relative z-10">
          <RevealOnScroll direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/25">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Vertical Specialization</span>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.1}>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-charcoal dark:text-warm-white font-heading">
              Industries <span className="gold-gradient-text">We Empower</span>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.2}>
            <p className="text-base sm:text-xl text-slate-muted dark:text-slate-light leading-relaxed max-w-3xl mx-auto font-normal">
              Custom-engineered digital technology, enterprise automation, and on-ground execution tailored to the operational realities of 10 key economic sectors.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* 2. Industries Grid */}
      <section className="py-24 bg-warm-white dark:bg-charcoal/50 border-b border-border relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((ind, idx) => (
              <RevealOnScroll key={idx} delay={idx * 0.06} direction="up" className="h-full">
                <TiltCard maxTilt={5} className="h-full">
                  <div className="h-full p-8 rounded-3xl bg-white dark:bg-charcoal border border-border hover:border-gold/60 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <ind.icon className="w-6 h-6" />
                      </div>

                      <h3 className="text-2xl font-bold text-charcoal dark:text-warm-white mb-3 font-heading group-hover:text-gold transition-colors">
                        {ind.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-muted leading-relaxed mb-6 font-normal">
                        {ind.desc}
                      </p>

                      <div className="space-y-2 mb-6 border-t border-border/60 pt-4">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-muted">Tailored Modules</div>
                        <ul className="space-y-1.5">
                          {ind.deliverables.map((item, dIdx) => (
                            <li key={dIdx} className="text-xs text-charcoal/80 dark:text-warm-white/80 flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0 group-hover:scale-110 transition-transform" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <Link
                        href={`/contact?industry=${encodeURIComponent(ind.name)}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:text-gold-dark transition-colors group/link"
                      >
                        <span>Inquire for {ind.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              </RevealOnScroll>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Conversion CTA */}
      <CtaBanner
        title="Don't See Your Specific Industry Listed?"
        subtitle="Our modular architectures are designed to adapt to custom business logic across any private enterprise or public sector institution."
      />
    </div>
  );
}
