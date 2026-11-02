"use client";

import React, { ReactNode } from "react";

export interface LogoLoopItem {
  name: string;
  logo?: string;
  icon?: (props: { className?: string }) => ReactNode;
  invertDark?: boolean;
  category?: string;
}

export interface LogoLoopProps {
  /** Array of items (or alias as logos) to loop seamlessly */
  items?: LogoLoopItem[];
  logos?: LogoLoopItem[];
  /** Duration in seconds for one full loop cycle (default: 26) */
  speed?: number;
  /** Scrolling direction */
  direction?: "left" | "right";
  /** Whether to pause scrolling when hovered or focused */
  pauseOnHover?: boolean;
  /** Whether to apply soft transparent gradient fade masks on edges */
  fadeOut?: boolean;
  /** Custom wrapper classes */
  className?: string;
  /** Optional custom item renderer */
  renderItem?: (item: LogoLoopItem, index: number) => ReactNode;
}

/**
 * LogoLoop - Inspired by React Bits Logo Loop
 * High-performance, hardware-accelerated infinite marquee loop
 * with edge-fade masking, hover pause, and responsive sizing.
 */
export default function LogoLoop({
  items,
  logos,
  speed = 26,
  direction = "left",
  pauseOnHover = true,
  fadeOut = true,
  className = "",
  renderItem,
}: LogoLoopProps) {
  const sourceItems = items || logos || [];

  if (sourceItems.length === 0) return null;

  // Duplicate items sufficiently so that one track comfortably exceeds any viewport (including 4K)
  const repeatCount = Math.max(2, Math.ceil(16 / sourceItems.length));
  const fullTrack: LogoLoopItem[] = [];
  for (let i = 0; i < repeatCount; i++) {
    fullTrack.push(...sourceItems);
  }

  const defaultRenderItem = (item: LogoLoopItem, index: number) => {
    return (
      <div
        key={`${item.name}-${index}`}
        className="group/item relative flex items-center gap-2.5 xs:gap-3 sm:gap-3.5 px-3 py-2 xs:px-3.5 xs:py-2.5 sm:px-4.5 sm:py-3 md:px-5 md:py-3.5 rounded-2xl bg-card/80 dark:bg-neutral-900/75 backdrop-blur-xl border border-border/75 hover:border-primary/80 hover:bg-primary/10 hover:shadow-[0_0_24px_rgba(45,212,168,0.22)] hover:scale-[1.04] active:scale-[0.98] transition-all duration-300 cursor-pointer select-none shrink-0"
      >
        <span className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover/item:scale-110">
          {item.logo ? (
            <img
              src={item.logo}
              alt={item.name}
              loading="lazy"
              className={`w-full h-full object-contain ${
                item.invertDark ? "dark:invert" : ""
              }`}
            />
          ) : item.icon ? (
            item.icon({
              className:
                "w-full h-full text-foreground group-hover/item:text-primary transition-colors",
            })
          ) : null}
        </span>

        <span className="font-sans text-xs xs:text-sm sm:text-base font-semibold tracking-tight text-foreground/90 group-hover/item:text-primary transition-colors duration-200 whitespace-nowrap">
          {item.name}
        </span>

        {/* User's signature primary accent dot lighting up on hover */}
        <span className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover/item:bg-primary group-hover/item:shadow-[0_0_8px_rgba(45,212,168,0.85)] transition-all shrink-0 ml-0.5" />
      </div>
    );
  };

  return (
    <div
      className={`group relative w-full overflow-hidden flex items-center py-4 sm:py-6 bg-transparent ${className}`}
      style={
        fadeOut
          ? {
              maskImage:
                "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            }
          : undefined
      }
    >
      <div
        className={`flex w-max items-center ${
          direction === "right" ? "animate-marquee-reverse" : "animate-marquee"
        } ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
        style={{
          ["--duration" as any]: `${speed}s`,
        }}
      >
        {/* Track 1 */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-4 md:gap-5 pr-3 sm:pr-4 md:pr-5">
          {fullTrack.map((item, idx) => (
            <React.Fragment key={`track1-${item.name}-${idx}`}>
              {renderItem
                ? renderItem(item, idx)
                : defaultRenderItem(item, idx)}
            </React.Fragment>
          ))}
        </div>

        {/* Track 2 (Seamless clone for 50% infinite translation) */}
        <div
          className="flex shrink-0 items-center gap-3 sm:gap-4 md:gap-5 pr-3 sm:pr-4 md:pr-5"
          aria-hidden="true"
        >
          {fullTrack.map((item, idx) => (
            <React.Fragment key={`track2-${item.name}-${idx}`}>
              {renderItem
                ? renderItem(item, idx)
                : defaultRenderItem(item, idx)}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
