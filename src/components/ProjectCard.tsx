import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import LiquidImage from './LiquidImage';

interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  index: number;
}

const ProjectCard = ({ title, category, description, image, link, index }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    gsap.to(imageRef.current, {
      scale: 1.1,
      duration: 0.6,
      ease: 'power3.out',
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.6,
      ease: 'power3.out',
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    
    gsap.to(cardRef.current, {
      rotateY: x,
      rotateX: -y,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleMouseLeaveCard = () => {
    handleMouseLeave();
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block perspective-1000"
    >
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeaveCard}
        onMouseMove={handleMouseMove}
        className="project-card relative bg-black/20 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 preserve-3d transition-all duration-300 hover:border-primary/50"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <span className="text-primary font-display text-xl">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-muted-foreground text-xs tracking-wider uppercase">
            / {category}
          </span>
        </div>

        <div
          ref={imageRef}
          className="aspect-[16/9] overflow-hidden"
        >
            <LiquidImage image={image} isHovered={isHovered} />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-3xl md:text-4xl text-foreground mb-2">
                {title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-2">
                {description}
              </p>
            </div>
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-300 ${
                isHovered
                  ? 'bg-primary border-primary text-primary-foreground'
                  : 'border-border text-muted-foreground'
              }`}
            >
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ProjectCard;