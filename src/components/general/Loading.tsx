import React from "react";
import { useTranslation } from "react-i18next";
import Particles from "../theme/Particles";

interface LoadingProps {
  progress: number;
}

const Loading: React.FC<LoadingProps> = ({ progress }) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-[9999] bg-[#050505] text-foreground font-mono overflow-hidden flex flex-col items-center justify-center">
      {/* Background Layer: Particles + Cyber Grid */}
      <div className="absolute inset-0 z-0">
        <Particles quantity={60} />
        <div className="absolute inset-0 cyber-grid opacity-20" />
      </div>

      {/* Top Left Status Box */}
      <div className="absolute top-8 left-8 z-10 hidden md:block">
        <div className="flex flex-col gap-1 text-[10px] text-primary/40 uppercase tracking-[0.2em]">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-primary animate-pulse" />
            <span>Connection: Secure</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-secondary animate-pulse [animation-delay:200ms]" />
            <span>Identity: DP-Portfolio</span>
          </div>
          <div className="mt-2 text-[9px] opacity-30 leading-relaxed font-mono">
            {`> INITIALIZING_CORE_SYSTEMS...`} <br />
            {`> LOADING_ASSETS_SECTOR_${Math.floor(progress / 20)}...`} <br />
            {`> STATUS: ${progress < 100 ? 'SYNCING' : 'READY'}`}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-2xl px-6 flex flex-col items-center">
        {/* Title / Brand */}
        <div className="mb-12 relative group">
          <h2 className="text-2xl md:text-3xl font-sans font-bold tracking-[0.5em] text-white opacity-90">
            DINO PÉO
          </h2>
          <div className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] text-secondary/60 uppercase">
            Portfolio OS v2.0
          </div>
        </div>

        {/* Horizontal Progress Bar - Minimalist */}
        <div className="w-full relative py-4">
          <div className="flex justify-between items-end mb-2">
            <div className="text-[10px] text-primary/70 tracking-widest uppercase">
              System.Process
            </div>
            <div className="text-xl md:text-2xl font-sans font-bold text-white tabular-nums drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              {Math.round(progress)}{t("loading.percentage")}
            </div>
          </div>

          <div className="h-0.5 w-full bg-white/5 relative overflow-hidden">
            {/* Background segments */}
            <div className="absolute inset-0 flex justify-between">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="w-px h-full bg-white/10" />
              ))}
            </div>
            {/* Active bar */}
            <div
              className="h-full bg-gradient-to-r from-primary via-accent-tertiary to-secondary shadow-[0_0_15px_var(--primary)] transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-0 h-full w-4 bg-white shadow-[0_0_20px_white] animate-pulse" />
            </div>
          </div>

          {/* Subtext info */}
          <div className="mt-4 flex justify-between text-[9px] text-white/30 tracking-[0.3em] uppercase">
            <span>Sector.0x{Math.round(progress * 2.5).toString(16).toUpperCase()}</span>
            <span className="animate-pulse">Loading Module: {progress < 50 ? 'UI.Layout' : '3D.Renderer'}</span>
            <span>Est.Time: {((100 - progress) * 0.02).toFixed(1)}s</span>
          </div>
        </div>
      </div>

      {/* Bottom Right HUD Element */}
      <div className="absolute bottom-8 right-8 z-10">
        <div className="relative w-16 h-16 border border-white/5 flex items-center justify-center">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/50" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-secondary/50" />
          <div
            className="w-10 h-10 border border-primary/20 animate-[spin_4s_linear_infinite]"
            style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}
          />
          <div className="absolute text-[8px] text-primary/40">RC-04</div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
