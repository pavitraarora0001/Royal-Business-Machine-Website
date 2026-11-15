"use client";

import { useState } from "react";
import {
  FolderGit2,
  Plus,
  Search,
  Edit,
  Trash2,
  Copy,
  X,
  Star
} from "lucide-react";
import { adminApi } from "@/lib/admin-api";

interface ProjectItem {
  _id?: string;
  id?: string | number;
  title: string;
  category: string;
  client: string;
  contractValue?: string;
  description: string;
  challenge?: string;
  solution?: string;
  outcome: string;
  technologies: string[];
  featured?: boolean;
  isActive?: boolean;
  projectUrl?: string;
}

export function PortfolioTab() {
  const [projects, setProjects] = useState<ProjectItem[]>([
    {
      id: "prj-1",
      title: "Dairy Muneem — Milk Procurement & Logistics App",
      category: "Mobile Apps",
      client: "Regional Dairy Cooperative & Procurement Centers",
      contractValue: "₹2,50,000 Contract",
      description: "End-to-end mobile logistics software featuring a real-time Milk Fat and SNF computational pricing engine.",
      outcome: "Reduced procurement calculation errors by 98%; operates offline seamlessly across 40+ rural collection centers.",
      technologies: ["React Native", "Node.js", "Express", "MongoDB", "SMS Gateway"],
      featured: true,
      isActive: true,
    },
    {
      id: "prj-2",
      title: "HMS — Multi-Specialty Hospital Management System",
      category: "Enterprise Software",
      client: "Private Healthcare Group & Clinical Centers",
      contractValue: "₹3,50,000 Contract",
      description: "Centralized hospital ERP featuring electronic health records (EHR), OPD/IPD flows, doctor prescription pads, and lab reports.",
      outcome: "Cut patient discharge waiting times from 3 hours to under 25 minutes; eliminated paper chart losses entirely.",
      technologies: ["React", "Next.js", "PostgreSQL", "RBAC", "Docker", "HL7 Standard"],
      featured: true,
      isActive: true,
    },
    {
      id: "prj-3",
      title: "Govt College Bharatpur — Official Institutional Portal",
      category: "Government & Education",
      client: "Government College, Bharatpur (Higher Education Dept)",
      contractValue: "₹50,000 Contract",
      description: "High-security institutional web portal featuring automated student noticeboard PDF dispatches and admissions inquiry workflows.",
      outcome: "Handled over 100,000 concurrent page requests during annual examination cycles with 100% server uptime.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "WCAG 2.1 Accessibility", "Cloud CDN"],
      featured: true,
      isActive: true,
    },
    {
      id: "prj-4",
      title: "NyayaSetu — AI Legal Awareness & FIR Assistant",
      category: "Enterprise Software",
      client: "E-Governance Pilot & Legal Aid Platforms",
      contractValue: "Proprietary IP",
      description: "AI-powered, SaaS e-governance platform mapping citizen incident narratives into verified IPC/BNS sections.",
      outcome: "Significantly reduces FIR preparation times while maintaining strict human-in-the-loop legal explainability.",
      technologies: ["Python", "FastEmbed", "Next.js", "PostgreSQL", "Deterministic Rule Engine"],
      featured: true,
      isActive: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);

  const [formData, setFormData] = useState<Partial<ProjectItem>>({
    title: "",
    category: "Enterprise Software",
    client: "",
    contractValue: "",
    description: "",
    outcome: "",
    technologies: [],
    featured: false,
    isActive: true,
  });

  const [techInput, setTechInput] = useState("");

  const categories = [
    "All",
    "Enterprise Software",
    "Mobile Apps",
    "Websites & E-Commerce",
    "Government & Education",
    "Branding & Printing",
  ];

  const filtered = projects.filter((p) => {
    const matchCat = selectedCategory === "All" || p.category === selectedCategory;
    const matchSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.client.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleOpenAddModal = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      category: "Enterprise Software",
      client: "",
      contractValue: "",
      description: "",
      outcome: "",
      technologies: ["Next.js", "React", "Node.js"],
      featured: false,
      isActive: true,
    });
    setTechInput("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (project: ProjectItem) => {
    setEditingProject(project);
    setFormData({ ...project });
    setTechInput("");
    setIsModalOpen(true);
  };

  const handleDelete = (id?: string | number) => {
    if (!id) return;
    if (confirm("Are you sure you want to remove this project?")) {
      setProjects(projects.filter((p) => (p._id || p.id) !== id));
      adminApi.deletePortfolio(id.toString());
    }
  };

  const handleDuplicate = (project: ProjectItem) => {
    const duplicated: ProjectItem = {
      ...project,
      id: `prj-${Date.now()}`,
      title: `${project.title} (Copy)`,
    };
    setProjects([...projects, duplicated]);
    adminApi.createPortfolio(duplicated);
  };

  const handleToggleFeatured = (id?: string | number) => {
    if (!id) return;
    setProjects(
      projects.map((p) => {
        if ((p._id || p.id) === id) {
          const updated = { ...p, featured: !p.featured };
          adminApi.updatePortfolio(id.toString(), { isFeatured: updated.featured });
          return updated;
        }
        return p;
      })
    );
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.client) return;

    if (editingProject) {
      const updatedList = projects.map((p) => {
        if ((p._id || p.id) === (editingProject._id || editingProject.id)) {
          return { ...p, ...formData } as ProjectItem;
        }
        return p;
      });
      setProjects(updatedList);
      adminApi.updatePortfolio(
        (editingProject._id || editingProject.id) as string,
        formData
      );
    } else {
      const newPrj: ProjectItem = {
        ...formData,
        id: `prj-${Date.now()}`,
      } as ProjectItem;
      setProjects([...projects, newPrj]);
      adminApi.createPortfolio(newPrj);
    }

    setIsModalOpen(false);
  };

  const addTechTag = () => {
    if (techInput.trim() && formData.technologies) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()],
      });
      setTechInput("");
    }
  };

  const removeTechTag = (index: number) => {
    if (formData.technologies) {
      setFormData({
        ...formData,
        technologies: formData.technologies.filter((_, i) => i !== index),
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/20 mb-2">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Case Studies & Deployments</span>
          </div>
          <h2 className="text-2xl font-extrabold text-charcoal dark:text-warm-white font-heading">
            Portfolio Management ({projects.length})
          </h2>
          <p className="text-xs text-slate-muted">
            Manage authentic client deliveries, verified outcomes, and technical stack specifications.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gold text-charcoal text-xs font-bold uppercase tracking-wider hover:bg-gold-light transition-all shadow-md shadow-gold/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project / Case Study</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-charcoal border border-border flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search project title or client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-muted mr-1 shrink-0">
            Category:
          </span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Projects Grid Table */}
      <div className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-slate-muted uppercase tracking-wider">
                <th className="py-3 px-4">Project Title</th>
                <th className="py-3 px-4">Client / Institution</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Contract Value</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((project, idx) => (
                <tr key={project._id || project.id || idx} className="hover:bg-warm-white/50 dark:hover:bg-graphite/40 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-bold text-charcoal dark:text-warm-white text-sm">
                      {project.title}
                    </div>
                    <div className="text-[11px] text-slate-muted line-clamp-1 max-w-sm mt-0.5">
                      {project.outcome}
                    </div>
                  </td>
                  <td className="py-4 px-4 font-semibold text-slate-muted">{project.client}</td>
                  <td className="py-4 px-4">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/20">
                      {project.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-gold">{project.contractValue || "Enterprise"}</td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleToggleFeatured(project._id || project.id)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        project.featured
                          ? "bg-gold/20 text-gold border-gold/40"
                          : "border-border text-slate-400 hover:text-gold"
                      }`}
                      title={project.featured ? "Featured on public homepage" : "Set as featured"}
                    >
                      <Star className={`w-3.5 h-3.5 ${project.featured ? "fill-gold text-gold" : ""}`} />
                    </button>
                  </td>
                  <td className="py-4 px-4 text-right space-x-1.5">
                    <button
                      onClick={() => handleOpenEditModal(project)}
                      className="p-1.5 rounded-lg border border-border text-slate-muted hover:text-gold hover:border-gold transition-colors"
                      title="Edit Project"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDuplicate(project)}
                      className="p-1.5 rounded-lg border border-border text-slate-muted hover:text-blue-500 hover:border-blue-500 transition-colors"
                      title="Duplicate Project"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(project._id || project.id)}
                      className="p-1.5 rounded-lg border border-border text-slate-muted hover:text-red-500 hover:border-red-500 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white dark:bg-charcoal border border-border rounded-3xl p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h3 className="text-xl font-bold text-charcoal dark:text-warm-white font-heading">
                {editingProject ? "Edit Portfolio Case Study" : "Add New Deployment"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-slate-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-warm-white block mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Dairy Muneem Milk App"
                  className="w-full px-4 py-2.5 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-warm-white block mb-1">
                    Client / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="e.g. Apex Hospital / College"
                    className="w-full px-4 py-2.5 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-warm-white block mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs text-charcoal dark:text-warm-white"
                  >
                    {categories.filter((c) => c !== "All").map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-warm-white block mb-1">
                  Contract Value (Optional)
                </label>
                <input
                  type="text"
                  value={formData.contractValue || ""}
                  onChange={(e) => setFormData({ ...formData, contractValue: e.target.value })}
                  placeholder="e.g. ₹2,50,000 Contract or Proprietary IP"
                  className="w-full px-4 py-2.5 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-warm-white block mb-1">
                  Project Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Overview of the system architecture and features..."
                  className="w-full px-4 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-warm-white block mb-1">
                  Verified Outcome & Impact
                </label>
                <textarea
                  rows={2}
                  value={formData.outcome}
                  onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                  placeholder="e.g. 98% reduction in errors; sustained 100k concurrent page views..."
                  className="w-full px-4 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-warm-white block mb-1">
                  Technologies Used
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="e.g. Next.js, Node.js"
                    className="flex-1 px-3 py-1.5 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs"
                  />
                  <button
                    type="button"
                    onClick={addTechTag}
                    className="px-3 py-1.5 rounded-xl bg-gold/15 text-gold border border-gold/30 text-xs font-bold"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {formData.technologies?.map((t, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-warm-white dark:bg-graphite border border-border text-[11px] text-charcoal dark:text-warm-white"
                    >
                      <span>{t}</span>
                      <button
                        type="button"
                        onClick={() => removeTechTag(idx)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded text-gold focus:ring-gold"
                  />
                  <span className="text-charcoal dark:text-warm-white">Featured Showcase Card</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-border text-xs font-semibold text-slate-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gold text-charcoal text-xs font-bold uppercase tracking-wider hover:bg-gold-light transition-all shadow-md"
                >
                  {editingProject ? "Save Changes" : "Create Deployment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
