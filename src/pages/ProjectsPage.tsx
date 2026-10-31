import React, { useEffect } from "react";
import Header from "@components/general/Header";
import Footer from "@components/general/Footer";
import SeoHead from "@components/general/SeoHead";
import ProjectsSection from "@features/project/ProjectSecion";
import GithubSection from "@features/github/GithubSection";

import { useNavigate } from "react-router-dom";

import PageHero from "@components/general/PageHero";
import { useTranslation } from "react-i18next";

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === "projects") return;
    if (id === "contact") {
      navigate("/contact");
      return;
    }
    navigate(`/#${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-foreground transition-colors duration-300">
      <SeoHead page="projects" path="/projects" />
      <Header scrollToSection={scrollToSection} />

      <main className="relative z-10 flex-1 min-h-screen">
        <div className="relative z-10">
          <PageHero
            title1={t("pageHero.projects_1", "Selected")}
            title2={t("pageHero.projects_2", "Projects")}
            indexLabel="02"
            subtitle={t("projects.page_intro")}
          />
          <ProjectsSection mode="all-list" />
          <GithubSection />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
