import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollFloat from "./ScrollFloat";
import "./ExperienceSection.css";

interface ExperienceItem {
  title: string;
  company: string;
  date: string;
  responsibilities: string[];
}

const experiences: ExperienceItem[] = [
  {
    title: "Web Developer Intern",
    company: "Hanumatrix",
    date: "June 2025 – Present",
    responsibilities: [
      "Developed The System website using React, Javascript, Tailwind CSS, GSAP.",
      "Integrated GSAP (GreenSock Animation Platform) to create smooth and engaging animations, improving UI/UX experience significantly.",
      "Implemented interactive animations to enhance UI/UX.",
      "Collaborated with team members, designers, adhering to modern frontend development best practices to deliver scalable, maintainable, and high-performance UI components.",
    ],
  },
  {
    title: "Web Developer Intern",
    company: "NSPA Global",
    date: "Feb 2025 - April 2025",
    responsibilities: [
      "Worked on a Maid Hiring Website as part of the development team.",
      "Developed a fully responsive frontend using ReactJS and JavaScript.",
      "Built a scalable backend architecture with Node.js, Express.js, and MongoDB.",
      "Collaborated closely with frontend, backend developers and designers to implement dynamic features and enhance user experience.",
    ],
  },
];

const Firework = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const particles = Array.from({ length: 24 }).map((_, i) => { // Increased particle count
      const div = document.createElement("div");
      div.className = "absolute w-1 h-1 bg-primary rounded-full";
      
      // Random initial position slightly clustered
      div.style.left = "50%";
      div.style.top = "50%";
      
      return div;
    });

    particles.forEach((p) => containerRef.current?.appendChild(p));

    const ctx = gsap.context(() => {
        particles.forEach((p, i) => {
            const angle = (Math.PI * 2 * i) / particles.length;
            const velocity = 40 + Math.random() * 40;
            
            gsap.to(p, {
                x: Math.cos(angle) * velocity,
                y: Math.sin(angle) * velocity,
                opacity: 0,
                scale: 0,
                duration: 1 + Math.random() * 0.5,
                ease: "power3.out",
            });
        });
    }, containerRef);

    return () => {
        ctx.revert();
        if(containerRef.current) containerRef.current.innerHTML = '';
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none flex items-center justify-center z-50"
    />
  );
};

const ExperienceSection = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (timelineRef.current && lineRef.current) {
        // Smooth line filling animation
        gsap.fromTo(
          lineRef.current,
          { height: "0%" },
          {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: timelineRef.current,
              start: "top center",
              end: "bottom center",
              scrub: 1.5,
            },
          }
        );

        // Update active index based on scroll position
        cardRefs.current.forEach((card, index) => {
          if (card) {
            ScrollTrigger.create({
              trigger: card,
              start: "top center", // Trigger when the top of the card (and thus the dot) hits the center
              end: "bottom center",
              onEnter: () => setActiveIndex(index),
              onLeaveBack: () => setActiveIndex(index - 1),
            });
          }
        });
      }
    }, timelineRef);

    // Card visibility observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section className="py-20 px-4" id="experience">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <ScrollFloat 
            containerClassName="mb-4 block" 
            textClassName="text-primary text-sm font-medium uppercase font-roboto"
            animationDuration={1} 
            ease='back.inOut(2)' 
            scrollStart='center bottom+=50%' 
            scrollEnd='bottom bottom-=40%' 
            stagger={0.03}
          >
            Work Experience
          </ScrollFloat>
          
          <div className="mb-6">
             <div className="inline-block">
                <ScrollFloat 
                    animationDuration={1} 
                    ease='back.inOut(2)' 
                    scrollStart='center bottom+=50%' 
                    scrollEnd='bottom bottom-=40%' 
                    stagger={0.03}
                    containerClassName="my-0 leading-[0.95] inline-block" 
                    textClassName="text-[40px] sm:text-7xl md:text-[80px] font-normal text-white font-roboto"
                >
                    PROFESSIONAL
                </ScrollFloat>
             </div>
             <div className="inline-block md:ml-4">
                <ScrollFloat 
                    animationDuration={1} 
                    ease='back.inOut(2)' 
                    scrollStart='center bottom+=50%' 
                    scrollEnd='bottom bottom-=40%' 
                    stagger={0.03}
                    containerClassName="my-0 leading-[0.95] inline-block" 
                    textClassName="text-[40px] sm:text-7xl md:text-[80px] font-normal text-primary font-roboto"
                >
                    JOURNEY
                </ScrollFloat>
             </div>
          </div>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-roboto">
            My professional journey and contributions in the tech industry.
          </p>
        </div>

        <div ref={timelineRef} className="relative">
          {/* Timeline line container */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1">
            {/* Background line */}
            <div className="absolute inset-0 bg-border/30 rounded-full" />
            {/* Animated fill line */}
            <div
              ref={lineRef}
              className="absolute top-0 left-0 right-0 bg-primary rounded-full w-full shadow-[0_0_10px_theme(colors.primary.DEFAULT)]"
              style={{ height: "0%" }}
            />
          </div>

          {/* Experience Items */}
          <div className="relative space-y-16 md:space-y-24">
            {experiences.map((experience, index) => {
              const isActive = activeIndex >= index;
              const isVisible = visibleCards.has(index);
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  data-index={index}
                  className={`relative flex items-start ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Point (Circle) */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                      <div
                        className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                          isActive
                            ? "bg-primary border-primary shadow-[0_0_15px_theme(colors.primary.DEFAULT)] scale-125"
                            : "bg-background border-muted-foreground"
                        }`}
                      />
                      {/* Firework Effect */}
                      {isActive && <Firework />}
                  </div>

                  {/* Date Label - positioned on opposite side */}
                  <div
                    className={`hidden md:flex md:w-[calc(50%-3rem)] items-start justify-center pt-3 ${
                      isEven ? "md:order-2 md:pl-8" : "md:order-2 md:pr-8"
                    }`}
                  >
                    <span className="text-primary font-semibold text-lg">
                      {experience.date}
                    </span>
                  </div>

                  {/* Card */}
                  <div
                    className={`ml-16 md:ml-0 md:w-[calc(50%-3rem)] ${
                      isEven ? "md:pr-8 md:order-1" : "md:pl-8 md:order-1"
                    } ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    } transition-all duration-700 ease-out`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {/* Mobile date */}
                    <span className="md:hidden text-primary font-semibold text-sm mb-2 block">
                      {experience.date}
                    </span>

                    <div className="glass-card p-6 rounded-xl border border-border/30">
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">
                        {experience.title}
                      </h3>
                      <p className="text-primary font-semibold mb-4">
                        {experience.company}
                      </p>
                      <ul className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                        {experience.responsibilities.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary mt-1.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
