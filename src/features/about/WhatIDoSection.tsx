import React from "react";

import { MonitorSmartphone, PenTool, Server, Rocket, Smartphone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FadeUp } from "@components/ui/FadeUp";

const WhatIDoSection: React.FC = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: t("whatIDo.services.0.title", "Frontend Development"),
      description: t("whatIDo.services.0.description", "Building modern, interactive user interfaces."),
      icon: <MonitorSmartphone />,
    },
    {
      title: t("whatIDo.services.1.title", "UI/UX Implementation"),
      description: t("whatIDo.services.1.description", "Smooth animations and pixel-perfect precision."),
      icon: <PenTool />,
    },
    {
      title: t("whatIDo.services.2.title", "Backend Integration"),
      description: t("whatIDo.services.2.description", "Connecting interfaces with robust APIs."),
      icon: <Server />,
    },
    {
      title: t("whatIDo.services.3.title", "Performance & SEO"),
      description: t("whatIDo.services.3.description", "Optimizing speed and accessibility."),
      icon: <Rocket />,
    },
    {
      title: t("whatIDo.services.4.title", "Mobile Development"),
      description: t("whatIDo.services.4.description", "Building cross-platform native applications with React Native."),
      icon: <Smartphone />,
    },
  ];

  return (
    <section className="w-full bg-background border-t border-white/5 relative overflow-hidden -mt-4 pb-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 w-full flex flex-col gap-12 md:gap-16">
        <FadeUp className="flex flex-col items-center text-center pt-16 md:pt-20">
          <h2 className="text-5xl md:text-7xl font-sans font-black italic text-foreground tracking-tight leading-none">
            {t("whatIDo.title", "What I Do")}
          </h2>
          <div className="w-16 h-0.5 bg-primary mt-6" />
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          {services.map((service, idx) => {
            let colSpan = "md:col-span-1";
            if (idx === 0) colSpan = "md:col-span-2"; // Top row: 2 items (span 2, span 1)
            if (idx === 2) colSpan = "md:col-span-3"; // Middle row: 1 item (span 3)
            if (idx === 4) colSpan = "md:col-span-2"; // Bottom row: 2 items (span 1, span 2)
            
            return (
              <FadeUp key={idx} delay={idx * 0.1}
                className={`flex flex-col h-full p-8 md:p-10 rounded-2xl bg-card/30 border border-white/5 hover:bg-card/60 hover:border-white/10 transition-colors duration-500 overflow-hidden relative group ${colSpan}`}
              >
                {/* Subtle top gradient line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="w-12 h-12 flex items-center justify-center mb-16 md:mb-20 text-foreground/40 group-hover:text-primary transition-colors duration-500">
                  {React.cloneElement(service.icon as React.ReactElement<{ className?: string }>, { className: "w-8 h-8 md:w-10 md:h-10" })}
                </div>
                
                <div className="mt-auto z-10 relative">
                  <h3 className={`font-medium mb-2 text-foreground/90 ${idx === 4 ? 'text-3xl md:text-4xl' : (idx === 0 || idx === 3) ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} tracking-tight`}>
                    {service.title}
                  </h3>
                  <p className="text-foreground/50 leading-relaxed text-sm md:text-base max-w-3xl font-normal">
                    {service.description}
                  </p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatIDoSection;



