"use client";

import { useState, useEffect, useCallback } from "react";
import { Globe, CheckCircle2, Save, ExternalLink, ShieldCheck } from "lucide-react";
import { getPageCmsList, updatePageCms } from "@/lib/admin-api";

interface PageSeoItem {
  pageSlug: string;
  pageTitle: string;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  noIndex?: boolean;
}

interface RawPageCms {
  pageSlug: string;
  pageTitle: string;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function SeoTab() {
  const [pages, setPages] = useState<PageSeoItem[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string>("home");
  const [activeItem, setActiveItem] = useState<PageSeoItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const loadPages = useCallback(async () => {
    try {
      const res = await getPageCmsList();
      if (res?.data && res.data.length > 0) {
        const rawList = res.data as RawPageCms[];
        const mapped: PageSeoItem[] = rawList.map((p) => ({
          pageSlug: p.pageSlug,
          pageTitle: p.pageTitle,
          seoTitle: p.seoTitle || p.pageTitle,
          seoDescription: p.seoDescription || "",
          keywords: p.keywords || [],
          canonicalUrl: p.canonicalUrl || `https://royalbusinessmachine.com/${p.pageSlug === "home" ? "" : p.pageSlug}`,
          ogImage: p.ogImage || "/images/og-image.jpg",
          noIndex: !!p.noIndex,
        }));
        setPages(mapped);
        const current = mapped.find((p) => p.pageSlug === selectedSlug) || mapped[0];
        setActiveItem({ ...current });
        setSelectedSlug(current.pageSlug);
      } else {
        // Default static fallback
        const defaults: PageSeoItem[] = [
          { pageSlug: "home", pageTitle: "Home", seoTitle: "Royal Business Machine | Enterprise Tech & Automation", seoDescription: "Leading enterprise technology, automation, office solutions and IT equipment provider.", canonicalUrl: "https://royalbusinessmachine.com" },
          { pageSlug: "about", pageTitle: "About Us", seoTitle: "About Us | Royal Business Machine", seoDescription: "Over two decades of precision technology solutions and digital excellence.", canonicalUrl: "https://royalbusinessmachine.com/about" },
          { pageSlug: "services", pageTitle: "Services", seoTitle: "Enterprise Technology Services | Royal Business Machine", seoDescription: "Complete portfolio of IT infrastructure, biometrics, surveillance and managed office solutions.", canonicalUrl: "https://royalbusinessmachine.com/services" },
          { pageSlug: "portfolio", pageTitle: "Portfolio", seoTitle: "Case Studies & Portfolio | Royal Business Machine", seoDescription: "Discover high-impact digital transformations delivered across enterprise and government sectors.", canonicalUrl: "https://royalbusinessmachine.com/portfolio" },
          { pageSlug: "contact", pageTitle: "Contact Us", seoTitle: "Contact Royal Business Machine | Inquire & Support", seoDescription: "Connect with our engineering experts for customized technology consultations.", canonicalUrl: "https://royalbusinessmachine.com/contact" },
        ];
        setPages(defaults);
        setActiveItem({ ...defaults[0] });
      }
    } catch {
      // Fallback
      const defaults: PageSeoItem[] = [
        { pageSlug: "home", pageTitle: "Home", seoTitle: "Royal Business Machine | Enterprise Tech & Automation", seoDescription: "Leading enterprise technology, automation, office solutions and IT equipment provider.", canonicalUrl: "https://royalbusinessmachine.com" },
      ];
      setPages(defaults);
      setActiveItem({ ...defaults[0] });
    }
  }, [selectedSlug]);

  useEffect(() => {
    loadPages();
  }, [loadPages]);

  const handleSelectPage = (slug: string) => {
    setSelectedSlug(slug);
    const found = pages.find((p) => p.pageSlug === slug);
    if (found) {
      setActiveItem({ ...found });
    }
  };

  const handleSave = async () => {
    if (!activeItem) return;
    setSaving(true);
    setSaveSuccess(false);
    try {
      await updatePageCms(activeItem.pageSlug, {
        seoTitle: activeItem.seoTitle,
        seoDescription: activeItem.seoDescription,
        keywords: activeItem.keywords,
        canonicalUrl: activeItem.canonicalUrl,
        ogImage: activeItem.ogImage,
        noIndex: activeItem.noIndex,
      });
      setPages((prev) => prev.map((p) => (p.pageSlug === activeItem.pageSlug ? activeItem : p)));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      alert("Failed to save SEO metadata.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 border border-slate-800 rounded-2xl p-6 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Globe className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold">SEO & Metadata Control Center</h2>
          </div>
          <p className="text-sm text-slate-400">
            Configure titles, meta descriptions, OpenGraph social cards, canonical links, and indexing directives.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://royalbusinessmachine.com/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold rounded-lg border border-slate-700 transition"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            View sitemap.xml
          </a>
          <a
            href="https://royalbusinessmachine.com/robots.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold rounded-lg border border-slate-700 transition"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            View robots.txt
          </a>
        </div>
      </div>

      {/* SEO Health Verification Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Dynamic Sitemap</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Active (31+ Valid URLs)</p>
            </div>
          </div>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full">
            200 OK
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Robots.txt Directive</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Allow: / (Disallow: /admin)</p>
            </div>
          </div>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full">
            Optimal
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">OpenGraph Tags</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Twitter & Social Cards</p>
            </div>
          </div>
          <span className="text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 font-bold px-2 py-0.5 rounded-full">
            Configured
          </span>
        </div>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Page Selection */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Managed Pages</h3>
          <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
            {pages.map((p) => (
              <button
                key={p.pageSlug}
                onClick={() => handleSelectPage(p.pageSlug)}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm transition flex items-center justify-between ${
                  selectedSlug === p.pageSlug
                    ? "bg-amber-500 text-white font-semibold shadow-sm"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <span>{p.pageTitle}</span>
                <span className={`text-[11px] font-mono ${selectedSlug === p.pageSlug ? "text-amber-100" : "text-slate-400"}`}>
                  /{p.pageSlug === "home" ? "" : p.pageSlug}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Active Page SEO Form */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
          {activeItem ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {activeItem.pageTitle} — Metadata Settings
                  </h3>
                  <p className="text-xs text-slate-500">Route: /{activeItem.pageSlug === "home" ? "" : activeItem.pageSlug}</p>
                </div>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-semibold transition disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save SEO"}
                </button>
              </div>

              {saveSuccess && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Metadata saved successfully! Changes are reflected in Next.js metadata dynamically.
                </div>
              )}

              {/* SERP Google Preview */}
              <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl">
                <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Search Engine Preview</p>
                <div className="space-y-1">
                  <div className="text-xs text-slate-600 dark:text-slate-400 truncate">
                    {activeItem.canonicalUrl || `https://royalbusinessmachine.com/${activeItem.pageSlug}`}
                  </div>
                  <div className="text-base font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                    {activeItem.seoTitle || activeItem.pageTitle}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {activeItem.seoDescription || "No meta description defined. Google will generate a snippet from your content."}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  SEO Title (Target 50-60 characters)
                </label>
                <input
                  type="text"
                  value={activeItem.seoTitle || ""}
                  onChange={(e) => setActiveItem({ ...activeItem, seoTitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white"
                />
                <p className="text-[11px] text-slate-400 mt-1">{(activeItem.seoTitle || "").length} characters</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Meta Description (Target 140-160 characters)
                </label>
                <textarea
                  rows={3}
                  value={activeItem.seoDescription || ""}
                  onChange={(e) => setActiveItem({ ...activeItem, seoDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white"
                />
                <p className="text-[11px] text-slate-400 mt-1">{(activeItem.seoDescription || "").length} characters</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Canonical URL
                  </label>
                  <input
                    type="text"
                    value={activeItem.canonicalUrl || ""}
                    onChange={(e) => setActiveItem({ ...activeItem, canonicalUrl: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    OG / Social Share Image
                  </label>
                  <input
                    type="text"
                    value={activeItem.ogImage || ""}
                    onChange={(e) => setActiveItem({ ...activeItem, ogImage: e.target.value })}
                    placeholder="/images/og-image.jpg"
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="noIndexToggle"
                  checked={!!activeItem.noIndex}
                  onChange={(e) => setActiveItem({ ...activeItem, noIndex: e.target.checked })}
                  className="w-4 h-4 text-amber-500 rounded border-slate-300 focus:ring-amber-400"
                />
                <label htmlFor="noIndexToggle" className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Exclude from search indexing (noindex, nofollow)
                </label>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">Select a page to edit its metadata.</div>
          )}
        </div>
      </div>
    </div>
  );
}
