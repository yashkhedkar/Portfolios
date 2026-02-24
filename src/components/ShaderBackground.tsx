"use client";

import { useEffect, useRef } from "react";

const vertexShader = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform float time;
  uniform vec2 resolution;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    vec3 col = vec3(0.01, 0.02, 0.05);
    
    float rays = 0.0;
    // Reduced iterations from 5.0 to 3.0 for performance
    for (float i = 0.0; i < 3.0; i++) {
      float offset = i * 0.7 + 1.0;
      float x = uv.x * 3.0 + offset;
      float n = snoise(vec2(x * 0.5 + time * 0.08 * (i * 0.3 + 0.5), time * 0.05 + i));
      // Widen the smoothstep range (0.3 -> 0.4) to distribute rays making them softer
      float ray = smoothstep(0.4, 0.0, abs(uv.x - 0.5 - n * 0.3 + i * 0.1 - 0.2));
      ray *= smoothstep(0.0, 0.8, 1.0 - uv.y);
      ray *= (1.0 - uv.y) * 0.8;
      rays += ray * (0.15 + i * 0.03);
    }
    
    // Orange colors for the glow
    vec3 orangeLight = vec3(1.0, 0.35, 0.05); // Bright Orange
    vec3 redOrangeLight = vec3(1.0, 0.15, 0.0); // Deep Red-Orange
    
    // Significantly reduced multipliers to minimize glow
    col += orangeLight * rays * 0.5; // Was 1.2
    col += redOrangeLight * rays * 0.2; // Was 0.4
    
    // Removed scanlines
    
    float grain = snoise(uv * 500.0 + time) * 0.015;
    col += grain;
    
    float vig = 1.0 - smoothstep(0.4, 1.4, length((uv - 0.5) * vec2(1.8, 1.2)));
    col *= vig;
    
    gl_FragColor = vec4(col, 1.0);
  }
`;

const ShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vertexShader));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fragmentShader));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(prog, "time");
    const resLoc = gl.getUniformLocation(prog, "resolution");

    const resize = () => {
      // Limit resolution for performance on high-DPI screens
      const dpr = Math.min(window.devicePixelRatio, 1.5); 
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const start = performance.now();
    const render = () => {
      gl.uniform1f(timeLoc, (performance.now() - start) * 0.001);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
};

export default ShaderBackground;
