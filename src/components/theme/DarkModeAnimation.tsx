import React, { useEffect, useRef } from "react";

// Must match variables.css
const DARK_BG  = "#0a0a0c";
const LIGHT_BG = "#f8f8fa";

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

      // 1. Static overlay with OLD color to hide the instantly changed body background
      const oldOverlay = document.createElement("div");
      oldOverlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: ${currentColor};
        z-index: -2;
        pointer-events: none;
      `;
      document.body.appendChild(oldOverlay);

      // 2. Expanding overlay with NEW color
      const newOverlay = document.createElement("div");
      newOverlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: ${targetColor};
        z-index: -2;
        pointer-events: none;
        clip-path: circle(0px at ${x}px ${y}px);
        transition: clip-path 1200ms cubic-bezier(0.22, 1, 0.36, 1);
        will-change: clip-path;
      `;
      document.body.appendChild(newOverlay);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          newOverlay.style.clipPath = `circle(${maxR}px at ${x}px ${y}px)`;
        });
      });

      newOverlay.addEventListener("transitionend", () => {
        oldOverlay.remove();
        newOverlay.remove();
      });
    };

    window.addEventListener("darkModeToggle", onToggle);
    return () => window.removeEventListener("darkModeToggle", onToggle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Nothing to render – animation is DOM-injected
  return null;
};

export default DarkModeAnimation;
