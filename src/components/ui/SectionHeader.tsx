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
      <motion.h2
        className="
          text-4xl md:text-5xl font-extrabold leading-snug
          bg-clip-text text-transparent
          bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]
        "
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.1,
        }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h2>

      {/* Underline */}
      <motion.div
        className="
          h-[3px] w-24 mx-auto mt-4 rounded-full
          bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]
        "
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 96, opacity: 1 }}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.25,
        }}
        viewport={{ once: true }}
      />
    </motion.div>
  );
};

export default SectionHeader;
