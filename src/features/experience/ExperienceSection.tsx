import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ScrollStack, { ScrollStackItem } from "../../components/ui/ScrollStack/ScrollStack";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  type: string;
  tech: string;
  tasks?: string[];
}

const ExperienceSection: React.FC = () => {
  const { t } = useTranslation();
  const items = t("experience.items", { returnObjects: true }) as ExperienceItem[];

  if (!items || items.length === 0) return null;

  return (
    <section
      id="experience"
      className="min-h-screen py-16 md:py-24 relative bg-[var(--background-alt)] overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb,97,255,202),0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[85rem] mx-auto px-6 md:px-12 relative z-10 w-full">
        
        {/* Standardized Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-primary font-mono text-xs md:text-sm tracking-[0.3em] uppercase block mb-3">
            {t("experience.subtitle")}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black text-foreground uppercase tracking-tight leading-none mb-6 drop-shadow-sm">
            {t("experience.title")}
          </h2>
          <p className="max-w-2xl text-foreground/60 text-base md:text-lg font-mono text-justify">
            {t("experience.description")}
          </p>
        </motion.div>

        {/* Stacked Experience Cards */}
        <ScrollStack useWindowScroll itemDistance={80} itemStackDistance={40} baseScale={0.88}>
          {items.map((item, i) => {
            const techList = item.tech ? item.tech.split(",").map((s) => s.trim()) : [];
            return (
              <ScrollStackItem
                key={i}
                itemClassName="bg-card border border-primary/20 flex flex-col lg:flex-row lg:items-center justify-between gap-8"
              >
                {/* Left: Title & Period */}
                <div className="flex flex-col lg:w-2/3">
                  <div className="flex flex-wrap items-center gap-4 font-mono text-sm md:text-base text-primary mb-4 uppercase tracking-widest">
                    <span>{item.period}</span>
                    <span className="w-8 h-[1px] bg-primary/50 hidden md:block" />
                    <span>{item.type}</span>
                  </div>

                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-foreground">
                    {item.role}
                  </h3>

                  {item.tasks && item.tasks.length > 0 && (
                    <ul className="mt-6 space-y-2 text-foreground/70 font-sans text-sm md:text-base max-w-xl">
                      {item.tasks.map((task, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="text-primary mt-1 text-xs">▹</span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Right: Company & Tech Stack */}
                <div className="lg:w-1/3 flex flex-col lg:items-end text-left lg:text-right gap-4">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-light text-foreground/90 tracking-tight">
                    {item.company}
                  </div>

                  <div className="font-mono text-sm md:text-base text-foreground/50 leading-relaxed max-w-sm">
                    {techList.join(" / ")}
                  </div>
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
