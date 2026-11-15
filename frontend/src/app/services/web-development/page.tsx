import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/section-header";
import { CtaBanner } from "@/components/cta-banner";
import {
  Code,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Globe2,
  ArrowRight,
  Database,
  Lock,
  Server
} from "lucide-react";

export const metadata: Metadata = {
  title: "Web & Enterprise Cloud Application Development | Royal Business Machine",
  description:
    "Custom web application engineering, scalable SaaS architectures, enterprise portals, and high-performance digital storefronts built with Next.js, React, and cloud databases.",
};

const technicalCapabilities = [
  {
    title: "Next.js & React 19 Frontend",
    desc: "Server-side rendering (SSR), Turbopack optimization, fluid animations, and sub-second initial page load speeds.",
    icon: Globe2,
  },
  {
    title: "Scalable Microservices Backend",
    desc: "Robust REST and GraphQL APIs engineered in Node.js, Express, Python, and Go with automated failover.",
    icon: Server,
  },
  {
    title: "Enterprise Relational & Document DBs",
    desc: "Optimized schemas using PostgreSQL, MongoDB, and Redis caching for high-concurrency read/write transactions.",
    icon: Database,
  },
  {
    title: "Role-Based Access & Security",
    desc: "Granular RBAC, JWT authentication with refresh token rotations, CSRF protection, and AES-256 data encryption.",
    icon: Lock,
  },
];

const featuredSolutions = [
  {
    title: "Custom Enterprise ERPs",
    desc: "Connect inventory, payroll, accounting, sales pipelines, and departmental reporting into a unified interface.",
  },
  {
    title: "Multi-Tenant SaaS Portals",
    desc: "Scalable SaaS platforms featuring isolated tenant databases, tiered subscription billing, and self-serve onboarding.",
  },
  {
    title: "High-Volume E-Commerce Engines",
    desc: "B2B and B2C digital commerce with automated inventory sync, Razorpay/Stripe checkout, and logistics APIs.",
  },
  {
    title: "Institutional E-Governance Portals",
    desc: "Government college and public authority portals engineered for WCAG 2.1 compliance and high-traffic examination spikes.",
  },
];

export default function WebDevelopmentPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* 1. Hero */}
      <section className="py-20 lg:py-28 bg-white dark:bg-charcoal border-b border-border text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/25">
            <Code className="w-3.5 h-3.5" />
            <span>Core Technical Discipline</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-charcoal dark:text-warm-white font-heading">
            Web & Enterprise <span className="gold-gradient-text">Cloud Engineering</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-muted dark:text-slate-light leading-relaxed max-w-3xl mx-auto font-normal">
            We architect and build bespoke, high-performance web applications, enterprise ERP/CRM platforms, and SaaS products that transform complex operations into intuitive digital workflows.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/contact?service=Web%20Development"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-charcoal dark:bg-gold text-warm-white dark:text-charcoal font-bold text-xs uppercase tracking-wider hover:bg-gold transition-colors shadow-sm"
            >
              <span>Schedule Architecture Review</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white font-semibold text-xs uppercase tracking-wider hover:border-gold transition-colors"
            >
              <span>View Deployed Web Projects</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Technical Capabilities Grid */}
      <section className="py-24 bg-warm-white dark:bg-charcoal/50 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <SectionHeader
            badge="Engineering Standards"
            title="Modern Stack & Robust Architecture"
            subtitle="Built on proven, enterprise-grade frameworks that eliminate technical debt and ensure zero-downtime reliability."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {technicalCapabilities.map((cap, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-border hover:border-gold/40 shadow-sm transition-all flex items-start gap-5"
              >
                <div className="w-12 h-12 rounded-2xl bg-gold/10 text-gold flex items-center justify-center shrink-0">
                  <cap.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal dark:text-warm-white mb-2 font-heading">
                    {cap.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-muted leading-relaxed font-normal">
                    {cap.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Solutions Delivered */}
      <section className="py-24 bg-white dark:bg-charcoal border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <SectionHeader
            badge="Solutions Portfolio"
            title="Enterprise Applications We Engineer"
            subtitle="Tailored to your specific sector and compliance requirements."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredSolutions.map((sol, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-warm-white/70 dark:bg-graphite/40 border border-border flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-gold/15 text-gold flex items-center justify-center text-xs font-bold font-mono mb-4">
                    0{idx + 1}
                  </div>
                  <h4 className="text-lg font-bold text-charcoal dark:text-warm-white mb-2 font-heading">
                    {sol.title}
                  </h4>
                  <p className="text-xs text-slate-muted leading-relaxed font-normal">
                    {sol.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/contact?service=Custom%20Web%20Application"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-charcoal dark:bg-gold text-warm-white dark:text-charcoal font-bold text-xs uppercase tracking-wider hover:bg-gold transition-colors"
            >
              <span>Request Custom Scope & Wireframe</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Conversion CTA */}
      <CtaBanner
        title="Ready to Build Your Enterprise Web Platform?"
        subtitle="Contact Founder & CEO Pavitra Arora and our cloud engineering architects for a detailed consultation."
      />
    </div>
  );
}
