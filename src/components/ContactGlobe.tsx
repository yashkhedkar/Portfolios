'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// @ts-ignore
import * as topojson from 'topojson-client';

gsap.registerPlugin(ScrollTrigger);

const ContactGlobe = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // --- Configuration ---
    const width = mountRef.current.offsetWidth;
    const height = mountRef.current.offsetHeight || 500;
    const radius = 1.3;
    const primaryColor = 0xf0562e; // User's theme orange/red

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 1000);
    camera.position.z = 2.5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // --- Helpers ---
    const vertex = (longitude: number, latitude: number, r: number) => {
      const lambda = longitude * Math.PI / 180;
      const phi = latitude * Math.PI / 180;
      return new THREE.Vector3(
        r * Math.cos(phi) * Math.cos(lambda),
        r * Math.sin(phi),
        -r * Math.cos(phi) * Math.sin(lambda)
      );
    };

    // --- Data Loading & Animation ---
    let landMesh: THREE.LineSegments | null = null;
    let pointsMesh: THREE.Points | null = null;
    let originalPositions: Float32Array | null = null;
    let backgroundPositions: Float32Array | null = null;

    // GSAP MatchMedia for cleanup
    const mm = gsap.matchMedia();

    const loadGlobe = async () => {
      try {
        const response = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@1/world/50m.json");
        const topology = await response.json();
        const mesh = topojson.mesh(topology, topology.objects.land);
        
        // 1. Build Geometry vertices
        const allVertices: number[] = []; // For detailed wireframe lines
        const sparseVertices: number[] = []; // For minimized points
        
        const { coordinates } = mesh;
        for (let i = 0; i < coordinates.length; i++) {
          const line = coordinates[i];
          for (let j = 0; j < line.length - 1; j++) {
             const p0 = vertex(line[j][0], line[j][1], radius);
             const p1 = vertex(line[j+1][0], line[j+1][1], radius);
             
             // Full geometry for lines
             allVertices.push(p0.x, p0.y, p0.z);
             allVertices.push(p1.x, p1.y, p1.z);

             // Subsample for points (minimize count)
             // Only take ~10% of points to reduce noise
             if (Math.random() > 0.9) {
                 sparseVertices.push(p0.x, p0.y, p0.z);
                 // We don't need p1 for points, just single dots
             }
          }
        }
        
        // Detailed Geometry for Lines
        const lineGeometry = new THREE.BufferGeometry();
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(allVertices, 3));
        
        // Sparse Geometry for Points
        const pointsGeometry = new THREE.BufferGeometry();
        const float32Sparse = new Float32Array(sparseVertices);
        pointsGeometry.setAttribute('position', new THREE.BufferAttribute(float32Sparse, 3));
        
        // Store target state for animation (using sparse set)
        originalPositions = float32Sparse.slice(); 

        // 2. Create Line Material (Hidden initially)
        const lineMaterial = new THREE.LineBasicMaterial({ 
            color: 0xf0562e,
            transparent: true,
            opacity: 0
        });
        landMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
        
        // 3. Create Points Material (User's "small points")
        const pointsMaterial = new THREE.PointsMaterial({
            color: primaryColor,
            size: 0.02, // Slightly larger individual dots for visibility since fewer
            transparent: true,
            opacity: 1,
            sizeAttenuation: true
        });
        pointsMesh = new THREE.Points(pointsGeometry, pointsMaterial); 

        group.add(landMesh);
        group.add(pointsMesh);

        // --- Scramble Positions for Initial Background State ---
        // Working on the sparse points count
        const count = sparseVertices.length / 3;
        
        // Create a "Background" state where points are formed in rings (BlackHole Style)
        backgroundPositions = new Float32Array(count * 3);
        
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            // Distribute points in flat rings to match black hole background
            const angle = Math.random() * Math.PI * 2;
            const r = 2 + Math.random() * 8; 
            const spreadY = (Math.random() - 0.5) * 0.5;
            
            backgroundPositions[i3] = r * Math.cos(angle);
            backgroundPositions[i3 + 1] = spreadY + (Math.random() * 5 - 2.5); 
            backgroundPositions[i3 + 2] = r * Math.sin(angle) - 5; 
        }
        
        // Start with background positions
        pointsMesh.geometry.setAttribute('position', new THREE.BufferAttribute(backgroundPositions.slice(), 3));

        // --- GSAP Animation ---
        mm.add("(min-width: 1px)", () => {
            if (!mountRef.current) return;
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: mountRef.current,
                    start: "top 80%", 
                    end: "center center",
                    scrub: 2, 
                }
            });
            
            // 1. Coalesce Points: Background -> Globe
            const progress = { t: 0 };
            tl.to(progress, {
                t: 1,
                ease: "power2.out", 
                onUpdate: () => {
                   if (!pointsMesh || !originalPositions || !backgroundPositions) return;
                   const pos = pointsMesh.geometry.attributes.position.array as Float32Array;
                   
                   for(let i=0; i<pos.length; i++) {
                       pos[i] = backgroundPositions[i] + (originalPositions[i] - backgroundPositions[i]) * progress.t;
                   }
                   pointsMesh.geometry.attributes.position.needsUpdate = true;
                }
            });
            
            // 2. Reveal Wireframe & Refine Points
            tl.to(lineMaterial, { opacity: 0.8, duration: 0.5 }, "-=0.2");
            tl.to(pointsMaterial, { size: 0.01, opacity: 0.6, duration: 0.5 }, "<");
        });

      } catch (err) {
        console.error("Error loading globe:", err);
      }
    };

    loadGlobe();

    // --- Interaction State ---
    let mouseX = 0;
    let mouseY = 0;
    let isVisible = true; // Visibility state - Default to true to ensure initial render

    const handleMouseMove = (event: MouseEvent) => {
        // Normalize mouse pos -1 to 1
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- Observer for visibility ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isVisible = entry.isIntersecting;
        });
    }, { threshold: 0.01 });
    
    if (mountRef.current) {
        observer.observe(mountRef.current);
    }

    // --- Animation Loop ---
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      if (!isVisible) return; // Skip rendering when out of view

      if (group) {
          group.rotation.y += 0.002;
          
          // Add Parallax based on mouse (matching BlackHole behavior)
          // We target the group rotation offset
          const targetRotX = mouseY * 0.1;
          const targetRotY = mouseX * 0.1;
          
          group.rotation.x += (targetRotX - group.rotation.x) * 0.05;
          group.rotation.z += (targetRotY - group.rotation.z) * 0.05;
      }
      renderer.render(scene, camera);
    };
    animate();

    // --- Resize ---
    const handleResize = () => {
       if (!mountRef.current) return;
       const w = mountRef.current.offsetWidth;
       const h = mountRef.current.offsetHeight;
       camera.aspect = w / h;
       camera.updateProjectionMatrix();
       renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      mm.revert();
      cancelAnimationFrame(animationId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="globe-container w-full h-full min-h-[400px]" />;
};

export default ContactGlobe;
