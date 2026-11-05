import React from 'react';
import { Truck, ArrowUpRight } from 'lucide-react';

interface TopAnnouncementBarProps {
  onEarlyAccessClick?: () => void;
}

export const TopAnnouncementBar: React.FC<TopAnnouncementBarProps> = ({ onEarlyAccessClick }) => {
  return (
    <div className="w-full bg-[#d4ff00] text-black border-b border-black font-mono text-[11px] font-bold uppercase tracking-wider py-1.5 px-4 sm:px-6 select-none transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Notice */}
        <div className="flex items-center gap-2 truncate">
          <Truck className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />
          <span className="truncate">FREE ED25519 TOKEN DELIVERY. EVERY ORDER.</span>
        </div>

        {/* Center Banner */}
        <div className="hidden md:flex items-center gap-2 font-mono text-[11px] tracking-widest font-black">
          <span>BLACK FRIDAY // CYBER ARCHITECTURE SALE</span>
        </div>

        {/* Right CTA */}
        <button
          onClick={onEarlyAccessClick}
          className="flex items-center gap-1 hover:underline shrink-0 font-bold"
        >
          <span>GET EARLY ACCESS</span>
          <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};

