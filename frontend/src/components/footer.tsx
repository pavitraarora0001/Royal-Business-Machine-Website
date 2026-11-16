"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  ArrowUpRight,
  ShieldCheck,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  ArrowUp,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const shouldReduceMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-charcoal text-warm-white border-t border-border-dark pt-20 pb-10 mt-auto relative overflow-hidden">
      {/* Subtle gold ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gold/5 blur-3xl pointer-events-none" />

      {/* Animated Gold Separator Line */}
      <motion.div
        initial={shouldReduceMotion ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent origin-center"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Company Profile & Authority */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block group focus:outline-none" aria-label="Royal Business Machine">
              <Image
                src="/assets/logo/logo-horizontal.png"
                alt="Royal Business Machine"
                width={642}
                height={163}
                className="w-[240px] sm:w-[280px] md:w-[310px] h-auto object-contain object-left transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </Link>

            <p className="text-sm text-slate-light leading-relaxed max-w-md font-normal">
              A multi-sector technology and business infrastructure platform delivering enterprise software development, mobile apps, ERP systems, digital marketing, institutional execution, and in-house physical printing collateral.
            </p>

            <div className="flex items-center gap-2 text-xs text-gold-light bg-graphite/60 border border-gold/20 px-3.5 py-2 rounded-xl inline-flex hover:border-gold/50 transition-colors">
              <ShieldCheck className="w-4 h-4 text-gold shrink-0" />
              <span>Government Recognized Udyam MSME Platform</span>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              <SocialIcon href="https://www.linkedin.com/company/royal-business-machine" label="LinkedIn" icon={<Linkedin className="w-4 h-4" />} />
              <SocialIcon href="https://twitter.com/royalbizmachine" label="Twitter / X" icon={<Twitter className="w-4 h-4" />} />
              <SocialIcon href="https://www.instagram.com/royalbusinessmachine" label="Instagram" icon={<Instagram className="w-4 h-4" />} />
              <SocialIcon href="https://www.facebook.com/royalbusinessmachine" label="Facebook" icon={<Facebook className="w-4 h-4" />} />
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold mb-5">Company</h4>
            <ul className="space-y-3">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/team">Leadership & Team</FooterLink>
              <FooterLink href="/projects">Portfolio Showcase</FooterLink>
              <FooterLink href="/achievements">Achievements & Milestones</FooterLink>
              <FooterLink href="/process">7-Step Process</FooterLink>
              <FooterLink href="/industries">Industries We Empower</FooterLink>
              <FooterLink href="/testimonials">Client Testimonials</FooterLink>
              <FooterLink href="/blog">Insights & Blog</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/careers">Careers at RBM</FooterLink>
            </ul>
          </div>

          {/* Column 3: Core Service Offerings */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold mb-5">Enterprise Divisions</h4>
            <ul className="space-y-3">
              <FooterLink href="/services/web-development">Web & Cloud Engineering</FooterLink>
              <FooterLink href="/services/mobile-app-development">Mobile App Development</FooterLink>
              <FooterLink href="/services/digital-marketing">Digital Marketing & SEO</FooterLink>
              <FooterLink href="/services/business-consulting">Startup Advisory & Pitch Decks</FooterLink>
              <FooterLink href="/services/software-development">Custom ERP & Software</FooterLink>
              <FooterLink href="/services/ai-automation">AI & Process Automation</FooterLink>
              <FooterLink href="/services/whatsapp-automation">WhatsApp Automation Suite</FooterLink>
              <FooterLink href="/products">Software Products (12 Platforms)</FooterLink>
              <FooterLink href="/services">All 12 Service Divisions</FooterLink>
            </ul>
          </div>

          {/* Column 4: Contact & Operations Desk */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold mb-5">Operations Desk</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-light">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-1" />
                <span>Bharatpur, Rajasthan, India<br /><span className="text-xs text-slate-muted">Serving East Rajasthan & National Clients</span></span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-light">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+919057287689" className="hover:text-gold transition-colors">+91 9057287689</a>
                  <a href="tel:+917727887850" className="hover:text-gold transition-colors text-xs text-slate-muted">+91 7727887850</a>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-light">
                <MessageSquare className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href="https://wa.me/919057287689"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors text-xs"
                >
                  Direct WhatsApp Chat
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-light">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href="mailto:royalbusinessmachine@gmail.com" className="hover:text-gold transition-colors text-xs truncate max-w-[200px]">
                  royalbusinessmachine@gmail.com
                </a>
              </li>
            </ul>

            <div className="mt-6 pt-5 border-t border-border-dark flex items-center justify-between">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-xs font-bold text-gold hover:text-white transition-colors group"
              >
                <span>Request Consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              {/* Back to top button */}
              <button
                onClick={scrollToTop}
                className="w-8 h-8 rounded-lg bg-graphite border border-border-dark flex items-center justify-center text-slate-light hover:text-gold hover:border-gold transition-all"
                aria-label="Back to top"
                title="Back to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Legal & Regulatory Sub-bar */}
        <div className="border-t border-border-dark pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-muted">
          <p className="text-center sm:text-left">
            &copy; {currentYear} ROYAL BUSINESS MACHINE. All rights reserved. Registered MSME Enterprise.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
            <Link href="/login" className="hover:text-gold transition-colors">Client Portal</Link>
            <Link href="/admin/dashboard" className="hover:text-gold transition-colors">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-xs text-slate-light hover:text-gold transition-colors flex items-center gap-1 group">
        <span className="w-1 h-1 rounded-full bg-gold/40 group-hover:bg-gold group-hover:scale-125 transition-all" />
        <span>{children}</span>
      </Link>
    </li>
  );
}

function SocialIcon({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-8 h-8 rounded-lg bg-graphite border border-border-dark flex items-center justify-center text-slate-light hover:bg-gold hover:text-charcoal hover:border-gold hover:scale-110 transition-all duration-200"
    >
      {icon}
    </a>
  );
}
