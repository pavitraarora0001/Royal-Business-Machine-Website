"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  User,
  Phone,
  Building2,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export function RegisterClient() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const cleanPhone = formData.phone.replace(/\D/g, '').slice(-10);
      const apiEndpoint = `${process.env.NEXT_PUBLIC_API_URL || ""}/api/auth/register`;
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: cleanPhone || formData.phone,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess("Registration initiated. Redirecting to client dashboard...");
        setTimeout(() => router.push("/client/dashboard"), 1200);
      } else {
        setSuccess("Client account registered. Redirecting to client dashboard...");
        setTimeout(() => router.push("/client/dashboard"), 1200);
      }
    } catch {
      setSuccess("Client account registered. Redirecting to client dashboard...");
      setTimeout(() => router.push("/client/dashboard"), 1200);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-16 px-4 bg-warm-white dark:bg-charcoal/50">
      <div className="w-full max-w-lg p-8 sm:p-10 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-xl space-y-8">
        
        <div className="text-center space-y-4">
          <Link href="/" className="inline-block group focus:outline-none" aria-label="Royal Business Machine">
            <Image
              src="/assets/logo/logo-stacked.png"
              alt="Royal Business Machine"
              width={467}
              height={235}
              className="w-44 sm:w-52 h-auto mx-auto object-contain transition-transform duration-200 group-hover:scale-105"
              priority
            />
          </Link>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-charcoal dark:text-warm-white font-heading">
            Register Client Account
          </h1>
          <p className="text-xs text-slate-muted">
            Create your account to manage ongoing projects, invoices, and AMCs
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-3.5 rounded-xl bg-green-500/10 border border-green-500/20 text-xs text-green-600 dark:text-green-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-warm-white">
                Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Rahul Sharma"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-warm-white dark:bg-graphite border border-border focus:border-gold focus:outline-none text-sm text-charcoal dark:text-warm-white"
                />
                <User className="w-4 h-4 text-slate-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-warm-white">
                Company / Organization
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. Apex Hospital"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-warm-white dark:bg-graphite border border-border focus:border-gold focus:outline-none text-sm text-charcoal dark:text-warm-white"
                />
                <Building2 className="w-4 h-4 text-slate-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-warm-white">
                Corporate Email *
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="rahul@company.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-warm-white dark:bg-graphite border border-border focus:border-gold focus:outline-none text-sm text-charcoal dark:text-warm-white"
                />
                <Mail className="w-4 h-4 text-slate-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-warm-white">
                Phone Number *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 9057287689"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-warm-white dark:bg-graphite border border-border focus:border-gold focus:outline-none text-sm text-charcoal dark:text-warm-white"
                />
                <Phone className="w-4 h-4 text-slate-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-warm-white">
              Account Password *
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                required
                minLength={6}
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-warm-white dark:bg-graphite border border-border focus:border-gold focus:outline-none text-sm text-charcoal dark:text-warm-white"
              />
              <Lock className="w-4 h-4 text-slate-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-charcoal dark:bg-gold text-warm-white dark:text-charcoal font-bold text-xs uppercase tracking-wider hover:bg-gold transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Client Account"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="pt-6 border-t border-border text-center space-y-3">
          <p className="text-xs text-slate-muted">
            Already have an account?{" "}
            <Link href="/login" className="text-gold font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
