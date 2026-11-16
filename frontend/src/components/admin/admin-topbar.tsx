"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Search,
  ExternalLink,
  Database,
  Moon,
  Sun,
  Bell,
  RefreshCw
} from "lucide-react";
import { AdminTab } from "./admin-sidebar";

interface AdminTopbarProps {
  activeTab: AdminTab;
  onRefresh: () => void;
  isRefreshing?: boolean;
  onSearch?: (term: string) => void;
  unreadCount?: number;
}

export function AdminTopbar({
  activeTab,
  onRefresh,
  isRefreshing = false,
  onSearch,
  unreadCount = 2,
}: AdminTopbarProps) {
  const { setTheme, resolvedTheme } = useTheme();

  const tabTitles: Record<AdminTab, { title: string; subtitle: string }> = {
    overview: { title: "Operations & Analytics Overview", subtitle: "Real-time metrics, deal pipelines, and operational health" },
    cms: { title: "Website Content Management (CMS)", subtitle: "Dynamically edit, preview, and publish all 13 website pages" },
    homepage: { title: "Dedicated Homepage Editor", subtitle: "Configure Hero, Trust indicators, Services preview, and CTA sections" },
    about: { title: "About & History Editor", subtitle: "Update organizational history, mission, vision, and milestones" },
    services: { title: "Services Management", subtitle: "Manage all 12 service divisions, pricing tiers, and deliverables" },
    products: { title: "Software Products & Platforms Marketplace", subtitle: "Manage 12 proprietary SaaS suites, deployment readiness, and commercial terms" },
    portfolio: { title: "Portfolio & Case Studies Manager", subtitle: "Add, edit, and organize verified enterprise client projects" },
    media: { title: "Centralized Media Library & Gallery", subtitle: "Upload, categorize, inspect, and organize image & video assets" },
    inquiries: { title: "Inquiries & Lead Management CRM", subtitle: "Track, qualify, and convert website form submissions and leads" },
    leads: { title: "Lead Conversion Funnel", subtitle: "Visual pipeline of active deals and proposal negotiations" },
    blog: { title: "Blog & Technical Insights CMS", subtitle: "Author, schedule, draft, and publish articles and guides" },
    clients: { title: "Clients & Testimonials", subtitle: "Manage enterprise partners, client logos, and verified reviews" },
    team: { title: "Executive Leadership & Engineering Team", subtitle: "Manage team profiles, designations, biographies, and skills" },
    careers: { title: "Career Opportunities & Open Roles", subtitle: "Post, edit, and archive engineering and operational job vacancies" },
    seo: { title: "Search Engine Optimization (SEO) Manager", subtitle: "Configure page meta tags, OpenGraph data, and canonical URLs" },
    navigation: { title: "Navigation & Menu Configuration", subtitle: "Organize header dropdowns, footer links, and CTA destinations" },
    settings: { title: "Global Website Settings", subtitle: "Manage company identifiers, contact channels, addresses, and hours" },
    users: { title: "Admin Users & Role Permissions (RBAC)", subtitle: "Manage administrative access, roles, and credential security" },
    logs: { title: "Activity Audit Logs", subtitle: "Chronological audit trail of all administrative and content actions" },
    notifications: { title: "Notifications & System Alerts", subtitle: "Pending leads, deployment notifications, and backup statuses" },
    preview: { title: "Interactive Live Split Preview", subtitle: "Compare draft updates with the current public website view" },
  };

  const currentInfo = tabTitles[activeTab] || { title: "Administration", subtitle: "Royal Business Machine CMS" };

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-charcoal/90 backdrop-blur-md border-b border-border px-6 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Title & Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-gold">
          <span>Admin</span>
          <span>/</span>
          <span className="text-slate-muted">{activeTab}</span>
        </div>
        <h2 className="text-xl font-extrabold text-charcoal dark:text-warm-white font-heading">
          {currentInfo.title}
        </h2>
        <p className="text-xs text-slate-muted hidden sm:block">
          {currentInfo.subtitle}
        </p>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden lg:block w-64">
          <Search className="w-3.5 h-3.5 text-slate-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search records, pages..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs text-charcoal dark:text-warm-white focus:outline-none focus:border-gold transition-colors"
          />
        </div>

        {/* Database Live Pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <Database className="w-3.5 h-3.5" />
          <span className="text-[11px]">DB Active</span>
        </div>

        {/* Refresh button */}
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className={`p-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-slate-muted hover:text-gold hover:border-gold/40 transition-colors ${
            isRefreshing ? "animate-spin text-gold" : ""
          }`}
          title="Refresh Data"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        {/* Notification Pill */}
        <div className="relative p-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-slate-muted hover:text-gold transition-colors cursor-pointer" title="Inquiries & Notifications">
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold text-charcoal font-bold text-[9px] flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>

        {/* Public Site Link */}
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-charcoal dark:bg-gold text-warm-white dark:text-charcoal text-xs font-bold uppercase tracking-wider hover:bg-gold dark:hover:bg-warm-white transition-all shadow-sm"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        {/* Theme Switcher */}
        <button
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="p-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-slate-muted hover:text-gold transition-colors"
          title="Toggle Theme"
        >
          {resolvedTheme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}
