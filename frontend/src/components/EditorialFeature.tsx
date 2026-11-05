import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface EditorialFeatureProps {
  onExploreClick?: () => void;
}

export const EditorialFeature: React.FC<EditorialFeatureProps> = ({ onExploreClick }) => {
  return (
    <section id="limited-drops" className="w-full bg-black text-white border-b border-[#222222] overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[520px]">
        {/* Left Side: High-Contrast Monochromatic Visual */}
        <div className="relative bg-[#0d0d0d] border-b lg:border-b-0 lg:border-r border-[#222222] flex items-center justify-center p-8 sm:p-12 overflow-hidden group">
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
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#d4ff00] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#d4ff00]" />
            <span>LIMITED DROPS / 002</span>
          </div>

          <div className="space-y-1">
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-[0.95]">
              HERE TODAY.
            </h2>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-[0.95] text-[#d4ff00]">
              GONE TOMORROW.
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 max-w-md font-mono uppercase tracking-wide leading-relaxed">
            Some code releases don't get a public rerun. Handcrafted GraalVM native images, multi-agent LLM graphs, and zero-trust IAM pipelines. Small seat allocations. Zero time to sleep on it.
          </p>

          <div className="pt-2">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 font-mono text-xs font-black uppercase tracking-wider text-white hover:text-[#d4ff00] border-b-2 border-white hover:border-[#d4ff00] pb-1 transition-colors"
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
