import React from "react";
import {
  MonitorSmartphone,
  PenTool,
  Server,
  Rocket,
  Smartphone,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { FadeUp } from "@components/ui/FadeUp";

const WhatIDoSection: React.FC = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: t("whatIDo.services.0.title", "Frontend Development"),
      description: t(
        "whatIDo.services.0.description",
        "Building modern, interactive user interfaces."
      ),
      icon: <MonitorSmartphone />,
    },
    {
      title: t("whatIDo.services.1.title", "UI/UX Implementation"),
      description: t(
        "whatIDo.services.1.description",
        "Smooth animations and pixel-perfect precision."
      ),
      icon: <PenTool />,
    },
    {
      title: t("whatIDo.services.2.title", "Backend Integration"),
      description: t(
        "whatIDo.services.2.description",
        "Connecting interfaces with robust APIs."
      ),
      icon: <Server />,
    },
    {
      title: t("whatIDo.services.3.title", "Performance & SEO"),
      description: t(
        "whatIDo.services.3.description",
        "Optimizing speed and accessibility."
      ),
      icon: <Rocket />,
    },
    {
      title: t("whatIDo.services.4.title", "Mobile Development"),
      description: t(
        "whatIDo.services.4.description",
        "Building cross-platform native applications with React Native."
      ),
      icon: <Smartphone />,
    },
  ];

  return (
    <section className="w-full bg-transparent border-t border-border/60 relative overflow-hidden py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 w-full flex flex-col gap-12 md:gap-14">
        <FadeUp className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-foreground tracking-tight leading-[1.1]">
            {t("whatIDo.title", "What I Do")}
          </h2>
          <div className="hidden md:block h-px flex-1 max-w-xs bg-border mb-2" />
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 w-full">
          {services.map((service, idx) => {
            let colSpan = "md:col-span-1";
            if (idx === 0) colSpan = "md:col-span-2";
            if (idx === 2) colSpan = "md:col-span-2";
            if (idx === 4) colSpan = "md:col-span-2";

            return (
              <FadeUp
                key={idx}
                delay={idx * 0.08}
                className={`flex flex-col justify-between h-full p-7 md:p-9 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors duration-300 relative group ${colSpan}`}
              >
                <div className="flex items-center justify-between mb-12 md:mb-16">
                  <div className="w-13 h-13 rounded-xl bg-muted flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors duration-300">
                    {React.cloneElement(
                      service.icon as React.ReactElement<{ className?: string }>,
                      { className: "w-6 h-6" }
                    )}
                  </div>
                  <span className="font-mono text-base text-muted-foreground">
                    0{idx + 1}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl md:text-3xl font-sans font-semibold mb-3.5 text-foreground tracking-tight leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg md:text-xl max-w-[50ch]">
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
