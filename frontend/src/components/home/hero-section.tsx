"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  ChevronRight,
  TrendingUp,
  Layers,
  CheckCircle2,
  Cpu,
  Smartphone,
  Lock,
} from "lucide-react";
import {
  FloatingParticles,
  InteractiveTechCanvas,
  TiltCard,
  MagneticButton,
  AnimatedCounter,
  EASING,
} from "@/components/motion";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        ease: EASING.luxury,
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-[#F7F7F5] dark:bg-[#181C21] pt-6 sm:pt-10 pb-16 lg:pb-24 border-b border-border">
      {/* Background Architectural Grid, Floating Gold Particles & Ambient Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle geometric hairline pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(#20252B 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
        {/* Floating Gold Particles Canvas */}
        <FloatingParticles particleCount={32} color="182, 154, 105" />

        {/* Soft champagne ambient accent in upper right */}
        <div className="absolute -top-24 right-0 w-[550px] h-[550px] bg-[#B69A69]/10 rounded-full blur-[140px] pointer-events-none animate-pulse duration-[8000ms]" />
        {/* Soft slate ambient accent in bottom left */}
        <div className="absolute -bottom-24 left-0 w-[500px] h-[500px] bg-[#64748B]/5 rounded-full blur-[140px] pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Hero Column: Heading, Description, CTAs & Trust Row */}
          <motion.div
            variants={containerVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            className="lg:col-span-7 space-y-7 sm:space-y-8 text-left"
          >
            {/* 1. Institutional Trust Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-white dark:bg-[#20252B] border border-[#B69A69]/40 shadow-sm text-[#20252B] dark:text-[#F7F7F5] hover:border-[#B69A69] transition-colors">
                <ShieldCheck className="w-4 h-4 text-[#B69A69] shrink-0" />
                <span>Integrated Technology Platform</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#B69A69] animate-ping" />
                <span className="text-[#876A3B] dark:text-[#C9B288] font-bold">Udyam MSME Registered</span>
              </div>
            </motion.div>

            {/* 2. Main Hero Headline with High Contrast Typography */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.15rem] font-extrabold tracking-tight leading-[1.08] font-heading"
            >
              <span className="block text-[#181C21] dark:text-[#F7F7F5]">
                Transforming Businesses Through
              </span>
              <span className="block mt-2 font-extrabold bg-gradient-to-r from-[#876A3B] via-[#B69A69] to-[#997B4D] dark:from-[#E2D2B5] dark:via-[#C9B288] dark:to-[#B69A69] bg-clip-text text-transparent">
                Technology & Innovation
              </span>
            </motion.h1>

            {/* 3. Original Value Proposition (100% Unchanged) */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl text-[#475569] dark:text-[#94A3B8] leading-relaxed font-normal max-w-2xl"
            >
              ROYAL BUSINESS MACHINE provides custom enterprise software development, mobile apps, digital marketing, in-house printing, institutional tender execution, and startup growth support across emerging Indian markets.
            </motion.p>

            {/* 4. Interactive CTAs (Original Text Preserved) */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1"
            >
              <MagneticButton strength={12}>
                <Link
                  href="/services"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#20252B] hover:bg-[#876A3B] text-white dark:bg-[#B69A69] dark:text-[#181C21] dark:hover:bg-[#F7F7F5] font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md group"
                >
                  <span>Explore All 8 Services</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>
              </MagneticButton>

              <MagneticButton strength={8}>
                <Link
                  href="/projects"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-[#303640] text-[#20252B] dark:text-[#F7F7F5] border border-border hover:border-[#B69A69] font-bold text-xs sm:text-sm transition-all shadow-sm group"
                >
                  <span>View Case Studies (50+)</span>
                  <ChevronRight className="w-4 h-4 text-[#B69A69] group-hover:translate-x-1 transition-transform" />
                </Link>
              </MagneticButton>

              <a
                href="https://wa.me/919057287689"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-slate-muted hover:text-[#20252B] dark:hover:text-white font-semibold text-xs sm:text-sm transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Direct</span>
              </a>
            </motion.div>

            {/* 5. Information / Trust Row with Restored Original Labels & Distinct Icons */}
            <motion.div
              variants={itemVariants}
              className="pt-6 border-t border-border/80 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              <div className="flex items-start gap-2.5 group">
                <div className="w-8 h-8 rounded-lg bg-[#B69A69]/10 text-[#876A3B] dark:text-[#C9B288] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#B69A69]/20 transition-colors">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-charcoal dark:text-warm-white">
                    <AnimatedCounter value="₹1.8 Cr+" />
                  </div>
                  <div className="text-[11px] text-slate-muted">Proven Revenue</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 group">
                <div className="w-8 h-8 rounded-lg bg-[#B69A69]/10 text-[#876A3B] dark:text-[#C9B288] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#B69A69]/20 transition-colors">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-charcoal dark:text-warm-white">
                    <AnimatedCounter value="50+" />
                  </div>
                  <div className="text-[11px] text-slate-muted">Enterprise & Govt</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 group">
                <div className="w-8 h-8 rounded-lg bg-[#B69A69]/10 text-[#876A3B] dark:text-[#C9B288] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#B69A69]/20 transition-colors">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-charcoal dark:text-warm-white">
                    <AnimatedCounter value="99%" />
                  </div>
                  <div className="text-[11px] text-slate-muted">Client Retention</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 group">
                <div className="w-8 h-8 rounded-lg bg-[#B69A69]/10 text-[#876A3B] dark:text-[#C9B288] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#B69A69]/20 transition-colors">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-charcoal dark:text-warm-white">Udyam MSME</div>
                  <div className="text-[11px] text-slate-muted">Govt Partner</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Hero Column: Sophisticated Enterprise Architecture Showcase Card */}
          <div className="lg:col-span-5 w-full">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Subtle Illumination Glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#B69A69]/20 to-[#20252B]/10 blur-xl opacity-70" />

              {/* Main Enterprise Showcase Container with 3D Tilt */}
              <TiltCard maxTilt={5}>
                <div className="relative p-6 sm:p-7 rounded-3xl bg-white/90 dark:bg-[#20252B]/90 backdrop-blur-md border border-[#B69A69]/30 shadow-2xl space-y-5">
                  
                  {/* Interactive 3D Technology Composition Header */}
                  <div className="relative rounded-2xl overflow-hidden border border-gold/20 bg-gradient-to-b from-[#181C21] to-[#20252B] p-2 flex flex-col items-center">
                    <div className="w-full flex items-center justify-between px-3 py-1.5 border-b border-white/10 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-semibold text-slate-light text-[11px] uppercase tracking-wider">
                          Infrastructure Topology
                        </span>
                      </div>
                      <span className="text-[10px] text-gold font-bold uppercase tracking-widest">
                        Interactive 3D
                      </span>
                    </div>
                    <InteractiveTechCanvas className="h-[180px] sm:h-[200px]" />
                  </div>

                  {/* Showcase Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-border/80">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full bg-[#22C55E] animate-pulse" />
                      <span className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-warm-white">
                        RBM Enterprise Solutions
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/20">
                      Live Platform
                    </span>
                  </div>

                  {/* Flagship Product 1: NyayaSetu AI */}
                  <Link
                    href="/projects"
                    className="block p-3.5 rounded-2xl bg-warm-white/70 dark:bg-graphite/40 border border-border/80 hover:border-gold/40 hover:bg-gold/5 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gold/10 text-gold flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <Cpu className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-bold text-charcoal dark:text-warm-white group-hover:text-gold transition-colors">
                          NyayaSetu AI E-Governance
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md">
                        Active
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-muted leading-relaxed pl-9">
                      Institutional AI legal compliance & automated public sector grievance routing.
                    </p>
                  </Link>

                  {/* Flagship Product 2: Dairy Muneem */}
                  <Link
                    href="/projects"
                    className="block p-3.5 rounded-2xl bg-warm-white/70 dark:bg-graphite/40 border border-border/80 hover:border-gold/40 hover:bg-gold/5 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gold/10 text-gold flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <Smartphone className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-bold text-charcoal dark:text-warm-white group-hover:text-gold transition-colors">
                          Dairy Muneem Mobile App
                        </span>
                      </div>
                      <span className="text-[10px] text-gold font-bold bg-gold/10 px-2 py-0.5 rounded-md">
                        ₹2.5L Contract
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-muted leading-relaxed pl-9">
                      Automated milk fat/SNF computational pricing & offline farmer logistics engine.
                    </p>
                  </Link>

                  {/* Flagship Product 3: Anti-Paper Leak Examination Platform */}
                  <Link
                    href="/projects"
                    className="block p-3.5 rounded-2xl bg-warm-white/70 dark:bg-graphite/40 border border-border/80 hover:border-gold/40 hover:bg-gold/5 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gold/10 text-gold flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <Lock className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-bold text-charcoal dark:text-warm-white group-hover:text-gold transition-colors">
                          Anti-Paper Leak Platform
                        </span>
                      </div>
                      <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded-md">
                        Institutional
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-muted leading-relaxed pl-9">
                      High-security encrypted assessment delivery engineered for universities and boards.
                    </p>
                  </Link>

                  {/* Showcase Footer Metrics with Animated Counters */}
                  <div className="pt-3 border-t border-border/80 grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded-xl bg-warm-white/50 dark:bg-graphite/30 hover:bg-gold/10 transition-colors">
                      <div className="text-xs font-extrabold text-charcoal dark:text-warm-white">
                        <AnimatedCounter value="₹1.8 Cr" />
                      </div>
                      <div className="text-[9px] text-slate-muted font-medium">Annual Revenue</div>
                    </div>
                    <div className="p-2 rounded-xl bg-warm-white/50 dark:bg-graphite/30 hover:bg-gold/10 transition-colors">
                      <div className="text-xs font-extrabold text-charcoal dark:text-warm-white">
                        <AnimatedCounter value="50+" />
                      </div>
                      <div className="text-[9px] text-slate-muted font-medium">Deployments</div>
                    </div>
                    <div className="p-2 rounded-xl bg-warm-white/50 dark:bg-graphite/30 hover:bg-gold/10 transition-colors">
                      <div className="text-xs font-extrabold text-charcoal dark:text-warm-white">
                        <AnimatedCounter value="99%" />
                      </div>
                      <div className="text-[9px] text-slate-muted font-medium">SLA Rating</div>
                    </div>
                  </div>

                </div>
              </TiltCard>

            </div>
          </div>

        </div>

        {/* Cinematic Scroll Indicator Prompt */}
        <div className="hidden sm:flex flex-col items-center justify-center pt-8 pb-1 text-center pointer-events-none select-none">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
            Scroll to explore technology core
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-4 h-7 rounded-full border border-[#B69A69]/50 flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 rounded-full bg-[#B69A69]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
