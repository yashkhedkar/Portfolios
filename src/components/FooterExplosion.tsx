"use client";

import { useEffect, useRef } from 'react';

const FooterExplosion = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const c = canvas.getContext('2d');
        if (!c) return;

        let animationFrameId: number;
        let mortars: Mortar[] = [];
        let elapsed = 0;
        let randomInterval = randomIntFromRange(80, 170);

        // Variables
        let mouse = {
            x: -100,
            y: -100,
            isDown: false
        };

        // Resize function
        const resize = () => {
             // Ensure we take the specific footer dimensions or better yet the canvas should fill its relative parent
            if (canvas.parentElement) {
                canvas.width = canvas.parentElement.offsetWidth;
                canvas.height = canvas.parentElement.offsetHeight;
            }
        };

        // Event Listeners
        const onMouseMove = (event: MouseEvent) => {
             // Calculate relative mouse position
            const rect = canvas.getBoundingClientRect();
            mouse.x = event.clientX - rect.left;
            mouse.y = event.clientY - rect.top;
        };

        const onMouseDown = () => {
             // Spawn a mortar at mouse x
             const dy = randomIntFromRange(-12, -7);
             mortars.push(new Mortar(mouse.x, canvas.height, 0, dy, 3, 'orange', true));
        };
        
        // Touch support
        const onTouchStart = (event: TouchEvent) => {
             const rect = canvas.getBoundingClientRect();
             const touch = event.touches[0];
             const tx = touch.clientX - rect.left;
             
             const dy = randomIntFromRange(-12, -7);
             mortars.push(new Mortar(tx, canvas.height, 0, dy, 3, 'orange', true));
        }

        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('click', onMouseDown);
        canvas.addEventListener('touchstart', onTouchStart);

        // Utility Functions
        function randomIntFromRange(min: number, max: number) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        // Particle Class
        class Particle {
            x: number;
            y: number;
            dx: number;
            dy: number;
            radius: number;
            color: string;
            timeToLive: number;
            opacity: number;

            constructor(x: number, y: number, dx: number, dy: number, radius: number, color: string) {
                this.x = x;
                this.y = y;
                this.dx = dx;
                this.dy = -dy;
                this.radius = 2; // Fixed small radius
                this.color = color;
                this.timeToLive = 2;
                this.opacity = 1;
                
                // Allow some variation in velocity
                this.dx = Math.random() < 0.5 ? -Math.random() * 3 : Math.random() * 3;
                this.dy = Math.random() * 7;
            }

            update() {
                if (this.y + this.radius + this.dy > canvas!.height) {
                    this.dy = -this.dy * 0.6; // Bounce with energy loss
                } else {
                     this.dy -= 0.1; // Gravity
                }

                this.dy -= 0.15; 
                this.x += this.dx;
                this.y -= this.dy;

                this.timeToLive -= 0.02;
                this.draw();
            }

            draw() {
                if (!c) return;
                this.opacity = Math.max(0, this.timeToLive);
                
                c.save();
                c.beginPath();
                c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                
                c.fillStyle = `hsl(24.6 95% 53.1% / ${this.opacity})`; 
                c.shadowBlur = 10;
                c.shadowColor = `hsl(24.6 95% 53.1% / ${this.opacity})`;
                
                c.fill();
                c.closePath();
                c.restore();
            }
        }

        // Mortar Class
        class Mortar {
            x: number;
            y: number;
            dx: number;
            dy: number;
            radius: number;
            color: string;
            triggered: boolean;
            explosion: Explosion | undefined;
            waveOffset: number;
            isTargeted: boolean;
            
            constructor(x: number, y: number, dx: number, dy: number, radius: number, color: string, isTargeted = false) {
                this.x = x;
                this.y = y;
                this.dx = dx;
                this.dy = dy;
                this.radius = radius;
                this.color = color;
                this.triggered = false;
                this.waveOffset = randomIntFromRange(1, 2);
                this.isTargeted = isTargeted;
            }

            update() {
                this.draw();
                
                // Standard physics
                this.dy += 0.08; 
                
                 if (!this.isTargeted) {
                     this.x += this.dx * Math.sin(Date.now() * 0.005) * 0.1; 
                 }
                
                this.y += this.dy;

                // Explode when it starts falling down (dy becomes positive)
                if (this.dy >= 0) {
                    this.triggered = true;
                }
            }

            draw() {
                 if (!c) return;
                c.beginPath();
                c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                c.fillStyle = 'hsl(24.6 95% 53.1%)';
                c.fill();
                c.closePath();
            }

            explode(callback: () => void) {
                if (!this.explosion) {
                    this.explosion = new Explosion(this);
                    this.radius = 0; // Hide mortar
                }
                this.explosion.update();

                if (this.explosion.particles.length <= 0) {
                    callback();
                }
            }
        }

        // Explosion Class
        class Explosion {
            particles: Particle[];
            source: Mortar;

            constructor(source: Mortar) {
                this.particles = [];
                this.source = source;
                this.init();
            }

            init() {
                const particleCount = 20 + Math.random() * 20;
                for (let i = 0; i < particleCount; i++) {
                    const dx = (Math.random() - 0.5) * 6;
                    const dy = (Math.random() - 0.5) * 6;
                    this.particles.push(new Particle(this.source.x, this.source.y, dx, dy, 2, 'orange'));
                }
            }

            update() {
                for (let i = 0; i < this.particles.length; i++) {
                    this.particles[i].update();
                    if (this.particles[i].timeToLive < 0) {
                        this.particles.splice(i, 1);
                        i--;
                    }
                }
            }
        }

        // Animation Loop
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            c.fillStyle = 'rgba(10, 10, 10, 0.2)'; // Trail effect
            c.fillRect(0, 0, canvas.width, canvas.height);

            // Update Mortars
            for (let i = 0; i < mortars.length; i++) {
                mortars[i].update();
                if (mortars[i].triggered) {
                    mortars[i].explode(() => {
                        mortars.splice(i, 1);
                        i--;
                    });
                }
            }

            // Spawn new mortars automatically
            if (elapsed % randomInterval === 0) {
                const x = randomIntFromRange(50, canvas.width - 50);
                const dy = randomIntFromRange(-12, -7); 
                mortars.push(new Mortar(x, canvas.height + 10, 0, dy, 3, 'orange'));
                randomInterval = randomIntFromRange(50, 150);
                elapsed = 0;
            }
            elapsed++;
        };

        // Initialize
        resize();
        window.addEventListener('resize', resize);
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousemove', onMouseMove);
            canvas.removeEventListener('click', onMouseDown);
            canvas.removeEventListener('touchstart', onTouchStart);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full z-0 mix-blend-screen opacity-60"
            // Start transparent but clickable (ensure z-index is managed by parent or appropriate css)
        />
    );
};

export default FooterExplosion;
