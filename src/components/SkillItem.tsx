import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SkillItemProps {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

const SkillItem = ({ id, number, title, subtitle, description }: SkillItemProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Animate in
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          y: 100,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'center center',
            scrub: 1,
          },
        }
      );

      // Animate out
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
        },
        {
          opacity: 0,
          y: -50,
          scale: 0.9,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'center center',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="min-h-screen flex items-center justify-center relative"
    >
      <div ref={contentRef} className="relative z-10 px-8 text-left max-w-4xl mx-auto w-full pl-16 md:pl-32">
        {/* Connection Node */}
        <div className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 w-4 h-4 md:w-6 md:h-6 rounded-full border-2 border-primary bg-background shadow-[0_0_15px_theme(colors.primary.DEFAULT)] z-20 group">
             <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20"></div>
        </div>

        <span className="text-6xl md:text-8xl font-display font-medium text-primary/20 absolute -top-10 md:-top-16 left-16 md:left-32 select-none pointer-events-none transition-opacity duration-500">
          {number}
        </span>
        <h2 className="text-5xl md:text-7xl font-display font-normal mb-6 tracking-tight text-foreground cursor-default transition-all duration-300 hover:text-primary">
          {title}
        </h2>
        <p className="mb-6 text-xl md:text-2xl font-light tracking-wide text-primary uppercase">
          {subtitle}
        </p>
        <p className="max-w-xl text-lg md:text-xl leading-relaxed text-muted-foreground/80">
          {description}
        </p>
      </div>
    </section>
  );
};

export default SkillItem;
