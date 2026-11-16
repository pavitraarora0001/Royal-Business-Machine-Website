"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
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
  Shield,
  Layers,
  Sparkles,
  Users,
  Compass,
  Briefcase,
  Smartphone,
  Globe2,
  Cpu
} from "lucide-react";

const emptySubscribe = () => () => {};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const servicesMenu = [
    {
      title: "Web & Enterprise Cloud",
      desc: "Custom web apps, Next.js portals & SaaS architectures",
      href: "/services/web-development",
      icon: Globe2,
    },
    {
      title: "Mobile Applications",
      desc: "iOS, Android, cross-platform apps & logistics engines",
      href: "/services/mobile-app-development",
      icon: Smartphone,
    },
    {
      title: "Digital Marketing & SEO",
      desc: "Technical SEO, ROAS ad funnels & brand positioning",
      href: "/services/digital-marketing",
      icon: Sparkles,
    },
    {
      title: "Startup & Venture Advisory",
      desc: "Pitch decks, business models, MSME setup & MVP sprints",
      href: "/services/business-consulting",
      icon: Briefcase,
    },
  ];

  const solutionsMenu = [
    {
      title: "Software Products & Platforms",
      desc: "12 ready SaaS suites including Dairy Muneem, HMS & CampusCore",
      href: "/products",
      icon: Cpu,
    },
    {
      title: "Industry Verticals",
      desc: "11 tailored sectors from Healthcare & Dairy to Government",
      href: "/industries",
      icon: Layers,
    },
    {
      title: "7-Step Delivery Process",
      desc: "Transparent discovery to deployment framework",
      href: "/process",
      icon: Compass,
    },
    {
      title: "Milestones & Achievements",
      desc: "50+ deployments, ₹1.8 Cr revenue & verified impact",
      href: "/achievements",
      icon: Shield,
    },
  ];

  const companyMenu = [
    { title: "Leadership Team", desc: "Founder & CEO Pavitra Arora and engineering team", href: "/team", icon: Users },
    { title: "Client Testimonials", desc: "Verified enterprise reviews and partner ratings", href: "/testimonials", icon: Sparkles },
    { title: "Insights & Tech Blog", desc: "Next.js 16, AI e-governance & architectural advice", href: "/blog", icon: Briefcase },
    { title: "Careers & Culture", desc: "Engineering, design & growth roles", href: "/careers", icon: Users },
    { title: "Frequently Asked Questions", desc: "IP ownership, SLAs, payment milestones & timelines", href: "/faq", icon: Compass },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-[#F7F7F5]/98 dark:bg-[#181C21]/98 backdrop-blur-md border-b border-border shadow-sm py-2.5"
          : "bg-[#F7F7F5]/90 dark:bg-[#181C21]/90 backdrop-blur-md border-b border-border/80 py-3 sm:py-3.5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Corporate Identifier */}
          <Link href="/" className="flex items-center group focus:outline-none shrink-0 py-0.5" aria-label="Royal Business Machine">
            <Image
              src="/assets/logo/logo-horizontal.png"
              alt="Royal Business Machine"
              width={642}
              height={163}
              className="w-[185px] sm:w-[220px] md:w-[250px] lg:w-[285px] xl:w-[310px] h-auto object-contain object-left transition-transform duration-200 group-hover:scale-[1.02]"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 text-sm font-semibold">
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg transition-colors ${
                pathname === "/"
                  ? "text-gold font-bold"
                  : "text-charcoal/80 dark:text-warm-white/80 hover:text-charcoal dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={`px-3 py-2 rounded-lg transition-colors ${
                pathname === "/about"
                  ? "text-gold font-bold"
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
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                  pathname.startsWith("/services")
                    ? "text-gold font-bold"
                    : "text-charcoal/80 dark:text-warm-white/80 hover:text-charcoal dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "services" ? "rotate-180" : ""}`} />
              </Link>

              <AnimatePresence>
                {activeDropdown === "services" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.16 }}
                    className="absolute top-full left-0 w-84 p-2.5 bg-white dark:bg-charcoal rounded-2xl shadow-xl border border-border mt-1 z-50"
                  >
                    <div className="px-2 py-1.5 border-b border-border/60 mb-1 flex items-center justify-between">
                      <p className="text-[11px] font-bold text-slate-muted uppercase tracking-wider">Enterprise Services</p>
                      <span className="text-[10px] bg-gold/15 text-gold font-bold px-2 py-0.5 rounded-full">40+ Deliverables</span>
                    </div>
                    {servicesMenu.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={closeMenus}
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
                    <div className="mt-1 pt-2 border-t border-border/60">
                      <Link
                        href="/services"
                        className="flex items-center justify-between px-3 py-1.5 text-xs font-bold text-gold hover:text-gold-dark transition-colors"
                      >
                        <span>View All 8 Service Categories</span>
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
              className={`px-3 py-2 rounded-lg transition-colors ${
                pathname === "/projects" || pathname === "/portfolio"
                  ? "text-gold font-bold"
                  : "text-charcoal/80 dark:text-warm-white/80 hover:text-charcoal dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              Portfolio
            </Link>

            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("solutions")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                  activeDropdown === "solutions" || pathname === "/industries" || pathname === "/process" || pathname === "/achievements"
                    ? "text-gold font-bold"
                    : "text-charcoal/80 dark:text-warm-white/80 hover:text-charcoal dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <span>Solutions</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "solutions" ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === "solutions" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.16 }}
                    className="absolute top-full left-0 w-80 p-2.5 bg-white dark:bg-charcoal rounded-2xl shadow-xl border border-border mt-1 z-50"
                  >
                    <div className="px-2 py-1.5 border-b border-border/60 mb-1">
                      <p className="text-[11px] font-bold text-slate-muted uppercase tracking-wider">Enterprise Frameworks</p>
                    </div>
                    {solutionsMenu.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={closeMenus}
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Company Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("company")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                  activeDropdown === "company"
                    ? "text-gold font-bold"
                    : "text-charcoal/80 dark:text-warm-white/80 hover:text-charcoal dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <span>Company</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === "company" ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === "company" && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.16 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[460px] p-3 bg-white dark:bg-charcoal rounded-2xl shadow-xl border border-border mt-1 z-50 grid grid-cols-2 gap-1.5"
                  >
                    {companyMenu.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={closeMenus}
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
              className={`px-3 py-2 rounded-lg transition-colors ${
                pathname === "/contact"
                  ? "text-gold font-bold"
                  : "text-charcoal/80 dark:text-warm-white/80 hover:text-charcoal dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Direct Phone Link */}
            <a
              href="tel:+919057287689"
              className="hidden xl:inline-flex items-center gap-1.5 text-xs font-bold text-charcoal/80 dark:text-warm-white/80 hover:text-gold transition-colors px-2.5 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
              title="Call Operations Desk"
            >
              <Phone className="w-3.5 h-3.5 text-gold shrink-0" />
              <span>+91 9057287689</span>
            </a>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-charcoal dark:text-warm-white hover:border-gold hover:text-gold transition-colors bg-white/50 dark:bg-charcoal/50"
                aria-label="Toggle Theme"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="w-4 h-4 text-gold" />
                ) : (
                  <Moon className="w-4 h-4 text-charcoal" />
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
              className="lg:hidden w-10 h-10 rounded-xl border border-border flex items-center justify-center text-charcoal dark:text-warm-white focus:outline-none bg-white/60 dark:bg-charcoal/60"
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
            className="lg:hidden border-b border-border bg-white dark:bg-charcoal max-h-[85vh] overflow-y-auto px-4 pt-4 pb-8 shadow-xl"
          >
            <div className="flex flex-col space-y-1" onClick={closeMenus}>
              <Link
                href="/"
                className="px-4 py-2.5 rounded-xl font-bold text-charcoal dark:text-warm-white hover:bg-warm-white dark:hover:bg-graphite"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="px-4 py-2.5 rounded-xl font-bold text-charcoal dark:text-warm-white hover:bg-warm-white dark:hover:bg-graphite"
              >
                About Us
              </Link>
              <Link
                href="/services"
                className="px-4 py-2.5 rounded-xl font-bold text-charcoal dark:text-warm-white hover:bg-warm-white dark:hover:bg-graphite flex items-center justify-between"
              >
                <span>Enterprise Services</span>
                <span className="text-xs bg-gold/15 text-gold px-2 py-0.5 rounded-full font-bold">8 Categories</span>
              </Link>
              <div className="pl-6 space-y-1 border-l-2 border-gold/30 ml-4 my-1">
                {servicesMenu.map((sub, idx) => (
                  <Link
                    key={idx}
                    href={sub.href}
                    className="block py-1 text-xs font-medium text-slate-muted hover:text-gold"
                  >
                    {sub.title}
                  </Link>
                ))}
              </div>
              <Link
                href="/projects"
                className="px-4 py-2.5 rounded-xl font-bold text-charcoal dark:text-warm-white hover:bg-warm-white dark:hover:bg-graphite"
              >
                Portfolio & Case Studies
              </Link>
              <Link
                href="/industries"
                className="px-4 py-2.5 rounded-xl font-bold text-charcoal dark:text-warm-white hover:bg-warm-white dark:hover:bg-graphite"
              >
                Industries We Empower
              </Link>
              <Link
                href="/process"
                className="px-4 py-2.5 rounded-xl font-bold text-charcoal dark:text-warm-white hover:bg-warm-white dark:hover:bg-graphite"
              >
                7-Step Delivery Process
              </Link>
              <Link
                href="/achievements"
                className="px-4 py-2.5 rounded-xl font-bold text-charcoal dark:text-warm-white hover:bg-warm-white dark:hover:bg-graphite"
              >
                Achievements & Milestones
              </Link>
              <Link
                href="/team"
                className="px-4 py-2.5 rounded-xl font-bold text-charcoal dark:text-warm-white hover:bg-warm-white dark:hover:bg-graphite"
              >
                Leadership & Team
              </Link>
              <Link
                href="/testimonials"
                className="px-4 py-2.5 rounded-xl font-bold text-charcoal dark:text-warm-white hover:bg-warm-white dark:hover:bg-graphite"
              >
                Client Testimonials
              </Link>
              <Link
                href="/blog"
                className="px-4 py-2.5 rounded-xl font-bold text-charcoal dark:text-warm-white hover:bg-warm-white dark:hover:bg-graphite"
              >
                Insights & Blog
              </Link>
              <Link
                href="/faq"
                className="px-4 py-2.5 rounded-xl font-bold text-charcoal dark:text-warm-white hover:bg-warm-white dark:hover:bg-graphite"
              >
                FAQ
              </Link>
              <Link
                href="/careers"
                className="px-4 py-2.5 rounded-xl font-bold text-charcoal dark:text-warm-white hover:bg-warm-white dark:hover:bg-graphite"
              >
                Careers
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2.5 rounded-xl font-bold text-charcoal dark:text-warm-white hover:bg-warm-white dark:hover:bg-graphite"
              >
                Contact
              </Link>
            </div>

            <div className="mt-5 pt-5 border-t border-border flex flex-col gap-2.5">
              <a
                href="tel:+919057287689"
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-border text-xs font-bold text-charcoal dark:text-warm-white"
              >
                <Phone className="w-4 h-4 text-gold" />
                <span>Call Operations: +91 9057287689</span>
              </a>
              <Link
                href="/login"
                className="flex items-center justify-center py-3 rounded-xl bg-charcoal dark:bg-gold text-warm-white dark:text-charcoal font-bold text-xs uppercase tracking-wider shadow-md"
              >
                Portal Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
