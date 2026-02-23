import React from "react";
import SkillsGrid from "./SkillsGrid";
import SectionHeader from "../ui/SectionHeader";
import { useTranslation } from "react-i18next";

const SkillsSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="skills" className="py-20 px-6 max-w-7xl mx-auto relative">
      <SectionHeader title={t("skills.title")} />
      <SkillsGrid />
    </section>
  );
};

export default SkillsSection;
