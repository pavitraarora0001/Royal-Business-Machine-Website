import type { Metadata } from "next";
import { CtaBanner } from "@/components/cta-banner";
import {
  BookOpen,
  User,
  ArrowRight,
  Clock
} from "lucide-react";

export const metadata: Metadata = {
  title: "Technology Insights & Industry Articles | Royal Business Machine",
  description:
    "In-depth articles on 2026 enterprise tech trends, scalable SaaS architectures, data-driven digital marketing, startup pitch decks, and AI automation workflows.",
};

const articles = [
  {
    slug: "10-technology-trends-shaping-2026",
    title: "10 Technology Trends Shaping 2026",
    category: "Technology Trends",
    excerpt: "Explore the emerging technologies from AI advancements to distributed edge computing that are redefining business operations across Tier-2 and Tier-3 Indian hubs.",
    date: "Mar 15, 2026",
    readTime: "6 min read",
    author: "Pavitra Arora",
  },
  {
    slug: "scalable-saas-architecture",
    title: "How to Build a Scalable Multi-Tenant SaaS Architecture",
    category: "Software Engineering",
    excerpt: "A comprehensive architectural guide on multi-tenant database isolation, serverless Next.js edge deployments, and high-concurrency billing optimizations.",
    date: "Mar 10, 2026",
    readTime: "8 min read",
    author: "Core Engineering Team",
  },
  {
    slug: "maximizing-roi-digital-marketing",
    title: "Maximizing ROI with Data-Driven Digital Marketing",
    category: "Digital Marketing",
    excerpt: "Stop guessing and start measuring. Learn how precision search intent, Meta lookalikes, and direct WhatsApp funnels can drive measurable B2B enterprise leads.",
    date: "Mar 05, 2026",
    readTime: "5 min read",
    author: "Elena Rodriguez",
  },
  {
    slug: "ultimate-startup-pitch-deck-guide",
    title: "The Ultimate Startup Pitch Deck Guide for Indian Founders",
    category: "Startup Advice",
    excerpt: "The exact 15-slide formula used by top venture-backed startups to secure seed and growth capital, highlighting unit economics and defensible regional moats.",
    date: "Feb 28, 2026",
    readTime: "7 min read",
    author: "Pavitra Arora",
  },
  {
    slug: "ai-automation-repetitive-workflows",
    title: "AI & Automation: Replacing Repetitive Manual Workflows",
    category: "AI & Automation",
    excerpt: "How intelligent rule engines, OCR document processing, and automated ledger triggers can save your enterprise thousands of operational hours annually.",
    date: "Feb 20, 2026",
    readTime: "5 min read",
    author: "Sarah Chen",
  },
  {
    slug: "importance-of-unified-brand-identity",
    title: "The Strategic Importance of a Unified Brand Identity",
    category: "Brand Strategy",
    excerpt: "Why your corporate web portal, physical metallic visiting cards, packaging boxes, and social voice need to speak the exact same visual language.",
    date: "Feb 12, 2026",
    readTime: "4 min read",
    author: "Marcus Johnson",
  },
];

export default function BlogPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* 1. Header */}
      <section className="py-20 lg:py-28 bg-white dark:bg-charcoal border-b border-border text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/25">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Thought Leadership & Research</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-charcoal dark:text-warm-white font-heading">
            Insights, Analysis & <span className="gold-gradient-text">News</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-muted dark:text-slate-light leading-relaxed max-w-3xl mx-auto font-normal">
            Strategic perspectives on software engineering, venture acceleration, performance marketing, and enterprise infrastructure from Royal Business Machine.
          </p>
        </div>
      </section>

      {/* 2. Articles Grid */}
      <section className="py-24 bg-warm-white dark:bg-charcoal/50 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((art, idx) => (
              <article
                key={idx}
                className="rounded-3xl bg-white dark:bg-charcoal border border-border hover:border-gold/50 shadow-sm transition-all duration-300 p-8 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
                      {art.category}
                    </span>
                    <span className="text-xs text-slate-muted flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{art.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-charcoal dark:text-warm-white mb-3 font-heading group-hover:text-gold transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-muted leading-relaxed mb-6 font-normal">
                    {art.excerpt}
                  </p>
                </div>

                <div className="border-t border-border/80 pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-muted">
                    <User className="w-3.5 h-3.5 text-gold" />
                    <span>{art.author}</span>
                    <span>•</span>
                    <span>{art.date}</span>
                  </div>
                  <span className="text-xs font-bold text-gold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Conversion CTA */}
      <CtaBanner
        title="Looking for Tailored Strategic Advice for Your Venture?"
        subtitle="Schedule a consultation with Founder & CEO Pavitra Arora and our enterprise consulting team."
      />
    </div>
  );
}
