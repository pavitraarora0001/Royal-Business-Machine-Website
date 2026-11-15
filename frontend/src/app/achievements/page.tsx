import type { Metadata } from "next";
import Link from "next/link";
import { StatsSection } from "@/components/stats-section";
import { CtaBanner } from "@/components/cta-banner";
import { SectionHeader } from "@/components/section-header";
import {
  Trophy,
  Star,
  Target,
  Zap,
  Award,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "Achievements & Milestones of Success | Royal Business Machine",
  description:
    "Celebrating 50+ enterprise rollouts, ₹1.8 Cr revenue track record, 99% client satisfaction, regional institutional partnerships, and tech lab training for 5,000+ students.",
};

const achievements = [
  {
    title: "15+ Tech Startups Launched & Accelerated",
    category: "Venture Consulting",
    description:
      "Successfully conceptualized, engineered, and scaled over 15 startups with complete digital transformation, pitch deck design, and market rollout strategies.",
    icon: Zap,
    stat: "15+ Startups",
  },
  {
    title: "50+ Enterprise Deployments with 99% Satisfaction",
    category: "Software Engineering",
    description:
      "Maintained an exceptional 99% client satisfaction and retention rate across 50+ major custom enterprise software, mobile app, and portal deployments.",
    icon: Star,
    stat: "99% Retention",
  },
  {
    title: "Multi-Sector Dominance Across Emerging Markets",
    category: "Industry Footprint",
    description:
      "Expanded our core engineering to power high-concurrency systems across healthcare (HMS), dairy logistics (Dairy Muneem), agriculture (Jaivik Desh), and hospitality.",
    icon: Target,
    stat: "7 Sectors",
  },
  {
    title: "Government & Higher Education Institutional Execution",
    category: "Public Sector",
    description:
      "Executed secure, state-compliant institutional web portals for government colleges in Bharatpur and Karauli, handling over 100,000 concurrent page inquiries.",
    icon: Award,
    stat: "100k+ Inquiries",
  },
  {
    title: "5,000+ Students Impacted Through Smart Campus Labs",
    category: "Educational Infrastructure",
    description:
      "Installed cutting-edge computer laboratories, smart classrooms, and conducted practical coding bootcamps impacting over 5,000 students across the region.",
    icon: Trophy,
    stat: "5,000+ Students",
  },
  {
    title: "Proprietary AI E-Governance Architecture (NyayaSetu)",
    category: "Original IP",
    description:
      "Engineered an assistive AI and deterministic legal rule engine for citizen incident reporting and automated FIR drafting assistance for police departments.",
    icon: ShieldCheck,
    stat: "Patent Ready",
  },
];

export default function AchievementsPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* 1. Header */}
      <section className="py-20 lg:py-28 bg-white dark:bg-charcoal border-b border-border text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/25">
            <Trophy className="w-3.5 h-3.5" />
            <span>Proven Track Record</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-charcoal dark:text-warm-white font-heading">
            Milestones of <span className="gold-gradient-text">Success & Impact</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-muted dark:text-slate-light leading-relaxed max-w-3xl mx-auto font-normal">
            A consistent record of engineering excellence, institutional accountability, and measurable business growth across India&apos;s emerging markets.
          </p>
        </div>
      </section>

      {/* 2. Key Stats Counter */}
      <StatsSection />

      {/* 3. Achievements Grid */}
      <section className="py-24 bg-warm-white dark:bg-charcoal/50 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeader
            badge="Institutional Proof"
            title="Key Accomplishments & Distinctions"
            subtitle="How Royal Business Machine delivers tangible enterprise value across public and private sectors."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {achievements.map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-border hover:border-gold/50 shadow-sm transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gold/10 text-gold flex items-center justify-center">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
                      {item.stat}
                    </span>
                  </div>

                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-muted block mb-2">
                    {item.category}
                  </span>

                  <h3 className="text-xl font-bold text-charcoal dark:text-warm-white mb-3 font-heading">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-muted leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-border/60 flex items-center gap-2 text-xs text-charcoal dark:text-warm-white font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                  <span>Verified Operational Milestone</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-charcoal dark:bg-gold text-warm-white dark:text-charcoal font-bold text-xs uppercase tracking-wider hover:bg-gold transition-colors shadow-sm"
            >
              <span>Explore Verified Client Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. Conversion CTA */}
      <CtaBanner
        title="Ready to Build Your Next Milestone with Us?"
        subtitle="Partner with a proven execution leader. Connect with Founder & CEO Pavitra Arora for enterprise consultation."
      />
    </div>
  );
}
