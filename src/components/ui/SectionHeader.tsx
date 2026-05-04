import React from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  center?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  center = true,
}) => {
  return (
    <motion.div
      className={`${center ? "text-center" : ""} mb-16`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Title */}
      <motion.div className="relative inline-block border-l-4 border-primary pl-6 py-2">
        <motion.h2
          className="
            text-3xl md:text-4xl lg:text-5xl font-sans font-black uppercase tracking-widest text-foreground
            drop-shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]
          "
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.1,
          }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h2>

        {/* HUD Sub-elements */}
        <div className="absolute top-0 right-[-30px] w-6 h-2 bg-primary/40"></div>
        <div className="absolute top-0 right-[-40px] w-2 h-2 bg-primary/80 cyber-glow"></div>
        <div className="absolute bottom-0 right-[-20px] w-12 h-[2px] bg-secondary/50"></div>
        <div className="absolute -left-1 bottom-0 w-1 h-8 bg-secondary"></div>
      </motion.div>
    </motion.div>
  );
};

export default SectionHeader;
