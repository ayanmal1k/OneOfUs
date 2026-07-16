'use client';

import { ReactLenis } from 'lenis/react';
import { useEffect, useState } from 'react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [options, setOptions] = useState<{ duration?: number; lerp?: number; smoothWheel?: boolean }>({});

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    setOptions({
      duration: 1.2,
      lerp: 0.1,
      smoothWheel: !prefersReducedMotion,
    });
  }, []);

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
}
