import React, { useState, useEffect } from 'react';
import { Layers, Server, Cpu, Database, Zap, CheckCircle2 } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const BOOT_STEPS = [
  { text: 'Bootstrapping Cloud-Native Edge Gateway...', icon: Server },
  { text: 'Establishing Redis Session Cluster (Port 6379)...', icon: Zap },
  { text: 'Connecting Apache Kafka Event Stream & Schema Registry...', icon: Cpu },
  { text: 'Hydrating PostgreSQL JSONB Digital Asset Catalogs...', icon: Database },
  { text: 'OmniCart Distributed Ecosystem Operational!', icon: CheckCircle2 }
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(onComplete, 650);
          }, 350);
          return 100;
        }
        // Increment progress smoothly
        const next = prev + Math.floor(Math.random() * 8) + 4;
        const clamped = Math.min(next, 100);

        // Update step based on percentage
        if (clamped < 25) setCurrentStepIndex(0);
        else if (clamped < 50) setCurrentStepIndex(1);
        else if (clamped < 75) setCurrentStepIndex(2);
        else if (clamped < 95) setCurrentStepIndex(3);
        else setCurrentStepIndex(4);

        return clamped;
      });
    }, 85);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(onComplete, 400);
  };

  const CurrentIcon = BOOT_STEPS[currentStepIndex].icon;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white select-none transition-all duration-700 ${
        isFadingOut ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Cyber Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-violet-600/15 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e1b4b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      {/* Skip button in header */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 text-xs text-slate-500 hover:text-slate-300 font-medium px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/60 backdrop-blur-sm transition-all"
      >
        Skip Loading →
      </button>

      <div className="relative flex flex-col items-center text-center px-4 max-w-md w-full">
        {/* Animated Central Emblem with Orbital Rings */}
        <div className="relative w-36 h-36 flex items-center justify-center mb-8">
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-indigo-500/40 animate-spin-slow" />

          {/* Inner Reverse Ring */}
          <div className="absolute inset-2.5 rounded-full border-t-2 border-b-2 border-cyan-400/60 animate-spin-reverse-slow" />

          {/* Glowing Orb Accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#38bdf8]" />

          {/* Core Logo Badge */}
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-violet-500 flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.5)] border border-indigo-400/40 animate-float">
            <Layers className="w-10 h-10 text-white drop-shadow-md" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1.5 mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Omni<span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Cart</span>
            <span className="text-xs uppercase ml-2 tracking-widest font-mono text-indigo-400 font-semibold border border-indigo-500/30 px-2 py-0.5 rounded-md bg-indigo-950/60">
              v1.0
            </span>
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Cloud-Native Multi-Platform Ecosystem
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full bg-slate-900/90 rounded-full h-2 border border-slate-800 p-0.5 mb-4 shadow-inner overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 transition-all duration-150 relative shadow-[0_0_15px_#6366f1]"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full shadow-[0_0_8px_#ffffff]" />
          </div>
        </div>

        {/* Status Text & Percentage */}
        <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400 mb-6">
          <div className="flex items-center gap-2 truncate pr-2">
            <CurrentIcon className="w-3.5 h-3.5 text-cyan-400 shrink-0 animate-spin-subtle" />
            <span className="text-[11px] truncate text-slate-300">
              {BOOT_STEPS[currentStepIndex].text}
            </span>
          </div>
          <span className="font-bold text-cyan-400 shrink-0">{progress}%</span>
        </div>

        {/* Architecture Checklist Pills */}
        <div className="grid grid-cols-4 gap-2 w-full pt-4 border-t border-slate-900">
          <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-[10px] text-slate-400 font-mono">POSTGRES</span>
            <span className={`w-1.5 h-1.5 rounded-full ${progress >= 75 ? 'bg-emerald-400 shadow-[0_0_6px_#34d399]' : 'bg-slate-700'}`} />
          </div>
          <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-[10px] text-slate-400 font-mono">REDIS</span>
            <span className={`w-1.5 h-1.5 rounded-full ${progress >= 30 ? 'bg-emerald-400 shadow-[0_0_6px_#34d399]' : 'bg-slate-700'}`} />
          </div>
          <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-[10px] text-slate-400 font-mono">KAFKA</span>
            <span className={`w-1.5 h-1.5 rounded-full ${progress >= 55 ? 'bg-emerald-400 shadow-[0_0_6px_#34d399]' : 'bg-slate-700'}`} />
          </div>
          <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <span className="text-[10px] text-slate-400 font-mono">SPRING 21</span>
            <span className={`w-1.5 h-1.5 rounded-full ${progress >= 95 ? 'bg-emerald-400 shadow-[0_0_6px_#34d399]' : 'bg-slate-700'}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

