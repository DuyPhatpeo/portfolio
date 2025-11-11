// src/pages/HomePage.tsx
import React, { useEffect } from "react";
import Header from "../components/general/Header";

const PorfolioPage: React.FC = () => {
  useEffect(() => {
    document.title = "My Portfolio";
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  // Scroll tới section với offset sticky header
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -64; // header height = 16
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-500 bg-transparent text-gray-900 dark:text-gray-100">
      {/* Header */}
      <Header scrollToSection={scrollToSection} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Home Section */}
        <section
          id="home"
          className="min-h-screen flex flex-col justify-center items-center text-center px-4 pt-16 scroll-mt-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Hi, I'm John Doe
          </h1>
          <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 mb-6">
            Frontend Developer | React & Tailwind Enthusiast
          </p>
          <button
            onClick={() => scrollToSection("projects")}
            className="px-6 py-3 rounded-md bg-primary text-white hover:bg-primary-deep transition-colors duration-200"
          >
            View My Work
          </button>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="py-20 px-4 max-w-4xl mx-auto scroll-mt-16"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">About Me</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            I'm a passionate frontend developer with experience building
            responsive and modern web applications using React, TypeScript, and
            TailwindCSS. I love creating interactive user interfaces and
            learning new web technologies.
          </p>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className="py-20 px-4 max-w-4xl mx-auto scroll-mt-16"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center">
            {[
              "React",
              "TypeScript",
              "TailwindCSS",
              "JavaScript",
              "HTML",
              "CSS",
            ].map((skill) => (
              <div
                key={skill}
                className="py-4 px-2 rounded-md shadow-md bg-gray-50 dark:bg-gray-800 transition-colors"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="py-20 px-4 max-w-6xl mx-auto scroll-mt-16"
        >
          <h2 className="text-3xl font-bold mb-6 text-center">Projects</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {["Project A", "Project B", "Project C", "Project D"].map(
              (proj) => (
                <div
                  key={proj}
                  className="rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-900 transition-colors"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{proj}</h3>
                    <p className="text-gray-600 dark:text-gray-300">
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
          className="py-20 px-4 max-w-4xl mx-auto text-center scroll-mt-16"
        >
          <h2 className="text-3xl font-bold mb-6">Contact Me</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Interested in working together? Reach out to me via email or social
            media.
          </p>
          <a
            href="mailto:example@email.com"
            className="px-6 py-3 rounded-md bg-primary text-white hover:bg-primary-deep transition-colors duration-200"
          >
            Say Hello
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 relative z-10">
        © {new Date().getFullYear()} John Doe. Crafted with 🧠 & ⚙️
      </footer>
    </div>
  );
};

export default PorfolioPage;
