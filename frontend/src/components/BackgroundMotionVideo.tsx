import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export const BackgroundMotionVideo: React.FC = () => {
  const { isDark } = useTheme();
  const darkVideoRef = useRef<HTMLVideoElement>(null);
  const lightVideoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Dynamic scroll listener with animation frame throttling
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

          // Video scroll scrub sync
          const activeVideo = isDark ? darkVideoRef.current : lightVideoRef.current;
          if (activeVideo && activeVideo.duration) {
            const targetTime = (progress * (activeVideo.duration * 1.5)) % activeVideo.duration;
            if (Math.abs(activeVideo.currentTime - targetTime) > 2) {
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

  // Generative Cybernetic Particle Grid on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes for ambient tech constellation
    const count = 35;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
      baseAlpha: Math.random() * 0.4 + 0.2
    }));

    let step = 0;

    const render = () => {
      step += 0.008;
      ctx.clearRect(0, 0, width, height);

      const color = isDark ? '212, 255, 0' : '85, 105, 0'; // Volt yellow in RGB

      // Draw faint parallax grid lines
      ctx.lineWidth = 0.5;
      const gridOffset = (scrollY * 0.1) % 40;
      ctx.strokeStyle = isDark
        ? 'rgba(255, 255, 255, 0.02)'
        : 'rgba(0, 0, 0, 0.025)';

      ctx.beginPath();
      for (let x = 0; x < width; x += 60) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = gridOffset; y < height; y += 40) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Render ambient nodes & micro-vectors
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy - scrollProgress * 0.2; // subtle scroll drift

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle dot
        ctx.fillStyle = `rgba(${color}, ${p.baseAlpha * (isDark ? 0.35 : 0.25)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (1 - dist / 120) * (isDark ? 0.08 : 0.05);
            ctx.strokeStyle = `rgba(${color}, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark, scrollY, scrollProgress]);

  // Subtle Parallax translation + scale zoom strictly in background
  const translateY = -(scrollY * 0.12);
  const scale = 1 + scrollProgress * 0.08;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none select-none overflow-hidden -z-10 bg-white dark:bg-black transition-colors duration-500"
    >
      {/* Motion Video Parallax Layer */}
      <div
        className="absolute -top-[5%] -left-[5%] w-[110%] h-[115%] transition-transform duration-100 ease-out will-change-transform"
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
            isDark ? 'opacity-20' : 'opacity-0'
          }`}
        >
          <source src="/assets/videos/tech-flow.mp4" type="video/mp4" />
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
            !isDark ? 'opacity-15' : 'opacity-0'
          }`}
        >
          <source src="/assets/videos/light-motion.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Atmospheric Contrast Tint Mask to Guarantee 100% Text Legibility */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          isDark
            ? 'bg-black/85'
            : 'bg-white/88'
        }`}
      />

      {/* Real-time Generative Tech Constellation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* CRT Scanline Structure */}
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
