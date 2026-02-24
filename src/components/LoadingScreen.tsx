'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import './LoadingScreen.css';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleEnter = () => {
    onComplete();
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline
      const tl = gsap.timeline({
        onComplete: () => {
           // Ensure button is interactive
           if (buttonRef.current) buttonRef.current.style.pointerEvents = 'auto';
        }
      });

      // Initial state
      gsap.set(buttonRef.current, { y: 20, opacity: 0, pointerEvents: 'none' });

      // Animate progress bar (kept for timing, visible or not)
      tl.to(progressRef.current, {
        width: '100%',
        duration: 3, // Extended duration for the loop to be appreciated
        ease: 'power2.inOut',
      })
      
      // Animate button reveal directly after
      .to(buttonRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
      }, "-=0.2"); 

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background text-foreground"
    >
      {/* Background Grid (Chex structure) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.18]"
        style={{
            backgroundImage: `linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
                              linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
        }}
      />

      {/* Ambient Lights */}


      <div className="relative z-10 flex flex-col items-center gap-12">
        {/* 3D Cube Loader */}
        <div className="cube-loader-container">
            <div id="cube" className="cube-wrapper">
                <div id="front" className="cube-face"></div>
                <div id="back" className="cube-face"></div>
                <div id="bottom" className="cube-face"></div>
                <div id="top" className="cube-face"></div>
                <div id="left" className="cube-face"></div>
                <div id="right" className="cube-face"></div>
            </div>
            <p className="loading-text">
                Loading <span id="d1" className="dot">.</span><span id="d2" className="dot">.</span><span id="d3" className="dot">.</span>
            </p>
        </div>

        {/* Vertical Stack for Bar and Button */}
        <div className="flex flex-col items-center gap-6">
            {/* Horizontal Progressive Bar */}
            <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div
                    ref={progressRef}
                    className="h-full bg-primary w-0 shadow-[0_0_10px_hsl(var(--primary)/0.5)]"
                />
            </div>

            {/* Enter Button */}
            <button
                ref={buttonRef}
                onClick={handleEnter}
                className="group relative px-8 py-3 bg-white/5 border border-primary/80 shadow-[0_0_15px_hsl(var(--primary)/0.3)] rounded-full text-xs font-medium tracking-[0.2em] text-white overflow-hidden transition-all duration-300 opacity-0 pointer-events-none uppercase backdrop-blur-sm hover:bg-primary hover:text-black hover:shadow-[0_0_25px_hsl(var(--primary)/0.6)]"
            >
                <span className="absolute inset-0 w-full h-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-[2000ms] origin-left ease-out" />
                <span className="relative z-10">Enter Experience</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
