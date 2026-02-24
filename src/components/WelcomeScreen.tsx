'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen = ({ onComplete }: WelcomeScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<SVGTextElement>(null);
  const text2Ref = useRef<SVGTextElement>(null);
  const text3Ref = useRef<SVGTextElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Helper to animate stroke and fill
    const animateText = (ref: React.RefObject<SVGTextElement>, duration: number) => {
      if (!ref.current) return;
      const length = ref.current.getComputedTextLength();
      
      // Set initial state
      gsap.set(ref.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 1,
        fillOpacity: 0
      });

      // Animate stroke
      gsap.to(ref.current, {
        strokeDashoffset: 0,
        duration: duration,
        ease: "power2.inOut"
      });

      // Animate fill fade in (slightly delayed)
      gsap.to(ref.current, {
        fillOpacity: 1,
        duration: duration * 0.8,
        delay: duration * 0.2,
        ease: "power2.out"
      });
    };

    // Sequence
    // 1. "Welcome to"
    if (text1Ref.current) animateText(text1Ref, 1.5);
    
    // 2. "Yash" (Faster/Concurrent)
    if (text2Ref.current) gsap.delayedCall(0.5, () => animateText(text2Ref, 1.5));
    
    // 3. "Portfolio"
    if (text3Ref.current) gsap.delayedCall(1.0, () => animateText(text3Ref, 1.5));

    // Slide up curtain animation
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 1,
      ease: "power4.inOut",
      delay: 3.0, // Wait for text animations to finish
      onComplete: onComplete
    });

  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden"
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

      
      <svg 
        viewBox="0 0 800 400" 
        className="w-full max-w-4xl h-auto relative z-10"
      >
        <defs>
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f0562e" />
            <stop offset="50%" stopColor="#ff8c69" /> {/* Lighter Orange for shine */}
            <stop offset="100%" stopColor="#f0562e" />
          </linearGradient>
        </defs>
        <style>
          {`
            .welcome-text {
              font-family: 'Raleway', sans-serif;
              font-weight: 200;
              text-transform: uppercase;
              letter-spacing: 0.2em;
              fill: url(#textGradient);
              fill-opacity: 0;
              stroke: #ffffff;
              stroke-width: 1px;
              opacity: 0;
            }
            .text-large {
                font-size: 80px;
                font-weight: 300;
                letter-spacing: 0.15em;
                stroke-width: 1.5px;
            }
            .text-small {
                font-size: 30px;
                letter-spacing: 0.5em;
            }
          `}
        </style>

        {/* Line 1: Welcome to */}
        <text 
            ref={text1Ref} 
            x="50%" 
            y="30%" 
            textAnchor="middle" 
            className="welcome-text text-small"
        >
          Welcome to
        </text>

        {/* Line 2: Yash */}
        <text 
            ref={text2Ref} 
            x="50%" 
            y="60%" 
            textAnchor="middle" 
            className="welcome-text text-large"
        >
          Yash
        </text>

        {/* Line 3: Portfolio */}
        <text 
            ref={text3Ref} 
            x="50%" 
            y="85%" 
            textAnchor="middle" 
            className="welcome-text text-small"
        >
          Portfolio
        </text>
      </svg>
    </div>
  );
};

export default WelcomeScreen;
