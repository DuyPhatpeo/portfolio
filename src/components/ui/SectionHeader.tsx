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
      <motion.div className="relative inline-block border-l-4 border-tech-teal pl-6 py-2">
        <motion.h2
          className="
            text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-widest text-tech-light
            drop-shadow-[0_0_10px_rgba(68,187,164,0.3)]
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
        <div className="absolute top-0 right-[-30px] w-6 h-2 bg-tech-teal/40"></div>
        <div className="absolute top-0 right-[-40px] w-2 h-2 bg-tech-teal/80"></div>
        <div className="absolute bottom-0 right-[-20px] w-12 h-[2px] bg-tech-teal/50"></div>
      </motion.div>
    </motion.div>
  );
};

export default SectionHeader;
