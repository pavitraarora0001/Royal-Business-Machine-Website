"use client";

import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  FileEdit,
  Home,
  Info,
  Server,
  FolderGit2,
  Image as ImageIcon,
  Inbox,
  TrendingUp,
  Newspaper,
  MessageSquareQuote,
  Users,
  GraduationCap,
  Globe2,
  Compass,
  Settings,
  ShieldCheck,
  History,
  Bell,
  Eye,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export type AdminTab =
  | "overview"
  | "cms"
  | "homepage"
  | "about"
  | "services"
  | "portfolio"
  | "media"
  | "inquiries"
  | "leads"
  | "blog"
  | "clients"
  | "team"
  | "careers"
  | "seo"
  | "navigation"
  | "settings"
  | "users"
  | "logs"
  | "notifications"
  | "preview";

interface AdminSidebarProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  currentUser?: { name: string; role: string; email: string };
  onLogout: () => void;
  inquiryCount?: number;
}

export function AdminSidebar({
  activeTab,
  onSelectTab,
  collapsed,
  onToggleCollapse,
  currentUser = { name: "Pavitra Arora", role: "super_admin", email: "admin@royalbusinessmachine.com" },
  onLogout,
  inquiryCount = 4,
}: AdminSidebarProps) {
  const navSections = [
    {
      title: "Core",
      items: [
        { id: "overview" as AdminTab, label: "Overview & Metrics", icon: LayoutDashboard },
      ],
    },
    {
      title: "Website CMS",
      items: [
        { id: "cms" as AdminTab, label: "Website CMS Pages", icon: FileEdit },
        { id: "homepage" as AdminTab, label: "Homepage Editor", icon: Home },
        { id: "about" as AdminTab, label: "About Page Editor", icon: Info },
        { id: "services" as AdminTab, label: "Services Manager", icon: Server },
        { id: "portfolio" as AdminTab, label: "Portfolio & Projects", icon: FolderGit2 },
        { id: "blog" as AdminTab, label: "Blog & Articles", icon: Newspaper },
        { id: "clients" as AdminTab, label: "Clients & Testimonials", icon: MessageSquareQuote },
        { id: "team" as AdminTab, label: "Executive Team", icon: Users },
        { id: "careers" as AdminTab, label: "Career Openings", icon: GraduationCap },
      ],
    },
    {
      title: "CRM & Inquiries",
      items: [
        { id: "inquiries" as AdminTab, label: "Inquiries & CRM", icon: Inbox, badge: inquiryCount },
        { id: "leads" as AdminTab, label: "Lead Pipeline", icon: TrendingUp },
      ],
    },
    {
      title: "Assets & Discovery",
      items: [
        { id: "media" as AdminTab, label: "Media Library", icon: ImageIcon },
        { id: "seo" as AdminTab, label: "SEO Manager", icon: Globe2 },
        { id: "navigation" as AdminTab, label: "Navigation Menus", icon: Compass },
      ],
    },
    {
      title: "Administration",
      items: [
        { id: "settings" as AdminTab, label: "Website Settings", icon: Settings },
        { id: "users" as AdminTab, label: "Admin Users & RBAC", icon: ShieldCheck },
        { id: "logs" as AdminTab, label: "Activity Audit Logs", icon: History },
        { id: "notifications" as AdminTab, label: "Notifications", icon: Bell },
        { id: "preview" as AdminTab, label: "Live Split Preview", icon: Eye },
      ],
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-[#0B1120] text-slate-300 border-r border-[#1E293B] flex flex-col justify-between transition-all duration-300 ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Top Branding */}
      <div className="flex flex-col border-b border-[#1E293B]">
        <div className="flex items-center justify-between p-4 sm:p-5">
          {!collapsed ? (
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/assets/logo/logo-horizontal.png"
                alt="Royal Business Machine"
                width={200}
                height={50}
                className="w-auto h-7 object-contain"
                priority
              />
            </Link>
          ) : (
            <div className="mx-auto w-9 h-9 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold font-bold text-sm">
              R
            </div>
          )}

          <button
            onClick={onToggleCollapse}
            className="p-1.5 rounded-lg bg-[#1E293B] hover:bg-[#334155] text-slate-300 transition-colors"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {!collapsed && (
          <div className="px-5 pb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">
              Enterprise CMS Portal
            </span>
          </div>
        )}
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
        {navSections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            {!collapsed && (
              <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                {section.title}
              </div>
            )}
            {section.items.map((item) => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  title={collapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group relative ${
                    isActive
                      ? "bg-gold text-charcoal font-bold shadow-md shadow-gold/20"
                      : "text-slate-300 hover:bg-[#1E293B] hover:text-white"
                  } ${collapsed ? "justify-center" : ""}`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isActive ? "text-charcoal" : "text-gold group-hover:scale-110"
                    }`}
                  />
                  {!collapsed && (
                    <span className="truncate flex-1 text-left">{item.label}</span>
                  )}
                  {!collapsed && item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isActive
                          ? "bg-charcoal text-gold"
                          : "bg-gold/20 text-gold border border-gold/30"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {collapsed && item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-gold" />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom User Pill */}
      <div className="p-3 border-t border-[#1E293B] bg-[#070D19]/60">
        {!collapsed ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 rounded-xl bg-[#1E293B]/70 border border-[#334155]/60">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-lg bg-gold/20 text-gold font-bold flex items-center justify-center text-xs shrink-0">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-white truncate">{currentUser.name}</div>
                  <div className="text-[10px] uppercase font-semibold text-gold tracking-wider">
                    {currentUser.role.replace("_", " ")}
                  </div>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                title="Log out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gold/20 text-gold font-bold flex items-center justify-center text-xs">
              {currentUser.name.charAt(0)}
            </div>
            <button
              onClick={onLogout}
              className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
