'use client';

import { useEffect, useRef } from 'react';
import * as easingUtils from 'easing-utils';

export default function BlackHoleBackground(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let render = {
      width: 0,
      hWidth: 0,
      height: 0,
      hHeight: 0,
      dpi: 0
    };

    // Interaction State

    let currentSpeed = 0.0001;

    let discs: any[] = [];
    let dots: any[] = [];
    let startDisc: any = {};
    let animationFrameId: number;

    const tweenValue = (start: number, end: number, p: number, ease: string | false = false) => {
      const delta = end - start;
      // @ts-ignore
      const easeFn = easingUtils[ease ? "ease" + ease.charAt(0).toUpperCase() + ease.slice(1) : "linear"];
      return start + delta * easeFn(p);
    };

    const tweenDisc = (disc: any) => {
      const scaleX = tweenValue(1, 0, disc.p, 'outCubic');
      const scaleY = tweenValue(1, 0, disc.p, 'outExpo');

      disc.sx = scaleX;
      disc.sy = scaleY;

      disc.w = startDisc.w * scaleX;
      disc.h = startDisc.h * scaleY;

      // Apply mouse parallax
      // Shift more at the far end (p=1) to create a 'looking around' effect
      // The near end (p=0) stays relatively fixed
      disc.x = startDisc.x;
      disc.y = startDisc.y + disc.p * startDisc.h * 1;

      return disc;
    };

    const setDiscs = () => {
      discs = [];

      startDisc = {
        x: render.width * 0.5,
        y: render.height * 0,
        w: render.width * 1,
        h: render.height * 1
      };

      const totalDiscs = 150;

      for (let i = 0; i < totalDiscs; i++) {
        const p = i / totalDiscs;
        const disc = tweenDisc({ p });
        discs.push(disc);
      }
    };

    const setDots = () => {
      dots = [];
      const totalDots = 20000;

      for (let i = 0; i < totalDots; i++) {
        const disc = discs[Math.floor(discs.length * Math.random())];
        const dot = {
          d: disc,
          a: 0,
          // Orange/Red colors: High Red, Low-Mid Green, Low Blue
          c: `rgb(${200 + Math.random() * 55}, ${50 + Math.random() * 100}, ${Math.random() * 50})`,
          p: Math.random(),
          o: Math.random()
        };
        dots.push(dot);
      }
    };

    const setCanvasSize = () => {
      const rect = container.getBoundingClientRect();

      render = {
        width: rect.width,
        hWidth: rect.width * 0.5,
        height: rect.height,
        hHeight: rect.height * 0.5,
        dpi: window.devicePixelRatio
      };

      canvas.width = render.width * render.dpi;
      canvas.height = render.height * render.dpi;
    };

    const setGraphics = () => {
      setDiscs();
      setDots();
    };

    const setSizes = () => {
      setCanvasSize();
      setGraphics();
    };

    const drawDiscs = () => {
      ctx.strokeStyle = '#310'; // Dark orange/red stroke
      ctx.lineWidth = 1;

      discs.forEach((disc) => {
        ctx.beginPath();
        ctx.globalAlpha = disc.a;
        ctx.ellipse(
          disc.x,
          disc.y + disc.h,
          disc.w,
          disc.h,
          0,
          0,
          Math.PI * 2
        );
        ctx.stroke();
        ctx.closePath();
      });
    };

    const drawDots = () => {
      dots.forEach((dot) => {
        const { d, a, p, c, o } = dot;
        
        const _p = d.sx * d.sy;
        ctx.fillStyle = c;

        const newA = a + (Math.PI * 2 * p);
        const x = d.x + Math.cos(newA) * d.w;
        const y = d.y + Math.sin(newA) * d.h;

        ctx.globalAlpha = d.a * o;

        ctx.beginPath();
        ctx.arc(x, y + d.h, 1 + _p * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      });
    };

    const moveDiscs = () => {
      discs.forEach((disc) => {
        disc.p = (disc.p + currentSpeed) % 1;
        tweenDisc(disc);
        
        const p = disc.sx * disc.sy;
        let a = 1;
        if (p < 0.01) {
          a = Math.pow(Math.min(p / 0.01, 1), 3);
        } else if (p > 0.2) {
          a = 1 - Math.min((p - 0.2) / 0.8, 1);
        }
        disc.a = a;
      });
    };

    const moveDots = () => {
      dots.forEach((dot) => {
        const v = tweenValue(0, 0.001, 1 - dot.d.sx * dot.d.sy, 'inExpo');
        dot.p = (dot.p + v) % 1;
      });
    };

    const tick = () => {
      // Update Interaction State


      // Constant speed
      currentSpeed = 0.0001;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(render.dpi, render.dpi);

      moveDiscs();
      moveDots();

      drawDiscs();
      drawDots();

      ctx.restore();
      animationFrameId = requestAnimationFrame(tick);
    };

    // Init
    setSizes();
    tick();

    const handleResize = () => {
      setSizes();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-50 w-full h-full bg-black overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
