"use client";

import Link from "next/link";
import { ArrowRight, Phone, MessageSquare, ShieldCheck } from "lucide-react";
import { RevealOnScroll, MagneticButton } from "@/components/motion";

interface CtaBannerProps {
  title?: string;
  subtitle?: string;
}

export function CtaBanner({
  title = "Ready to Transform Your Business with Scalable Technology?",
  subtitle = "Partner with ROYAL BUSINESS MACHINE for custom software, mobile applications, digital marketing funnels, and institutional infrastructure.",
}: CtaBannerProps) {
  return (
    <section className="py-24 relative overflow-hidden bg-charcoal text-warm-white">
      {/* Decorative luxury radial gradient & ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/20 via-charcoal/90 to-charcoal pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <RevealOnScroll direction="down" distance={20}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-gold/10 text-gold border border-gold/30">
              <ShieldCheck className="w-4 h-4" />
              <span>Turnkey Execution Partner</span>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-heading leading-tight">
              {title}
            </h2>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.2}>
            <p className="text-base sm:text-lg text-slate-light max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <MagneticButton strength={0.2}>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gold text-charcoal font-bold text-sm tracking-wide uppercase hover:bg-gold-light hover:shadow-xl hover:shadow-gold/25 transition-all duration-300"
                >
                  <span>Schedule Strategy Call</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </MagneticButton>

              <a
                href="https://wa.me/919057287689"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-sm transition-all duration-300 hover:border-gold/40"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>Instant WhatsApp Connect</span>
              </a>

              <a
                href="tel:+919057287689"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-slate-light hover:text-gold transition-colors text-sm font-semibold"
              >
                <Phone className="w-4 h-4 text-gold" />
                <span>+91 9057287689</span>
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
