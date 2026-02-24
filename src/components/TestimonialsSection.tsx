import React, { useState, useEffect, useRef } from 'react';
import './TestimonialsSection.css';
import ScrollFloat from './ScrollFloat';

const testimonials = [
  {
    quote: "I was impressed by the food — every dish is bursting with flavor! And I could really tell that they use high-quality ingredients. The staff was friendly and attentive, going the extra mile. I'll definitely be back for more!",
    name: "Tamar Mendelson",
    designation: "Restaurant Critic",
    src: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote: "This place exceeded all expectations! The atmosphere is inviting, and the staff truly goes above and beyond to ensure a fantastic visit. I'll definitely keep returning for more exceptional dining experience.",
    name: "Joe Charlescraft",
    designation: "Frequent Visitor",
    src: "https://images.unsplash.com/photo-1628749528992-f5702133b686?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
  },
  {
    quote: "Shining Yam is a hidden gem! From the moment I walked in, I knew I was in for a treat. The impeccable service and overall attention to detail created a memorable experience. I highly recommend it!",
    name: "Martina Edelweist",
    designation: "Satisfied Customer",
    src: "https://images.unsplash.com/photo-1524267213992-b76e8577d046?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D",
  },
];

// ...existing imports...
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ...testimonials array...

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.testimonials-subtitle',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testimonials-title',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const autoplayInterval = setInterval(() => {
      if (!isHovered) {
        handleNext();
      }
    }, 5000);

    return () => clearInterval(autoplayInterval);
  }, [isHovered, activeIndex]);

  // Use useLayoutEffect to prevent flash of unstyled content
  React.useLayoutEffect(() => {
      animateWords();
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const animateWords = () => {
      if (!quoteRef.current) return;
      
      const words = quoteRef.current.querySelectorAll('.word');
      words.forEach((word: any, index) => {
          word.style.opacity = '0';
          word.style.transform = 'translateY(10px)';
          word.style.filter = 'blur(10px)';
          word.style.transition = 'none'; // Reset to allow immediate hide

          // Force reflow
          void word.offsetWidth;

          setTimeout(() => {
              word.style.transition = 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out, filter 0.2s ease-in-out';
              word.style.opacity = '1';
              word.style.transform = 'translateY(0)';
              word.style.filter = 'blur(0)';
          }, index * 20);
      });
  };

  const currentTestimonial = testimonials[activeIndex];

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 bg-transparent flex flex-col justify-center items-center">
      <div className="container mx-auto max-w-7xl px-6 mb-12">
        <div className="testimonials-title">
          <span className="testimonials-subtitle text-primary text-sm font-medium uppercase block font-roboto">
            Client Feedback
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
                CLIENT
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
                FEEDBACK
            </ScrollFloat>
          </div>
        </div>
      </div>
    
      <div className="testimonial-container">
        <div className="testimonial-grid">
          <div className="image-container">
            {testimonials.map((testimonial, index) => {
              const offset = index - activeIndex;
              const absOffset = Math.abs(offset);
              const zIndex = testimonials.length - absOffset;
              const opacity = index === activeIndex ? 1 : 0.7;
              const scale = 1 - absOffset * 0.15;
              const translateY = offset === -1 ? '-20%' : offset === 1 ? '20%' : '0%';
              const rotateY = offset === -1 ? '15deg' : offset === 1 ? '-15deg' : '0deg';

              return (
                <img
                  key={index}
                  src={testimonial.src}
                  alt={testimonial.name}
                  className="testimonial-image"
                  style={{
                    zIndex: zIndex,
                    opacity: opacity,
                    transform: `translateY(${translateY}) scale(${scale}) rotateY(${rotateY})`,
                  }}
                />
              );
            })}
          </div>
          <div className="testimonial-content">
            <div>
              {/* Quote Icon */}
              <div className="quote-icon mb-6">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 7.55228 14.017 7V3H19.017C20.6739 3 22.017 4.34315 22.017 6V15C22.017 16.6569 20.6739 18 19.017 18H16.017V21H14.017ZM5.01697 21L5.01697 18C5.01697 16.8954 5.9124 16 7.01697 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.01697C5.46468 8 5.01697 7.55228 5.01697 7V3H10.017C11.6738 3 13.017 4.34315 13.017 6V15C13.017 16.6569 11.6738 18 10.017 18H7.01697V21H5.01697Z" fill="currentColor"/>
                </svg>
              </div>
              <h3 className="name">{currentTestimonial.name}</h3>
              <p className="designation">{currentTestimonial.designation}</p>
              <p className="quote" ref={quoteRef}>
                 {currentTestimonial.quote.split(' ').map((word, i) => (
                     <span key={i} className="word">{word}</span>
                 ))}
              </p>
            </div>
            <div className="arrow-buttons">
              <button 
                className="arrow-button prev-button" 
                onClick={handlePrev}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
              </button>
              <button 
                className="arrow-button next-button" 
                onClick={handleNext}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
