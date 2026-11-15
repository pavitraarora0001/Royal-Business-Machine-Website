"use client";

import { useState } from "react";
import {
  Server,
  Plus,
  Search,
  Edit,
  Trash2,
  Copy,
  X
} from "lucide-react";
import { adminApi } from "@/lib/admin-api";

interface ServiceItem {
  _id?: string;
  id?: string;
  title: string;
  slug?: string;
  category: string;
  shortDescription: string;
  description: string;
  icon?: string;
  price?: number;
  priceType?: string;
  features?: string[];
  benefits?: string[];
  technologies?: string[];
  isActive?: boolean;
  isFeatured?: boolean;
  order?: number;
}

export function ServicesTab() {
  const [services, setServices] = useState<ServiceItem[]>([
    {
      id: "srv-1",
      title: "Web & Enterprise Cloud Applications",
      category: "Web & SaaS Engineering",
      shortDescription: "Custom Next.js 16 platforms, SaaS portals, and high-concurrency microservices.",
      description: "End-to-end full-stack web architectures built with React, Next.js, and Node.js. Optimized for ultra-low latency and bank-grade encryption.",
      icon: "Globe2",
      order: 1,
      priceType: "custom",
      features: ["Next.js 16 Server Components", "High-concurrency microservices", "Role-based access control (RBAC)", "Enterprise Redis & PostgreSQL"],
      technologies: ["Next.js", "React 19", "Node.js", "PostgreSQL", "Docker"],
      isFeatured: true,
      isActive: true,
    },
    {
      id: "srv-2",
      title: "Mobile App Development",
      category: "Mobile Apps & Logistics",
      shortDescription: "Native and cross-platform iOS & Android mobile applications with offline sync.",
      description: "High-performance mobile solutions built for rural and urban deployments. Features background GPS tracking and offline computational engines.",
      icon: "Smartphone",
      order: 2,
      priceType: "custom",
      features: ["React Native & Flutter pipelines", "Offline-first data sync", "Biometric authentication"],
      technologies: ["React Native", "Flutter", "Node.js", "SQLite"],
      isFeatured: true,
      isActive: true,
    },
    {
      id: "srv-3",
      title: "Digital Marketing & Performance SEO",
      category: "Growth & Visibility",
      shortDescription: "Data-driven SEO campaigns, high-ROAS Meta/Google Ads, and conversion funnels.",
      description: "Architecting sustainable organic visibility and high-converting acquisition pipelines.",
      icon: "Sparkles",
      order: 3,
      priceType: "custom",
      features: ["Technical Core Web Vitals audits", "Search Engine Optimization (SEO)", "PPC Google Ads funnels"],
      technologies: ["Google Analytics 4", "Search Console", "Meta Ads Manager"],
      isFeatured: true,
      isActive: true,
    },
    {
      id: "srv-4",
      title: "Startup & Venture Consulting",
      category: "Strategy & Advisory",
      shortDescription: "Investor pitch decks, financial models, MSME registrations, and MVP sprints.",
      description: "Mentorship and execution consulting led by Founder & CEO Pavitra Arora.",
      icon: "Briefcase",
      order: 4,
      priceType: "custom",
      features: ["15-page institutional pitch decks", "TAM/SAM/SOM financial models", "4-week rapid MVP delivery"],
      technologies: ["Financial Modeling", "Lean Canvas", "Figma"],
      isFeatured: true,
      isActive: true,
    },
    {
      id: "srv-5",
      title: "Corporate Design & Brand Identity",
      category: "Design & UX",
      shortDescription: "Design systems, typography tokens, vector logos, and complete brand guidelines.",
      description: "Establishing prestige brand identities that demand authority.",
      icon: "Layers",
      order: 5,
      priceType: "custom",
      features: ["Complete brand guidelines & stylebooks", "Vector logos & iconography"],
      technologies: ["Figma", "Adobe Illustrator", "Photoshop"],
      isActive: true,
    },
    {
      id: "srv-6",
      title: "Physical Printing & Collateral Press",
      category: "Physical Infrastructure",
      shortDescription: "In-house commercial printing: 450+ GSM cards, gold foil embossing, and PVC cards.",
      description: "Commercial printing setup delivering tactile prestige.",
      icon: "Printer",
      order: 6,
      priceType: "custom",
      features: ["450+ GSM velvet visiting cards", "Embossed metallic gold foil stamping", "Student & employee PVC ID cards"],
      technologies: ["Heidelberg Presses", "Spot UV", "Thermal Lamination"],
      isActive: true,
    },
    {
      id: "srv-7",
      title: "Applied AI & E-Governance Solutions",
      category: "Applied AI",
      shortDescription: "Assistive legal AI (NyayaSetu), examination security, and smart public kiosks.",
      description: "Pioneering deterministic rule engines and vector retrieval for governance.",
      icon: "Cpu",
      order: 7,
      priceType: "custom",
      features: ["BNS/IPC legal incident mapping", "Traceable candidate watermarking"],
      technologies: ["Python", "FastEmbed", "PostgreSQL", "LangChain"],
      isFeatured: true,
      isActive: true,
    },
    {
      id: "srv-8",
      title: "Institutional Labs & Campus Hardware",
      category: "Campus Infrastructure",
      shortDescription: "Smart classrooms, turnkey computer laboratories, and institutional IT AMC contracts.",
      description: "Equipping schools and colleges with cutting-edge digital learning environments.",
      icon: "GraduationCap",
      order: 8,
      priceType: "custom",
      features: ["Smart interactive panels", "Gigabit local area networking", "Annual maintenance contracts (AMCs)"],
      technologies: ["Cisco Switches", "Cat6 Cabling", "Linux Terminals"],
      isActive: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  const [formData, setFormData] = useState<Partial<ServiceItem>>({
    title: "",
    category: "Web & SaaS Engineering",
    shortDescription: "",
    description: "",
    icon: "Server",
    priceType: "custom",
    isActive: true,
    isFeatured: false,
    features: [],
    technologies: [],
  });

  const categories = [
    "All",
    "Web & SaaS Engineering",
    "Mobile Apps & Logistics",
    "Growth & Visibility",
    "Strategy & Advisory",
    "Design & UX",
    "Physical Infrastructure",
    "Applied AI",
    "Campus Infrastructure",
  ];

  const filtered = services.filter((s) => {
    const matchCat = selectedCategory === "All" || s.category === selectedCategory;
    const matchSearch =
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleOpenAddModal = () => {
    setEditingService(null);
    setFormData({
      title: "",
      category: "Web & SaaS Engineering",
      shortDescription: "",
      description: "",
      icon: "Server",
      priceType: "custom",
      isActive: true,
      isFeatured: false,
      features: [],
      technologies: [],
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (service: ServiceItem) => {
    setEditingService(service);
    setFormData({ ...service });
    setIsModalOpen(true);
  };

  const handleDelete = (id?: string) => {
    if (!id) return;
    if (confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter((s) => (s._id || s.id) !== id));
      adminApi.deleteService(id);
    }
  };

  const handleDuplicate = (service: ServiceItem) => {
    const duplicated: ServiceItem = {
      ...service,
      id: `srv-${Date.now()}`,
      title: `${service.title} (Copy)`,
      order: services.length + 1,
    };
    setServices([...services, duplicated]);
    adminApi.createService(duplicated);
  };

  const handleToggleActive = (id?: string) => {
    if (!id) return;
    setServices(
      services.map((s) => {
        if ((s._id || s.id) === id) {
          const updated = { ...s, isActive: !s.isActive };
          adminApi.updateService(id, { isActive: updated.isActive });
          return updated;
        }
        return s;
      })
    );
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.shortDescription) return;

    if (editingService) {
      const updatedList = services.map((s) => {
        if ((s._id || s.id) === (editingService._id || editingService.id)) {
          return { ...s, ...formData } as ServiceItem;
        }
        return s;
      });
      setServices(updatedList);
      adminApi.updateService(
        (editingService._id || editingService.id) as string,
        formData
      );
    } else {
      const newService: ServiceItem = {
        ...formData,
        id: `srv-${Date.now()}`,
        order: services.length + 1,
      } as ServiceItem;
      setServices([...services, newService]);
      adminApi.createService(newService);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/20 mb-2">
            <Server className="w-3.5 h-3.5" />
            <span>Complete CRUD Control</span>
          </div>
          <h2 className="text-2xl font-extrabold text-charcoal dark:text-warm-white font-heading">
            Services Management ({services.length})
          </h2>
          <p className="text-xs text-slate-muted">
            Create, edit, duplicate, and toggle service deliverables on the public website.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gold text-charcoal text-xs font-bold uppercase tracking-wider hover:bg-gold-light transition-all shadow-md shadow-gold/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-charcoal border border-border flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search service title or description..."
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

      {/* Services Table */}
      <div className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-slate-muted uppercase tracking-wider">
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Service Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Pricing</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((service, idx) => (
                <tr key={service._id || service.id || idx} className="hover:bg-warm-white/50 dark:hover:bg-graphite/40 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-slate-muted">#{service.order || idx + 1}</td>
                  <td className="py-4 px-4">
                    <div className="font-bold text-charcoal dark:text-warm-white text-sm">
                      {service.title}
                    </div>
                    <div className="text-[11px] text-slate-muted line-clamp-1 max-w-sm mt-0.5">
                      {service.shortDescription}
                    </div>
                  </td>
                  <td className="py-4 px-4 font-semibold text-slate-muted">{service.category}</td>
                  <td className="py-4 px-4 font-mono font-semibold text-gold uppercase">{service.priceType || "Custom"}</td>
                  <td className="py-4 px-4">
                    {service.isFeatured ? (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/30">
                        Featured
                      </span>
                    ) : (
                      <span className="text-slate-400 text-xs">—</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleToggleActive(service._id || service.id)}
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
                        service.isActive
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          : "bg-slate-500/10 text-slate-400 border border-border"
                      }`}
                    >
                      {service.isActive ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td className="py-4 px-4 text-right space-x-1.5">
                    <button
                      onClick={() => handleOpenEditModal(service)}
                      className="p-1.5 rounded-lg border border-border text-slate-muted hover:text-gold hover:border-gold transition-colors"
                      title="Edit Service"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDuplicate(service)}
                      className="p-1.5 rounded-lg border border-border text-slate-muted hover:text-blue-500 hover:border-blue-500 transition-colors"
                      title="Duplicate Service"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(service._id || service.id)}
                      className="p-1.5 rounded-lg border border-border text-slate-muted hover:text-red-500 hover:border-red-500 transition-colors"
                      title="Delete Service"
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

      {/* Add / Edit Service Modal Drawer */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white dark:bg-charcoal border border-border rounded-3xl p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h3 className="text-xl font-bold text-charcoal dark:text-warm-white font-heading">
                {editingService ? "Edit Service" : "Add New Enterprise Service"}
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
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Next-Gen Cloud Migration"
                  className="w-full px-4 py-2.5 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-warm-white block mb-1">
                    Pricing Type
                  </label>
                  <select
                    value={formData.priceType}
                    onChange={(e) => setFormData({ ...formData, priceType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs text-charcoal dark:text-warm-white"
                  >
                    <option value="custom">Custom Milestone Scoping</option>
                    <option value="fixed">Fixed Contract Price</option>
                    <option value="hourly">Hourly Dedicated Rate</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-warm-white block mb-1">
                  Short Description (Summary) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="One sentence describing the core deliverable..."
                  className="w-full px-4 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-warm-white block mb-1">
                  Full Technical Scope & Architecture Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed breakdown of the service methodology, security, and guarantees..."
                  className="w-full px-4 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded text-gold focus:ring-gold"
                  />
                  <span className="text-charcoal dark:text-warm-white">Published on Website</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded text-gold focus:ring-gold"
                  />
                  <span className="text-charcoal dark:text-warm-white">Highlight on Homepage</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-border text-xs font-semibold text-slate-muted hover:text-charcoal dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gold text-charcoal text-xs font-bold uppercase tracking-wider hover:bg-gold-light transition-all shadow-md"
                >
                  {editingService ? "Update Service" : "Create Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
