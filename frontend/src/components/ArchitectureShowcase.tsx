import React from 'react';
import { Database, Zap, ShieldCheck, Server } from 'lucide-react';

export const ArchitectureShowcase: React.FC = () => {
  const features = [
    {
      icon: Database,
      title: 'PostgreSQL JSONB Storage',
      tag: 'Dynamic Schema',
      description: 'Stores arbitrary licensing configurations, compatibility requirements, and runtime dependencies in JSONB format.'
    },
    {
      icon: Zap,
      title: 'Redis Session Cache',
      tag: 'State Layer',
      description: 'Caches user shopping carts and active sessions in-memory, avoiding unnecessary queries on the primary database.'
    },
    {
      icon: Server,
      title: 'Kafka Event Pipeline',
      tag: 'Message Broker',
      description: 'Processes checkout events asynchronously across decoupled consumer services for inventory deduction and analytics.'
    },
    {
      icon: ShieldCheck,
      title: 'Resilience4j Circuit Breakers',
      tag: 'Fault Tolerance',
      description: 'Isolates external dependencies with rate limiters and graceful fallbacks to maintain system availability.'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 my-4">
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2">
          System Architecture
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          The underlying technologies powering the OmniCart multi-platform backend.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {feature.tag}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
