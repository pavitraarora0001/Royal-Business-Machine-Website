import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ALL_SERVICES, ServiceDetail } from "@/data/services-data";
import { PORTFOLIO_PROJECTS } from "@/data/portfolio-data";
import { ServiceConsultationForm } from "@/components/services/service-consultation-form";
import { CtaBanner } from "@/components/cta-banner";
import {
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  Layers,
  Phone,
  HelpCircle,
  FolderGit2,
  Cpu,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ALL_SERVICES.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = ALL_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Service Not Found | Royal Business Machine",
      description: "The requested service division could not be found.",
    };
  }

  const title = `${service.title} | Division ${service.divisionNumber} | Royal Business Machine`;
  const description = `${service.description} ${service.tagline}`;
  const canonicalUrl = `https://www.royalbusinessmachine.com/services/${service.slug}`;

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
      type: "website",
      images: [
        {
          url: "https://www.royalbusinessmachine.com/assets/logo/logo-horizontal.png",
          width: 1200,
          height: 630,
          alt: service.title,
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

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = ALL_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  // Resolve matching verified portfolio case studies
  const relevantProjects = PORTFOLIO_PROJECTS.filter((p) =>
    service.relevantProjectSlugs.includes(p.slug)
  );

  // Resolve related services
  const relatedServices = ALL_SERVICES.filter((s) =>
    service.relatedServiceSlugs.includes(s.slug)
  );

  // Structured Data Schema
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.divisionTitle,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "Royal Business Machine",
      url: "https://www.royalbusinessmachine.com",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.title,
      itemListElement: service.serviceOfferings.map((offering) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: offering.title,
          description: offering.desc,
        },
      })),
    },
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Royal Business Machine, I would like to inquire about ${service.title} (Division ${service.divisionNumber}).`
  );

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
            <Link href="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/services" className="hover:text-gold transition-colors">
              Services
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-muted">{service.divisionTitle}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-charcoal dark:text-warm-white font-medium truncate max-w-xs sm:max-w-md">
              {service.title}
            </span>
          </nav>
        </div>
      </div>

      {/* 2. Hero Section */}
      <section className="py-16 sm:py-24 bg-white dark:bg-charcoal border-b border-border relative overflow-hidden">
        {/* Ambient Gold Radial Glows */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[90px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 space-y-6">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold hover:text-gold-light transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All 12 Service Divisions</span>
          </Link>

          <div className="space-y-4 max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/15 text-gold border border-gold/30">
                Division {service.divisionNumber} • {service.divisionTitle}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                  service.deliveryStatus === "ACTIVE"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    : service.deliveryStatus === "PLANNED"
                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                    : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                }`}
              >
                {service.deliveryStatus}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-charcoal dark:text-warm-white font-heading leading-tight">
              {service.title}
            </h1>

            <p className="text-lg sm:text-2xl font-medium text-gold leading-snug">
              {service.tagline}
            </p>

            <p className="text-sm sm:text-base text-slate-muted dark:text-slate-light leading-relaxed font-normal">
              {service.heroSubtitle}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#consultation-form"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-charcoal text-warm-white dark:bg-gold dark:text-charcoal text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all shadow-md"
              >
                <span>Request Architectural Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/919057287689?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border text-charcoal dark:text-warm-white text-xs font-bold hover:border-gold/40 transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-500" />
                <span>Instant WhatsApp Handoff</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Executive Introduction & Architecture */}
      <section className="py-20 bg-warm-white/60 dark:bg-charcoal/40 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold">
                <Sparkles className="w-4 h-4" />
                <span>Executive Overview</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-charcoal dark:text-warm-white font-heading leading-tight">
                Architectural Integrity for Mission-Critical Operations
              </h2>
              <p className="text-base text-slate-muted leading-relaxed font-normal">
                {service.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-charcoal dark:text-warm-white font-medium">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 p-8 rounded-3xl bg-white dark:bg-charcoal border border-gold/30 shadow-xl space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
              <div className="text-xs font-bold uppercase tracking-wider text-gold">
                Delivery Standard
              </div>
              <h3 className="text-xl font-bold font-heading text-charcoal dark:text-warm-white">
                Single-Point Execution Partner
              </h3>
              <p className="text-xs text-slate-muted leading-relaxed">
                Led by Founder & CEO Pavitra Arora, our teams handle technical scoping, UI/UX architecture, cloud deployment, and on-ground support with zero handoff confusion.
              </p>
              <div className="pt-4 border-t border-border space-y-2">
                {service.benefits.map((benefit, bIdx) => (
                  <div key={bIdx} className="text-xs font-semibold text-charcoal dark:text-warm-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Challenges vs Engineered Solutions */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              Problem & Solution Matrix
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal dark:text-warm-white font-heading">
              Bottlenecks We Solve
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Challenges */}
            <div className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-amber-500/30 space-y-6">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider text-xs">
                <AlertTriangle className="w-4 h-4" />
                <span>Common Industry Failures</span>
              </div>
              <div className="space-y-4">
                {service.challenges.map((c, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-1">
                    <h4 className="font-bold text-charcoal dark:text-warm-white text-sm">
                      {c.title}
                    </h4>
                    <p className="text-xs text-slate-muted leading-relaxed">
                      {c.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* The Solutions */}
            <div className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-gold/40 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-gold font-bold uppercase tracking-wider text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>Royal Engineered Solutions</span>
              </div>
              <div className="space-y-4">
                {service.solutions.map((s, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-gold/5 border border-gold/25 space-y-1">
                    <h4 className="font-bold text-charcoal dark:text-warm-white text-sm">
                      {s.title}
                    </h4>
                    <p className="text-xs text-slate-muted leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Detailed Service Offerings Grid */}
      <section className="py-20 bg-warm-white/70 dark:bg-charcoal/50 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              Comprehensive Service Breakdown
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal dark:text-warm-white font-heading">
              Capabilities & Deliverables
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.serviceOfferings.map((offering, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-white dark:bg-charcoal border border-border hover:border-gold/50 shadow-sm hover:shadow-xl transition-all duration-300 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold font-mono text-gold mb-2">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-charcoal dark:text-warm-white font-heading">
                    {offering.title}
                  </h3>
                  <p className="text-xs text-slate-muted leading-relaxed mt-2">
                    {offering.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-border flex items-center gap-1.5 text-xs font-bold text-gold">
                  <span>Production Ready</span>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Industries Served & Tech Stack */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Industries */}
            <div className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-border space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                <span>Industries Empowered</span>
              </div>
              <h3 className="text-2xl font-bold font-heading text-charcoal dark:text-warm-white">
                Sectors Benefiting from {service.title}
              </h3>
              <p className="text-xs text-slate-muted">
                Engineered to meet specific compliance, regulatory, and speed requirements across diverse commercial verticals.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {service.industries.map((ind, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium bg-warm-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-border space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-1.5">
                <Cpu className="w-4 h-4" />
                <span>Architecture & Technologies</span>
              </div>
              <h3 className="text-2xl font-bold font-heading text-charcoal dark:text-warm-white">
                Modern Enterprise Tech Stack
              </h3>
              <p className="text-xs text-slate-muted">
                Battle-tested frameworks chosen for maximum concurrency, security, and developer ergonomics.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {service.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium bg-gold/10 border border-gold/25 text-charcoal dark:text-warm-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Relevant Verified Portfolio Projects */}
      {relevantProjects.length > 0 && (
        <section className="py-20 bg-warm-white/60 dark:bg-charcoal/40 border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold flex items-center gap-1.5">
                  <FolderGit2 className="w-3.5 h-3.5" />
                  <span>Verified Client Deployments</span>
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-charcoal dark:text-warm-white font-heading mt-1">
                  Demonstrated Portfolio Track Record
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relevantProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group block p-7 rounded-3xl bg-white dark:bg-charcoal border border-border hover:border-gold/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-gold">
                      <span>{project.primaryCategory}</span>
                      {project.contractValue && (
                        <span className="text-slate-muted">{project.contractValue}</span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-charcoal dark:text-warm-white group-hover:text-gold transition-colors font-heading leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs text-gold font-semibold">
                      Client: {project.client}
                    </p>
                    <p className="text-xs text-slate-muted line-clamp-3 leading-relaxed">
                      {project.description}
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

      {/* 8. Frequently Asked Questions */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold flex items-center justify-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Clarity & Guarantees</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal dark:text-warm-white font-heading">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq, fIdx) => (
              <div
                key={fIdx}
                className="p-6 rounded-2xl bg-white dark:bg-charcoal border border-border space-y-2"
              >
                <h3 className="text-base font-bold text-charcoal dark:text-warm-white font-heading">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-slate-muted leading-relaxed font-normal">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Related Service Divisions */}
      {relatedServices.length > 0 && (
        <section className="py-16 bg-warm-white/50 dark:bg-charcoal/30 border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-6">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-muted">
              Explore Complementary Service Divisions:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedServices.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="p-5 rounded-2xl bg-white dark:bg-charcoal border border-border hover:border-gold/40 transition-all flex items-center justify-between group"
                >
                  <div>
                    <div className="text-[10px] font-bold text-gold uppercase tracking-wider">
                      Division {rel.divisionNumber}
                    </div>
                    <div className="text-sm font-bold text-charcoal dark:text-warm-white group-hover:text-gold transition-colors">
                      {rel.title}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10. Dedicated Consultation & Lead Capture Form */}
      <section id="consultation-form" className="py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <ServiceConsultationForm
            serviceTitle={service.title}
            serviceSlug={service.slug}
          />
        </div>
      </section>

      {/* 11. Universal CTA Banner */}
      <CtaBanner
        title="Ready to Architect Your Solution?"
        subtitle="Speak directly with Founder & CEO Pavitra Arora and our engineering architects to map your operational requirements."
      />
    </div>
  );
}

