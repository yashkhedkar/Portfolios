import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollFloat from './ScrollFloat';
import './SkillsSection.css';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  'REACT', 'NEXT.JS', 'TYPESCRIPT', 'NODE.JS', 'PYTHON', 'POSTGRESQL',
  'MONGODB', 'AWS', 'DOCKER', 'GRAPHQL', 'TAILWIND', 'PRISMA',
];

const techStack = [
  { category: 'Frontend', items: ['React', 'Next.js', 'Vue', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { category: 'Backend', items: ['Node.js', 'Python', 'Go', 'GraphQL', 'REST APIs', 'WebSockets'] },
  { category: 'Database', items: ['PostgreSQL', 'MongoDB', 'SQL'] },
  { category: 'DevOps', items: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Vercel', 'Cloudflare'] },
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skills-subtitle',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.skills-title',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.utils.toArray('.tech-card').forEach((card: any, index) => {
        gsap.fromTo(
          card,
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            delay: index * 0.3,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative py-32 overflow-hidden">


      <div className="container mx-auto max-w-7xl px-6">
        <div className="skills-title mb-16">
          <span className="skills-subtitle text-primary text-sm font-medium uppercase block font-roboto">
            My Toolkit
          </span>
          <div className="mt-4">
            <ScrollFloat 
                animationDuration={1} 
                ease='back.inOut(2)' 
                scrollStart='center bottom+=50%' 
                scrollEnd='bottom bottom-=40%' 
                stagger={0.03}
                containerClassName="my-0 leading-[0.95]" 
                textClassName="text-[56px] sm:text-7xl md:text-[80px] font-normal text-white font-roboto"
            >
                CORE
            </ScrollFloat>
            <ScrollFloat 
                animationDuration={1} 
                ease='back.inOut(2)' 
                scrollStart='center bottom+=50%' 
                scrollEnd='bottom bottom-=40%' 
                stagger={0.03}
                containerClassName="my-0 leading-[0.95]" 
                textClassName="text-[56px] sm:text-7xl md:text-[80px] font-normal text-primary font-roboto"
            >
                TECHNOLOGIES
            </ScrollFloat>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 perspective-container">
          {techStack.map((tech) => (
            <div
              key={tech.category}
              className="card-container tech-card"
            >
              <div className="card">
                <div className="layers">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="layer"></div>
                  ))}
                </div>
                {/* Content sits on top of layers, effectively another layer but with content */}
                <div className="card-content">
                  <h3 className="font-display text-2xl text-primary mb-6 tracking-wide">
                    {tech.category.toUpperCase()}
                  </h3>
                  <ul className="space-y-3">
                    {tech.items.map((item) => (
                      <li
                        key={item}
                        className="text-muted-foreground hover:text-foreground transition-colors cursor-default flex items-center gap-2 font-medium"
                      >
                        <span className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_#f0562e]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;