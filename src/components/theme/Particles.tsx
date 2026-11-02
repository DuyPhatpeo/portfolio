"use client";

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

// Pure monochrome starlight: crisp white on dark sky, subtle charcoal on light background
const STAR_RGB_DARK = "255, 255, 255";
const STAR_RGB_LIGHT = "24, 24, 27";

const Particles: React.FC<ParticlesProps> = ({
  quantity = 175,
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

  /* Responsive resize listener with debouncing to prevent mobile address bar jumpiness */
  useEffect(() => {
    let timeoutId: number;
    const handle = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        const newW = window.innerWidth;
        const newH = window.innerHeight;
        setSize((prev) => {
          // Avoid unnecessary canvas resets if width barely changed (e.g. mobile scroll URL bar toggle)
          if (Math.abs(prev.w - newW) < 20 && Math.abs(prev.h - newH) < 80) {
            return prev;
          }
          return { w: newW, h: newH };
        });
      }, 150);
    };

    window.addEventListener("resize", handle);
    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("resize", handle);
    };
  }, []);

  /* Mouse parallax: active on Desktop, completely disabled on touch devices to save CPU */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches || size.w < 768;
    if (isTouch) return;

    const handle = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / size.w - 0.5) * 2;
      mouseRef.current.y = (e.clientY / size.h - 0.5) * 2;
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, [size]);

  /* Determine responsive star quantity: Mobile (45) / Tablet (85) / Desktop (175) */
  const getResponsiveCount = useCallback((width: number): number => {
    if (width < 640) return 45; // Mobile: lightweight, ultra-smooth, saves battery
    if (width < 1024) return 85; // Tablet: balanced density
    return quantity; // Desktop: rich cosmic starfield
  }, [quantity]);

  /* Create monochrome star with layered depth */
  const createStar = useCallback(
    (randomY = true): Star => {
      const isMobile = size.w < 640;
      const depth = 0.15 + Math.random() * 0.85;
      const isBeacon = !isMobile && Math.random() < 0.07;
      const baseSize = isBeacon ? 1.6 + Math.random() * 0.7 : depth * (isMobile ? 1.25 : 1.5);

      return {
        x: Math.random() * size.w,
        y: randomY ? Math.random() * size.h : -6,
        size: Math.max(0.5, baseSize + Math.random() * 0.4),
        alpha: isBeacon ? 0.75 + Math.random() * 0.25 : Math.random() * 0.6 + 0.2,
        alphaSpeed: isBeacon
          ? 0.0035 + Math.random() * 0.005
          : 0.002 + Math.random() * 0.006,
        alphaDir: Math.random() > 0.5 ? 1 : -1,
        dx: (Math.random() - 0.5) * 0.04 * depth,
        dy: 0.025 + Math.random() * 0.04 * depth,
        depth,
        beacon: isBeacon,
      };
    },
    [size]
  );

  /* Spawn shooting meteor (frequency optimized per screen) */
  const spawnShooting = useCallback(
    (s: ShootingStar) => {
      const isMobile = size.w < 640;
      s.x = Math.random() * size.w * 0.75;
      s.y = Math.random() * size.h * 0.35;
      s.len = isMobile ? 35 + Math.random() * 35 : 55 + Math.random() * 65;
      s.speed = isMobile ? 8 + Math.random() * 5 : 11 + Math.random() * 8;
      s.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.28;
      s.alpha = isMobile ? 0.55 : 0.75;
      s.active = true;
    },
    [size]
  );

  /* Draw single monochrome star */
  const drawStar = (
    ctx: CanvasRenderingContext2D,
    s: Star,
    mx: number,
    my: number,
    animateMotion = true
  ) => {
    if (animateMotion) {
      s.alpha += s.alphaSpeed * s.alphaDir;
      if (s.alpha >= 0.95) {
        s.alpha = 0.95;
        s.alphaDir = -1;
      } else if (s.alpha <= 0.15) {
        s.alpha = 0.15;
        s.alphaDir = 1;
      }
    }

    const isMobile = size.w < 640;
    const px = s.x + (isMobile ? 0 : mx * s.depth * 14);
    const py = s.y + (isMobile ? 0 : my * s.depth * 14);

    const starRgb = darkMode ? STAR_RGB_DARK : STAR_RGB_LIGHT;
    const effectiveAlpha = darkMode ? s.alpha : s.alpha * 0.38;

    // Cross diffraction spikes on desktop beacon stars only
    if (s.beacon && effectiveAlpha > 0.55 && !isMobile) {
      const spikeLen = s.size * 3.4;
      ctx.strokeStyle = `rgba(${starRgb}, ${effectiveAlpha * 0.35})`;
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(px - spikeLen, py);
      ctx.lineTo(px + spikeLen, py);
      ctx.moveTo(px, py - spikeLen);
      ctx.lineTo(px, py + spikeLen);
      ctx.stroke();
    }

    // Star core
    ctx.beginPath();
    ctx.arc(px, py, s.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${starRgb}, ${effectiveAlpha})`;
    ctx.fill();

    if (animateMotion) {
      s.x += s.dx;
      s.y += s.dy;
    }
  };

  /* Draw shooting meteor */
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
    ctx.lineWidth = 1.4;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(headX, headY, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${starRgb}, ${s.alpha})`;
    ctx.fill();

    s.x += Math.cos(s.angle) * s.speed;
    s.y += Math.sin(s.angle) * s.speed;
    s.alpha -= 0.02;

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

  /* Shooting star scheduler: less frequent on mobile to preserve resources */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isMobile = size.w < 640;
    let timer = 0;
    const scheduleNext = () => {
      const delay = isMobile ? 6500 + Math.random() * 6000 : 3500 + Math.random() * 4500;
      timer = window.setTimeout(() => {
        const idle = shootingRef.current.find((s) => !s.active);
        if (idle) spawnShooting(idle);
        scheduleNext();
      }, delay);
      return timer;
    };
    scheduleNext();

    return () => clearTimeout(timer);
  }, [size, spawnShooting]);

  /* Initialize Canvas */
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

    // Cap DPR at 1.75 on desktop, 1.5 on mobile to avoid 3x retina overhead
    const maxDpr = size.w < 640 ? 1.5 : 1.75;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

    canvas.width = size.w * dpr;
    canvas.height = size.h * dpr;
    canvas.style.width = `${size.w}px`;
    canvas.style.height = `${size.h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = getResponsiveCount(size.w);
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
  }, [size, quantity, animate, createStar, darkMode, getResponsiveCount]);

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
