"use client";

import React from "react";
import {
  MonitorSmartphone,
  PenTool,
  Server,
  Rocket,
  Smartphone,
  CloudCog,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { FadeUp } from "@components/ui/FadeUp";

const WhatIDoSection: React.FC = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: t("whatIDo.services.0.title", "Web Application Development"),
      description: t(
        "whatIDo.services.0.description",
        "Building modern, interactive web applications."
      ),
      icon: <MonitorSmartphone />,
    },
    {
      title: t("whatIDo.services.1.title", "UI/UX & Interactive Motion"),
      description: t(
        "whatIDo.services.1.description",
        "Smooth animations and pixel-accurate precision."
      ),
      icon: <PenTool />,
    },
    {
      title: t("whatIDo.services.2.title", "Backend & API Architecture"),
      description: t(
        "whatIDo.services.2.description",
        "Connecting interfaces with reliable databases and APIs."
      ),
      icon: <Server />,
    },
    {
      title: t("whatIDo.services.3.title", "Speed & Technical SEO"),
      description: t(
        "whatIDo.services.3.description",
        "Optimizing load speed, Core Web Vitals, and search visibility."
      ),
      icon: <Rocket />,
    },
    {
      title: t("whatIDo.services.4.title", "Mobile App Development"),
      description: t(
        "whatIDo.services.4.description",
        "Building cross-platform iOS and Android applications."
      ),
      icon: <Smartphone />,
    },
    {
      title: t("whatIDo.services.5.title", "Deployment & Operations"),
      description: t(
        "whatIDo.services.5.description",
        "Shipping to production, configuring domains & SSL, and maintaining reliable uptime."
      ),
      icon: <CloudCog />,
    },
  ];

  return (
    <section className="w-full bg-card/55 border-y border-border/70 relative overflow-hidden py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 w-full flex flex-col gap-12 md:gap-14">
        <FadeUp className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-foreground tracking-tight leading-[1.1]">
            {t("whatIDo.title", "What I Do")}
          </h2>
          <div className="hidden md:block h-px flex-1 max-w-xs bg-border mb-2" />
        </FadeUp>

        {/* 6-block 3x2 grid using CSS subgrid so icons, headings, descriptions, and card heights align across every row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 sm:gap-x-6 gap-y-5 sm:gap-y-6 w-full">
          {services.map((service, idx) => (
            <FadeUp
              key={idx}
              delay={idx * 0.06}
              className="flex flex-col gap-3 sm:grid sm:grid-rows-subgrid sm:row-span-3 sm:gap-y-3 h-full p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors duration-300 relative group"
            >
              {/* Track 1: Top Icon & Index Number */}
              <div className="flex items-center justify-between pb-2 sm:pb-3">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors duration-300 shrink-0">
                  {React.cloneElement(
                    service.icon as React.ReactElement<{ className?: string }>,
                    { className: "w-6 h-6" }
                  )}
                </div>
                <span className="font-mono text-base text-muted-foreground">
                  0{idx + 1}
                </span>
              </div>

              {/* Track 2: Aligned Heading */}
              <h3 className="text-xl md:text-[21px] font-sans font-semibold text-foreground tracking-tight leading-snug self-start">
                {service.title}
              </h3>

              {/* Track 3: Aligned Description */}
              <p className="text-muted-foreground leading-relaxed text-base md:text-[17px] self-start">
                {service.description}
              </p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIDoSection;
