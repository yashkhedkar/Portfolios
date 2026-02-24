'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import AboutSection from '@/components/AboutSection';
import WhatIDoSection from '@/components/WhatIDoSection';
import ExperienceSection from '@/components/ExperienceSection';
import SkillsSection from '@/components/SkillsSection';
import SwiperCardsSection from '@/components/SwiperCardsSection';
import TechStackStrip from '@/components/TechStackStrip';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';

import Footer from '@/components/Footer';

import TravelingImage from '@/components/TravelingImage';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Smooth scroll behavior
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="relative min-h-screen">
      <TravelingImage />
      <Navigation />
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SwiperCardsSection />
        <TechStackStrip />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <TestimonialsSection />

        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
