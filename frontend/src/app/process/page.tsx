import type { Metadata } from "next";
import Link from "next/link";
import { CtaBanner } from "@/components/cta-banner";
import { RevealOnScroll, TiltCard } from "@/components/motion";
import {
  Compass,
  FileCode,
  PenTool,
  Code2,
  TestTube2,
  Rocket,
  Headset,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "7-Step Agile Delivery Framework | Royal Business Machine",
  description:
    "A transparent, predictable 7-step delivery process turning complex operational requirements into scalable enterprise software, mobile apps, and institutional platforms.",
};

const steps = [
  {
    num: "01",
    title: "Discovery & Requirements Audit",
    desc: "We begin with deep stakeholder interviews, mapping operational workflows, identifying bottlenecks, and defining measurable KPIs.",
    deliverables: ["Requirements Specification Document", "Process Flowchart", "Success Metrics Matrix"],
    icon: Compass,
  },
  {
    num: "02",
    title: "Strategic Architecture & Blueprint",
    desc: "Designing the cloud architecture, selecting databases, outlining API schemas, and establishing realistic sprint milestones.",
    deliverables: ["System Architecture Blueprint", "Database Entity Schema", "Milestone Delivery Roadmap"],
    icon: FileCode,
  },
  {
    num: "03",
    title: "UI/UX Ergonomics & Design Systems",
    desc: "Crafting intuitive user interfaces, clickable Figma prototypes, luxury design tokens, and human-factors engineering.",
    deliverables: ["Interactive Clickable Prototype", "Component Design Library", "Stakeholder Sign-Off"],
    icon: PenTool,
  },
  {
    num: "04",
    title: "Agile Full-Stack Engineering",
    desc: "Writing clean, scalable, maintainable code using Next.js, React, Node.js, and cloud backends with weekly sprint demonstrations.",
    deliverables: ["Bi-Weekly Sprint Demos", "Staging Environment Previews", "Git Version Controlled Codebase"],
    icon: Code2,
  },
  {
    num: "05",
    title: "Rigorous QA & Security Testing",
    desc: "Automated test suites, manual user acceptance testing (UAT), penetration tests, mobile touch audits, and load stress testing.",
    deliverables: ["UAT Sign-Off Document", "Security Vulnerability Report", "Cross-Browser/Device Audit"],
    icon: TestTube2,
  },
  {
    num: "06",
    title: "Seamless Production Deployment",
    desc: "Zero-downtime production rollouts to AWS, GCP, or on-premise institutional servers with automated SSL and DNS routing.",
    deliverables: ["Live Production Launch", "Automated Backup Schedulers", "Admin Training Session"],
    icon: Rocket,
  },
  {
    num: "07",
    title: "Ongoing Support & SLA Maintenance",
    desc: "Continuous server monitoring, performance tuning, monthly security patches, and dedicated WhatsApp/Email support desks.",
    deliverables: ["Guaranteed Response SLA", "Monthly Performance Reports", "Priority Bug Fix Channels"],
    icon: Headset,
  },
];

export default function ProcessPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* 1. Header */}
      <section className="py-20 lg:py-28 bg-white dark:bg-charcoal border-b border-border text-center relative overflow-hidden">
        {/* Subtle gold ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gold/5 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-6 relative z-10">
          <RevealOnScroll direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/25">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Execution Methodology</span>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.1}>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-charcoal dark:text-warm-white font-heading">
              Our 7-Step <span className="gold-gradient-text">Delivery Process</span>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.2}>
            <p className="text-base sm:text-xl text-slate-muted dark:text-slate-light leading-relaxed max-w-3xl mx-auto font-normal">
              A proven, transparent, and agile delivery framework engineered to turn complex enterprise ideas into high-impact, reliable software on time and within budget.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* 2. Process Steps Timeline */}
      <section className="py-24 bg-warm-white dark:bg-charcoal/50 border-b border-border relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
          
          <div className="space-y-12">
            {steps.map((step, idx) => (
              <RevealOnScroll key={idx} delay={idx * 0.08} direction="up">
                <TiltCard maxTilt={3}>
                  <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-charcoal border border-border hover:border-gold/60 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row md:items-start gap-8 group">
                    <div className="flex md:flex-col items-center justify-between md:justify-start gap-3 shrink-0">
                      <div className="w-16 h-16 rounded-2xl bg-gold/10 text-gold flex items-center justify-center font-mono font-extrabold text-2xl border border-gold/30 group-hover:scale-110 group-hover:bg-gold group-hover:text-charcoal transition-all duration-300">
                        {step.num}
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-warm-white dark:bg-graphite text-slate-muted flex items-center justify-center group-hover:border-gold/30 transition-colors">
                        <step.icon className="w-5 h-5 text-gold group-hover:scale-110 transition-transform" />
                      </div>
                    </div>

                    <div className="flex-grow space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-2xl font-bold text-charcoal dark:text-warm-white font-heading group-hover:text-gold transition-colors">
                          {step.title}
                        </h3>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gold bg-gold/10 px-2.5 py-1 rounded-full border border-gold/20">
                          Phase {step.num}
                        </span>
                      </div>

                      <p className="text-sm text-slate-muted leading-relaxed font-normal">
                        {step.desc}
                      </p>

                      <div className="pt-4 border-t border-border/60">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-muted mb-2">Phase Deliverables</div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {step.deliverables.map((item, dIdx) => (
                            <div key={dIdx} className="p-2.5 rounded-xl bg-warm-white dark:bg-graphite text-xs text-charcoal dark:text-warm-white flex items-center gap-2 group/deliv">
                              <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0 group-hover/deliv:scale-110 transition-transform" />
                              <span className="truncate">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </RevealOnScroll>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-charcoal dark:bg-gold text-warm-white dark:text-charcoal font-bold text-xs uppercase tracking-wider hover:bg-gold dark:hover:bg-warm-white transition-all shadow-md group"
            >
              <span>Initiate Discovery Phase for Your Project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      {/* 3. Conversion CTA */}
      <CtaBanner
        title="Experience Predictable, Transparent Delivery"
        subtitle="Schedule a consultation with our project architecture desk to discuss your milestone timeline."
      />
    </div>
  );
}
