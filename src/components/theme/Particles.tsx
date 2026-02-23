import React, { useRef, useEffect, useState, useCallback } from "react";
import { useThemeStore } from "../../stores/themeStore";

interface ParticlesProps {
  quantity?: number;
  staticity?: number;
  ease?: number;
}

interface Circle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  tx: number;
  ty: number;
  magnetism: number;
}

const Particles: React.FC<ParticlesProps> = ({
  quantity = 40,
  staticity = 50,
  ease = 50,
}) => {
  const { darkMode } = useThemeStore();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const circlesRef = useRef<Circle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const dpr = window.devicePixelRatio || 1;

  const [size, setSize] = useState(() => ({
    w: window.innerWidth,
    h: window.innerHeight,
  }));

  /* ---------------- Resize ---------------- */
  useEffect(() => {
    const handleResize = () =>
      setSize({ w: window.innerWidth, h: window.innerHeight });

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ---------------- Mouse ---------------- */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX - size.w / 2;
      mouseRef.current.y = e.clientY - size.h / 2;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [size]);

  /* ---------------- Particle ---------------- */
  const createCircle = useCallback((): Circle => {
    return {
      x: Math.random() * size.w,
      y: Math.random() * size.h,
      size: Math.random() * 2 + 0.3,
      alpha: 0,
      targetAlpha: Math.random() * 0.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      tx: 0,
      ty: 0,
      magnetism: 0.2 + Math.random() * 3,
    };
  }, [size]);

  const drawCircle = (c: Circle) => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    ctx.save();
    ctx.translate(c.tx, c.ty);

    ctx.beginPath();
    ctx.arc(c.x, c.y, c.size, 0, Math.PI * 2);
    // Neon Turquoise Particles
    ctx.fillStyle = darkMode
      ? `rgba(0, 245, 212, ${c.alpha})`
      : `rgba(17, 94, 89, ${c.alpha})`;

    // Glowing Effect
    ctx.shadowColor = darkMode
      ? "rgba(0, 245, 212, 0.8)"
      : "rgba(17, 94, 89, 0.6)";
    ctx.shadowBlur = darkMode ? 10 : 8;

    ctx.fill();

    // Draw lines connecting nearby particles (Data Streams)
    circlesRef.current.forEach((otherC) => {
      const dx = c.x - otherC.x;
      const dy = c.y - otherC.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        const lineColor = darkMode
          ? `rgba(0, 245, 212, ${c.alpha * 0.3 * (1 - dist / 100)})`
          : `rgba(17, 94, 89, ${c.alpha * 0.5 * (1 - dist / 100)})`;
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1;
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(otherC.x, otherC.y);
        ctx.stroke();
      }
    });

    ctx.restore();
  };

  /* ---------------- Animation ---------------- */
  const animate = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    ctx.clearRect(0, 0, size.w, size.h);

    const next: Circle[] = [];

    for (const c of circlesRef.current) {
      c.alpha += (c.targetAlpha - c.alpha) * 0.02;
      c.x += c.dx;
      c.y += c.dy;

      c.tx += (mouseRef.current.x / (staticity / c.magnetism) - c.tx) / ease;
      c.ty += (mouseRef.current.y / (staticity / c.magnetism) - c.ty) / ease;

      if (
        c.x < -c.size ||
        c.x > size.w + c.size ||
        c.y < -c.size ||
        c.y > size.h + c.size
      ) {
        next.push(createCircle());
      } else {
        drawCircle(c);
        next.push(c);
      }
    }

    circlesRef.current = next;
    rafRef.current = requestAnimationFrame(animate);
  }, [size, staticity, ease, darkMode, createCircle]);

  /* ---------------- Init ---------------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctxRef.current = ctx;

    canvas.width = size.w * dpr;
    canvas.height = size.h * dpr;
    canvas.style.width = `${size.w}px`;
    canvas.style.height = `${size.h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    circlesRef.current = Array.from({ length: quantity }, createCircle);

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    animate();

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [size, quantity, animate, createCircle, dpr]);

  /* ---------------- UI ---------------- */
  // Responsive background based on dark mode
  const backgroundColor = darkMode ? "#0a1929" : "#F3F4F6";
  const circuitColor = darkMode
    ? "rgba(0, 245, 212, 0.04)"
    : "rgba(17, 94, 89, 0.04)";

  const backgroundPattern = `
    radial-gradient(circle at center, transparent 0%, ${backgroundColor} 100%),
    linear-gradient(${circuitColor} 1px, transparent 1px),
    linear-gradient(90deg, ${circuitColor} 1px, transparent 1px)
  `;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        backgroundColor: backgroundColor,
        backgroundImage: backgroundPattern,
        backgroundSize: "100% 100%, 40px 40px, 40px 40px",
        transition: "background-color 0.5s ease",
      }}
    >
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default Particles;
