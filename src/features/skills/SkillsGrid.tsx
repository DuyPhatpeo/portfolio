import React from "react";
import { motion } from "framer-motion";
import { skills } from "../../constants/skillsData";
import SkillNode from "./SkillNode";

const SkillsGrid: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <SkillNode skill={skill} className="w-full" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SkillsGrid;
