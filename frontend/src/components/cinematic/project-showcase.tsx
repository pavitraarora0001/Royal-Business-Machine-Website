"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";

interface ProjectShowcaseProps {
  title: string;
  category: string;
  client: string;
  contractValue?: string;
  description: string;
  technologies: string[];
  href: string;
  index: number;
}

export function ProjectShowcase({
  title,
  category,
  client,
  contractValue,
  description,
  technologies,
  href,
  index,
}: ProjectShowcaseProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 32 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.75, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] as const }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-full rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 p-7 flex flex-col justify-between transition-all duration-500 hover:border-amber-500/60 hover:shadow-[0_12px_40px_rgba(198,168,105,0.15)] overflow-hidden"
    >
      {/* Ambient background gold gradient shine */}
      <div
        className={`absolute -right-20 -top-20 w-44 h-44 rounded-full bg-amber-500/10 blur-3xl pointer-events-none transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative z-10">
        {/* Top Meta Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
            {category}
          </span>
          {contractValue && (
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-mono">
              {contractValue}
            </span>
          )}
        </div>

        {/* Project Title */}
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 font-heading group-hover:text-amber-500 transition-colors">
          {title}
        </h3>

        {/* Client Name */}
        <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mb-3 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Client: {client}</span>
        </p>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 font-normal">
          {description}
        </p>

        {/* Technology Chips */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {technologies.map((tech, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 transition-colors group-hover:border-amber-500/30"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="relative z-10 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-500 transition-colors group-hover:translate-x-1 transition-transform"
        >
          <span>Explore Verified Case Study</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}
