// Administrative API Client for Royal Business Machine
const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL || "";
};

const getAuthHeaders = () => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("rbm_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return headers;
};

// Generic fetch wrapper with graceful error handling
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  fallbackData?: T
): Promise<{ success: boolean; data?: T; message?: string }> {
  try {
    const url = `${getBaseUrl()}${endpoint}`;
    const headers = options.headers ? options.headers : getAuthHeaders();

    const res = await fetch(url, {
      ...options,
      headers: headers as HeadersInit,
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      if (fallbackData) {
        return { success: true, data: fallbackData };
      }
      return {
        success: false,
        message: errJson.message || `Request failed with status ${res.status}`,
      };
    }

    const json = await res.json();
    return json;
  } catch (error: unknown) {
    if (fallbackData) {
      return { success: true, data: fallbackData };
    }
    const msg = error instanceof Error ? error.message : "Network error";
    return { success: false, message: msg };
  }
}

export interface DashboardStatsData {
  services?: { total: number; active: number };
  portfolio?: { total: number; featured: number };
  inquiries?: { total: number; new: number; converted: number };
  leads?: { total: number; active: number };
  blogs?: { total: number; published: number };
  testimonials?: { total: number };
  team?: { total: number };
  careers?: { total: number };
  media?: { total: number };
  recentInquiries?: Array<{
    id: string;
    name: string;
    email: string;
    phone?: string;
    service?: string;
    budget?: string;
    status: string;
    date: string;
  }>;
}

export interface PageCmsEntry {
  pageSlug: string;
  pageTitle: string;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  ogImage?: string;
  noIndex?: boolean;
  keywords?: string[];
  sections?: Array<Record<string, unknown>>;
  isPublished?: boolean;
  version?: number;
}

export interface UserEntry {
  _id: string;
  name: string;
  email: string;
  role: "super_admin" | "admin" | "editor" | "sales" | "client";
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

export interface ActivityLogEntry {
  _id: string;
  user?: {
    name?: string;
    email?: string;
    role?: string;
  };
  action: string;
  module: string;
  targetName?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  createdAt: string;
}

export interface SettingsData {
  companyName?: string;
  tagline?: string;
  phones?: string[];
  emails?: string[];
  whatsappNumber?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    full?: string;
  };
  businessHours?: {
    weekdays?: string;
    saturday?: string;
    sunday?: string;
  };
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  footerCopyright?: string;
  footerDisclaimer?: string;
  maintenanceMode?: boolean;
}

export const adminApi = {
  // 1. Overview & Stats
  async getStats() {
    return apiRequest<DashboardStatsData>("/api/admin/stats");
  },

  async getAnalytics(days: number = 30) {
    return apiRequest(`/api/admin/analytics?days=${days}`);
  },

  // 2. Website CMS Pages
  async getPages() {
    return apiRequest<PageCmsEntry[]>("/api/cms/pages");
  },

  async getPage(slug: string) {
    return apiRequest(`/api/cms/pages/${slug}`);
  },

  async updatePage(slug: string, data: unknown) {
    return apiRequest(`/api/cms/pages/${slug}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async publishPage(slug: string) {
    return apiRequest(`/api/cms/pages/${slug}/publish`, {
      method: "POST",
    });
  },

  // 3. Services Management
  async getServices(category?: string) {
    const query = category ? `?category=${encodeURIComponent(category)}` : "";
    return apiRequest(`/api/services${query}`);
  },

  async createService(data: unknown) {
    return apiRequest("/api/services", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async updateService(id: string, data: unknown) {
    return apiRequest(`/api/services/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async deleteService(id: string) {
    return apiRequest(`/api/services/${id}`, {
      method: "DELETE",
    });
  },

  // 4. Portfolio & Projects
  async getPortfolio(category?: string) {
    const query = category ? `?category=${encodeURIComponent(category)}` : "";
    return apiRequest(`/api/portfolio${query}`);
  },

  async getProjects(category?: string) {
    return this.getPortfolio(category);
  },

  async createPortfolio(data: unknown) {
    return apiRequest("/api/portfolio", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async createProject(data: unknown) {
    return this.createPortfolio(data);
  },

  async updatePortfolio(id: string, data: unknown) {
    return apiRequest(`/api/portfolio/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async updateProject(id: string, data: unknown) {
    return this.updatePortfolio(id, data);
  },

  async deletePortfolio(id: string) {
    return apiRequest(`/api/portfolio/${id}`, {
      method: "DELETE",
    });
  },

  async deleteProject(id: string) {
    return this.deletePortfolio(id);
  },

  // 5. Media Library
  async getMedia(params?: { folder?: string; type?: string; search?: string }) {
    const q = new URLSearchParams();
    if (params?.folder) q.append("folder", params.folder);
    if (params?.type) q.append("type", params.type);
    if (params?.search) q.append("search", params.search);
    const queryString = q.toString() ? `?${q.toString()}` : "";
    return apiRequest(`/api/media${queryString}`);
  },

  async uploadMedia(formData: FormData) {
    try {
      const url = `${getBaseUrl()}/api/media/upload`;
      const token = typeof window !== "undefined" ? localStorage.getItem("rbm_token") : null;
      const headers: Record<string, string> = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(url, {
        method: "POST",
        headers,
        body: formData,
      });

      return await res.json();
    } catch (err: unknown) {
      return {
        success: false,
        message: err instanceof Error ? err.message : "Upload error",
      };
    }
  },

  async updateMedia(id: string, data: Record<string, unknown>) {
    return apiRequest(`/api/media/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  async deleteMedia(id: string) {
    return apiRequest(`/api/media/${id}`, {
      method: "DELETE",
    });
  },

  // 6. Inquiries & CRM Leads
  async getLeads(status?: string) {
    const query = status ? `?status=${encodeURIComponent(status)}` : "";
    return apiRequest(`/api/leads${query}`);
  },

  async getInquiries(status?: string, search?: string) {
    const q = new URLSearchParams();
    if (status) q.append("status", status);
    if (search) q.append("search", search);
    const queryString = q.toString() ? `?${q.toString()}` : "";
    return apiRequest(`/api/crm/leads${queryString}`);
  },

  async updateLeadStatus(id: string, status: string) {
    return apiRequest(`/api/leads/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },

  async updateInquiryStatus(id: string, status: string, notes?: string) {
    return apiRequest(`/api/crm/leads/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status, notes }),
    });
  },

  async addLeadNote(id: string, note: string) {
    return apiRequest(`/api/crm/leads/${id}/notes`, {
      method: "POST",
      body: JSON.stringify({ note }),
    });
  },

  async addInquiryNote(id: string, note: string) {
    return this.addLeadNote(id, note);
  },

  async assignLead(id: string, assignedTo: string) {
    return apiRequest(`/api/crm/leads/${id}/assign`, {
      method: "PATCH",
      body: JSON.stringify({ assignedTo }),
    });
  },

  async exportLeadsUrl() {
    return `${getBaseUrl()}/api/crm/leads/export/csv`;
  },

  // 7. Blog & News
  async getBlogs(params?: { category?: string; search?: string; status?: string }) {
    const q = new URLSearchParams();
    if (params?.category) q.append("category", params.category);
    if (params?.search) q.append("search", params.search);
    if (params?.status) q.append("status", params.status);
    const queryString = q.toString() ? `?${q.toString()}` : "";
    return apiRequest(`/api/blogs${queryString}`);
  },

  async createBlog(data: unknown) {
    return apiRequest("/api/blogs", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async updateBlog(id: string, data: unknown) {
    return apiRequest(`/api/blogs/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async deleteBlog(id: string) {
    return apiRequest(`/api/blogs/${id}`, {
      method: "DELETE",
    });
  },

  // 8. Clients & Testimonials
  async getTestimonials() {
    return apiRequest("/api/crm/testimonials");
  },

  async createTestimonial(data: unknown) {
    return apiRequest("/api/crm/testimonials", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async updateTestimonial(id: string, data: unknown) {
    return apiRequest(`/api/crm/testimonials/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async deleteTestimonial(id: string) {
    return apiRequest(`/api/crm/testimonials/${id}`, {
      method: "DELETE",
    });
  },

  // 9. Team Members
  async getTeam() {
    return apiRequest("/api/crm/team");
  },

  async createTeamMember(data: unknown) {
    return apiRequest("/api/crm/team", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async updateTeamMember(id: string, data: unknown) {
    return apiRequest(`/api/crm/team/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async deleteTeamMember(id: string) {
    return apiRequest(`/api/crm/team/${id}`, {
      method: "DELETE",
    });
  },

  // 10. Careers
  async getCareers() {
    return apiRequest("/api/crm/careers");
  },

  async createCareer(data: unknown) {
    return apiRequest("/api/crm/careers", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async updateCareer(id: string, data: unknown) {
    return apiRequest(`/api/crm/careers/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async deleteCareer(id: string) {
    return apiRequest(`/api/crm/careers/${id}`, {
      method: "DELETE",
    });
  },

  // 11. Website Settings
  async getSettings() {
    return apiRequest<SettingsData>("/api/settings");
  },

  async updateSettings(data: unknown) {
    return apiRequest("/api/settings", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  // 12. Admin Users & Roles
  async getUsers() {
    return apiRequest<UserEntry[]>("/api/admin/users");
  },

  async createUser(data: unknown) {
    return apiRequest("/api/admin/users", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async updateUserRole(id: string, role: string) {
    return apiRequest(`/api/admin/users/${id}/role`, {
      method: "PATCH",
      body: JSON.stringify({ role }),
    });
  },

  async toggleUserStatus(id: string) {
    return apiRequest(`/api/admin/users/${id}/status`, {
      method: "PATCH",
    });
  },

  // 13. Activity Logs
  async getActivityLogs(params?: { module?: string; action?: string }) {
    const q = new URLSearchParams();
    if (params?.module) q.append("module", params.module);
    if (params?.action) q.append("action", params.action);
    const queryString = q.toString() ? `?${q.toString()}` : "";
    return apiRequest<ActivityLogEntry[]>(`/api/admin/activity-logs${queryString}`);
  },
};

// Named function exports for direct tab imports
export const getDashboardStats = () => adminApi.getStats();
export const getAnalytics = (days?: number) => adminApi.getAnalytics(days);

export const getPageCmsList = () => adminApi.getPages();
export const getPageCms = (slug: string) => adminApi.getPage(slug);
export const updatePageCms = (slug: string, data: unknown) => adminApi.updatePage(slug, data);
export const publishPageCms = (slug: string) => adminApi.publishPage(slug);

export const getServices = (category?: string) => adminApi.getServices(category);
export const createService = (data: unknown) => adminApi.createService(data);
export const updateService = (id: string, data: unknown) => adminApi.updateService(id, data);
export const deleteService = (id: string) => adminApi.deleteService(id);

export const getPortfolios = (category?: string) => adminApi.getProjects(category);
export const createPortfolio = (data: unknown) => adminApi.createProject(data);
export const updatePortfolio = (id: string, data: unknown) => adminApi.updateProject(id, data);
export const deletePortfolio = (id: string) => adminApi.deleteProject(id);

export const getMediaFiles = (folder?: string, mimeType?: string) => adminApi.getMedia({ folder, type: mimeType });
export const uploadMediaFile = (formData: FormData) => adminApi.uploadMedia(formData);
export const deleteMediaFile = (id: string) => adminApi.deleteMedia(id);

export const getInquiries = (status?: string, search?: string) => adminApi.getInquiries(status, search);
export const updateInquiryStatus = (id: string, status: string, notes?: string) => adminApi.updateInquiryStatus(id, status, notes);
export const addInquiryNote = (id: string, note: string) => adminApi.addInquiryNote(id, note);

export const getBlogs = (status?: string) => adminApi.getBlogs(status ? { status } : undefined);
export const createBlog = (data: unknown) => adminApi.createBlog(data);
export const updateBlog = (id: string, data: unknown) => adminApi.updateBlog(id, data);
export const deleteBlog = (id: string) => adminApi.deleteBlog(id);

export const getTestimonials = () => adminApi.getTestimonials();
export const createTestimonial = (data: unknown) => adminApi.createTestimonial(data);
export const updateTestimonial = (id: string, data: unknown) => adminApi.updateTestimonial(id, data);
export const deleteTestimonial = (id: string) => adminApi.deleteTestimonial(id);

export const getTeam = () => adminApi.getTeam();
export const createTeamMember = (data: unknown) => adminApi.createTeamMember(data);
export const updateTeamMember = (id: string, data: unknown) => adminApi.updateTeamMember(id, data);
export const deleteTeamMember = (id: string) => adminApi.deleteTeamMember(id);

export const getCareers = () => adminApi.getCareers();
export const createCareer = (data: unknown) => adminApi.createCareer(data);
export const updateCareer = (id: string, data: unknown) => adminApi.updateCareer(id, data);
export const deleteCareer = (id: string) => adminApi.deleteCareer(id);

export const getSettings = () => adminApi.getSettings();
export const updateSettings = (data: unknown) => adminApi.updateSettings(data);

export const getAdminUsers = () => adminApi.getUsers();
export const createAdminUser = (data: unknown) => adminApi.createUser(data);
export const updateAdminUserRole = (id: string, role: string) => adminApi.updateUserRole(id, role);
export const toggleAdminUserStatus = (id: string) => adminApi.toggleUserStatus(id);

export const getActivityLogs = (params?: { module?: string; action?: string }) => adminApi.getActivityLogs(params);

