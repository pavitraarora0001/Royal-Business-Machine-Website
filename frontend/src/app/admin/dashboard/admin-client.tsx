"use client";

import Link from "next/link";
import {
  ShieldAlert,
  TrendingUp,
  Mail,
  Phone,
  ArrowUpRight,
  Database,
  Server
} from "lucide-react";

export function AdminDashboardClient() {
  const recentInquiries = [
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

  return (
    <div className="min-h-screen bg-warm-white dark:bg-charcoal/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/25">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Operations Management Suite</span>
            </div>
            <h1 className="text-3xl font-extrabold text-charcoal dark:text-warm-white font-heading">
              Executive Administration Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-muted">
              Monitoring active client inquiries, revenue pipelines, and server health.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-warm-white dark:bg-graphite border border-border flex items-center gap-2 text-xs">
              <Database className="w-4 h-4 text-green-500" />
              <span className="text-slate-muted">MongoDB:</span>
              <span className="font-bold text-green-600 dark:text-green-400">Connected</span>
            </div>
            <div className="p-2.5 rounded-xl bg-warm-white dark:bg-graphite border border-border flex items-center gap-2 text-xs">
              <Server className="w-4 h-4 text-gold" />
              <span className="text-slate-muted">API Port:</span>
              <span className="font-mono font-bold text-charcoal dark:text-warm-white">5000</span>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-charcoal border border-border shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-muted mb-2">Total Inquiries (MTD)</div>
            <div className="text-3xl font-extrabold text-charcoal dark:text-warm-white font-heading">38 Leads</div>
            <div className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" /> +24% vs last month
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-charcoal border border-border shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-muted mb-2">Active Deal Pipeline</div>
            <div className="text-3xl font-extrabold text-gold font-heading">₹12.4 Lakhs</div>
            <div className="text-xs text-slate-muted mt-2">6 high-ticket proposals active</div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-charcoal border border-border shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-muted mb-2">Deployments (FY 2025)</div>
            <div className="text-3xl font-extrabold text-charcoal dark:text-warm-white font-heading">50+ Complete</div>
            <div className="text-xs text-slate-muted mt-2">99% verified satisfaction</div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-charcoal border border-border shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-muted mb-2">Average Turnaround</div>
            <div className="text-3xl font-extrabold text-charcoal dark:text-warm-white font-heading">&lt; 15 Mins</div>
            <div className="text-xs text-slate-muted mt-2">First response on WhatsApp</div>
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <h3 className="text-xl font-bold text-charcoal dark:text-warm-white font-heading">
                Recent Business Inquiries & Leads
              </h3>
              <p className="text-xs text-slate-muted">Generated via website contact forms and WhatsApp gateways</p>
            </div>
            <Link
              href="/contact"
              className="text-xs font-bold text-gold hover:underline flex items-center gap-1"
            >
              Test Form Submission <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
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
                  <th className="py-3 px-4 text-right">Direct Channels</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-warm-white/50 dark:hover:bg-graphite/40">
                    <td className="py-4 px-4 font-mono font-bold text-charcoal dark:text-warm-white">{inq.id}</td>
                    <td className="py-4 px-4 font-bold text-charcoal dark:text-warm-white">{inq.name}</td>
                    <td className="py-4 px-4 text-slate-muted font-medium">{inq.company}</td>
                    <td className="py-4 px-4 font-semibold text-charcoal dark:text-warm-white">{inq.service}</td>
                    <td className="py-4 px-4 text-gold font-bold">{inq.budget}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          inq.status === "New"
                            ? "bg-blue-500/10 text-blue-600"
                            : inq.status === "Converted"
                            ? "bg-green-500/10 text-green-600"
                            : "bg-gold/15 text-gold"
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
    </div>
  );
}
