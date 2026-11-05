import React, { useState, useEffect } from 'react';
import { Layers, Server, Cpu, Database, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const BOOT_STEPS = [
  { text: 'INITIALIZING CLOUD-NATIVE EDGE GATEWAY & TLS...', icon: Server, target: 20 },
  { text: 'ESTABLISHING REDIS SESSION CLUSTER (PORT 6379)...', icon: Zap, target: 45 },
  { text: 'CONNECTING APACHE KAFKA KRAFT EVENT BUS & SCHEMA...', icon: Cpu, target: 70 },
  { text: 'HYDRATING POSTGRESQL JSONB CATALOG & GIN INDICES...', icon: Database, target: 92 },
  { text: 'OMNICART DISTRIBUTED ARCHITECTURE READY.', icon: CheckCircle2, target: 100 }
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFadingOut(true);
        setTimeout(onComplete, 250);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Smooth, deliberate boot rhythm: ~1.8 seconds total
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(onComplete, 300);
          }, 300);
          return 100;
        }

        const step = Math.floor(Math.random() * 3) + 2; // +2 to +4 per tick
        const next = Math.min(prev + step, 100);

        if (next < 25) setCurrentStepIndex(0);
        else if (next < 50) setCurrentStepIndex(1);
        else if (next < 75) setCurrentStepIndex(2);
        else if (next < 95) setCurrentStepIndex(3);
        else setCurrentStepIndex(4);

        return next;
      });
    }, 45);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(onComplete, 200);
  };

  const CurrentIcon = BOOT_STEPS[currentStepIndex].icon;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white select-none transition-opacity duration-300 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Subtle Terminal Scanline Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141414_1px,transparent_1px),linear-gradient(to_bottom,#141414_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      {/* Top Status & Skip Button */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2 text-neutral-500 text-[11px] tracking-wider uppercase">
          <span className="w-2 h-2 rounded-full bg-[#d4ff00] animate-pulse" />
          <span>SYSTEM_BOOT // KERNEL v1.0.0</span>
        </div>

        <button
          onClick={handleSkip}
          className="text-[11px] font-mono text-neutral-400 hover:text-black hover:bg-[#d4ff00] px-3 py-1.5 border border-[#333333] hover:border-[#d4ff00] transition-colors flex items-center gap-1.5 uppercase font-bold"
        >
          <span>SKIP BOOT [ESC]</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="relative flex flex-col items-center text-center px-4 max-w-md w-full z-10">
        {/* Central Terminal Icon */}
        <div className="w-16 h-16 bg-[#0a0a0a] border border-[#262626] flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(212,255,0,0.12)]">
          <Layers className="w-8 h-8 text-[#d4ff00]" />
        </div>

        {/* Brand Display & Subtitle */}
        <div className="space-y-1 mb-8">
          <div className="flex items-baseline justify-center gap-1">
            <h1 className="text-3xl font-black italic tracking-tighter uppercase text-white">
              OMNICART
            </h1>
            <span className="text-sm font-bold text-[#d4ff00]">®</span>
          </div>
          <p className="text-[11px] text-neutral-400 font-mono tracking-wider uppercase">
            CLOUD-NATIVE DISTRIBUTED ASSET ENGINE
          </p>
        </div>

        {/* Brutalist Progress Bar */}
        <div className="w-full bg-[#111111] h-2 border border-[#262626] p-0.5 mb-3 overflow-hidden">
          <div
            className="h-full bg-[#d4ff00] shadow-[0_0_10px_rgba(212,255,0,0.6)] transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step Indicator & Percentage */}
        <div className="w-full flex items-center justify-between text-xs font-mono mb-8">
          <div className="flex items-center gap-2 truncate pr-2 text-left">
            <CurrentIcon className="w-3.5 h-3.5 text-[#d4ff00] shrink-0" />
            <span className="text-[10px] sm:text-[11px] truncate text-neutral-300 font-bold tracking-tight">
              {BOOT_STEPS[currentStepIndex].text}
            </span>
          </div>
          <span className="font-black text-[#d4ff00] shrink-0 text-sm">
            {progress}%
          </span>
        </div>

        {/* Architecture Checklist Badges */}
        <div className="grid grid-cols-4 gap-2 w-full pt-4 border-t border-[#222222]">
          {[
            { label: 'POSTGRES', threshold: 25 },
            { label: 'REDIS', threshold: 50 },
            { label: 'KAFKA', threshold: 75 },
            { label: 'SPRING 21', threshold: 95 }
          ].map((item) => {
            const isReady = progress >= item.threshold;
            return (
              <div
                key={item.label}
                className={`flex flex-col items-center gap-1.5 p-2 bg-[#080808] border transition-colors ${
                  isReady ? 'border-[#333333]' : 'border-[#1a1a1a]'
                }`}
              >
                <span className={`text-[10px] font-mono font-bold tracking-wider ${
                  isReady ? 'text-white' : 'text-neutral-600'
                }`}>
                  {item.label}
                </span>
                <span
                  className={`w-1.5 h-1.5 transition-colors ${
                    isReady
                      ? 'bg-[#d4ff00] shadow-[0_0_6px_#d4ff00]'
                      : 'bg-neutral-800'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="absolute bottom-6 text-[10px] font-mono text-neutral-600 uppercase tracking-widest select-none">
        OMNICART HIGH-AVAILABILITY CLUSTER // GRAALVM NATIVE
      </div>
    </div>
  );
};
