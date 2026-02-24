"use client";
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail } from 'lucide-react';
import ContactGlobe from './ContactGlobe';
import ScrollFloat from './ScrollFloat';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  // ... (animation effects code)

  return (
    <section ref={containerRef} id="contact-section" className="relative py-20 md:py-32 px-6 overflow-hidden min-h-[80vh] flex items-center">
      <div className="container mx-auto max-w-7xl relative z-10 flex flex-col items-center justify-center text-center">
        
        {/* Globe Background - Absolute Centered */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] md:h-[150%] max-w-[1000px] opacity-0 animate-fade-in -z-10" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
           <ContactGlobe />
           {/* Add a glow behind the globe for better integration */}
           <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full pointer-events-none -z-10 transform scale-75" />
        </div>

        {/* Text & CTA */}
        <div className="flex flex-col items-center max-w-4xl mx-auto">
          <span className="contact-anim text-primary text-sm font-medium uppercase block mb-6 font-roboto">
            Get In Touch
          </span>
          
          <div className="contact-anim mb-10">
            <ScrollFloat 
                animationDuration={1} 
                ease='back.inOut(2)' 
                scrollStart='center bottom+=50%' 
                scrollEnd='bottom bottom-=40%' 
                stagger={0.03}
                containerClassName="my-0 leading-[0.9]"
                textClassName="text-[56px] sm:text-7xl md:text-[90px] font-normal text-white font-roboto"
            >
                LET'S BUILD
            </ScrollFloat>
            <ScrollFloat 
                animationDuration={1} 
                ease='back.inOut(2)' 
                scrollStart='center bottom+=50%' 
                scrollEnd='bottom bottom-=40%' 
                stagger={0.03}
                containerClassName="my-0 leading-[0.9]"
                textClassName="text-[56px] sm:text-7xl md:text-[90px] font-normal text-primary font-roboto"
            >
                TOGETHER
            </ScrollFloat>
          </div>

          <p className="contact-anim text-zinc-400 text-lg md:text-xl max-w-2xl mb-12">
            Have a project in mind or just want to chat? I'm always open to 
            discussing new opportunities and creative ideas.
          </p>

          <a
            href="mailto:ykhedkar@gmail.com"
            className="contact-anim group relative inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white font-bold text-lg rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(240,86,46,0.6)]"
          >
            {/* Fill Effect Layer */}
            <span className="absolute inset-0 w-full h-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-out" />
            
            {/* Button Content */}
            <span className="relative z-10 flex items-center gap-3 group-hover:text-black transition-colors duration-300">
              <Mail className="w-5 h-5" />
              SEND ME A MESSAGE
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
