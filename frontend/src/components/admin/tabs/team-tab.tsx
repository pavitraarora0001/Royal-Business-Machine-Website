"use client";

import { useState } from "react";
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Award,
  X
} from "lucide-react";
import { adminApi } from "@/lib/admin-api";

interface TeamMemberItem {
  id: string;
  name: string;
  role: string;
  badge: string;
  bio: string;
  skills: string[];
  socials?: { linkedin?: string; twitter?: string; github?: string; mail?: string };
  isFeatured?: boolean;
}

export function TeamTab() {
  const [team, setTeam] = useState<TeamMemberItem[]>([
    {
      id: "tm-1",
      name: "Pavitra Arora",
      role: "Founder & Chief Executive Officer",
      badge: "Executive Leadership",
      bio: "Entrepreneur building India's integrated business infrastructure platform. 6+ years driving enterprise deployments, government college portals, and creator of NyayaSetu & Dairy Muneem.",
      skills: ["Business Strategy", "Institutional Execution", "SaaS Product Architecture", "Venture Growth"],
      socials: {
        linkedin: "https://www.linkedin.com/company/royal-business-machine",
        twitter: "https://twitter.com/royalbizmachine",
        mail: "mailto:royalbusinessmachine@gmail.com",
      },
      isFeatured: true,
    },
    {
      id: "tm-2",
      name: "A. Sterling",
      role: "Chief Technology Officer & Cloud Architect",
      badge: "Engineering",
      bio: "Specializing in high-concurrency microservices, cloud deployments on AWS/GCP, distributed databases, and high-security enterprise ERP systems.",
      skills: ["Next.js / React 19", "Node.js & Go", "PostgreSQL & Redis", "Cloud Security"],
      isFeatured: false,
    },
    {
      id: "tm-3",
      name: "Sarah Chen",
      role: "Lead Full-Stack Software Engineer",
      badge: "Core Engineering",
      bio: "Leads frontend engineering and mobile app development across iOS and Android ecosystems, with deep expertise in offline synchronization.",
      skills: ["React Native", "Flutter", "TypeScript", "Tailwind CSS"],
      isFeatured: false,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMemberItem | null>(null);
  const [formData, setFormData] = useState<Partial<TeamMemberItem>>({
    name: "",
    role: "",
    badge: "Core Team",
    bio: "",
    skills: [],
    isFeatured: false,
  });
  const [skillInput, setSkillInput] = useState("");

  const handleOpenAdd = () => {
    setEditingMember(null);
    setFormData({
      name: "",
      role: "",
      badge: "Core Team",
      bio: "",
      skills: ["Next.js", "TypeScript"],
      isFeatured: false,
    });
    setSkillInput("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (member: TeamMemberItem) => {
    setEditingMember(member);
    setFormData({ ...member });
    setSkillInput("");
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Remove this team member profile?")) {
      setTeam(team.filter((t) => t.id !== id));
      adminApi.deleteTeamMember(id);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.role) return;

    if (editingMember) {
      setTeam(
        team.map((t) => (t.id === editingMember.id ? { ...t, ...formData } as TeamMemberItem : t))
      );
      adminApi.updateTeamMember(editingMember.id, formData);
    } else {
      const newMember: TeamMemberItem = {
        ...formData,
        id: `tm-${Date.now()}`,
      } as TeamMemberItem;
      setTeam([...team, newMember]);
      adminApi.createTeamMember(newMember);
    }

    setIsModalOpen(false);
  };

  const addSkill = () => {
    if (skillInput.trim() && formData.skills) {
      setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] });
      setSkillInput("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/20 mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Human Capital & Leadership</span>
          </div>
          <h2 className="text-2xl font-extrabold text-charcoal dark:text-warm-white font-heading">
            Executive Leadership & Team ({team.length})
          </h2>
          <p className="text-xs text-slate-muted">
            Manage profiles, leadership biographies, and specializations displayed on /team.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gold text-charcoal text-xs font-bold uppercase tracking-wider hover:bg-gold-light transition-all shadow-md shadow-gold/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <div
            key={member.id}
            className="p-6 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold bg-gold/10 px-2.5 py-0.5 rounded-full border border-gold/20">
                  {member.badge}
                </span>
                {member.isFeatured && (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-gold">
                    <Award className="w-3.5 h-3.5" />
                    <span>Key Exec</span>
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-charcoal dark:text-warm-white font-heading">
                {member.name}
              </h3>
              <p className="text-xs text-gold font-semibold mb-2">{member.role}</p>
              <p className="text-xs text-slate-muted leading-relaxed line-clamp-3 mb-4">
                {member.bio}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/60">
                {member.skills?.map((s, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2 py-0.5 rounded-lg bg-warm-white dark:bg-graphite border border-border text-charcoal/80 dark:text-warm-white/80"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between">
              <span className="text-xs text-slate-muted">Actions</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(member)}
                  className="p-1.5 rounded-lg border border-border text-slate-muted hover:text-gold"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="p-1.5 rounded-lg border border-border text-slate-muted hover:text-red-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white dark:bg-charcoal border border-border rounded-3xl p-8 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="text-lg font-bold text-charcoal dark:text-warm-white font-heading">
                {editingMember ? "Edit Team Profile" : "Add Team Member"}
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-slate-muted" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold uppercase tracking-wider block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white"
                />
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider block mb-1">Role / Designation *</label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g. Lead Cloud Architect"
                  className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white"
                />
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider block mb-1">Department / Badge</label>
                <input
                  type="text"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="e.g. Core Engineering"
                  className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white"
                />
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider block mb-1">Biography</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Professional experience and technical scope..."
                  className="w-full px-3 py-2 rounded-xl bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white leading-relaxed"
                />
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider block mb-1">Specializations & Skills</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="e.g. Next.js 16"
                    className="flex-1 px-3 py-1.5 rounded-xl bg-warm-white dark:bg-graphite border border-border text-xs"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="px-3 py-1.5 rounded-xl bg-gold/15 text-gold border border-gold/30 text-xs font-bold"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {formData.skills?.map((s, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-warm-white dark:bg-graphite border border-border text-[11px]"
                    >
                      <span>{s}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            skills: formData.skills?.filter((_, i) => i !== idx),
                          })
                        }
                        className="text-slate-400 hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-border text-slate-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gold text-charcoal font-bold uppercase tracking-wider shadow-md"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
