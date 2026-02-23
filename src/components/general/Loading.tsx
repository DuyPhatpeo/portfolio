import React from "react";
import { useTranslation } from "react-i18next";

interface LoadingProps {
  progress: number;
}

const Loading: React.FC<LoadingProps> = ({ progress }) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-[9999] bg-background text-foreground flex flex-col items-center justify-center font-sans overflow-hidden">
      {/* Background Decorative Grid */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--primary-subtle) 1px, transparent 1px),
            linear-gradient(to bottom, var(--primary-subtle) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Center HUD Circle */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Outer glowing ring */}
        <svg
          className="absolute inset-0 w-full h-full animate-spin-slow"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="var(--primary-subtle)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="1"
            strokeDasharray="20 100"
            className="drop-shadow-[0_0_8px_var(--primary)]"
          />
        </svg>

        {/* Inner rotating elements */}
        <div className="absolute inset-4 border border-primary/30 rounded-full animate-[spin_4s_linear_reverse]" />
        <div className="absolute inset-8 border-t-2 border-primary rounded-full animate-spin" />

        {/* Percentage Text */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary-mild to-neutral drop-shadow-[0_0_15px_rgba(0,245,212,0.8)]">
            {Math.round(progress)}
          </div>
          <div className="text-primary-mild text-sm tracking-widest mt-1">
            {t("loading.percentage")}
          </div>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="w-80 mt-12 relative">
        {/* HUD corners */}
        <div className="absolute -top-2 -left-2 w-3 h-3 border-t-2 border-l-2 border-primary opacity-50" />
        <div className="absolute -top-2 -right-2 w-3 h-3 border-t-2 border-r-2 border-primary opacity-50" />
        <div className="absolute -bottom-2 -left-2 w-3 h-3 border-b-2 border-l-2 border-primary opacity-50" />
        <div className="absolute -bottom-2 -right-2 w-3 h-3 border-b-2 border-r-2 border-primary opacity-50" />

        <div className="h-1 w-full bg-secondary-deep/30 overflow-hidden relative">
          <div
            className="h-full bg-primary shadow-[0_0_10px_var(--primary)] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
