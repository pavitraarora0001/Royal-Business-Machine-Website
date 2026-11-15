import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ShieldCheck, Scale, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service & Client Agreements | Royal Business Machine",
  description:
    "Terms of service, commercial agreements, intellectual property ownership, milestone payments, and warranty provisions for Royal Business Machine clients.",
};

export default function TermsPage() {
  const lastUpdated = "March 2026";

  return (
    <div className="flex flex-col w-full overflow-hidden bg-background">
      
      {/* 1. Header */}
      <section className="py-20 lg:py-24 bg-white dark:bg-charcoal border-b border-border text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gold/10 text-gold border border-gold/25">
            <Scale className="w-3.5 h-3.5" />
            <span>Commercial Agreement</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-charcoal dark:text-warm-white font-heading">
            Terms of Service
          </h1>

          <p className="text-xs sm:text-sm text-slate-muted">
            Last Updated: {lastUpdated} | Governing all consulting, engineering, branding, and printing contracts.
          </p>
        </div>
      </section>

      {/* 2. Legal Body */}
      <section className="py-20 bg-warm-white dark:bg-charcoal/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="p-8 sm:p-14 rounded-3xl bg-white dark:bg-charcoal border border-border shadow-sm space-y-10 text-sm text-slate-muted leading-relaxed">
            
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-charcoal dark:text-warm-white font-heading">
                1. Acceptance of Terms
              </h2>
              <p>
                By commissioning services, signing a statement of work (SOW), or registering an account with ROYAL BUSINESS MACHINE (&ldquo;RBM&rdquo;), you (&ldquo;Client&rdquo;) agree to be legally bound by these Terms of Service. These terms constitute the master service framework governing all technical, creative, and institutional deliverables.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-charcoal dark:text-warm-white font-heading">
                2. Project Scoping & Milestone Delivery
              </h2>
              <p>
                All engineering and consulting engagements are executed pursuant to a mutually approved Statement of Work. Project phases follow RBM&apos;s 7-Step Agile Delivery Process. Any material alterations or additions to the functional specifications outside the approved SOW will be documented as a formal change request subject to revised timelines and fees.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-charcoal dark:text-warm-white font-heading">
                3. Intellectual Property Rights & Ownership
              </h2>
              <p>
                RBM affirms that upon final payment milestone settlement by the Client:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                <li><strong>Client Ownership:</strong> 100% of all custom source code, application assets, designs, databases, and deliverables created specifically for the Client shall transfer entirely to the Client.</li>
                <li><strong>Pre-Existing Tools:</strong> RBM retains ownership of its proprietary pre-existing utility libraries, open-source dependencies, and generalized frameworks, granting the Client an irrevocable, non-exclusive, perpetual license to use them within the deployed application.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-charcoal dark:text-warm-white font-heading">
                4. Payment Terms & Invoicing
              </h2>
              <p>
                Payment milestones are invoiced according to the schedule stipulated in the project agreement (typically: initial commencement deposit, intermediate demo verification, and final deployment settlement). Invoices are payable within 15 business days. Taxes (including Indian GST) are itemized on all official commercial invoices.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-charcoal dark:text-warm-white font-heading">
                5. Warranty & Post-Launch Support
              </h2>
              <p>
                Custom software deliverables carry a standard thirty (30) day warranty starting from the date of production launch. During this period, RBM shall remediate any functional defects or discrepancies against the approved SOW at zero additional cost. Extended ongoing maintenance and server tracking are administered via Annual Maintenance Contracts (AMCs).
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-charcoal dark:text-warm-white font-heading">
                6. Governing Law & Jurisdiction
              </h2>
              <p>
                These Terms of Service and any contractual disputes arising thereunder shall be governed by, construed, and enforced exclusively in accordance with the laws of India, with exclusive jurisdiction resting in the competent courts of Bharatpur, Rajasthan.
              </p>
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
                href="/privacy"
                className="text-xs font-semibold text-slate-muted hover:text-charcoal dark:hover:text-white transition-colors"
              >
                View Privacy Policy
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
