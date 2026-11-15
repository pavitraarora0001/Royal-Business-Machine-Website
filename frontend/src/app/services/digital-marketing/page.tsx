import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/section-header";
import { CtaBanner } from "@/components/cta-banner";
import {
  TrendingUp,
  Search,
  Target,
  ArrowRight,
  Share2,
  DollarSign
} from "lucide-react";

export const metadata: Metadata = {
  title: "ROI-Focused Digital Marketing & SEO Services | Royal Business Machine",
  description:
    "Data-driven search engine optimization, Google Ads, Meta campaigns, and corporate brand positioning engineered to generate high-intent enterprise inquiries.",
};

const marketingPillars = [
  {
    title: "Search Engine Optimization (SEO)",
    desc: "Comprehensive on-page technical audits, semantic keyword mapping, high-authority backlink outreach, and Google Maps local SEO dominance.",
    icon: Search,
    metrics: "Top 3 Ranking Targets",
  },
  {
    title: "Google Ads (PPC) Performance",
    desc: "High-intent search campaigns, competitor keyword targeting, and negative keyword filtering engineered to minimize customer acquisition costs.",
    icon: DollarSign,
    metrics: "Sub-₹20 High-Intent CPCs",
  },
  {
    title: "Meta Ads & WhatsApp Funnels",
    desc: "Lookalike and demographic audience targeting driving qualified consumer and B2B leads directly into active WhatsApp conversations.",
    icon: Target,
    metrics: "Direct WhatsApp Inquiries",
  },
  {
    title: "Corporate Brand & PR Campaigns",
    desc: "Executive LinkedIn personal branding, high-visibility announcements, press release syndication, and visual storytelling.",
    icon: Share2,
    metrics: "Executive Authority",
  },
];

export default function DigitalMarketingPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* 1. Hero */}
      <section className="py-20 lg:py-28 bg-white dark:bg-charcoal border-b border-border text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/25">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Growth & Visibility Discipline</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-charcoal dark:text-warm-white font-heading">
            Performance Digital <span className="gold-gradient-text">Marketing & SEO</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-muted dark:text-slate-light leading-relaxed max-w-3xl mx-auto font-normal">
            Stop guessing and start measuring. We design and execute data-driven digital marketing campaigns and SEO architectures engineered to drive qualified enterprise inquiries and revenue.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/contact?service=Digital%20Marketing"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-charcoal dark:bg-gold text-warm-white dark:text-charcoal font-bold text-xs uppercase tracking-wider hover:bg-gold transition-colors shadow-sm"
            >
              <span>Request Free SEO & Ad Audit</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white font-semibold text-xs uppercase tracking-wider hover:border-gold transition-colors"
            >
              <span>Explore All Services</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Marketing Pillars */}
      <section className="py-24 bg-warm-white dark:bg-charcoal/50 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <SectionHeader
            badge="Performance Architecture"
            title="Engineered for Measurable Return on Investment"
            subtitle="Every rupee spent on paid media and SEO is mapped to tangible inquiries and customer acquisition metrics."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {marketingPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-border hover:border-gold/40 shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gold/10 text-gold flex items-center justify-center">
                      <pillar.icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
                      {pillar.metrics}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-charcoal dark:text-warm-white mb-2 font-heading">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-muted leading-relaxed mb-6 font-normal">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <Link
                    href={`/contact?service=${encodeURIComponent(pillar.title)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:text-gold-dark transition-colors"
                  >
                    <span>Get Custom Campaign Proposal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Conversion CTA */}
      <CtaBanner
        title="Ready to Scale Your Inquiries and Revenue?"
        subtitle="Schedule a 1-on-1 performance marketing consultation to review your current website metrics and growth funnel."
      />
    </div>
  );
}
