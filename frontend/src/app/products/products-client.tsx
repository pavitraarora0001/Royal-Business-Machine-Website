"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ALL_PRODUCTS, 
  SoftwareProduct, 
  ProductStatus 
} from "@/data/products-data";
import { 
  Truck, 
  Activity, 
  GraduationCap, 
  Users, 
  Layers, 
  Utensils, 
  Send, 
  MessageSquare, 
  Calendar, 
  CheckSquare, 
  BarChart3, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Search, 
  ExternalLink,
  ShieldCheck,
  Cpu,
  Clock,
  X,
  Phone
} from "lucide-react";
import { RevealOnScroll, TiltCard } from "@/components/motion";

const iconMap: Record<string, React.ElementType> = {
  Truck,
  Activity,
  GraduationCap,
  Users,
  Layers,
  Utensils,
  Send,
  MessageSquare,
  Calendar,
  CheckSquare,
  BarChart3,
};

export function ProductsClient() {
  const [selectedFilter, setSelectedFilter] = useState<"ALL" | ProductStatus>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalProduct, setActiveModalProduct] = useState<SoftwareProduct | null>(null);

  // Modal Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    requirement: "",
  });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success">("idle");

  const filteredProducts = ALL_PRODUCTS.filter((product) => {
    const matchesFilter = selectedFilter === "ALL" || product.status === selectedFilter;
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const availableCount = ALL_PRODUCTS.filter(p => p.status === "AVAILABLE").length;
  const inDevCount = ALL_PRODUCTS.filter(p => p.status === "IN DEVELOPMENT").length;
  const plannedCount = ALL_PRODUCTS.filter(p => p.status === "PLANNED").length;

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalProduct) return;
    setSubmitStatus("submitting");

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company || "Not Specified",
          service: `Product Demo: ${activeModalProduct.name}`,
          message: `[Product Request: ${activeModalProduct.name} (${activeModalProduct.slug}) - Status: ${activeModalProduct.status}] Requirements: ${formData.requirement}`,
          source: "website-products",
        }),
      });
    } catch {
      // Graceful local handling
    }

    setSubmitStatus("success");
  };

  const getStatusBadge = (status: ProductStatus) => {
    switch (status) {
      case "AVAILABLE":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Ready for Deployment
          </span>
        );
      case "IN DEVELOPMENT":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Active Development (Q2 2026)
          </span>
        );
      case "PLANNED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20">
            <Clock className="w-3 h-3" />
            Roadmap Item
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Header */}
      <section className="relative py-20 lg:py-28 bg-white dark:bg-charcoal border-b border-border text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-36 bg-gold/5 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-6 relative z-10">
          <RevealOnScroll direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs sm:text-sm font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PROPRIETARY SOFTWARE SUITE & READY PLATFORMS</span>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-navy dark:text-white tracking-tight">
              Enterprise Software Products & <span className="text-gold">Turnkey Platforms</span>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Engineered for high concurrency, field resilience, and mission-critical reliability. 
              Explore our proprietary vertical SaaS suites, from rural dairy logistics to institutional campus ERPs.
            </p>
          </RevealOnScroll>

          {/* Search Bar & Filter Controls */}
          <div className="pt-6 max-w-2xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search products by name, category, or technology (e.g., SQLite, ERP, WhatsApp)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-charcoal-light border border-border text-navy dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-gold/50 shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-navy dark:hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <button
                onClick={() => setSelectedFilter("ALL")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  selectedFilter === "ALL"
                    ? "bg-navy dark:bg-gold text-white dark:text-navy shadow-md"
                    : "bg-slate-100 dark:bg-charcoal-light text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-charcoal"
                }`}
              >
                All Products ({ALL_PRODUCTS.length})
              </button>
              <button
                onClick={() => setSelectedFilter("AVAILABLE")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  selectedFilter === "AVAILABLE"
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-slate-100 dark:bg-charcoal-light text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-charcoal"
                }`}
              >
                Available Now ({availableCount})
              </button>
              <button
                onClick={() => setSelectedFilter("IN DEVELOPMENT")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  selectedFilter === "IN DEVELOPMENT"
                    ? "bg-amber-600 text-white shadow-md"
                    : "bg-slate-100 dark:bg-charcoal-light text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-charcoal"
                }`}
              >
                In Development ({inDevCount})
              </button>
              <button
                onClick={() => setSelectedFilter("PLANNED")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  selectedFilter === "PLANNED"
                    ? "bg-slate-700 text-white shadow-md"
                    : "bg-slate-100 dark:bg-charcoal-light text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-charcoal"
                }`}
              >
                Roadmap ({plannedCount})
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Product Grid Section */}
      <section className="py-16 lg:py-24 bg-slate-50 dark:bg-[#0B1120]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-charcoal rounded-3xl border border-border p-8">
              <Cpu className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-navy dark:text-white">No products matched your criteria</h3>
              <p className="text-slate-500 mt-2 text-sm">Try clearing your search query or switching filters.</p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedFilter("ALL"); }}
                className="mt-4 px-4 py-2 rounded-xl bg-gold/10 text-gold text-sm font-semibold hover:bg-gold/20"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, idx) => {
                const IconComponent = iconMap[product.iconName] || Cpu;

                return (
                  <RevealOnScroll key={product.id} delay={idx * 0.05}>
                    <TiltCard className="h-full">
                      <div className="h-full flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-white dark:bg-charcoal border border-border hover:border-gold/40 shadow-sm hover:shadow-xl transition-all duration-300">
                        {/* Top Meta */}
                        <div className="space-y-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                              <IconComponent className="w-6 h-6" />
                            </div>
                            <div>{getStatusBadge(product.status)}</div>
                          </div>

                          <div>
                            <span className="text-xs uppercase tracking-wider font-semibold text-gold">
                              {product.category}
                            </span>
                            <h3 className="text-xl font-bold text-navy dark:text-white mt-1 group-hover:text-gold transition-colors">
                              {product.name}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 italic">
                              {product.tagline}
                            </p>
                          </div>

                          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            {product.description}
                          </p>

                          {/* Key Capabilities */}
                          <div className="space-y-2 pt-2 border-t border-border">
                            <span className="text-xs font-semibold text-navy dark:text-slate-200 block">
                              Key Features:
                            </span>
                            <ul className="space-y-1.5">
                              {product.features.slice(0, 3).map((feat, fIdx) => (
                                <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                                  <span>{feat}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Tech Stack Chips */}
                          <div className="pt-2">
                            <div className="flex flex-wrap gap-1.5">
                              {product.technologies.slice(0, 4).map((tech, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-charcoal-light text-slate-600 dark:text-slate-400 border border-border"
                                >
                                  {tech}
                                </span>
                              ))}
                              {product.technologies.length > 4 && (
                                <span className="px-2 py-0.5 rounded-md text-[11px] font-mono text-slate-400">
                                  +{product.technologies.length - 4}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Bottom Actions */}
                        <div className="pt-6 mt-6 border-t border-border flex flex-col gap-2">
                          <button
                            onClick={() => {
                              setActiveModalProduct(product);
                              setSubmitStatus("idle");
                            }}
                            className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                              product.status === "AVAILABLE"
                                ? "bg-navy hover:bg-gold hover:text-navy text-white dark:bg-gold dark:text-navy dark:hover:bg-gold-light"
                                : "bg-slate-100 dark:bg-charcoal-light hover:bg-slate-200 dark:hover:bg-charcoal text-navy dark:text-white"
                            }`}
                          >
                            <span>
                              {product.status === "AVAILABLE"
                                ? "Schedule Live Demo"
                                : product.status === "IN DEVELOPMENT"
                                ? "Register Early Access"
                                : "Request Roadmap Brief"}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>

                          {product.caseStudySlug && (
                            <Link
                              href={`/portfolio/${product.caseStudySlug}`}
                              className="w-full py-1.5 text-center text-xs font-medium text-slate-500 hover:text-gold transition-colors flex items-center justify-center gap-1.5"
                            >
                              <span>View Verified Deployment Case Study</span>
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </TiltCard>
                  </RevealOnScroll>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 3. Competitive Advantage / Engineering Benchmark */}
      <section className="py-20 bg-white dark:bg-charcoal border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center space-y-4 mb-12">
            <span className="text-xs uppercase tracking-widest font-bold text-gold">
              ROYAL BUSINESS MACHINE PLATFORM ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-navy dark:text-white">
              Why Enterprises Choose Our In-House Platforms
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
              Unlike generic white-labeled resellers or fragmented third-party scripts, all Royal Business Machine platforms are built, supported, and continuously audited by our engineering team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-charcoal-light border border-border space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-navy dark:text-white">Zero Reseller Middlemen</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Direct source code ownership, zero license markup from third-party vendors, and custom on-premise or sovereign cloud hosting options.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-charcoal-light border border-border space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-navy dark:text-white">Offline & High-Concurrency Resilient</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                From rural milk collection booths running SQLite without mobile data to college portals handling 100k concurrent result checks.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-charcoal-light border border-border space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-navy dark:text-white">Direct Local Leadership Support</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Direct technical escalation to Chief Executive Officer Pavitra Arora and engineering leads. No anonymous offshore ticket blackholes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Product Demo / Consultation Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-white dark:bg-charcoal rounded-3xl border border-gold/30 shadow-2xl p-6 sm:p-8 overflow-hidden">
            {/* Ambient gold glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold/10 blur-3xl pointer-events-none" />

            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-charcoal-light text-slate-400 hover:text-navy dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {submitStatus === "success" ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-navy dark:text-white">
                  Request Received!
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                  Thank you, {formData.name}. Our engineering team will review your requirement for{" "}
                  <strong className="text-gold">{activeModalProduct.name}</strong> and reach out within 24 hours.
                </p>
                <div className="pt-4 flex flex-col gap-2">
                  <a
                    href={`https://wa.me/917906915228?text=${encodeURIComponent(
                      `Hello Royal Business Machine, I requested a demo/details for ${activeModalProduct.name}. My name is ${formData.name}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2"
                  >
                    <span>Connect Instantly on WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setActiveModalProduct(null)}
                    className="w-full py-2.5 text-xs text-slate-500 hover:text-navy dark:hover:text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleModalSubmit} className="space-y-4">
                <div>
                  <div className="text-xs uppercase font-bold text-gold tracking-wider">
                    {activeModalProduct.status === "AVAILABLE" ? "DEMO INQUIRY" : "EARLY ACCESS REGISTRATION"}
                  </div>
                  <h3 className="text-xl font-serif font-bold text-navy dark:text-white mt-1">
                    {activeModalProduct.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {activeModalProduct.tagline}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rajesh Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-charcoal-light border border-border text-navy dark:text-white text-xs sm:text-sm focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rajesh@organization.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-charcoal-light border border-border text-navy dark:text-white text-xs sm:text-sm focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-charcoal-light border border-border text-navy dark:text-white text-xs sm:text-sm focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      Organization / Business Name
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Bharatpur Dairy Cooperative"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-charcoal-light border border-border text-navy dark:text-white text-xs sm:text-sm focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      Specific Deployment Requirements or Questions
                    </label>
                    <textarea
                      rows={3}
                      value={formData.requirement}
                      onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                      placeholder="Number of users, locations, existing infrastructure, or desired deployment timeline..."
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-charcoal-light border border-border text-navy dark:text-white text-xs sm:text-sm focus:outline-none focus:border-gold resize-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitStatus === "submitting"}
                    className="w-full py-3 px-4 rounded-xl bg-navy dark:bg-gold text-white dark:text-navy font-semibold text-xs sm:text-sm hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
                  >
                    <span>
                      {submitStatus === "submitting"
                        ? "Transmitting Request..."
                        : activeModalProduct.status === "AVAILABLE"
                        ? "Request Product Walkthrough"
                        : "Submit Early Access Application"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
