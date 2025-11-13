import React from "react";
import { aboutData } from "../../data/aboutData";

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20 md:scroll-mt-24"
    >
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold leading-snug bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          About Me
        </h2>
      </div>

      {/* Avatar and Bio */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <img
          src={aboutData.avatar}
          alt={aboutData.name}
          className="w-48 h-48 rounded-full object-cover ring-4 ring-primary/30 shadow-2xl"
        />
        <div className="text-center md:text-left flex-1">
          <h3 className="text-3xl md:text-4xl font-extrabold mb-4 bg-clip-text leading-snug text-transparent bg-gradient-to-r from-primary to-primary-deep">
            {aboutData.name}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            {aboutData.bio}
          </p>
        </div>
      </div>

      {/* Personal Info */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {aboutData.personal.map(({ icon: Icon, label, value }, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-5 rounded-2xl border border-gray-200/20 dark:border-white/10 bg-white/10 dark:bg-gray-800/30"
          >
            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 mb-1">
                {label}
              </p>
              <p className="font-bold text-gray-800 dark:text-gray-100 text-lg">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {aboutData.achievements.map(({ icon: Icon, label, color }, i) => (
          <div
            key={i}
            className="flex items-center gap-2 justify-center p-3 rounded-full border border-gray-200/20 dark:border-white/10 bg-white/10 dark:bg-gray-800/30"
          >
            <Icon className={`w-5 h-5 ${color}`} />
            <span className="font-bold text-sm text-gray-700 dark:text-gray-200">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Quote */}
      <div className="mt-12 text-center">
        <p className="text-xl md:text-2xl italic font-medium text-gray-700 dark:text-gray-300">
          {aboutData.quote}
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
