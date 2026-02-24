'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import ScrollFloat from './ScrollFloat';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: '01',
    title: 'UI/UX Design',
    description: 'Creating intuitive and visually stunning user interfaces that prioritize user experience. From wireframes to high-fidelity prototypes, I craft digital experiences that resonate.',
    icon: (
        <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
    )
  },
  {
    id: '02',
    title: 'Frontend Dev',
    description: 'Building responsive, performant, and accessible web applications using modern frameworks. React, TypeScript, and cutting-edge CSS are my tools of choice.',
    icon: (
        <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
    )
  },
  {
    id: '03',
    title: 'Backend Dev',
    description: 'Architecting robust server-side solutions with scalable APIs and efficient database designs. Node.js, Python, and cloud services power my backend infrastructure.',
    icon: (
        <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
    )
  },
  {
    id: '04',
    title: 'Full Stack',
    description: 'Bridging the gap between frontend and backend to deliver complete, end-to-end solutions. From concept to deployment, I handle the entire development lifecycle.',
    icon: (
        <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
    )
  },
    {
    id: '05',
    title: '3D Interaction',
    description: 'Creating immersive web experiences with WebGL and Three.js. Adding depth, physics, and interactivity to make websites feel alive.',
    icon: (
        <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
        </svg>
    )
  }
];

const WhatIDoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;

      const totalWidth = scrollContainer.scrollWidth;
      const viewportWidth = window.innerWidth;

      // Only animate if content overflows
      if (totalWidth > viewportWidth) {
        gsap.to(scrollContainer, {
          x: () => -(totalWidth - viewportWidth + 100), // Scroll full width + a little padding
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: () => `+=${totalWidth}`, // Scroll duration based on content width
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="services" className="relative min-h-screen bg-transparent overflow-hidden flex flex-col justify-center">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 mb-12 md:mb-20">
          <div className="flex flex-col md:block">
            <ScrollFloat 
                animationDuration={1} 
                ease='back.inOut(2)' 
                scrollStart='center bottom+=50%' 
                scrollEnd='bottom bottom-=40%' 
                stagger={0.03}
                containerClassName="my-0 inline-block align-top"
                textClassName="font-mono text-[56px] sm:text-7xl md:text-[80px] font-normal text-white"
            >
                What I
            </ScrollFloat>
            <ScrollFloat 
                animationDuration={1} 
                ease='back.inOut(2)' 
                scrollStart='center bottom+=50%' 
                scrollEnd='bottom bottom-=40%' 
                stagger={0.03}
                containerClassName="my-0 inline-block text-primary italic align-top ml-4"
                textClassName="font-mono text-[56px] sm:text-7xl md:text-[80px] font-normal"
            >
                Do
            </ScrollFloat>
          </div>
          <p className="text-muted-foreground text-lg md:text-xl max-w-xl mt-6">
            I craft digital experiences that combine aesthetics with functionality, solving problems through code and design.
          </p>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-8 px-6 md:px-24 w-max"
      >
        {services.map((service, index) => (
          <div 
            key={service.id}
            className="group relative w-[350px] md:w-[450px] h-[500px] bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col justify-between transition-all duration-500 hover:bg-white/5 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(240,86,46,0.15)] overflow-hidden"
          >
             {/* Hover Gradient Overlay */}
             <div className="absolute inset-0 bg-gradient-to-b from-primary/0 via-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

             {/* Top Content */}
             <div>
                <div className="flex justify-between items-start mb-10">
                    <span className="text-6xl font-display text-white/10 font-bold group-hover:text-primary/20 transition-colors duration-500">
                        {service.id}
                    </span>
                    <div className="p-4 bg-white/5 rounded-full text-primary group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                        {service.icon}
                    </div>
                </div>
                
                <h3 className="text-4xl font-display font-medium text-white mb-6 group-hover:translate-x-2 transition-transform duration-300">
                    {service.title}
                </h3>
             </div>

             {/* Bottom Content */}
             <div>
                <div className="w-full h-px bg-white/10 mb-6 group-hover:bg-primary/30 transition-colors duration-500" />
                <p className="text-muted-foreground text-lg leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                    {service.description}
                </p>
                
                <div className="mt-8 flex items-center gap-2 text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100">
                    <span className="text-sm font-medium uppercase tracking-widest">Learn more</span>
                    <ArrowUpRight className="w-4 h-4" />
                </div>
             </div>
          </div>
        ))}
        
        {/* Extra spacer card for padding on the right */}
        <div className="w-[10vw] h-1 shrink-0" />
      </div>
    </section>
  );
};

export default WhatIDoSection;
