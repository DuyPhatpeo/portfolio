import React from "react";
import { aboutData } from "../../data/aboutData";

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 px-6 max-w-6xl mx-auto scroll-mt-16">
      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-deep to-secondary mb-4">
          Về Tôi
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
      </div>

      <div className="relative backdrop-blur-2xl rounded-3xl shadow-2xl p-10 md:p-12 border overflow-hidden bg-white/5 border-white/10">
        {/* Decorative gradient overlay */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/20 rounded-full blur-3xl opacity-20 pointer-events-none" />

        {/* Content wrapper */}
        <div className="relative z-10">
          {/* Header with avatar */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            {/* Avatar with animated ring */}
            <div className="relative group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              <img
                src={aboutData.avatar}
                alt={aboutData.name}
                className="relative w-40 h-40 md:w-48 md:h-48 rounded-full object-cover ring-4 ring-primary/30 shadow-2xl group-hover:scale-105 transition-transform duration-500"
              />
              {/* Decorative dots */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full animate-pulse" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-secondary rounded-full animate-pulse" />
            </div>

            {/* Name and bio */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-deep mb-4">
                {aboutData.name}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed max-w-2xl">
                {aboutData.bio}
              </p>
            </div>
          </div>

          {/* Personal Info Grid */}
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {aboutData.personal.map(({ icon: Icon, label, value }, i) => (
              <div
                key={i}
                className="group relative backdrop-blur-sm rounded-2xl p-5 border transition-all duration-300 hover:scale-[1.02] bg-white/5 border-white/10 hover:bg-white/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
              >
                {/* Animated background on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative flex items-start gap-4">
                  {/* Icon container */}
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>

                  {/* Text content */}
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400 mb-1">
                      {label}
                    </p>
                    <p className="font-bold text-gray-800 dark:text-gray-100 text-lg">
                      {value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div className="flex flex-wrap gap-3 mb-10 justify-center md:justify-start">
            {aboutData.achievements.map(({ icon: Icon, label, color }, i) => (
              <div
                key={i}
                className="group relative backdrop-blur-sm rounded-full px-5 py-2.5 border transition-all duration-300 hover:scale-105 hover:shadow-lg bg-white/5 border-white/10 hover:bg-white/10 hover:border-primary/30"
                style={{
                  animationDelay: `${i * 100}ms`,
                }}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300" />

                <div className="relative flex items-center gap-2">
                  <Icon className={`w-5 h-5 ${color}`} />
                  <span className="font-bold text-sm text-gray-700 dark:text-gray-200">
                    {label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quote with decorative elements */}
          <div className="relative mt-12 pt-10 border-t border-white/10">
            {/* Quote marks */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl font-serif shadow-lg">
              "
            </div>

            <div className="text-center max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl font-medium italic text-gray-700 dark:text-gray-300 leading-relaxed">
                {aboutData.quote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
