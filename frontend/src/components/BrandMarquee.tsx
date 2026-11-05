import React from 'react';

const TECH_PARTNERS = [
  { name: 'AWS EKS', label: 'AWS EKS' },
  { name: 'APACHE KAFKA', label: 'KAFKA' },
  { name: 'SPRING BOOT 3', label: 'SPRING 21' },
  { name: 'POSTGRESQL', label: 'POSTGRESQL' },
  { name: 'REDIS CACHE', label: 'REDIS' },
  { name: 'TERRAFORM', label: 'TERRAFORM' },
  { name: 'DOCKER', label: 'DOCKER' },
  { name: 'OPENTELEMETRY', label: 'OTEL' }
];

export const BrandMarquee: React.FC = () => {
  return (
    <div className="w-full bg-black border-b border-[#222222] py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left Editorial Label */}
        <div className="shrink-0 text-left">
          <div className="text-[10px] font-mono tracking-widest text-[#d4ff00] uppercase font-bold">
            THE STACK.
          </div>
          <div className="text-sm font-black tracking-tight text-white uppercase">
            THE ARCHITECTURE.
          </div>
        </div>

        {/* Marquee Partner Logos */}
        <div className="flex-1 flex flex-wrap items-center justify-between gap-6 sm:gap-8 opacity-70 hover:opacity-100 transition-opacity">
          {TECH_PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="text-xs sm:text-sm font-mono font-black tracking-widest text-neutral-400 hover:text-[#d4ff00] transition-colors uppercase cursor-default select-none"
            >
              {partner.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
