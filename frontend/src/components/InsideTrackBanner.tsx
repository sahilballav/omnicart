import React, { useState } from 'react';
import { Lock, ArrowUpRight, Check, Truck, ShieldCheck, Box } from 'lucide-react';

export const InsideTrackBanner: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setSubmitted(false);
    }, 3500);
  };

  return (
    <section id="early-access-section" className="w-full bg-white dark:bg-black text-black dark:text-white border-b border-neutral-200 dark:border-[#222222] transition-colors">
      {/* Massive Neon Volt Lime Full-Bleed Container */}
      <div className="w-full bg-[#d4ff00] text-black py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Bold Headline */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest uppercase">
              <Lock className="w-3.5 h-3.5" />
              <span>THE INSIDE TRACK / 003</span>
            </div>

            <div className="space-y-0">
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none">
                FIRST IN.
              </h2>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none">
                BEST PAIRS.
              </h2>
            </div>

            <p className="text-xs sm:text-sm font-mono uppercase tracking-wide max-w-md font-bold leading-relaxed text-black/90">
              Beat the rush. Get early access to the Black Friday sale, private cohort repos, and production-ready modules before everyone else.
            </p>
          </div>

          {/* Right Column: High-Impact Input Form */}
          <div className="lg:col-span-6">
            <div className="max-w-md ml-auto space-y-4">
              <div className="text-xs font-mono font-bold tracking-widest uppercase">
                YOUR EMAIL. YOUR HEAD START.
              </div>

              {submitted ? (
                <div className="p-4 bg-black text-[#d4ff00] font-mono text-xs font-bold uppercase flex items-center gap-2">
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>YOU'RE ON THE INSIDE TRACK. INVITATION DISPATCHED.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative border-b-2 border-black pb-2">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent text-black placeholder:text-black/60 text-sm sm:text-base font-mono font-bold focus:outline-none pr-8"
                    />
                    <ArrowUpRight className="w-5 h-5 absolute right-0 top-1 text-black stroke-[2.5]" />
                  </div>

                  <label className="flex items-start gap-2 cursor-pointer select-none text-[11px] font-mono text-black/80">
                    <input
                      type="checkbox"
                      required
                      defaultChecked
                      className="mt-0.5 rounded-none border-black text-black focus:ring-0"
                    />
                    <span>
                      I want early access and OMNICART drop updates. Zero spam guarantee.
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="w-full py-4 bg-black hover:bg-neutral-900 text-white font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md rounded-none"
                  >
                    <span>GET EARLY ACCESS</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[3] text-[#d4ff00]" />
                  </button>

                  <p className="text-[10px] font-mono tracking-widest text-black/70 uppercase">
                    NO SPAM. JUST PRODUCTION CODE WORTH OPENING YOUR INBOX FOR.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3 SNKS Value Props Strip (Adaptive in Light/Dark) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 bg-neutral-50 dark:bg-black transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-mono">
          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-[#7d9900] dark:text-[#d4ff00] shrink-0 mt-0.5 stroke-[2.5]" />
            <div>
              <div className="font-black uppercase tracking-wider text-black dark:text-white text-sm">
                FREE DELIVERY
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 mt-1 uppercase text-[11px] leading-relaxed">
                Automated private repo invitations and S3 bundles. Every sale order.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#7d9900] dark:text-[#d4ff00] shrink-0 mt-0.5 stroke-[2.5]" />
            <div>
              <div className="font-black uppercase tracking-wider text-black dark:text-white text-sm">
                SECURE CHECKOUT
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 mt-1 uppercase text-[11px] leading-relaxed">
                Ed25519 cryptographic signatures on all digital tokens. Protected.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Box className="w-5 h-5 text-[#7d9900] dark:text-[#d4ff00] shrink-0 mt-0.5 stroke-[2.5]" />
            <div>
              <div className="font-black uppercase tracking-wider text-black dark:text-white text-sm">
                FRESH OUT OF THE BOX
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 mt-1 uppercase text-[11px] leading-relaxed">
                Docker Compose & Terraform verified. Ready for your deployment rotation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

