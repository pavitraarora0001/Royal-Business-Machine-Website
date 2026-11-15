"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/section-header";
import { CtaBanner } from "@/components/cta-banner";
import {
  HelpCircle,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageSquare
} from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
  category: string;
}

const faqs: FaqItem[] = [
  {
    q: "How long does a typical custom software or mobile app project take?",
    a: "Project timelines depend strictly on technical scope and system complexity. A corporate brand portal typically takes 2 to 4 weeks. A full custom mobile application (such as Dairy Muneem) or an enterprise ERP/hospital system (such as HMS) typically takes 6 to 12 weeks. We provide transparent, milestone-based delivery dates during our initial Discovery & Scoping phase.",
    category: "Timelines & Delivery",
  },
  {
    q: "Do you offer post-launch maintenance, hosting, and technical support?",
    a: "Yes. Every production deployment includes a standard 30-day warranty window with active monitoring. Beyond launch, we offer structured Annual Maintenance Contracts (AMCs) providing 24/7 server health tracking, automated weekly backups, zero-downtime security patches, and direct WhatsApp priority support channels.",
    category: "Support & Maintenance",
  },
  {
    q: "Do clients receive 100% full intellectual property and source code ownership?",
    a: "Yes, absolutely. Upon final payment milestone clearance, 100% of all intellectual property, custom codebases, Git repositories, design files, and deployment keys are transferred in full to the client. We do not lock clients into restrictive proprietary vendor dependencies.",
    category: "Commercial & IP",
  },
  {
    q: "What are your in-house printing capabilities and materials?",
    a: "We maintain an in-house commercial printing setup delivering heavy-duty visiting cards (450+ GSM matte velvet, metallic gold foil stamping, embossed spot UV, smart NFC cards), promotional multi-fold brochures, company catalogs, clothing hang tags, student PVC ID cards, and custom packaging boxes.",
    category: "Printing & Physical",
  },
  {
    q: "We are an early-stage startup. How does your Startup Advisory work?",
    a: "Our Startup Growth Launchpack is tailored specifically for founders. Under the mentorship of Founder & CEO Pavitra Arora, we assist in defining your addressable market (TAM/SAM/SOM), designing a slide-by-slide 15-page investor pitch deck, calculating 3-year financial models, and engineering a rapid 4-week MVP prototype to test with early adopters.",
    category: "Startup Advisory",
  },
  {
    q: "How are project payments and milestones structured?",
    a: "We operate on transparent milestone billing: an initial deposit upon contract signing, intermediate milestone disbursements tied to verified demo releases (e.g., UI/UX sign-off, core backend completion), and final balance settlement upon production deployment and training completion. We accept direct bank wire, RTGS/NEFT, UPI, and online card payments.",
    category: "Commercial & IP",
  },
  {
    q: "Are your government and educational portals compliant with official standards?",
    a: "Yes. Our institutional portals (such as Govt College Bharatpur and Govt College Karauli) are engineered in accordance with Government of India web guidelines, WCAG 2.1 accessibility standards, bilingual (Hindi/English) interfaces, and hardened against DDoS traffic spikes during peak examination result cycles.",
    category: "Institutional & Govt",
  },
  {
    q: "Can you take over and modernize our existing legacy website or software?",
    a: "Yes. We frequently conduct legacy audits, migrate outdated monolith codebases to modern Next.js/React and cloud microservices, optimize slow database queries, and refresh visual ergonomics without causing downtime to your daily operations.",
    category: "Timelines & Delivery",
  },
];

export function FaqClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Timelines & Delivery", "Support & Maintenance", "Commercial & IP", "Printing & Physical", "Startup Advisory", "Institutional & Govt"];

  const filteredFaqs = activeCategory === "All"
    ? faqs
    : faqs.filter((f) => f.category === activeCategory);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* 1. Header */}
      <section className="py-20 lg:py-28 bg-white dark:bg-charcoal border-b border-border text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/25">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Transparency & Guidance</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-charcoal dark:text-warm-white font-heading">
            Frequently Asked <span className="gold-gradient-text">Questions</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-muted dark:text-slate-light leading-relaxed max-w-3xl mx-auto font-normal">
            Clear, transparent answers about our custom software delivery process, milestone pricing, source code ownership, and in-house printing services.
          </p>
        </div>
      </section>

      {/* 2. Category Filters */}
      <section className="py-6 bg-warm-white dark:bg-charcoal/70 border-b border-border sticky top-20 z-30 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenIndex(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-charcoal text-warm-white dark:bg-gold dark:text-charcoal shadow-sm"
                    : "bg-white dark:bg-graphite text-slate-muted hover:text-charcoal dark:hover:text-white border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Accordion List */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          
          <div className="space-y-4">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white dark:bg-charcoal border border-border overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-6 sm:p-7 text-left flex items-start justify-between gap-4 hover:bg-warm-white/50 dark:hover:bg-graphite/40 transition-colors"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gold block mb-1">
                        {faq.category}
                      </span>
                      <span className="text-base sm:text-lg font-bold text-charcoal dark:text-warm-white font-heading">
                        {faq.q}
                      </span>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? "bg-gold text-charcoal"
                          : "bg-warm-white dark:bg-graphite text-slate-muted"
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 sm:px-7 pb-6 text-xs sm:text-sm text-slate-muted leading-relaxed border-t border-border/60 pt-4 font-normal">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="mt-16 p-8 rounded-3xl bg-warm-white dark:bg-charcoal/50 border border-border text-center max-w-xl mx-auto space-y-4">
            <h3 className="text-xl font-bold text-charcoal dark:text-warm-white font-heading">
              Have a Specific Technical Question?
            </h3>
            <p className="text-xs sm:text-sm text-slate-muted leading-relaxed">
              Connect directly with our engineering and operations desk via phone or WhatsApp.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href="https://wa.me/919057287689"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white font-semibold text-xs shadow-sm hover:scale-105 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp: +91 9057287689</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-charcoal dark:bg-gold text-warm-white dark:text-charcoal font-semibold text-xs transition-colors"
              >
                <span>Submit Inquiry Form</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Conversion CTA */}
      <CtaBanner
        title="Ready to Discuss Your Project Scope?"
        subtitle="Schedule an architecture call with our team to obtain a formal statement of work and transparent budget estimate."
      />
    </div>
  );
}
