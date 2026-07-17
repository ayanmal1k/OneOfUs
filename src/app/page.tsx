'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
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

  // Mouse-tracking 3D Parallax for the Pointing character
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const characterX = useTransform(springX, [-0.5, 0.5], [-25, 25]);
  const characterY = useTransform(springY, [-0.5, 0.5], [-25, 25]);
  const characterRotateX = useTransform(springY, [-0.5, 0.5], [12, -12]);
  const characterRotateY = useTransform(springX, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect) return;
    const width = rect.width;
    const height = rect.height;
    const mouseXVal = (e.clientX - rect.left) / width - 0.5;
    const mouseYVal = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(mouseXVal);
    mouseY.set(mouseYVal);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

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
      <section className="relative w-full bg-black py-8 sm:py-10 md:py-12 flex flex-col justify-center items-center overflow-hidden border-t border-zinc-900/50">
        {/* Subtle ambient glows for Awwwards layout */}
        <div className="absolute top-[30%] left-[5%] w-[40%] h-[40%] rounded-full bg-yellow-500/5 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[5%] w-[40%] h-[40%] rounded-full bg-orange-500/5 blur-[130px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
          {/* Header Title with underline animation */}
          <div className="relative inline-block mb-8 md:mb-12 text-center">
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

          {/* 2-Column Grid (Left: Features Row/Stack, Right: Risk Image) */}
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">

            {/* Left Column (col-span-8): Responsive grid (vertical on mobile, row on desktop) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
              className="md:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full md:border-r border-[#F5C400]/15 pb-8 md:pb-0 md:pr-10"
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
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { type: "spring", stiffness: 100, damping: 18 },
                    },
                  }}
                  whileHover="hover"
                  className="flex flex-row md:flex-col items-center text-left md:text-center gap-4 p-4 md:p-3 rounded-2xl bg-zinc-900/30 md:bg-transparent border border-zinc-900 md:border-transparent hover:border-[#F5C400]/10 hover:bg-[#F5C400]/5 transition-all duration-300"
                >
                  {/* Floating Icon wrapper */}
                  <motion.div
                    variants={{
                      hover: {
                        scale: 1.12,
                        rotate: index === 2 ? 8 : index === 0 ? -8 : 0,
                        transition: { type: "spring", stiffness: 350, damping: 10 },
                      },
                    }}
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 relative select-none cursor-pointer flex-shrink-0"
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
                  <div className="flex flex-col text-sm sm:text-base md:text-lg font-black tracking-tight leading-snug text-white font-sans text-left md:text-center mt-0 md:mt-2">
                    <span>{col.text1}</span>
                    <span className="text-[#F5C400] mt-0.5">{col.text2}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Right Column (col-span-5): Risk Stroke Graphic (Sized larger) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ type: "spring", stiffness: 80, damping: 16, delay: 0.3 }}
              className="md:col-span-5 relative w-full h-[160px] sm:h-[220px] md:h-[280px] lg:h-[320px] flex items-center justify-center select-none"
            >
              <Image
                src="/risk-stroke.png"
                alt="Risk stroke graphic"
                fill
                priority
                className="object-contain select-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* WallStreetBets Section ("What Does It Mean") */}
      <section
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full bg-[#F5C400] text-zinc-950 overflow-hidden py-16 md:py-24 flex items-center min-h-[500px] md:min-h-[600px] border-t border-zinc-900/10"
      >
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">

          {/* Left Column: Info Text and Bullet List */}
          <div className="md:col-span-7 lg:col-span-6 flex flex-col items-start text-left z-10">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-[0.05em] text-zinc-950 mb-6 select-none uppercase">
              WHAT DOES IT MEAN ON WALLSTREETBETS?
            </h2>

            {/* WSB Bullet List */}
            <div className="flex flex-col gap-3 font-sans text-sm sm:text-base md:text-lg font-bold text-zinc-900 mb-6">
              <p className="font-sans font-black text-zinc-950">If someone:</p>
              {[
                "Loses $250,000 on call options",
                "Accidentally buys the wrong leveraged position",
                "Cuts their portfolio in half in a single day",
                "Buys a stock at the absolute top just before it crashes"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#D92D20] flex items-center justify-center text-white text-[10px] font-black font-mono">
                    X
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* You'll see comments like: */}
            <div className="flex flex-col items-start gap-4 mb-6">
              <p className="font-sans font-black text-zinc-950 text-sm sm:text-base md:text-lg">You&apos;ll see comments like:</p>
              <div className="flex flex-wrap gap-4 items-center">
                {/* Black pill */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-zinc-950 text-white font-display text-2xl md:text-3xl px-6 py-2.5 rounded-xl border-2 border-zinc-950 rotate-[-2deg] select-none font-bold shadow-md cursor-pointer transition-transform"
                >
                  ONE OF US.
                </motion.div>

                {/* Red pill */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#D92D20] text-white font-display text-2xl md:text-3xl px-6 py-2.5 rounded-xl border-2 border-[#D92D20] rotate-[3deg] select-none font-bold shadow-md cursor-pointer transition-transform"
                >
                  ONE OF US!
                </motion.div>
              </div>
            </div>

            {/* Bottom tagline */}
            <p className="font-sans text-sm sm:text-base md:text-lg font-bold leading-relaxed text-zinc-900 pr-4">
              It&apos;s a hilarious welcome into the club of epic trading disasters.
            </p>
          </div>

          {/* Right Column: Character (pointing.png) with 3D Mouse Parallax */}
          <div
            style={{ perspective: 1000 }}
            className="md:col-span-5 lg:col-span-6 relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] w-full flex items-end"
          >
            <motion.div
              style={{
                x: characterX,
                y: characterY,
                rotateX: characterRotateX,
                rotateY: characterRotateY,
                transformStyle: "preserve-3d"
              }}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 80, damping: 16 }}
              className="absolute bottom-[-20px] right-0 w-full h-[95%] sm:h-[100%] md:h-[105%] select-none z-0 pointer-events-none"
            >
              <Image
                src="/pointing.png"
                alt="WallStreetBets Kid pointing"
                fill
                priority
                className="object-contain object-right-bottom select-none"
              />
            </motion.div>
          </div>

        </div>
      </section>

      {/* Become One of Us Section */}
      <section className="relative w-full bg-black py-20 md:py-28 flex flex-col justify-center items-center overflow-hidden border-t border-zinc-900/50">
        {/* Subtle ambient glows for Awwwards layout */}
        <div className="absolute top-[20%] right-[10%] w-[35%] h-[35%] rounded-full bg-yellow-500/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] left-[10%] w-[35%] h-[35%] rounded-full bg-[#D92D20]/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
          
          {/* Header Title with yellow stroke */}
          <div className="relative inline-block mb-16 md:mb-20 text-center">
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.06em] text-white select-none uppercase leading-none">
              BECOME <span className="text-[#F5C400]">ONE OF US</span>
            </h2>
            {/* Draw-in yellow stroke underline */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "100%", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              className="absolute bottom-[-22px] right-0 w-[65%] h-8 overflow-hidden select-none pointer-events-none"
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

          {/* 2-Column Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
            
            {/* Left Column: oneofus.png image (resized to balance text height) */}
            <div className="md:col-span-5 flex items-center justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 80, damping: 15 }}
                className="relative w-full max-w-[420px] lg:max-w-[460px] h-[320px] sm:h-[420px] md:h-[480px] lg:h-[520px] flex items-center justify-center"
              >
                <Image
                  src="/oneofus.png"
                  alt="One of Us Graphic"
                  fill
                  priority
                  className="object-contain select-none animate-[float_6s_infinite_ease-in-out]"
                />
              </motion.div>
            </div>

            {/* Right Column: Text and X follow button */}
            <div className="md:col-span-7 flex flex-col items-start text-left z-10">
              <h3 className="font-display text-4xl sm:text-5xl md:text-6xl font-black leading-[0.95] tracking-[0.05em] text-white mb-6 uppercase">
                NOT JUST A PHRASE.<br />IT&apos;S THE CULTURE.
              </h3>
              
              <div className="flex flex-col gap-1.5 font-sans text-base sm:text-lg md:text-xl font-bold text-zinc-300 mb-6 leading-relaxed">
                <p>No judgment.</p>
                <p>No gatekeeping.</p>
                <p>Just traders who live life on the edge.</p>
              </div>

              <h4 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-[0.05em] text-[#F5C400] mb-8 uppercase leading-none">
                ONE OF US. WELCOME HOME.
              </h4>

              {/* Follow Us on X Button */}
              <motion.a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, rotate: 0 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 px-8 py-3.5 rounded-xl bg-[#F5C400] text-zinc-950 font-display text-2xl md:text-3xl tracking-[0.05em] uppercase transition-all shadow-[0_6px_20px_rgba(245,196,0,0.3)] hover:shadow-[0_10px_28px_rgba(245,196,0,0.5)] rotate-[-1deg] font-bold select-none cursor-pointer"
              >
                <span>Follow us</span>
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </motion.a>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full flex flex-col">
        {/* Top Half: Yellow Background with Slogans */}
        <div className="w-full bg-[#F5C400] text-zinc-950 py-12 sm:py-16 border-t border-zinc-900/10 flex flex-col items-center justify-center text-center px-6">
          <h5 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[0.05em] uppercase leading-none text-zinc-950">
            YOU DON&apos;T HAVE TO WIN. <span className="text-[#D92D20]">JUST BELONG.</span>
          </h5>
          
          {/* Black block: ONE OF US. */}
          <motion.div 
            whileHover={{ scale: 1.06, rotate: 0 }}
            className="bg-zinc-950 text-white font-display text-2xl sm:text-3xl px-8 py-2 rounded-xl rotate-[-2deg] tracking-widest font-black select-none mt-6 shadow-md transition-transform"
          >
            ONE OF US.
          </motion.div>
        </div>

        {/* Bottom Half: Black Background with Ticker and Copyright */}
        <div className="w-full bg-black py-8 border-t border-zinc-900/40">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Ticker with hand-drawn ray accents */}
            <div className="flex items-center gap-4">
              {/* Left Lines Accent */}
              <div className="flex flex-col gap-1 opacity-70">
                <div className="w-3.5 h-0.5 bg-[#F5C400] rotate-[-20deg] transform origin-right" />
                <div className="w-4.5 h-0.5 bg-[#F5C400]" />
                <div className="w-3.5 h-0.5 bg-[#F5C400] rotate-[20deg] transform origin-right" />
              </div>
              
              <span className="font-display text-xl sm:text-2xl text-white font-black tracking-widest uppercase">
                TICKER: <span className="text-[#F5C400]">$ONE</span>
              </span>

              {/* Right Lines Accent */}
              <div className="flex flex-col gap-1 opacity-70">
                <div className="w-3.5 h-0.5 bg-[#F5C400] rotate-[20deg] transform origin-left" />
                <div className="w-4.5 h-0.5 bg-[#F5C400]" />
                <div className="w-3.5 h-0.5 bg-[#F5C400] rotate-[-20deg] transform origin-left" />
              </div>
            </div>

            {/* Copyright Only */}
            <div className="text-zinc-500 text-xs sm:text-sm font-medium">
              <span>&copy; {new Date().getFullYear()} ONE OF US. All rights reserved.</span>
            </div>

          </div>
        </div>
      </footer>
    </main>
  );
}
