import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigatePrivacy: () => void;
  onNavigateTerms: () => void;
  onScrollToCatalog: () => void;
  onScrollToDrops: () => void;
  onScrollToEarlyAccess: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigatePrivacy,
  onNavigateTerms,
  onScrollToCatalog,
  onScrollToDrops,
  onScrollToEarlyAccess
}) => {
  return (
    <footer className="w-full bg-neutral-100/75 dark:bg-black/75 backdrop-blur-md text-black dark:text-white border-t border-neutral-200 dark:border-[#222222] pt-16 sm:pt-20 pb-12 font-mono transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Column 1: Brand & Attitude Tagline */}
          <div className="md:col-span-5 space-y-3">
            <div className="text-3xl sm:text-4xl font-black italic tracking-tighter uppercase text-black dark:text-white flex items-baseline gap-1">
              <span>OMNICART</span>
              <span className="text-xs font-bold text-[#7d9900] dark:text-[#d4ff00]">®</span>
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 space-y-0.5">
              <p>FOR THE ROTATION.</p>
              <p>NOT THE ORDINARY.</p>
            </div>
          </div>

          {/* Column 2: Explore Navigation */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              EXPLORE
            </div>
            <ul className="text-xs space-y-2 text-neutral-700 dark:text-neutral-300">
              <li>
                <button
                  onClick={onScrollToCatalog}
                  className="hover:text-black dark:hover:text-[#d4ff00] transition-colors flex items-center gap-1 uppercase"
                >
                  <span>Shop all deals</span>
                  <ArrowUpRight className="w-3 h-3 text-[#7d9900] dark:text-[#d4ff00]" />
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToDrops}
                  className="hover:text-black dark:hover:text-[#d4ff00] transition-colors flex items-center gap-1 uppercase"
                >
                  <span>Limited drops</span>
                  <ArrowUpRight className="w-3 h-3 text-[#7d9900] dark:text-[#d4ff00]" />
                </button>
              </li>
              <li>
                <button
                  onClick={onScrollToEarlyAccess}
                  className="hover:text-black dark:hover:text-[#d4ff00] transition-colors flex items-center gap-1 uppercase"
                >
                  <span>Join the list</span>
                  <ArrowUpRight className="w-3 h-3 text-[#7d9900] dark:text-[#d4ff00]" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: The Details / Legal */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-neutral-500">
              THE DETAILS
            </div>
            <ul className="text-xs space-y-2 text-neutral-700 dark:text-neutral-300">
              <li>
                <button
                  onClick={onNavigatePrivacy}
                  className="hover:text-black dark:hover:text-[#d4ff00] transition-colors uppercase"
                >
                  Privacy policy
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateTerms}
                  className="hover:text-black dark:hover:text-[#d4ff00] transition-colors uppercase"
                >
                  Terms of service
                </button>
              </li>
              <li className="text-neutral-500 uppercase text-[11px]">
                Ed25519 PKI Sealed
              </li>
            </ul>
          </div>

          {/* Column 4: Closing Right Eyebrow */}
          <div className="md:col-span-3 text-left md:text-right space-y-1">
            <div className="flex items-center md:justify-end gap-1.5 text-xs font-bold text-[#7d9900] dark:text-[#d4ff00] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#7d9900] dark:bg-[#d4ff00]" />
              <span>THE NEXT STACK IS OUT THERE.</span>
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-black dark:text-white">
              GO BUILD YOURS.
            </p>
          </div>
        </div>

        {/* Bottom Legal Copyright */}
        <div className="pt-8 border-t border-neutral-200 dark:border-[#1c1c1c] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 uppercase">
          <p>© 2026 OMNICART. ZERO THIRD-PARTY TRACKERS. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-4">
            <span className="text-[#7d9900] dark:text-[#d4ff00]">DOMAIN: OMNICART.IO</span>
            <span>PRODUCTION TARGET: AWS EKS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

