"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import {
  Compass,
  FileCode,
  PenTool,
  Code2,
  TestTube2,
  Rocket,
  Headset,
  CheckCircle2,
} from "lucide-react";

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
    desc: "Designing cloud architecture, selecting databases, outlining API schemas, and establishing sprint milestones.",
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
    desc: "Writing clean, scalable code using Next.js, React, Node.js, and cloud backends with weekly sprint demonstrations.",
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

export function ProcessPipeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className="relative max-w-5xl mx-auto py-8">
      {/* Central Progress Line */}
      <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          style={{ scaleY: lineHeight, transformOrigin: "top" }}
          className="w-full h-full bg-gradient-to-b from-amber-600 via-amber-400 to-amber-200 shadow-[0_0_12px_rgba(198,168,105,0.8)]"
        />
      </div>

      <div className="space-y-12 md:space-y-16">
        {steps.map((step, idx) => {
          const isEven = idx % 2 === 0;
          const Icon = step.icon;

          return (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, delay: idx * 0.08 }}
              className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Content Card */}
              <div
                className={`w-full md:w-[44%] pl-16 md:pl-0 ${
                  isEven ? "md:text-left" : "md:text-right"
                }`}
              >
                <div className="p-6 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 hover:shadow-xl transition-all duration-300 group">
                  <div className={`flex items-center gap-2 mb-2 ${isEven ? "md:justify-start" : "md:justify-end"}`}>
                    <span className="font-mono text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      STEP {step.num}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 font-heading group-hover:text-amber-500 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {step.desc}
                  </p>

                  <div className={`flex flex-wrap gap-1.5 ${isEven ? "md:justify-start" : "md:justify-end"}`}>
                    {step.deliverables.map((item, dIdx) => (
                      <span
                        key={dIdx}
                        className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      >
                        <CheckCircle2 className="w-3 h-3 text-amber-500" />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Node Center Marker */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-900 border-2 border-amber-400 text-amber-400 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(198,168,105,0.4)] group-hover:scale-110 transition-transform">
                <Icon className="w-4 h-4" />
              </div>

              {/* Spacer on other side */}
              <div className="hidden md:block w-[44%]" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
