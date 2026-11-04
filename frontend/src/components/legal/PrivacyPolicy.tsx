import React from 'react';
import { ArrowLeft, Shield, Lock, FileText, CheckCircle2 } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
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
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Privacy Policy
            </h1>
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
              Effective Date: January 1, 2026 // Version 2.0
            </p>
          </div>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-500" />
              1. Overview and Core Privacy Principles
            </h2>
            <p>
              OmniCart operates as a cloud-native software and digital asset distribution engine. We design our systems around data minimization, strict isolation, and zero third-party advertising tracking. We do not sell, rent, or trade customer data under any circumstances.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-500" />
              2. Information We Collect and Process
            </h2>
            <p>We process only the technical data required to deliver digital software licenses and maintain account security:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Account Credentials:</strong> Email address, cryptographically hashed passwords, and assigned authorization roles (RBAC).
              </li>
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Session State:</strong> Ephemeral shopping cart contents and temporary session tokens stored in Redis with an automated 24-hour time-to-live (TTL) expiration.
              </li>
              <li>
                <strong className="text-slate-800 dark:text-slate-200">License Records:</strong> Asymmetrically signed Ed25519 public keys, GitHub organization identifiers for repository access, and license seat allocations recorded in PostgreSQL.
              </li>
              <li>
                <strong className="text-slate-800 dark:text-slate-200">Technical Logs:</strong> Ingress IP addresses, HTTP user-agent headers, and rate-limiting metrics retained in temporary circular buffers for network defense and DDoS mitigation.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              3. Data Retention and Deletion
            </h2>
            <p>
              Temporary session records in Redis are purged automatically upon checkout completion or after 24 hours of inactivity. Transaction records and issued cryptographic license certificates are retained for accounting and compliance purposes. Users may request complete erasure of their personal identity records by contacting our compliance officer.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-500" />
              4. GDPR and CCPA Compliance Rights
            </h2>
            <p>
              In compliance with the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA), you retain the following statutory rights:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
              <li>Right to inspect and export all license holdings in machine-readable JSON format.</li>
              <li>Right to immediate correction of inaccurate profile data.</li>
              <li>Right to request immediate account deletion and cryptographic credential revocation.</li>
              <li>Right to opt out of non-essential communications at any time.</li>
            </ul>
          </section>

          <section className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-500 dark:text-slate-400">
            <div>Data Controller: OmniCart Technologies Inc.</div>
            <div>Security Office: privacy@omnicart.io</div>
            <div>PGP Key Fingerprint: 4E91 B27C 9A02 813D 66F0 E21B 382A 9400 C1B8 79FA</div>
          </section>
        </div>
      </div>
    </div>
  );
};

