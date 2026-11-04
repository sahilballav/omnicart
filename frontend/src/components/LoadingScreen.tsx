import React, { useState, useEffect } from 'react';
import { Layers, Server, Cpu, Database, Zap, CheckCircle2 } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const BOOT_STEPS = [
  { text: 'Initializing Cloud-Native Edge Gateway & TLS Handshake...', icon: Server },
  { text: 'Establishing Redis Session Cluster (Port 6379)...', icon: Zap },
  { text: 'Connecting Apache Kafka KRaft Event Bus & Schema Registry...', icon: Cpu },
  { text: 'Hydrating PostgreSQL JSONB Digital Asset Catalog & GIN Indices...', icon: Database },
  { text: 'OmniCart Distributed Architecture Ready!', icon: CheckCircle2 }
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

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(onComplete, 350);
          }, 200);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 6;
        const clamped = Math.min(prev + step, 100);

        if (clamped < 25) setCurrentStepIndex(0);
        else if (clamped < 50) setCurrentStepIndex(1);
        else if (clamped < 75) setCurrentStepIndex(2);
        else if (clamped < 95) setCurrentStepIndex(3);
        else setCurrentStepIndex(4);

        return clamped;
      });
    }, 65);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(onComplete, 250);
  };

  const CurrentIcon = BOOT_STEPS[currentStepIndex].icon;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white select-none transition-opacity duration-300 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Subtle Blueprint Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 text-xs text-slate-400 hover:text-white font-mono px-3 py-1.5 rounded-md border border-slate-800 hover:border-slate-700 bg-slate-900/80 transition-colors"
      >
        Skip Boot [ESC] →
      </button>

      <div className="relative flex flex-col items-center text-center px-4 max-w-md w-full">
        {/* Central Terminal Icon */}
        <div className="w-16 h-16 rounded-xl bg-slate-900 border border-blue-500/30 flex items-center justify-center mb-6 shadow-sm">
          <Layers className="w-8 h-8 text-blue-500" />
        </div>

        {/* Brand & Subtitle */}
        <div className="space-y-1 mb-6">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-white">OmniCart</h1>
            <span className="text-[10px] font-mono text-blue-400 border border-blue-500/30 px-1.5 py-0.5 rounded bg-blue-950/40">
              v1.0.0
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Cloud-Native Distributed Asset Engine
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full bg-slate-900 rounded-sm h-1.5 border border-slate-800 p-0.5 mb-4 overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-100 rounded-xs"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status Text & Percentage */}
        <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400 mb-6">
          <div className="flex items-center gap-2 truncate pr-2">
            <CurrentIcon className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span className="text-[11px] truncate text-slate-300">
              {BOOT_STEPS[currentStepIndex].text}
            </span>
          </div>
          <span className="font-semibold text-blue-400 shrink-0">{progress}%</span>
        </div>

        {/* Architecture Checklist Badges */}
        <div className="grid grid-cols-4 gap-2 w-full pt-4 border-t border-slate-800/80">
          <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono">POSTGRES</span>
            <span
              className={`w-1.5 h-1.5 rounded-xs ${
                progress >= 75 ? 'bg-emerald-400' : 'bg-slate-700'
              }`}
            />
          </div>
          <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono">REDIS</span>
            <span
              className={`w-1.5 h-1.5 rounded-xs ${
                progress >= 30 ? 'bg-emerald-400' : 'bg-slate-700'
              }`}
            />
          </div>
          <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono">KAFKA</span>
            <span
              className={`w-1.5 h-1.5 rounded-xs ${
                progress >= 55 ? 'bg-emerald-400' : 'bg-slate-700'
              }`}
            />
          </div>
          <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] text-slate-400 font-mono">SPRING 21</span>
            <span
              className={`w-1.5 h-1.5 rounded-xs ${
                progress >= 95 ? 'bg-emerald-400' : 'bg-slate-700'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
