import React, { useRef, useEffect, useState, useCallback } from "react";
import { useThemeStore } from "@stores/themeStore";

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  alphaSpeed: number;
  alphaDir: number;
  dx: number;
  dy: number;
  depth: number;
  beacon: boolean;
}

interface ShootingStar {
  x: number;
  y: number;
  len: number;
  speed: number;
  angle: number;
  alpha: number;
  active: boolean;
}

interface ParticlesProps {
  quantity?: number;
  zIndex?: number;
}

// Pure monochrome starlight: crisp white on black sky, subtle charcoal on light background
const STAR_RGB_DARK = "255, 255, 255";
const STAR_RGB_LIGHT = "24, 24, 27";

const Particles: React.FC<ParticlesProps> = ({
  quantity = 190,
  zIndex = 1,
}) => {
  const { darkMode } = useThemeStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingRef = useRef<ShootingStar[]>([
    { x: 0, y: 0, len: 0, speed: 0, angle: 0, alpha: 0, active: false },
    { x: 0, y: 0, len: 0, speed: 0, angle: 0, alpha: 0, active: false },
  ]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const [size, setSize] = useState(() => ({
    w: typeof window !== "undefined" ? window.innerWidth : 1440,
    h: typeof window !== "undefined" ? window.innerHeight : 900,
  }));

  /* Resize listener */
  useEffect(() => {
    const handle = () =>
      setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  /* Subtle mouse parallax */
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / size.w - 0.5) * 2;
      mouseRef.current.y = (e.clientY / size.h - 0.5) * 2;
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, [size]);

  /* Create monochrome star with layered depth */
  const createStar = useCallback(
    (randomY = true): Star => {
      const depth = 0.15 + Math.random() * 0.85;
      const isBeacon = Math.random() < 0.07;
      const baseSize = isBeacon ? 1.7 + Math.random() * 0.8 : depth * 1.55;
      return {
        x: Math.random() * size.w,
        y: randomY ? Math.random() * size.h : -6,
        size: Math.max(0.55, baseSize + Math.random() * 0.45),
        alpha: isBeacon ? 0.72 + Math.random() * 0.25 : Math.random() * 0.62 + 0.24,
        alphaSpeed: isBeacon
          ? 0.0035 + Math.random() * 0.005
          : 0.002 + Math.random() * 0.006,
        alphaDir: Math.random() > 0.5 ? 1 : -1,
        dx: (Math.random() - 0.5) * 0.045 * depth,
        dy: 0.028 + Math.random() * 0.042 * depth,
        depth,
        beacon: isBeacon,
      };
    },
    [size]
  );

  /* Spawn shooting meteor */
  const spawnShooting = useCallback(
    (s: ShootingStar) => {
      s.x = Math.random() * size.w * 0.75;
      s.y = Math.random() * size.h * 0.45;
      s.len = 105 + Math.random() * 115;
      s.speed = 9 + Math.random() * 6;
      s.angle = Math.PI / 5 + (Math.random() - 0.5) * 0.3;
      s.alpha = 1;
      s.active = true;
    },
    [size]
  );

  /* Draw individual monochrome star */
  const drawStar = (
    ctx: CanvasRenderingContext2D,
    s: Star,
    mx: number,
    my: number,
    animateMotion: boolean
  ) => {
    const px = ((s.x + mx * s.depth * 18) % size.w + size.w) % size.w;
    const py = s.y + my * s.depth * 11;
    const starRgb = darkMode ? STAR_RGB_DARK : STAR_RGB_LIGHT;

    if (animateMotion) {
      s.alpha += s.alphaSpeed * s.alphaDir;
      const minAlpha = s.beacon ? 0.42 : 0.14;
      const maxAlpha = darkMode ? 0.96 : 0.45;
      if (s.alpha >= maxAlpha) s.alphaDir = -1;
      if (s.alpha <= minAlpha) s.alphaDir = 1;
    }

    const effectiveAlpha = darkMode ? s.alpha : s.alpha * 0.45;

    // Soft white halo around larger stars
    if (s.size > 1.2) {
      const glowRadius = s.beacon ? s.size * 4.5 : s.size * 2.8;
      const grd = ctx.createRadialGradient(px, py, 0, px, py, glowRadius);
      grd.addColorStop(0, `rgba(${starRgb}, ${effectiveAlpha * 0.65})`);
      grd.addColorStop(0.45, `rgba(${starRgb}, ${effectiveAlpha * 0.18})`);
      grd.addColorStop(1, `rgba(${starRgb}, 0)`);
      ctx.beginPath();
      ctx.arc(px, py, glowRadius, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
    }

    // Subtle 4-point white starlight cross on bright stars
    if (s.beacon && darkMode) {
      const spikeLen = s.size * 3.8;
      ctx.strokeStyle = `rgba(${starRgb}, ${effectiveAlpha * 0.4})`;
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.moveTo(px - spikeLen, py);
      ctx.lineTo(px + spikeLen, py);
      ctx.moveTo(px, py - spikeLen);
      ctx.lineTo(px, py + spikeLen);
      ctx.stroke();
    }

    // Crisp monochrome star core
    ctx.beginPath();
    ctx.arc(px, py, s.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${starRgb}, ${effectiveAlpha})`;
    ctx.fill();

    if (animateMotion) {
      s.x += s.dx;
      s.y += s.dy;
    }
  };

  /* Draw monochrome shooting meteor */
  const drawShooting = (ctx: CanvasRenderingContext2D, s: ShootingStar) => {
    if (!s.active) return;

    const headX = s.x + Math.cos(s.angle) * s.len;
    const headY = s.y + Math.sin(s.angle) * s.len;

    const starRgb = darkMode ? STAR_RGB_DARK : STAR_RGB_LIGHT;
    const grd = ctx.createLinearGradient(s.x, s.y, headX, headY);
    grd.addColorStop(0, `rgba(${starRgb}, 0)`);
    grd.addColorStop(0.6, `rgba(${starRgb}, ${s.alpha * 0.4})`);
    grd.addColorStop(1, `rgba(${starRgb}, ${s.alpha})`);

    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(headX, headY);
    ctx.strokeStyle = grd;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(headX, headY, 1.6, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${starRgb}, ${s.alpha})`;
    ctx.fill();

    s.x += Math.cos(s.angle) * s.speed;
    s.y += Math.sin(s.angle) * s.speed;
    s.alpha -= 0.018;

    if (s.alpha <= 0 || s.x > size.w + 80 || s.y > size.h + 80) {
      s.active = false;
    }
  };

  /* Main animation loop */
  const animate = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    ctx.clearRect(0, 0, size.w, size.h);

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    const next: Star[] = [];
    for (const s of starsRef.current) {
      if (s.y > size.h + 8) {
        next.push(createStar(false));
      } else {
        drawStar(ctx, s, mx, my, true);
        next.push(s);
      }
    }
    starsRef.current = next;

    for (const ss of shootingRef.current) {
      if (ss.active) {
        drawShooting(ctx, ss);
      }
    }

    rafRef.current = requestAnimationFrame(animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, createStar, darkMode]);

  /* Shooting star scheduler */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const scheduleNext = () => {
      const delay = 3200 + Math.random() * 4500;
      timer = window.setTimeout(() => {
        const idle = shootingRef.current.find((s) => !s.active);
        if (idle) spawnShooting(idle);
        scheduleNext();
      }, delay);
      return timer;
    };
    scheduleNext();
    return () => clearTimeout(timer);
  }, [spawnShooting]);

  /* Canvas initialization */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    canvas.width = size.w * dpr;
    canvas.height = size.h * dpr;
    canvas.style.width = `${size.w}px`;
    canvas.style.height = `${size.h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = isCoarse ? Math.round(quantity * 0.48) : quantity;
    starsRef.current = Array.from({ length: count }, () => createStar(true));

    if (reduceMotion) {
      ctx.clearRect(0, 0, size.w, size.h);
      for (const s of starsRef.current) {
        drawStar(ctx, s, 0, 0, false);
      }
      return;
    }

    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, quantity, animate, createStar, darkMode]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex,
        pointerEvents: "none",
        background: "transparent",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          opacity: 1,
        }}
      />
    </div>
  );
};

export default Particles;
