"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ScrollStack, {
  ScrollStackItem,
} from "@components/ui/ScrollStack/ScrollStack";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  type: string;
  summary?: string;
  tech: string;
}

const ExperienceSection: React.FC = () => {
  const { t } = useTranslation();
  const items = t("experience.items", {
    returnObjects: true,
  }) as ExperienceItem[];

  if (!items || items.length === 0) return null;

  return (
    <section
      id="experience"
      className="pt-20 md:pt-28 pb-20 md:pb-32 relative overflow-hidden bg-transparent border-t border-border/60"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 relative z-10 w-full">
        {/* Modern Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16 flex flex-col items-start gap-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>{t("experience.eyebrow", "CAREER PATH")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-foreground tracking-tight leading-[1.1]">
            {t("experience.title")}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mt-1">
            {t("experience.description")}
          </p>
        </motion.div>

        {/* Stacked Experience Cards */}
        <ScrollStack
          useWindowScroll
          itemDistance={64}
          itemStackDistance={32}
          baseScale={0.92}
        >
          {items.map((item, i) => {
            const techList = item.tech
              ? item.tech.split(",").map((s) => s.trim())
              : [];
            return (
              <ScrollStackItem
                key={i}
                itemClassName="bg-popover/90 backdrop-blur-md border border-border flex flex-col lg:flex-row lg:items-center justify-between gap-6 md:gap-10"
              >
                {/* Left: Period, Employment Type & Role */}
                <div className="flex flex-col lg:w-3/5">
                  <div className="flex flex-wrap items-center gap-2.5 font-mono text-base sm:text-lg text-primary mb-3.5">
                    <span>{item.period}</span>
                    <span className="text-border">·</span>
                    <span className="text-muted-foreground">{item.type}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold tracking-tight text-foreground leading-snug">
                    {item.role}
                  </h3>

                  {item.summary && (
                    <p className="mt-3.5 max-w-[52ch] text-lg sm:text-xl text-muted-foreground leading-relaxed">
                      {item.summary}
                    </p>
                  )}
                </div>

                {/* Right: Company & Tech Stack */}
                <div className="lg:w-2/5 flex flex-col lg:items-end text-left lg:text-right gap-3.5">
                  <div className="text-xl sm:text-2xl md:text-3xl font-medium text-foreground/95 tracking-tight">
                    {item.company}
                  </div>

                  {techList.length > 0 && (
                    <div className="flex flex-wrap lg:justify-end gap-2 max-w-md">
                      {techList.map((tech) => (
                        <span
                          key={tech}
                          className="px-3.5 py-1.5 rounded-md bg-muted text-muted-foreground font-mono text-sm sm:text-base"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>
      </div>
    </section>
  );
};

export default ExperienceSection;
