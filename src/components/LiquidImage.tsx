'use client';

import { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface LiquidImageProps {
  image: string;
  isHovered: boolean;
  className?: string; // To handle styling like standard img
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uHover;
  uniform vec2 uResolution;
  uniform vec2 uImageSize;
  varying vec2 vUv;

  // Simple pseudo-random noise
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    // Aspect Ratio Fix - Cover
    vec2 ratio = vec2(
      min((uResolution.x / uResolution.y) / (uImageSize.x / uImageSize.y), 1.0),
      min((uResolution.y / uResolution.x) / (uImageSize.y / uImageSize.x), 1.0)
    );
    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    // Liquid / Glitch Effect
    float dist = 2.0 * uHover; // Strength based on hover
    
    // Wave distortion
    float wave = sin(uv.y * 10.0 + uTime) * 0.02 * uHover;
    float waveX = cos(uv.x * 10.0 + uTime) * 0.02 * uHover;
    
    vec2 distortedUv = uv + vec2(wave, waveX);

    // RGB Shift
    float shift = 0.02 * uHover;
    
    float r = texture2D(uTexture, distortedUv + vec2(shift, 0.0)).r;
    float g = texture2D(uTexture, distortedUv).g;
    float b = texture2D(uTexture, distortedUv - vec2(shift, 0.0)).b;

    // Scanline effect (optional, subtle)
    // float scanline = sin(uv.y * 800.0) * 0.04 * uHover;
    
    // Alpha for edges? No, we want full image. 
    // Just clamp UVs to prevent wrapping artifacts if needed, 
    // but default texture wrap usually clamps or repeats. 
    // Let's hide wrapped pixels if possible, or leave it for glitch effect.
    
    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

const LiquidImage = ({ image, isHovered, className }: LiquidImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.OrthographicCamera;
    renderer: THREE.WebGLRenderer;
    material: THREE.ShaderMaterial;
    mesh: THREE.Mesh;
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    // Setup
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Material
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(image);
    // texture.minFilter = THREE.LinearFilter;
    // texture.magFilter = THREE.LinearFilter;
    
    // We need image dimensions for aspect ratio correction
    const imgObj = new Image();
    imgObj.src = image;
    
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexture: { value: texture },
        uTime: { value: 0 },
        uHover: { value: 0 },
        uResolution: { value: new THREE.Vector2(width, height) },
        uImageSize: { value: new THREE.Vector2(1, 1) }, // Placeholder
      },
    });

    imgObj.onload = () => {
      material.uniforms.uImageSize.value.set(imgObj.width, imgObj.height);
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    sceneRef.current = {
        scene,
        camera,
        renderer,
        material,
        mesh,
        animationId: 0,
    };

    // Resize
    const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
            if (entry.target === containerRef.current) {
                const { width, height } = entry.contentRect;
                renderer.setSize(width, height);
                material.uniforms.uResolution.value.set(width, height);
            }
        }
    });

    resizeObserver.observe(containerRef.current);

    // Animation Loop
    const animate = (time: number) => {
        material.uniforms.uTime.value = time * 0.001;
        renderer.render(scene, camera);
        sceneRef.current!.animationId = requestAnimationFrame(animate);
    };
    animate(0);

    return () => {
        resizeObserver.disconnect();
        cancelAnimationFrame(sceneRef.current!.animationId);
        renderer.dispose();
        geometry.dispose();
        material.dispose();
    };
  }, [image]);

  // Handle Hover Animation
  useEffect(() => {
    if (!sceneRef.current) return;
    
    gsap.to(sceneRef.current.material.uniforms.uHover, {
      value: isHovered ? 1 : 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  }, [isHovered]);

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default LiquidImage;
