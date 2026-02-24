"use client";

import { useRef, useLayoutEffect, useMemo, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GlobeSection.css';

gsap.registerPlugin(ScrollTrigger);

// Custom Grid Globe for clean lat/long lines
const GlobeGrid = () => {
    const groupRef = useRef<THREE.Group>(null);
    const { viewport } = useThree();

    // Responsive Scale
    useEffect(() => {
        if (!groupRef.current) return;
        // Globe radius is ~2.8 -> diameter ~5.6
        // If viewport width is small, scale down to fit with margin
        const targetScale = Math.min(1, viewport.width / 6.5);
        groupRef.current.scale.set(targetScale, targetScale, targetScale);
    }, [viewport.width]);
    
    // Create geometry for lat/long lines
    const geometry = useMemo(() => {
        const points: number[] = [];
        const radius = 2.8;
        const latCount = 10; // Number of horizontal rings
        const longCount = 12; // Number of vertical lines
        
        // Latitudes (Horizontal Rings)
        for (let i = 0; i <= latCount; i++) {
            // Determine y height and ring radius at this height
            const phi = (Math.PI / latCount) * i; // 0 to PI
            const y = radius * Math.cos(phi);
            const r = radius * Math.sin(phi);
            
            // Create circle at this stack
            // 64 segments for smooth circle
            for (let j = 0; j <= 64; j++) {
                const theta = (Math.PI * 2 / 64) * j;
                const thetaNext = (Math.PI * 2 / 64) * (j + 1);
                
                points.push(
                    r * Math.cos(theta), y, r * Math.sin(theta),
                    r * Math.cos(thetaNext), y, r * Math.sin(thetaNext)
                );
            }
        }
        
        // Longitudes (Vertical circles)
        for (let i = 0; i < longCount; i++) {
            const theta = (Math.PI * 2 / longCount) * i;
            
            for (let j = 0; j <= 64; j++) {
                const phi = (Math.PI * 2 / 64) * j;
                const phiNext = (Math.PI * 2 / 64) * (j + 1);
                
                const x1 = radius * Math.sin(phi) * Math.cos(theta);
                const y1 = radius * Math.cos(phi);
                const z1 = radius * Math.sin(phi) * Math.sin(theta);
                
                const x2 = radius * Math.sin(phiNext) * Math.cos(theta);
                const y2 = radius * Math.cos(phiNext);
                const z2 = radius * Math.sin(phiNext) * Math.sin(theta);
                
                points.push(x1, y1, z1, x2, y2, z2);
            }
        }
        
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
        return geo;
    }, []);

    useLayoutEffect(() => {
        if (!groupRef.current) return;
        
        const ctx = gsap.context(() => {
            // Continuous Rotation + Scroll Scrub
            // We animate the group rotation
            gsap.to(groupRef.current!.rotation, {
                y: Math.PI * 8, 
                ease: "none",
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1 
                }
            });
            
            gsap.to(groupRef.current!.rotation, {
                x: 0.3, 
                ease: "none",
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1
                }
            });

             // Parallax Y movement
            gsap.to(groupRef.current!.position, {
                y: -1.5, 
                ease: "none",
                scrollTrigger: {
                    trigger: "body",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1
                }
            });
        });
        
        return () => ctx.revert();
    }, []);

    return (
        <group ref={groupRef}>
             <lineSegments geometry={geometry}>
                <lineBasicMaterial color="#ffffff" opacity={0.6} transparent linewidth={1} />
             </lineSegments>
             {/* Add an inner dark sphere to obscure background lines slightly for depth */}
             <mesh>
                <sphereGeometry args={[2.75, 32, 32]} />
                <meshBasicMaterial color="black" transparent opacity={0.8} side={THREE.BackSide} />
             </mesh>
        </group>
    );
};

const Marquee = () => {
    // List of locations/clients similar to the reference
    const items = [
        "TORONTO, CANADA", 
        "MADRID, SPAIN", 
        "NEW YORK, USA", 
        "ROTTERDAM, NETHERLANDS", 
        "HELSINKI, FINLAND", 
        "FRANKFURT, GERMANY"
    ];

    // Duplicate list to create seamless loop
    const displayItems = [...items, ...items, ...items];

    return (
        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 overflow-hidden py-4 z-10 pointer-events-none mix-blend-difference">
            <div className="flex whitespace-nowrap animate-marquee">
                {displayItems.map((item, index) => (
                    <div key={index} className="flex items-center mx-4 md:mx-6">
                        <span className="text-xs sm:text-sm md:text-base font-mono tracking-[0.2em] text-foreground/70">
                            {item}
                        </span>
                        <span className="ml-4 md:ml-6 text-primary text-[10px] md:text-xs">✦</span>
                    </div>
                ))}
            </div>
        </div>
    );
}; 

const GlobeSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        // Parallax for the background grid
        gsap.to(bgRef.current, {
            y: '30%',
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[60vh] min-h-[400px] md:h-[80vh] bg-background overflow-hidden flex items-center justify-center">
      
      {/* Background Grid for Parallax */}
      <div 
        ref={bgRef}
        className="absolute -top-[50%] left-0 w-full h-[200%] opacity-[0.15] pointer-events-none z-0"
        style={{
            backgroundImage: `linear-gradient(to right, #444 1px, transparent 1px),
                              linear-gradient(to bottom, #444 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
        }}
      />

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <GlobeGrid />
        </Canvas>
      </div>

      {/* Scrolling Text Overlay */}
      <Marquee />
      
    </section>
  );
};

export default GlobeSection;
