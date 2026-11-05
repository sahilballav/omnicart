import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export const BackgroundMotionVideo: React.FC = () => {
  const { isDark } = useTheme();
  const darkVideoRef = useRef<HTMLVideoElement>(null);
  const lightVideoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY || window.pageYOffset;
          const maxScroll = Math.max(
            1,
            document.documentElement.scrollHeight - window.innerHeight
          );
          const progress = Math.min(1, Math.max(0, y / maxScroll));

          setScrollY(y);
          setScrollProgress(progress);

          // Dynamic scroll-scrub adjustment:
          // Slightly accelerate playback speed when user is scrolling downward
          const activeVideo = isDark ? darkVideoRef.current : lightVideoRef.current;
          if (activeVideo && activeVideo.duration) {
            // Scrub motion: smooth time drift tied to scroll position + loop
            const targetTime = (progress * (activeVideo.duration * 2)) % activeVideo.duration;
            if (Math.abs(activeVideo.currentTime - targetTime) > 1.5) {
              activeVideo.currentTime = targetTime;
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDark]);

  // Parallax transform calculation:
  // Parallax translation: subtle vertical shift + subtle scale zoom as you scroll down
  const translateY = -(scrollY * 0.18);
  const scale = 1 + scrollProgress * 0.12;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0"
    >
      {/* Motion Video Wrapper with Hardware-Accelerated Parallax */}
      <div
        className="absolute -top-[10%] -left-[5%] w-[110%] h-[120%] transition-transform duration-100 ease-out will-change-transform"
        style={{
          transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`
        }}
      >
        {/* Dark Mode Video Asset */}
        <video
          ref={darkVideoRef}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isDark ? 'opacity-35' : 'opacity-0'
          }`}
        >
          <source src="/assets/videos/dark-motion.mp4" type="video/mp4" />
        </video>

        {/* Light Mode Video Asset */}
        <video
          ref={lightVideoRef}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            !isDark ? 'opacity-30' : 'opacity-0'
          }`}
        >
          <source src="/assets/videos/light-motion.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Atmospheric Overlays to Protect Typography & High-Voltage Accents */}
      {/* 1. Base theme tint mask */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          isDark
            ? 'bg-black/65 backdrop-contrast-125'
            : 'bg-white/70 backdrop-contrast-105'
        }`}
      />

      {/* 2. Brutalist CRT Scanline / Dot Grid Overlay for authentic street/tech feel */}
      <div
        className={`absolute inset-0 pointer-events-none opacity-25 ${
          isDark
            ? 'bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px]'
            : 'bg-[linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:100%_4px]'
        }`}
      />

      {/* 3. Subtle Vignette Depth Gradient */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          isDark
            ? 'bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]'
            : 'bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,255,255,0.6)_100%)]'
        }`}
      />
    </div>
  );
};
