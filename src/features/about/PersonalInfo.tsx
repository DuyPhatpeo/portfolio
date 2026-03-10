import React from "react";
import { aboutData } from "../../constants/aboutData";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const PersonalInfo: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {aboutData.personal.map(
        ({ icon: Icon, labelKey, valueKey }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="
              relative group
              bg-card border border-primary/10 dark:border-primary/20
              p-6 flex flex-col gap-5
              transition-all duration-300
              hover:border-primary/60 hover:shadow-[0_0_20px_var(--primary)]
              cyber-chamfer
            "
          >
            {/* Corner accent (Top-left small cut) */}
            <div className="absolute top-0 left-0 w-3 h-[2px] bg-primary/40 group-hover:bg-primary" />
            <div className="absolute top-0 left-0 w-[2px] h-3 bg-primary/40 group-hover:bg-primary" />

            {/* Icon Box - Solid Primary */}
            <div className="w-12 h-12 flex items-center justify-center bg-primary cyber-chamfer shadow-[0_0_15px_rgba(0,255,136,0.3)]">
              <Icon className="w-6 h-6 text-black" />
            </div>

            {/* Text Content */}
            <div className="space-y-1">
              <h4 className="text-lg md:text-xl font-heading font-black text-primary uppercase tracking-tight group-hover:glitch-sm">
                {t(labelKey).replace(":", "")}
              </h4>
              <p className="font-mono text-sm text-foreground/70 leading-relaxed uppercase tracking-widest">
                {t(valueKey)}
              </p>
            </div>
          </motion.div>
        ),
      )}
    </div>
  );
};

export default PersonalInfo;
