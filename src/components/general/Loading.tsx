import React from "react";
import { useTranslation } from "react-i18next";
import Particles from "../theme/Particles";

interface LoadingProps {
  progress: number;
}

const Loading: React.FC<LoadingProps> = ({ progress }) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-[9999] bg-background text-foreground font-mono overflow-hidden flex flex-col items-center justify-center">
      {/* Background Layer: Particles */}
      <div className="absolute inset-0 z-0">
        <Particles quantity={60} />
      </div>

      {/* Top Progress Bar */}
      <div className="absolute top-0 left-0 w-full z-20">
        <div className="h-1 md:h-1.5 w-full bg-foreground/5 relative overflow-hidden">
          {/* Active bar */}
          <div
            className="h-full bg-gradient-to-r from-primary via-accent-tertiary to-secondary shadow-[0_0_20px_var(--primary)] transition-all duration-300 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-0 h-full w-6 bg-primary/20 drop-shadow-[0_0_25px_var(--primary)] animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main Content Area: Brand & Loading Text */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Brand Text */}
        <div className="relative inline-block">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-sans font-bold tracking-[0.4em] text-foreground/20 md:ml-[0.4em]">
            DINO PÉO
          </h2>
          <div 
            className="absolute top-0 left-0 overflow-hidden whitespace-nowrap transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-sans font-bold tracking-[0.4em] text-foreground md:ml-[0.4em] drop-shadow-[0_0_20px_var(--foreground-glow)] dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">
              DINO PÉO
            </h2>
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="relative inline-block mt-8 md:mt-12">
          <div className="text-xs md:text-sm tracking-[1em] text-primary/30 md:ml-[1em] uppercase font-bold">
            {t("loading.title", "LOADING...")}
          </div>
          <div 
            className="absolute top-0 left-0 overflow-hidden whitespace-nowrap transition-all duration-300 ease-out z-10"
            style={{ width: `${progress}%` }}
          >
            <div className="text-xs md:text-sm tracking-[1em] text-primary md:ml-[1em] uppercase font-bold drop-shadow-[0_0_15px_var(--primary)]">
              {t("loading.title", "LOADING...")}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Right Percentage */}
      <div className="absolute bottom-6 right-8 md:bottom-12 md:right-16 z-20">
        <div className="flex items-start md:items-end text-foreground">
          <span className="text-6xl md:text-8xl lg:text-[10rem] font-sans font-black tabular-nums leading-none tracking-tighter drop-shadow-[0_0_30px_var(--foreground-glow)] dark:drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            {Math.round(progress)}
          </span>
          <span className="text-xl md:text-3xl lg:text-5xl text-primary font-bold mb-1 md:mb-3 lg:mb-5 ml-1 drop-shadow-[0_0_10px_var(--primary)]">
            {t("loading.percentage")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
