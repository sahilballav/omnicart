import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export const BackgroundMotionVideo: React.FC = () => {
  const { isDark } = useTheme();
  const darkVideoRef = useRef<HTMLVideoElement>(null);
  const lightVideoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Guarantee video playback and bypass browser autoplay restrictions
  useEffect(() => {
    const playVideo = (video: HTMLVideoElement | null) => {
      if (!video) return;
      video.muted = true;
      video.playsInline = true;
      video.playbackRate = 0.95;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Background video autoplay initial block, retrying on first interaction:', err);
        });
      }
    };

    if (isDark) {
      playVideo(darkVideoRef.current);
    } else {
      playVideo(lightVideoRef.current);
    }

    // Fallback: unlock playback on first user scroll or click
    const handleFirstInteraction = () => {
      playVideo(isDark ? darkVideoRef.current : lightVideoRef.current);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('scroll', handleFirstInteraction, { passive: true, once: true });
    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true, once: true });

    return () => {
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isDark]);

  // Dynamic scroll-scrub listener: scrubs and accelerates motion as user scrolls down
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

          // Dynamic video scrubbing tied to scroll position
          const activeVideo = isDark ? darkVideoRef.current : lightVideoRef.current;
          if (activeVideo && activeVideo.duration) {
            const targetTime = (progress * (activeVideo.duration * 1.5)) % activeVideo.duration;
            if (Math.abs(activeVideo.currentTime - targetTime) > 1.2) {
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

  // Parallax translation: subtle vertical shift + scale zoom on scroll
  const translateY = -(scrollY * 0.15);
  const scale = 1 + scrollProgress * 0.1;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0 bg-neutral-100 dark:bg-black transition-colors duration-500"
    >
      {/* Motion Video Parallax Viewport */}
      <div
        className="absolute -top-[8%] -left-[5%] w-[110%] h-[120%] transition-transform duration-100 ease-out will-change-transform"
        style={{
          transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`
        }}
      >
        {/* Dark Mode Video Asset: Nocturnal Cybernetic Tech Flow */}
        <video
          ref={darkVideoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isDark ? 'opacity-70' : 'opacity-0 pointer-events-none'
          }`}
        >
          <source src="/assets/videos/tech-flow.mp4" type="video/mp4" />
          <source src="/assets/videos/dark-motion.mp4" type="video/mp4" />
        </video>

        {/* Light Mode Video Asset: Clean Architectural Geometric Daylight Motion */}
        <video
          ref={lightVideoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            !isDark ? 'opacity-65' : 'opacity-0 pointer-events-none'
          }`}
        >
          <source src="/assets/videos/light-motion.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Atmospheric Contrast Tint: Balances Video Vibrancy with Foreground Contrast */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          isDark
            ? 'bg-black/45 backdrop-contrast-110'
            : 'bg-white/45 backdrop-contrast-105'
        }`}
      />

      {/* Ambient Radial Vignette */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          isDark
            ? 'bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.65)_100%)]'
            : 'bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,255,255,0.6)_100%)]'
        }`}
      />

      {/* Subtle Scanline Texture for Authentic Street/Tech Engineering Character */}
      <div
        className={`absolute inset-0 pointer-events-none opacity-20 ${
          isDark
            ? 'bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px]'
            : 'bg-[linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:100%_4px]'
        }`}
      />
    </div>
  );
};
