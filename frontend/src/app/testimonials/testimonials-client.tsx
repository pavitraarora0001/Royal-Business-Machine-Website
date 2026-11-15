"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/section-header";
import { CtaBanner } from "@/components/cta-banner";
import {
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles
} from "lucide-react";

interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  company: string;
  location: string;
  rating: number;
  text: string;
  category: string;
  verified: boolean;
}

const testimonials: TestimonialItem[] = [
  {
    id: 1,
    name: "R. Patel",
    role: "Managing Director",
    company: "Patel Enterprises",
    location: "Ahmedabad, Gujarat",
    rating: 5,
    text: "Bahut achha kaam kiya RBM ne. Deadlines ka pura dhyan rakha aur quality mein koi compromise nahi. Hamare B2B operations ko digitally transform karne mein inka bohot bada yogdan raha. 100% recommend karunga!",
    category: "Commercial Trading",
    verified: true,
  },
  {
    id: 2,
    name: "Operational Head",
    role: "Director of Operations",
    company: "Pavitra Enterprise",
    location: "Rajasthan",
    rating: 5,
    text: "Royal Business Machine ne hamare business ko digital duniya mein ek naya mukam diya. Bahut hi professional team hai! Inke custom billing software aur multi-commodity catalog se hamara daily order turnaround 48 ghante se kam hoke 4 ghante mein ho gaya.",
    category: "Commodity Distribution",
    verified: true,
  },
  {
    id: 3,
    name: "Dr. K. Sharma",
    role: "Campus Principal & Director",
    company: "Higher Education Directorate",
    location: "Bharatpur, Rajasthan",
    rating: 5,
    text: "The institutional web portal engineered by Royal Business Machine handled over 100,000 admission and examination requests during peak cycles with zero downtime. Their adherence to government compliance and accessibility is world-class.",
    category: "Higher Education",
    verified: true,
  },
  {
    id: 4,
    name: "V. Meena",
    role: "General Secretary",
    company: "Regional Dairy Procurement Federation",
    location: "East Rajasthan",
    rating: 5,
    text: "Dairy Muneem mobile app has completely eliminated manual pricing disputes at our milk collection centers. Even in zero-connectivity village centers, the app operates smoothly and dispatches instant slips. Outstanding technical craftsmanship.",
    category: "Agriculture & Dairy Logistics",
    verified: true,
  },
  {
    id: 5,
    name: "Medical Superintendent",
    role: "Chief Medical Officer",
    company: "Multi-Specialty Clinical Center",
    location: "Rajasthan",
    rating: 5,
    text: "HMS hospital management software cut our patient discharge waiting times from 3 hours to under 25 minutes. Lost physical chart records are now a thing of the past. RBM delivered exactly what was promised.",
    category: "Healthcare Infrastructure",
    verified: true,
  },
  {
    id: 6,
    name: "A. Singhal",
    role: "Founder & Creative Director",
    company: "Diya Creation",
    location: "Delhi NCR",
    rating: 5,
    text: "From our brand identity down to the metallic clothing tags and luxury unboxing boxes, Royal Business Machine delivered exquisite press quality. Having software and physical printing under one roof saved us months of coordination.",
    category: "Fashion & Physical Print",
    verified: true,
  },
];

export function TestimonialsClient() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* 1. Header */}
      <section className="py-20 lg:py-28 bg-white dark:bg-charcoal border-b border-border text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/25">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Client Endorsements</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-charcoal dark:text-warm-white font-heading">
            Client <span className="gold-gradient-text">Testimonials & Proof</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-muted dark:text-slate-light leading-relaxed max-w-3xl mx-auto font-normal">
            Hear directly from the business leaders, college principals, and regional enterprises that scaled with Royal Business Machine.
          </p>
        </div>
      </section>

      {/* 2. Interactive Spotlight Carousel */}
      <section className="py-24 bg-warm-white dark:bg-charcoal/50 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          
          <div className="relative rounded-3xl bg-white dark:bg-charcoal border border-border p-8 sm:p-14 shadow-lg min-h-[380px] flex flex-col justify-between">
            <Quote className="absolute top-8 right-8 text-gold/15 w-20 h-20 pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-1 text-gold">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-muted bg-warm-white dark:bg-graphite px-3 py-1 rounded-full border border-border">
                  {testimonials[currentIndex].category}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={currentIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="text-lg sm:text-2xl text-charcoal dark:text-warm-white leading-relaxed font-heading font-medium italic mb-8"
                >
                  &ldquo;{testimonials[currentIndex].text}&rdquo;
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-border pt-6">
              <div>
                <h4 className="text-lg font-bold text-charcoal dark:text-warm-white font-heading">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-xs font-semibold text-gold">
                  {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                </p>
                <p className="text-[11px] text-slate-muted">{testimonials[currentIndex].location}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={prevSlide}
                  className="w-11 h-11 rounded-xl border border-border bg-white dark:bg-graphite flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-11 h-11 rounded-xl border border-border bg-white dark:bg-graphite flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === idx ? "w-8 bg-gold" : "w-2 bg-border"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 3. Comprehensive Reviews Grid */}
      <section className="py-24 bg-white dark:bg-charcoal border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <SectionHeader
            badge="Review Directory"
            title="All Verified Client Reviews"
            subtitle="Explore direct quotes and feedback across our multi-sector client base."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="p-7 rounded-3xl bg-warm-white/70 dark:bg-graphite/40 border border-border hover:border-gold/40 shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1 text-gold">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    {t.verified && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-gold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified Client</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-charcoal dark:text-warm-white leading-relaxed mb-6 italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>

                <div className="border-t border-border/80 pt-4">
                  <h4 className="text-sm font-bold text-charcoal dark:text-warm-white font-heading">
                    {t.name}
                  </h4>
                  <p className="text-xs text-gold font-medium">
                    {t.role}, {t.company}
                  </p>
                  <p className="text-[11px] text-slate-muted">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Conversion CTA */}
      <CtaBanner
        title="Ready to Become Our Next Success Story?"
        subtitle="Schedule a consultation with Founder & CEO Pavitra Arora to discuss your project requirements."
      />
    </div>
  );
}
