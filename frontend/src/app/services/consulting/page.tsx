import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/section-header";
import { CtaBanner } from "@/components/cta-banner";
import {
  Lightbulb,
  Rocket,
  DollarSign,
  ShieldCheck,
  ArrowRight,
  Download,
  Presentation
} from "lucide-react";

export const metadata: Metadata = {
  title: "Startup Advisory & Pitch Deck Design | Royal Business Machine",
  description:
    "Turnkey startup growth launchpacks, investor pitch decks, financial models, statutory business registration, and rapid MVP engineering sprints.",
};

const advisoryOfferings = [
  {
    title: "Investor-Grade Pitch Deck Creation",
    desc: "Slide-by-slide decks built according to top venture capital standards, focusing on market problem, unique moat, unit economics, and 3-5 year financial forecasts.",
    icon: Presentation,
  },
  {
    title: "Financial Modeling & Unit Economics",
    desc: "Detailed spreadsheets forecasting burn rate, customer acquisition cost (CAC), lifetime value (LTV), and valuation scenarios for early-stage and growth rounds.",
    icon: DollarSign,
  },
  {
    title: "MSME, GST & Corporate Registration",
    desc: "Navigating legal formalities: Udyam MSME certification, GST registration, trademark filing, and banking merchant account integrations.",
    icon: ShieldCheck,
  },
  {
    title: "MVP (Minimum Viable Product) Sprints",
    desc: "Rapid 4-to-8 week prototyping turning concepts into live, tested web and mobile prototypes equipped with analytics and payment processing.",
    icon: Rocket,
  },
];

export default function ConsultingPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* 1. Hero */}
      <section className="py-20 lg:py-28 bg-white dark:bg-charcoal border-b border-border text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/25">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Venture Incubation Discipline</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-charcoal dark:text-warm-white font-heading">
            Startup Advisory & <span className="gold-gradient-text">Venture Consulting</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-muted dark:text-slate-light leading-relaxed max-w-3xl mx-auto font-normal">
            We partner with ambitious founders to validate business models, design compelling investor pitch decks, structure financial projections, and build market-ready MVPs.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/contact?service=Startup%20Consulting"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-charcoal dark:bg-gold text-warm-white dark:text-charcoal font-bold text-xs uppercase tracking-wider hover:bg-gold transition-colors shadow-sm"
            >
              <span>Book Founder Advisory Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="/assets/documents/Business_Growth_Launch_Pack.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white font-semibold text-xs uppercase tracking-wider hover:border-gold transition-colors"
            >
              <Download className="w-4 h-4 text-gold" />
              <span>Download Launch Pack (PDF)</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Advisory Offerings Grid */}
      <section className="py-24 bg-warm-white dark:bg-charcoal/50 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <SectionHeader
            badge="Strategic Architecture"
            title="Comprehensive Venture Acceleration"
            subtitle="Everything required to take your startup from napkin sketch to institutional investor scrutiny."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advisoryOfferings.map((off, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-border hover:border-gold/40 shadow-sm transition-all flex items-start gap-5"
              >
                <div className="w-12 h-12 rounded-2xl bg-gold/10 text-gold flex items-center justify-center shrink-0">
                  <off.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal dark:text-warm-white mb-2 font-heading">
                    {off.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-muted leading-relaxed font-normal">
                    {off.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Conversion CTA */}
      <CtaBanner
        title="Ready to Scale Your Startup Vision?"
        subtitle="Schedule a strategic consultation with Founder & CEO Pavitra Arora to review your pitch deck, unit economics, or MVP roadmap."
      />
    </div>
  );
}
