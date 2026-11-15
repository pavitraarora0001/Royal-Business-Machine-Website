"use client";

import { useState } from "react";
import {
  Inbox,
  Search,
  Phone,
  Mail,
  MessageSquare,
  Download,
  X,
  Send
} from "lucide-react";
import { adminApi } from "@/lib/admin-api";

interface InquiryRecord {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  service: string;
  budget?: string;
  message: string;
  status: "New" | "Contacted" | "Qualified" | "Proposal Sent" | "Negotiation" | "Converted" | "Rejected";
  date: string;
  assignedTo?: string;
  notes?: Array<{ text: string; date: string; author: string }>;
}

export function InquiriesTab() {
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([
    {
      id: "INQ-2026-112",
      name: "Dr. Vikram Seth",
      company: "Regional Medical Institute & Specialty Clinics",
      email: "vikram@medinstitute.org",
      phone: "+91 9829012345",
      service: "IT & Custom Software Development",
      budget: "₹3,50,000 Contract",
      message: "We need an integrated hospital management system with OPD, pharmacy inventory, and lab report QR verification.",
      status: "New",
      date: "Nov 14, 2026",
      assignedTo: "Pavitra Arora",
      notes: [
        { text: "Initial high-ticket inquiry received from healthcare federation.", date: "Nov 14, 2026", author: "System" },
      ],
    },
    {
      id: "INQ-2026-111",
      name: "Anil Singhania",
      company: "Singhania Agro Products Ltd",
      email: "anil@singhaniaagro.in",
      phone: "+91 9414056789",
      service: "Website & E-Commerce Engineering",
      budget: "₹1,50,000",
      message: "Looking for direct-to-consumer B2B ordering portal for commodity distribution with automated GST invoice generation.",
      status: "Contacted",
      date: "Nov 13, 2026",
      assignedTo: "Technical Operations",
      notes: [
        { text: "Spoke via WhatsApp. Sent company deck and e-commerce case studies.", date: "Nov 13, 2026", author: "Technical Operations" },
      ],
    },
    {
      id: "INQ-2026-110",
      name: "M. Choudhary",
      company: "District Dairy Federation",
      email: "mchoudhary@dairyfed.co.in",
      phone: "+91 9001122334",
      service: "Mobile App Development",
      budget: "₹2,50,000",
      message: "Require custom mobile fat/snf calculation software similar to Dairy Muneem for 40 collection centers.",
      status: "Converted",
      date: "Nov 11, 2026",
      assignedTo: "Pavitra Arora",
      notes: [
        { text: "Contract signed and initial 50% deposit received. Sprint started.", date: "Nov 12, 2026", author: "Pavitra Arora" },
      ],
    },
    {
      id: "INQ-2026-109",
      name: "Pooja Verma",
      company: "Verma Law Chambers",
      email: "pooja@vermalaw.in",
      phone: "+91 9784561230",
      service: "Advanced AI & Institutional Tech",
      budget: "Custom Institutional",
      message: "Interested in NyayaSetu legal drafting assistant pilot for municipal legal aid.",
      status: "Proposal Sent",
      date: "Nov 09, 2026",
      assignedTo: "Pavitra Arora",
      notes: [
        { text: "Technical architecture proposal submitted. Awaiting board review.", date: "Nov 10, 2026", author: "Pavitra Arora" },
      ],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [activeModalInquiry, setActiveModalInquiry] = useState<InquiryRecord | null>(null);
  const [newNoteText, setNewNoteText] = useState("");

  const statusOptions = [
    "All",
    "New",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Negotiation",
    "Converted",
    "Rejected",
  ];

  const filtered = inquiries.filter((inq) => {
    const matchStatus = selectedStatus === "All" || inq.status === selectedStatus;
    const matchSearch =
      inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inq.company || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.phone.includes(searchTerm) ||
      inq.service.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleStatusChange = (id: string, newStatus: InquiryRecord["status"]) => {
    setInquiries(
      inquiries.map((inq) => {
        if (inq.id === id) {
          const updated = { ...inq, status: newStatus };
          adminApi.updateLeadStatus(id, newStatus.toLowerCase().replace(" ", "-"));
          return updated;
        }
        return inq;
      })
    );
    if (activeModalInquiry && activeModalInquiry.id === id) {
      setActiveModalInquiry({ ...activeModalInquiry, status: newStatus });
    }
  };

  const handleAddNote = () => {
    if (!newNoteText.trim() || !activeModalInquiry) return;

    const newNote = {
      text: newNoteText.trim(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      author: "Pavitra Arora",
    };

    const updatedNotes = [...(activeModalInquiry.notes || []), newNote];
    const updatedInquiry = { ...activeModalInquiry, notes: updatedNotes };

    setInquiries(
      inquiries.map((inq) => (inq.id === activeModalInquiry.id ? updatedInquiry : inq))
    );
    setActiveModalInquiry(updatedInquiry);
    setNewNoteText("");

    adminApi.addLeadNote(activeModalInquiry.id, newNote.text);
  };

  const handleExportCsv = () => {
    let csv = "Lead ID,Name,Company,Email,Phone,Service,Budget,Status,Date,Message\n";
    inquiries.forEach((inq) => {
      csv += `"${inq.id}","${inq.name}","${inq.company || ""}","${inq.email}","${inq.phone}","${inq.service}","${inq.budget || ""}","${inq.status}","${inq.date}","${(inq.message || "").replace(/"/g, '""')}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `rbm_inquiries_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/20 mb-2">
            <Inbox className="w-3.5 h-3.5" />
            <span>Real-Time CRM & Lead Tracking</span>
          </div>
          <h2 className="text-2xl font-extrabold text-charcoal dark:text-warm-white font-heading">
            Inquiries & Lead Management ({inquiries.length})
          </h2>
          <p className="text-xs text-slate-muted">
            Manage incoming proposals, contact desk messages, and lead conversion lifecycles.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-charcoal dark:bg-gold text-warm-white dark:text-charcoal text-xs font-bold uppercase tracking-wider hover:bg-gold transition-colors shadow-sm"
        >
          <Download className="w-4 h-4" />
          <span>Export Leads CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-charcoal border border-border flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, company, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-muted mr-1 shrink-0">
            Pipeline Stage:
          </span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs text-charcoal dark:text-warm-white"
          >
            {statusOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm overflow-hidden">
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
                <th className="py-3 px-4 text-right">Quick Channels</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((inq) => (
                <tr
                  key={inq.id}
                  onClick={() => setActiveModalInquiry(inq)}
                  className="hover:bg-warm-white/50 dark:hover:bg-graphite/40 transition-colors cursor-pointer"
                >
                  <td className="py-4 px-4 font-mono font-bold text-charcoal dark:text-warm-white">
                    {inq.id}
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-bold text-charcoal dark:text-warm-white text-sm">
                      {inq.name}
                    </div>
                    <div className="text-[11px] text-slate-muted">{inq.date}</div>
                  </td>
                  <td className="py-4 px-4 font-semibold text-slate-muted">{inq.company || "Individual"}</td>
                  <td className="py-4 px-4 font-semibold text-charcoal dark:text-warm-white">{inq.service}</td>
                  <td className="py-4 px-4 font-bold text-gold">{inq.budget || "Unspecified"}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        inq.status === "New"
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                          : inq.status === "Converted"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          : inq.status === "Proposal Sent"
                          ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                          : inq.status === "Rejected"
                          ? "bg-red-500/10 text-red-600 border border-red-500/20"
                          : "bg-gold/15 text-gold border border-gold/30"
                      }`}
                    >
                      {inq.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                    <a
                      href={`https://wa.me/${inq.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                        `Hello ${inq.name}, thank you for contacting Royal Business Machine regarding ${inq.service}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex p-1.5 rounded-lg border border-border text-slate-muted hover:text-[#25D366] hover:border-[#25D366] transition-colors"
                      title="Direct WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={`tel:${inq.phone}`}
                      className="inline-flex p-1.5 rounded-lg border border-border text-slate-muted hover:text-gold hover:border-gold transition-colors"
                      title={inq.phone}
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={`mailto:${inq.email}?subject=Project%20Scope%20-%20Royal%20Business%20Machine`}
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

      {/* Inquiry Detail & CRM Modal Drawer */}
      {activeModalInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white dark:bg-charcoal border border-border rounded-3xl p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div>
                <span className="font-mono text-xs font-bold text-gold uppercase">{activeModalInquiry.id}</span>
                <h3 className="text-xl font-bold text-charcoal dark:text-warm-white font-heading">
                  {activeModalInquiry.name}
                </h3>
                <p className="text-xs text-slate-muted">{activeModalInquiry.company || "Individual Client"}</p>
              </div>

              <button
                onClick={() => setActiveModalInquiry(null)}
                className="p-1.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-slate-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Status Setter */}
            <div className="p-4 rounded-2xl bg-warm-white dark:bg-graphite/40 border border-border flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-muted">
                Pipeline Lifecycle:
              </span>
              <select
                value={activeModalInquiry.status}
                onChange={(e) =>
                  handleStatusChange(activeModalInquiry.id, e.target.value as InquiryRecord["status"])
                }
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-charcoal border border-border text-xs font-bold text-gold focus:outline-none"
              >
                {statusOptions.filter((s) => s !== "All").map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Client Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-muted uppercase font-bold text-[10px]">Direct Phone</span>
                <div className="font-bold text-charcoal dark:text-warm-white flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-gold" />
                  <a href={`tel:${activeModalInquiry.phone}`} className="hover:underline">
                    {activeModalInquiry.phone}
                  </a>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-muted uppercase font-bold text-[10px]">Email Address</span>
                <div className="font-bold text-charcoal dark:text-warm-white flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-gold" />
                  <a href={`mailto:${activeModalInquiry.email}`} className="hover:underline truncate">
                    {activeModalInquiry.email}
                  </a>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-muted uppercase font-bold text-[10px]">Interested Service</span>
                <div className="font-bold text-charcoal dark:text-warm-white">{activeModalInquiry.service}</div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-muted uppercase font-bold text-[10px]">Budget Window</span>
                <div className="font-bold text-gold">{activeModalInquiry.budget || "Unspecified"}</div>
              </div>
            </div>

            {/* Message Body */}
            <div className="space-y-1.5 pt-2">
              <span className="text-slate-muted uppercase font-bold text-[10px]">Original Inquiry Message</span>
              <div className="p-4 rounded-2xl bg-warm-white dark:bg-graphite/40 border border-border text-xs text-charcoal dark:text-warm-white leading-relaxed">
                {activeModalInquiry.message}
              </div>
            </div>

            {/* Internal CRM Notes */}
            <div className="space-y-3 pt-2">
              <span className="text-slate-muted uppercase font-bold text-[10px]">Internal Staff Notes</span>
              <div className="space-y-2 max-h-44 overflow-y-auto">
                {activeModalInquiry.notes?.map((n, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-warm-white/70 dark:bg-graphite/40 border border-border text-xs space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-muted">
                      <span className="font-bold text-charcoal dark:text-warm-white">{n.author}</span>
                      <span>{n.date}</span>
                    </div>
                    <p className="text-slate-muted">{n.text}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add private note or next action reminder..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddNote()}
                  className="flex-1 px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
                />
                <button
                  type="button"
                  onClick={handleAddNote}
                  className="px-4 py-2 rounded-xl bg-gold text-charcoal font-bold text-xs uppercase"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
