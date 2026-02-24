"use client"

import type React from "react"
import "./projects.css"
import type { Project } from "@/lib/projects"
import { useRouter } from "next/navigation"

interface ProjectSlideProps {
  slide: Project
  previous?: boolean
}

export default function ProjectSlide({ slide, previous }: ProjectSlideProps) {
  const router = useRouter();

  const handleProjectClick = () => {
    // Fallback to ID if slug is missing (handles stale data/HMR issues)
    const identifier = slide.slug || slide.id;
    router.push(`/projects/${identifier}`);
  };

  return (
    <div
      className="slide"
      style={
        {
          "--stats": slide.stats.length,
        } as React.CSSProperties
      }
      data-previous={previous || undefined}
    >
      <div className="slide-name">{slide.title}</div>
      <img 
        className="slide-image cursor-hover" 
        src={slide.image} 
        alt={slide.title}
        data-cursor-text="View Details"
        onClick={handleProjectClick}
      />
      
      {/* Description mapped to Quote bubble area */}
      {slide.description && <div className="slide-quote">{slide.description}</div>}
      
      {slide.stats.map((stat, i) => {
        return (
          <div
            className="slide-stat"
            key={i}
            style={
              {
                "--i": i,
              } as React.CSSProperties
            }
          >
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
          </div>
        )
      })}
    </div>
  )
}
