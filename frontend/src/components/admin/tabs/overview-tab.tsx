"use client";

import {
  TrendingUp,
  Inbox,
  FolderGit2,
  Server,
  Newspaper,
  Users,
  Image as ImageIcon,
  Clock,
  ArrowUpRight,
  Phone,
  Mail,
  PlusCircle,
  FileEdit,
  Upload,
  CheckCircle2
} from "lucide-react";
import { AdminTab } from "../admin-sidebar";

interface OverviewTabProps {
  onNavigateTab: (tab: AdminTab) => void;
  stats?: {
    totalInquiries: number;
    newInquiries: number;
    totalProjects: number;
    publishedServices: number;
    totalBlogs: number;
    totalClients: number;
    totalMedia: number;
    pendingFollowUps: number;
    totalRevenue: number;
  };
  recentInquiries?: Array<{
    id: string;
    name: string;
    company: string;
    service: string;
    budget: string;
    date: string;
    status: string;
    email: string;
    phone: string;
  }>;
}

const defaultInquiries = [
  {
    id: "INQ-2026-112",
    name: "Dr. Vikram Seth",
    company: "Regional Medical Institute",
    service: "HMS Hospital Management System",
    budget: "₹3,50,000",
    date: "Nov 14, 2026",
    status: "New",
    email: "vikram@medinstitute.org",
    phone: "+91 9829012345",
  },
  {
    id: "INQ-2026-111",
    name: "Anil Singhania",
    company: "Singhania Agro Products",
    service: "Website & Direct E-Commerce Store",
    budget: "₹1,50,000",
    date: "Nov 13, 2026",
    status: "Contacted",
    email: "anil@singhaniaagro.in",
    phone: "+91 9414056789",
  },
  {
    id: "INQ-2026-110",
    name: "M. Choudhary",
    company: "District Dairy Federation",
    service: "Dairy Muneem Mobile App Logistics",
    budget: "₹2,50,000",
    date: "Nov 11, 2026",
    status: "Converted",
    email: "mchoudhary@dairyfed.co.in",
    phone: "+91 9001122334",
  },
  {
    id: "INQ-2026-109",
    name: "Pooja Verma",
    company: "Verma Law Chambers",
    service: "NyayaSetu AI Legal Integration",
    budget: "Custom Institutional",
    date: "Nov 09, 2026",
    status: "Discovery Call",
    email: "pooja@vermalaw.in",
    phone: "+91 9784561230",
  },
];

