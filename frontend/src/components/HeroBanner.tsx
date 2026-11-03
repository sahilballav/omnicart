import React from 'react';
import { ArrowRight, Code2, Database, Layers, ShieldCheck } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-8 sm:p-12 transition-colors">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-800 text-slate-300 text-xs font-mono mb-6 border border-slate-700">
            <span>OmniCart Digital Repository</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-5 leading-tight">
            Production Cloud Blueprints & Microservice Starters
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
            Verified Infrastructure as Code modules, Spring Boot 21 microservice templates, and autonomous agent SDKs with dynamic PostgreSQL JSONB licensing.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#catalog"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Browse Catalog <ArrowRight className="w-4 h-4" />
            </a>
            <span className="text-xs text-slate-400 font-mono">
              Instant GitHub access & signed S3 downloads
            </span>
          </div>
        </div>

        {/* Technical Highlights Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div>
            <div className="flex items-center gap-2 text-slate-200 text-sm font-semibold mb-1">
              <Database className="w-4 h-4 text-indigo-400" />
              <span>PostgreSQL JSONB</span>
            </div>
            <p className="text-xs text-slate-400">Schema-less dynamic licensing</p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-slate-200 text-sm font-semibold mb-1">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Redis Cluster</span>
            </div>
            <p className="text-xs text-slate-400">Sub-millisecond session state</p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-slate-200 text-sm font-semibold mb-1">
              <Code2 className="w-4 h-4 text-amber-400" />
              <span>Apache Kafka</span>
            </div>
            <p className="text-xs text-slate-400">Decoupled checkout pipeline</p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-slate-200 text-sm font-semibold mb-1">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Spring Boot 21</span>
            </div>
            <p className="text-xs text-slate-400">Resilience4j fault tolerance</p>
          </div>
        </div>
      </div>
    </section>
  );
};
