import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { profileData } from "../../constants/profileData";

const AboutSection: React.FC = () => {
  const { t } = useTranslation();
  const { avatar } = profileData;

  const paragraphs = t("about.paragraphs", { returnObjects: true }) as string[];

  return (
    <section id="about" className="py-32 relative overflow-hidden bg-[var(--background-alt)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Left: Image Container */}
          <div className="lg:col-span-5 relative group">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="relative aspect-square md:aspect-[4/5] overflow-hidden bg-card/50 backdrop-blur-sm cyber-chamfer"
            >
              <img
                src={avatar}
                alt="About Me"
                className="w-full h-full object-cover transition-transform duration-700"
              />

              {/* Subtle HUD scanlines on image */}
              <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(var(--primary-rgb),0.03)_2px,rgba(var(--primary-rgb),0.03)_4px)] opacity-30"></div>
            </motion.div>

            {/* Decorative corner accents */}
            <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-primary/40 pointer-events-none"></div>
            <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-primary/40 pointer-events-none"></div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-mono text-xs md:text-sm tracking-[0.3em] uppercase block mb-3">
                {t("about.subtitle")}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black text-foreground uppercase tracking-tight leading-none mb-6">
                {t("about.title")}
              </h2>
              <div className="h-1.5 w-24 bg-primary/30 rounded-full"></div>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              {paragraphs.map((text, index) => (
                <p key={index} className="text-foreground/90 text-base md:text-lg leading-relaxed font-mono">
                  {text}
                </p>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
