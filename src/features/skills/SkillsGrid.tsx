import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import { skills } from "@constants/skillsData";
import type { SkillCategory } from "@/types/data";
import SkillNode from "./SkillNode";

const CATEGORY_ORDER: SkillCategory[] = [
  "frontend",
  "backend",
  "database",
  "tools",
  "design",
];

const groupVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const SkillsGrid: React.FC = () => {
  const { t } = useTranslation();

  const groups = CATEGORY_ORDER.map((category) => ({
    category,
    items: skills.filter((skill) => skill.category === category),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 space-y-10 sm:space-y-12">
      {groups.map((group) => (
        <div key={group.category}>
          <div className="flex items-center gap-4 mb-5">
            <h3 className="font-mono text-base sm:text-lg font-medium text-foreground/85">
              {t(`skills.categories.${group.category}`)}
            </h3>
            <span className="h-px flex-1 bg-border" />
          </div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4"
            variants={groupVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {group.items.map((skill) => (
              <motion.div key={skill.name} variants={itemVariants}>
                <SkillNode skill={skill} className="w-full" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default SkillsGrid;
