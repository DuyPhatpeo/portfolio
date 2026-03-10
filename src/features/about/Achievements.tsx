import React from "react";
import { aboutData } from "../../constants/aboutData";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Achievements: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      {aboutData.achievements.map(({ icon: Icon, labelKey }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="
              relative group
              bg-card border border-primary/10 dark:border-primary/20
              p-6 md:p-8 flex flex-col gap-5
              transition-all duration-300
              hover:border-primary/60 hover:shadow-[0_0_20px_var(--primary)]
              cyber-chamfer
            "
        >
          {/* Corner accent (Top-left small cut) */}
          <div className="absolute top-0 left-0 w-3 h-[2px] bg-primary/40 group-hover:bg-primary transition-colors" />
          <div className="absolute top-0 left-0 w-[2px] h-3 bg-primary/40 group-hover:bg-primary transition-colors" />

          {/* Icon Box - Solid Primary */}
          <div className="w-12 h-12 flex items-center justify-center bg-primary cyber-chamfer shadow-[0_0_15px_var(--primary)]">
            <Icon className="w-6 h-6 text-black" />
          </div>

          {/* Text */}
          <div className="space-y-2">
            <h4 className="text-lg md:text-xl font-heading font-black text-primary uppercase tracking-tight group-hover:glitch-sm">
              {t(labelKey)}
            </h4>
            <div className="w-12 h-[2px] bg-primary/20 group-hover:w-full transition-all duration-500" />
            <p className="font-mono text-[10px] text-foreground/50 uppercase tracking-[0.2em]">
              Clearance: Level {i + 4} // Verified
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Achievements;
