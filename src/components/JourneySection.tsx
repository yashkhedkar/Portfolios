'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollFloat from './ScrollFloat';

gsap.registerPlugin(ScrollTrigger);

const JourneySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Setup timeline for the pinned section
      ScrollTrigger.create({
        trigger: ".journey-wrapper",
        start: "top top",
        end: "bottom bottom",
        pin: ".journey-visuals",
        pinSpacing: false, 
      });

      // Configuration for card animations
      const animations = [
        { 
          target: cardsRef.current[0], 
          trigger: contentRefs.current[0],
          start: "top center",
          end: "bottom center",
        }, 
        { 
          target: cardsRef.current[1],
          trigger: contentRefs.current[1],
          from: { xPercent: -35, yPercent: 30, opacity: 0.3, scale: 0.4 },
          to: { xPercent: 0, yPercent: 0, opacity: 1, scale: 1 }
        },
        { 
          target: cardsRef.current[2],
          trigger: contentRefs.current[2],
          from: { xPercent: 0, yPercent: 50, opacity: 0.5, scale: 0.4 },
          to: { xPercent: 0, yPercent: 0, opacity: 1, scale: 1 }
        },
        { 
          target: cardsRef.current[3],
          trigger: contentRefs.current[3],
          from: { xPercent: 45, yPercent: 40, opacity: 0.5, scale: 0.4 },
          to: { xPercent: 0, yPercent: 0, opacity: 1, scale: 1 }
        }
      ];

      // Animate Cards based on their corresponding content appearing
      animations.slice(1).forEach((anim, i) => {
        if (!anim.target || !anim.trigger) return;
        
        // Initial set
        gsap.set(anim.target, anim.from as gsap.TweenVars);

        gsap.to(anim.target, {
          ...anim.to as gsap.TweenVars,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: anim.trigger,
            start: "top center+=100",
            end: "center center",
            scrub: 1,
          }
        });
      });

      // Exit animations for stacking effect
      animations.forEach((anim, i) => {
         if (i === animations.length - 1) return; // Last card stays
         
         const nextTrigger = contentRefs.current[i+1];
         if (!nextTrigger || !anim.target) return;

         gsap.to(anim.target, {
           scale: 0.6,
           opacity: 0,
           yPercent: -50,
           scrollTrigger: {
             trigger: nextTrigger,
             start: "top center",
             end: "center center",
             scrub: 1
           }
         });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-transparent text-white overflow-hidden">
      
      <div className="journey-wrapper relative z-10 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 py-24">
        
        {/* Left Column: Content (Scrolls) */}
        <div className="journey-content flex flex-col gap-[80vh] pb-[50vh]">
          
          {/* Content 1: UI/UX Designer */}
          <div ref={el => { contentRefs.current[0] = el; }} className="min-h-[50vh] flex flex-col justify-center">
            <div className="lg:hidden mb-8 aspect-square rounded-2xl overflow-hidden shadow-xl">
                 <img src="https://images.unsplash.com/photo-1586717791821-3f44a5638d0f?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col md:block mb-6">
              <ScrollFloat 
                animationDuration={1} 
                ease='back.inOut(2)' 
                scrollStart='center bottom+=50%' 
                scrollEnd='bottom bottom-=40%' 
                stagger={0.03}
                containerClassName="my-0 inline-block align-top" 
                textClassName="text-5xl md:text-7xl font-bold tracking-tight text-white"
              >
                Visualizing
              </ScrollFloat> 
              <ScrollFloat 
                animationDuration={1} 
                ease='back.inOut(2)' 
                scrollStart='center bottom+=50%' 
                scrollEnd='bottom bottom-=40%' 
                stagger={0.03}
                containerClassName="my-0 inline-block align-top md:ml-3 text-primary" 
                textClassName="text-5xl md:text-7xl font-bold tracking-tight"
              >
                UI/UX Design
              </ScrollFloat>
            </div>
            <p className="text-xl md:text-2xl text-white leading-relaxed max-w-md">
              Crafting intuitive, user-centric interfaces that blend aesthetics with functionality to create seamless digital experiences.
            </p>
          </div>

          {/* Content 2: Frontend Developer */}
          <div ref={el => { contentRefs.current[1] = el; }} className="min-h-[50vh] flex flex-col justify-center">
             <div className="lg:hidden mb-8 aspect-square rounded-2xl overflow-hidden shadow-xl">
                 <img src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col md:block mb-6">
              <ScrollFloat 
                animationDuration={1} 
                ease='back.inOut(2)' 
                scrollStart='center bottom+=50%' 
                scrollEnd='bottom bottom-=40%' 
                stagger={0.03}
                containerClassName="my-0 inline-block align-top" 
                textClassName="text-5xl md:text-7xl font-bold tracking-tight text-white"
              >
                Engineering
              </ScrollFloat> 
              <ScrollFloat 
                animationDuration={1} 
                ease='back.inOut(2)' 
                scrollStart='center bottom+=50%' 
                scrollEnd='bottom bottom-=40%' 
                stagger={0.03}
                containerClassName="my-0 inline-block align-top md:ml-3 text-primary" 
                textClassName="text-5xl md:text-7xl font-bold tracking-tight"
              >
                Frontend Logic
              </ScrollFloat>
            </div>
            <p className="text-xl md:text-2xl text-white leading-relaxed max-w-md">
              Building responsive, high-performance web applications using modern frameworks like React, Next.js, and Tailwind CSS.
            </p>
          </div>

          {/* Content 3: Backend Developer */}
          <div ref={el => { contentRefs.current[2] = el; }} className="min-h-[50vh] flex flex-col justify-center">
             <div className="lg:hidden mb-8 aspect-square rounded-2xl overflow-hidden shadow-xl">
                 <img src="https://images.unsplash.com/photo-1623479322729-28b25c16b011?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col md:block mb-6">
              <ScrollFloat 
                animationDuration={1} 
                ease='back.inOut(2)' 
                scrollStart='center bottom+=50%' 
                scrollEnd='bottom bottom-=40%' 
                stagger={0.03}
                containerClassName="my-0 inline-block align-top" 
                textClassName="text-5xl md:text-7xl font-bold tracking-tight text-white"
              >
                Architecting
              </ScrollFloat> 
              <ScrollFloat 
                animationDuration={1} 
                ease='back.inOut(2)' 
                scrollStart='center bottom+=50%' 
                scrollEnd='bottom bottom-=40%' 
                stagger={0.03}
                containerClassName="my-0 inline-block align-top md:ml-3 text-primary" 
                textClassName="text-5xl md:text-7xl font-bold tracking-tight"
              >
                Backend Systems
              </ScrollFloat>
            </div>
            <p className="text-xl md:text-2xl text-white leading-relaxed max-w-md">
              Developing robust APIs, scalable databases, and secure server-side logic to power complex data-driven applications.
            </p>
          </div>

          {/* Content 4: Fullstack Web Developer */}
          <div ref={el => { contentRefs.current[3] = el; }} className="min-h-[50vh] flex flex-col justify-center">
             <div className="lg:hidden mb-8 aspect-square rounded-2xl overflow-hidden shadow-xl">
                 <img src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col md:block mb-6">
              <ScrollFloat 
                animationDuration={1} 
                ease='back.inOut(2)' 
                scrollStart='center bottom+=50%' 
                scrollEnd='bottom bottom-=40%' 
                stagger={0.03}
                containerClassName="my-0 inline-block align-top" 
                textClassName="text-5xl md:text-7xl font-bold tracking-tight text-white"
              >
                Mastering
              </ScrollFloat> 
              <ScrollFloat 
                animationDuration={1} 
                ease='back.inOut(2)' 
                scrollStart='center bottom+=50%' 
                scrollEnd='bottom bottom-=40%' 
                stagger={0.03}
                containerClassName="my-0 inline-block align-top md:ml-3 text-primary" 
                textClassName="text-5xl md:text-7xl font-bold tracking-tight"
              >
                Fullstack Dev
              </ScrollFloat>
            </div>
            <p className="text-xl md:text-2xl text-white leading-relaxed max-w-md">
              Bridging the gap between client and server to deliver end-to-end solutions that are scalable, efficient, and reliable.
            </p>
          </div>

        </div>

        {/* Right Column: Sticky Visuals */}
        <div className="journey-visuals hidden lg:flex h-screen sticky top-0 items-center justify-center">
            <div className="relative w-[500px] aspect-square perspective-1000">
                {/* Card 1: UI/UX */}
                <div ref={el => { cardsRef.current[0] = el; }} className="absolute inset-0 w-full h-full">
                    <img 
                        src="https://images.unsplash.com/photo-1586717791821-3f44a5638d0f?auto=format&fit=crop&w=800&q=80" 
                        alt="UI/UX Design" 
                        className="w-full h-full object-cover rounded-2xl shadow-2xl border border-white/10"
                    />
                </div>
                 {/* Card 2: Frontend */}
                 <div ref={el => { cardsRef.current[1] = el; }} className="absolute inset-0 w-full h-full">
                    <img 
                        src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&w=800&q=80" 
                        alt="Frontend Dev" 
                        className="w-full h-full object-cover rounded-2xl shadow-2xl border border-white/10"
                    />
                </div>
                 {/* Card 3: Backend */}
                 <div ref={el => { cardsRef.current[2] = el; }} className="absolute inset-0 w-full h-full">
                    <img 
                        src="https://images.unsplash.com/photo-1623479322729-28b25c16b011?auto=format&fit=crop&w=800&q=80" 
                        alt="Backend Dev" 
                        className="w-full h-full object-cover rounded-2xl shadow-2xl border border-white/10"
                    />
                </div>
                 {/* Card 4: Fullstack */}
                 <div ref={el => { cardsRef.current[3] = el; }} className="absolute inset-0 w-full h-full">
                    <img 
                        src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80" 
                        alt="Fullstack Dev" 
                        className="w-full h-full object-cover rounded-2xl shadow-2xl border border-white/10"
                    />
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
