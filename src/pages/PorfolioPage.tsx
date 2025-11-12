// src/pages/HomePage.tsx
import React, { useEffect } from "react";
import Header from "../components/general/Header";
import AboutSection from "../components/section/AboutSection";
import HeroSection from "../components/section/HeroSetion";
import SkillsSection from "../components/section/SkillsSection";

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

        {/* Projects Section */}
        <section
          id="projects"
          className="py-20 px-6 max-w-6xl mx-auto scroll-mt-16"
        >
          <h2 className="text-3xl font-bold mb-10 text-center">Projects</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {["Project A", "Project B", "Project C", "Project D"].map(
              (proj) => (
                <div
                  key={proj}
                  className="rounded-2xl overflow-hidden backdrop-blur-md bg-white/20 dark:bg-gray-900/30 border border-white/10 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{proj}</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </section>

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
