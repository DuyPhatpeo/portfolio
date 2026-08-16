import React, { useEffect, useRef } from "react";

// Must match variables.css
const DARK_BG  = "#171717";
const LIGHT_BG = "#eef5f3";

interface Props { isDark: boolean }

const DarkModeAnimation: React.FC<Props> = ({ isDark }) => {
  const isDarkRef = useRef(isDark);
  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);

  useEffect(() => {
    const onToggle = (e: Event) => {
      const detail = (e as CustomEvent<{ x: number; y: number }>).detail;
      const x = detail?.x ?? window.innerWidth  / 2;
      const y = detail?.y ?? window.innerHeight / 2;

      const nextIsDark  = !isDarkRef.current;
      const currentColor = isDarkRef.current ? DARK_BG : LIGHT_BG;
      const targetColor = nextIsDark ? DARK_BG : LIGHT_BG;

      const maxR = Math.ceil(
        Math.sqrt(
          Math.pow(Math.max(x, window.innerWidth  - x), 2) +
          Math.pow(Math.max(y, window.innerHeight - y), 2),
        ),
      );

      // Mount inside the app's own stacking context (not document.body) so
      // the fixed Header (z-100) still renders above the wipe instead of
      // being covered by it.
      const mount = document.getElementById("app-content-root") ?? document.body;

      // 1. Static overlay with OLD color to hide the instantly changed body background
      const oldOverlay = document.createElement("div");
      oldOverlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: ${currentColor};
        z-index: 90;
        pointer-events: none;
      `;
      mount.appendChild(oldOverlay);

      // 2. Expanding overlay with NEW color
      const newOverlay = document.createElement("div");
      newOverlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: ${targetColor};
        z-index: 90;
        pointer-events: none;
        clip-path: circle(0px at ${x}px ${y}px);
        transition: clip-path 900ms cubic-bezier(0.65, 0, 0.35, 1);
        will-change: clip-path;
      `;
      mount.appendChild(newOverlay);

      // 3. Glowing ring that rides the expanding edge for a premium "wipe" feel
      const glowRing = document.createElement("div");
      glowRing.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 0px;
        height: 0px;
        border-radius: 9999px;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 40px 12px rgba(var(--primary-rgb), 0.55);
        z-index: 91;
        pointer-events: none;
        opacity: 1;
        transition: width 900ms cubic-bezier(0.65, 0, 0.35, 1),
          height 900ms cubic-bezier(0.65, 0, 0.35, 1),
          opacity 300ms ease-in 700ms;
      `;
      mount.appendChild(glowRing);

      // 4. Soft flash pulse right at the click origin
      const flash = document.createElement("div");
      flash.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 12px;
        height: 12px;
        border-radius: 9999px;
        transform: translate(-50%, -50%) scale(1);
        background: radial-gradient(circle, rgba(var(--primary-rgb), 0.9) 0%, rgba(var(--primary-rgb), 0) 70%);
        z-index: 91;
        pointer-events: none;
        opacity: 1;
        transition: transform 500ms cubic-bezier(0.22, 1, 0.36, 1), opacity 500ms ease-out;
      `;
      mount.appendChild(flash);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          newOverlay.style.clipPath = `circle(${maxR}px at ${x}px ${y}px)`;
          glowRing.style.width = `${maxR * 2}px`;
          glowRing.style.height = `${maxR * 2}px`;
          flash.style.transform = "translate(-50%, -50%) scale(18)";
          flash.style.opacity = "0";
        });
      });

      newOverlay.addEventListener("transitionend", () => {
        oldOverlay.remove();
        newOverlay.remove();
        glowRing.remove();
      });
      flash.addEventListener("transitionend", () => flash.remove());
    };

    window.addEventListener("darkModeToggle", onToggle);
    return () => window.removeEventListener("darkModeToggle", onToggle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Nothing to render – animation is DOM-injected
  return null;
};

export default DarkModeAnimation;
