"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "@/components/section-header";
import { TiltCard } from "@/components/motion";
import {
  Code2,
  Globe2,
  Smartphone,
  Sparkles,
  TrendingUp,
  Palette,
  Database,
  Cloud,
  MessageSquare,
  Radio,
  BarChart3,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const previewDivisions = [
  {
    id: "software",
    title: "IT & Software Development",
    desc: "Custom ERP, high-throughput backend APIs, and multi-tenant SaaS engines built on Node.js and PostgreSQL.",
    icon: Code2,
    href: "/services/software-development",
    badge: "Enterprise",
    features: ["Custom ERP Platforms", "High-Throughput APIs", "SaaS Engineering"],
  },
  {
    id: "web",
    title: "Website & E-Commerce",
    desc: "Next.js 16 portals, Razorpay/Stripe checkouts, and institutional web systems handling 100k+ concurrent visits.",
    icon: Globe2,
    href: "/services/web-development",
    badge: "Core Engineering",
    features: ["Next.js 16 SSR/SSG", "Direct Booking Engines", "Omnichannel Stores"],
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    desc: "Offline-first React Native & Flutter applications. Deployed across 40+ dairy procurement centers.",
    icon: Smartphone,
    href: "/services/mobile-app-development",
    badge: "Native & Hybrid",
    features: ["Dairy Muneem App", "Offline SQLite Sync", "Bluetooth Thermal SDK"],
  },
  {
    id: "ai-auto",
    title: "AI & Business Automation",
    desc: "Deterministic legal AI assistants (NyayaSetu), document parsing pipelines, and LangChain agents.",
    icon: Sparkles,
    href: "/services/ai-automation",
    badge: "Flagship AI",
    features: ["NyayaSetu Assistant", "Document OCR Pipelines", "ERP Process Bots"],
  },
  {
    id: "marketing",
    title: "Digital Marketing & SEO",
    desc: "High-ticket Google Ads, Meta retargeting funnels, and localized district-level search dominance.",
    icon: TrendingUp,
    href: "/services/digital-marketing",
    badge: "Performance",
    features: ["Local & Enterprise SEO", "B2B Lead Generation", "High-ROAS Ad Funnels"],
  },
  {
    id: "design",
    title: "UI/UX & Brand Identity",
    desc: "Enterprise design systems, interactive prototypes, and luxury physical collateral (foil cards & packaging).",
    icon: Palette,
    href: "/services/ui-ux-design",
    badge: "Creative Suite",
    features: ["Figma Design Systems", "Gold Foil Print Collateral", "Apparel Brand Tagging"],
  },
  {
    id: "erp",
    title: "Enterprise ERP & CRM Solutions",
    desc: "Unified operations platforms connecting multi-location inventory, quotations, HRMS, and client pipelines.",
    icon: Database,
    href: "/services/erp-solutions",
    badge: "Operations",
    features: ["Multi-Branch Inventory", "Automated Proforma Invoicing", "Client Pipeline CRM"],
  },
  {
    id: "cloud",
    title: "Cloud Infrastructure & DevOps",
    desc: "Dockerized container clusters, Cloudflare enterprise caching, automated CI/CD, and server hardening.",
    icon: Cloud,
    href: "/services/cloud-devops",
    badge: "DevOps",
    features: ["Zero-Downtime CI/CD", "PostgreSQL Replication", "DDoS Edge Mitigation"],
  },
  {
    id: "whatsapp",
    title: "WhatsApp Automation Suite",
    desc: "Official Meta Cloud API conversational desk, dynamic catalog browsing, and automated transactional receipts.",
    icon: MessageSquare,
    href: "/services/whatsapp-automation",
    badge: "Conversational",
    features: ["Official Meta Cloud API", "Interactive Catalog Bot", "Lead Capture Webhooks"],
  },
  {
    id: "sms",
    title: "Bulk SMS, RCS & Voice OBD",
    desc: "DLT-registered promotional & transactional SMS gateways, automated voice broadcasts, and OTP pipelines.",
    icon: Radio,
    href: "/services/sms-rcs",
    badge: "CPaaS Infrastructure",
    features: ["DLT Template Registration", "High-Priority OTP Routing", "Automated Voice OBD"],
  },
  {
    id: "analytics",
    title: "Data Analytics & BI",
    desc: "Executive BI dashboards, revenue forecasting models, and multi-branch operational telemetry.",
    icon: BarChart3,
    href: "/services/data-analytics",
    badge: "Intelligence",
    features: ["Executive BI Dashboards", "Inventory Forecasting", "Cross-Branch Margin Audits"],
  },
  {
    id: "testing",
    title: "Software QA & Security Testing",
    desc: "End-to-end automated test suites, OWASP Top 10 vulnerability assessments, and anti-leak watermarking.",
    icon: ShieldCheck,
    href: "/services/software-testing",
    badge: "Security & QA",
    features: ["Automated End-to-End Tests", "OWASP Security Audits", "Anti-Leak Steganography"],
  },
];

export function ServicesPreview() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-24 bg-warm-white dark:bg-charcoal/50 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/3 -right-32 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Enterprise Capabilities"
          title="12 Core Service Divisions"
          subtitle="From mission-critical software engineering to cloud architecture and conversational CPaaS, explore our comprehensive enterprise delivery matrix."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {previewDivisions.map((service, index) => (
            <motion.div
              key={service.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              className="h-full"
            >
              <TiltCard maxTilt={5} className="h-full">
                <div className="group relative h-full rounded-2xl bg-white dark:bg-charcoal border border-border p-6 sm:p-7 flex flex-col justify-between hover:border-gold/60 hover:shadow-2xl transition-all duration-300">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-gold/10 text-gold flex items-center justify-center group-hover:bg-gold group-hover:text-navy group-hover:scale-105 transition-all duration-300">
                        <service.icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-graphite px-2.5 py-0.5 rounded-full border border-border group-hover:border-gold/30 transition-colors">
                        {service.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-navy dark:text-white mb-2 group-hover:text-gold transition-colors font-serif">
                      {service.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-5 font-normal">
                      {service.desc}
                    </p>

                    <ul className="space-y-1.5 mb-5 border-t border-border/60 pt-3">
                      {service.features.map((feat, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 group-hover:scale-125 transition-transform" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:text-gold-light transition-colors pt-3 border-t border-border/40 group-hover:translate-x-1.5 transition-transform"
                  >
                    <span>View Division Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 text-center flex flex-wrap justify-center gap-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-navy dark:bg-gold text-white dark:text-navy font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-md group"
          >
            <span>Explore All 12 Divisions & 17 Dedicated Pages</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white dark:bg-graphite border border-border text-navy dark:text-white hover:border-gold hover:text-gold text-xs uppercase tracking-wider font-semibold transition-all shadow-sm"
          >
            <span>View 12 Software Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
