'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const cursorText = cursorTextRef.current;

    if (!cursor || !follower) return;

    // Initial Hide
    gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0 });
    gsap.set(follower, { xPercent: -50, yPercent: -50, scale: 0 });

    const onMouseMove = (e: MouseEvent) => {
      // Show on first move
      gsap.to([cursor, follower], { scale: 1, duration: 0.3 });

      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
        ease: 'none',
      });
      
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const  onMouseDown = () => {
        gsap.to(cursor, { scale: 0.5, duration: 0.1 });
        gsap.to(follower, { scale: 1.5, duration: 0.1 });
    }

    const onMouseUp = () => {
        gsap.to(cursor, { scale: 1, duration: 0.1 });
        gsap.to(follower, { scale: 1, duration: 0.1 });
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Add hover effect for links and buttons
    const handleLinkHover = (e: Event) => {
        const target = e.target as HTMLElement;
        const text = target.getAttribute('data-cursor-text');

        if (text && cursorText) {
            cursorText.innerText = text;
            gsap.to(follower, { 
                scale: 4, 
                backgroundColor: '#ffffff',
                borderColor: 'transparent',
                mixBlendMode: 'normal',
                duration: 0.3 
            });
            gsap.to(cursorText, { opacity: 1, duration: 0.2 });
            gsap.to(cursor, { opacity: 0, duration: 0.3 });
            // Make text visible against white bg
            follower.style.color = '#000000';
        } else {
            // Standard Hover
            gsap.to(follower, { scale: 2, duration: 0.3 });
            gsap.to(cursor, { opacity: 0, duration: 0.3 });
        }
    };

    const handleLinkLeave = () => {
        gsap.to(follower, { 
            scale: 1, 
            backgroundColor: 'transparent',
            borderColor: '#ffffff',
            mixBlendMode: 'difference',
            color: 'inherit',
            duration: 0.3 
        });
        if (cursorText) {
            gsap.to(cursorText, { opacity: 0, duration: 0.2 });
        }
        gsap.to(cursor, { opacity: 1, duration: 0.3 });
    };

    const links = document.querySelectorAll('a, button, .cursor-hover');
    links.forEach(link => {
        link.addEventListener('mouseenter', handleLinkHover);
        link.addEventListener('mouseleave', handleLinkLeave);
    });
    
    // Observer for dynamic elements
    const observer = new MutationObserver(() => {
        const newLinks = document.querySelectorAll('a, button, .cursor-hover');
        newLinks.forEach(link => {
            link.removeEventListener('mouseenter', handleLinkHover);
            link.removeEventListener('mouseleave', handleLinkLeave);
            link.addEventListener('mouseenter', handleLinkHover);
            link.addEventListener('mouseleave', handleLinkLeave);
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      observer.disconnect();
      
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkHover);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center overflow-hidden"
      >
        <span ref={cursorTextRef} className="text-[3px] font-bold uppercase tracking-widest opacity-0 text-black text-center whitespace-nowrap leading-none">
            
        </span>
      </div>
    </>
  );
};

export default CustomCursor;
