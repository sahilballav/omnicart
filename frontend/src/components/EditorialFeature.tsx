import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface EditorialFeatureProps {
  onExploreClick?: () => void;
}

export const EditorialFeature: React.FC<EditorialFeatureProps> = ({ onExploreClick }) => {
  return (
    <section id="limited-drops" className="w-full bg-white/80 dark:bg-black/80 backdrop-blur-xs text-black dark:text-white border-b border-neutral-200 dark:border-[#222222] overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[520px]">
        {/* Left Side: High-Contrast Monochromatic Visual */}
        <div className="relative bg-[#0d0d0d] border-b lg:border-b-0 lg:border-r border-neutral-200 dark:border-[#222222] flex items-center justify-center p-8 sm:p-12 overflow-hidden group">
          <div className="absolute inset-0 bg-radial from-transparent to-black/80 z-10 pointer-events-none" />
          <img
            src="/assets/schematics/agentic-llm.svg"
            alt="Limited Release Schematic"
            className="w-full max-w-lg object-contain group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
          />
          <div className="absolute bottom-4 left-6 z-20 font-mono text-[11px] text-neutral-500 uppercase tracking-widest">
            EDITION: COHORT_2026 // KAFKA + AGENTIC
          </div>
        </div>

        {/* Right Side: Editorial Headline & Copy */}
        <div className="p-8 sm:p-14 lg:p-16 flex flex-col justify-center space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#7d9900] dark:text-[#d4ff00] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#7d9900] dark:bg-[#d4ff00]" />
            <span>LIMITED DROPS / 002</span>
          </div>

          <div className="space-y-1">
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-[0.95] text-black dark:text-white">
              HERE TODAY.
            </h2>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-[0.95] text-black bg-[#d4ff00] px-2.5 inline-block dark:bg-transparent dark:text-[#d4ff00] dark:p-0">
              GONE TOMORROW.
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 max-w-md font-mono uppercase tracking-wide leading-relaxed">
            Some code releases don't get a public rerun. Handcrafted GraalVM native images, multi-agent LLM graphs, and zero-trust IAM pipelines. Small seat allocations. Zero time to sleep on it.
          </p>

          <div className="pt-2">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 font-mono text-xs font-black uppercase tracking-wider text-black hover:text-[#7d9900] border-b-2 border-black hover:border-[#7d9900] dark:text-white dark:hover:text-[#d4ff00] dark:border-white dark:hover:border-[#d4ff00] pb-1 transition-colors"
            >
              <span>DON'T MISS YOUR ARCHITECTURE</span>
              <ArrowUpRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

