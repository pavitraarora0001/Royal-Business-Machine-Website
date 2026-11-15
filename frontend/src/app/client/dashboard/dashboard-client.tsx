"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  Download,
  MessageSquare,
  ShieldCheck
} from "lucide-react";

export function ClientDashboardClient() {
  const [activeTab, setActiveTab] = useState<"projects" | "invoices" | "support">("projects");

  const milestones = [
    { title: "Phase 1: Discovery & Requirements Specification", status: "completed", date: "Oct 15, 2026" },
    { title: "Phase 2: System Architecture & Schema Blueprint", status: "completed", date: "Oct 24, 2026" },
    { title: "Phase 3: High-Fidelity Figma UI/UX Design System", status: "completed", date: "Nov 02, 2026" },
    { title: "Phase 4: Full-Stack Agile Development Sprint", status: "in-progress", date: "Target: Nov 20, 2026" },
    { title: "Phase 5: User Acceptance QA & Security Audit", status: "pending", date: "Target: Nov 28, 2026" },
    { title: "Phase 6: Production Launch & DNS Migration", status: "pending", date: "Target: Dec 05, 2026" },
  ];

  const invoices = [
    { id: "INV-RBM-2026-089", desc: "Commencement Deposit (Phase 1-3)", amount: "₹1,25,000", date: "Oct 15, 2026", status: "Paid" },
    { id: "INV-RBM-2026-104", desc: "Mid-Term Milestone (Phase 4 Development)", amount: "₹1,25,000", date: "Nov 15, 2026", status: "Pending" },
  ];

  return (
    <div className="min-h-screen bg-warm-white dark:bg-charcoal/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Banner */}
        <div className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/25">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Active Enterprise Client Account</span>
            </div>
            <h1 className="text-3xl font-extrabold text-charcoal dark:text-warm-white font-heading">
              Welcome to Your Client Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-muted">
              Monitoring active software deliverables, milestone completions, and payment ledgers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/919057287689"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider hover:scale-105 transition-all shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Priority WhatsApp</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-charcoal dark:bg-gold text-warm-white dark:text-charcoal font-bold text-xs uppercase tracking-wider hover:bg-gold transition-colors"
            >
              <span>Submit Ticket</span>
            </Link>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex items-center gap-2 border-b border-border pb-3">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "projects"
                ? "bg-charcoal text-warm-white dark:bg-gold dark:text-charcoal shadow-sm"
                : "text-slate-muted hover:text-charcoal dark:hover:text-white"
            }`}
          >
            Project Tracker (75% Complete)
          </button>
          <button
            onClick={() => setActiveTab("invoices")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === "invoices"
                ? "bg-charcoal text-warm-white dark:bg-gold dark:text-charcoal shadow-sm"
                : "text-slate-muted hover:text-charcoal dark:hover:text-white"
            }`}
          >
            Invoices & Billing
          </button>
        </div>

        {/* Tab 1: Project Tracker */}
        {activeTab === "projects" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 p-8 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h3 className="text-xl font-bold text-charcoal dark:text-warm-white font-heading">
                    Active Deployment: Enterprise Web & Mobile Platform
                  </h3>
                  <p className="text-xs text-slate-muted">Project ID: #RBM-PRJ-2026-042</p>
                </div>
                <span className="text-xs font-bold text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
                  On Schedule
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-charcoal dark:text-warm-white">
                  <span>Overall Delivery Progress</span>
                  <span>75%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-warm-white dark:bg-graphite overflow-hidden">
                  <div className="h-full bg-gold rounded-full w-3/4 transition-all duration-500" />
                </div>
              </div>

              {/* Milestones List */}
              <div className="space-y-3 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-muted">Milestone Breakdown</h4>
                {milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-warm-white/70 dark:bg-graphite/40 border border-border flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      {m.status === "completed" ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      ) : m.status === "in-progress" ? (
                        <Clock className="w-5 h-5 text-gold shrink-0 animate-pulse" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-border shrink-0" />
                      )}
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-charcoal dark:text-warm-white font-heading">
                          {m.title}
                        </div>
                        <div className="text-[11px] text-slate-muted">{m.date}</div>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        m.status === "completed"
                          ? "bg-green-500/10 text-green-600"
                          : m.status === "in-progress"
                          ? "bg-gold/15 text-gold"
                          : "bg-slate-500/10 text-slate-muted"
                      }`}
                    >
                      {m.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contacts Box */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-7 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-charcoal dark:text-warm-white font-heading">
                  Dedicated Account Lead
                </h3>
                <div className="p-4 rounded-2xl bg-warm-white dark:bg-graphite space-y-2">
                  <div className="font-bold text-sm text-charcoal dark:text-warm-white">Pavitra Arora</div>
                  <div className="text-xs text-gold">Executive Strategy & Technical Director</div>
                  <div className="text-xs text-slate-muted">Direct Phone: +91 9057287689</div>
                  <div className="text-xs text-slate-muted truncate">Email: royalbusinessmachine@gmail.com</div>
                </div>

                <a
                  href="https://wa.me/919057287689"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Direct WhatsApp Line</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Invoices */}
        {activeTab === "invoices" && (
          <div className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-charcoal dark:text-warm-white font-heading">
              Commercial Invoices & Payment Ledger
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border text-slate-muted uppercase tracking-wider">
                    <th className="py-3 px-4">Invoice ID</th>
                    <th className="py-3 px-4">Milestone Description</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Billing Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {invoices.map((inv, idx) => (
                    <tr key={idx} className="hover:bg-warm-white/50 dark:hover:bg-graphite/40">
                      <td className="py-4 px-4 font-mono font-bold text-charcoal dark:text-warm-white">{inv.id}</td>
                      <td className="py-4 px-4 text-slate-muted font-medium">{inv.desc}</td>
                      <td className="py-4 px-4 font-bold text-charcoal dark:text-warm-white">{inv.amount}</td>
                      <td className="py-4 px-4 text-slate-muted">{inv.date}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            inv.status === "Paid" ? "bg-green-500/10 text-green-600" : "bg-gold/15 text-gold"
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => alert(`Downloading official PDF invoice for ${inv.id}`)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-charcoal dark:text-warm-white hover:border-gold hover:text-gold transition-colors font-semibold"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>PDF</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
