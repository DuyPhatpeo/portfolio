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

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const circlesRef = useRef<Circle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>();

  const [size, setSize] = useState(() => ({
    w: window.innerWidth,
    h: window.innerHeight,
  }));

  /* -------------------- Utils -------------------- */
  const dpr = window.devicePixelRatio || 1;

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

  /* -------------------- Resize -------------------- */
  useEffect(() => {
    const handleResize = () => {
      setSize({ w: window.innerWidth, h: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* -------------------- Mouse -------------------- */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX - size.w / 2;
      mouseRef.current.y = e.clientY - size.h / 2;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [size]);

  /* -------------------- Draw -------------------- */
  const drawCircle = (c: Circle) => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    ctx.save();
    ctx.translate(c.tx, c.ty);

    ctx.beginPath();
    ctx.arc(c.x, c.y, c.size, 0, Math.PI * 2);
    ctx.fillStyle = darkMode
      ? `rgba(200,200,200,${c.alpha})`
      : `rgba(0,0,0,${c.alpha})`;

    ctx.shadowColor = darkMode ? "rgba(200,200,200,0.6)" : "rgba(0,0,0,0.6)";
    ctx.shadowBlur = 6;

    ctx.fill();
    ctx.restore();
  };

  /* -------------------- Animation -------------------- */
  const animate = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    ctx.clearRect(0, 0, size.w, size.h);

    const nextCircles: Circle[] = [];

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
        nextCircles.push(createCircle());
      } else {
        drawCircle(c);
        nextCircles.push(c);
      }
    }

    circlesRef.current = nextCircles;
    rafRef.current = requestAnimationFrame(animate);
  }, [size, staticity, ease, darkMode, createCircle]);

  /* -------------------- Init -------------------- */
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

    cancelAnimationFrame(rafRef.current!);
    animate();

    return () => cancelAnimationFrame(rafRef.current!);
  }, [size, quantity, darkMode, animate, createCircle]);

  /* -------------------- UI -------------------- */
  const backgroundGradient = darkMode
    ? "linear-gradient(180deg, #0d0d0d, #1a1a1a 40%, #111 80%, #0a0a0a)"
    : "linear-gradient(180deg, #fafafa, #eaeaea 40%, #dcdcdc 80%, #e5e5e5)";

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        background: backgroundGradient,
        transition: "background 0.6s ease",
      }}
    />
  );
};

export default Particles;
