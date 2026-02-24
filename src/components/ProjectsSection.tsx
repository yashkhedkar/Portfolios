"use client"

import { useState, useMemo } from "react"
import ProjectSlide from "@/components/ProjectSlide"
import ScrollFloat from "./ScrollFloat"
import "./projects.css"

import { projects } from "@/lib/projects";

export default function ProjectsSection() {
  // Added comment to force HMR refresh for projects data
  const [slideIndex, setSlideIndex] = useState(0)
  const [prevSlideIndex, setPrevSlideIndex] = useState<number | null>(null)

  const activeSlide = useMemo(() => projects[slideIndex], [slideIndex])
  const prevSlide = useMemo(() => projects[prevSlideIndex ?? -1], [prevSlideIndex])

  function nextSlide() {
    setPrevSlideIndex(slideIndex)
    setSlideIndex((slideIndex + 1) % projects.length)
  }

  function handlePrevSlide() {
    setPrevSlideIndex(slideIndex)
    setSlideIndex((slideIndex - 1 + projects.length) % projects.length)
  }

  return (
    <section id="works" className="projects-section-container">
      {/* SECTION HEADER to match portfolio consistency */}
      <div className="w-full max-w-7xl px-6 mx-auto relative z-20 text-left mt-20 mb-8">
        <ScrollFloat 
          containerClassName="mb-4 block" 
          textClassName="text-primary text-sm font-medium uppercase font-roboto"
          animationDuration={1} 
          ease='back.inOut(2)' 
          scrollStart='center bottom+=50%' 
          scrollEnd='bottom bottom-=40%' 
          stagger={0.03}
        >
          Featured Work
        </ScrollFloat>
        <div className="flex flex-col md:block mb-8">
           <ScrollFloat 
                animationDuration={1} 
                ease='back.inOut(2)' 
                scrollStart='center bottom+=50%' 
                scrollEnd='bottom bottom-=40%' 
                stagger={0.03}
                containerClassName="my-0 inline-block align-top" 
                textClassName="text-[56px] sm:text-7xl md:text-[80px] font-normal text-white font-roboto"
            >
                Selected
           </ScrollFloat>
           <ScrollFloat 
                animationDuration={1} 
                ease='back.inOut(2)' 
                scrollStart='center bottom+=50%' 
                scrollEnd='bottom bottom-=40%' 
                stagger={0.03}
                containerClassName="my-0 inline-block text-primary align-top md:ml-4" 
                textClassName="text-[56px] sm:text-7xl md:text-[80px] font-normal font-roboto"
            >
                Projects
           </ScrollFloat>
        </div>
      </div>

      <div className="app">
        <svg
          viewBox="0 0 100 100"
          className="dashes"
        >
          <circle r="45" cx="50" cy="50" />
        </svg>

        <button className="button -prev" onClick={handlePrevSlide} aria-label="Previous Project">
          Prev
          <br />
          Project
        </button>

        <ProjectSlide slide={activeSlide} key={slideIndex} />
        {prevSlide?.id && <ProjectSlide slide={prevSlide} key={prevSlideIndex + "prev"} previous />}

        <button className="button -next" onClick={nextSlide} aria-label="Next Project">
          Next
          <br />
          Project
        </button>
      </div>
    </section>
  )
}