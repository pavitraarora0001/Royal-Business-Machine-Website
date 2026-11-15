import Link from "next/link";
import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/stats-section";
import { ServicesPreview } from "@/components/home/services-preview";
import { CtaBanner } from "@/components/cta-banner";
import { SectionHeader } from "@/components/section-header";
import {
  RevealOnScroll,
  TiltCard,
} from "@/components/motion";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  Star,
} from "lucide-react";

export default function HomePage() {
  const featuredCaseStudies = [
    {
      title: "Dairy Muneem Mobile App",
      category: "Mobile Apps & Logistics",
      client: "Regional Dairy Federation",
      value: "₹2,50,000 Contract",
      desc: "Milk Fat/SNF computational pricing engine with offline synchronization for 40+ village milk procurement centers.",
      tech: ["Flutter / React Native", "Node.js", "SMS Gateway"],
      href: "/projects",
    },
    {
      title: "HMS Hospital Management Software",
      category: "Enterprise Software / ERP",
      client: "Private Healthcare Group",
      value: "₹3,50,000 Contract",
      desc: "Comprehensive Electronic Health Records (EHR), OPD/IPD flows, doctor prescription pads, and automated pharmacy billing.",
      tech: ["React / Next.js", "PostgreSQL", "Role-Based RBAC"],
      href: "/projects",
    },
    {
      title: "Govt College Institutional Portals",
      category: "E-Governance & Education",
      client: "Govt Colleges Bharatpur & Karauli",
      value: "Institutional Deployments",
      desc: "High-security public portals serving over 100,000 concurrent student admission and examination inquiries.",
      tech: ["Next.js", "WCAG 2.1", "CDN Edge Caching"],
      href: "/projects",
    },
  ];

  const corePillars = [
    {
      title: "Full-Stack Ownership",
      desc: "From cloud-native software and mobile apps down to on-ground print collateral and computer labs, we eliminate fragmented multi-vendor friction.",
      icon: Layers,
    },
    {
      title: "Institutional Delivery",
      desc: "Proven track record executing government college portals, compliance audits, and high-ticket enterprise contracts with 99% satisfaction.",
      icon: ShieldCheck,
    },
    {
      title: "Proprietary Innovation",
      desc: "Pioneering original SaaS platforms such as NyayaSetu (AI e-governance) and Anti-Paper Leak examination integrity software.",
      icon: Cpu,
    },
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Authentic Stats Section */}
      <StatsSection />

      {/* 3. The RBM Advantage / Company Narrative */}
      <section className="py-24 bg-white dark:bg-charcoal border-b border-border relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-1/2 -right-48 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <RevealOnScroll direction="left" className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-gold/10 text-gold border border-gold/25">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Integrated Model</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-charcoal dark:text-warm-white font-heading leading-tight">
                Single-Point Accountability for Digital & Physical Infrastructure
              </h2>

              <p className="text-base text-slate-muted dark:text-slate-light leading-relaxed font-normal">
                Indian MSMEs and institutions face severe coordination bottlenecks when dealing with separate web designers, app agencies, marketing freelancers, and printing shops.
              </p>

              <p className="text-base text-slate-muted dark:text-slate-light leading-relaxed font-normal">
                <strong className="text-charcoal dark:text-warm-white">ROYAL BUSINESS MACHINE</strong> functions as an integrated technology and business infrastructure platform. Under the leadership of Founder & CEO Pavitra Arora, we integrate digital technology, corporate branding, government tender execution, and physical infrastructure under one unified operating model.
              </p>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white font-semibold text-sm hover:border-gold hover:text-gold transition-all shadow-sm group"
                >
                  <span>Read Corporate History & Leadership</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </RevealOnScroll>

            <RevealOnScroll direction="right" className="lg:col-span-6 space-y-5">
              {corePillars.map((pillar, idx) => (
                <TiltCard key={idx} maxTilt={4}>
                  <div className="p-6 rounded-2xl bg-warm-white/70 dark:bg-graphite/40 border border-border hover:border-gold/50 hover:shadow-lg transition-all group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-white group-hover:scale-105 transition-all">
                        <pillar.icon className="w-6 h-6" />
                      </div>
                      <div className="space-y-1.5">
                        <h3 className="text-lg font-bold text-charcoal dark:text-warm-white font-heading group-hover:text-gold transition-colors">
                          {pillar.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-muted dark:text-slate-light leading-relaxed font-normal">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </RevealOnScroll>

          </div>
        </div>
      </section>

      {/* 4. Services Preview Grid */}
      <ServicesPreview />

      {/* 5. Featured Case Studies */}
      <section className="py-24 bg-white dark:bg-charcoal border-b border-border relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <SectionHeader
            badge="Proven Execution"
            title="Featured Case Studies & High-Impact Deployments"
            subtitle="Explore how we engineered robust digital infrastructure and physical executions across diverse regional sectors."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCaseStudies.map((study, idx) => (
              <RevealOnScroll key={idx} delay={idx * 0.1} direction="up" className="h-full">
                <TiltCard maxTilt={5} className="h-full">
                  <div className="h-full rounded-2xl bg-warm-white/60 dark:bg-graphite/40 border border-border p-7 flex flex-col justify-between hover:border-gold/60 hover:shadow-2xl transition-all duration-300 group">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gold bg-gold/10 px-2.5 py-1 rounded-full border border-gold/20">
                          {study.category}
                        </span>
                        <span className="text-xs font-semibold text-slate-muted">
                          {study.value}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-charcoal dark:text-warm-white mb-2 font-heading group-hover:text-gold transition-colors">
                        {study.title}
                      </h3>

                      <p className="text-xs text-gold font-medium mb-3">
                        Client: {study.client}
                      </p>

                      <p className="text-xs sm:text-sm text-slate-muted leading-relaxed mb-6 font-normal">
                        {study.desc}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {study.tech.map((t, i) => (
                          <span
                            key={i}
                            className="text-[11px] px-2.5 py-1 rounded-lg bg-white dark:bg-charcoal border border-border text-charcoal/80 dark:text-warm-white/80"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={study.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:text-gold-dark transition-colors pt-2 group-hover:translate-x-1.5 transition-transform"
                    >
                      <span>Explore Full Case Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </TiltCard>
              </RevealOnScroll>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-charcoal dark:bg-gold text-warm-white dark:text-charcoal font-bold text-xs uppercase tracking-wider hover:bg-gold dark:hover:bg-warm-white transition-all shadow-md group"
            >
              <span>View All 50+ Projects in Portfolio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      {/* 6. Proprietary Solutions Spotlight: NyayaSetu */}
      <section className="py-24 bg-charcoal text-warm-white relative overflow-hidden">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#C5A059 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <RevealOnScroll direction="up">
            <div className="max-w-5xl mx-auto rounded-3xl bg-graphite/80 border border-gold/40 p-8 sm:p-14 relative overflow-hidden shadow-2xl backdrop-blur-md">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-8 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/15 text-gold border border-gold/30">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Flagship AI E-Governance Solution</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
                    NyayaSetu — Bridge to Justice
                  </h2>

                  <p className="text-sm text-slate-light leading-relaxed">
                    An AI-powered, SaaS-based e-governance platform designed to bridge the gap between citizens and law-enforcement agencies. Provides guided incident submission with automated IPC/BNS section identification and a secure police dashboard for faster, accurate FIR preparation.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-light">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                      <span>Explainable AI & Legal Rule Engine</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                      <span>Secure Police FIR Drafting Assistant</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                      <span>Human-in-the-Loop Override Architecture</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                      <span>Modular SaaS Scalability</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col justify-center items-center sm:items-start lg:items-end gap-4 border-t lg:border-t-0 lg:border-l border-border-dark pt-6 lg:pt-0 lg:pl-8">
                  <div className="text-center sm:text-left lg:text-right">
                    <div className="text-2xl font-extrabold text-gold font-heading">AI E-Governance</div>
                    <div className="text-xs text-slate-light mt-1">District Pilot Ready</div>
                  </div>
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gold text-charcoal font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition-all shadow-md group"
                  >
                    <span>Request Product Demo</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 7. Client Proof / Authentic Reviews */}
      <section className="py-24 bg-warm-white dark:bg-charcoal/40 border-b border-border relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <SectionHeader
            badge="Client Trust"
            title="Trusted by Regional Leaders & Enterprises"
            subtitle="Authentic feedback from partners who transformed their operations with Royal Business Machine."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <RevealOnScroll delay={0.1} direction="up" className="h-full">
              <TiltCard maxTilt={5} className="h-full">
                <div className="h-full p-7 rounded-2xl bg-white dark:bg-charcoal border border-border hover:border-gold/50 shadow-sm hover:shadow-xl flex flex-col justify-between transition-all duration-300">
                  <div>
                    <div className="flex gap-1 text-gold mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-charcoal dark:text-warm-white leading-relaxed mb-6 font-medium italic">
                      &ldquo;Bahut achha kaam kiya RBM ne. Deadlines ka pura dhyan rakha aur quality mein koi compromise nahi. 100% recommend karunga!&rdquo;
                    </p>
                  </div>
                  <div className="border-t border-border pt-4">
                    <h4 className="text-sm font-bold text-charcoal dark:text-warm-white">Patel Enterprises</h4>
                    <p className="text-xs text-slate-muted">Ahmedabad & Regional Trading</p>
                  </div>
                </div>
              </TiltCard>
            </RevealOnScroll>

            <RevealOnScroll delay={0.2} direction="up" className="h-full">
              <TiltCard maxTilt={5} className="h-full">
                <div className="h-full p-7 rounded-2xl bg-white dark:bg-charcoal border border-border hover:border-gold/50 shadow-sm hover:shadow-xl flex flex-col justify-between transition-all duration-300">
                  <div>
                    <div className="flex gap-1 text-gold mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-charcoal dark:text-warm-white leading-relaxed mb-6 font-medium italic">
                      &ldquo;Royal Business Machine ne hamare business ko digital duniya mein ek naya mukam diya. Bahut hi professional team hai!&rdquo;
                    </p>
                  </div>
                  <div className="border-t border-border pt-4">
                    <h4 className="text-sm font-bold text-charcoal dark:text-warm-white">Pavitra Enterprise</h4>
                    <p className="text-xs text-slate-muted">Commercial Commodity Distribution</p>
                  </div>
                </div>
              </TiltCard>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3} direction="up" className="h-full">
              <TiltCard maxTilt={5} className="h-full">
                <div className="h-full p-7 rounded-2xl bg-white dark:bg-charcoal border border-border hover:border-gold/50 shadow-sm hover:shadow-xl flex flex-col justify-between transition-all duration-300">
                  <div>
                    <div className="flex gap-1 text-gold mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-charcoal dark:text-warm-white leading-relaxed mb-6 font-medium italic">
                      &ldquo;The institutional portal delivered for our college handled thousands of admissions without a single second of downtime. Excellent execution.&rdquo;
                    </p>
                  </div>
                  <div className="border-t border-border pt-4">
                    <h4 className="text-sm font-bold text-charcoal dark:text-warm-white">Institutional Directorate</h4>
                    <p className="text-xs text-slate-muted">Higher Education Sector</p>
                  </div>
                </div>
              </TiltCard>
            </RevealOnScroll>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:text-gold-dark transition-colors group"
            >
              <span>Read All Client Reviews & Video Testimonials</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      {/* 8. Conversion CTA Banner */}
      <CtaBanner />
    </div>
  );
}
