import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Timeline } from "@/components/about/timeline";
import { StatsSection } from "@/components/stats-section";
import { CtaBanner } from "@/components/cta-banner";
import { SectionHeader } from "@/components/section-header";
import {
  Target,
  Eye,
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  Layers,
  ArrowRight,
  Sparkles
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Company History, Mission & Leadership",
  description:
    "Learn about Royal Business Machine, founded by Pavitra Arora in Bharatpur, Rajasthan. Discover our mission, ₹1.8 Cr revenue track record, 50+ enterprise deployments, and timeline.",
};

export default function AboutPage() {
  const coreValues = [
    {
      title: "Uncompromising Quality",
      desc: "Clean, scalable, production-ready codebases and premium materials engineered for enterprise reliability.",
      icon: ShieldCheck,
    },
    {
      title: "Turnkey Integration",
      desc: "Single-point execution spanning digital cloud systems down to on-ground print marketing and computer labs.",
      icon: Layers,
    },
    {
      title: "Measurable Business ROI",
      desc: "Every software platform and campaign is engineered to directly accelerate revenue, reduce costs, or automate operations.",
      icon: Target,
    },
    {
      title: "Institutional Accountability",
      desc: "Strict adherence to government standards, DPDP data protection, statutory compliance, and milestone deadlines.",
      icon: Award,
    },
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* 1. Header / Hero */}
      <section className="py-20 lg:py-28 bg-white dark:bg-charcoal border-b border-border relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-4xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/25">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Corporate Background</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-charcoal dark:text-warm-white font-heading">
            About <span className="gold-gradient-text">Royal Business Machine</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-muted dark:text-slate-light leading-relaxed font-normal max-w-3xl mx-auto">
            A multi-service technology and business infrastructure platform delivering custom enterprise software, mobile apps, ERP systems, digital marketing, in-house printing, and institutional solutions.
          </p>
        </div>
      </section>

      {/* 2. Key Stats Counter */}
      <StatsSection />

      {/* 3. Founder & Leadership Spotlight */}
      <section className="py-24 bg-warm-white dark:bg-charcoal/50 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 h-88 sm:w-80 sm:h-96 rounded-3xl overflow-hidden border-2 border-gold/40 shadow-xl bg-charcoal p-8 flex flex-col justify-between text-warm-white">
                <div className="space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 border border-gold/30 flex items-center justify-center p-2">
                    <Image
                      src="/assets/logo/logo.png"
                      alt="RBM Emblem"
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <div className="text-xs font-bold tracking-widest uppercase text-gold">Executive Leadership</div>
                  <h3 className="text-2xl font-extrabold text-white font-heading">Pavitra Arora</h3>
                  <p className="text-xs text-slate-light">Founder & Chief Executive Officer</p>
                </div>

                <div className="pt-6 border-t border-white/10 space-y-2 text-xs text-slate-light">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <span>Scaled ₹1.8 Cr revenue base</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <span>Creator of NyayaSetu & Dairy Muneem</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <span>Bharatpur, Rajasthan HQ</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/25">
                <span>Founder Narrative</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal dark:text-warm-white font-heading leading-tight">
                Building India’s Integrated Infrastructure Partner
              </h2>

              <p className="text-sm sm:text-base text-slate-muted leading-relaxed font-normal">
                Founded by entrepreneur and technologist <strong>Pavitra Arora</strong>, ROYAL BUSINESS MACHINE was conceived to address a systemic problem: Tier-2 and Tier-3 enterprises, colleges, and local authorities were underserved by fragmented agencies that delivered piecemeal digital products without on-ground execution accountability.
              </p>

              <p className="text-sm sm:text-base text-slate-muted leading-relaxed font-normal">
                By integrating full-stack software development, cross-platform mobile apps, institutional government procurement, creative branding, and high-precision physical printing, RBM functions as a <strong>single execution partner</strong> across Rajasthan and nationwide markets.
              </p>

              <div className="pt-2">
                <Link
                  href="/team"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-charcoal dark:bg-gold text-warm-white dark:text-charcoal font-semibold text-xs uppercase tracking-wider hover:bg-gold transition-colors"
                >
                  <span>Meet Our Engineering & Strategy Team</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Vision & Mission Cards */}
      <section className="py-24 bg-white dark:bg-charcoal border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="p-8 sm:p-10 rounded-3xl bg-warm-white/70 dark:bg-graphite/40 border border-border space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gold/10 text-gold flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal dark:text-warm-white font-heading">
                Our Vision
              </h3>
              <p className="text-sm text-slate-muted leading-relaxed font-normal">
                To become a premier nationally recognized integrated technology and infrastructure partner for MSMEs, modern enterprises, and public sector institutions across emerging Indian markets, driving sustainable automation and digital transformation.
              </p>
            </div>

            <div className="p-8 sm:p-10 rounded-3xl bg-warm-white/70 dark:bg-graphite/40 border border-border space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gold/10 text-gold flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal dark:text-warm-white font-heading">
                Our Mission
              </h3>
              <p className="text-sm text-slate-muted leading-relaxed font-normal">
                To empower organizations with robust digital infrastructure, human-centered software architectures, and turnkey execution that minimizes operational friction, expands market reach, and maximizes measurable business ROI.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Core Operational Values */}
      <section className="py-24 bg-warm-white dark:bg-charcoal/50 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeader
            badge="Operating Principles"
            title="Our Guiding Values"
            subtitle="The core tenets that guide every architectural decision, client deployment, and institutional partnership."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {coreValues.map((val, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-white dark:bg-charcoal border border-border hover:border-gold/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-4">
                    <val.icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-charcoal dark:text-warm-white mb-2 font-heading">
                    {val.title}
                  </h4>
                  <p className="text-xs text-slate-muted leading-relaxed font-normal">
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Company History Timeline */}
      <section className="py-24 bg-white dark:bg-charcoal border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeader
            badge="Milestones"
            title="Our Journey (2019 – Present)"
            subtitle="Tracing the continuous growth of Royal Business Machine from regional inception to high-ticket statewide execution."
          />

          <div className="max-w-4xl mx-auto">
            <Timeline />
          </div>

        </div>
      </section>

      {/* 7. Institutional Registration & CTA */}
      <CtaBanner
        title="Ready to Partner with Royal Business Machine?"
        subtitle="Schedule a consultation with our executive strategy desk to discuss your software, branding, or institutional deployment requirements."
      />
    </div>
  );
}
