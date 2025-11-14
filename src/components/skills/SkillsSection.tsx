import React from "react";
import SkillsHeader from "./SkillsHeader";
import SkillsGrid from "./SkillsGrid";

const SkillsSection: React.FC = () => (
  <section id="skills" className="py-20 px-6 max-w-7xl mx-auto relative">
    <SkillsHeader />
    <SkillsGrid />
  </section>
);

export default SkillsSection;
