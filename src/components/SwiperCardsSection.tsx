"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Parallax, Mousewheel } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/parallax';

import ScrollFloat from './ScrollFloat';

import './swipercards.css';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop',
    title: 'Visualizing UI/UX Design',
    subtitle: 'Aesthetics & Functionality',
    desc: 'Crafting intuitive, user-centric interfaces that blend aesthetics with functionality to create seamless digital experiences.'
  },
  {
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
    title: 'Engineering Frontend Logic',
    subtitle: 'Responsive & Performant',
    desc: 'Building responsive, high-performance web applications using modern frameworks like React, Next.js, and Tailwind CSS.'
  },
  {
    image: 'https://images.unsplash.com/photo-1558494949-efc02584299d?q=80&w=2070&auto=format&fit=crop',
    title: 'Architecting Backend Systems',
    subtitle: 'Scalable & Secure',
    desc: 'Developing robust APIs, scalable databases, and secure server-side logic to power complex data-driven applications.'
  },
  {
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop',
    title: 'Mastering Fullstack Dev',
    subtitle: 'End-to-End Solutions',
    desc: 'Bridging the gap between client and server to deliver end-to-end solutions that are scalable, efficient, and reliable.'
  },
  {
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
    title: '3D Developer',
    subtitle: 'Immersive WebGL Experiences',
    desc: 'Creating immersive 3D web experiences using technologies like Three.js and WebGL to bring interfaces to life with depth and interactivity.'
  }
];

export default function SwiperCardsSection() {
  return (
    <article id="services" className="swiper-cards-section">
      <div className="container mx-auto max-w-7xl px-6 pt-24 pb-8 relative z-10 pl-6 md:pl-10">
         <span className="text-primary text-sm font-medium uppercase block mb-1 font-roboto">
            Services
         </span>
         <div className="flex flex-col md:block">
            <ScrollFloat 
                animationDuration={1} 
                ease='back.inOut(2)' 
                scrollStart='center bottom+=50%' 
                scrollEnd='bottom bottom-=40%' 
                stagger={0.03}
                containerClassName="my-0 inline-block align-top"
                textClassName="text-[56px] sm:text-7xl md:text-[80px] font-normal text-white font-roboto"
            >
                WHAT
            </ScrollFloat>
            <ScrollFloat 
                animationDuration={1} 
                ease='back.inOut(2)' 
                scrollStart='center bottom+=50%' 
                scrollEnd='bottom bottom-=40%' 
                stagger={0.03}
                containerClassName="my-0 inline-block text-primary align-top ml-4"
                textClassName="text-[56px] sm:text-7xl md:text-[80px] font-normal font-roboto"
            >
                I DO
            </ScrollFloat>
         </div>
      </div>
      <section className="sectionWrapper">
        <Swiper
          modules={[Parallax, Mousewheel, EffectCoverflow]}
          direction="horizontal"
          loop={false}
          speed={700}
          slidesPerView={4}
          spaceBetween={60}
          mousewheel={{
            sensitivity: 1,
            releaseOnEdges: true,
          }}
          parallax={true}
          centeredSlides={true}
          grabCursor={true}
          effect="coverflow"
          coverflowEffect={{
            rotate: 20,
            slideShadows: true,
          }}
          
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 60 },
            600: { slidesPerView: 2, spaceBetween: 60 },
            1000: { slidesPerView: 3, spaceBetween: 60 },
            1400: { slidesPerView: 4, spaceBetween: 60 },
            2300: { slidesPerView: 5, spaceBetween: 60 },
            2900: { slidesPerView: 6, spaceBetween: 60 },
          }}
          className="swiper"
        >
          <div
            className="parallax-bg"
            data-swiper-parallax="600"
            data-swiper-parallax-scale="0.85"
            slot="container-start"
          ></div>

          {slides.map((slide, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <div
                className="cardPopout"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  width="800"
                  height="400"
                />

                <h2
                  className="title"
                >
                  {slide.title}
                </h2>

                <h4
                  className="subtitle"
                >
                  {slide.subtitle}
                </h4>

                <figcaption
                >
                  <p>{slide.desc}</p>
                </figcaption>

                <a
                  href="#"
                  title="Continue Reading"
                  onClick={(e) => e.preventDefault()}
                >
                  Continue Reading
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-right-short"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                    />
                  </svg>
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </article>
  );
}
