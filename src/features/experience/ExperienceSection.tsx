import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { RiBriefcase4Fill, RiCodeSSlashLine } from "react-icons/ri";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  type: string;
  bullets: string[];
  tech: string;
}

const ExperienceSection: React.FC = () => {
  const { t } = useTranslation();
  const items = t("experience.items", { returnObjects: true }) as ExperienceItem[];

  return (
    <section
      id="experience"
      className="min-h-screen pt-24 pb-56 relative overflow-hidden bg-[var(--background-alt)]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-primary font-mono text-xs md:text-sm tracking-[0.3em] uppercase block mb-3">
            {t("experience.subtitle")}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black text-foreground uppercase tracking-tight leading-none mb-6">
            {t("experience.title")}
          </h2>
          <p className="max-w-2xl text-foreground/90 text-base md:text-lg font-mono">
            {t("experience.description")}
          </p>
        </motion.div>

        {/* Center Timeline */}
        <div className="relative">
          {/* Center vertical line — hidden on mobile, shown md+ */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/25 to-transparent" />

          <div className="flex flex-col gap-16">
            {items.map((item, i) => {
              const isLeft = i % 2 === 0;
              const techList = item.tech.split(",").map((s) => s.trim());

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col md:flex-row items-center gap-12 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Card — takes up ~half width */}
                  <div className={`w-full md:w-[calc(50%-2rem)] group relative bg-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/30 rounded-2xl p-6 md:p-8 overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(var(--primary-rgb,139,92,246),0.07)]`}>
                    {/* Type badge */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <RiBriefcase4Fill size={11} className="text-primary" />
                      <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-primary uppercase">
                        {item.type}
                      </span>
                    </div>

                    {/* Role */}
                    <h3 className="text-xl md:text-2xl font-sans font-black uppercase tracking-tight text-foreground leading-tight mb-1">
                      {item.role}
                    </h3>
                    <p className="text-sm font-mono text-foreground/50 mb-5">{item.company}</p>

                    {/* Tech */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <RiCodeSSlashLine size={13} className="text-primary/50 shrink-0" />
                      {techList.map((tech, ti) => (
                        <span
                          key={ti}
                          className="text-[10px] font-mono text-foreground/50 bg-foreground/5 border border-border/40 px-2 py-0.5 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Center dot + period — on md+ */}
                  <div className="hidden md:flex flex-col items-center gap-2 shrink-0 w-16 z-10">
                    <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_var(--primary)] ring-4 ring-background" />
                    <span className="text-[10px] font-mono font-bold text-primary/70 tracking-widest text-center whitespace-nowrap">
                      {item.period}
                    </span>
                  </div>

                  {/* Mobile period badge */}
                  <span className="md:hidden text-[10px] font-mono font-bold text-primary/70 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full self-start">
                    {item.period}
                  </span>

                  {/* Empty space for the other side */}
                  <div className="hidden md:block w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
