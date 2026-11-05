import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, Tag } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const couponCode = 'OMNICART10';

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScrollToCatalog = () => {
    const el = document.getElementById('catalog-selection');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero-sale" className="relative w-full bg-white/40 text-black dark:bg-black/40 dark:text-white overflow-hidden border-b border-neutral-200/80 dark:border-[#222222] transition-colors backdrop-blur-xs">
      {/* Editorial Vertical Side Labels (SNKS Style) */}
      <div className="hidden xl:block absolute left-4 bottom-24 -rotate-90 origin-bottom-left text-[9px] font-mono tracking-[0.25em] text-neutral-400 dark:text-neutral-600 uppercase select-none pointer-events-none z-10">
        OMNICART CAMPAIGN / 001
      </div>
      <div className="hidden xl:block absolute right-4 top-24 rotate-90 origin-top-right text-[9px] font-mono tracking-[0.25em] text-neutral-400 dark:text-neutral-600 uppercase select-none pointer-events-none z-10">
        27 NOV - 04 DEC 2026
      </div>

      {/* Bottom Ticker Indicator */}
      <div className="absolute bottom-3 right-6 hidden md:flex items-center gap-2 text-[10px] font-mono tracking-widest text-neutral-500 dark:text-neutral-500 uppercase select-none z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-[#7d9900] dark:bg-[#d4ff00] animate-ping" />
        <span>THE CLOCK IS TICKING</span>
      </div>

      {/* Subtle Background Watermark Headline */}
      <div className="absolute -top-12 left-0 right-0 select-none pointer-events-none opacity-[0.02] dark:opacity-[0.04] font-black text-[120px] sm:text-[220px] lg:text-[280px] leading-none tracking-tighter uppercase whitespace-nowrap text-black dark:text-white">
        OMNICART
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow Status */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#7d9900] dark:text-[#d4ff00] uppercase">
                <span className="w-2 h-2 rounded-full bg-[#7d9900] dark:bg-[#d4ff00] animate-pulse" />
                <span>THE BIGGEST ARCHITECTURE SALE OF THE YEAR</span>
              </div>
              <p className="font-mono text-xs text-neutral-600 dark:text-neutral-400 tracking-wider uppercase">
                GOOD ARCHITECTURE. BAD CONSTRAINTS.
              </p>
            </div>

            {/* Massive Display Title with Ghost Backdrop */}
            <div className="relative space-y-0">
              <div className="absolute -top-6 -left-2 text-6xl sm:text-8xl lg:text-9xl font-black uppercase text-neutral-200/80 dark:text-neutral-900/60 select-none pointer-events-none tracking-tighter">
                SALE
              </div>
              <h1 className="relative text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-black dark:text-white">
                BLACK
              </h1>
              <h1 className="relative text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-black bg-[#d4ff00] px-2.5 inline-block dark:bg-transparent dark:text-[#d4ff00] dark:p-0">
                FRIDAY.
              </h1>
            </div>

            {/* Editorial Body */}
            <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 max-w-lg leading-relaxed font-sans">
              Your production grails. Your event-driven backbones. All in. Up to 60% off the AWS EKS blueprints, Kafka masterclasses, and multi-agent AI SDKs you've been waiting for.
            </p>

            {/* CTA & Discount Actions */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Primary Brutalist Button */}
              <button
                onClick={handleScrollToCatalog}
                className="px-8 py-4 bg-[#d4ff00] hover:bg-[#bfff00] text-black font-mono font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg select-none"
              >
                <span>SHOP THE SALE</span>
                <ArrowUpRight className="w-5 h-5 stroke-[3]" />
              </button>

              {/* SNKS-Style Coupon Code Copy Box */}
              <div className="bg-neutral-100 dark:bg-[#0d0d0d] border border-neutral-200 dark:border-[#262626] p-2.5 sm:px-4 sm:py-2.5 rounded-none flex items-center justify-between gap-4 font-mono transition-colors">
                <div>
                  <div className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-widest flex items-center gap-1">
                    <Tag className="w-3 h-3 text-[#7d9900] dark:text-[#d4ff00]" />
                    <span>10% OFF YOUR ORDER</span>
                  </div>
                  <div className="text-xs font-black text-black dark:text-[#d4ff00] tracking-wider mt-0.5">
                    {couponCode}
                  </div>
                </div>

                <button
                  onClick={handleCopyCoupon}
                  className="px-2.5 py-1.5 bg-neutral-200 hover:bg-neutral-300 dark:bg-[#1a1a1a] dark:hover:bg-[#262626] text-black dark:text-white text-[11px] font-bold uppercase rounded-none flex items-center gap-1.5 transition-colors border border-neutral-300 dark:border-[#333333]"
                  title="Copy coupon code"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#7d9900] dark:text-[#d4ff00]" />
                      <span className="text-[#7d9900] dark:text-[#d4ff00]">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Starburst Discount Badge & Blueprint Visual */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Starburst Discount Badge (SNKS Style Spiky Sticker) */}
            <div className="absolute -top-8 -right-2 sm:-right-4 z-20 select-none">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center rotate-6 hover:rotate-0 transition-transform duration-300 drop-shadow-[0_10px_20px_rgba(212,255,0,0.35)]">
                {/* 12-Spike Brutalist Starburst Shape */}
                <svg
                  className="absolute inset-0 w-full h-full text-[#d4ff00]"
                  viewBox="0 0 200 200"
                  fill="currentColor"
                >
                  <polygon points="100,6 118,29 146,21 156,48 185,53 182,82 198,100 182,118 185,147 156,152 146,179 118,171 100,194 82,171 54,179 44,152 15,147 18,118 2,100 18,82 15,53 44,48 54,21 82,29" />
                </svg>

                {/* Starburst Center Copy */}
                <div className="relative z-10 text-black text-center px-4 font-black uppercase pointer-events-none">
                  <span className="block text-[9px] sm:text-[10px] font-mono tracking-widest leading-tight">
                    UP TO
                  </span>
                  <span className="block text-3xl sm:text-4xl font-black leading-none tracking-tighter my-0.5">
                    60%
                  </span>
                  <span className="block text-[8px] sm:text-[9px] font-mono tracking-wider font-bold leading-tight">
                    OFF. NO HOLDING BACK.
                  </span>
                </div>
              </div>
            </div>

            {/* Blueprint Schematic Showcase Card */}
            <div className="w-full bg-neutral-50 dark:bg-[#0a0a0a] border border-neutral-200 dark:border-[#222222] p-5 sm:p-6 rounded-none relative overflow-hidden group shadow-xl transition-colors">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-200 dark:border-[#1f1f1f] text-xs font-mono">
                <span className="text-black dark:text-[#d4ff00] font-bold">CORE_ARCH // CLUSTER v1.30</span>
                <span className="text-neutral-500">AWS_EKS.TERRAFORM</span>
              </div>

              <div className="relative aspect-[16/10] overflow-hidden rounded-none bg-black border border-neutral-300 dark:border-[#1a1a1a]">
                <img
                  src="/assets/schematics/eks-blueprint.svg"
                  alt="AWS EKS Blueprint"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-xs font-mono text-neutral-600 dark:text-neutral-400">
                <span>VERIFIED GRAALVM & KAFKA</span>
                <span className="text-black dark:text-white font-bold">$189.00 <span className="line-through text-neutral-400 dark:text-neutral-600 text-[11px]">$249.00</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
