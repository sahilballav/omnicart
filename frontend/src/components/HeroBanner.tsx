import React, { useState } from 'react';
import { Terminal, Check, Copy, Key, ShieldCheck } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const sampleCommand = 'curl -s https://api.omnicart.io/v1/catalog | jq .';

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-xs transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              Enterprise Cloud Blueprints & Software Modules
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Verified Infrastructure as Code modules, Spring Boot 21 templates, and agent orchestration libraries. Delivered via Ed25519 cryptographic license tokens and automated GitHub repository invites.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Verified Code Quality</span>
              </span>
              <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-700">
                <Key className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Automated S3 & GitHub Grants</span>
              </span>
            </div>
          </div>

          {/* Quick Start Terminal Box */}
          <div className="lg:w-96 bg-slate-950 text-slate-200 rounded-lg p-3.5 border border-slate-800 font-mono text-xs shadow-inner">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-slate-400" />
                <span>API Endpoint Discovery</span>
              </div>
              <button
                onClick={handleCopy}
                className="hover:text-white flex items-center gap-1 transition-colors"
                title="Copy curl command"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="text-[10px]">{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="overflow-x-auto text-slate-300 select-all py-1">
              <span className="text-emerald-400">$ </span>
              {sampleCommand}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
