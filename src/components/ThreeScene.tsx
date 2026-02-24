import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ThreeScene = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particles: THREE.Points;
    tubeMesh: THREE.Mesh;
    path: THREE.CatmullRomCurve3;
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    // Fog helps with depth, keeping it black is fine as it fades distant objects to black
    // which matches the likely dark background of the global theme.
    scene.fog = new THREE.Fog(0x000000, 100, 800);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent background 

    // Create path for camera to follow
    const points = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(5, -5, 100),
      new THREE.Vector3(20, 0, 200),
      new THREE.Vector3(30, -10, 300),
      new THREE.Vector3(0, 0, 400),
    ];
    const path = new THREE.CatmullRomCurve3(points);

    // Initial camera position
    const initialPoint = path.getPointAt(0);
    const initialLookAtPoint = path.getPointAt(0.01);
    camera.position.copy(initialPoint);
    camera.lookAt(initialLookAtPoint);

    // Create texture for the data stream effect
    const createStreamTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 128; // Higher res for sharper lines
        canvas.height = 128;
        const context = canvas.getContext('2d');
        if (!context) return new THREE.Texture();
        
        // Background
        context.fillStyle = '#000000'; // Clear/Black
        context.fillRect(0, 0, 128, 128);
        
        // Glowing Line - Subtle
        const gradient = context.createLinearGradient(0, 0, 128, 0);
        gradient.addColorStop(0, 'rgba(240, 86, 46, 0)'); // Fully transparent start
        gradient.addColorStop(0.5, 'rgba(240, 86, 46, 0.4)'); // Reduced opacity for subtlety
        gradient.addColorStop(1, 'rgba(240, 86, 46, 0)'); // Fully transparent end
        
        context.fillStyle = gradient;
        context.fillRect(0, 0, 128, 2); // Thinner line for elegance
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(50, 4); 
        return texture;
    };

    const streamTexture = createStreamTexture();

    // Create tube geometry
    const tubeGeometry = new THREE.TubeGeometry(path, 200, 10, 20, false);
    const tubeMaterial = new THREE.MeshBasicMaterial({
      map: streamTexture,
      transparent: true,
      opacity: 0.3, // Lower overall opacity
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false, 
    });
    const tubeMesh = new THREE.Mesh(tubeGeometry, tubeMaterial);
    scene.add(tubeMesh);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000; // Reduced count for performance
    const positions = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = Math.random() * 500 - 250;
      positions[i * 3 + 1] = Math.random() * 500 - 250;
      positions[i * 3 + 2] = Math.random() * 1000 - 500;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xf0562e, // Primary orange
      size: 0.5,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.8, // Increased opacity
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Store refs
    sceneRef.current = {
      scene,
      camera,
      renderer,
      particles,
      tubeMesh,
      path,
      animationId: 0,
    };

    // ScrollTrigger animation
    // We look for a specific trigger in the parent component
    const triggerElement = document.querySelector('.what-i-do-container');

    if (triggerElement) {
        ScrollTrigger.create({
        trigger: triggerElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
            const progress = self.progress;
            
            // Move Camera
            const newPath = path.getPointAt(progress);
            camera.position.set(newPath.x, newPath.y, newPath.z);
            const lookAtPoint = path.getPointAt(Math.min(progress + 0.01, 0.99));
            camera.lookAt(lookAtPoint);

            // Animate Line Texture based on scroll
            // This creates the "Data Stream" moving effect triggers by scroll
            if (tubeMesh.material instanceof THREE.MeshBasicMaterial && tubeMesh.material.map) {
                tubeMesh.material.map.offset.x = -progress * 20; // Flow backwards or forwards
            }
        },
        });
    }


    


    // Animation loop
    const animate = () => {
      sceneRef.current!.animationId = requestAnimationFrame(animate);
      
      // Continuous rotation
      particles.rotation.z += 0.0003;



      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {

      window.removeEventListener('resize', handleResize);
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      // Kill triggers created by this component
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === triggerElement) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
    />
  );
};

export default ThreeScene;
