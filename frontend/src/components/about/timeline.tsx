"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Calendar } from "lucide-react";
import { TiltCard } from "@/components/motion";

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 80%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const milestones = [
    {
      year: "2019",
      title: "Company Founded in Bharatpur",
      description:
        "ROYAL BUSINESS MACHINE was founded by Pavitra Arora in Bharatpur, Rajasthan, with a mission to bring state-of-the-art IT solutions, automation, and computer infrastructure to regional businesses.",
    },
    {
      year: "2020",
      title: "Multi-Service & Digital Marketing Expansion",
      description:
        "Expanded into full-scale digital marketing, SEO, and in-house physical printing services, becoming a comprehensive single-point execution partner for enterprises.",
    },
    {
      year: "2021",
      title: "National Reach & High-Ticket Enterprise ERPs",
      description:
        "Started serving clients nationwide and delivering large-scale enterprise CRM/ERP systems, including multi-specialty hospital management platforms (HMS) and e-commerce stores.",
    },
    {
      year: "2022",
      title: "Startup Advisory & Smart Campus Labs",
      description:
        "Launched the dedicated Startup Growth Launchpack division, investor pitch deck design, and installed modern computer laboratories and smart classrooms across regional colleges.",
    },
    {
      year: "2023",
      title: "Advanced Technology & AI E-Governance",
      description:
        "Architected proprietary platforms including NyayaSetu (AI-driven legal awareness & police assistance) and high-security examination watermarking systems for state tests.",
    },
    {
      year: "2025–Present",
      title: "Scaled Platform & Statewide Dominance",
      description:
        "Achieved a ₹1.8 Crore proven revenue base, 50+ enterprise deployments, and continuing expansion across Rajasthan and nationwide institutional markets.",
    },
  ];

  return (
    <div ref={containerRef} className="relative py-12">
      {/* Background static guide line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />

      {/* Animated glowing gold drawing line */}
      {!shouldReduceMotion && (
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-4 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-gold via-gold-light to-gold md:-translate-x-1/2 shadow-[0_0_12px_rgba(198,168,105,0.6)] z-0"
        />
      )}

      <div className="space-y-12 relative z-10">
        {milestones.map((milestone, index) => (
          <motion.div
            key={index}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: index * 0.08 }}
            className={`flex flex-col md:flex-row relative items-start md:items-center ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Timeline node with gold pulse */}
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-charcoal border-2 border-gold flex items-center justify-center z-10 shadow-md">
              <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
            </div>

            <div className="md:w-1/2 pl-12 md:pl-0 md:px-12 w-full">
              <TiltCard maxTilt={4}>
                <div
                  className={`p-7 rounded-2xl bg-white dark:bg-charcoal border border-border hover:border-gold/60 shadow-sm hover:shadow-xl transition-all duration-300 ${
                    index % 2 === 0 ? "md:text-left" : "md:text-right"
                  }`}
                >
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gold/10 text-gold mb-3 ${
                      index % 2 === 0 ? "" : "md:ml-auto"
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{milestone.year}</span>
                  </div>
                  <h3 className="text-xl font-bold text-charcoal dark:text-warm-white mb-2 font-heading">
                    {milestone.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-muted leading-relaxed font-normal">
                    {milestone.description}
                  </p>
                </div>
              </TiltCard>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
