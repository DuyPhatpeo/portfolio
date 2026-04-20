import React from "react";
import { useTranslation } from "react-i18next";

interface LoadingProps {
  progress: number;
}

const Loading: React.FC<LoadingProps> = ({ progress }) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-[9999] bg-background text-foreground font-mono overflow-hidden flex flex-col items-center justify-center">


      {/* Main Content Area: Brand & Loading Text */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Brand Text */}
        <div className="relative inline-block">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-sans font-bold tracking-[0.4em] text-foreground/20 md:ml-[0.4em] py-4">
            DINO PÉO
          </h2>
          <div 
            className="absolute top-0 left-0 overflow-hidden whitespace-nowrap transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-sans font-bold tracking-[0.4em] text-foreground md:ml-[0.4em] drop-shadow-[0_0_20px_var(--foreground-glow)] dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] py-4">
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