export function OverviewTab({
  onNavigateTab,
  stats = {
    totalInquiries: 38,
    newInquiries: 7,
    totalProjects: 16,
    publishedServices: 8,
    totalBlogs: 4,
    totalClients: 15,
    totalMedia: 42,
    pendingFollowUps: 5,
    totalRevenue: 1240000,
  },
  recentInquiries = defaultInquiries,
}: OverviewTabProps) {
  const metricCards = [
    {
      label: "Total Inquiries",
      value: stats.totalInquiries.toString(),
      trend: "+24% this month",
      trendUp: true,
      icon: Inbox,
      subtext: `${stats.newInquiries} requiring follow-up`,
      tab: "inquiries" as AdminTab,
    },
    {
      label: "Active Deal Pipeline",
      value: "₹12.4 Lakhs",
      trend: "6 active proposals",
      trendUp: true,
      icon: TrendingUp,
      subtext: "High conversion probability",
      tab: "leads" as AdminTab,
    },
    {
      label: "Live Services",
      value: stats.publishedServices.toString(),
      trend: "8 Core Verticals",
      trendUp: true,
      icon: Server,
      subtext: "40+ specialized deliverables",
      tab: "services" as AdminTab,
    },
    {
      label: "Portfolio Deployments",
      value: stats.totalProjects.toString(),
      trend: "50+ historical",
      trendUp: true,
      icon: FolderGit2,
      subtext: "99% verified satisfaction",
      tab: "portfolio" as AdminTab,
    },
    {
      label: "Published Articles",
      value: stats.totalBlogs.toString(),
      trend: "2 in draft",
      trendUp: false,
      icon: Newspaper,
      subtext: "Tech guides & news",
      tab: "blog" as AdminTab,
    },
    {
      label: "Enterprise Partners",
      value: stats.totalClients.toString(),
      trend: "100% verified",
      trendUp: true,
      icon: Users,
      subtext: "Gov, Dairy & Healthcare",
      tab: "clients" as AdminTab,
    },
    {
      label: "Media Assets",
      value: stats.totalMedia.toString(),
      trend: "Images & Specs",
      trendUp: true,
      icon: ImageIcon,
      subtext: "High-resolution CDN assets",
      tab: "media" as AdminTab,
    },
    {
      label: "Pending Inquiries",
      value: stats.newInquiries.toString(),
      trend: "< 15 min avg response",
      trendUp: true,
      icon: Clock,
      subtext: "Direct WhatsApp routing",
      tab: "inquiries" as AdminTab,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Quick Action Bar */}
      <div className="p-6 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-charcoal dark:text-warm-white font-heading">
            Administrative Shortcuts
          </h3>
          <p className="text-xs text-slate-muted">
            Frequently performed content and operational tasks
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onNavigateTab("homepage")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs font-semibold text-charcoal dark:text-warm-white hover:border-gold hover:text-gold transition-colors"
          >
            <FileEdit className="w-3.5 h-3.5 text-gold" />
            <span>Edit Homepage</span>
          </button>
          <button
            onClick={() => onNavigateTab("services")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs font-semibold text-charcoal dark:text-warm-white hover:border-gold hover:text-gold transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5 text-gold" />
            <span>Add Service</span>
          </button>
          <button
            onClick={() => onNavigateTab("portfolio")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs font-semibold text-charcoal dark:text-warm-white hover:border-gold hover:text-gold transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5 text-gold" />
            <span>Add Project</span>
          </button>
          <button
            onClick={() => onNavigateTab("media")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs font-semibold text-charcoal dark:text-warm-white hover:border-gold hover:text-gold transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-gold" />
            <span>Upload Media</span>
          </button>
          <button
            onClick={() => onNavigateTab("inquiries")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold text-charcoal text-xs font-bold uppercase tracking-wider hover:bg-gold-light transition-all shadow-md shadow-gold/20"
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Manage Inquiries</span>
          </button>
        </div>
      </div>

      {/* 8 Analytics Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metricCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              onClick={() => onNavigateTab(card.tab)}
              className="p-6 rounded-2xl bg-white dark:bg-charcoal border border-border shadow-sm hover:border-gold/50 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-muted">
                    {card.label}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-gold/10 text-gold flex items-center justify-center group-hover:bg-gold group-hover:text-charcoal transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="text-2xl font-extrabold text-charcoal dark:text-warm-white font-heading">
                  {card.value}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {card.trend}
                </span>
                <span className="text-[11px] text-slate-muted">{card.subtext}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual Charts: Inquiry Trends & Pipeline Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Monthly Inquiry Trends Bar Chart */}
        <div className="lg:col-span-8 p-8 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <h3 className="text-xl font-bold text-charcoal dark:text-warm-white font-heading">
                Monthly Inquiries & Lead Acquisition
              </h3>
              <p className="text-xs text-slate-muted">6-month verified trend across organic search & direct referrals</p>
            </div>
            <span className="text-xs font-bold text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
              FY 2025–2026
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-64 flex items-end justify-between gap-4 pt-8 px-4">
            {[
              { month: "Jun", count: 18, height: "45%" },
              { month: "Jul", count: 24, height: "60%" },
              { month: "Aug", count: 22, height: "55%" },
              { month: "Sep", count: 29, height: "72%" },
              { month: "Oct", count: 32, height: "80%" },
              { month: "Nov (MTD)", count: 38, height: "95%", current: true },
            ].map((bar, bIdx) => (
              <div key={bIdx} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] font-bold text-slate-muted group-hover:text-gold transition-colors">
                  {bar.count}
                </span>
                <div className="w-full bg-warm-white dark:bg-graphite rounded-xl h-48 flex items-end p-1.5">
                  <div
                    style={{ height: bar.height }}
                    className={`w-full rounded-lg transition-all duration-500 ${
                      bar.current
                        ? "bg-gradient-to-t from-gold-dark via-gold to-gold-light shadow-lg shadow-gold/20"
                        : "bg-slate-300 dark:bg-slate-700 group-hover:bg-gold/60"
                    }`}
                  />
                </div>
                <span className="text-xs font-bold text-charcoal dark:text-warm-white font-heading">
                  {bar.month}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-muted pt-4 border-t border-border">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Conversion Rate: 34.2% Qualified</span>
            </span>
            <span>Peak Month: November 2026 (38 Leads)</span>
          </div>
        </div>

        {/* Right: Demand Breakdown by Service */}
        <div className="lg:col-span-4 p-8 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm space-y-6">
          <div className="border-b border-border pb-4">
            <h3 className="text-xl font-bold text-charcoal dark:text-warm-white font-heading">
              Demand by Service
            </h3>
            <p className="text-xs text-slate-muted">Where enterprise clients focus interest</p>
          </div>

          <div className="space-y-4">
            {[
              { name: "IT & Custom Enterprise Software", share: "35%", color: "bg-gold" },
              { name: "Mobile App Logistics (Dairy Muneem)", share: "25%", color: "bg-blue-500" },
              { name: "Institutional College Portals", share: "20%", color: "bg-emerald-500" },
              { name: "Startup Consulting & Pitch Decks", share: "12%", color: "bg-purple-500" },
              { name: "Commercial Printing & Press", share: "8%", color: "bg-amber-600" },
            ].map((serv, sIdx) => (
              <div key={sIdx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-charcoal dark:text-warm-white truncate pr-2">{serv.name}</span>
                  <span className="font-bold text-gold shrink-0">{serv.share}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-warm-white dark:bg-graphite overflow-hidden">
                  <div
                    style={{ width: serv.share }}
                    className={`h-full ${serv.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-warm-white dark:bg-graphite/50 border border-border space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-muted">Turnaround SLA</div>
            <p className="text-xs text-slate-muted leading-relaxed">
              Standard discovery response time remains strictly &lt; 24 hours with WhatsApp escalation.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Inquiries Table */}
      <div className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <h3 className="text-xl font-bold text-charcoal dark:text-warm-white font-heading">
              Recent Business Inquiries & Leads
            </h3>
            <p className="text-xs text-slate-muted">Generated via public contact forms and direct inquiries</p>
          </div>
          <button
            onClick={() => onNavigateTab("inquiries")}
            className="text-xs font-bold text-gold hover:underline flex items-center gap-1 self-start"
          >
            <span>View All Inquiries in CRM</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-slate-muted uppercase tracking-wider">
                <th className="py-3 px-4">Lead ID</th>
                <th className="py-3 px-4">Contact Person</th>
                <th className="py-3 px-4">Organization</th>
                <th className="py-3 px-4">Service Interest</th>
                <th className="py-3 px-4">Budget Window</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Quick Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentInquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-warm-white/50 dark:hover:bg-graphite/40 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-charcoal dark:text-warm-white">{inq.id}</td>
                  <td className="py-4 px-4 font-bold text-charcoal dark:text-warm-white">{inq.name}</td>
                  <td className="py-4 px-4 text-slate-muted font-medium">{inq.company}</td>
                  <td className="py-4 px-4 font-semibold text-charcoal dark:text-warm-white">{inq.service}</td>
                  <td className="py-4 px-4 text-gold font-bold">{inq.budget}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        inq.status === "New"
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                          : inq.status === "Converted"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          : "bg-gold/15 text-gold border border-gold/30"
                      }`}
                    >
                      {inq.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right space-x-2">
                    <a
                      href={`tel:${inq.phone}`}
                      className="inline-flex p-1.5 rounded-lg border border-border text-slate-muted hover:text-gold hover:border-gold transition-colors"
                      title={inq.phone}
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={`mailto:${inq.email}`}
                      className="inline-flex p-1.5 rounded-lg border border-border text-slate-muted hover:text-gold hover:border-gold transition-colors"
                      title={inq.email}
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
