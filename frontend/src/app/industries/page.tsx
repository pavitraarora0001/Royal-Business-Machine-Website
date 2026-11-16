import type { Metadata } from "next";
import Link from "next/link";
import { ALL_INDUSTRIES, IndustrySolution } from "@/data/industries-data";
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
  Landmark,
  Briefcase,
  Rocket,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Layers,
  ShieldAlert,
  Lightbulb,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Industries We Empower (11 Specialized Sectors) | Royal Business Machine",
  description:
    "Tailored digital infrastructure, custom ERPs, mobile apps, and automation for Education, Healthcare, Hospitality, Manufacturing, Retail, Real Estate, Logistics, Agriculture, Legal, Startups, and Government.",
  keywords: [
    "industry digital solutions",
    "education erp rajasthan",
    "hospital management software",
    "dairy procurement app",
    "ecommerce development bharatpur",
    "government institutional portals",
    "royal business machine industries",
  ],
  openGraph: {
    title: "Industries We Empower (11 Specialized Sectors) | Royal Business Machine",
    description:
      "Enterprise technology, vertical ERPs, and automation tailored to the real operational needs of 11 economic sectors.",
    url: "https://royalbusinessmachine.com/industries",
  },
};

const iconMap: Record<string, React.ElementType> = {
  GraduationCap,
  Activity,
  Utensils,
  Factory,
  ShoppingBag,
  Home,
  Truck,
  Sprout,
  Briefcase,
  Rocket,
  Landmark,
};

export default function IndustriesPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden bg-slate-50 dark:bg-charcoal-dark min-h-screen">
      {/* 1. Header */}
      <section className="py-20 lg:py-28 bg-white dark:bg-charcoal border-b border-border text-center relative overflow-hidden">
        {/* Subtle gold ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-36 bg-gold/5 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-6 relative z-10">
          <RevealOnScroll direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/25">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Specialized Vertical Engineering</span>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-navy dark:text-white">
              Industries <span className="text-gold">We Empower</span>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.2}>
            <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal">
              Custom software architectures, vertical SaaS platforms, and on-ground deployment calibrated to the operational and compliance realities of 11 critical economic sectors.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* 2. Industries Grid */}
      <section className="py-20 lg:py-28 bg-slate-50 dark:bg-[#0B1120] border-b border-border relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ALL_INDUSTRIES.map((ind: IndustrySolution, idx: number) => {
              const IconComp = iconMap[ind.iconName] || Layers;

              return (
                <RevealOnScroll key={ind.id} delay={idx * 0.05} direction="up" className="h-full">
                  <TiltCard maxTilt={4} className="h-full">
                    <div className="h-full p-8 rounded-3xl bg-white dark:bg-charcoal border border-border hover:border-gold/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                      <div className="space-y-5">
                        <div className="flex items-center justify-between">
                          <div className="w-12 h-12 rounded-2xl bg-gold/10 text-gold flex items-center justify-center group-hover:bg-gold group-hover:text-navy group-hover:scale-105 transition-all duration-300">
                            <IconComp className="w-6 h-6" />
                          </div>
                          <span className="text-[11px] font-mono text-slate-400">
                            Sector 0{idx + 1}
                          </span>
                        </div>

                        <div>
                          <h2 className="text-2xl font-bold font-serif text-navy dark:text-white group-hover:text-gold transition-colors">
                            {ind.name}
                          </h2>
                          <p className="text-xs text-gold font-medium mt-1">
                            {ind.tagline}
                          </p>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                          {ind.description}
                        </p>

                        {/* Sector Challenges & Solutions Preview */}
                        <div className="space-y-3 pt-3 border-t border-border">
                          <div>
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-red-600 dark:text-red-400 mb-1.5">
                              <ShieldAlert className="w-3.5 h-3.5" />
                              <span>Common Industry Hurdle</span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                              &ldquo;{ind.challenges[0]}&rdquo;
                            </p>
                          </div>

                          <div>
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mb-1.5">
                              <Lightbulb className="w-3.5 h-3.5" />
                              <span>RBM Engineered Solution</span>
                            </div>
                            <p className="text-xs text-slate-700 dark:text-slate-200">
                              {ind.solutions[0]}
                            </p>
                          </div>
                        </div>

                        {/* Core Deliverables */}
                        <div className="space-y-2 pt-3 border-t border-border">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Key Deliverables
                          </div>
                          <ul className="space-y-1.5">
                            {ind.deliverables.map((item, dIdx) => (
                              <li key={dIdx} className="text-xs text-slate-700 dark:text-slate-200 flex items-center gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Bottom Links */}
                      <div className="pt-6 mt-6 border-t border-border space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          {ind.caseStudySlugs.length > 0 ? (
                            <Link
                              href={`/portfolio/${ind.caseStudySlugs[0]}`}
                              className="text-xs font-semibold text-gold hover:text-gold-light inline-flex items-center gap-1 group/cs"
                            >
                              <span>View Case Study</span>
                              <ExternalLink className="w-3 h-3 group-hover/cs:translate-x-0.5 transition-transform" />
                            </Link>
                          ) : (
                            <Link
                              href="/portfolio"
                              className="text-xs font-semibold text-slate-400 hover:text-gold inline-flex items-center gap-1"
                            >
                              <span>Explore Portfolio</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          )}

                          <Link
                            href={`/contact?industry=${encodeURIComponent(ind.name)}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-navy dark:text-white hover:text-gold transition-colors"
                          >
                            <span>Consultation</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Cross-Industry Proprietary Platforms Link */}
      <section className="py-16 bg-navy text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl space-y-6">
          <span className="text-xs uppercase font-bold tracking-widest text-gold">
            TURNKEY PLATFORMS READY FOR DEPLOYMENT
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold">
            Accelerate Deployment With Our Pre-Engineered Suites
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            From rural milk procurement terminal systems to hospital clinical EHRs, explore our 12 proprietary software suites ready for rapid institutional customization.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="px-6 py-3 rounded-xl bg-gold hover:bg-gold-light text-navy font-bold text-xs sm:text-sm transition-all shadow-lg inline-flex items-center gap-2"
            >
              <span>Explore 12 Software Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/services"
              className="px-6 py-3 rounded-xl bg-charcoal-light hover:bg-charcoal text-white font-semibold text-xs sm:text-sm transition-all border border-slate-700 inline-flex items-center gap-2"
            >
              <span>Browse 12 Service Divisions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Conversion CTA */}
      <CtaBanner
        title="Need a Custom Architecture for Your Industry?"
        subtitle="Our engineering leadership designs tailored technical frameworks combining physical hardware, high-availability web services, and automated workflow software."
      />
    </div>
  );
}
