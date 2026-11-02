import React from 'react';
import { ArrowRight, Cpu, Database, Zap, Sparkles, Server } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white py-12 md:py-16 mb-8 rounded-3xl mx-4 sm:mx-6 lg:mx-8 shadow-xl border border-slate-800">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto px-6 sm:px-8 text-center md:text-left md:flex md:items-center md:justify-between gap-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold mb-4 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Cloud-Native Multi-Platform Ecosystem
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            Next-Gen E-Commerce with{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              Dynamic Attributes
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
            Experience real-time cart state synchronization, schema-less product exploration powered by PostgreSQL JSONB, and asynchronous order processing ready for Kafka event pipelines.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <a
              href="#catalog"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition-all hover:gap-3"
            >
              Explore Products <ArrowRight className="w-4 h-4" />
            </a>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium rounded-xl backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Synchronized State Ready
            </div>
          </div>
        </div>

        {/* Architectural Tech Stack Pills */}
        <div className="mt-8 md:mt-0 grid grid-cols-2 gap-3 max-w-sm mx-auto md:mx-0">
          <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl flex items-start gap-3 text-left backdrop-blur-sm">
            <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400 shrink-0">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Postgres JSONB</div>
              <div className="text-[11px] text-slate-400 leading-tight mt-0.5">Dynamic Schema-less Specs</div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl flex items-start gap-3 text-left backdrop-blur-sm">
            <div className="p-2 bg-rose-500/10 rounded-xl text-rose-400 shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Redis Cache</div>
              <div className="text-[11px] text-slate-400 leading-tight mt-0.5">Sub-ms Cart Sessions</div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl flex items-start gap-3 text-left backdrop-blur-sm">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400 shrink-0">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Apache Kafka</div>
              <div className="text-[11px] text-slate-400 leading-tight mt-0.5">Asynchronous Checkout</div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl flex items-start gap-3 text-left backdrop-blur-sm">
            <div className="p-2 bg-cyan-500/10 rounded-xl text-cyan-400 shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Spring Boot 21</div>
              <div className="text-[11px] text-slate-400 leading-tight mt-0.5">Resilience4j Microservices</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
