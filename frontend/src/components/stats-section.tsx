"use client";

import { motion } from "framer-motion";
import { TrendingUp, CheckCircle, Users, Award } from "lucide-react";
import { AnimatedCounter, TiltCard } from "@/components/motion";

const stats = [
  {
    label: "Track Record Revenue",
    value: "₹1.8 Cr+",
    subtext: "FY 2025 across regional contracts & enterprise solutions",
    icon: TrendingUp,
  },
  {
    label: "Enterprise Deployments",
    value: "50+",
    subtext: "Delivered across healthcare, education, dairy & govt",
    icon: CheckCircle,
  },
  {
    label: "Client Satisfaction",
    value: "99%",
    subtext: "Verified high retention rate across multi-year contracts",
    icon: Award,
  },
  {
    label: "Institutional Impact",
    value: "5,000+",
    subtext: "Students impacted via smart lab setups & tech bootcamps",
    icon: Users,
  },
];

export function StatsSection() {
  return (
    <section className="py-14 bg-white dark:bg-charcoal border-y border-border relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-24 left-1/4 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <TiltCard maxTilt={6}>
                <div className="relative p-6 rounded-2xl bg-warm-white/70 dark:bg-graphite/40 border border-border hover:border-gold/50 hover:shadow-xl transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl sm:text-4xl font-extrabold text-charcoal dark:text-warm-white font-heading group-hover:text-gold transition-colors">
                      <AnimatedCounter value={stat.value} />
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-gold/20 transition-all">
                      <stat.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-charcoal dark:text-warm-white mb-1 group-hover:text-gold transition-colors">
                    {stat.label}
                  </h4>
                  <p className="text-xs text-slate-muted leading-relaxed">
                    {stat.subtext}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
