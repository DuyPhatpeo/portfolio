import React, { useRef, useEffect, useState } from "react";
import { useTheme } from "../../hooks/ThemeProvider";

interface ParticlesProps {
  quantity?: number;
  staticity?: number;
  ease?: number;
}

const Particles: React.FC<ParticlesProps> = ({
  quantity = 40,
  staticity = 50,
  ease = 50,
}) => {
  const { darkMode } = useTheme();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<any[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const dpr = window.devicePixelRatio || 1;
  const [size, setSize] = useState({
    w: window.innerWidth,
    h: window.innerHeight,
  });

  // Resize canvas khi thay đổi kích thước màn hình
  useEffect(() => {
    const handleResize = () =>
      setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cập nhật chuột
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX - size.w / 2;
      mouse.current.y = e.clientY - size.h / 2;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [size]);

  // Hàm khởi tạo hạt
  const createCircle = () => {
    const x = Math.random() * size.w;
    const y = Math.random() * size.h;
    const sizeDot = Math.random() * 2 + 0.3;
    const alpha = 0;
    const targetAlpha = Math.random() * 0.5 + 0.3;
    const dx = (Math.random() - 0.5) * 0.3;
    const dy = (Math.random() - 0.5) * 0.3;
    const magnetism = 0.2 + Math.random() * 3;
    return {
      x,
      y,
      sizeDot,
      alpha,
      targetAlpha,
      dx,
      dy,
      tx: 0,
      ty: 0,
      magnetism,
    };
  };

  const drawCircle = (circle: any, update = false) => {
    if (!ctx.current) return;
    const { x, y, tx, ty, sizeDot, alpha } = circle;
    ctx.current.save();
    ctx.current.translate(tx, ty);
    ctx.current.beginPath();
    ctx.current.arc(x, y, sizeDot, 0, 2 * Math.PI);
    ctx.current.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.current.shadowColor = "rgba(255,255,255,0.8)";
    ctx.current.shadowBlur = 6;
    ctx.current.fill();
    ctx.current.restore();

    if (!update) circles.current.push(circle);
  };

  const drawParticles = () => {
    if (!ctx.current) return;
    ctx.current.clearRect(0, 0, size.w, size.h);

    for (let i = 0; i < quantity; i++) {
      const circle = createCircle();
      drawCircle(circle);
    }
  };

  const animate = () => {
    if (!ctx.current) return;
    ctx.current.clearRect(0, 0, size.w, size.h);

    circles.current.forEach((circle, i) => {
      circle.alpha += (circle.targetAlpha - circle.alpha) * 0.02;
      circle.x += circle.dx;
      circle.y += circle.dy;
      circle.tx +=
        (mouse.current.x / (staticity / circle.magnetism) - circle.tx) / ease;
      circle.ty +=
        (mouse.current.y / (staticity / circle.magnetism) - circle.ty) / ease;

      // Vẽ lại hạt
      drawCircle(circle, true);

      // Nếu hạt ra khỏi khung thì reset
      if (
        circle.x < -circle.sizeDot ||
        circle.x > size.w + circle.sizeDot ||
        circle.y < -circle.sizeDot ||
        circle.y > size.h + circle.sizeDot
      ) {
        circles.current.splice(i, 1);
        drawCircle(createCircle());
      }
    });

    requestAnimationFrame(animate);
  };

  // Khởi tạo canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    ctx.current = canvasRef.current.getContext("2d");

    canvasRef.current.width = size.w * dpr;
    canvasRef.current.height = size.h * dpr;
    canvasRef.current.style.width = `${size.w}px`;
    canvasRef.current.style.height = `${size.h}px`;
    ctx.current?.scale(dpr, dpr);

    circles.current = [];
    drawParticles();
    animate();
  }, [size, quantity]);

  // 🎨 Gradient nền thay đổi theo dark/light mode
  const backgroundGradient = darkMode
    ? "linear-gradient(180deg, #0a0b1a 0%, #0d1530 40%, #091022 80%, #050814 100%)"
    : "linear-gradient(180deg, #e9f5ff 0%, #c1dcff 40%, #8abfff 80%, #b0d0ff 100%)";

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
        transition: "background 0.6s ease-in-out",
      }}
    />
  );
};

export default Particles;
