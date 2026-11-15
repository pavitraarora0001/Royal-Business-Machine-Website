"use client";

import { useState } from "react";
import {
  GraduationCap,
  Plus,
  Trash2,
  Clock,
  MapPin,
  X
} from "lucide-react";
import { adminApi } from "@/lib/admin-api";

interface CareerOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  desc: string;
  requirements: string[];
  isActive: boolean;
}

export function CareersTab() {
  const [openings, setOpenings] = useState<CareerOpening[]>([
    {
      id: "car-1",
      title: "Senior Full-Stack Software Engineer",
      department: "Engineering",
      location: "Bharatpur HQ / Hybrid",
      type: "Full-Time",
      experience: "3+ Years",
      desc: "Lead the architecture and implementation of Next.js 16, React 19, and Node.js microservices for our enterprise ERP and portal clients.",
      requirements: [
        "Extensive experience with TypeScript, Next.js, and Node.js",
        "Proficiency with PostgreSQL, MongoDB, and Redis caching",
        "Knowledge of Docker containers and CI/CD pipelines",
      ],
      isActive: true,
    },
    {
      id: "car-2",
      title: "UI/UX Product Designer",
      department: "Design & Brand",
      location: "Bharatpur HQ / Hybrid",
      type: "Full-Time",
      experience: "2+ Years",
      desc: "Craft luxury design systems, intuitive user flows, and interactive Figma prototypes across our corporate and SaaS product lines.",
      requirements: [
        "Mastery of Figma, component libraries, and design tokens",
        "Portfolio demonstrating responsive web ergonomics",
      ],
      isActive: true,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CareerOpening | null>(null);
  const [formData, setFormData] = useState<Partial<CareerOpening>>({
    title: "",
    department: "Engineering",
    location: "Bharatpur HQ / Hybrid",
    type: "Full-Time",
    experience: "2+ Years",
    desc: "",
    requirements: [],
    isActive: true,
  });
  const [reqInput, setReqInput] = useState("");

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      department: "Engineering",
      location: "Bharatpur HQ / Hybrid",
      type: "Full-Time",
      experience: "2+ Years",
      desc: "",
      requirements: [],
      isActive: true,
    });
    setReqInput("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: CareerOpening) => {
    setEditingItem(item);
    setFormData({ ...item });
    setReqInput("");
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Archive this job opening?")) {
      setOpenings(openings.filter((o) => o.id !== id));
      adminApi.deleteCareer(id);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.desc) return;

    if (editingItem) {
      setOpenings(
        openings.map((o) => (o.id === editingItem.id ? { ...o, ...formData } as CareerOpening : o))
      );
      adminApi.updateCareer(editingItem.id, formData);
    } else {
      const newOpening: CareerOpening = {
        ...formData,
        id: `car-${Date.now()}`,
      } as CareerOpening;
      setOpenings([...openings, newOpening]);
      adminApi.createCareer(newOpening);
    }

    setIsModalOpen(false);
  };

  const addReq = () => {
    if (reqInput.trim() && formData.requirements) {
      setFormData({
        ...formData,
        requirements: [...formData.requirements, reqInput.trim()],
      });
      setReqInput("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/20 mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Talent Acquisition</span>
          </div>
          <h2 className="text-2xl font-extrabold text-charcoal dark:text-warm-white font-heading">
            Career Opportunities & Open Roles ({openings.length})
          </h2>
          <p className="text-xs text-slate-muted">
            Manage public job postings, requirements, and applications on /careers.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gold text-charcoal text-xs font-bold uppercase tracking-wider hover:bg-gold-light transition-all shadow-md shadow-gold/20"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Opening</span>
        </button>
      </div>

      <div className="space-y-4">
        {openings.map((job) => (
          <div
            key={job.id}
            className="p-6 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold bg-gold/10 px-2.5 py-0.5 rounded-full border border-gold/20">
                  {job.department}
                </span>
                <span className="text-xs text-slate-muted flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-gold" />
                  <span>{job.location}</span>
                </span>
                <span className="text-xs text-slate-muted flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gold" />
                  <span>{job.type} • {job.experience}</span>
                </span>
              </div>

              <h3 className="text-lg font-bold text-charcoal dark:text-warm-white font-heading">
                {job.title}
              </h3>
              <p className="text-xs text-slate-muted leading-relaxed line-clamp-2">
                {job.desc}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleOpenEdit(job)}
                className="px-4 py-2 rounded-xl border border-border text-xs font-bold text-charcoal dark:text-warm-white hover:border-gold hover:text-gold transition-colors"
              >
                Edit Role
              </button>
              <button
                onClick={() => handleDelete(job.id)}
                className="p-2 rounded-xl border border-border text-slate-muted hover:text-red-500 hover:border-red-500 transition-colors"
                title="Archive opening"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white dark:bg-charcoal border border-border rounded-3xl p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="text-lg font-bold text-charcoal dark:text-warm-white font-heading">
                {editingItem ? "Edit Job Posting" : "Create Career Opening"}
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-slate-muted" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold uppercase tracking-wider block mb-1">Job Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold uppercase tracking-wider block mb-1">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border"
                  />
                </div>
                <div>
                  <label className="font-bold uppercase tracking-wider block mb-1">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider block mb-1">Job Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white leading-relaxed"
                />
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider block mb-1">Key Requirements</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={reqInput}
                    onChange={(e) => setReqInput(e.target.value)}
                    placeholder="e.g. 3+ years experience with Next.js"
                    className="flex-1 px-3 py-1.5 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs"
                  />
                  <button
                    type="button"
                    onClick={addReq}
                    className="px-3 py-1.5 rounded-xl bg-gold/15 text-gold border border-gold/30 text-xs font-bold"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-1">
                  {formData.requirements?.map((req, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-warm-white dark:bg-graphite text-[11px]"
                    >
                      <span>{req}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            requirements: formData.requirements?.filter((_, i) => i !== idx),
                          })
                        }
                        className="text-slate-400 hover:text-red-500"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
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
                  Post Opening
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
