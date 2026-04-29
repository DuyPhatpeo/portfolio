import React, { useRef, useEffect, useState, useCallback } from "react";
import { useThemeStore } from "../../stores/themeStore";

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  alphaSpeed: number;
  alphaDir: number;
  dx: number;
  dy: number;
  color: string;
  depth: number; // for parallax (0.1 – 1.0)
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
}

const STAR_COLORS_DARK = [
  "255,255,255", // white
];

const STAR_COLORS_LIGHT = [
  "0,0,0",       // black
];

const Particles: React.FC<ParticlesProps> = ({ quantity = 160 }) => {
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
  const shootTimerRef = useRef<number>(0);

  const [size, setSize] = useState(() => ({
    w: window.innerWidth,
    h: window.innerHeight,
  }));

  /* ── Resize ─────────────────────────────── */
  useEffect(() => {
    const handle = () =>
      setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  /* ── Mouse ──────────────────────────────── */
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / size.w - 0.5) * 2; // -1 → 1
      mouseRef.current.y = (e.clientY / size.h - 0.5) * 2;
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [size]);

  /* ── Create star ────────────────────────── */
  const createStar = useCallback(
    (randomY = true): Star => {
      const depth = 0.15 + Math.random() * 0.85;
      const baseSize = depth * 1.6;
      const colors = darkMode ? STAR_COLORS_DARK : STAR_COLORS_LIGHT;
      const colorIdx = Math.floor(Math.random() * colors.length);
      return {
        x: Math.random() * size.w,
        y: randomY ? Math.random() * size.h : -4,
        size: Math.max(0.4, baseSize + Math.random() * 0.6),
        alpha: Math.random() * 0.6 + 0.2,
        alphaSpeed: 0.003 + Math.random() * 0.008,
        alphaDir: Math.random() > 0.5 ? 1 : -1,
        dx: (Math.random() - 0.5) * 0.06 * depth,
        dy: 0.04 + Math.random() * 0.04 * depth,
        color: colors[colorIdx],
        depth,
      };
    },
    [size, darkMode],
  );

  /* ── Spawn shooting star ────────────────── */
  const spawnShooting = useCallback(
    (s: ShootingStar) => {
      s.x = Math.random() * size.w * 0.7;
      s.y = Math.random() * size.h * 0.4;
      s.len = 90 + Math.random() * 100;
      s.speed = 8 + Math.random() * 8;
      s.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.4;
      s.alpha = 1;
      s.active = true;
    },
    [size],
  );

  /* ── Draw star ──────────────────────────── */
  const drawStar = (
    ctx: CanvasRenderingContext2D,
    s: Star,
    mx: number,
    my: number,
  ) => {
    const px = s.x + mx * s.depth * 18;
    const py = s.y + my * s.depth * 10;

    // Twinkling alpha
    s.alpha += s.alphaSpeed * s.alphaDir;
    if (s.alpha >= 0.92) s.alphaDir = -1;
    if (s.alpha <= 0.08) s.alphaDir = 1;

    // Glow for larger stars
    if (s.size > 1.2) {
      const grd = ctx.createRadialGradient(px, py, 0, px, py, s.size * 3.5);
      grd.addColorStop(0, `rgba(${s.color},${s.alpha * 0.9})`);
      grd.addColorStop(1, `rgba(${s.color},0)`);
      ctx.beginPath();
      ctx.arc(px, py, s.size * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
    }

    // Core dot
    ctx.beginPath();
    ctx.arc(px, py, s.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${s.color},${s.alpha})`;
    ctx.fill();

    // Move
    s.x += s.dx;
    s.y += s.dy;
  };

  /* ── Draw shooting star ──────────────────── */
  const drawShooting = (ctx: CanvasRenderingContext2D, s: ShootingStar) => {
    if (!s.active) return;

    const tx = s.x + Math.cos(s.angle) * s.len;
    const ty = s.y + Math.sin(s.angle) * s.len;

    const color = darkMode ? "255,255,255" : "0,0,0";
    const grd = ctx.createLinearGradient(s.x, s.y, tx, ty);
    grd.addColorStop(0, `rgba(${color},0)`);
    grd.addColorStop(0.5, `rgba(${color},${s.alpha * 0.6})`);
    grd.addColorStop(1, `rgba(${color},${s.alpha})`);

    ctx.beginPath();
    ctx.moveTo(tx, ty);
    ctx.lineTo(s.x, s.y);
    ctx.strokeStyle = grd;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    s.x += Math.cos(s.angle) * s.speed;
    s.y += Math.sin(s.angle) * s.speed;
    s.alpha -= 0.022;

    if (s.alpha <= 0 || s.x > size.w + 50 || s.y > size.h + 50) {
      s.active = false;
    }
  };

  /* ── Animation loop ─────────────────────── */
  const animate = useCallback(
    (timestamp: number) => {
      const ctx = ctxRef.current;
      if (!ctx) return;

      ctx.clearRect(0, 0, size.w, size.h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Draw & update stars
      const next: Star[] = [];
      for (const s of starsRef.current) {
        if (s.y > size.h + 4) {
          next.push(createStar(false));
        } else {
          drawStar(ctx, s, mx, my);
          next.push(s);
        }
      }
      starsRef.current = next;

      // Shooting stars timer
      shootTimerRef.current = timestamp;
      for (const ss of shootingRef.current) {
        if (ss.active) {
          drawShooting(ctx, ss);
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [size, createStar],
  );

  /* ── Shooting star scheduler ─────────────── */
  useEffect(() => {
    const scheduleNext = () => {
      const delay = 3500 + Math.random() * 5000;
      const timer = window.setTimeout(() => {
        const idle = shootingRef.current.find((s) => !s.active);
        if (idle) spawnShooting(idle);
        scheduleNext();
      }, delay);
      return timer;
    };
    const t = scheduleNext();
    return () => clearTimeout(t);
  }, [spawnShooting]);

  /* ── Init ───────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size.w * dpr;
    canvas.height = size.h * dpr;
    canvas.style.width = `${size.w}px`;
    canvas.style.height = `${size.h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    starsRef.current = Array.from({ length: quantity }, () => createStar(true));

    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [size, quantity, animate, createStar]);

  /* ── Background styles ───────────────────── */
  const darkBg = `#000000`;

  const lightBg = `#f0f0f5`;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        background: darkMode ? darkBg : lightBg,
        transition: "background 0.6s ease",
      }}
    >
      {/* Stars canvas – always visible, color adapts to mode */}
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
