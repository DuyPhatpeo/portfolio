import React from "react";
import { motion, type Variants } from "framer-motion";
import { useTranslation } from "react-i18next";

import Bio from "./Bio";
import PersonalInfo from "./PersonalInfo";
import Achievements from "./Achievements";
import Quote from "./Quote";
import SectionHeader from "../ui/SectionHeader";

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
      className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20 md:scroll-mt-24"
    >
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
    </motion.section>
  );
};

export default AboutSection;
