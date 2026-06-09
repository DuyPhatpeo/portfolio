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

      // isDarkRef.current = current state BEFORE store updates
      // → circle should reveal the NEXT theme
      const nextIsDark  = !isDarkRef.current;
      const targetColor = nextIsDark ? DARK_BG : LIGHT_BG;

      // Max radius from click point to farthest corner
      const maxR = Math.ceil(
        Math.sqrt(
          Math.pow(Math.max(x, window.innerWidth  - x), 2) +
          Math.pow(Math.max(y, window.innerHeight - y), 2),
        ),
      );

      // Create overlay div that clips to a growing circle
      const overlay = document.createElement("div");
      overlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: ${targetColor};
        z-index: 0;
        pointer-events: none;
        clip-path: circle(0px at ${x}px ${y}px);
        transition: clip-path 1200ms cubic-bezier(0.22, 1, 0.36, 1);
        will-change: clip-path;
      `;
      document.body.appendChild(overlay);

      // Trigger expansion on next frame so transition fires
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          overlay.style.clipPath = `circle(${maxR}px at ${x}px ${y}px)`;
        });
      });

      // Remove overlay after animation — theme CSS is already switched
      overlay.addEventListener("transitionend", () => {
        overlay.remove();
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
