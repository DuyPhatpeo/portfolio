"use client";

import React, { useLayoutEffect, useRef, useCallback } from "react";
import "./ScrollStack.css";

export const ScrollStackItem = ({
  children,
  itemClassName = "",
  style,
}: {
  children: React.ReactNode;
  itemClassName?: string;
  style?: React.CSSProperties;
}) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()} style={style}>
    {children}
  </div>
);

interface ScrollStackProps {
  children: React.ReactNode;
  className?: string;
  itemDistance?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
  itemScale?: number;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  scaleEndPosition?: string;
}

/**
 * ScrollStack: Stacks cards on scroll using 100% native CSS `position: sticky`.
 * Automatically synchronizes and equalizes card heights across mobile and desktop
 * so all cards in the stack share the exact same height seamlessly.
 */
const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
  itemDistance = 56,
  itemStackDistance = 24,
  stackPosition = "5.5rem",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isSyncingRef = useRef(false);

  const childArray = React.Children.toArray(children);
  const total = childArray.length;

  // Equalize heights of all stacked cards so they are always uniform
  const syncHeights = useCallback(() => {
    const container = containerRef.current;
    if (!container || isSyncingRef.current) return;

    isSyncingRef.current = true;
    const cardElements = Array.from(
      container.querySelectorAll<HTMLElement>(".scroll-stack-card")
    );
    if (!cardElements.length) {
      isSyncingRef.current = false;
      return;
    }

    // Reset minHeight temporarily to accurately measure natural content heights
    cardElements.forEach((el) => {
      el.style.minHeight = "";
    });

    let maxH = 0;
    cardElements.forEach((el) => {
      const h = el.offsetHeight;
      if (h > maxH) maxH = h;
    });

    if (maxH > 0) {
      cardElements.forEach((el) => {
        el.style.minHeight = `${maxH}px`;
      });
    }

    requestAnimationFrame(() => {
      isSyncingRef.current = false;
    });
  }, []);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    syncHeights();

    let prevWidth = container.clientWidth;
    let resizeObserver: ResizeObserver | null = null;

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const currentWidth = entry.contentRect.width;
          // Re-equalize only when container width changes (e.g. screen resize / rotation)
          if (Math.abs(currentWidth - prevWidth) >= 1) {
            prevWidth = currentWidth;
            syncHeights();
          }
        }
      });
      resizeObserver.observe(container);
    }

    window.addEventListener("resize", syncHeights);
    window.addEventListener("orientationchange", syncHeights);

    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(syncHeights);
    }

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener("resize", syncHeights);
      window.removeEventListener("orientationchange", syncHeights);
    };
  }, [children, syncHeights]);

  return (
    <div
      ref={containerRef}
      className={`scroll-stack-container relative w-full ${className}`.trim()}
    >
      {childArray.map((child, index) => {
        const isLast = index === total - 1;

        return (
          <div
            key={index}
            className="scroll-stack-card-wrapper sticky transition-[top] duration-150"
            style={{
              ["--stack-index" as string]: index,
              ["--stack-total" as string]: total,
              ["--card-distance" as string]: `${itemDistance}px`,
              ["--card-stack-distance" as string]: `${itemStackDistance}px`,
              ["--card-stack-pos" as string]: stackPosition,
              zIndex: index + 10,
              marginBottom: isLast ? 0 : undefined,
            }}
          >
            {child}
          </div>
        );
      })}
      {/* Spacer so the last card has room to be read comfortably before scrolling to the next section */}
      <div className="scroll-stack-spacer h-16 sm:h-28 pointer-events-none" />
    </div>
  );
};

export default ScrollStack;
