"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

import FooterExplosion from './FooterExplosion';

// ...existing imports...
//gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    // ...existing refs...
    const footerRef = useRef<HTMLElement>(null);
    const currentYear = new Date().getFullYear();

    const links = [
        { name: 'Home', href: '#hero' },
        { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Work', href: '#projects' },
        { name: 'Experience', href: '#experience' },
        { name: 'Skills', href: '#skills' },
        { name: 'Testimonials', href: '#testimonials' },
        { name: 'Contact', href: '#contact-section' },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Simple reveal animation for footer content
            gsap.fromTo('.footer-reveal',
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: 'top 85%'
                    }
                }
            );
        }, footerRef);
        return () => ctx.revert();
    }, []);

    return (
        <footer ref={footerRef} id="contact" className="glass-footer relative">
            <FooterExplosion />
      <div className="footer-container">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
            
            {/* Left Column: Heading & Buttons */}
            <div>
                <span className="footer-label footer-reveal">Available for Work</span>
                <h2 className="footer-heading footer-reveal">
                    Have a<br />
                    Project in Mind?
                </h2>


            </div>

            {/* Right Group: Navigation & Contact */}
            <div className="lg:col-span-1 flex flex-col lg:flex-row gap-8 lg:gap-20 lg:justify-end pb-4 pt-4">
                
                {/* Navigation Links - 2 Columns */}
                <div className="footer-reveal"> 
                    <div className="grid grid-cols-2 gap-12 text-center" style={{ transform: 'translateX(-20px)' }}>
                        {/* Col 1 */}
                        <div>
                            <span className="footer-label mb-6 block">Menu</span>
                            <nav className="flex flex-col gap-3 items-center">
                                {links.slice(0, 4).map((link) => (
                                    <a key={link.name} href={link.href} className="footer-nav-link text-foreground hover:text-primary transition-colors text-lg font-medium block w-fit relative">
                                        {link.name}
                                    </a>
                                ))}
                            </nav>
                        </div>
                        {/* Col 2 */}
                        <div>
                            <span className="footer-label mb-6 block">Menu</span>
                            <nav className="flex flex-col gap-3 items-center">
                                {links.slice(4).map((link) => (
                                    <a key={link.name} href={link.href} className="footer-nav-link text-foreground hover:text-primary transition-colors text-lg font-medium block w-fit relative">
                                        {link.name}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Contact Info Stack */}
                <div className="flex flex-col gap-10 lg:items-end lg:text-right justify-start">
                    {/* Email Section */}
                    <div className="footer-reveal">
                        <span className="footer-label">Email</span>
                        <a href="mailto:ykhedkar@gmail.com" className="footer-email block">
                            ykhedkar@gmail.com
                        </a>
                    </div>

                    {/* Social Section */}
                    <div className="footer-reveal">
                        <span className="footer-label">Social</span>
                        <div className="footer-socials lg:justify-end">
                            <a href="https://github.com/yashkhedkar" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                                <Github size={24} />
                            </a>
                            <a href="https://linkedin.com/in/yashkhedkar" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                                <Linkedin size={24} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
                                <Twitter size={24} />
                            </a>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>


        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground footer-reveal">
          <div className="flex items-center gap-2">
            <span>Made with Yash</span>
          </div>
          <div className="text-center md:text-right">
            2026 &copy; All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;