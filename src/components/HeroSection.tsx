'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const foreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial State: Hide all text elements
      gsap.set(['.hero-bg-text span', '.hero-badge', '.hero-title-line', '.hero-desc', '.hero-role'], { autoAlpha: 0 });
      gsap.set('.hero-bg-text span', { y: 100 });
      gsap.set('.hero-title-line', { y: 100 });
      gsap.set('.hero-desc', { x: 50 });
      gsap.set('.hero-role', { y: 50 });
      gsap.set('.hero-badge', { scale: 0 });

      // --- Canvas Setup ---
      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext("2d");
        const frameCount = 300;
        const currentFrame = { index: 0 };
        const images: HTMLImageElement[] = [];
        
        // Preload images
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            const strIndex = i.toString().padStart(4, '0'); 
            img.src = `/hero-sequence/male${strIndex}.png`;
            images.push(img);
        }

        const render = () => {
            if (!context || !images[currentFrame.index]) return;
            const img = images[currentFrame.index];
            
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            
            // Scaled down by ~30% as requested
            const scale = Math.min(canvasWidth / img.width, canvasHeight / img.height) * 0.9; 
            
            const centerShift_x = (canvasWidth - img.width * scale) / 2;
            const centerShift_y = canvasHeight - img.height * scale;

            context.clearRect(0, 0, canvasWidth, canvasHeight);
            context.drawImage(
                img, 
                0, 0, img.width, img.height,
                centerShift_x, centerShift_y, img.width * scale, img.height * scale
            );
        };

        const handleResize = () => {
            if(containerRef.current && canvas) {
                 canvas.width = canvas.offsetWidth;
                 canvas.height = canvas.offsetHeight;
                 render();
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        // Initial render when first image loads
        images[0].onload = render;

        // --- Master Scroll Timeline ---
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=400%", // Pin for 4 screen heights to allow time for text
                scrub: 1,
                pin: true,
                anticipatePin: 1
            }
        });

        // 1. Frame Animation Sequence (runs for full duration 0->10)
        tl.to(currentFrame, {
            index: frameCount - 1,
            snap: "index",
            ease: "none",
            duration: 10,
            onUpdate: () => {
                currentFrame.index = Math.round(currentFrame.index);
                render();
            }
        }, 0);

        // 2. Text Reveal Sequence (Staggered along the scroll)
        
        // "Hey there" - appears early (at t=1)
        tl.to('.hero-bg-text span', {
            y: 0, autoAlpha: 1, duration: 1, stagger: 0.2
        }, 1);

        // Badge - appears a bit later (at t=3)
        tl.to('.hero-badge', {
            scale: 1, autoAlpha: 1, duration: 1, ease: 'back.out(1.7)'
        }, 3);

        // "I AM YASH" (at t=4.5)
        tl.to('.hero-title-line', {
            y: 0, autoAlpha: 1, duration: 1, stagger: 0.1
        }, 4.5);

        // Description (at t=6)
        tl.to('.hero-desc', {
            x: 0, autoAlpha: 1, duration: 1
        }, 6);

        // Role (at t=7)
        tl.to('.hero-role', {
            y: 0, autoAlpha: 1, duration: 1
        }, 7);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            tl.kill();
        };
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full flex flex-col justify-end items-center overflow-hidden px-4"
    >
      {/* Layer 0: Background "Hey, there" */}
      <div 
        ref={textRef}
        className="absolute top-[20%] md:top-[25%] left-0 w-full z-0 pointer-events-none select-none"
      >
        <h1 className="hero-bg-text font-serif italic text-[5rem] md:text-[12rem] lg:text-[16rem] leading-none text-white/20 text-center">
          <span className="block transform -translate-x-[30%] md:-translate-x-[40%] ml-[200px]">Hey,</span>
          <span className="block transform translate-x-[30%] md:translate-x-[40%] mr-[240px]">there</span>
        </h1>
      </div>

      {/* Layer 1: Main Subject (Canvas Animation) */}
      <div 
        className="relative z-10 w-full max-w-3xl md:max-w-7xl h-[700px] md:h-[1000px] mt-10 md:mt-20 opacity-100" // Opacity handled by canvas loading effectively, but keeping it simple
      >
        <div className="w-full h-full flex items-center justify-center relative">
             <canvas 
                ref={canvasRef}
                className="w-full h-full object-contain"
             />
        </div>
      </div>

      {/* Layer 2: Foreground Content */}
      <div 
        ref={foreRef}
        className="absolute bottom-0 left-0 w-full h-full z-20 pointer-events-none flex flex-col justify-end pb-8 md:pb-12 px-6 md:px-12"
      >
         <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            
            {/* Bottom Left: Badge & Name */}
            <div className="bg-transparent pointer-events-auto order-2 md:order-1 flex flex-col items-start">
                <div className="overflow-hidden mb-6">
                    <h2 className="hero-title-line font-display text-5xl md:text-7xl lg:text-9xl font-bold uppercase tracking-tighter leading-[0.85] text-white">
                        I AM <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">YASH</span>
                    </h2>
                </div>

                <div className="hero-badge inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-xs md:text-sm font-medium tracking-wide text-white/90">Available for new opportunities</span>
                </div>
            </div>

            {/* Bottom Right: Desc & Role */}
            <div className="bg-transparent pointer-events-auto text-left md:text-right order-1 md:order-2 flex flex-col items-start md:items-end">
                <div className="hero-desc max-w-sm mb-6 md:mb-8 text-sm md:text-lg text-muted-foreground/80 font-light leading-relaxed">
                    Specialized in <strong className="text-white font-normal">Modern Web</strong>,<br />
                    <strong className="text-white font-normal">3D Interactions</strong>, and <strong className="text-white font-normal">UX Engineering</strong>.
                </div>
                
                <h3 className="hero-role font-display text-2xl md:text-5xl font-bold uppercase leading-none tracking-tight text-white/90">
                    Full Stack<br />
                    <span className="text-primary">Developer</span>
                </h3>
            </div>

         </div>
      </div>
    </section>
  );
};

export default HeroSection;
