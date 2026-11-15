"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, MessageSquare, Phone, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-background pt-8 pb-16">
      {/* Background Subtle Gradient Accents */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-1/6 left-1/4 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-slate-muted/10 rounded-full blur-[140px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Institutional Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-white dark:bg-charcoal border border-gold/30 shadow-sm"
          >
            <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
            <span className="text-charcoal dark:text-warm-white">
              Integrated Technology & Business Infrastructure Platform
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-gold font-semibold">Udyam Registered MSME</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-charcoal dark:text-warm-white leading-[1.1] font-heading"
          >
            Transforming Businesses Through{" "}
            <span className="gold-gradient-text block sm:inline">
              Technology & Innovation
            </span>
          </motion.h1>

          {/* Subheading / Value Proposition */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-muted dark:text-slate-light max-w-3xl mx-auto leading-relaxed font-normal"
          >
            ROYAL BUSINESS MACHINE provides custom enterprise software development, mobile apps, digital marketing, in-house printing, institutional tender execution, and startup growth support across emerging Indian markets.
          </motion.p>

          {/* Interactive CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <Link
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-charcoal dark:bg-gold text-warm-white dark:text-charcoal font-bold text-sm tracking-wide uppercase hover:bg-gold dark:hover:bg-warm-white transition-all shadow-md group"
            >
              <span>Explore All 8 Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/projects"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white dark:bg-graphite text-charcoal dark:text-warm-white border border-border hover:border-gold font-semibold text-sm transition-all"
            >
              <span>View Case Studies (50+)</span>
              <ChevronRight className="w-4 h-4 text-gold" />
            </Link>

            <a
              href="https://wa.me/919057287689"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-slate-muted hover:text-charcoal dark:hover:text-white font-semibold text-sm transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Direct</span>
            </a>
          </motion.div>

          {/* Real Credentials Pill Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="pt-6 border-t border-border/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left"
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
              <span className="text-xs font-semibold text-charcoal dark:text-warm-white">₹1.8 Cr+ Proven Traction</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
              <span className="text-xs font-semibold text-charcoal dark:text-warm-white">50+ Enterprise Deployments</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
              <span className="text-xs font-semibold text-charcoal dark:text-warm-white">99% Client Retention Rate</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
              <span className="text-xs font-semibold text-charcoal dark:text-warm-white">Govt & Education Partner</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
