"use client";

import { useState, useEffect } from "react";
import { Settings, Phone, Clock, Share2, Shield, Save, CheckCircle2 } from "lucide-react";
import { getSettings, updateSettings } from "@/lib/admin-api";

export function SettingsTab() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "Royal Business Machine",
    tagline: "Enterprise Technology & Infrastructure Solutions",
    contactEmail: "info@royalbusinessmachine.com",
    salesEmail: "sales@royalbusinessmachine.com",
    supportEmail: "support@royalbusinessmachine.com",
    primaryPhone: "+91 98101 23456",
    secondaryPhone: "+91 11 2345 6789",
    whatsappNumber: "+919810123456",
    address: "Royal Tower, Tech Zone 4, Greater Noida, Delhi NCR, India - 201306",
    workingHoursWeekdays: "09:00 AM - 07:00 PM",
    workingHoursSaturday: "10:00 AM - 04:00 PM",
    workingHoursSunday: "Closed (Emergency Support Active)",
    linkedinUrl: "https://linkedin.com/company/royalbusinessmachine",
    twitterUrl: "https://twitter.com/royalbusiness",
    facebookUrl: "https://facebook.com/royalbusinessmachine",
    instagramUrl: "https://instagram.com/royalbusinessmachine",
    footerText: "Delivering world-class technology, biometric authentication, and enterprise infrastructure.",
    copyrightNotice: "© 2026 Royal Business Machine. All rights reserved.",
    googleMapsEmbedUrl: "https://maps.google.com/embed?pb=...",
    maintenanceMode: false,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const res = await getSettings();
      if (res?.data) {
        const s = res.data;
        setFormData((prev) => ({
          ...prev,
          ...s,
          // ensure nested or flat mapping
          primaryPhone: s.phones?.[0] || prev.primaryPhone,
          secondaryPhone: s.phones?.[1] || prev.secondaryPhone,
          contactEmail: s.emails?.[0] || prev.contactEmail,
          salesEmail: s.emails?.[1] || prev.salesEmail,
          address: typeof s.address === "string" ? s.address : s.address?.full || prev.address,
          linkedinUrl: s.socialLinks?.linkedin || prev.linkedinUrl,
          twitterUrl: s.socialLinks?.twitter || prev.twitterUrl,
          facebookUrl: s.socialLinks?.facebook || prev.facebookUrl,
          instagramUrl: s.socialLinks?.instagram || prev.instagramUrl,
        }));
      }
    } catch {
      // Keep defaults
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);
    try {
      const payload = {
        companyName: formData.companyName,
        tagline: formData.tagline,
        phones: [formData.primaryPhone, formData.secondaryPhone].filter(Boolean),
        emails: [formData.contactEmail, formData.salesEmail].filter(Boolean),
        whatsappNumber: formData.whatsappNumber,
        address: { full: formData.address },
        businessHours: {
          weekdays: formData.workingHoursWeekdays,
          saturday: formData.workingHoursSaturday,
          sunday: formData.workingHoursSunday,
        },
        socialLinks: {
          linkedin: formData.linkedinUrl,
          twitter: formData.twitterUrl,
          facebook: formData.facebookUrl,
          instagram: formData.instagramUrl,
        },
        footerCopyright: formData.copyrightNotice,
        footerDisclaimer: formData.footerText,
        maintenanceMode: formData.maintenanceMode,
      };

      await updateSettings(payload);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch {
      alert("Failed to save settings. Please verify backend connectivity.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Settings className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Global Website Settings</h2>
          </div>
          <p className="text-sm text-slate-500">
            Configure contact coordinates, brand identity, operating hours, and social channels.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving || loading}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-semibold transition shadow-sm disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving Changes..." : loading ? "Loading..." : "Save Settings"}
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          Global settings saved and synced across website endpoints!
        </div>
      )}

      {/* Grid of Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Brand Information */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
            <Shield className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Brand & Company Identity
            </h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Name</label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Company Tagline</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Physical Address</label>
            <textarea
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Contact Numbers & Channels */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
            <Phone className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Communication & Inquiries
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Primary Phone</label>
              <input
                type="text"
                value={formData.primaryPhone}
                onChange={(e) => setFormData({ ...formData, primaryPhone: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Secondary Phone</label>
              <input
                type="text"
                value={formData.secondaryPhone}
                onChange={(e) => setFormData({ ...formData, secondaryPhone: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">General Email</label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Sales Email</label>
              <input
                type="email"
                value={formData.salesEmail}
                onChange={(e) => setFormData({ ...formData, salesEmail: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              WhatsApp Click-to-Chat (With Country Code)
            </label>
            <input
              type="text"
              value={formData.whatsappNumber}
              onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Operating Hours */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
            <Clock className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Operating & Support Hours
            </h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Monday – Friday</label>
            <input
              type="text"
              value={formData.workingHoursWeekdays}
              onChange={(e) => setFormData({ ...formData, workingHoursWeekdays: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Saturday</label>
            <input
              type="text"
              value={formData.workingHoursSaturday}
              onChange={(e) => setFormData({ ...formData, workingHoursSaturday: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Sunday / Holidays</label>
            <input
              type="text"
              value={formData.workingHoursSunday}
              onChange={(e) => setFormData({ ...formData, workingHoursSunday: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Social Channels */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
            <Share2 className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Social Media Links
            </h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">LinkedIn Profile</label>
            <input
              type="url"
              value={formData.linkedinUrl}
              onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Twitter / X Profile</label>
            <input
              type="url"
              value={formData.twitterUrl}
              onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Facebook Page</label>
            <input
              type="url"
              value={formData.facebookUrl}
              onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
