import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  PORTFOLIO_PROJECTS,
} from "@/data/portfolio-data";
import { CtaBanner } from "@/components/cta-banner";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building2,
  Tag,
  Briefcase,
  Layers,
  Sparkles,
  ChevronRight,
  Award,
} from "lucide-react";

interface CaseStudyProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PORTFOLIO_PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Case Study Not Found | Royal Business Machine",
      description: "The requested project case study could not be found.",
    };
  }

  const title = `${project.title} — Case Study & Architecture | Royal Business Machine`;
  const description = `${project.description} Delivered for ${project.client}. Verified Outcome: ${project.outcome}`;
  const canonicalUrl = `https://www.royalbusinessmachine.com/projects/${project.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      images: [
        {
          url: "https://www.royalbusinessmachine.com/assets/logo/logo-horizontal.png",
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://www.royalbusinessmachine.com/assets/logo/logo-horizontal.png"],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Find related projects sharing any category
  const relatedProjects = PORTFOLIO_PROJECTS.filter(
    (p) =>
      p.slug !== project.slug &&
      p.categories.some((cat) => project.categories.includes(cat))
  ).slice(0, 3);

  // Structured Data Schema (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    description: project.description,
    creator: {
      "@type": "Organization",
      name: "Royal Business Machine",
      url: "https://www.royalbusinessmachine.com",
    },
    customer: {
      "@type": "Organization",
      name: project.client,
    },
    genre: project.categories.join(", "),
    dateCreated: project.projectDate,
    about: project.challenge,
    abstract: project.outcome,
    keywords: project.technologies.join(", "),
  };

  return (
    <div className="flex flex-col w-full overflow-hidden bg-background text-foreground">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 1. Breadcrumbs */}
      <div className="py-4 bg-warm-white/70 dark:bg-charcoal/50 border-b border-border backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <nav className="flex items-center gap-2 text-xs text-slate-muted">
            <Link
              href="/"
              className="hover:text-gold transition-colors flex items-center gap-1"
            >
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              href="/projects"
              className="hover:text-gold transition-colors"
            >
              Our Work & Solutions
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-charcoal dark:text-warm-white font-medium truncate max-w-xs sm:max-w-md">
              {project.title}
            </span>
          </nav>
        </div>
      </div>

      {/* 2. Hero Header Section */}
      <section className="py-16 sm:py-24 bg-white dark:bg-charcoal border-b border-border relative overflow-hidden">
        {/* Ambient Gold Radial Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 space-y-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold hover:text-gold-light transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Solutions</span>
          </Link>

          <div className="space-y-4 max-w-4xl">
            {/* Category Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {project.categories.map((cat) => (
                <span
                  key={cat}
                  className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/15 text-gold border border-gold/30"
                >
                  {cat}
                </span>
              ))}
              {project.contractValue && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  {project.contractValue}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-charcoal dark:text-warm-white font-heading leading-tight">
              {project.title}
            </h1>

            <p className="text-base sm:text-xl text-slate-muted dark:text-slate-light leading-relaxed font-normal">
              {project.description}
            </p>
          </div>

          {/* Quick Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-warm-white/80 dark:bg-graphite/60 border border-border">
            <div className="space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-muted flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-gold" /> Client
              </div>
              <div className="text-sm font-semibold text-charcoal dark:text-warm-white">
                {project.client}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-muted flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-gold" /> Industry
              </div>
              <div className="text-sm font-semibold text-charcoal dark:text-warm-white">
                {project.industry}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-muted flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gold" /> Deployment Year
              </div>
              <div className="text-sm font-semibold text-charcoal dark:text-warm-white">
                {project.projectDate} {project.duration ? `(${project.duration})` : ""}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-muted flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" /> Execution Mode
              </div>
              <div className="text-sm font-semibold text-charcoal dark:text-warm-white">
                Turnkey Architecture
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Verified Outcomes Callout (If stats available) */}
      {project.stats && project.stats.length > 0 && (
        <section className="py-12 bg-charcoal text-warm-white border-b border-border relative overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              {project.stats.map((stat, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-white/5 border border-gold/20 backdrop-blur-md"
                >
                  <div className="text-3xl sm:text-4xl font-extrabold text-gold font-heading mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Deep Dive Case Study Content Grid */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Main Column: Narrative */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Requirements & Context */}
              <div className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-border space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold">
                  <Layers className="w-4 h-4" />
                  <span>Project Background & Requirements</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal dark:text-warm-white font-heading">
                  Operational Context
                </h2>
                <p className="text-base text-slate-muted leading-relaxed font-normal">
                  {project.requirements}
                </p>
              </div>

              {/* The Challenge */}
              <div className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-amber-500/30 dark:border-amber-500/20 space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  <Tag className="w-4 h-4" />
                  <span>The Architectural Challenge</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal dark:text-warm-white font-heading">
                  Critical Bottlenecks & Failure Modes
                </h2>
                <p className="text-base text-slate-muted leading-relaxed font-normal">
                  {project.challenge}
                </p>
              </div>

              {/* The Engineered Solution */}
              <div className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-gold/40 shadow-sm space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-44 h-44 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold">
                  <Sparkles className="w-4 h-4" />
                  <span>The Engineered Solution</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal dark:text-warm-white font-heading">
                  Technical Architecture & Execution
                </h2>
                <p className="text-base text-slate-muted leading-relaxed font-normal">
                  {project.solution}
                </p>
              </div>

              {/* Verified Outcome */}
              <div className="p-8 rounded-3xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/30 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  <Award className="w-4 h-4" />
                  <span>Verified Outcome</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal dark:text-warm-white font-heading">
                  Documented Impact & Performance
                </h2>
                <p className="text-base sm:text-lg text-charcoal/90 dark:text-warm-white/90 leading-relaxed font-medium">
                  {project.outcome}
                </p>
              </div>

            </div>

            {/* Right Column: Tech Stack & Architecture Specs */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Tech Stack Card */}
              <div className="p-7 rounded-3xl bg-white dark:bg-charcoal border border-border space-y-6">
                <h3 className="text-lg font-bold text-charcoal dark:text-warm-white font-heading flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-gold" />
                  <span>Technologies & Stack</span>
                </h3>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-xl text-xs font-medium bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-border space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-muted">
                    Deployment Standards
                  </div>
                  <ul className="text-xs text-slate-muted space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span>Security hardened & validated</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span>Responsive mobile & desktop parity</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span>Zero unverified metrics / 100% verified</span>
                    </li>
                  </ul>
                </div>

                {project.projectUrl && (
                  <div className="pt-4 border-t border-border">
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full gap-2 px-4 py-3 rounded-xl text-xs font-bold bg-gold text-charcoal hover:bg-gold-light transition-all shadow-md"
                    >
                      <span>Visit Live Solution</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>

              {/* Inquire CTA Card */}
              <div className="p-7 rounded-3xl bg-charcoal text-warm-white border border-gold/30 space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/15 rounded-full blur-2xl pointer-events-none" />
                <h3 className="text-lg font-bold font-heading">
                  Architect a Similar System
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Discuss requirements, pricing schedules, and implementation timelines directly with our engineering architects.
                </p>
                <Link
                  href={`/contact?project=${encodeURIComponent(project.title)}`}
                  className="inline-flex items-center justify-center w-full gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-gold text-charcoal hover:bg-gold-light transition-all shadow-md group"
                >
                  <span>Request Architectural Scope</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5. Related Case Studies */}
      {relatedProjects.length > 0 && (
        <section className="py-20 bg-warm-white/60 dark:bg-charcoal/40 border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold">
                  Explore More Solutions
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-charcoal dark:text-warm-white font-heading mt-1">
                  Related Case Studies
                </h2>
              </div>
              <Link
                href="/projects"
                className="text-xs font-bold text-gold hover:text-gold-light transition-colors inline-flex items-center gap-1.5"
              >
                <span>View All 50+ Deployments</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/projects/${rel.slug}`}
                  className="group block p-7 rounded-2xl bg-white dark:bg-charcoal border border-border hover:border-gold/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-gold">
                      <span>{rel.primaryCategory}</span>
                      {rel.contractValue && (
                        <span className="text-slate-muted">{rel.contractValue}</span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-charcoal dark:text-warm-white group-hover:text-gold transition-colors font-heading">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-slate-muted line-clamp-3 leading-relaxed">
                      {rel.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-border flex items-center justify-between text-xs font-bold text-gold group-hover:translate-x-1 transition-transform">
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Universal CTA Banner */}
      <CtaBanner
        title="Ready to Build Your Digital Infrastructure?"
        subtitle="Turnkey enterprise execution across application development, AI automation, digital marketing, web solutions, and SEO."
      />
    </div>
  );
}
