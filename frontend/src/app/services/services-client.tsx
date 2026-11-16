"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { TiltCard } from "@/components/motion";
import { SectionHeader } from "@/components/section-header";
import { CtaBanner } from "@/components/cta-banner";
import { ALL_SERVICES, SERVICE_DIVISIONS_LIST } from "@/data/services-data";
import {
  Code,
  Globe,
  Cpu,
  TrendingUp,
  Send,
  Headphones,
  Palette,
  Cloud,
  ShieldAlert,
  BarChart3,
  GraduationCap,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Search,
  Filter,
  Sparkles,
} from "lucide-react";

export function ServicesClient() {
  const [selectedDivision, setSelectedDivision] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const getDivisionIcon = (number: string) => {
    switch (number) {
      case "01": return <Code className="w-5 h-5" />;
      case "02": return <Globe className="w-5 h-5" />;
      case "03": return <Cpu className="w-5 h-5" />;
      case "04": return <TrendingUp className="w-5 h-5" />;
      case "05": return <Send className="w-5 h-5" />;
      case "06": return <Headphones className="w-5 h-5" />;
      case "07": return <Palette className="w-5 h-5" />;
      case "08": return <Cloud className="w-5 h-5" />;
      case "09": return <ShieldAlert className="w-5 h-5" />;
      case "10": return <BarChart3 className="w-5 h-5" />;
      case "11": return <GraduationCap className="w-5 h-5" />;
      case "12": return <Briefcase className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const filteredServices = useMemo(() => {
    return ALL_SERVICES.filter((service) => {
      const matchesDivision =
        selectedDivision === "All" || service.divisionTitle === selectedDivision;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        service.title.toLowerCase().includes(q) ||
        service.divisionTitle.toLowerCase().includes(q) ||
        service.tagline.toLowerCase().includes(q) ||
        service.technologies.some((t) => t.toLowerCase().includes(q)) ||
        service.industries.some((i) => i.toLowerCase().includes(q));

      return matchesDivision && matchesSearch;
    });
  }, [selectedDivision, searchQuery]);

  return (
    <div className="flex flex-col w-full overflow-hidden bg-background text-foreground">
      
      {/* 1. Hero Section */}
      <section className="py-20 lg:py-28 bg-white dark:bg-charcoal border-b border-border text-center relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[90px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/25">
            <Sparkles className="w-3.5 h-3.5" />
            <span>12 Major Service Divisions • Enterprise Execution</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-charcoal dark:text-warm-white font-heading">
            Comprehensive <span className="gold-gradient-text">Technology Solutions</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-muted dark:text-slate-light leading-relaxed max-w-3xl mx-auto font-normal">
            From high-concurrency custom software and AI automation to official WhatsApp CPaaS messaging, performance marketing, and institutional consulting.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-charcoal text-warm-white dark:bg-gold dark:text-charcoal text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-md"
            >
              <span>Schedule Architectural Scope</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-charcoal dark:text-warm-white text-xs font-bold hover:border-gold/40 transition-all"
            >
              <span>Explore Software Marketplace</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Divisions Quick Filter Bar */}
      <section className="py-6 bg-warm-white/90 dark:bg-charcoal/80 border-b border-border sticky top-20 z-30 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Division Select */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              <span className="text-xs font-bold text-slate-muted uppercase tracking-wider flex items-center gap-1.5 mr-1 shrink-0">
                <Filter className="w-3.5 h-3.5 text-gold" /> Filter:
              </span>

              <button
                onClick={() => setSelectedDivision("All")}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedDivision === "All"
                    ? "bg-charcoal text-warm-white dark:bg-gold dark:text-charcoal shadow-md scale-105"
                    : "bg-white dark:bg-graphite text-slate-muted border border-border hover:border-gold/30"
                }`}
              >
                All Divisions ({ALL_SERVICES.length})
              </button>

              {SERVICE_DIVISIONS_LIST.map((div) => (
                <button
                  key={div.id}
                  onClick={() => setSelectedDivision(div.title)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedDivision === "All"
                      ? "bg-white dark:bg-graphite text-slate-muted border border-border hover:border-gold/30"
                      : selectedDivision === div.title
                      ? "bg-charcoal text-warm-white dark:bg-gold dark:text-charcoal shadow-md scale-105"
                      : "bg-white dark:bg-graphite text-slate-muted border border-border hover:border-gold/30"
                  }`}
                >
                  <span className="text-gold font-mono">{div.number}</span>
                  <span>{div.title}</span>
                </button>
              ))}
            </div>

            {/* Live Search */}
            <div className="relative min-w-[240px] max-w-xs shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search services, tech, industry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white dark:bg-graphite border border-border focus:outline-none focus:border-gold text-charcoal dark:text-warm-white"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 3. Services Showcase Grid */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service, idx) => (
                <motion.div
                  key={service.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: idx * 0.03 }}
                  className="h-full"
                >
                  <TiltCard tiltIntensity={6} glareOpacity={0.12} className="h-full">
                    <div className="h-full rounded-3xl bg-white dark:bg-charcoal border border-border hover:border-gold/50 p-8 flex flex-col justify-between transition-all duration-300 group hover:shadow-xl hover:shadow-gold/5 relative overflow-hidden">
                      {/* Ambient hover glow */}
                      <div className="absolute -top-16 -right-16 w-36 h-36 bg-gold/10 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div>
                        {/* Top Division & Status Badges */}
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gold bg-gold/10 px-2.5 py-1 rounded-full border border-gold/20 flex items-center gap-1.5">
                            {getDivisionIcon(service.divisionNumber)}
                            <span>Div {service.divisionNumber}</span>
                          </span>

                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              service.deliveryStatus === "ACTIVE"
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                                : service.deliveryStatus === "PLANNED"
                                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                                : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                            }`}
                          >
                            {service.deliveryStatus}
                          </span>
                        </div>

                        {/* Service Title */}
                        <Link href={`/services/${service.slug}`}>
                          <h3 className="text-xl sm:text-2xl font-bold text-charcoal dark:text-warm-white font-heading group-hover:text-gold transition-colors leading-snug mb-2">
                            {service.title}
                          </h3>
                        </Link>

                        <p className="text-xs text-gold font-medium mb-3">
                          {service.tagline}
                        </p>

                        <p className="text-xs text-slate-muted leading-relaxed line-clamp-3 mb-5">
                          {service.description}
                        </p>

                        {/* Deliverables snippet */}
                        <div className="space-y-1.5 mb-5 border-t border-border/60 pt-4">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-muted">
                            Core Offerings:
                          </div>
                          <ul className="text-xs text-slate-muted space-y-1">
                            {service.serviceOfferings.slice(0, 3).map((offering, oIdx) => (
                              <li key={oIdx} className="flex items-center gap-1.5 line-clamp-1">
                                <CheckCircle2 className="w-3 h-3 text-gold shrink-0" />
                                <span className="truncate">{offering.title}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tech Stack Chips */}
                        <div className="space-y-1.5 mb-6">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-muted">
                            Technologies:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {service.technologies.slice(0, 4).map((tech, tIdx) => (
                              <span
                                key={tIdx}
                                className="text-[10px] px-2 py-0.5 rounded-md bg-warm-white dark:bg-graphite text-charcoal/80 dark:text-warm-white/80 border border-border"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="pt-4 border-t border-border flex items-center justify-between gap-2">
                        <Link
                          href={`/services/${service.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:text-gold-light transition-colors group/link"
                        >
                          <span>Explore Dedicated Division</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                          href={`/contact?service=${encodeURIComponent(service.title)}`}
                          className="text-[11px] font-semibold text-slate-muted hover:text-charcoal dark:hover:text-warm-white transition-colors"
                        >
                          Inquire
                        </Link>
                      </div>

                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* 4. Delivery Framework */}
      <section className="py-20 bg-warm-white/60 dark:bg-charcoal/40 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <SectionHeader
            badge="Execution Guarantee"
            title="7-Step Agile Delivery Framework"
            subtitle="Transparent milestones, weekly sprint demos, and direct access to senior architecture leads on every engagement."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-12">
            {[
              { step: "01", title: "Architectural Discovery", desc: "Mapping workflows, data structures, concurrency demands, and statutory requirements." },
              { step: "02", title: "Interactive Prototype", desc: "High-fidelity Figma wireframes, design tokens, and user journeys." },
              { step: "03", title: "Core Sprint Development", desc: "Next.js 16, microservices, and database indexing built with weekly client reviews." },
              { step: "04", title: "Security & Load Testing", desc: "Automated regression, penetration audits, and 100k+ load simulation." },
              { step: "05", title: "Production Deployment", desc: "Zero-downtime rolling releases with edge caching and SSL hardening." },
              { step: "06", title: "Staff Onboarding & Training", desc: "Hands-on operational training and administrative documentation." },
              { step: "07", title: "SLA Monitoring & AMCs", desc: "Proactive uptime supervision, security patch monitoring, and performance scaling." },
            ].map((st, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white dark:bg-charcoal border border-border space-y-2">
                <div className="text-xl font-bold font-mono text-gold">{st.step}</div>
                <h4 className="font-bold text-sm text-charcoal dark:text-warm-white font-heading">{st.title}</h4>
                <p className="text-xs text-slate-muted leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Conversion Banner */}
      <CtaBanner
        title="Ready to Scale Your Enterprise Infrastructure?"
        subtitle="Schedule a technical discovery session directly with Founder & CEO Pavitra Arora and our senior engineering desk."
      />
    </div>
  );
}
