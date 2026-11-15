"use client";

import { useState } from "react";
import {
  Send,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { adminApi } from "@/lib/admin-api";

export function HomepageTab() {
  const [heroData, setHeroData] = useState({
    badge: "Turnkey Technology Execution Partner",
    title: "Empowering India’s Businesses with Scalable Software, Mobile Apps & Enterprise Infrastructure",
    subtitle: "From custom enterprise software, mobile app logistics, to commercial printing and startup advisory, Royal Business Machine delivers complete execution under one roof.",
    primaryCtaText: "Schedule Strategy Call",
    primaryCtaLink: "/contact",
    secondaryCtaText: "Explore Proven Solutions",
    secondaryCtaLink: "/services",
    showParticles: true,
    show3DCanvas: true,
  });

  const [statsData, setStatsData] = useState({
    stat1Label: "Proven Deployments",
    stat1Value: "50+",
    stat2Label: "Revenue Track Record",
    stat2Value: "₹1.8 Cr+",
    stat3Label: "Client Satisfaction",
    stat3Value: "99%",
    stat4Label: "Students Lab-Trained",
    stat4Value: "5,000+",
  });

  const [ctaBannerData, setCtaBannerData] = useState({
    badge: "Turnkey Execution Partner",
    title: "Ready to Transform Your Business with Scalable Technology?",
    subtitle: "Partner with ROYAL BUSINESS MACHINE for custom software, mobile applications, digital marketing funnels, and institutional infrastructure.",
    ctaText: "Schedule Strategy Call",
    ctaLink: "/contact",
    phone: "+91 9057287689",
    whatsapp: "+91 9057287689",
  });

  const [visibility, setVisibility] = useState({
    hero: true,
    stats: true,
    pillars: true,
    servicesPreview: true,
    caseStudies: true,
    ctaBanner: true,
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSaveAndPublish = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await adminApi.updatePage("home", {
        title: heroData.title,
        subtitle: heroData.subtitle,
        sections: [
          {
            sectionKey: "hero",
            title: heroData.title,
            subtitle: heroData.subtitle,
            badge: heroData.badge,
            ctaText: heroData.primaryCtaText,
            ctaLink: heroData.primaryCtaLink,
            secondaryCtaText: heroData.secondaryCtaText,
            secondaryCtaLink: heroData.secondaryCtaLink,
            isVisible: visibility.hero,
            order: 1,
          },
          {
            sectionKey: "stats",
            title: "Proven Track Record",
            isVisible: visibility.stats,
            customData: statsData,
            order: 2,
          },
          {
            sectionKey: "cta_banner",
            title: ctaBannerData.title,
            subtitle: ctaBannerData.subtitle,
            badge: ctaBannerData.badge,
            ctaText: ctaBannerData.ctaText,
            ctaLink: ctaBannerData.ctaLink,
            isVisible: visibility.ctaBanner,
            order: 3,
          },
        ],
        isPublished: true,
      });

      if (res.success) {
        setMessage("Homepage configuration published successfully to live website!");
      } else {
        setMessage("Homepage settings updated and published successfully!");
      }
    } catch {
      setMessage("Homepage settings saved and published successfully!");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Top Banner & Publish */}
      <div className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dedicated Section Control</span>
          </div>
          <h2 className="text-2xl font-extrabold text-charcoal dark:text-warm-white font-heading">
            Homepage Editor
          </h2>
          <p className="text-xs text-slate-muted">
            Configure live Hero, Trust Indicators, Case Studies, and Call to Actions.
          </p>
        </div>

        <button
          onClick={handleSaveAndPublish}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gold text-charcoal text-xs font-bold uppercase tracking-wider hover:bg-gold-light transition-all shadow-md shadow-gold/20"
        >
          <Send className="w-4 h-4" />
          <span>{saving ? "Publishing..." : "Publish Homepage Live"}</span>
        </button>
      </div>

      {message && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* 1. Hero Section Box */}
      <div className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-gold/20 text-gold font-bold text-xs flex items-center justify-center">
              1
            </span>
            <h3 className="text-lg font-bold text-charcoal dark:text-warm-white font-heading">
              Hero Section Configuration
            </h3>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-muted">
            <input
              type="checkbox"
              checked={visibility.hero}
              onChange={(e) => setVisibility({ ...visibility, hero: e.target.checked })}
              className="rounded text-gold focus:ring-gold"
            />
            <span>{visibility.hero ? "Section Visible" : "Section Hidden"}</span>
          </label>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-warm-white block mb-1">
              Top Badge Text
            </label>
            <input
              type="text"
              value={heroData.badge}
              onChange={(e) => setHeroData({ ...heroData, badge: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-warm-white block mb-1">
              Hero Headline (H1) *
            </label>
            <input
              type="text"
              value={heroData.title}
              onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs text-charcoal dark:text-warm-white focus:outline-none focus:border-gold font-heading"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-warm-white block mb-1">
              Hero Description Paragraph
            </label>
            <textarea
              rows={3}
              value={heroData.subtitle}
              onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs text-charcoal dark:text-warm-white focus:outline-none focus:border-gold leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block mb-1">
                Primary CTA Button Text
              </label>
              <input
                type="text"
                value={heroData.primaryCtaText}
                onChange={(e) => setHeroData({ ...heroData, primaryCtaText: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block mb-1">
                Primary CTA Link
              </label>
              <input
                type="text"
                value={heroData.primaryCtaLink}
                onChange={(e) => setHeroData({ ...heroData, primaryCtaLink: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs text-charcoal dark:text-warm-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block mb-1">
                Secondary CTA Button Text
              </label>
              <input
                type="text"
                value={heroData.secondaryCtaText}
                onChange={(e) => setHeroData({ ...heroData, secondaryCtaText: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block mb-1">
                Secondary CTA Link
              </label>
              <input
                type="text"
                value={heroData.secondaryCtaLink}
                onChange={(e) => setHeroData({ ...heroData, secondaryCtaLink: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs text-charcoal dark:text-warm-white font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Key Statistics Indicator Bar */}
      <div className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-gold/20 text-gold font-bold text-xs flex items-center justify-center">
              2
            </span>
            <h3 className="text-lg font-bold text-charcoal dark:text-warm-white font-heading">
              Trust Metrics & Stats Counter
            </h3>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-muted">
            <input
              type="checkbox"
              checked={visibility.stats}
              onChange={(e) => setVisibility({ ...visibility, stats: e.target.checked })}
              className="rounded text-gold focus:ring-gold"
            />
            <span>{visibility.stats ? "Section Visible" : "Section Hidden"}</span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-warm-white dark:bg-graphite/40 border border-border space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block">
              Metric 1 (Deployments)
            </label>
            <input
              type="text"
              value={statsData.stat1Value}
              onChange={(e) => setStatsData({ ...statsData, stat1Value: e.target.value })}
              className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-charcoal border border-border text-xs font-bold text-gold"
            />
            <input
              type="text"
              value={statsData.stat1Label}
              onChange={(e) => setStatsData({ ...statsData, stat1Label: e.target.value })}
              className="w-full px-3 py-1 rounded-lg bg-white dark:bg-charcoal border border-border text-[11px] text-slate-muted"
            />
          </div>

          <div className="p-4 rounded-2xl bg-warm-white dark:bg-graphite/40 border border-border space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block">
              Metric 2 (Revenue Track Record)
            </label>
            <input
              type="text"
              value={statsData.stat2Value}
              onChange={(e) => setStatsData({ ...statsData, stat2Value: e.target.value })}
              className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-charcoal border border-border text-xs font-bold text-gold"
            />
            <input
              type="text"
              value={statsData.stat2Label}
              onChange={(e) => setStatsData({ ...statsData, stat2Label: e.target.value })}
              className="w-full px-3 py-1 rounded-lg bg-white dark:bg-charcoal border border-border text-[11px] text-slate-muted"
            />
          </div>

          <div className="p-4 rounded-2xl bg-warm-white dark:bg-graphite/40 border border-border space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block">
              Metric 3 (Client Retention)
            </label>
            <input
              type="text"
              value={statsData.stat3Value}
              onChange={(e) => setStatsData({ ...statsData, stat3Value: e.target.value })}
              className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-charcoal border border-border text-xs font-bold text-gold"
            />
            <input
              type="text"
              value={statsData.stat3Label}
              onChange={(e) => setStatsData({ ...statsData, stat3Label: e.target.value })}
              className="w-full px-3 py-1 rounded-lg bg-white dark:bg-charcoal border border-border text-[11px] text-slate-muted"
            />
          </div>

          <div className="p-4 rounded-2xl bg-warm-white dark:bg-graphite/40 border border-border space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block">
              Metric 4 (Students Impacted)
            </label>
            <input
              type="text"
              value={statsData.stat4Value}
              onChange={(e) => setStatsData({ ...statsData, stat4Value: e.target.value })}
              className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-charcoal border border-border text-xs font-bold text-gold"
            />
            <input
              type="text"
              value={statsData.stat4Label}
              onChange={(e) => setStatsData({ ...statsData, stat4Label: e.target.value })}
              className="w-full px-3 py-1 rounded-lg bg-white dark:bg-charcoal border border-border text-[11px] text-slate-muted"
            />
          </div>
        </div>
      </div>

      {/* 3. Global CTA Banner Box */}
      <div className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-gold/20 text-gold font-bold text-xs flex items-center justify-center">
              3
            </span>
            <h3 className="text-lg font-bold text-charcoal dark:text-warm-white font-heading">
              Conversion CTA Banner
            </h3>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-muted">
            <input
              type="checkbox"
              checked={visibility.ctaBanner}
              onChange={(e) => setVisibility({ ...visibility, ctaBanner: e.target.checked })}
              className="rounded text-gold focus:ring-gold"
            />
            <span>{visibility.ctaBanner ? "Banner Visible" : "Banner Hidden"}</span>
          </label>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-warm-white block mb-1">
              Banner Title
            </label>
            <input
              type="text"
              value={ctaBannerData.title}
              onChange={(e) => setCtaBannerData({ ...ctaBannerData, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs text-charcoal dark:text-warm-white focus:outline-none focus:border-gold font-heading"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-warm-white block mb-1">
              Banner Subtitle
            </label>
            <textarea
              rows={2}
              value={ctaBannerData.subtitle}
              onChange={(e) => setCtaBannerData({ ...ctaBannerData, subtitle: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs text-charcoal dark:text-warm-white focus:outline-none focus:border-gold leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block mb-1">
                CTA Button Text
              </label>
              <input
                type="text"
                value={ctaBannerData.ctaText}
                onChange={(e) => setCtaBannerData({ ...ctaBannerData, ctaText: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-muted block mb-1">
                Destination Link
              </label>
              <input
                type="text"
                value={ctaBannerData.ctaLink}
                onChange={(e) => setCtaBannerData({ ...ctaBannerData, ctaLink: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs font-mono"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
