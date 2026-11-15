"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Moon,
  Sun,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Phone,
  MessageSquare,
  Shield,
  Layers,
  Sparkles,
  Users,
  Compass,
  Briefcase
} from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const servicesMenu = [
    {
      title: "Web & Enterprise Cloud",
      desc: "Custom web apps, Next.js portals & SaaS architectures",
      href: "/services/web-development",
      icon: Layers,
    },
    {
      title: "Mobile Applications",
      desc: "iOS, Android, cross-platform apps & logistics engines",
      href: "/services/mobile-apps",
      icon: Compass,
    },
    {
      title: "Digital Marketing & SEO",
      desc: "ROI-driven search optimization, Google & Meta ad funnels",
      href: "/services/digital-marketing",
      icon: Sparkles,
    },
    {
      title: "Startup & Business Advisory",
      desc: "Pitch decks, business models, MSME setup & MVP sprints",
      href: "/services/consulting",
      icon: Briefcase,
    },
  ];

  const companyMenu = [
    { title: "Leadership Team", desc: "Meet Founder & CEO Pavitra Arora and leadership", href: "/team", icon: Users },
    { title: "Our Process", desc: "7-step agile delivery and execution framework", href: "/process", icon: Compass },
    { title: "Achievements", desc: "50+ deployments, ₹1.8 Cr track record & impact", href: "/achievements", icon: Shield },
    { title: "Industries", desc: "10 specialized sectors from Healthcare to Govt", href: "/industries", icon: Layers },
    { title: "Testimonials", desc: "Client reviews and enterprise proof", href: "/testimonials", icon: Sparkles },
    { title: "Insights & Blog", desc: "Tech trends, SaaS architectures & advice", href: "/blog", icon: Briefcase },
    { title: "Careers", desc: "Join our engineering & design teams", href: "/careers", icon: Users },
    { title: "FAQ", desc: "Answers regarding pricing, timelines & support", href: "/faq", icon: Compass },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-warm-white/95 dark:bg-charcoal/95 backdrop-blur-md border-b border-border shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Corporate Identifier */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-gold/30 bg-white flex items-center justify-center p-1 group-hover:border-gold transition-colors">
              <Image
                src="/assets/logo/logo.png"
                alt="Royal Business Machine Emblem"
                width={36}
                height={36}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold tracking-tight text-lg text-charcoal dark:text-warm-white group-hover:text-gold transition-colors leading-none">
                ROYAL BUSINESS MACHINE
              </span>
              <span className="text-[10px] tracking-widest text-slate-muted uppercase font-medium mt-1">
                Integrated Technology Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/"
                  ? "text-gold font-semibold"
                  : "text-charcoal/80 dark:text-warm-white/80 hover:text-charcoal dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/about"
                  ? "text-gold font-semibold"
                  : "text-charcoal/80 dark:text-warm-white/80 hover:text-charcoal dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              About
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("services")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/services"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname.startsWith("/services")
                    ? "text-gold font-semibold"
                    : "text-charcoal/80 dark:text-warm-white/80 hover:text-charcoal dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "services" ? "rotate-180" : ""}`} />
              </Link>

              <AnimatePresence>
                {activeDropdown === "services" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 w-80 p-2 bg-white dark:bg-charcoal rounded-2xl shadow-xl border border-border mt-1 z-50"
                  >
                    <div className="p-2 border-b border-border/50 mb-1">
                      <p className="text-xs font-semibold text-slate-muted uppercase tracking-wider">Enterprise Services</p>
                    </div>
                    {servicesMenu.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-warm-white dark:hover:bg-graphite transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gold/10 text-gold flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-gold group-hover:text-white transition-colors">
                          <item.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-charcoal dark:text-warm-white group-hover:text-gold transition-colors">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-slate-muted line-clamp-1">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                    <div className="mt-2 pt-2 border-t border-border/50">
                      <Link
                        href="/services"
                        className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-gold hover:text-gold-dark transition-colors"
                      >
                        <span>View All 8 Categories (40+ Services)</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Portfolio Link */}
            <Link
              href="/projects"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/projects" || pathname === "/portfolio"
                  ? "text-gold font-semibold"
                  : "text-charcoal/80 dark:text-warm-white/80 hover:text-charcoal dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              Portfolio
            </Link>

            {/* Explore Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("explore")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeDropdown === "explore"
                    ? "text-gold"
                    : "text-charcoal/80 dark:text-warm-white/80 hover:text-charcoal dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <span>Company</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "explore" ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === "explore" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[440px] p-3 bg-white dark:bg-charcoal rounded-2xl shadow-xl border border-border mt-1 z-50 grid grid-cols-2 gap-1.5"
                  >
                    {companyMenu.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-warm-white dark:hover:bg-graphite transition-colors group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-gold/10 text-gold flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-white transition-colors">
                          <item.icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="overflow-hidden">
                          <div className="text-xs font-bold text-charcoal dark:text-warm-white group-hover:text-gold transition-colors truncate">
                            {item.title}
                          </div>
                          <div className="text-[10px] text-slate-muted truncate">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/contact"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/contact"
                  ? "text-gold font-semibold"
                  : "text-charcoal/80 dark:text-warm-white/80 hover:text-charcoal dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Direct Phone Link */}
            <a
              href="tel:+919057287689"
              className="hidden xl:flex items-center gap-1.5 text-xs font-semibold text-slate-muted hover:text-gold transition-colors px-2 py-1"
              title="Call Operations Desk"
            >
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>+91 9057287689</span>
            </a>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-charcoal dark:text-warm-white hover:border-gold hover:text-gold transition-colors"
                aria-label="Toggle Theme"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="w-4 h-4 text-gold" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
            )}

            {/* Client Portal Button */}
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-charcoal text-warm-white dark:bg-gold dark:text-charcoal hover:bg-gold dark:hover:bg-warm-white hover:text-white transition-all shadow-sm"
            >
              Portal Login
            </Link>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-xl border border-border flex items-center justify-center text-charcoal dark:text-warm-white focus:outline-none"
              aria-label="Open Mobile Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-border bg-white dark:bg-charcoal max-h-[85vh] overflow-y-auto px-4 pt-4 pb-8"
          >
            <div className="flex flex-col space-y-1">
              <Link
                href="/"
                className="px-4 py-3 rounded-xl font-medium text-charcoal dark:text-warm-white hover:bg-warm-white dark:hover:bg-graphite"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="px-4 py-3 rounded-xl font-medium text-charcoal dark:text-warm-white hover:bg-warm-white dark:hover:bg-graphite"
              >
                About Us
              </Link>
              <Link
                href="/services"
                className="px-4 py-3 rounded-xl font-medium text-charcoal dark:text-warm-white hover:bg-warm-white dark:hover:bg-graphite flex items-center justify-between"
              >
                <span>All Services (8 Categories)</span>
                <span className="text-xs bg-gold/15 text-gold px-2 py-0.5 rounded-full font-bold">40+</span>
              </Link>
              <div className="pl-6 space-y-1 border-l-2 border-gold/30 ml-4 my-1">
                {servicesMenu.map((sub, idx) => (
                  <Link
                    key={idx}
                    href={sub.href}
                    className="block py-1.5 text-xs text-slate-muted hover:text-gold"
                  >
                    {sub.title}
                  </Link>
                ))}
              </div>
              <Link
                href="/projects"
                className="px-4 py-3 rounded-xl font-medium text-charcoal dark:text-warm-white hover:bg-warm-white dark:hover:bg-graphite"
              >
                Portfolio & Case Studies
              </Link>
              <Link
                href="/industries"
                className="px-4 py-3 rounded-xl font-medium text-charcoal dark:text-warm-white hover:bg-warm-white dark:hover:bg-graphite"
              >
                Industries We Empower
              </Link>
              <Link
                href="/process"
                className="px-4 py-3 rounded-xl font-medium text-charcoal dark:text-warm-white hover:bg-warm-white dark:hover:bg-graphite"
              >
                7-Step Delivery Process
              </Link>
              <Link
                href="/achievements"
                className="px-4 py-3 rounded-xl font-medium text-charcoal dark:text-warm-white hover:bg-warm-white dark:hover:bg-graphite"
              >
                Achievements & Milestones
              </Link>
              <Link
                href="/team"
                className="px-4 py-3 rounded-xl font-medium text-charcoal dark:text-warm-white hover:bg-warm-white dark:hover:bg-graphite"
              >
                Leadership & Team
              </Link>
              <Link
                href="/testimonials"
                className="px-4 py-3 rounded-xl font-medium text-charcoal dark:text-warm-white hover:bg-warm-white dark:hover:bg-graphite"
              >
                Client Testimonials
              </Link>
              <Link
                href="/blog"
                className="px-4 py-3 rounded-xl font-medium text-charcoal dark:text-warm-white hover:bg-warm-white dark:hover:bg-graphite"
              >
                Insights & Blog
              </Link>
              <Link
                href="/faq"
                className="px-4 py-3 rounded-xl font-medium text-charcoal dark:text-warm-white hover:bg-warm-white dark:hover:bg-graphite"
              >
                FAQ
              </Link>
              <Link
                href="/careers"
                className="px-4 py-3 rounded-xl font-medium text-charcoal dark:text-warm-white hover:bg-warm-white dark:hover:bg-graphite"
              >
                Careers
              </Link>
              <Link
                href="/contact"
                className="px-4 py-3 rounded-xl font-medium text-charcoal dark:text-warm-white hover:bg-warm-white dark:hover:bg-graphite"
              >
                Contact
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t border-border flex flex-col gap-3">
              <a
                href="tel:+919057287689"
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-border text-sm font-semibold text-charcoal dark:text-warm-white"
              >
                <Phone className="w-4 h-4 text-gold" />
                <span>Call +91 9057287689</span>
              </a>
              <Link
                href="/login"
                className="flex items-center justify-center py-3 rounded-xl bg-gold text-white font-bold text-sm shadow-md"
              >
                Client Portal Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
