import React from "react";
import SkillsGrid from "./SkillsGrid";
import SectionHeader from "../ui/SectionHeader";

const SkillsSection: React.FC = () => (
  <section id="skills" className="py-20 px-6 max-w-7xl mx-auto relative">
    <SectionHeader title="Skills" />
    <SkillsGrid />
  </section>
);

export default SkillsSection;
