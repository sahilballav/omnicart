import React from 'react';
import { Database, Zap, ShieldCheck, Sparkles, Server } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const ArchitectureShowcase: React.FC = () => {
  const features = [
    {
      icon: Database,
      iconColor: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20',
      title: 'PostgreSQL JSONB Dynamic Schema',
      tag: 'Data Layer',
      description: 'Store arbitrary licensing tiers, compatibility matrices, and runtime requirements without costly relational schema migrations.'
    },
    {
      icon: Zap,
      iconColor: 'text-rose-400',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/20',
      title: 'Redis Sub-Millisecond Session Cache',
      tag: 'State Sync',
      description: 'Synchronizes volatile shopping carts across React web and Flutter mobile apps with zero primary database bottlenecks.'
    },
    {
      icon: Server,
      iconColor: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      title: 'Apache Kafka Event Pipeline',
      tag: 'Streaming',
      description: 'Checkout API asynchronously publishes OrderPlaced events, decoupling inventory adjustments and live analytics streams.'
    },
    {
      icon: ShieldCheck,
      iconColor: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      title: 'Resilience4j Circuit Breakers',
      tag: 'Reliability',
      description: 'Guarantees 99.99% uptime with intelligent failover fallbacks and rate limiters protecting inter-service communications.'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 my-6">
      <ScrollReveal direction="up" delay={50}>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-3 border border-indigo-200/60">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Enterprise Infrastructure Core
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
            Engineered for Resilient Multi-Platform Scale
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            OmniCart's decoupled architecture unifies dynamic catalog management, real-time cache synchronization, and asynchronous event streaming.
          </p>
        </div>
      </ScrollReveal>

      {/* Grid with staggered ScrollReveal cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <ScrollReveal
              key={idx}
              direction="up"
              delay={idx * 120}
              className="h-full"
            >
              <div className="group h-full bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl ${feature.bgColor} ${feature.borderColor} border`}>
                      <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">
                      {feature.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>LATENCY: &lt;1ms</span>
                  <span className="text-emerald-500 font-bold">ACTIVE</span>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
};
