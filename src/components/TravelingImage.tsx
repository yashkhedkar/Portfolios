'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TravelingImage = () => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Only run on desktop
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // We need to wait for layout to be stable and check for target elements
      const timer = setTimeout(() => {
        const heroWrapper = document.getElementById('hero-image-wrapper');
        const aboutDesktop = document.getElementById('about-image-desktop'); // The actual static image
        
        if (!heroWrapper || !aboutDesktop || !imgRef.current) return;

        // 1. Get initial position of Hero Card
        const heroRect = heroWrapper.getBoundingClientRect();
        
        // 2. Set initial fixed position to match Hero Card exactly
        gsap.set(imgRef.current, {
          top: heroRect.top,
          left: heroRect.left,
          width: heroRect.width,
          height: heroRect.height,
          borderRadius: '1rem',
          opacity: 1,
          display: 'block' // Ensure visible on desktop
        });

        // 3. Define the destination based on the About Target's real layout position
        const aboutRect = aboutDesktop.getBoundingClientRect();
        
        // Destination X is simply the static image's left position (it doesn't change horizontally)
        const destX = aboutRect.left;
        
        // Destination Y: When the Trigger ends (center center), the element will be in the middle of the viewport
        const destY = (window.innerHeight - heroRect.height) / 2;
        
        const deltaX = destX - heroRect.left;
        const deltaY = destY - heroRect.top;

        // 4. Create ScrollTrigger Animation with Curved Path and Rotation
        gsap.to(imgRef.current, {
          keyframes: {
            "0%": { x: 0, y: 0, rotation: 0, scale: 1, borderRadius: '1rem' },
            "50%": { 
              x: deltaX * 0.5 + 200, 
              y: deltaY * 0.5, 
              rotation: 180,
              scale: 1.1, 
              borderRadius: '50%' 
            },
            "100%": { 
              x: deltaX, 
              y: deltaY, 
              rotation: 360, 
              scale: 1,
              borderRadius: '1rem' 
            }
          },
          ease: 'power1.inOut', // Smoother easing
          scrollTrigger: {
            trigger: '#about-image-desktop', // Trigger specifically on the destination element
            start: 'top bottom', // Start when top of target hits bottom of viewport
            end: 'center center', // End precisely when target is centered
            scrub: 0.5, // Reduced scrub for tighter sync
          }
        });

        // 5. Hide the original hero image
        gsap.set('#hero-image-wrapper', { opacity: 0 });

        // 6. Landing & Exit Strategy
        // When we reach the center of 'About', we want to SWAP the traveling image with the static one.
        ScrollTrigger.create({
          trigger: '#about-image-desktop',
          start: 'center center', // distinct point where flight lands
          onEnter: () => {
            // Swap: Hide Traveling, Show Static
            gsap.set(imgRef.current, { opacity: 0 });
            gsap.set('#about-image-desktop', { opacity: 1 });
            console.log("Landed! Swapped to static.");
          },
          onLeaveBack: () => {
            // Reverse Swap: Show Traveling, Hide Static
            // Only if we are scrolling back UP (leaving the center point upwards)
            gsap.set(imgRef.current, { opacity: 1 });
            gsap.set('#about-image-desktop', { opacity: 0 });
            console.log("Taking off! Swapped to traveling.");
          }
        });

      }, 100);

      return () => clearTimeout(timer);
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <img
        ref={imgRef}
        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80"
        alt="User Profile"
        className="absolute object-cover shadow-2xl border-2 border-primary/40 bg-surface hidden lg:block" 
        style={{ 
          opacity: 0, 
          borderRadius: '1rem',
          transformOrigin: 'center center'
        }} 
      />
    </div>
  );
};

export default TravelingImage;
