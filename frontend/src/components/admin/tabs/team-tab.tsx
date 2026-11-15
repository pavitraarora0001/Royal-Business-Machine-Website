"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Plus,
  Edit,
  Trash2,
  X,
  Star,
  Linkedin,
  Twitter,
  Mail,
} from "lucide-react";
import { adminApi } from "@/lib/admin-api";
import { VERIFIED_TEAM_MEMBERS } from "@/data/team-data";

interface AdminTeamItem {
  _id?: string;
  id: string | number;
  name: string;
  role: string;
  badge: string;
  bio: string;
  skills: string[];
  photo?: string;
  socials?: { linkedin?: string; twitter?: string; github?: string; mail?: string };
  isFeatured?: boolean;
  isActive?: boolean;
  order?: number;
}

export function TeamTab() {
  // Only verified authentic team members
  const [team, setTeam] = useState<AdminTeamItem[]>(() =>
    VERIFIED_TEAM_MEMBERS.map((m) => ({
      _id: String(m.id),
      id: m.id,
      name: m.name,
      role: m.role,
      badge: m.badge,
      bio: m.bio,
      skills: m.skills,
      photo: m.photo || "",
      socials: m.socials,
      isFeatured: m.featured,
      isActive: m.isActive,
      order: m.order,
    }))
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<AdminTeamItem | null>(null);
  const [formData, setFormData] = useState<Partial<AdminTeamItem>>({
    name: "",
    role: "",
    badge: "Engineering",
    bio: "",
    skills: [],
    photo: "",
    socials: { linkedin: "", twitter: "", github: "", mail: "" },
    isFeatured: false,
    isActive: true,
    order: 1,
  });
  const [skillInput, setSkillInput] = useState("");

  // Load from backend on mount if operational
  useEffect(() => {
    async function loadBackendTeam() {
      try {
        const res = (await adminApi.getTeam()) as {
          success?: boolean;
          data?: { team?: AdminTeamItem[] };
        };
        if (res?.data?.team && res.data.team.length > 0) {
          // Filter out any stale fictional records from DB
          const valid = res.data.team.filter(
            (t) =>
              !["A. Sterling", "Sarah Chen", "Marcus Johnson", "Elena Rodriguez", "David Kim"].includes(
                t.name
              )
          );
          if (valid.length > 0) {
            setTeam(valid);
          }
        }
      } catch {
        // Fallback to verified local data
      }
    }
    loadBackendTeam();
  }, []);

  const handleOpenAdd = () => {
    setEditingMember(null);
    setFormData({
      name: "",
      role: "",
      badge: "Engineering",
      bio: "",
      skills: ["Full-Stack", "Architecture"],
      photo: "",
      socials: { linkedin: "", twitter: "", github: "", mail: "" },
      isFeatured: false,
      isActive: true,
      order: team.length + 1,
    });
    setSkillInput("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (member: AdminTeamItem) => {
    setEditingMember(member);
    setFormData({
      ...member,
      socials: {
        linkedin: member.socials?.linkedin || "",
        twitter: member.socials?.twitter || "",
        github: member.socials?.github || "",
        mail: member.socials?.mail || "",
      },
    });
    setSkillInput("");
    setIsModalOpen(true);
  };

  const handleDelete = (id: string | number) => {
    if (confirm("Are you sure you want to remove this team member profile from the website?")) {
      setTeam(team.filter((t) => (t._id || t.id) !== id));
      adminApi.deleteTeamMember(id.toString());
    }
  };

  const handleTogglePublish = (id: string | number) => {
    setTeam(
      team.map((t) => {
        if ((t._id || t.id) === id) {
          const updated = { ...t, isActive: !t.isActive };
          adminApi.updateTeamMember(id.toString(), { isActive: updated.isActive });
          return updated;
        }
        return t;
      })
    );
  };

  const handleToggleFeatured = (id: string | number) => {
    setTeam(
      team.map((t) => {
        if ((t._id || t.id) === id) {
          const updated = { ...t, isFeatured: !t.isFeatured };
          adminApi.updateTeamMember(id.toString(), { isFeatured: updated.isFeatured });
          return updated;
        }
        return t;
      })
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.role) return;

    if (editingMember) {
      const updatedList = team.map((t) =>
        (t._id || t.id) === (editingMember._id || editingMember.id)
          ? ({ ...t, ...formData } as AdminTeamItem)
          : t
      );
      setTeam(updatedList);
      adminApi.updateTeamMember(
        (editingMember._id || editingMember.id).toString(),
        formData
      );
    } else {
      const newMember: AdminTeamItem = {
        ...formData,
        id: `tm-${Date.now()}`,
      } as AdminTeamItem;
      setTeam([...team, newMember]);
      adminApi.createTeamMember(newMember);
    }

    setIsModalOpen(false);
  };

  const addSkill = () => {
    if (skillInput.trim() && formData.skills) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()],
      });
      setSkillInput("");
    }
  };

  const removeSkill = (index: number) => {
    if (formData.skills) {
      setFormData({
        ...formData,
        skills: formData.skills.filter((_, i) => i !== index),
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/20 mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Verified Leadership & Team CMS</span>
          </div>
          <h2 className="text-2xl font-extrabold text-charcoal dark:text-warm-white font-heading">
            Team Member Management ({team.length})
          </h2>
          <p className="text-xs text-slate-muted">
            Manage real, verified Royal Business Machine executive and engineering profiles. Fictional profiles are strictly prohibited.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gold text-charcoal text-xs font-bold uppercase tracking-wider hover:bg-gold-light transition-all shadow-md shadow-gold/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Verified Member</span>
        </button>
      </div>

      {/* Team Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <div
            key={member._id || member.id}
            className={`p-7 rounded-3xl bg-white dark:bg-charcoal border ${
              member.isFeatured
                ? "border-gold shadow-md ring-1 ring-gold/20"
                : "border-border shadow-sm hover:border-gold/30"
            } flex flex-col justify-between space-y-6 transition-all`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
                  {member.badge}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleToggleFeatured(member._id || member.id)}
                    className={`p-1.5 rounded-lg border transition-all ${
                      member.isFeatured
                        ? "bg-gold/15 text-gold border-gold/30"
                        : "text-slate-muted border-border hover:border-gold/30"
                    }`}
                    title="Toggle Executive Spotlight"
                  >
                    <Star className={`w-3.5 h-3.5 ${member.isFeatured ? "fill-gold" : ""}`} />
                  </button>

                  <button
                    onClick={() => handleTogglePublish(member._id || member.id)}
                    className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      member.isActive
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                    }`}
                  >
                    {member.isActive ? "Published" : "Draft"}
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-bold text-charcoal dark:text-warm-white font-heading">
                {member.name}
              </h3>
              
              <p className="text-xs font-semibold text-gold mb-3 uppercase tracking-wider">
                {member.role}
              </p>

              <p className="text-xs text-slate-muted leading-relaxed line-clamp-3 mb-4 font-normal">
                {member.bio}
              </p>

              <div className="space-y-1.5 mb-4">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-muted">
                  Skills & Responsibilities:
                </div>
                <div className="flex flex-wrap gap-1">
                  {member.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Channels Preview */}
              <div className="flex items-center gap-2 pt-2 text-slate-muted">
                {member.socials?.linkedin && (
                  <span className="p-1 rounded bg-warm-white dark:bg-graphite" title="LinkedIn Linked">
                    <Linkedin className="w-3.5 h-3.5 text-gold" />
                  </span>
                )}
                {member.socials?.twitter && (
                  <span className="p-1 rounded bg-warm-white dark:bg-graphite" title="Twitter Linked">
                    <Twitter className="w-3.5 h-3.5 text-gold" />
                  </span>
                )}
                {member.socials?.mail && (
                  <span className="p-1 rounded bg-warm-white dark:bg-graphite" title="Email Linked">
                    <Mail className="w-3.5 h-3.5 text-gold" />
                  </span>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
              <span className="text-slate-muted text-[11px]">
                Order: {member.order || 1}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(member)}
                  className="px-3 py-1.5 rounded-lg text-gold hover:bg-gold/10 font-bold transition-colors flex items-center gap-1"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(member._id || member.id)}
                  className="px-3 py-1.5 rounded-lg text-red-500 hover:bg-red-500/10 font-bold transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT / CREATE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl my-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h3 className="text-xl font-bold text-charcoal dark:text-warm-white font-heading">
                  {editingMember ? "Edit Team Member" : "Add Verified Team Member"}
                </h3>
                <p className="text-[11px] text-slate-muted">
                  Ensure all details, names, and credentials correspond to real team members.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-muted hover:text-charcoal dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-muted uppercase mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
                    placeholder="e.g. Pavitra Arora"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-muted uppercase mb-1">
                    Actual Role / Designation *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
                    placeholder="e.g. Founder & Chief Executive Officer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-muted uppercase mb-1">
                    Badge / Department
                  </label>
                  <input
                    type="text"
                    value={formData.badge || ""}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
                    placeholder="e.g. Executive Leadership"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-muted uppercase mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.order || 1}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-muted uppercase mb-1">
                    Photo URL (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.photo || ""}
                    onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
                    placeholder="/assets/team/photo.jpg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-muted uppercase mb-1">
                  Biography & Background *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
                  placeholder="Actual responsibilities, experience, and background..."
                />
              </div>

              {/* Skills Tags */}
              <div>
                <label className="block font-bold text-slate-muted uppercase mb-1">
                  Skills & Core Competencies
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addSkill();
                      }
                    }}
                    placeholder="Add skill or responsibility tag..."
                    className="flex-1 px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="px-4 py-2 rounded-xl bg-gold text-charcoal font-bold hover:bg-gold-light"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {formData.skills?.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => removeSkill(idx)}
                        className="text-slate-muted hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Socials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border">
                <div>
                  <label className="block font-bold text-slate-muted uppercase mb-1">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="text"
                    value={formData.socials?.linkedin || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socials: { ...formData.socials, linkedin: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-muted uppercase mb-1">
                    Direct Email / Contact
                  </label>
                  <input
                    type="text"
                    value={formData.socials?.mail || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socials: { ...formData.socials, mail: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white focus:outline-none focus:border-gold"
                    placeholder="mailto:name@royalbusinessmachine.com"
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded text-gold focus:ring-0"
                  />
                  <span className="font-bold text-slate-muted">Executive Spotlight</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded text-gold focus:ring-0"
                  />
                  <span className="font-bold text-slate-muted">Published on Website</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-border text-slate-muted hover:text-charcoal dark:hover:text-white font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gold text-charcoal font-bold hover:bg-gold-light transition-all shadow-md"
                >
                  Save Team Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
