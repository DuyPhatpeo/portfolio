import React from "react";
import { useTranslation } from "react-i18next";

const Bio: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto mt-12 mb-16 space-y-8 text-center lg:text-left">
      {/* Profile Header Block */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="inline-flex items-center gap-4 px-6 py-3 border border-primary/20 bg-primary/5 cyber-chamfer">
          <div className="w-2 h-2 bg-primary animate-pulse" />
          <h3 className="text-2xl md:text-3xl font-black uppercase tracking-[0.2em] text-foreground font-heading">
            {t("about.profile")} <span className="text-primary">{t("about.name")}</span>
          </h3>
        </div>
        </div>

      {/* Profile Bio Block */}
      <div className="relative p-8 border border-primary/20 bg-card/30 backdrop-blur-sm cyber-chamfer group transition-all duration-500 hover:border-primary/40">
        <div className="absolute -top-1 -right-1 w-12 h-1 bg-primary/40" />
        <div className="absolute -bottom-1 -left-1 w-12 h-1 bg-primary/40" />

        <p className="text-foreground/90 font-mono text-base md:text-lg leading-relaxed lg:pl-6 lg:border-l-2 lg:border-primary/20 group-hover:border-primary/40 transition-colors">
          {t("about.bio")}
        </p>

        <div className="mt-8 flex justify-center lg:justify-start gap-3">
          <span className="w-12 h-1 bg-primary/40 animate-pulse" />
          <span className="w-8 h-1 bg-primary/20" />
          <span className="w-4 h-1 bg-primary/10" />
        </div>

        {/* Decorative HUD Elements */}
        <div className="absolute top-2 right-2 flex gap-1">
          <div className="w-1 h-3 bg-primary/10" />
          <div className="w-1 h-3 bg-primary/20" />
          <div className="w-1 h-3 bg-primary/30" />
        </div>
      </div>
    </div>
  );
};

export default Bio;
