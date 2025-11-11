import React, { useRef, useEffect } from "react";
import { useTheme } from "../ThemeProvider";

interface ParticlesProps {
  quantity?: number;
}

type Circle = {
  x: number;
  y: number;
  size: number;
  alpha: number;
  dx: number;
  dy: number;
};

const Particles: React.FC<ParticlesProps> = ({ quantity = 120 }) => {
  const { darkMode } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<Circle[]>([]);
  const dpr = window.devicePixelRatio || 1;
  const canvasSize = useRef({ w: window.innerWidth, h: window.innerHeight });

  const resizeCanvas = () => {
    if (!canvasRef.current || !ctx.current) return;

    canvasSize.current.w = window.innerWidth;
    canvasSize.current.h = window.innerHeight;

    canvasRef.current.width = canvasSize.current.w * dpr;
    canvasRef.current.height = canvasSize.current.h * dpr;
    canvasRef.current.style.width = `${canvasSize.current.w}px`;
    canvasRef.current.style.height = `${canvasSize.current.h}px`;

    ctx.current.setTransform(1, 0, 0, 1, 0, 0); // reset transform
    ctx.current.scale(dpr, dpr);

    // Tạo các hạt
    circles.current = [];
    for (let i = 0; i < quantity; i++) {
      circles.current.push({
        x: Math.random() * canvasSize.current.w,
        y: Math.random() * canvasSize.current.h,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
      });
    }
  };

  const draw = () => {
    if (!ctx.current) return;

    // Gradient nền full viewport
    const gradient = ctx.current.createRadialGradient(
      canvasSize.current.w / 2,
      canvasSize.current.h / 2,
      0,
      canvasSize.current.w / 2,
      canvasSize.current.h / 2,
      canvasSize.current.w / 1.5
    );

    if (darkMode) {
      gradient.addColorStop(0, "#001f4d");
      gradient.addColorStop(0.5, "#000022");
      gradient.addColorStop(1, "#000010");
    } else {
      gradient.addColorStop(0, "#e0f7ff");
      gradient.addColorStop(0.5, "#a0cfff");
      gradient.addColorStop(1, "#003366");
    }

    ctx.current.fillStyle = gradient;
    ctx.current.fillRect(0, 0, canvasSize.current.w, canvasSize.current.h);

    // vẽ hạt trắng
    circles.current.forEach((c) => {
      c.x += c.dx;
      c.y += c.dy;

      if (c.x < 0 || c.x > canvasSize.current.w) c.dx *= -1;
      if (c.y < 0 || c.y > canvasSize.current.h) c.dy *= -1;

      ctx.current!.beginPath();
      ctx.current!.arc(c.x, c.y, c.size, 0, 2 * Math.PI);
      ctx.current!.fillStyle = `rgba(255,255,255,${c.alpha})`;
      ctx.current!.shadowColor = "white";
      ctx.current!.shadowBlur = 8;
      ctx.current!.fill();
      ctx.current!.shadowBlur = 0;
    });

    requestAnimationFrame(draw);
  };

  useEffect(() => {
    if (canvasRef.current) ctx.current = canvasRef.current.getContext("2d");
    resizeCanvas();
    draw();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1, // nền phía sau mọi thứ
        pointerEvents: "none", // không cản click
      }}
    />
  );
};

export default Particles;
