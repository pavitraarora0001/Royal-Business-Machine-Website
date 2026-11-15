"use client";

import { useState } from "react";
import {
  Newspaper,
  Plus,
  Search,
  Edit,
  Trash2,
  X
} from "lucide-react";
import { adminApi } from "@/lib/admin-api";

interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  status: "draft" | "published" | "scheduled";
  publishedAt?: string;
  views: number;
}

export function BlogTab() {
  const [articles, setArticles] = useState<ArticleItem[]>([
    {
      id: "art-1",
      title: "Architecting High-Concurrency Portals with Next.js 16 and Redis",
      slug: "architecting-high-concurrency-portals-nextjs-16",
      excerpt: "How we scaled institutional education portals to sustain over 100,000 concurrent users without infrastructure downtime.",
      content: "Building web applications that survive viral traffic surges requires deliberate architectural decoupling...",
      category: "Engineering & Cloud",
      author: "Pavitra Arora",
      status: "published",
      publishedAt: "Nov 01, 2026",
      views: 1240,
    },
    {
      id: "art-2",
      title: "Digitizing Rural Dairy Logistics: The Tech Behind Dairy Muneem",
      slug: "digitizing-rural-dairy-logistics-dairy-muneem",
      excerpt: "Overcoming intermittent rural network connectivity with offline-first mobile databases and dynamic Fat/SNF computational engines.",
      content: "In emerging agricultural markets, technology must work reliably even when cellular data is completely unavailable...",
      category: "Mobile Architecture",
      author: "Pavitra Arora",
      status: "published",
      publishedAt: "Nov 08, 2026",
      views: 890,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ArticleItem | null>(null);

  const [formData, setFormData] = useState<Partial<ArticleItem>>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "Engineering & Cloud",
    author: "Pavitra Arora",
    status: "draft",
  });

  const filtered = articles.filter((a) => {
    const matchStatus = selectedStatus === "all" || a.status === selectedStatus;
    const matchSearch =
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleOpenAdd = () => {
    setEditingArticle(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "Engineering & Cloud",
      author: "Pavitra Arora",
      status: "published",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (article: ArticleItem) => {
    setEditingArticle(article);
    setFormData({ ...article });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this article?")) {
      setArticles(articles.filter((a) => a.id !== id));
      adminApi.deleteBlog(id);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    if (editingArticle) {
      setArticles(
        articles.map((a) => (a.id === editingArticle.id ? { ...a, ...formData } as ArticleItem : a))
      );
      adminApi.updateBlog(editingArticle.id, formData);
    } else {
      const newArticle: ArticleItem = {
        ...formData,
        id: `art-${Date.now()}`,
        slug: (formData.title || "").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        views: 0,
        publishedAt: formData.status === "published" ? "Just now" : undefined,
      } as ArticleItem;
      setArticles([newArticle, ...articles]);
      adminApi.createBlog(newArticle);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/20 mb-2">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Publishing & Thought Leadership</span>
          </div>
          <h2 className="text-2xl font-extrabold text-charcoal dark:text-warm-white font-heading">
            Blog & Technical Insights CMS ({articles.length})
          </h2>
          <p className="text-xs text-slate-muted">
            Create, schedule, draft, and publish architecture articles appearing on /blog.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gold text-charcoal text-xs font-bold uppercase tracking-wider hover:bg-gold-light transition-all shadow-md shadow-gold/20"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="p-4 rounded-2xl bg-white dark:bg-charcoal border border-border flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search article titles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-muted mr-1">Status:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs text-charcoal dark:text-warm-white"
          >
            <option value="all">All Articles</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>
      </div>

      {/* Articles Table */}
      <div className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-slate-muted uppercase tracking-wider">
                <th className="py-3 px-4">Article Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Views</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((art) => (
                <tr key={art.id} className="hover:bg-warm-white/50 dark:hover:bg-graphite/40 transition-colors">
                  <td className="py-4 px-4 max-w-md">
                    <div className="font-bold text-charcoal dark:text-warm-white text-sm line-clamp-1">
                      {art.title}
                    </div>
                    <div className="text-[11px] text-slate-muted line-clamp-1 mt-0.5">{art.excerpt}</div>
                  </td>
                  <td className="py-4 px-4 font-semibold text-slate-muted">{art.category}</td>
                  <td className="py-4 px-4 font-medium text-charcoal dark:text-warm-white">{art.author}</td>
                  <td className="py-4 px-4 font-mono font-bold text-gold">{art.views.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        art.status === "published"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          : "bg-slate-500/10 text-slate-400 border border-border"
                      }`}
                    >
                      {art.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right space-x-1.5">
                    <button
                      onClick={() => handleOpenEdit(art)}
                      className="p-1.5 rounded-lg border border-border text-slate-muted hover:text-gold hover:border-gold transition-colors"
                      title="Edit Article"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(art.id)}
                      className="p-1.5 rounded-lg border border-border text-slate-muted hover:text-red-500 hover:border-red-500 transition-colors"
                      title="Delete Article"
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

      {/* Write / Edit Article Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white dark:bg-charcoal border border-border rounded-3xl p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h3 className="text-xl font-bold text-charcoal dark:text-warm-white font-heading">
                {editingArticle ? "Edit Article" : "Write Technical Article"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-slate-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-warm-white block mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Scaling Next.js 16 to 100,000 Concurrent Users"
                  className="w-full px-4 py-2.5 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-warm-white block mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-warm-white block mb-1">
                    Publication Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as ArticleItem["status"] })}
                    className="w-full px-4 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-warm-white block mb-1">
                  Excerpt (Summary) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-warm-white block mb-1">
                  Full Article Content (Markdown / Text) *
                </label>
                <textarea
                  rows={8}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Detailed technical insights, code snippets, architectural recommendations..."
                  className="w-full px-4 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs font-mono leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-border">
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
                  {editingArticle ? "Save Changes" : "Publish Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
