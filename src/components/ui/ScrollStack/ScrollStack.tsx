"use client";

import React from "react";
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
 * Completely eliminates JavaScript scroll lag, layout thrashing, and touch-stutter
 * on mobile devices by executing directly on the browser's GPU compositor thread.
 */
const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = "",
  itemDistance = 56,
  itemStackDistance = 24,
  stackPosition = "5.5rem",
}) => {
  const childArray = React.Children.toArray(children);
  const total = childArray.length;

  return (
    <div className={`scroll-stack-container relative w-full ${className}`.trim()}>
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
