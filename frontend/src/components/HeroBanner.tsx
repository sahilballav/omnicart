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
    <section className="relative w-full bg-black text-white overflow-hidden border-b border-[#222222]">
      {/* Background Watermark Headline */}
      <div className="absolute -top-12 left-0 right-0 select-none pointer-events-none opacity-5 font-black text-[120px] sm:text-[220px] lg:text-[280px] leading-none tracking-tighter uppercase whitespace-nowrap text-white">
        OMNICART
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow Status */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#d4ff00] uppercase">
                <span className="w-2 h-2 rounded-full bg-[#d4ff00] animate-pulse" />
                <span>THE BIGGEST ARCHITECTURE SALE OF THE YEAR</span>
              </div>
              <p className="font-mono text-xs text-neutral-400 tracking-wider uppercase">
                PRODUCTION CODE. ZERO COMPROMISES.
              </p>
            </div>

            {/* Massive Display Title */}
            <div className="space-y-0">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
                BLACK
              </h1>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-[#d4ff00]">
                FRIDAY.
              </h1>
            </div>

            {/* Editorial Body */}
            <p className="text-sm sm:text-base text-neutral-300 max-w-lg leading-relaxed font-sans">
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
              <div className="bg-[#0d0d0d] border border-[#262626] p-2.5 sm:px-4 sm:py-2.5 rounded flex items-center justify-between gap-4 font-mono">
                <div>
                  <div className="text-[10px] text-neutral-400 uppercase tracking-widest flex items-center gap-1">
                    <Tag className="w-3 h-3 text-[#d4ff00]" />
                    <span>10% OFF YOUR ORDER</span>
                  </div>
                  <div className="text-xs font-black text-[#d4ff00] tracking-wider mt-0.5">
                    {couponCode}
                  </div>
                </div>

                <button
                  onClick={handleCopyCoupon}
                  className="px-2.5 py-1.5 bg-[#1a1a1a] hover:bg-[#262626] text-white text-[11px] font-bold uppercase rounded flex items-center gap-1.5 transition-colors border border-[#333333]"
                  title="Copy coupon code"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#d4ff00]" />
                      <span className="text-[#d4ff00]">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-neutral-400" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Starburst Discount Badge & Blueprint Visual */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Starburst Discount Badge (SNKS Style) */}
            <div className="absolute -top-6 right-2 sm:right-6 z-20">
              <div className="relative bg-[#d4ff00] text-black font-black uppercase text-center p-4 sm:p-5 shadow-2xl rotate-6 hover:rotate-0 transition-transform">
                <span className="block text-[10px] font-mono tracking-widest font-bold">UP TO</span>
                <span className="block text-3xl sm:text-4xl font-black leading-none">60%</span>
                <span className="block text-[10px] font-mono tracking-widest font-bold mt-1">
                  OFF. NO HOLDING BACK.
                </span>
              </div>
            </div>

            {/* Blueprint Schematic Showcase Card */}
            <div className="w-full bg-[#0a0a0a] border border-[#222222] p-5 sm:p-6 rounded-lg relative overflow-hidden group shadow-2xl">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1f1f1f] text-xs font-mono">
                <span className="text-[#d4ff00] font-bold">CORE_ARCH // CLUSTER v1.30</span>
                <span className="text-neutral-500">AWS_EKS.TERRAFORM</span>
              </div>

              <div className="relative aspect-[16/10] overflow-hidden rounded bg-black border border-[#1a1a1a]">
                <img
                  src="/assets/schematics/eks-blueprint.svg"
                  alt="AWS EKS Blueprint"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>VERIFIED GRAALVM & KAFKA</span>
                <span className="text-white font-bold">$189.00 <span className="line-through text-neutral-600 text-[11px]">$249.00</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
