"use client";

import { useState } from "react";
import { Compass, Plus, MoveUp, MoveDown, Trash2, Edit2, Eye, EyeOff, Save, CheckCircle2 } from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  href: string;
  target?: string;
  isVisible: boolean;
  order: number;
}

export function NavigationTab() {
  const [headerLinks, setHeaderLinks] = useState<MenuItem[]>([
    { id: "h-1", label: "Home", href: "/", isVisible: true, order: 1 },
    { id: "h-2", label: "About", href: "/about", isVisible: true, order: 2 },
    { id: "h-3", label: "Services", href: "/services", isVisible: true, order: 3 },
    { id: "h-4", label: "Portfolio", href: "/portfolio", isVisible: true, order: 4 },
    { id: "h-5", label: "Pricing", href: "/pricing", isVisible: true, order: 5 },
    { id: "h-6", label: "Blog", href: "/blog", isVisible: true, order: 6 },
    { id: "h-7", label: "Contact", href: "/contact", isVisible: true, order: 7 },
  ]);

  const [footerLinks, setFooterLinks] = useState<MenuItem[]>([
    { id: "f-1", label: "Digital Transformation", href: "/services/digital-transformation", isVisible: true, order: 1 },
    { id: "f-2", label: "Biometric & Access Control", href: "/services/biometric-access-control", isVisible: true, order: 2 },
    { id: "f-3", label: "CCTV Surveillance", href: "/services/cctv-surveillance-security", isVisible: true, order: 3 },
    { id: "f-4", label: "IT Networking", href: "/services/network-infrastructure-solutions", isVisible: true, order: 4 },
    { id: "f-5", label: "Privacy Policy", href: "/privacy", isVisible: true, order: 5 },
    { id: "f-6", label: "Terms of Service", href: "/terms", isVisible: true, order: 6 },
  ]);

  const [activeMenu, setActiveMenu] = useState<"header" | "footer">("header");
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Edit / Add modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formLabel, setFormLabel] = useState("");
  const [formHref, setFormHref] = useState("");

  const currentList = activeMenu === "header" ? headerLinks : footerLinks;
  const setList = activeMenu === "header" ? setHeaderLinks : setFooterLinks;

  const handleToggleVisible = (id: string) => {
    setList((prev) => prev.map((item) => (item.id === id ? { ...item, isVisible: !item.isVisible } : item)));
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentList.length) return;

    const newList = [...currentList];
    const temp = newList[index];
    newList[index] = newList[targetIndex];
    newList[targetIndex] = temp;
    // update order
    newList.forEach((item, idx) => {
      item.order = idx + 1;
    });
    setList(newList);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this navigation link?")) {
      setList((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleOpenEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormLabel(item.label);
    setFormHref(item.href);
    setModalOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormLabel("");
    setFormHref("/");
    setModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formLabel.trim() || !formHref.trim()) return;

    if (editingItem) {
      setList((prev) =>
        prev.map((i) => (i.id === editingItem.id ? { ...i, label: formLabel, href: formHref } : i))
      );
    } else {
      const newItem: MenuItem = {
        id: `${activeMenu}-${Date.now()}`,
        label: formLabel,
        href: formHref,
        isVisible: true,
        order: currentList.length + 1,
      };
      setList((prev) => [...prev, newItem]);
    }
    setModalOpen(false);
  };

  const handleSaveConfig = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Compass className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Navigation Menus Manager</h2>
          </div>
          <p className="text-sm text-slate-500">
            Customize header navigation links, footer menus, ordering, and external redirects.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-lg transition"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            Add Link
          </button>
          <button
            onClick={handleSaveConfig}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-lg transition shadow-sm"
          >
            <Save className="w-4 h-4" />
            Save Menu Changes
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Navigation structure updated successfully!
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveMenu("header")}
          className={`px-4 py-2 text-sm font-bold rounded-lg transition ${
            activeMenu === "header"
              ? "bg-amber-500 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          Primary Header Menu ({headerLinks.length})
        </button>
        <button
          onClick={() => setActiveMenu("footer")}
          className={`px-4 py-2 text-sm font-bold rounded-lg transition ${
            activeMenu === "footer"
              ? "bg-amber-500 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          Footer Links & Columns ({footerLinks.length})
        </button>
      </div>

      {/* Menu items table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 text-xs font-semibold uppercase">
              <th className="py-3 px-4 w-16 text-center">Order</th>
              <th className="py-3 px-4">Menu Label</th>
              <th className="py-3 px-4">Route / Destination</th>
              <th className="py-3 px-4 w-28 text-center">Status</th>
              <th className="py-3 px-4 w-40 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {currentList.map((item, idx) => (
              <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                <td className="py-3 px-4 text-center font-mono text-xs text-slate-400 font-bold">
                  {idx + 1}
                </td>
                <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                  {item.label}
                </td>
                <td className="py-3 px-4 font-mono text-xs text-amber-600 dark:text-amber-400">
                  {item.href}
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleToggleVisible(item.id)}
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      item.isVisible
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
                        : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                    }`}
                  >
                    {item.isVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    {item.isVisible ? "Visible" : "Hidden"}
                  </button>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => handleMove(idx, "up")}
                      disabled={idx === 0}
                      className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 disabled:opacity-30"
                      title="Move up"
                    >
                      <MoveUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMove(idx, "down")}
                      disabled={idx === currentList.length - 1}
                      className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 disabled:opacity-30"
                      title="Move down"
                    >
                      <MoveDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 text-slate-400 hover:text-amber-500"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500"
                      title="Delete"
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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              {editingItem ? "Edit Navigation Link" : "Add Navigation Link"}
            </h3>
            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Link Label
                </label>
                <input
                  type="text"
                  required
                  value={formLabel}
                  onChange={(e) => setFormLabel(e.target.value)}
                  placeholder="e.g. Solutions"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Target Route / URL
                </label>
                <input
                  type="text"
                  required
                  value={formHref}
                  onChange={(e) => setFormHref(e.target.value)}
                  placeholder="e.g. /services/biometrics or https://..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-semibold transition"
                >
                  Save Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
