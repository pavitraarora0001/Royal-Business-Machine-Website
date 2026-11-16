"use client";

import { useState, useEffect } from "react";
import { AdminSidebar, AdminTab } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { OverviewTab } from "@/components/admin/tabs/overview-tab";
import { CmsTab } from "@/components/admin/tabs/cms-tab";
import { HomepageTab } from "@/components/admin/tabs/homepage-tab";
import { ServicesTab } from "@/components/admin/tabs/services-tab";
import { ProductsTab } from "@/components/admin/tabs/products-tab";
import { PortfolioTab } from "@/components/admin/tabs/portfolio-tab";
import { MediaTab } from "@/components/admin/tabs/media-tab";
import { InquiriesTab } from "@/components/admin/tabs/inquiries-tab";
import { BlogTab } from "@/components/admin/tabs/blog-tab";
import { ClientsTab } from "@/components/admin/tabs/clients-tab";
import { TeamTab } from "@/components/admin/tabs/team-tab";
import { CareersTab } from "@/components/admin/tabs/careers-tab";
import { SeoTab } from "@/components/admin/tabs/seo-tab";
import { NavigationTab } from "@/components/admin/tabs/navigation-tab";
import { SettingsTab } from "@/components/admin/tabs/settings-tab";
import { UsersTab } from "@/components/admin/tabs/users-tab";
import { ActivityLogsTab } from "@/components/admin/tabs/activity-logs-tab";
import { getDashboardStats } from "@/lib/admin-api";

export function AdminDashboardClient() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [collapsed, setCollapsed] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [inquiryCount, setInquiryCount] = useState(4);
  const [currentUser, setCurrentUser] = useState({
    name: "Pavitra Arora",
    role: "super_admin",
    email: "admin@royalbusinessmachine.com",
  });

  useEffect(() => {
    // Check local storage for authenticated user
    try {
      const storedUser = localStorage.getItem("rbm_user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        if (parsed?.name && parsed?.email) {
          setCurrentUser({
            name: parsed.name,
            role: parsed.role || "super_admin",
            email: parsed.email,
          });
        }
      }
    } catch {
      // Keep super admin fallback
    }

    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setIsRefreshing(true);
    try {
      const stats = await getDashboardStats();
      if (stats?.data?.inquiries?.new !== undefined) {
        setInquiryCount(stats.data.inquiries.new);
      }
    } catch {
      // Keep default
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out of the Operations Center?")) {
      localStorage.removeItem("rbm_token");
      localStorage.removeItem("rbm_user");
      window.location.href = "/";
    }
  };

  const handleSelectTab = (tab: AdminTab) => {
    if (tab === "preview") {
      window.open("/", "_blank");
      return;
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab onNavigateTab={handleSelectTab} />;
      case "cms":
        return <CmsTab />;
      case "homepage":
        return <HomepageTab />;
      case "about":
        return <CmsTab defaultPage="about" />;
      case "services":
        return <ServicesTab />;
      case "products":
        return <ProductsTab />;
      case "portfolio":
        return <PortfolioTab />;
      case "media":
        return <MediaTab />;
      case "inquiries":
      case "leads":
        return <InquiriesTab />;
      case "blog":
        return <BlogTab />;
      case "clients":
        return <ClientsTab />;
      case "team":
        return <TeamTab />;
      case "careers":
        return <CareersTab />;
      case "seo":
        return <SeoTab />;
      case "navigation":
        return <NavigationTab />;
      case "settings":
        return <SettingsTab />;
      case "users":
        return <UsersTab />;
      case "logs":
        return <ActivityLogsTab />;
      case "notifications":
        return <InquiriesTab />;
      default:
        return <OverviewTab onNavigateTab={handleSelectTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex">
      {/* Collapsible Left Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        currentUser={currentUser}
        onLogout={handleLogout}
        inquiryCount={inquiryCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Sticky Topbar */}
        <AdminTopbar
          activeTab={activeTab}
          onRefresh={loadInitialData}
          isRefreshing={isRefreshing}
          unreadCount={inquiryCount}
        />

        {/* Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderActiveTabContent()}
        </main>
      </div>
    </div>
  );
}
