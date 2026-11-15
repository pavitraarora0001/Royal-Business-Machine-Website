import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/section-header";
import { CtaBanner } from "@/components/cta-banner";
import {
  Briefcase,
  Users,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  GraduationCap,
  HeartHandshake,
  MapPin,
  Clock,
  Mail
} from "lucide-react";

export const metadata: Metadata = {
  title: "Careers & Culture at Royal Business Machine",
  description:
    "Join our engineering, UI/UX, and growth teams at Royal Business Machine. Explore open roles in full-stack engineering, AI solutions, and enterprise business development.",
};

const perks = [
  {
    title: "High-Impact Deployments",
    desc: "Build real-world software touching thousands of users across colleges, healthcare clinics, and logistics networks.",
    icon: Zap,
  },
  {
    title: "Continuous Upskilling",
    desc: "Annual education budget for certifications, cloud courses, and attendance at top developer conferences.",
    icon: GraduationCap,
  },
  {
    title: "Modern Culture & Ownership",
    desc: "Direct access to executive leadership without bureaucratic red tape; merit-based rapid career advancement.",
    icon: HeartHandshake,
  },
  {
    title: "Hardware & AI Lab Access",
    desc: "Hands-on access to IoT sensors, microcontroller arrays, robotics kits, and in-house commercial press tooling.",
    icon: Sparkles,
  },
];

const openPositions = [
  {
    title: "Senior Full-Stack Software Engineer",
    department: "Engineering",
    location: "Bharatpur HQ / Hybrid",
    type: "Full-Time",
    experience: "3+ Years",
    desc: "Lead the architecture and implementation of Next.js 16, React 19, and Node.js microservices for our enterprise ERP and portal clients.",
    requirements: [
      "Extensive experience with TypeScript, Next.js, and Node.js",
      "Proficiency with PostgreSQL, MongoDB, and Redis caching",
      "Knowledge of Docker containers and CI/CD pipelines",
    ],
  },
  {
    title: "UI/UX Product Designer",
    department: "Design & Brand",
    location: "Bharatpur HQ / Hybrid",
    type: "Full-Time",
    experience: "2+ Years",
    desc: "Craft luxury design systems, intuitive user flows, and interactive Figma prototypes across our corporate and SaaS product lines.",
    requirements: [
      "Mastery of Figma, component libraries, and design tokens",
      "Portfolio demonstrating responsive web and mobile application ergonomics",
      "Understanding of frontend CSS framework constraints",
    ],
  },
  {
    title: "AI & Data Solutions Engineer",
    department: "AI & Innovation",
    location: "Bharatpur HQ / On-Site",
    type: "Full-Time",
    experience: "1-3 Years",
    desc: "Work directly on proprietary platforms like NyayaSetu implementing vector search, legal classification rule engines, and OCR pipelines.",
    requirements: [
      "Solid foundation in Python, FastEmbed, and LangChain/LlamaIndex",
      "Experience with relational data stores and vector databases",
      "Passion for applied, deterministic AI applications",
    ],
  },
  {
    title: "Enterprise Business Development Manager",
    department: "Growth & Institutional",
    location: "East Rajasthan / Regional",
    type: "Full-Time",
    experience: "2+ Years",
    desc: "Drive regional partnerships with colleges, hospitals, and dairy federations across Bharatpur, Karauli, Alwar, and Jaipur.",
    requirements: [
      "Proven track record in B2B consultative technology sales",
      "Strong communication skills in Hindi and English",
      "Understanding of institutional procurement and tenders",
    ],
  },
];

export default function CareersPage() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      
      {/* 1. Header */}
      <section className="py-20 lg:py-28 bg-white dark:bg-charcoal border-b border-border text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/25">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Join Our Mission</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-charcoal dark:text-warm-white font-heading">
            Build the Future of <span className="gold-gradient-text">Enterprise Technology</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-muted dark:text-slate-light leading-relaxed max-w-3xl mx-auto font-normal">
            Join a fast-growing, mission-driven team engineering scalable software, AI platforms, and institutional infrastructure across India.
          </p>
        </div>
      </section>

      {/* 2. Perks & Culture Grid */}
      <section className="py-24 bg-warm-white dark:bg-charcoal/50 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <SectionHeader
            badge="Why Join RBM"
            title="Culture Engineered for Excellence"
            subtitle="We invest deeply in our people, providing autonomy, enterprise-grade challenges, and rapid growth opportunities."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white dark:bg-charcoal border border-border hover:border-gold/50 shadow-sm transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mb-5">
                  <perk.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-charcoal dark:text-warm-white mb-2 font-heading">
                  {perk.title}
                </h3>
                <p className="text-xs text-slate-muted leading-relaxed font-normal">
                  {perk.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Open Positions */}
      <section className="py-24 bg-white dark:bg-charcoal border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <SectionHeader
            badge="Current Openings"
            title="Explore Open Positions"
            subtitle="Find the role where your technical craftsmanship can make a measurable real-world difference."
          />

          <div className="space-y-6">
            {openPositions.map((pos, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-warm-white/70 dark:bg-graphite/40 border border-border hover:border-gold/50 shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-3 flex-grow">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
                      {pos.department}
                    </span>
                    <span className="text-xs text-slate-muted flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gold" />
                      <span>{pos.location}</span>
                    </span>
                    <span className="text-xs text-slate-muted flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gold" />
                      <span>{pos.type} • {pos.experience}</span>
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-charcoal dark:text-warm-white font-heading">
                    {pos.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-muted leading-relaxed max-w-2xl font-normal">
                    {pos.desc}
                  </p>

                  <div className="pt-2">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-muted mb-1">Key Requirements</div>
                    <ul className="space-y-1">
                      {pos.requirements.map((req, rIdx) => (
                        <li key={rIdx} className="text-xs text-charcoal/80 dark:text-warm-white/80 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="shrink-0">
                  <a
                    href={`mailto:royalbusinessmachine@gmail.com?subject=Job%20Application:%20${encodeURIComponent(pos.title)}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-charcoal dark:bg-gold text-warm-white dark:text-charcoal font-bold text-xs uppercase tracking-wider hover:bg-gold transition-colors shadow-sm"
                  >
                    <span>Apply via Email</span>
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 p-8 rounded-3xl bg-warm-white dark:bg-charcoal border border-border text-center max-w-2xl mx-auto space-y-3">
            <h4 className="text-lg font-bold text-charcoal dark:text-warm-white font-heading">
              Don&apos;t See an Exact Match?
            </h4>
            <p className="text-xs sm:text-sm text-slate-muted leading-relaxed">
              We are always excited to meet exceptional engineers, designers, and growth strategists. Send your resume and portfolio directly to our executive team.
            </p>
            <a
              href="mailto:royalbusinessmachine@gmail.com?subject=General%20Application%20/%20Talent%20Inquiry"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:text-gold-dark transition-colors pt-2"
            >
              <span>Email: royalbusinessmachine@gmail.com</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </section>

      {/* 4. Conversion CTA */}
      <CtaBanner
        title="Ready to Transform Enterprises With Us?"
        subtitle="Join ROYAL BUSINESS MACHINE and deliver digital infrastructure across emerging Indian markets."
      />
    </div>
  );
}
