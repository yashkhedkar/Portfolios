import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollFloat from './ScrollFloat';
import LuminousCard from './LuminousCard';
import DataFlowBackground from './DataFlowBackground';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '5+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Completed' },
  { value: '30+', label: 'Happy Clients' },
  { value: '99%', label: 'Success Rate' },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {


      gsap.fromTo(
        '.about-text',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: '.about-text',
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.luminous-card-wrapper',
        { x: 200, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.luminous-card-wrapper',
            start: 'top 85%',
          },
        }
      );

      gsap.utils.toArray('.stat-item').forEach((stat: any, index) => {
        gsap.fromTo(
          stat,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stat,
              start: 'top 85%',
            },
            delay: index * 0.15,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-32 px-6">
      {/* Background Animation */}
      <DataFlowBackground />
      
      <div className="container mx-auto max-w-7xl relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative w-full">

            <ScrollFloat 
              containerClassName="my-0 mb-4 relative z-10 block" 
              textClassName="text-primary !text-sm font-medium uppercase font-roboto" 
              animationDuration={1} 
              ease='back.inOut(2)' 
              scrollStart='center bottom+=50%' 
              scrollEnd='bottom bottom-=40%' 
              stagger={0.03}
            >
              About Me
            </ScrollFloat>
            <div className="mb-8">
              <ScrollFloat 
                containerClassName="my-0 leading-[0.95]" 
                textClassName="text-[56px] sm:text-7xl md:text-[80px] font-normal text-white font-roboto"
                animationDuration={1} 
                ease='back.inOut(2)' 
                scrollStart='center bottom+=50%' 
                scrollEnd='bottom bottom-=40%' 
                stagger={0.03}
              >
                BUILDING
              </ScrollFloat>
              <ScrollFloat 
                containerClassName="my-0 leading-[0.95]" 
                textClassName="text-[56px] sm:text-7xl md:text-[80px] font-normal text-primary font-roboto"
                animationDuration={1} 
                ease='back.inOut(2)' 
                scrollStart='center bottom+=50%' 
                scrollEnd='bottom bottom-=40%' 
                stagger={0.03}
              >
                THE FUTURE
              </ScrollFloat>
            </div>
            <p className="about-text text-muted-foreground text-lg leading-relaxed mb-6">
              I'm a passionate fullstack developer with a love for creating elegant solutions 
              to complex problems. With expertise spanning frontend frameworks, backend systems, 
              and cloud infrastructure, I bring ideas to life from concept to deployment.
            </p>
            <p className="about-text text-muted-foreground text-lg leading-relaxed mb-8">
              My approach combines clean code principles with creative problem-solving, 
              ensuring every project is not just functional, but exceptional. I believe in 
              building software that makes a difference.
            </p>
            <a
              href="/Yash Khedkar_Resume.pdf"
              download="Yash_Khedkar_Resume.pdf"
              className="about-text group relative inline-flex items-center justify-center px-8 py-3 bg-zinc-900 text-white font-medium tracking-wide rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(240,86,46,0.4)]"
            >
              {/* Fill Effect */}
              <span className="absolute inset-0 w-full h-full bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-out" />
              
              {/* Content */}
              <span className="relative z-10 flex items-center gap-2">
                <span>Download Resume</span>
                <span className="text-primary group-hover:text-white transition-colors">*</span>
              </span>
            </a>
          </div>

          {/* Right Side - Luminous Card Feature */}
          <div className="luminous-card-wrapper flex items-center justify-center relative h-[400px] lg:h-[600px] perspective-container">
            <LuminousCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;