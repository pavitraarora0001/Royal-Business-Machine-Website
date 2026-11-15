import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy & Data Protection | Royal Business Machine",
  description:
    "Privacy Policy for Royal Business Machine detailing data collection, processing transparency, cookies, and adherence to the Digital Personal Data Protection standards.",
};

export default function PrivacyPage() {
  const lastUpdated = "March 2026";

  return (
    <div className="flex flex-col w-full overflow-hidden bg-background">
      
      {/* 1. Header */}
      <section className="py-20 lg:py-24 bg-white dark:bg-charcoal border-b border-border text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/25">
            <Lock className="w-3.5 h-3.5" />
            <span>Legal Compliance</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-charcoal dark:text-warm-white font-heading">
            Privacy Policy
          </h1>

          <p className="text-xs sm:text-sm text-slate-muted">
            Last Updated: {lastUpdated} | Effective for ROYAL BUSINESS MACHINE and all affiliated web properties.
          </p>
        </div>
      </section>

      {/* 2. Legal Body */}
      <section className="py-20 bg-warm-white dark:bg-charcoal/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="p-8 sm:p-14 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm space-y-10 text-sm text-slate-muted leading-relaxed">
            
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-charcoal dark:text-warm-white font-heading">
                1. Overview & Commitment
              </h2>
              <p>
                ROYAL BUSINESS MACHINE (&ldquo;RBM&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), registered as an MSME entity under the laws of India with headquarters in Bharatpur, Rajasthan, is deeply committed to protecting the privacy, confidentiality, and security of individuals and enterprises that interact with our digital platforms and services.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-charcoal dark:text-warm-white font-heading">
                2. Information We Collect
              </h2>
              <p>
                We collect information directly from you when you submit a project inquiry, request a proposal, register an account on our client portal, or communicate with our operations desk:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                <li><strong>Identity Data:</strong> Full name, professional title, and organization/company name.</li>
                <li><strong>Contact Data:</strong> Corporate email address, telephone/WhatsApp contact numbers, and office mailing address.</li>
                <li><strong>Technical Data:</strong> IP address, browser type, operating system version, and anonymous visit analytics collected via privacy-first cookies.</li>
                <li><strong>Project Scoping Data:</strong> Functional specifications, budget windows, and technical requirements provided during discovery phases.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-charcoal dark:text-warm-white font-heading">
                3. Purpose of Processing
              </h2>
              <p>We process your data strictly for legitimate business execution purposes:</p>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                <li>To evaluate, scope, and formulate custom statements of work and commercial estimates.</li>
                <li>To perform contractual software engineering, mobile app development, digital marketing, and printing services.</li>
                <li>To authenticate client portal users and administer active project ticket milestones.</li>
                <li>To comply with statutory tax, audit, and regulatory requirements under the laws of India.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-charcoal dark:text-warm-white font-heading">
                4. Data Confidentiality & Non-Disclosure
              </h2>
              <p>
                We do not sell, rent, monetize, or lease your personal or enterprise information to third-party data brokers under any circumstances. All client specifications, business logic, databases, and proprietary models disclosed to Royal Business Machine are governed by strict mutual non-disclosure obligations.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-charcoal dark:text-warm-white font-heading">
                5. Security Safeguards
              </h2>
              <p>
                Our server infrastructure implements industry-standard technical and organizational safeguards, including SSL/TLS in-transit encryption, AES-256 database at-rest encryption, role-based access restrictions, and regular vulnerability audits.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-charcoal dark:text-warm-white font-heading">
                6. Contact Privacy Officer
              </h2>
              <p>
                If you have questions regarding this Privacy Policy or wish to request data correction or deletion, please contact our administrative desk:
              </p>
              <div className="p-4 rounded-xl bg-warm-white dark:bg-graphite text-xs text-charcoal dark:text-warm-white space-y-1">
                <div><strong>ROYAL BUSINESS MACHINE</strong></div>
                <div>Attention: Privacy & Compliance Desk</div>
                <div>Headquarters: Bharatpur, Rajasthan, India</div>
                <div>Email: <a href="mailto:royalbusinessmachine@gmail.com" className="text-gold underline">royalbusinessmachine@gmail.com</a></div>
                <div>Telephone: +91 9057287689</div>
              </div>
            </div>

            <div className="pt-6 border-t border-border flex items-center justify-between">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs font-bold text-gold hover:text-gold-dark transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Homepage</span>
              </Link>
              <Link
                href="/terms"
                className="text-xs font-semibold text-slate-muted hover:text-charcoal dark:hover:text-white transition-colors"
              >
                View Terms of Service
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
