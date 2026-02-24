"use client";

import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';
import ContactModal from './ContactModal';

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsVisible(false);
        setIsMenuOpen(false); // Close menu on scroll
      } else {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    
    // Animate navigation on mount
    gsap.fromTo(
      '.nav-item',
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.5 }
    );

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-[10px] left-0 right-0 z-50 transition-transform duration-300 bg-transparent ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <button
            onClick={() => scrollToSection('hero')}
            className="nav-item font-['Sacramento'] text-4xl tracking-normal text-foreground hover:text-primary transition-colors pb-2"
          >
            Yash<span className="text-primary text-5xl">.</span>
          </button>

          <div className="flex items-center gap-3">
            {/* Minus Button (Decorative/Minimize) */}
            <button className="nav-item w-10 h-10 rounded-full bg-secondary/50 hover:bg-secondary transition-colors flex items-center justify-center backdrop-blur-sm">
              <span className="w-3 h-0.5 bg-foreground/80"></span>
            </button>

            {/* Let's Talk Button */}
            <button
              onClick={() => setIsContactOpen(true)}
              className="nav-item px-6 py-2.5 bg-secondary text-foreground font-medium text-sm rounded-full hover:bg-secondary/90 transition-all uppercase tracking-wide"
            >
              Let's Talk
            </button>

            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="nav-item px-6 py-2.5 bg-surface text-foreground backdrop-blur-md font-medium text-sm rounded-full hover:bg-surface-hover transition-all flex items-center gap-2 uppercase tracking-wide min-w-[100px] justify-center"
            >
              {isMenuOpen ? 'CLOSE' : 'MENU'}
              <span className="flex gap-0.5 flex-col rotate-90">
                <span className="w-0.5 h-0.5 rounded-full bg-foreground"></span>
                <span className="w-0.5 h-0.5 rounded-full bg-foreground"></span>
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Dropdown Sidebar Menu */}
      <div 
        className={`fixed top-[108px] right-6 z-40 w-72 bg-surface rounded-3xl shadow-2xl p-2 transition-all duration-300 origin-top-right border border-border/10 ${
          isMenuOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-95 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-1">
          {['HOME', 'ABOUT', 'WORKS', 'SKILLS', 'CONTACT'].map((item) => (
            <button
              key={item}
              onClick={() => {
                scrollToSection(item === 'HOME' ? 'hero' : item.toLowerCase());
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-6 py-4 rounded-xl text-white hover:bg-white/10 transition-all group"
            >
              <span className="text-lg font-medium tracking-wide">{item}</span>
              <div className="relative w-6 h-6 flex items-center justify-center">
                {/* Dot for Home (or active) - simplified to just show arrow on hover for all for now, or dot for Home */}
                {item === 'HOME' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:opacity-0 transition-opacity" />
                )}
                <ArrowRight className="absolute w-5 h-5 text-white opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
};

export default Navigation;
