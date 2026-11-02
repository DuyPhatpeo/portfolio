import React from "react";

interface LoadingProps {
  progress: number;
  exiting?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ progress, exiting = false }) => {
  const clamped = Math.min(100, Math.max(0, Math.round(progress)));

  return (
    <div
      role="status"
      aria-label="Loading portfolio"
      className={`fixed inset-0 z-[9999] bg-background text-foreground flex flex-col items-center justify-center overflow-hidden select-none transition-opacity duration-150 ease-out ${
        exiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Crisp single-color brand wordmark + GPU-composited progress sweep */}
      <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center justify-center gap-6">
        <span className="font-sans font-black uppercase tracking-[0.05em] text-5xl sm:text-7xl md:text-8xl text-foreground leading-none">
          DINO PÉO
        </span>

        <div className="w-48 sm:w-64 h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full w-full bg-primary origin-left will-change-transform rounded-full shadow-[0_0_16px_rgba(217,255,58,0.6)]"
            style={{ transform: `scaleX(${clamped / 100})` }}
          />
        </div>
      </div>

      {/* Bottom Right: Tabular monospace counter (zero layout shift) */}
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20 flex items-baseline">
        <span className="text-4xl md:text-6xl font-mono font-light tracking-tight text-foreground tabular-nums min-w-[3ch] text-right">
          {clamped.toString().padStart(2, "0")}
        </span>
        <span className="text-base md:text-xl font-mono text-primary ml-1 font-bold">
          %
        </span>
      </div>
    </div>
  );
};

export default Loading;
