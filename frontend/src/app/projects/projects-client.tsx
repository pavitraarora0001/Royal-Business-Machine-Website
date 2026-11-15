"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CtaBanner } from "@/components/cta-banner";
import {
  PORTFOLIO_PROJECTS,
  PORTFOLIO_CATEGORIES,
} from "@/data/portfolio-data";
import {
  FolderGit2,
  ArrowRight,
  Filter,
  Search,
  Layers,
  CheckCircle2,
  Cpu,
  Smartphone,
  Globe,
  Megaphone,
} from "lucide-react";

type FilterTab =
  | "All Projects"
  | "Applications"
  | "AI Automation"
  | "Digital Marketing"
  | "Web Solutions"
  | "SEO Solutions";

const FILTER_TABS: { label: FilterTab; categoryMatch?: string }[] = [
  { label: "All Projects" },
  { label: "Applications", categoryMatch: "Application Development" },
  { label: "AI Automation", categoryMatch: "AI & Business Automation" },
  { label: "Digital Marketing", categoryMatch: "Digital Marketing" },
  { label: "Web Solutions", categoryMatch: "Web Solutions" },
  { label: "SEO Solutions", categoryMatch: "SEO Solutions" },
];

export function ProjectsClient() {
  const [selectedTab, setSelectedTab] = useState<FilterTab>("All Projects");
  const [searchQuery, setSearchQuery] = useState("");

  // Compute live project count for each tab from actual records
  const tabCounts = useMemo(() => {
    const counts: Record<FilterTab, number> = {
      "All Projects": PORTFOLIO_PROJECTS.length,
      Applications: 0,
      "AI Automation": 0,
      "Digital Marketing": 0,
      "Web Solutions": 0,
      "SEO Solutions": 0,
    };

    PORTFOLIO_PROJECTS.forEach((p) => {
      if (p.categories.includes("Application Development")) counts.Applications += 1;
      if (p.categories.includes("AI & Business Automation")) counts["AI Automation"] += 1;
      if (p.categories.includes("Digital Marketing")) counts["Digital Marketing"] += 1;
      if (p.categories.includes("Web Solutions")) counts["Web Solutions"] += 1;
      if (p.categories.includes("SEO Solutions")) counts["SEO Solutions"] += 1;
    });

    return counts;
  }, []);

  // Filter projects by category and search query
  const filteredProjects = useMemo(() => {
    const targetMatch = FILTER_TABS.find((t) => t.label === selectedTab)?.categoryMatch;

    return PORTFOLIO_PROJECTS.filter((project) => {
      const matchesCategory =
        !targetMatch || project.categories.includes(targetMatch);

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.client.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.technologies.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedTab, searchQuery]);

  // Helper icon for category
  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Application Development":
        return <Smartphone className="w-3.5 h-3.5" />;
      case "AI & Business Automation":
        return <Cpu className="w-3.5 h-3.5" />;
      case "Digital Marketing":
        return <Megaphone className="w-3.5 h-3.5" />;
      case "Web Solutions":
        return <Globe className="w-3.5 h-3.5" />;
      case "SEO Solutions":
        return <Search className="w-3.5 h-3.5" />;
      default:
        return <Layers className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="flex flex-col w-full overflow-hidden bg-background text-foreground">
      
      {/* 1. Hero Section */}
      <section className="py-20 lg:py-28 bg-white dark:bg-charcoal border-b border-border text-center relative overflow-hidden">
        {/* Ambient Gold Radial Glows */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[90px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-6 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/25">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Proven Deployments (50+ Active Deployments)</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-charcoal dark:text-warm-white font-heading">
            Our Work & <span className="gold-gradient-text">Solutions</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-muted dark:text-slate-light leading-relaxed max-w-3xl mx-auto font-normal">
            Explore our technology, automation and digital growth solutions. Authentic, high-impact software architectures, mobile apps, government college portals, and enterprise branding suites delivered across India&apos;s emerging markets.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-charcoal text-warm-white dark:bg-gold dark:text-charcoal hover:opacity-90 transition-all shadow-md"
            >
              <span>Discuss Your Enterprise Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#projects-grid"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-warm-white dark:bg-graphite text-charcoal dark:text-warm-white border border-border hover:border-gold/40 transition-all"
            >
              <span>Explore Verified Case Studies ({PORTFOLIO_PROJECTS.length})</span>
            </a>
          </div>

        </div>
      </section>

      {/* 2. Interactive Category Filter Bar & Search */}
      <section
        id="projects-grid"
        className="py-6 bg-warm-white/90 dark:bg-charcoal/80 border-b border-border sticky top-20 z-30 backdrop-blur-md"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              <span className="text-xs font-bold text-slate-muted uppercase tracking-wider flex items-center gap-1.5 mr-1 shrink-0">
                <Filter className="w-3.5 h-3.5 text-gold" /> Filter:
              </span>

              {FILTER_TABS.map((tab) => {
                const isSelected = selectedTab === tab.label;
                const count = tabCounts[tab.label];

                return (
                  <button
                    key={tab.label}
                    onClick={() => setSelectedTab(tab.label)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-charcoal text-warm-white dark:bg-gold dark:text-charcoal shadow-md shadow-gold/10 scale-105"
                        : "bg-white dark:bg-graphite text-slate-muted hover:text-charcoal dark:hover:text-white border border-border hover:border-gold/30"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isSelected
                          ? "bg-white/20 dark:bg-charcoal/20 text-white dark:text-charcoal"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Live Search Input */}
            <div className="relative min-w-[240px] max-w-xs shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search projects, stack, client..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white dark:bg-graphite border border-border focus:outline-none focus:border-gold/60 text-charcoal dark:text-warm-white placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-charcoal dark:hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 3. Category Overview Cards (Context Bar) */}
      <section className="py-6 bg-slate-50/50 dark:bg-charcoal/30 border-b border-border text-xs">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {PORTFOLIO_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedTab(cat.shortLabel as FilterTab)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedTab === cat.shortLabel
                    ? "bg-white dark:bg-graphite border-gold shadow-sm ring-1 ring-gold/30"
                    : "bg-white/60 dark:bg-graphite/40 border-border hover:border-gold/30"
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-charcoal dark:text-warm-white mb-1">
                  <span className="text-gold">{getCategoryIcon(cat.name)}</span>
                  <span className="truncate">{cat.name}</span>
                </div>
                <p className="text-[11px] text-slate-muted line-clamp-2 leading-tight">
                  {cat.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Projects Showcase Grid */}
      <section className="py-20 bg-background border-b border-border relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          {filteredProjects.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <Layers className="w-12 h-12 text-slate-400 mx-auto opacity-50" />
              <h3 className="text-xl font-bold text-charcoal dark:text-warm-white font-heading">
                No matching projects found
              </h3>
              <p className="text-sm text-slate-muted max-w-md mx-auto">
                No deployments match &ldquo;{searchQuery}&rdquo; in category {selectedTab}. Try clearing your search query or selecting &ldquo;All Projects&rdquo;.
              </p>
              <button
                onClick={() => {
                  setSelectedTab("All Projects");
                  setSearchQuery("");
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-gold text-charcoal hover:bg-gold-light transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, idx) => (
                  <motion.div
                    key={project.slug}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full"
                  >
                    <div
                      className={`h-full rounded-3xl bg-white dark:bg-charcoal border ${
                        project.featured
                          ? "border-gold/50 shadow-md ring-1 ring-gold/25"
                          : "border-border shadow-sm hover:border-gold/40"
                      } p-7 flex flex-col justify-between transition-all duration-300 group hover:shadow-xl hover:shadow-gold/5 relative overflow-hidden`}
                    >
                      {/* Ambient hover gold shimmer */}
                      <div className="absolute -top-16 -right-16 w-36 h-36 bg-gold/10 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div>
                        {/* Top Meta Bar */}
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <div className="flex flex-wrap items-center gap-1.5">
                            {project.categories.slice(0, 2).map((cat) => (
                              <span
                                key={cat}
                                className="text-[10px] font-bold uppercase tracking-wider text-gold bg-gold/10 px-2.5 py-1 rounded-full border border-gold/20 flex items-center gap-1"
                              >
                                {getCategoryIcon(cat)}
                                <span>{cat}</span>
                              </span>
                            ))}
                          </div>
                          {project.contractValue && (
                            <span className="text-xs font-semibold text-slate-muted whitespace-nowrap">
                              {project.contractValue}
                            </span>
                          )}
                        </div>

                        {/* Project Title with link to case study */}
                        <Link href={`/projects/${project.slug}`}>
                          <h3 className="text-2xl font-bold text-charcoal dark:text-warm-white mb-2 font-heading group-hover:text-gold transition-colors duration-300 leading-snug">
                            {project.title}
                          </h3>
                        </Link>

                        {/* Client & Industry */}
                        <div className="text-xs font-semibold text-gold mb-3 flex items-center justify-between">
                          <span>Client: {project.client}</span>
                          <span className="text-[11px] text-slate-muted font-normal">
                            {project.projectDate}
                          </span>
                        </div>

                        {/* Short Description */}
                        <p className="text-xs sm:text-sm text-slate-muted leading-relaxed mb-4 font-normal">
                          {project.description}
                        </p>

                        {/* Verified Outcome Box */}
                        <div className="p-3.5 rounded-xl bg-warm-white dark:bg-graphite/60 border border-border mb-5">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-charcoal dark:text-warm-white mb-1 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-gold" />
                            <span>Verified Outcome:</span>
                          </div>
                          <p className="text-xs text-slate-muted leading-relaxed font-normal">
                            {project.outcome}
                          </p>
                        </div>

                        {/* Tech Stack Chips */}
                        <div className="space-y-1.5 mb-6">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-muted">
                            Tech Stack & Architecture
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {project.technologies.map((t, idx2) => (
                              <span
                                key={idx2}
                                className="text-[11px] px-2.5 py-0.5 rounded-lg bg-warm-white dark:bg-graphite border border-border text-charcoal/80 dark:text-warm-white/80 group-hover:border-gold/20 transition-colors"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="pt-4 border-t border-border flex items-center justify-between gap-2">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:text-gold-light transition-colors group/link"
                        >
                          <span>View Full Case Study</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1.5 transition-transform" />
                        </Link>

                        <Link
                          href={`/contact?project=${encodeURIComponent(project.title)}`}
                          className="text-[11px] font-semibold text-slate-muted hover:text-charcoal dark:hover:text-warm-white transition-colors"
                        >
                          Inquire
                        </Link>
                      </div>

                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

        </div>
      </section>

      {/* 5. Conversion CTA Banner */}
      <CtaBanner
        title="Have a Complex Architecture in Mind?"
        subtitle="We scope, architect, build, and deploy high-concurrency systems across applications, AI automation, digital marketing, web solutions, and SEO."
      />
    </div>
  );
}
