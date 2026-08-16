import React from "react";
import { motion } from "framer-motion";
import SkillsGrid from "./SkillsGrid";
import { useTranslation } from "react-i18next";

const SkillsSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="skills" className="py-16 md:py-24 relative overflow-hidden bg-transparent">
      <motion.div
        className="max-w-7xl mx-auto px-6 md:px-12 mb-10 md:mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
      >
        <span className="text-primary font-mono text-xs md:text-sm tracking-[0.3em] uppercase block mb-3">
          {t("skills.subtitle")}
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black text-foreground uppercase tracking-tight leading-none mb-6">
          {t("skills.title")}
        </h2>
        <p className="max-w-2xl text-foreground/90 text-base md:text-lg font-mono text-justify">
          {t("skills.description")}
        </p>
      </motion.div>
      <SkillsGrid />
    </section>
  );
};

export default SkillsSection;
