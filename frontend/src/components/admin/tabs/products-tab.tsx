"use client";

import { useState } from "react";
import { ALL_PRODUCTS, SoftwareProduct, ProductStatus } from "@/data/products-data";
import {
  Cpu,
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle2,
  X,
  Save,
} from "lucide-react";

export function ProductsTab() {
  const [products, setProducts] = useState<SoftwareProduct[]>(ALL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | ProductStatus>("ALL");
  const [editingProduct, setEditingProduct] = useState<SoftwareProduct | null>(null);
  const [saveNotification, setSaveNotification] = useState("");

  const handleAddNew = () => {
    setEditingProduct({
      id: `prod-${Date.now()}`,
      slug: "",
      name: "",
      category: "Software & SaaS",
      tagline: "",
      description: "",
      status: "AVAILABLE",
      pricingStatus: "Turnkey Contract",
      demoAvailable: true,
      features: ["Custom feature 1"],
      keyBenefits: ["Core business benefit"],
      technologies: ["Next.js", "Node.js"],
      idealFor: ["Enterprises"],
      iconName: "Cpu",
    });
  };

  const filteredProducts = products.filter((p) => {
    const matchesFilter = statusFilter === "ALL" || p.status === statusFilter;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleStatusToggle = (id: string, newStatus: ProductStatus) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
    setSaveNotification(`Product status updated to ${newStatus}.`);
    setTimeout(() => setSaveNotification(""), 3000);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setProducts((prev) => {
      const exists = prev.some((p) => p.id === editingProduct.id);
      if (exists) {
        return prev.map((p) => (p.id === editingProduct.id ? editingProduct : p));
      }
      return [editingProduct, ...prev];
    });
    setEditingProduct(null);
    setSaveNotification("Product changes saved successfully.");
    setTimeout(() => setSaveNotification(""), 3000);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to remove this product from the marketplace?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setSaveNotification("Product removed.");
      setTimeout(() => setSaveNotification(""), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[#111827] border border-[#1E293B]">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-gold uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>Marketplace Engine</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-white mt-1">
            Software Products & SaaS Platforms
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage your {products.length} proprietary SaaS platforms, development statuses, and pricing models.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAddNew}
            className="px-4 py-2.5 rounded-xl bg-gold text-navy font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition-all flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Platform</span>
          </button>
        </div>
      </div>

      {saveNotification && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{saveNotification}</span>
        </div>
      )}

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by title or category..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#111827] border border-[#1E293B] text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-gold"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {(["ALL", "AVAILABLE", "IN DEVELOPMENT", "PLANNED"] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === st
                  ? "bg-gold text-navy font-bold"
                  : "bg-[#111827] text-slate-400 border border-[#1E293B] hover:text-white"
              }`}
            >
              {st} {st !== "ALL" && `(${products.filter((p) => p.status === st).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-2xl bg-[#111827] border border-[#1E293B] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B1120] text-slate-400 uppercase tracking-wider border-b border-[#1E293B] font-mono text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Platform Name</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Pricing Model</th>
                <th className="py-3.5 px-4">Tech Stack</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B] text-slate-300">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-[#1E293B]/40 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-bold text-white text-sm">{p.name}</div>
                    <div className="text-[11px] text-slate-400 italic line-clamp-1 mt-0.5">
                      {p.tagline}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gold/10 text-gold border border-gold/20">
                      {p.category}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <select
                      value={p.status}
                      onChange={(e) => handleStatusToggle(p.id, e.target.value as ProductStatus)}
                      className={`text-[11px] font-semibold rounded-md px-2 py-1 bg-[#0B1120] border focus:outline-none ${
                        p.status === "AVAILABLE"
                          ? "text-emerald-400 border-emerald-500/30"
                          : p.status === "IN DEVELOPMENT"
                          ? "text-amber-400 border-amber-500/30"
                          : "text-slate-400 border-slate-700"
                      }`}
                    >
                      <option value="AVAILABLE">AVAILABLE (Live)</option>
                      <option value="IN DEVELOPMENT">IN DEVELOPMENT</option>
                      <option value="PLANNED">PLANNED (Roadmap)</option>
                    </select>
                  </td>
                  <td className="py-4 px-4 font-mono text-slate-400 text-[11px]">
                    {p.pricingStatus}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {p.technologies.slice(0, 3).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 rounded text-[10px] bg-[#0B1120] border border-[#1E293B] text-slate-400 font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                      {p.technologies.length > 3 && (
                        <span className="text-[10px] text-slate-500">
                          +{p.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingProduct(p)}
                        className="p-1.5 rounded-lg bg-[#0B1120] hover:bg-gold/20 text-slate-400 hover:text-gold transition-colors"
                        title="Edit Details"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-1.5 rounded-lg bg-[#0B1120] hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-[#111827] border border-[#1E293B] rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#1E293B]">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Edit className="w-4 h-4 text-gold" />
                <span>Edit Platform: {editingProduct.name}</span>
              </h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, name: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#0B1120] border border-[#1E293B] text-white text-xs focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.category}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, category: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#0B1120] border border-[#1E293B] text-white text-xs focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Status
                  </label>
                  <select
                    value={editingProduct.status}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        status: e.target.value as ProductStatus,
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#0B1120] border border-[#1E293B] text-white text-xs focus:border-gold"
                  >
                    <option value="AVAILABLE">AVAILABLE (Live)</option>
                    <option value="IN DEVELOPMENT">IN DEVELOPMENT</option>
                    <option value="PLANNED">PLANNED (Roadmap)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  value={editingProduct.tagline}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, tagline: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#0B1120] border border-[#1E293B] text-white text-xs focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, description: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#0B1120] border border-[#1E293B] text-white text-xs focus:border-gold resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Pricing Tier / Commercial Terms
                </label>
                <input
                  type="text"
                  value={editingProduct.pricingStatus}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, pricingStatus: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#0B1120] border border-[#1E293B] text-white text-xs focus:border-gold"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#1E293B]">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl bg-[#0B1120] text-slate-400 text-xs hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gold text-navy font-bold text-xs flex items-center gap-1.5 hover:bg-gold-light"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
