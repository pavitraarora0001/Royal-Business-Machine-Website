"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/section-header";
import {
  Code2,
  Globe2,
  TrendingUp,
  Palette,
  Printer,
  Rocket,
  GraduationCap,
  Cpu,
  ArrowRight
} from "lucide-react";

const previewServices = [
  {
    id: "software",
    title: "IT & Software Development",
    desc: "Custom ERP systems, CRM platforms, and high-concurrency SaaS applications built for scale.",
    icon: Code2,
    href: "/services/web-development",
    badge: "Enterprise",
    features: ["Custom ERP/CRM", "SaaS Development", "Business Automation"],
  },
  {
    id: "web",
    title: "Website & E-Commerce",
    desc: "Fast, luxury corporate portals and scalable digital storefronts equipped with secure checkout.",
    icon: Globe2,
    href: "/services/web-development",
    badge: "High-Ticket",
    features: ["Next.js Architectures", "E-Commerce Stores", "Booking Engines"],
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    desc: "Fluid iOS and Android applications with offline synchronization. Creators of Dairy Muneem.",
    icon: Cpu,
    href: "/services/mobile-apps",
    badge: "Native & Hybrid",
    features: ["React Native & Flutter", "Logistics Applications", "Real-Time Telemetry"],
  },
  {
    id: "marketing",
    title: "Digital Marketing & SEO",
    desc: "ROI-driven search visibility, Google Ads, Meta campaigns, and high-converting B2B lead funnels.",
    icon: TrendingUp,
    href: "/services/digital-marketing",
    badge: "Performance",
    features: ["SEO Dominance", "Google & Meta Ads", "B2B Lead Generation"],
  },
  {
    id: "design",
    title: "Design & Brand Identity",
    desc: "Distinctive corporate logos, complete brand guidelines, and UI/UX design systems.",
    icon: Palette,
    href: "/services",
    badge: "Creative",
    features: ["Logo & Visual Marks", "UI/UX Prototyping", "Packaging Design"],
  },
  {
    id: "printing",
    title: "Physical Printing Services",
    desc: "In-house physical collateral: metallic visiting cards, flyers, apparel hangtags, and brochures.",
    icon: Printer,
    href: "/services",
    badge: "In-House Press",
    features: ["Metallic Visiting Cards", "Brochures & Catalogs", "Apparel Brand Tags"],
  },
  {
    id: "startup",
    title: "Startup & Business Advisory",
    desc: "Turnkey growth launchpacks, investor pitch decks, financial models, and rapid MVP engineering.",
    icon: Rocket,
    href: "/services/consulting",
    badge: "Consulting",
    features: ["Pitch Deck Creation", "Business Modeling", "MVP Rapid Sprints"],
  },
  {
    id: "advanced",
    title: "Advanced AI & EdTech",
    desc: "Smart campus computer labs, e-governance solutions (NyayaSetu), IoT, and robotics.",
    icon: GraduationCap,
    href: "/services",
    badge: "Innovation",
    features: ["NyayaSetu AI Platform", "Smart Lab Deployments", "Institutional Training"],
  },
];

export function ServicesPreview() {
  return (
    <section className="py-24 bg-warm-white dark:bg-charcoal/50 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          badge="What We Deliver"
          title="Integrated Business Infrastructure"
          subtitle="Explore our comprehensive suite of digital technology, creative strategy, institutional execution, and physical infrastructure services."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {previewServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative rounded-2xl bg-white dark:bg-charcoal border border-border p-7 flex flex-col justify-between hover:border-gold/50 hover:shadow-lg transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center group-hover:bg-gold group-hover:text-white transition-colors">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-muted bg-warm-white dark:bg-graphite px-2.5 py-1 rounded-full border border-border">
                    {service.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-charcoal dark:text-warm-white mb-2 group-hover:text-gold transition-colors font-heading">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-muted leading-relaxed mb-6 font-normal">
                  {service.desc}
                </p>

                <ul className="space-y-2 mb-6 border-t border-border/60 pt-4">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className="text-xs text-charcoal/80 dark:text-warm-white/80 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-gold" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={service.href}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:text-gold-dark transition-colors pt-2 group-hover:translate-x-1 transition-transform"
              >
                <span>Learn Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white dark:bg-graphite border border-border text-charcoal dark:text-warm-white hover:border-gold hover:text-gold text-sm font-semibold transition-all shadow-sm"
          >
            <span>View All 8 Categories & 40+ Sub-Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
