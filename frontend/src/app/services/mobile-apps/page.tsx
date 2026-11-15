import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/section-header";
import { CtaBanner } from "@/components/cta-banner";
import {
  Smartphone,
  ArrowRight,
  ShieldCheck,
  Zap,
  WifiOff,
  Bell,
  Sparkles
} from "lucide-react";

export const metadata: Metadata = {
  title: "Mobile Application Development (iOS & Android) | Royal Business Machine",
  description:
    "High-performance native and cross-platform mobile app development with offline synchronization, real-time push telemetry, and enterprise logistics workflows. Creators of Dairy Muneem.",
};

const appFeatures = [
  {
    title: "Offline-First Synchronization",
    desc: "Engineered specifically for Tier-2, Tier-3, and rural field operations with seamless background sync when network reconnects.",
    icon: WifiOff,
  },
  {
    title: "Fluid Native Ergonomics",
    desc: "60+ FPS high-refresh touch interactions, haptic feedback, and platform-specific navigation paradigms on iOS and Android.",
    icon: Zap,
  },
  {
    title: "Push Notifications & Alerts",
    desc: "Instant transactional alerts, OTP verification dispatches, and geofenced automated customer reminders via Firebase and SMS gateways.",
    icon: Bell,
  },
  {
    title: "Enterprise Grade Security",
    desc: "Biometric authentication (FaceID, Fingerprint), encrypted local SQLite storage, SSL certificate pinning, and tamper protection.",
    icon: ShieldCheck,
  },
];

export default function MobileAppsPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* 1. Hero */}
      <section className="py-20 lg:py-28 bg-white dark:bg-charcoal border-b border-border text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/25">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile Engineering Discipline</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-charcoal dark:text-warm-white font-heading">
            Mobile Application <span className="gold-gradient-text">Development</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-muted dark:text-slate-light leading-relaxed max-w-3xl mx-auto font-normal">
            We build high-performance, intuitive iOS and Android applications tailored for consumer engagement, B2B workforce automation, and critical field logistics.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/contact?service=Mobile%20App%20Development"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-charcoal dark:bg-gold text-warm-white dark:text-charcoal font-bold text-xs uppercase tracking-wider hover:bg-gold transition-colors shadow-sm"
            >
              <span>Request Mobile App Scoping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white font-semibold text-xs uppercase tracking-wider hover:border-gold transition-colors"
            >
              <span>Explore Mobile Case Studies</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Flagship Case Spotlight: Dairy Muneem */}
      <section className="py-24 bg-warm-white dark:bg-charcoal/50 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="rounded-3xl bg-white dark:bg-charcoal border border-gold/40 p-8 sm:p-12 shadow-md">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20 inline-flex mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Flagship Case Study — ₹2,50,000 Deployment</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal dark:text-warm-white font-heading mb-3">
              Dairy Muneem — Field Logistics & Milk Procurement App
            </h2>

            <p className="text-sm text-slate-muted leading-relaxed mb-6 font-normal">
              Designed and deployed for regional dairy federations operating across 40+ rural collection centers. Integrates a real-time Milk Fat and SNF pricing calculation engine, automated slip generation, offline data persistence, and automated daily farmer ledger synchronization.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="p-4 rounded-xl bg-warm-white dark:bg-graphite">
                <div className="text-2xl font-extrabold text-gold font-heading">98%</div>
                <div className="text-xs text-slate-muted">Error reduction in procurement calculations</div>
              </div>
              <div className="p-4 rounded-xl bg-warm-white dark:bg-graphite">
                <div className="text-2xl font-extrabold text-gold font-heading">40+</div>
                <div className="text-xs text-slate-muted">Active rural centers operating offline</div>
              </div>
              <div className="p-4 rounded-xl bg-warm-white dark:bg-graphite">
                <div className="text-2xl font-extrabold text-gold font-heading">Instant</div>
                <div className="text-xs text-slate-muted">SMS payment receipt dispatches to farmers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Mobile Capabilities */}
      <section className="py-24 bg-white dark:bg-charcoal border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <SectionHeader
            badge="Engineering Architecture"
            title="Built for Extreme Reliability in Any Environment"
            subtitle="Mobile apps designed to thrive whether on high-speed 5G or intermittent rural connectivity."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {appFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-warm-white/70 dark:bg-graphite/40 border border-border hover:border-gold/40 transition-all flex items-start gap-5"
              >
                <div className="w-12 h-12 rounded-2xl bg-gold/10 text-gold flex items-center justify-center shrink-0">
                  <feat.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal dark:text-warm-white mb-2 font-heading">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-muted leading-relaxed font-normal">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Conversion CTA */}
      <CtaBanner
        title="Ready to Launch Your Custom Mobile Application?"
        subtitle="Partner with Royal Business Machine for end-to-end iOS, Android, and cross-platform app engineering."
      />
    </div>
  );
}
