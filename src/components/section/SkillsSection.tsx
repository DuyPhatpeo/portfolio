import React, { useState } from "react";

const skills = [
  {
    name: "HTML",
    logo: "https://skillicons.dev/icons?i=html",
  },
  { name: "CSS", logo: "https://skillicons.dev/icons?i=css" },
  {
    name: "JavaScript",
    logo: "https://skillicons.dev/icons?i=javascript",
  },
  {
    name: "TypeScript",
    logo: "https://skillicons.dev/icons?i=typescript",
  },
  {
    name: "React JS",
    logo: "https://skillicons.dev/icons?i=react",
  },
  {
    name: "Next.js",
    logo: "https://skillicons.dev/icons?i=nextjs&w=white",
  },
  {
    name: "Redux",
    logo: "https://skillicons.dev/icons?i=redux",
  },
  {
    name: "Sass",
    logo: "https://skillicons.dev/icons?i=sass",
  },
  {
    name: "Vite",
    logo: "https://skillicons.dev/icons?i=vite",
  },
  {
    name: "TailwindCSS",
    logo: "https://skillicons.dev/icons?i=tailwind",
  },
  {
    name: "Bootstrap",
    logo: "https://skillicons.dev/icons?i=bootstrap",
  },
  { name: "Figma", logo: "https://skillicons.dev/icons?i=figma" },
  {
    name: "Laravel",
    logo: "https://skillicons.dev/icons?i=laravel",
  },
  { name: "C#", logo: "https://skillicons.dev/icons?i=cs" },
  {
    name: ".NET",
    logo: "https://skillicons.dev/icons?i=dotnet",
  },
  { name: "Git", logo: "https://skillicons.dev/icons?i=git" },
  {
    name: "GitHub",
    logo: "https://skillicons.dev/icons?i=github&w=white",
  },
  { name: "npm", logo: "https://skillicons.dev/icons?i=npm" },
  {
    name: "MySQL",
    logo: "https://skillicons.dev/icons?i=mysql",
  },
];

const SkillsSection = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 mb-4">
          Kỹ Năng
        </h2>
        <p className="text-gray-500 text-lg">
          Những công nghệ và kỹ năng tôi sử dụng hàng ngày
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 max-w-5xl mx-auto">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="relative flex items-center justify-center cursor-pointer transition-transform duration-300"
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            {/* Tooltip */}
            <div
              className={`absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900/90 text-white text-xs font-semibold px-3 py-1 rounded-md pointer-events-none z-50 transition-opacity duration-200 ${
                hoveredSkill === skill.name ? "opacity-100" : "opacity-0"
              }`}
            >
              {skill.name}
            </div>

            {/* Logo */}
            <img
              src={skill.logo}
              alt={skill.name}
              className={`w-16 h-16 object-contain transition-transform duration-300 ${
                hoveredSkill === skill.name ? "scale-110" : "scale-100"
              }`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
