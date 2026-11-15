"use client";

import { useState } from "react";
import {
  MessageSquareQuote,
  Plus,
  Edit,
  Trash2,
  Star,
  X
} from "lucide-react";
import { adminApi } from "@/lib/admin-api";

interface TestimonialItem {
  id: string;
  clientName: string;
  company: string;
  designation?: string;
  testimonial: string;
  rating: number;
  verifiedProject?: string;
  isActive: boolean;
}

export function ClientsTab() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([
    {
      id: "t-1",
      clientName: "Dr. Vikram Seth",
      company: "Regional Medical Institute & Specialty Clinics",
      designation: "Medical Director",
      testimonial: "Royal Business Machine delivered our complete Hospital Management System on schedule. Patient discharge waiting times dropped from 3 hours to under 25 minutes.",
      rating: 5,
      verifiedProject: "HMS Hospital Management System",
      isActive: true,
    },
    {
      id: "t-2",
      clientName: "M. Choudhary",
      company: "Regional Dairy Cooperative Federation",
      designation: "Operations Head",
      testimonial: "Dairy Muneem operates flawlessly across 40+ rural collection centers, even with spotty cellular coverage. Farmer ledger disputes have been completely eliminated.",
      rating: 5,
      verifiedProject: "Dairy Muneem Logistics App",
      isActive: true,
    },
    {
      id: "t-3",
      clientName: "Principal Officer",
      company: "Government College Bharatpur",
      designation: "Higher Education Administration",
      testimonial: "During peak examination announcements, our college website effortlessly sustained 100,000+ simultaneous visitors with zero server downtime. Exemplary engineering.",
      rating: 5,
      verifiedProject: "Official College Web Portal",
      isActive: true,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [formData, setFormData] = useState<Partial<TestimonialItem>>({
    clientName: "",
    company: "",
    designation: "",
    testimonial: "",
    rating: 5,
    verifiedProject: "",
    isActive: true,
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      clientName: "",
      company: "",
      designation: "",
      testimonial: "",
      rating: 5,
      verifiedProject: "",
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: TestimonialItem) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this testimonial?")) {
      setTestimonials(testimonials.filter((t) => t.id !== id));
      adminApi.deleteTestimonial(id);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.testimonial) return;

    if (editingItem) {
      setTestimonials(
        testimonials.map((t) => (t.id === editingItem.id ? { ...t, ...formData } as TestimonialItem : t))
      );
      adminApi.updateTestimonial(editingItem.id, formData);
    } else {
      const newItem: TestimonialItem = {
        ...formData,
        id: `t-${Date.now()}`,
      } as TestimonialItem;
      setTestimonials([...testimonials, newItem]);
      adminApi.createTestimonial(newItem);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/20 mb-2">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Institutional Social Proof</span>
          </div>
          <h2 className="text-2xl font-extrabold text-charcoal dark:text-warm-white font-heading">
            Clients & Testimonials ({testimonials.length})
          </h2>
          <p className="text-xs text-slate-muted">
            Manage verified client reviews, institutional references, and partner ratings.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gold text-charcoal text-xs font-bold uppercase tracking-wider hover:bg-gold-light transition-all shadow-md shadow-gold/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Client Review</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold" />
                  ))}
                </div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                  Verified
                </span>
              </div>

              <p className="text-xs text-slate-muted leading-relaxed italic mb-4">
                &ldquo;{item.testimonial}&rdquo;
              </p>

              <div>
                <div className="text-sm font-bold text-charcoal dark:text-warm-white font-heading">
                  {item.clientName}
                </div>
                <div className="text-xs text-gold font-semibold">{item.designation}</div>
                <div className="text-[11px] text-slate-muted">{item.company}</div>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between">
              <span className="text-[11px] text-slate-muted font-mono">{item.verifiedProject}</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-1.5 rounded-lg border border-border text-slate-muted hover:text-gold"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-lg border border-border text-slate-muted hover:text-red-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white dark:bg-charcoal border border-border rounded-3xl p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="text-lg font-bold text-charcoal dark:text-warm-white font-heading">
                {editingItem ? "Edit Testimonial" : "Add Client Testimonial"}
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-slate-muted" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold uppercase tracking-wider block mb-1">Client Name *</label>
                <input
                  type="text"
                  required
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white"
                />
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider block mb-1">Company / Institution *</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold uppercase tracking-wider block mb-1">Designation</label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white"
                  />
                </div>
                <div>
                  <label className="font-bold uppercase tracking-wider block mb-1">Rating (1-5)</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white"
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>
                        {r} Stars
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider block mb-1">Testimonial Quote *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.testimonial}
                  onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white leading-relaxed"
                />
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider block mb-1">Verified Project Name</label>
                <input
                  type="text"
                  value={formData.verifiedProject}
                  onChange={(e) => setFormData({ ...formData, verifiedProject: e.target.value })}
                  placeholder="e.g. Dairy Muneem Mobile App"
                  className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border text-slate-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gold text-charcoal font-bold uppercase tracking-wider shadow-md"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
