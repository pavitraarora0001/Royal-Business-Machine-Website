"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Image as ImageIcon,
  Upload,
  Search,
  Trash2,
  Copy,
  CheckCircle2,
  FileText,
  Video,
  Eye,
  X,
  Folder
} from "lucide-react";
import { adminApi } from "@/lib/admin-api";

interface MediaItem {
  _id?: string;
  id?: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  altText?: string;
  caption?: string;
  folder: string;
  createdAt?: string;
}

export function MediaTab() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([
    {
      id: "med-1",
      filename: "logo-horizontal.png",
      originalName: "logo-horizontal.png",
      mimeType: "image/png",
      size: 142000,
      url: "/assets/logo/logo-horizontal.png",
      altText: "Royal Business Machine Horizontal Logo",
      folder: "branding",
      createdAt: "Nov 15, 2026",
    },
    {
      id: "med-2",
      filename: "logo-stacked.png",
      originalName: "logo-stacked.png",
      mimeType: "image/png",
      size: 184000,
      url: "/assets/logo/logo-stacked.png",
      altText: "Royal Business Machine Official Crest Logo",
      folder: "branding",
      createdAt: "Nov 15, 2026",
    },
    {
      id: "med-3",
      filename: "icon.png",
      originalName: "icon.png",
      mimeType: "image/png",
      size: 48000,
      url: "/icon.png",
      altText: "Official Browser Favicon",
      folder: "branding",
      createdAt: "Nov 15, 2026",
    },
    {
      id: "med-4",
      filename: "dairy-muneem-spec.pdf",
      originalName: "Dairy Muneem Architecture Whitepaper.pdf",
      mimeType: "application/pdf",
      size: 1420000,
      url: "/uploads/dairy-muneem-spec.pdf",
      altText: "Dairy Muneem System Architecture Specification",
      folder: "documents",
      createdAt: "Nov 10, 2026",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const folders = ["all", "branding", "portfolio", "services", "documents", "general"];

  const filtered = mediaList.filter((m) => {
    const matchFolder = selectedFolder === "all" || m.folder === selectedFolder;
    let matchType = true;
    if (selectedType === "image") matchType = m.mimeType.startsWith("image/");
    if (selectedType === "video") matchType = m.mimeType.startsWith("video/");
    if (selectedType === "document") matchType = m.mimeType.includes("pdf");

    const matchSearch =
      m.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.altText || "").toLowerCase().includes(searchTerm.toLowerCase());

    return matchFolder && matchType && matchSearch;
  });

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id?: string) => {
    if (!id) return;
    if (confirm("Are you sure you want to permanently delete this media asset? Never delete assets referenced by published website pages without replacement.")) {
      setMediaList(mediaList.filter((m) => (m._id || m.id) !== id));
      adminApi.deleteMedia(id);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newItems: MediaItem[] = [];

    Array.from(files).forEach((file, idx) => {
      newItems.push({
        id: `med-${Date.now()}-${idx}`,
        filename: file.name,
        originalName: file.name,
        mimeType: file.type || "application/octet-stream",
        size: file.size,
        url: URL.createObjectURL(file),
        altText: file.name,
        folder: "general",
        createdAt: "Just now",
      });
    });

    setMediaList([...newItems, ...mediaList]);
    setIsUploading(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Upload Bar */}
      <div className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/20 mb-2">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Persistent Asset Storage</span>
          </div>
          <h2 className="text-2xl font-extrabold text-charcoal dark:text-warm-white font-heading">
            Media Library & Gallery ({mediaList.length})
          </h2>
          <p className="text-xs text-slate-muted">
            Manage high-resolution images, brand vectors, videos, and PDF project briefs.
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gold text-charcoal text-xs font-bold uppercase tracking-wider hover:bg-gold-light transition-all shadow-md shadow-gold/20 cursor-pointer">
          <Upload className="w-4 h-4" />
          <span>{isUploading ? "Uploading..." : "Upload New Files"}</span>
          <input
            type="file"
            multiple
            accept="image/*,video/*,application/pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Filter and Search */}
      <div className="p-4 rounded-2xl bg-white dark:bg-charcoal border border-border flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search filename or alt description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-muted mr-1 shrink-0">
            Folder:
          </span>
          <select
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            className="px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs text-charcoal dark:text-warm-white"
          >
            {folders.map((f) => (
              <option key={f} value={f}>
                {f.toUpperCase()}
              </option>
            ))}
          </select>

          <span className="text-xs font-bold uppercase tracking-wider text-slate-muted ml-2 mr-1 shrink-0">
            Type:
          </span>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs text-charcoal dark:text-warm-white"
          >
            <option value="all">All Formats</option>
            <option value="image">Images (JPG/PNG/WebP/SVG)</option>
            <option value="video">Videos (MP4/WebM)</option>
            <option value="document">Documents (PDF)</option>
          </select>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filtered.map((item, idx) => {
          const isImg = item.mimeType.startsWith("image/");
          const isDoc = item.mimeType.includes("pdf");
          const isVid = item.mimeType.startsWith("video/");

          return (
            <div
              key={item._id || item.id || idx}
              className="group p-3 rounded-2xl bg-white dark:bg-charcoal border border-border hover:border-gold/50 shadow-sm transition-all flex flex-col justify-between"
            >
              {/* Media Thumbnail Container */}
              <div
                onClick={() => setPreviewItem(item)}
                className="w-full aspect-square rounded-xl bg-warm-white dark:bg-graphite flex items-center justify-center overflow-hidden cursor-pointer relative"
              >
                {isImg ? (
                  <Image
                    src={item.url}
                    alt={item.altText || item.originalName}
                    width={150}
                    height={150}
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform"
                    unoptimized
                  />
                ) : isDoc ? (
                  <div className="flex flex-col items-center gap-1.5 text-red-500">
                    <FileText className="w-10 h-10" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">PDF DOC</span>
                  </div>
                ) : isVid ? (
                  <div className="flex flex-col items-center gap-1.5 text-blue-500">
                    <Video className="w-10 h-10" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">VIDEO</span>
                  </div>
                ) : (
                  <Folder className="w-8 h-8 text-slate-muted" />
                )}

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Eye className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Title & Info */}
              <div className="mt-2.5 space-y-1">
                <div className="text-xs font-bold text-charcoal dark:text-warm-white truncate" title={item.originalName}>
                  {item.originalName}
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-muted">
                  <span>{formatFileSize(item.size)}</span>
                  <span className="uppercase font-semibold text-gold">{item.folder}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-2.5 pt-2 border-t border-border/60 flex items-center justify-between">
                <button
                  onClick={() => handleCopyLink(item.url, (item._id || item.id) as string)}
                  className="p-1 rounded-md text-slate-muted hover:text-gold transition-colors flex items-center gap-1 text-[10px]"
                  title="Copy link to clipboard"
                >
                  {copiedId === (item._id || item.id) ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedId === (item._id || item.id) ? "Copied" : "Copy"}</span>
                </button>

                <button
                  onClick={() => handleDelete(item._id || item.id)}
                  className="p-1 rounded-md text-slate-400 hover:text-red-500 transition-colors"
                  title="Delete file"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-white dark:bg-charcoal border border-border rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="text-sm font-bold text-charcoal dark:text-warm-white truncate max-w-md font-heading">
                {previewItem.originalName}
              </h3>
              <button
                onClick={() => setPreviewItem(null)}
                className="p-1 rounded-xl text-slate-muted hover:text-charcoal dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="w-full h-72 rounded-2xl bg-warm-white dark:bg-graphite flex items-center justify-center overflow-hidden">
              {previewItem.mimeType.startsWith("image/") ? (
                <Image
                  src={previewItem.url}
                  alt={previewItem.altText || ""}
                  width={400}
                  height={300}
                  className="max-h-full w-auto object-contain p-4"
                  unoptimized
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-slate-muted">
                  <FileText className="w-16 h-16 text-gold" />
                  <span className="text-xs font-semibold">{previewItem.originalName}</span>
                </div>
              )}
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-border">
                <span className="text-slate-muted">Public URL:</span>
                <span className="font-mono text-gold font-bold select-all">{previewItem.url}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border">
                <span className="text-slate-muted">File Size:</span>
                <span className="font-semibold text-charcoal dark:text-warm-white">
                  {formatFileSize(previewItem.size)}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-border">
                <span className="text-slate-muted">MIME Type:</span>
                <span className="font-semibold text-charcoal dark:text-warm-white">
                  {previewItem.mimeType}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => handleCopyLink(previewItem.url, "preview")}
                className="px-4 py-2 rounded-xl bg-gold text-charcoal font-bold text-xs uppercase tracking-wider"
              >
                Copy Public URL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
