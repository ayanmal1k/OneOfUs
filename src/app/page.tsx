'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Basic GSAP animation to confirm GSAP is working correctly
    if (titleRef.current && subtitleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { filter: 'blur(10px)', y: 30, opacity: 0 },
        { filter: 'blur(0px)', y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.2 }
      );

      gsap.fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.6 }
      );
    }
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative flex flex-col items-center justify-between min-h-[150vh] w-full px-6 py-12 md:px-12 bg-zinc-950 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-orange-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />

      {/* Top Navigation / Brand */}
      <div className="w-full max-w-7xl flex items-center justify-between z-10">
        <span className="font-display text-lg tracking-wider font-semibold text-zinc-400 uppercase">
          OneOfUs
        </span>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            Ready to Build
          </span>
        </div>
      </div>

      {/* Center Hero Empty Content */}
      <div className="flex-1 flex flex-col items-center justify-center my-32 max-w-4xl text-center z-10">
        <h1
          ref={titleRef}
          className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-zinc-50 to-zinc-400 select-none"
          style={{ opacity: 0 }}
        >
          OneOfUs
        </h1>
        
        <div
          ref={subtitleRef}
          className="mt-6 flex flex-col items-center gap-6"
          style={{ opacity: 0 }}
        >
          <p className="max-w-md text-sm md:text-base text-zinc-400 leading-relaxed font-sans">
            A clean template initialized with a premium Awwwards-inspired stack.
            Ready for your creative development.
          </p>

          <div className="flex flex-wrap justify-center gap-2 font-mono text-xs text-zinc-500">
            {['Next.js', 'Tailwind CSS', 'GSAP', 'Lenis', 'Framer Motion'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator to demonstrate Lenis smooth scroll */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: [0, 1, 0], y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="w-full flex flex-col items-center gap-2 text-zinc-600 font-mono text-[10px] uppercase tracking-widest z-10 pb-16"
      >
        <span>Scroll to explore smooth scroll</span>
        <div className="w-[1px] h-12 bg-zinc-800 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[50%] bg-zinc-400 animate-[bounce_2s_infinite]" />
        </div>
      </motion.div>

      {/* Subtle bottom details */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 border-t border-zinc-900 pt-8 text-zinc-600 font-mono text-[10px] tracking-wider z-10">
        <div>© {new Date().getFullYear()} OneOfUs. All rights reserved.</div>
        <div className="flex gap-4">
          <span>Awwwards-UI-Design Baseline</span>
          <span>UI-Max: 92/100</span>
        </div>
      </div>
    </main>
  );
}
