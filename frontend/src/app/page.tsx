import Link from "next/link";
import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/stats-section";
import { ServicesPreview } from "@/components/home/services-preview";
import { CtaBanner } from "@/components/cta-banner";
import { SectionHeader } from "@/components/section-header";
import {
  ScrollProgress,
  ScrollScene,
  ScrollTransition,
  SectionReveal,
  TextReveal,
  FloatingGeometry,
  ProjectShowcase,
  ProcessPipeline,
  AnimatedCircuit,
} from "@/components/cinematic";
import { TiltCard } from "@/components/motion";
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
    <div className="relative flex flex-col w-full overflow-hidden">
      {/* 1. Global Scroll Progress Bar */}
      <ScrollProgress showPercentage={true} />

      {/* 2. Coordinated Background 3D ScrollScene (Royal Technology Core) */}
      <ScrollScene intensity="full" />

      {/* 3. Hero Section (Phase 0) */}
      <div id="hero" className="relative z-10">
        <HeroSection />
      </div>

      <ScrollTransition />

      {/* 4. Authentic Stats Section */}
      <div id="stats" className="relative z-10">
        <StatsSection />
      </div>

      <ScrollTransition />

      {/* 5. The RBM Advantage / Company Narrative (Phase 1) */}
      <section
        id="advantage"
        className="py-24 bg-white/80 dark:bg-charcoal/80 backdrop-blur-md border-b border-border relative overflow-hidden z-10"
      >
        {/* Floating Geometry Accents */}
        <FloatingGeometry
          type="octahedron"
          size={52}
          color="#C6A869"
          speed={7}
          className="absolute -top-4 right-12 hidden lg:block opacity-40"
        />
        <FloatingGeometry
          type="prism"
          size={44}
          color="#E5C583"
          speed={9}
          className="absolute bottom-8 left-8 hidden lg:block opacity-30"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <SectionReveal direction="left" className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-gold/10 text-gold border border-gold/25">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Integrated Model</span>
              </div>

              <TextReveal
                as="h2"
                text="Single-Point Accountability for Digital & Physical Infrastructure"
                highlightWords={["Accountability", "Digital", "Infrastructure"]}
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-charcoal dark:text-warm-white font-heading leading-tight"
              />

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
            </SectionReveal>

            <SectionReveal direction="right" className="lg:col-span-6 space-y-5">
              {corePillars.map((pillar, idx) => (
                <TiltCard key={idx} maxTilt={4}>
                  <div className="p-6 rounded-2xl bg-warm-white/70 dark:bg-graphite/40 border border-border hover:border-gold/50 hover:shadow-lg transition-all group backdrop-blur-sm">
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
            </SectionReveal>

          </div>
        </div>
      </section>

      <AnimatedCircuit orientation="horizontal" color="#C6A869" className="relative z-10 my-4" />

      {/* 6. Services Preview Grid (Phase 2) */}
      <div id="services" className="relative z-10">
        <ServicesPreview />
      </div>

      <ScrollTransition />

      {/* 7. Featured Case Studies & High-Impact Deployments (Phase 3) */}
      <section id="projects" className="py-24 bg-white/70 dark:bg-charcoal/70 backdrop-blur-md border-b border-border relative overflow-hidden z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <SectionHeader
            badge="Proven Execution"
            title="Featured Case Studies & High-Impact Deployments"
            subtitle="Explore how we engineered robust digital infrastructure and physical executions across diverse regional sectors."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCaseStudies.map((study, idx) => (
              <ProjectShowcase
                key={idx}
                index={idx}
                title={study.title}
                category={study.category}
                client={study.client}
                contractValue={study.value}
                description={study.desc}
                technologies={study.tech}
                href={study.href}
              />
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

      <ScrollTransition />

      {/* 8. Proprietary Solutions Spotlight: NyayaSetu AI */}
      <section id="innovation" className="py-24 bg-charcoal text-warm-white relative overflow-hidden z-10">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#C5A059 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionReveal direction="up">
            <div className="max-w-5xl mx-auto rounded-3xl bg-graphite/80 border border-gold/40 p-8 sm:p-14 relative overflow-hidden shadow-2xl backdrop-blur-md">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <div className="lg:col-span-8 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/15 text-gold border border-gold/30">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Flagship AI E-Governance Solution</span>
                  </div>

                  <TextReveal
                    as="h2"
                    text="NyayaSetu — Bridge to Justice"
                    highlightWords={["NyayaSetu", "Justice"]}
                    className="text-3xl sm:text-4xl font-extrabold text-white font-heading"
                  />

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
          </SectionReveal>
        </div>
      </section>

      <ScrollTransition />

      {/* 9. Process Pipeline: 7-Step Agile Delivery (Connected Technology Pipeline) */}
      <section id="process" className="py-24 bg-white/70 dark:bg-charcoal/70 backdrop-blur-md border-b border-border relative overflow-hidden z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            badge="Execution Pipeline"
            title="7-Step Agile Delivery Framework"
            subtitle="A transparent, scroll-synchronized delivery process turning operational goals into scalable enterprise software, mobile apps, and institutional platforms."
          />

          <ProcessPipeline />
        </div>
      </section>

      <ScrollTransition />

      {/* 10. Client Proof / Authentic Reviews */}
      <section id="reviews" className="py-24 bg-warm-white/70 dark:bg-charcoal/40 backdrop-blur-md border-b border-border relative overflow-hidden z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <SectionHeader
            badge="Client Trust"
            title="Trusted by Regional Leaders & Enterprises"
            subtitle="Authentic feedback from partners who transformed their operations with Royal Business Machine."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <SectionReveal delay={0.1} direction="up" className="h-full">
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
            </SectionReveal>

            <SectionReveal delay={0.2} direction="up" className="h-full">
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
            </SectionReveal>

            <SectionReveal delay={0.3} direction="up" className="h-full">
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
            </SectionReveal>
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

      {/* 11. Conversion CTA Banner (Phase 4: Technology Convergence) */}
      <div id="contact" className="relative z-10">
        <CtaBanner />
      </div>
    </div>
  );
}
