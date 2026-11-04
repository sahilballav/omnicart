import React from 'react';
import { ArrowLeft, FileText, CheckCircle2, AlertOctagon, Scale, ShieldCheck } from 'lucide-react';

interface TermsConditionsProps {
  onBack: () => void;
}

export const TermsConditions: React.FC<TermsConditionsProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 transition-colors mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Storefront
      </button>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-10 shadow-xs transition-colors">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="w-10 h-10 rounded-lg bg-slate-900 dark:bg-slate-100 flex items-center justify-center text-white dark:text-slate-900">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Terms & Conditions
            </h1>
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
              Effective Date: January 1, 2026 // Version 2.0
            </p>
          </div>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              1. Acceptance and Agreement Scope
            </h2>
            <p>
              By accessing the OmniCart platform, acquiring digital blueprints, deploying Infrastructure as Code modules, or invoking our API gateway, you agree to be bound by these Terms and Conditions. These terms constitute an enforceable software licensing agreement between OmniCart Technologies Inc. and your organization.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              2. Digital Software License Grant
            </h2>
            <p>
              Purchases made through OmniCart grant specific commercial rights based on the tier designated in the product specification:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Commercial Team License:</strong> Grants your legal entity non-exclusive, perpetual rights to deploy, modify, and integrate the artifact into internal production environments and commercial client deliverables.
              </li>
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Single Organization License:</strong> Confines usage to a single corporate entity or subsidiary with the provisioned seat count recorded on the license token.
              </li>
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Delivery Fulfillment:</strong> Assets are provisioned instantaneously via signed GitHub repository access grants and cryptographically verified ZIP artifact downloads.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-amber-500" />
              3. Restrictions and Prohibited Conduct
            </h2>
            <p>You agree that your organization and its authorized agents shall not:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
              <li>Sub-license, resell, or distribute raw source code templates as standalone commercial marketplace listings.</li>
              <li>Attempt to forge, alter, or tamper with Ed25519 digital license tokens or signature headers.</li>
              <li>Execute automated extraction scripts against catalog endpoints in excess of published rate limit headers.</li>
              <li>Circumvent role-based access control guards on the administrative console.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              4. Warranties and Limitation of Liability
            </h2>
            <p>
              OmniCart certifies that all blueprints and source repositories compile against specified runtime dependencies (e.g., Java 21 LTS, Terraform 1.7+, PostgreSQL 16). Except as expressly stated, digital artifacts are delivered on an as-is basis. In no event shall OmniCart Technologies Inc. be liable for indirect, punitive, or consequential damages resulting from infrastructure misconfiguration or third-party cloud outages.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-500 dark:text-slate-400">
            <div>Legal Jurisdiction: State of Delaware, United States</div>
            <div>Inquiries: legal@omnicart.io</div>
            <div>Enterprise Contracting: enterprise@omnicart.io</div>
          </section>
        </div>
      </div>
    </div>
  );
};

