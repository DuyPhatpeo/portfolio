import React, { useMemo } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import { skills } from "../../constants/skillsData";
import type { SkillCategory } from "../../types/data";
import SkillNode from "./SkillNode";

const CATEGORY_ORDER: SkillCategory[] = ["frontend", "backend", "database", "tools", "design"];

// Deterministic pseudo-random scatter offset per skill, so each icon flies
// in from a different, messy direction and settles into its grid slot.
function scatterFor(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  const rand = (n: number) => {
    hash = (hash * 1103515245 + 12345) | 0;
    return ((hash >>> 0) % 1000) / 1000 * n;
  };
  const sign = () => (rand(2) < 1 ? -1 : 1);
  return {
    x: sign() * (20 + rand(50)),
    y: sign() * (20 + rand(40)),
    rotate: sign() * (8 + rand(20)),
  };
}

const groupVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants: Variants = {
  hidden: (custom: { x: number; y: number; rotate: number }) => ({
    opacity: 0,
    x: custom.x,
    y: custom.y,
    rotate: custom.rotate,
    scale: 0.5,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const SkillsGrid: React.FC = () => {
  const { t } = useTranslation();

  const groups = CATEGORY_ORDER.map((category) => ({
    category,
    items: skills.filter((skill) => skill.category === category),
  })).filter((group) => group.items.length > 0);

  const scatterMap = useMemo(() => {
    const map = new Map<string, { x: number; y: number; rotate: number }>();
    skills.forEach((skill) => map.set(skill.name, scatterFor(skill.name)));
    return map;
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
      {groups.map((group) => (
        <div key={group.category}>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-40px" }}
            className="text-primary font-mono text-xs md:text-sm tracking-[0.3em] uppercase mb-4 flex items-center gap-3"
          >
            {t(`skills.categories.${group.category}`)}
            <span className="h-px flex-1 bg-primary/20" />
          </motion.h3>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={groupVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {group.items.map((skill) => (
              <motion.div
                key={skill.name}
                custom={scatterMap.get(skill.name)}
                variants={itemVariants}
              >
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
