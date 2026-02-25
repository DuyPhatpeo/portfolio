import { useEffect, useRef, useState } from "react";
import { useThemeStore } from "../../stores/themeStore";

export default function CustomCursor() {
  const { darkMode } = useThemeStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pos = useRef({ x: -300, y: -300 });
  const smooth = useRef({ x: -300, y: -300 });
  const rafRef = useRef<number | null>(null);

  const lightRef = useRef(0); // rotating lights phase
  const [, setHovering] = useState(false);
  const hoverRef = useRef(false);

  /* ── Resize ──────────────────────────── */
  useEffect(() => {
    const resize = () => {
      const c = canvasRef.current;
      if (!c) return;
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ── Mouse ───────────────────────────── */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* ── Hover detection ─────────────────── */
  useEffect(() => {
    const sel = "a, button, [role='button'], input, textarea, select";
    const enter = () => {
      hoverRef.current = true;
      setHovering(true);
    };
    const leave = () => {
      hoverRef.current = false;
      setHovering(false);
    };
    const attach = () => {
      document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    };
    attach();
    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);
  /* ── Draw UFO ────────────────────────── */
  useEffect(() => {
    const teal = darkMode ? [0, 245, 212] : [13, 148, 136];
    const [tr, tg, tb] = teal;

    const drawUFO = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      light: number,
    ) => {
      ctx.save();
      ctx.translate(x, y);

      // === Saucer body (bottom ellipse) ===
      ctx.save();
      ctx.scale(1, 0.38);
      const bodyGrd = ctx.createRadialGradient(-4, -6, 0, 0, 0, 18);
      bodyGrd.addColorStop(0, "#4a5568");
      bodyGrd.addColorStop(0.6, "#2d3748");
      bodyGrd.addColorStop(1, "#1a202c");
      ctx.beginPath();
      ctx.arc(0, 0, 18, 0, Math.PI * 2);
      ctx.fillStyle = bodyGrd;
      ctx.fill();
      ctx.strokeStyle = `rgba(${tr},${tg},${tb},0.7)`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // === Rotating colored lights on rim ===
      const numLights = 6;
      for (let i = 0; i < numLights; i++) {
        const angle = (i / numLights) * Math.PI * 2 + light;
        const lx = Math.cos(angle) * 14;
        const ly = Math.sin(angle) * 5.2;
        const colors = [
          "#ff6b6b",
          "#ffd93d",
          `rgb(${tr},${tg},${tb})`,
          "#a78bfa",
          "#60a5fa",
          "#34d399",
        ];
        ctx.beginPath();
        ctx.arc(lx, ly, 2, 0, Math.PI * 2);
        ctx.fillStyle = colors[i % colors.length];
        ctx.shadowColor = colors[i % colors.length];
        ctx.shadowBlur = 5;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // === Glass dome ===
      ctx.save();
      ctx.translate(0, -4);
      const domeGrd = ctx.createRadialGradient(-3, -8, 1, 0, -6, 12);
      domeGrd.addColorStop(0, "rgba(150,220,255,0.55)");
      domeGrd.addColorStop(0.5, `rgba(${tr},${tg},${tb},0.2)`);
      domeGrd.addColorStop(1, "rgba(0,30,60,0.6)");
      ctx.beginPath();
      ctx.ellipse(0, 0, 10, 12, 0, Math.PI, 0); // top semicircle
      ctx.fillStyle = domeGrd;
      ctx.fill();
      ctx.strokeStyle = `rgba(${tr},${tg},${tb},0.5)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Dome shine
      ctx.beginPath();
      ctx.ellipse(-3, -7, 3, 5, -0.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      ctx.fill();
      ctx.restore();

      // === Bottom glow ===
      const glowGrd = ctx.createRadialGradient(0, 5, 0, 0, 5, 22);
      glowGrd.addColorStop(0, `rgba(${tr},${tg},${tb},0.18)`);
      glowGrd.addColorStop(1, `rgba(${tr},${tg},${tb},0)`);
      ctx.beginPath();
      ctx.arc(0, 5, 22, 0, Math.PI * 2);
      ctx.fillStyle = glowGrd;
      ctx.fill();

      ctx.restore();
    };

    const loop = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      // Smooth follow
      const ease = 0.1;
      smooth.current.x += (pos.current.x - smooth.current.x) * ease;
      smooth.current.y += (pos.current.y - smooth.current.y) * ease;

      lightRef.current += 0.04;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawUFO(ctx, smooth.current.x, smooth.current.y, lightRef.current);

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  );
}
