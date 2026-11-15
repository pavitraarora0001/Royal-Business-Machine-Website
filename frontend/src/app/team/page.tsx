import type { Metadata } from "next";
import Link from "next/link";
import { CtaBanner } from "@/components/cta-banner";
import { RevealOnScroll, TiltCard } from "@/components/motion";
import {
  Linkedin,
  Twitter,
  Mail,
  Github,
  Award,
  Sparkles,
  ArrowRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "Executive Leadership & Team | Royal Business Machine",
  description:
    "Meet Founder & CEO Pavitra Arora and the multidisciplinary engineering, design, and growth specialists driving Royal Business Machine's nationwide platform.",
};

const teamMembers = [
  {
    id: 1,
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
    featured: true,
  },
  {
    id: 2,
    name: "A. Sterling",
    role: "Chief Technology Officer & Cloud Architect",
    badge: "Engineering",
    bio: "Specializing in high-concurrency microservices, cloud deployments on AWS/GCP, distributed databases, and high-security enterprise ERP systems.",
    skills: ["Next.js / React 19", "Node.js & Go", "PostgreSQL & Redis", "Cloud Security"],
    socials: { linkedin: "#", github: "#" },
    featured: false,
  },
  {
    id: 3,
    name: "Sarah Chen",
    role: "Lead Full-Stack Software Engineer",
    badge: "Core Engineering",
    bio: "Leads frontend engineering and mobile app development across iOS and Android ecosystems, with deep expertise in offline synchronization.",
    skills: ["React Native", "Flutter", "TypeScript", "Tailwind CSS"],
    socials: { linkedin: "#", github: "#" },
    featured: false,
  },
  {
    id: 4,
    name: "Marcus Johnson",
    role: "UI/UX Design Director",
    badge: "Design",
    bio: "Directs luxury corporate design systems, human-centered UI/UX ergonomics, and brand identity standards for institutional and commercial clients.",
    skills: ["Design Systems", "Figma Prototyping", "User Research", "Brand Identity"],
    socials: { linkedin: "#", twitter: "#" },
    featured: false,
  },
  {
    id: 5,
    name: "Elena Rodriguez",
    role: "Head of Digital Marketing & Performance Growth",
    badge: "Growth",
    bio: "Architects high-ROI search engine optimization campaigns, Meta and Google Ads lead funnels, and enterprise brand awareness strategies.",
    skills: ["SEO Technical Audits", "PPC Management", "B2B Lead Funnels", "Conversion CRO"],
    socials: { linkedin: "#", twitter: "#", mail: "#" },
    featured: false,
  },
  {
    id: 6,
    name: "David Kim",
    role: "Director of Institutional Operations",
    badge: "Operations",
    bio: "Oversees public sector tender execution, smart computer lab hardware setups, AMC logistics, and educational campus deployments.",
    skills: ["Tender Execution", "Hardware Infrastructure", "Quality Assurance", "Client Relations"],
    socials: { linkedin: "#", mail: "#" },
    featured: false,
  },
];

export default function TeamPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="py-20 lg:py-28 bg-white dark:bg-charcoal border-b border-border text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-6 relative z-10">
          <RevealOnScroll direction="down" distance={20}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/25">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Human Capital & Expertise</span>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.1}>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-charcoal dark:text-warm-white font-heading">
              Executive Leadership & <span className="gold-gradient-text">Engineering Team</span>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.2}>
            <p className="text-base sm:text-xl text-slate-muted dark:text-slate-light leading-relaxed max-w-3xl mx-auto font-normal">
              The visionary minds, cloud architects, designers, and operational directors driving digital transformation across enterprise and institutional markets.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* 2. Team Grid */}
      <section className="py-24 bg-warm-white dark:bg-charcoal/50 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, idx) => (
              <RevealOnScroll key={member.id} direction="up" delay={idx * 0.08} distance={25} className="h-full">
                <TiltCard tiltIntensity={6} glareOpacity={0.12} className="h-full">
                  <div
                    className={`h-full rounded-3xl bg-white dark:bg-charcoal border ${
                      member.featured
                        ? "border-gold shadow-lg ring-1 ring-gold/20"
                        : "border-border shadow-sm hover:border-gold/40"
                    } p-8 flex flex-col justify-between transition-all duration-300 group hover:shadow-xl hover:shadow-gold/5`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
                          {member.badge}
                        </span>
                        {member.featured && (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-gold">
                            <Award className="w-3.5 h-3.5" />
                            <span>Key Executive</span>
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl font-bold text-charcoal dark:text-warm-white mb-1 font-heading group-hover:text-gold transition-colors duration-300">
                        {member.name}
                      </h3>
                      
                      <p className="text-xs font-semibold text-gold mb-4">
                        {member.role}
                      </p>

                      <p className="text-xs sm:text-sm text-slate-muted leading-relaxed mb-6 font-normal">
                        {member.bio}
                      </p>

                      <div className="space-y-2 mb-6 border-t border-border/60 pt-4">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-muted">Specializations</div>
                        <div className="flex flex-wrap gap-1.5">
                          {member.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-[11px] px-2.5 py-1 rounded-lg bg-warm-white dark:bg-graphite border border-border text-charcoal/80 dark:text-warm-white/80 group-hover:border-gold/20 transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-border pt-4 flex items-center justify-between">
                      <span className="text-xs text-slate-muted">Connect:</span>
                      <div className="flex items-center gap-3">
                        {member.socials.linkedin && (
                          <a
                            href={member.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-muted hover:text-gold transition-colors p-1"
                            aria-label={`${member.name} LinkedIn`}
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                        {member.socials.twitter && (
                          <a
                            href={member.socials.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-muted hover:text-gold transition-colors p-1"
                            aria-label={`${member.name} Twitter`}
                          >
                            <Twitter className="w-4 h-4" />
                          </a>
                        )}
                        {member.socials.github && (
                          <a
                            href={member.socials.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-muted hover:text-gold transition-colors p-1"
                            aria-label={`${member.name} GitHub`}
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {member.socials.mail && (
                          <a
                            href={member.socials.mail}
                            className="text-slate-muted hover:text-gold transition-colors p-1"
                            aria-label={`${member.name} Email`}
                          >
                            <Mail className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                  </div>
                </TiltCard>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll direction="up" delay={0.2}>
            <div className="mt-16 text-center bg-white dark:bg-charcoal border border-border rounded-3xl p-8 max-w-3xl mx-auto shadow-sm">
              <h3 className="text-xl font-bold text-charcoal dark:text-warm-white mb-2 font-heading">
                Looking to Build With Us?
              </h3>
              <p className="text-xs sm:text-sm text-slate-muted mb-6">
                We are expanding our engineering, UI/UX, and regional business development teams.
              </p>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-charcoal dark:bg-gold text-warm-white dark:text-charcoal font-semibold text-xs uppercase tracking-wider hover:bg-gold dark:hover:bg-warm-white transition-all shadow-md"
              >
                <span>Explore Open Positions</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </RevealOnScroll>

        </div>
      </section>

      {/* 3. Conversion CTA */}
      <CtaBanner
        title="Collaborate Directly with Our Leadership"
        subtitle="Discuss your custom enterprise software, mobile app, or institutional tender requirements directly with Founder & CEO Pavitra Arora."
      />
    </div>
  );
}
