// src/pages/HomePage.tsx
import React, { useEffect } from "react";
import Header from "../components/general/Header";
import AboutSection from "../components/section/AboutSection";
import HeroSection from "../components/section/HeroSetion";
import SkillsSection from "../components/section/SkillsSection";
import ProjectsSection from "../components/section/ProfectSecion";

const PortfolioPage: React.FC = () => {
  useEffect(() => {
    document.title = "My Portfolio";
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  // Scroll mượt tới section (bù trừ header sticky)
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -64; // header height ~ 4rem
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-gray-900 dark:text-gray-100 transition-colors duration-500">
      {/* Header */}
      <Header scrollToSection={scrollToSection} />

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        {/* Home Section */}
        <HeroSection />

        <AboutSection />

        <SkillsSection />

        <ProjectsSection />
        {/* Contact Section */}
        <section
          id="contact"
          className="py-20 px-6 max-w-4xl mx-auto text-center scroll-mt-16"
        >
          <h2 className="text-3xl font-bold mb-6">Contact Me</h2>
          <p className="text-gray-800 dark:text-gray-300 mb-6">
            Interested in working together? Reach out via email or social media.
          </p>
          <a
            href="mailto:example@email.com"
            className="px-6 py-3 rounded-lg bg-primary text-white font-medium shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 inline-block"
          >
            Say Hello
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-white/10 relative z-10 backdrop-blur-sm bg-transparent">
        © {new Date().getFullYear()} Dino Péo. Crafted with 🧠 & ⚙️
      </footer>
    </div>
  );
};

export default PortfolioPage;
