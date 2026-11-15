"use client";

import { useState, useEffect } from "react";
import {
  FolderGit2,
  Plus,
  Search,
  Edit,
  Trash2,
  X,
  Star,
  Layers,
  Eye,
  SlidersHorizontal,
  FolderPlus,
} from "lucide-react";
import { adminApi } from "@/lib/admin-api";
import {
  PORTFOLIO_PROJECTS,
  PORTFOLIO_CATEGORIES,
  PortfolioCategory,
} from "@/data/portfolio-data";

interface AdminProjectItem {
  _id?: string;
  id?: string | number;
  slug?: string;
  title: string;
  category: string;
  categories: string[];
  client: string;
  industry?: string;
  contractValue?: string;
  projectDate?: string;
  duration?: string;
  teamSize?: number;
  description: string;
  requirements?: string;
  challenge?: string;
  solution?: string;
  outcome: string;
  results?: string;
  technologies: string[];
  coverImage?: string;
  gallery?: string[];
  featured?: boolean;
  isActive?: boolean;
  projectUrl?: string;
}

export function PortfolioTab() {
  const [activeSubTab, setActiveSubTab] = useState<"projects" | "categories">("projects");

  // Project state initialized with the 16 authentic project deployments
  const [projects, setProjects] = useState<AdminProjectItem[]>(() =>
    PORTFOLIO_PROJECTS.map((p) => ({
      _id: String(p.id),
      id: p.id,
      slug: p.slug,
      title: p.title,
      category: p.primaryCategory || p.categories[0] || "Web Solutions",
      categories: p.categories || [p.primaryCategory],
      client: p.client,
      industry: p.industry,
      contractValue: p.contractValue,
      projectDate: p.projectDate,
      duration: p.duration,
      teamSize: p.teamSize,
      description: p.description,
      requirements: p.requirements,
      challenge: p.challenge,
      solution: p.solution,
      outcome: p.outcome,
      results: p.outcome,
      technologies: p.technologies,
      coverImage: p.coverImage,
      gallery: p.gallery,
      featured: p.featured,
      isActive: p.isActive,
      projectUrl: p.projectUrl,
    }))
  );

  // Categories state initialized with 5 core categories
  const [categories, setCategories] = useState<PortfolioCategory[]>(PORTFOLIO_CATEGORIES);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Project Modal State
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<AdminProjectItem | null>(null);
  const [formData, setFormData] = useState<Partial<AdminProjectItem>>({
    title: "",
    category: "Application Development",
    categories: ["Application Development"],
    client: "",
    industry: "",
    contractValue: "",
    projectDate: "2024",
    duration: "",
    description: "",
    requirements: "",
    challenge: "",
    solution: "",
    outcome: "",
    technologies: [],
    coverImage: "",
    featured: false,
    isActive: true,
  });
  const [techInput, setTechInput] = useState("");

  // Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<PortfolioCategory | null>(null);
  const [categoryFormData, setCategoryFormData] = useState<Partial<PortfolioCategory>>({
    name: "",
    shortLabel: "",
    slug: "",
    description: "",
    subdisciplines: [],
    icon: "Folder",
    order: 1,
  });
  const [subdisciplineInput, setSubdisciplineInput] = useState("");

  // Fetch from backend API on mount if live
  useEffect(() => {
    async function loadBackendData() {
      try {
        const catRes = (await adminApi.getPortfolioCategories()) as {
          success?: boolean;
          data?: { categories?: PortfolioCategory[] };
        };
        if (catRes?.data?.categories && catRes.data.categories.length > 0) {
          setCategories(catRes.data.categories);
        }

        const prjRes = (await adminApi.getPortfolio()) as {
          success?: boolean;
          data?: { portfolioItems?: AdminProjectItem[] };
        };
        if (prjRes?.data?.portfolioItems && prjRes.data.portfolioItems.length > 0) {
          setProjects(prjRes.data.portfolioItems);
        }
      } catch {
        // Fallback to initial authentic records
      }
    }
    loadBackendData();
  }, []);

  // Filtered projects
  const filtered = projects.filter((p) => {
    const matchCat =
      selectedCategory === "All" ||
      p.category === selectedCategory ||
      (p.categories && p.categories.includes(selectedCategory));
    const matchSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchCat && matchSearch;
  });

  // Project Actions
  const handleOpenAddProject = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      category: "Application Development",
      categories: ["Application Development"],
      client: "",
      industry: "Enterprise Technology",
      contractValue: "Custom Scope",
      projectDate: "2024",
      duration: "3 Months",
      description: "",
      requirements: "",
      challenge: "",
      solution: "",
      outcome: "",
      technologies: ["Next.js", "React", "Node.js", "Tailwind CSS"],
      coverImage: "/assets/company/logo-symbol.png",
      featured: false,
      isActive: true,
    });
    setTechInput("");
    setIsProjectModalOpen(true);
  };

  const handleOpenEditProject = (project: AdminProjectItem) => {
    setEditingProject(project);
    setFormData({
      ...project,
      categories: project.categories || [project.category],
    });
    setTechInput("");
    setIsProjectModalOpen(true);
  };

  const handleDeleteProject = (id?: string | number) => {
    if (!id) return;
    if (confirm("Are you sure you want to remove this project from the database?")) {
      setProjects(projects.filter((p) => (p._id || p.id) !== id));
      adminApi.deletePortfolio(id.toString());
    }
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

  const handleTogglePublish = (id?: string | number) => {
    if (!id) return;
    setProjects(
      projects.map((p) => {
        if ((p._id || p.id) === id) {
          const updated = { ...p, isActive: !p.isActive };
          adminApi.updatePortfolio(id.toString(), { isActive: updated.isActive });
          return updated;
        }
        return p;
      })
    );
  };

  const handleSaveProjectForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.client) return;

    const payload = {
      ...formData,
      slug:
        formData.slug ||
        formData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, ""),
      category: formData.categories?.[0] || formData.category || "Application Development",
      categories: formData.categories || [formData.category || "Application Development"],
    };

    if (editingProject) {
      const updatedList = projects.map((p) => {
        if ((p._id || p.id) === (editingProject._id || editingProject.id)) {
          return { ...p, ...payload } as AdminProjectItem;
        }
        return p;
      });
      setProjects(updatedList);
      adminApi.updatePortfolio(
        (editingProject._id || editingProject.id) as string,
        payload
      );
    } else {
      const newPrj: AdminProjectItem = {
        ...payload,
        id: `prj-${Date.now()}`,
      } as AdminProjectItem;
      setProjects([newPrj, ...projects]);
      adminApi.createPortfolio(newPrj);
    }

    setIsProjectModalOpen(false);
  };

  const toggleCategorySelection = (catName: string) => {
    const current = formData.categories || [];
    if (current.includes(catName)) {
      if (current.length > 1) {
        setFormData({ ...formData, categories: current.filter((c) => c !== catName) });
      }
    } else {
      setFormData({ ...formData, categories: [...current, catName] });
    }
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

  // Category Actions
  const handleOpenAddCategory = () => {
    setEditingCategory(null);
    setCategoryFormData({
      name: "",
      shortLabel: "",
      slug: "",
      description: "",
      subdisciplines: [],
      icon: "Folder",
      order: categories.length + 1,
    });
    setSubdisciplineInput("");
    setIsCategoryModalOpen(true);
  };

  const handleOpenEditCategory = (cat: PortfolioCategory) => {
    setEditingCategory(cat);
    setCategoryFormData({ ...cat });
    setSubdisciplineInput("");
    setIsCategoryModalOpen(true);
  };

  const handleDeleteCategory = (catId: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((c) => c.id !== catId));
      adminApi.deletePortfolioCategory(catId);
    }
  };

  const handleSaveCategoryForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryFormData.name) return;

    const payload: PortfolioCategory = {
      id: editingCategory ? editingCategory.id : `cat-${Date.now()}`,
      name: categoryFormData.name,
      shortLabel: categoryFormData.shortLabel || categoryFormData.name,
      slug:
        categoryFormData.slug ||
        categoryFormData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
      description: categoryFormData.description || "",
      subdisciplines: categoryFormData.subdisciplines || [],
      icon: categoryFormData.icon || "Folder",
      order: categoryFormData.order || categories.length + 1,
    };

    if (editingCategory) {
      setCategories(categories.map((c) => (c.id === editingCategory.id ? payload : c)));
      adminApi.updatePortfolioCategory(editingCategory.id, payload);
    } else {
      setCategories([...categories, payload]);
      adminApi.createPortfolioCategory(payload);
    }

    setIsCategoryModalOpen(false);
  };

  const addSubdiscipline = () => {
    if (subdisciplineInput.trim()) {
      setCategoryFormData({
        ...categoryFormData,
        subdisciplines: [
          ...(categoryFormData.subdisciplines || []),
          subdisciplineInput.trim(),
        ],
      });
      setSubdisciplineInput("");
    }
  };

  const removeSubdiscipline = (index: number) => {
    if (categoryFormData.subdisciplines) {
      setCategoryFormData({
        ...categoryFormData,
        subdisciplines: categoryFormData.subdisciplines.filter((_, i) => i !== index),
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/20 mb-2">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Case Studies & Solutions CMS</span>
          </div>
          <h2 className="text-2xl font-extrabold text-charcoal dark:text-warm-white font-heading">
            Portfolio & Category Architecture
          </h2>
          <p className="text-xs text-slate-muted">
            Manage the 5 enterprise categories, multi-category assignment, and verified case study deliverables.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {activeSubTab === "projects" ? (
            <button
              onClick={handleOpenAddProject}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gold text-charcoal text-xs font-bold uppercase tracking-wider hover:bg-gold-light transition-all shadow-md shadow-gold/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add Project</span>
            </button>
          ) : (
            <button
              onClick={handleOpenAddCategory}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gold text-charcoal text-xs font-bold uppercase tracking-wider hover:bg-gold-light transition-all shadow-md shadow-gold/20"
            >
              <FolderPlus className="w-4 h-4" />
              <span>Create Category</span>
            </button>
          )}
        </div>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <button
          onClick={() => setActiveSubTab("projects")}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
            activeSubTab === "projects"
              ? "bg-charcoal text-warm-white dark:bg-gold dark:text-charcoal shadow-sm"
              : "bg-white dark:bg-charcoal text-slate-muted border border-border hover:border-gold/30"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Projects & Case Studies ({projects.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab("categories")}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
            activeSubTab === "categories"
              ? "bg-charcoal text-warm-white dark:bg-gold dark:text-charcoal shadow-sm"
              : "bg-white dark:bg-charcoal text-slate-muted border border-border hover:border-gold/30"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Portfolio Categories ({categories.length})</span>
        </button>
      </div>

      {/* VIEW 1: PROJECTS & CASE STUDIES */}
      {activeSubTab === "projects" && (
        <div className="space-y-6">
          {/* Filter & Search Bar */}
          <div className="p-4 rounded-2xl bg-white dark:bg-charcoal border border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search title, client, tech stack..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-muted mr-1 shrink-0">
                Filter:
              </span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
              >
                <option value="All">All Categories ({projects.length})</option>
                {categories.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Projects Table */}
          <div className="p-6 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border text-slate-muted uppercase tracking-wider">
                    <th className="py-3 px-4">Project & Client</th>
                    <th className="py-3 px-4">Assigned Categories</th>
                    <th className="py-3 px-4">Contract Value</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Featured</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((project, idx) => (
                    <tr
                      key={project._id || project.id || idx}
                      className="hover:bg-warm-white/50 dark:hover:bg-graphite/40 transition-colors"
                    >
                      <td className="py-4 px-4 max-w-xs">
                        <div className="font-bold text-charcoal dark:text-warm-white text-sm line-clamp-1">
                          {project.title}
                        </div>
                        <div className="text-slate-muted text-[11px]">{project.client}</div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {project.categories?.map((c) => (
                            <span
                              key={c}
                              className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gold/10 text-gold border border-gold/20"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="py-4 px-4 font-semibold text-slate-muted">
                        {project.contractValue || "—"}
                      </td>

                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleTogglePublish(project._id || project.id)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                            project.isActive
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                              : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                          }`}
                        >
                          {project.isActive ? "Published" : "Draft"}
                        </button>
                      </td>

                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleToggleFeatured(project._id || project.id)}
                          className={`p-1.5 rounded-lg border transition-all ${
                            project.featured
                              ? "bg-gold/15 text-gold border-gold/30"
                              : "text-slate-muted border-border hover:border-gold/30"
                          }`}
                        >
                          <Star className={`w-4 h-4 ${project.featured ? "fill-gold" : ""}`} />
                        </button>
                      </td>

                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {project.slug && (
                            <a
                              href={`/projects/${project.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg text-slate-muted hover:text-gold hover:bg-gold/10 transition-colors"
                              title="View Public Case Study"
                            >
                              <Eye className="w-4 h-4" />
                            </a>
                          )}
                          <button
                            onClick={() => handleOpenEditProject(project)}
                            className="p-1.5 rounded-lg text-slate-muted hover:text-gold hover:bg-gold/10 transition-colors"
                            title="Edit Case Study"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project._id || project.id)}
                            className="p-1.5 rounded-lg text-slate-muted hover:text-red-500 hover:bg-red-500/10 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: CATEGORY MANAGEMENT */}
      {activeSubTab === "categories" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const projectCount = projects.filter(
                (p) => p.categories && p.categories.includes(cat.name)
              ).length;

              return (
                <div
                  key={cat.id || cat.slug}
                  className="p-6 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm flex flex-col justify-between space-y-4 hover:border-gold/40 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gold/10 text-gold border border-gold/25">
                        Order: {cat.order}
                      </span>
                      <span className="text-xs font-semibold text-slate-muted">
                        {projectCount} Projects
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-charcoal dark:text-warm-white font-heading">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-muted leading-relaxed line-clamp-3">
                      {cat.description}
                    </p>

                    <div className="space-y-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-muted">
                        Subdisciplines:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {cat.subdisciplines?.map((sub, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-warm-white dark:bg-graphite text-charcoal dark:text-warm-white border border-border"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenEditCategory(cat)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-gold hover:bg-gold/10 transition-colors flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(cat.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-red-500 hover:bg-red-500/10 transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* PROJECT MODAL */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-3xl my-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-xl font-bold text-charcoal dark:text-warm-white font-heading">
                {editingProject ? "Edit Project & Case Study" : "Create New Project"}
              </h3>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="p-1 rounded-lg text-slate-muted hover:text-charcoal dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProjectForm} className="space-y-5 text-xs">
              {/* Row 1: Title & Client */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-muted uppercase mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
                    placeholder="e.g. Dairy Muneem Milk App"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-muted uppercase mb-1">
                    Client Name / Authority *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
                    placeholder="e.g. Regional Dairy Cooperative"
                  />
                </div>
              </div>

              {/* Row 2: Category Assignment (Multi-Category Selector) */}
              <div>
                <label className="block font-bold text-slate-muted uppercase mb-2">
                  Select Portfolio Categories (Multiple Supported) *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 rounded-2xl bg-warm-white dark:bg-graphite/40 border border-border">
                  {categories.map((cat) => {
                    const isChecked = formData.categories?.includes(cat.name);
                    return (
                      <label
                        key={cat.name}
                        className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer transition-all ${
                          isChecked
                            ? "bg-gold/15 border-gold text-gold font-bold"
                            : "bg-white dark:bg-graphite border-border text-slate-muted hover:border-gold/30"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleCategorySelection(cat.name)}
                          className="rounded text-gold focus:ring-0"
                        />
                        <span className="truncate">{cat.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Row 3: Industry, Contract Value, Year */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-muted uppercase mb-1">
                    Industry
                  </label>
                  <input
                    type="text"
                    value={formData.industry || ""}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
                    placeholder="e.g. Healthcare, Agriculture"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-muted uppercase mb-1">
                    Contract Value
                  </label>
                  <input
                    type="text"
                    value={formData.contractValue || ""}
                    onChange={(e) => setFormData({ ...formData, contractValue: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
                    placeholder="e.g. ₹2,50,000 Contract"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-muted uppercase mb-1">
                    Deployment Year
                  </label>
                  <input
                    type="text"
                    value={formData.projectDate || ""}
                    onChange={(e) => setFormData({ ...formData, projectDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
                    placeholder="e.g. 2024"
                  />
                </div>
              </div>

              {/* Row 4: Short Description & Requirements */}
              <div>
                <label className="block font-bold text-slate-muted uppercase mb-1">
                  Short Overview *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
                  placeholder="Summary of the solution and deployment scope..."
                />
              </div>

              <div>
                <label className="block font-bold text-slate-muted uppercase mb-1">
                  Project Requirements & Operational Context
                </label>
                <textarea
                  rows={2}
                  value={formData.requirements || ""}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
                  placeholder="The organizational and technological need..."
                />
              </div>

              {/* Row 5: Challenge & Solution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-muted uppercase mb-1">
                    The Challenge
                  </label>
                  <textarea
                    rows={2}
                    value={formData.challenge || ""}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
                    placeholder="Specific bottleneck faced..."
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-muted uppercase mb-1">
                    Engineered Solution
                  </label>
                  <textarea
                    rows={2}
                    value={formData.solution || ""}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
                    placeholder="How RBM designed and implemented the architecture..."
                  />
                </div>
              </div>

              {/* Row 6: Verified Outcome */}
              <div>
                <label className="block font-bold text-slate-muted uppercase mb-1">
                  Verified Outcome & Impact *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.outcome}
                  onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
                  placeholder="Only actual, documented results..."
                />
              </div>

              {/* Row 7: Technologies Stack Input */}
              <div>
                <label className="block font-bold text-slate-muted uppercase mb-1">
                  Technologies & Architecture Tags
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTechTag();
                      }
                    }}
                    placeholder="Add technology tag (e.g. Next.js 16, PostgreSQL)..."
                    className="flex-1 px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
                  />
                  <button
                    type="button"
                    onClick={addTechTag}
                    className="px-4 py-2 rounded-xl bg-gold text-charcoal font-bold hover:bg-gold-light"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {formData.technologies?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white"
                    >
                      <span>{tech}</span>
                      <button
                        type="button"
                        onClick={() => removeTechTag(idx)}
                        className="text-slate-muted hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded text-gold focus:ring-0"
                  />
                  <span className="font-bold text-slate-muted">Feature on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded text-gold focus:ring-0"
                  />
                  <span className="font-bold text-slate-muted">Published / Active</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-border text-slate-muted hover:text-charcoal dark:hover:text-white font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gold text-charcoal font-bold hover:bg-gold-light transition-all shadow-md"
                >
                  {editingProject ? "Update Case Study" : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CATEGORY MODAL */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="text-xl font-bold text-charcoal dark:text-warm-white font-heading">
                {editingCategory ? "Edit Category" : "Create New Category"}
              </h3>
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                className="p-1 rounded-lg text-slate-muted hover:text-charcoal dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategoryForm} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-muted uppercase mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={categoryFormData.name}
                  onChange={(e) =>
                    setCategoryFormData({ ...categoryFormData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
                  placeholder="e.g. AI & Business Automation"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-muted uppercase mb-1">
                  Short Filter Label
                </label>
                <input
                  type="text"
                  value={categoryFormData.shortLabel || ""}
                  onChange={(e) =>
                    setCategoryFormData({ ...categoryFormData, shortLabel: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
                  placeholder="e.g. AI Automation"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-muted uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={categoryFormData.description || ""}
                  onChange={(e) =>
                    setCategoryFormData({ ...categoryFormData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
                  placeholder="What this discipline encompasses..."
                />
              </div>

              <div>
                <label className="block font-bold text-slate-muted uppercase mb-1">
                  Subdisciplines (Optional)
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={subdisciplineInput}
                    onChange={(e) => setSubdisciplineInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addSubdiscipline();
                      }
                    }}
                    placeholder="e.g. AI agents, Workflow automation..."
                    className="flex-1 px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
                  />
                  <button
                    type="button"
                    onClick={addSubdiscipline}
                    className="px-4 py-2 rounded-xl bg-gold text-charcoal font-bold hover:bg-gold-light"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {categoryFormData.subdisciplines?.map((sub, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white"
                    >
                      <span>{sub}</span>
                      <button
                        type="button"
                        onClick={() => removeSubdiscipline(idx)}
                        className="text-slate-muted hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-border text-slate-muted hover:text-charcoal dark:hover:text-white font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gold text-charcoal font-bold hover:bg-gold-light transition-all shadow-md"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
