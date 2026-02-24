"use client";

import React from 'react';
import './TechStackStrip.css';

const techs = [
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#ffffff" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Node.js", color: "#339933" },
  { name: "Tailwind CSS", color: "#06B6D4" },
  { name: "Vue.js", color: "#4FC08D" },
  { name: "PostgreSQL", color: "#4169E1" },
  { name: "Three.js", color: "#ffffff" },
  { name: "Python", color: "#3776AB" },
  { name: "AWS", color: "#FF9900" },
  { name: "Figma", color: "#F24E1E" },
  { name: "Docker", color: "#2496ED" },
];

export default function TechStackStrip() {
  return (
    <div className="tech-stack-strip">
       <div className="marquee-wrapper">
         <div className="marquee-content">
            {/* Repeat 4 times to ensure smooth infinite scroll on large screens */}
            {[...techs, ...techs, ...techs, ...techs].map((tech, index) => (
               <div 
                 key={index} 
                 className="tech-item"
                 style={{ "--hover-color": tech.color } as React.CSSProperties}
               >
                  <span className="tech-name">{tech.name}</span>
                  <span className="separator">+</span>
               </div>
            ))}
         </div>
       </div>
    </div>
  );
}
