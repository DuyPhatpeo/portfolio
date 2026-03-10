import React from "react";
import { motion, type Variants } from "framer-motion";
import { useTranslation } from "react-i18next";

import Bio from "./Bio";
import PersonalInfo from "./PersonalInfo";
import Achievements from "./Achievements";
import Quote from "./Quote";
import SectionHeader from "../../components/ui/SectionHeader";

// Container: điều khiển stagger
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// Item: fade + slide up
const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const AboutSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <motion.section
      id="about"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="py-24 relative scroll-mt-20 md:scroll-mt-24 overflow-hidden bg-card/40 border-y border-primary/5"
    >
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 cyber-grid-subtle pointer-events-none" />

      {/* Background Glow */}
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-secondary/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants}>
          <SectionHeader title={t("about.title")} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Bio />
        </motion.div>

        <motion.div variants={itemVariants}>
          <PersonalInfo />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Achievements />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Quote />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
