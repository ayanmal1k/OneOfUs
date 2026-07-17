'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);

  // Scroll-based parallax for background and elements
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 150]);
  const stampY = useTransform(scrollY, [0, 800], [0, -50]);
  const stampRotate = useTransform(scrollY, [0, 800], [-12, 15]);

  useEffect(() => {
    // Staggered GSAP entry animations for maximum impact
    const ctx = gsap.context(() => {
      // 1. Fade and slide in text container
      gsap.fromTo(
        headingRef.current,
        { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)', y: 40 },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          y: 0,
          duration: 1.4,
          ease: 'power4.out',
          delay: 0.2,
        }
      );

      // 2. Fade in description and smaller text
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.6,
        }
      );

      // 3. Stamp "Slam Down" animation
      if (stampRef.current) {
        gsap.fromTo(
          stampRef.current,
          {
            scale: 4,
            opacity: 0,
            rotation: -45,
            x: 100,
            y: -100,
          },
          {
            scale: 1,
            opacity: 1,
            rotation: -12,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: 'back.out(1.5)',
            delay: 1.2,
            onComplete: () => {
              // Subtle impact shake on completion
              gsap.to(containerRef.current, {
                x: '+=3',
                y: '+=2',
                duration: 0.05,
                yoyo: true,
                repeat: 3,
                ease: 'power1.inOut',
              });
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={containerRef}
      className="relative min-h-[160vh] w-full bg-zinc-950 overflow-hidden"
    >
      {/* Background Images with Parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 h-screen w-full pointer-events-none">
        {/* Desktop Background */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src="/hero-bg.png"
            alt="OneOfUs Hero Background"
            fill
            priority
            quality={100}
            className="object-cover object-center select-none"
          />
        </div>

        {/* Mobile Background */}
        <div className="block md:hidden absolute inset-0">
          <Image
            src="/hero-bg-mobile.png"
            alt="OneOfUs Hero Background Mobile"
            fill
            priority
            quality={100}
            className="object-cover object-center select-none"
          />
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-7xl mx-auto min-h-screen flex flex-col justify-between px-6 py-10 md:px-12 md:py-12">
        
        {/* Top Header/Nav */}
        <div className="w-full flex items-center justify-between">
          <span className="font-display text-3xl tracking-widest font-black text-[#F5C400] select-none">
            $ONE
          </span>
          <motion.a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-[#F5C400]/30 bg-zinc-900/60 backdrop-blur-md transition-all text-[#F5C400] hover:bg-[#F5C400] hover:text-zinc-950 hover:border-[#F5C400]"
            aria-label="Follow on X (Twitter)"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </motion.a>
        </div>

        {/* Hero Copy (Full-width) */}
        <div className="flex-1 flex flex-col justify-center w-full max-w-none mt-8 md:mt-16 pl-2 sm:pl-6 md:pl-10 lg:pl-14">
          {/* Big Uppercase Headings - Slightly Smaller with Letter Spacing */}
          <div ref={headingRef} className="flex flex-col gap-0 select-none pt-4 pb-2">
            <h1 className="font-display text-6xl sm:text-7xl md:text-[8rem] lg:text-[10rem] leading-[0.9] tracking-[0.06em] text-[#F5C400] font-black drop-shadow-md">
              ONE OF US
            </h1>
            <h2 className="font-display text-6xl sm:text-7xl md:text-[8rem] lg:text-[10rem] leading-[0.9] tracking-[0.06em] text-white font-black drop-shadow-md">
              $ONE
            </h2>
          </div>

          {/* Description & Smaller text info - More Compact Spacing & Font Sizes */}
          <div ref={infoRef} className="flex flex-col items-start mt-6 md:mt-8 gap-4">
            <div className="flex flex-col text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              <span className="text-white">High risks. Big laughs.</span>
              <span className="text-white">
                You belong <span className="text-[#F5C400]">here.</span>
              </span>
            </div>

            {/* Interactive Stamp - Draggable and Magnetic Scroll Parallax (Bigger Stamp Size) */}
            <motion.div
              ref={stampRef}
              style={{ y: stampY, rotate: stampRotate, opacity: 0 }}
              drag
              dragConstraints={{ left: -50, right: 300, top: -100, bottom: 200 }}
              whileDrag={{ scale: 1.15, cursor: 'grabbing' }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="mt-6 md:mt-8 cursor-grab active:cursor-grabbing relative select-none w-64 sm:w-80 md:w-96 lg:w-[28rem] h-auto"
            >
              <Image
                src="/stamp.png"
                alt="OneOfUs Official Stamp"
                width={500}
                height={190}
                className="pointer-events-none drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] w-full h-auto"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* History/Origin Section ("Where It All Began") */}
      <section className="relative w-full bg-[#F5C400] text-zinc-950 overflow-hidden py-16 md:py-20 flex items-center min-h-[360px] md:min-h-[460px] border-t border-zinc-900/10">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Story Text */}
          <div className="md:col-span-7 lg:col-span-6 flex flex-col items-start text-left max-w-xl z-10">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-[0.05em] text-zinc-950 mb-4 select-none uppercase">
              WHERE IT ALL BEGAN
            </h2>
            <p className="font-sans text-sm sm:text-base md:text-lg font-bold leading-relaxed text-zinc-900 pr-4">
              &ldquo;One of us! One of us!&rdquo; comes from the 1932 film Freaks, where a group chants the phrase. Internet culture adopted it as a way to welcome someone into the club.
            </p>
          </div>

          {/* Right side spacer to keep space for absolute graphic on desktop */}
          <div className="hidden md:block md:col-span-5 lg:col-span-6 h-[100px] md:h-[200px]" />
        </div>

        {/* Absolute positioned crowd silhouettes (which contains the speech bubble already) */}
        <div className="absolute bottom-0 right-0 w-[95%] sm:w-[75%] md:w-[60%] lg:w-[48%] h-[115%] sm:h-[125%] md:h-[135%] select-none z-0 pointer-events-none">
          <Image
            src="/people-drk.png"
            alt="FREAKS silhouettes crowd"
            fill
            priority
            className="object-contain object-right-bottom select-none"
          />
        </div>
      </section>

      {/* Why It's So Popular Section */}
      <section className="relative w-full bg-black py-24 md:py-32 flex flex-col justify-center items-center overflow-hidden border-t border-zinc-900/50">
        {/* Subtle ambient glows for Awwwards layout */}
        <div className="absolute top-[30%] left-[5%] w-[40%] h-[40%] rounded-full bg-yellow-500/5 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[5%] w-[40%] h-[40%] rounded-full bg-orange-500/5 blur-[130px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
          {/* Header Title with underline animation */}
          <div className="relative inline-block mb-20 md:mb-28 text-center">
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.06em] text-white select-none uppercase leading-none">
              WHY IT&apos;S SO <span className="text-[#F5C400]">POPULAR</span>
            </h2>
            {/* Draw-in yellow stroke underline */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "100%", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              className="absolute bottom-[-22px] right-[-2%] w-[58%] h-8 overflow-hidden select-none pointer-events-none"
            >
              <Image
                src="/yellow-stroke.png"
                alt="Yellow accent stroke"
                width={500}
                height={32}
                className="object-contain w-full h-full object-right"
              />
            </motion.div>
          </div>

          {/* Staggered Cards Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            className="w-full grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-b border-[#F5C400]/10 md:border-b-0 md:border-t-0"
          >
            {[
              {
                icon: "/icon-smile.png",
                text1: "Self-deprecating",
                text2: "humor",
              },
              {
                icon: "/icon-handshake.png",
                text1: "We laugh together",
                text2: "at the chaos",
              },
              {
                icon: "/icon-rocket.png",
                text1: "Big wins. Big losses.",
                text2: "All part of the ride.",
              },
            ].map((col, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 100, damping: 18 },
                  },
                }}
                whileHover="hover"
                className="flex flex-col items-center text-center gap-6 px-6 py-12 md:px-10 md:py-16 border-b border-[#F5C400]/15 md:border-b-0 md:border-r border-[#F5C400]/15 last:border-r-0 md:last:border-b-0"
              >
                {/* Floating Icon wrapper */}
                <motion.div
                  variants={{
                    hover: {
                      y: -10,
                      scale: 1.08,
                      rotate: index === 2 ? 8 : index === 0 ? -8 : 0,
                      transition: { type: "spring", stiffness: 350, damping: 10 },
                    },
                  }}
                  className="w-24 h-24 sm:w-28 sm:h-28 relative select-none cursor-pointer"
                >
                  <Image
                    src={col.icon}
                    alt={col.text1}
                    fill
                    className="object-contain animate-[float_4s_infinite_ease-in-out]"
                    style={{ animationDelay: `${index * 0.5}s` }}
                  />
                </motion.div>

                {/* Typography block */}
                <div className="flex flex-col text-lg sm:text-xl md:text-2xl font-black tracking-tight leading-snug text-white font-sans max-w-[280px]">
                  <span>{col.text1}</span>
                  <span className="text-[#F5C400] mt-0.5">{col.text2}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
