"use client";

import { useState, useEffect } from "react";
import { Users, UserPlus, CheckCircle2, Search, RefreshCw } from "lucide-react";
import { getAdminUsers, createAdminUser } from "@/lib/admin-api";

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: "super_admin" | "admin" | "editor" | "sales" | "client";
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

export function UsersTab() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // New user form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formRole, setFormRole] = useState<"admin" | "editor" | "sales">("admin");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await getAdminUsers();
      if (res?.data && res.data.length > 0) {
        setUsers(res.data);
      } else {
        // Fallback default
        setUsers([
          {
            _id: "u-1",
            name: "Super Administrator",
            email: "admin@royalbusinessmachine.com",
            role: "super_admin",
            isActive: true,
            createdAt: new Date().toISOString(),
          },
          {
            _id: "u-2",
            name: "Editorial Manager",
            email: "editor@royalbusinessmachine.com",
            role: "editor",
            isActive: true,
            createdAt: new Date().toISOString(),
          },
          {
            _id: "u-3",
            name: "Sales Director",
            email: "sales@royalbusinessmachine.com",
            role: "sales",
            isActive: true,
            createdAt: new Date().toISOString(),
          },
        ]);
      }
    } catch {
      // Fallback
      setUsers([
        {
          _id: "u-1",
          name: "Super Administrator",
          email: "admin@royalbusinessmachine.com",
          role: "super_admin",
          isActive: true,
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setSubmitting(true);
    try {
      await createAdminUser({
        name: formName,
        email: formEmail,
        password: formPassword,
        role: formRole,
      });
      setSuccessMsg("Admin user created successfully!");
      setModalOpen(false);
      setFormName("");
      setFormEmail("");
      setFormPassword("");
      loadUsers();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to create user";
      setErrorMsg(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "super_admin":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">SUPER ADMIN</span>;
      case "admin":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">ADMIN</span>;
      case "editor":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">EDITOR</span>;
      case "sales":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">SALES</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">{role.toUpperCase()}</span>;
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Admin Users & Permissions (RBAC)</h2>
          </div>
          <p className="text-sm text-slate-500">
            Control dashboard access roles: Super Admin, Administrator, Content Editor, and Sales Representative.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadUsers}
            disabled={loading}
            className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-semibold transition shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            Create Admin User
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          {successMsg}
        </div>
      )}

      {/* Role explanation */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/40 rounded-xl">
          <p className="font-bold text-purple-900 dark:text-purple-300">Super Admin</p>
          <p className="text-purple-700 dark:text-purple-400/80 mt-0.5">Full root permissions, system configs & user creation</p>
        </div>
        <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 rounded-xl">
          <p className="font-bold text-amber-900 dark:text-amber-300">Administrator</p>
          <p className="text-amber-700 dark:text-amber-400/80 mt-0.5">CMS pages, services, portfolio, blog & media management</p>
        </div>
        <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/40 rounded-xl">
          <p className="font-bold text-blue-900 dark:text-blue-300">Content Editor</p>
          <p className="text-blue-700 dark:text-blue-400/80 mt-0.5">Can draft and publish blogs, case studies & page sections</p>
        </div>
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 rounded-xl">
          <p className="font-bold text-emerald-900 dark:text-emerald-300">Sales Representative</p>
          <p className="text-emerald-700 dark:text-emerald-400/80 mt-0.5">Inquiry & CRM pipeline management, follow-ups</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search administrators by name, email, or role..."
          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white"
        />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 text-xs font-semibold uppercase">
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4 text-center">Assigned Role</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-right">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((user) => (
              <tr key={user._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center font-bold text-xs uppercase">
                    {user.name.slice(0, 2)}
                  </div>
                  <span>{user.name}</span>
                </td>
                <td className="py-3.5 px-4 font-mono text-xs text-slate-600 dark:text-slate-400">
                  {user.email}
                </td>
                <td className="py-3.5 px-4 text-center">{getRoleBadge(user.role)}</td>
                <td className="py-3.5 px-4 text-center">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Active
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right text-xs text-slate-500 font-mono">
                  {new Date(user.createdAt).toLocaleDateString()}
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
              Add New Administrative User
            </h3>

            {errorMsg && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-lg text-xs font-semibold text-rose-800 dark:text-rose-300 mb-4">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="e.g. ramesh@royalbusinessmachine.com"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Initial Password
                </label>
                <input
                  type="password"
                  required
                  value={formPassword}
                  onChange={(e) => setFormPassword(e.target.value)}
                  placeholder="Min 8 characters"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Administrative Role
                </label>
                <select
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value as "admin" | "editor" | "sales")}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white"
                >
                  <option value="admin">Administrator (All CMS + Media)</option>
                  <option value="editor">Content Editor (Blogs + Content)</option>
                  <option value="sales">Sales Representative (CRM & Inquiries)</option>
                </select>
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
                  disabled={submitting}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-semibold transition disabled:opacity-50"
                >
                  {submitting ? "Creating..." : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
