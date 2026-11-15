import type { Metadata } from "next";
import Link from "next/link";
import { CtaBanner } from "@/components/cta-banner";
import { RevealOnScroll, TiltCard } from "@/components/motion";
import {
  Linkedin,
  Twitter,
  Mail,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Users2,
  CheckCircle2,
} from "lucide-react";
import { VERIFIED_TEAM_MEMBERS } from "@/data/team-data";

export const metadata: Metadata = {
  title: "Executive Leadership & Team | Royal Business Machine",
  description:
    "Meet Founder & CEO Pavitra Arora driving Royal Business Machine's nationwide enterprise technology, institutional portals, and business automation platforms.",
  alternates: {
    canonical: "https://www.royalbusinessmachine.com/team",
  },
};

export default function TeamPage() {
  // Only verified and active team members are displayed publicly
  const verifiedMembers = VERIFIED_TEAM_MEMBERS.filter((m) => m.isActive);

  return (
    <div className="flex flex-col w-full overflow-hidden bg-background text-foreground">
      
      {/* 1. Hero Section */}
      <section className="py-20 lg:py-28 bg-white dark:bg-charcoal border-b border-border text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-6 relative z-10">
          <RevealOnScroll direction="down" distance={20}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/25">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Executive Leadership</span>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.1}>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-charcoal dark:text-warm-white font-heading">
              Leadership & <span className="gold-gradient-text">Engineering Execution</span>
            </h1>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.2}>
            <p className="text-base sm:text-xl text-slate-muted dark:text-slate-light leading-relaxed max-w-3xl mx-auto font-normal">
              Meet the executive leadership driving Royal Business Machine&apos;s digital transformation, institutional college portals, and high-concurrency systems across Rajasthan and emerging Indian markets.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* 2. Executive Leadership Showcase */}
      <section className="py-24 bg-warm-white dark:bg-charcoal/50 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {verifiedMembers.map((member, idx) => (
              <RevealOnScroll key={member.id} direction="up" delay={idx * 0.08} distance={25} className="h-full">
                <TiltCard tiltIntensity={6} glareOpacity={0.12} className="h-full">
                  <div
                    className={`h-full rounded-3xl bg-white dark:bg-charcoal border ${
                      member.featured
                        ? "border-gold shadow-lg ring-1 ring-gold/25"
                        : "border-border shadow-sm hover:border-gold/40"
                    } p-8 flex flex-col justify-between transition-all duration-300 group hover:shadow-xl hover:shadow-gold/5 relative overflow-hidden`}
                  >
                    {/* Ambient Gold Radial Glow */}
                    <div className="absolute -top-16 -right-16 w-36 h-36 bg-gold/10 rounded-full blur-2xl pointer-events-none" />

                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
                          {member.badge}
                        </span>
                        {member.featured && (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-gold">
                            <Award className="w-3.5 h-3.5" />
                            <span>Executive Leadership</span>
                          </span>
                        )}
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal dark:text-warm-white mb-1 font-heading group-hover:text-gold transition-colors duration-300">
                        {member.name}
                      </h2>
                      
                      <p className="text-xs font-semibold text-gold mb-4 uppercase tracking-wider">
                        {member.role}
                      </p>

                      <p className="text-xs sm:text-sm text-slate-muted leading-relaxed mb-6 font-normal">
                        {member.bio}
                      </p>

                      <div className="space-y-2 mb-6 border-t border-border/60 pt-4">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-muted">
                          Core Responsibilities & Domains
                        </div>
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
                      <span className="text-xs text-slate-muted font-medium">Verified Channels:</span>
                      <div className="flex items-center gap-3">
                        {member.socials.linkedin && (
                          <a
                            href={member.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-muted hover:text-gold transition-colors p-1"
                            aria-label={`${member.name} LinkedIn Profile`}
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
                            aria-label={`${member.name} Twitter Profile`}
                          >
                            <Twitter className="w-4 h-4" />
                          </a>
                        )}
                        {member.socials.mail && (
                          <a
                            href={member.socials.mail}
                            className="text-slate-muted hover:text-gold transition-colors p-1"
                            aria-label={`${member.name} Direct Email`}
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

            {/* Enterprise Delivery & Specialized Engineering Network Card */}
            <RevealOnScroll direction="up" delay={0.15} distance={25} className="h-full">
              <div className="h-full rounded-3xl bg-white/70 dark:bg-charcoal/70 backdrop-blur-md border border-border p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-border">
                      Operations Network
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-bold text-slate-muted">
                      <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                      <span>On-Ground Execution</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-charcoal dark:text-warm-white mb-2 font-heading">
                    Multidisciplinary Delivery Teams
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-muted leading-relaxed mb-6 font-normal">
                    Under the direct oversight of CEO Pavitra Arora, Royal Business Machine deploys vetted full-stack engineers, mobile app developers, UI/UX designers, and institutional procurement coordinators on dedicated client projects.
                  </p>

                  <div className="space-y-2 mb-6 border-t border-border/60 pt-4">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-muted">
                      Deployment Hubs
                    </div>
                    <ul className="text-xs text-slate-muted space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span>Headquarters: Bharatpur, Rajasthan</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span>Regional Centers: Karauli, Alwar, Dholpur, Jaipur</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span>National Deployments & Remote Cloud Architecture</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-xs font-bold text-gold hover:text-gold-light transition-colors group"
                  >
                    <span>Read Company History & Governance</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </RevealOnScroll>

            {/* Join Our Engineering Team Card */}
            <RevealOnScroll direction="up" delay={0.22} distance={25} className="h-full">
              <div className="h-full rounded-3xl bg-charcoal text-warm-white border border-gold/30 p-8 flex flex-col justify-between relative overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 w-36 h-36 bg-gold/15 rounded-full blur-2xl pointer-events-none" />

                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold/15 text-gold border border-gold/30 mb-6">
                    <Users2 className="w-3.5 h-3.5" />
                    <span>Careers & Talent</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-heading mb-2">
                    Join Our Engineering Team
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                    We are actively expanding our software engineering, mobile development, performance marketing, and client execution units. Join an organization building foundational infrastructure.
                  </p>

                  <div className="space-y-2 mb-6 border-t border-white/10 pt-4">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                      Open Focus Areas
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {["Next.js / React 19", "Flutter / Mobile", "Python AI / Rule Engines", "Technical SEO"].map(
                        (role, rIdx) => (
                          <span
                            key={rIdx}
                            className="text-[10px] px-2.5 py-1 rounded-lg bg-white/10 border border-white/10 text-slate-200"
                          >
                            {role}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <Link
                    href="/careers"
                    className="inline-flex items-center justify-center w-full gap-2 px-5 py-3 rounded-xl bg-gold text-charcoal font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition-all shadow-md group"
                  >
                    <span>View Open Positions</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </RevealOnScroll>

          </div>

        </div>
      </section>

      {/* 3. Conversion CTA Banner */}
      <CtaBanner
        title="Collaborate Directly with Founder & CEO Pavitra Arora"
        subtitle="Discuss your enterprise software, institutional portal, or mobile app architecture directly with company leadership."
      />
    </div>
  );
}
