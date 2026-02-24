'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealTextProps {
  text: string;
  className?: string;
  wrapperClassName?: string;
  delay?: number;
}

const ScrollRevealText = ({ text, className = "", wrapperClassName="", delay = 0 }: ScrollRevealTextProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const chars = containerRef.current?.querySelectorAll('.char');
      
      if (chars && chars.length > 0) {
        gsap.fromTo(
          chars,
          { 
            y: 100, 
            opacity: 0,
            filter: 'blur(10px)'
          },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.2,
            stagger: 0.03,
            ease: 'power4.out',
            delay: delay,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [delay]);

  return (
    <span ref={containerRef} className={`inline-block overflow-hidden align-bottom ${wrapperClassName}`} aria-label={text}>
      {text.split('').map((char, i) => (
        <span 
          key={i} 
          className={`char inline-block ${className}`}
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal', willChange: 'transform, opacity, filter' }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export default ScrollRevealText;
