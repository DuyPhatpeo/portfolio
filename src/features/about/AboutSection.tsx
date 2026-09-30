import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { profileData } from "@constants/profileData";
import { Sparkles, ArrowUpRight } from "lucide-react";
import "./about-profile.css";

interface AboutSectionProps {
  scrollToSection: (sectionId: string) => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ scrollToSection }) => {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();

  // Dynamic Typewriter Effect for developer roles
  const roles = (t("hero.roles", { returnObjects: true }) as string[]) || profileData.roles;
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeSpeed, setTypeSpeed] = useState(120);

  useEffect(() => {
    const currentFullText = roles[currentRoleIndex % roles.length] || "";
    const timer = setTimeout(() => {
      if (isDeleting) {
        setDisplayedRole(currentFullText.substring(0, displayedRole.length - 1));
        setTypeSpeed(50);
      } else {
        setDisplayedRole(currentFullText.substring(0, displayedRole.length + 1));
        setTypeSpeed(110);
      }

      if (!isDeleting && displayedRole === currentFullText) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && displayedRole === "") {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, currentRoleIndex, typeSpeed, roles]);

  return (
    <section id="about" className="about-section relative w-full bg-background/50 backdrop-blur-xs" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">

          {/* Left Column: Visual & 3D Character (Ảnh nằm bên trái) */}
          <motion.div
            className="lg:col-span-5 flex justify-center items-center relative z-10"
            initial={reduceMotion ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-full max-w-[500px] mx-auto flex items-center justify-center">
              
              {/* Soft Organic Blob Background with Theme Primary */}
              <div className="absolute inset-0 -top-8 -bottom-4 -left-4 -right-4 about-blob-bg rounded-full pointer-events-none -z-10" />

              {/* Character Visual Wrapper (Tĩnh, không di chuyển lên xuống) */}
              <div className="relative w-full flex items-center justify-center">

                {/* Floating Handwritten Note with Curly Arrow */}
                <div className="absolute -left-3 sm:left-0 top-[28%] z-20 max-w-[140px] sm:max-w-[170px] pointer-events-none">
                  <div className="about-handwritten text-base sm:text-lg font-bold -rotate-6 leading-tight">
                    Turning ideas into digital experiences
                  </div>
                  {/* Curly Hand-drawn Arrow pointing to character */}
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10 text-primary ml-4 -mt-1 transform rotate-12"
                    viewBox="0 0 50 50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M 10 5 Q 35 15, 25 35 Q 22 42, 35 44" />
                    <polyline points="28 45, 36 44, 34 36" />
                  </svg>
                </div>

                {/* Decorative Sparkles & Rings with theme colors */}
                <div className="absolute top-10 left-6 text-primary/70 pointer-events-none">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>

                <div className="absolute bottom-12 -left-3 w-10 h-10 rounded-full border-4 border-primary/30 pointer-events-none" />
                <div className="absolute bottom-6 -right-2 w-3.5 h-3.5 rounded-full bg-primary/40 blur-[1px] pointer-events-none" />

                {/* 3D Developer Character Avatar */}
                <img
                  src={profileData.avatar || profileData.heroImage}
                  alt={t("hero.banner.imageAlt", "About Dino Péo")}
                  className="relative z-10 w-full max-w-[420px] sm:max-w-[460px] h-auto object-contain drop-shadow-2xl"
                  width={1536}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Content & Bio (Đoạn văn nằm bên phải) */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start z-10"
            initial={reduceMotion ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Greeting text */}
            <div className="mb-2 sm:mb-3">
              <span className="text-foreground/60 font-mono text-sm sm:text-base tracking-widest uppercase">
                {t("hero.banner.greeting", "Hello, I'm")}
              </span>
            </div>

            {/* Main Name Heading */}
            <h2
              id="about-heading"
              className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-foreground leading-[1.1] mb-3 sm:mb-4"
            >
              {profileData.name}{" "}
              <span className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground/40 font-sans tracking-normal inline-block">
                (Trần Duy Phát)
              </span>
            </h2>

            {/* Subtitle / Role with Typewriter Effect & Accent Underline */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-2xl font-bold tracking-wide font-mono normal-case min-h-[32px] sm:min-h-[36px] flex items-center text-primary drop-shadow-sm">
                <span>{displayedRole}</span>
                <span className="inline-block w-0.5 h-5 sm:h-6 bg-primary ml-1.5 animate-pulse" />
              </h3>
            </div>

            {/* Highlight Concise Description */}
            <p className="text-foreground/80 text-base sm:text-lg leading-relaxed font-sans mb-6 max-w-xl">
              {t(
                "hero.description_full",
                "I create modern, responsive and user-friendly websites and digital experiences that help brands grow and make a lasting impression."
              )}
            </p>

            {/* Action Buttons: View My Work, Contact, Resume */}
            <div className="flex flex-wrap items-center gap-3.5 mt-2">
              <button
                onClick={() => scrollToSection("projects")}
                className="about-btn-primary group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm sm:text-base tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                aria-label={t("hero.banner.work", "View My Work")}
              >
                <span>{t("hero.banner.work", "View My Work")}</span>
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-card/60 backdrop-blur-sm border border-primary/40 hover:border-primary text-foreground font-bold text-sm sm:text-base tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/10 cursor-pointer"
                aria-label={t("hero.banner.contact", "Contact Me")}
              >
                <span>{t("hero.banner.contact", "Contact Me")}</span>
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <a
                href={profileData.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-full text-primary hover:text-primary/80 font-bold text-sm sm:text-base transition-colors duration-200"
              >
                <span>{t("hero.banner.resume", "View Résumé")}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Social Links Row */}
            <div className="flex items-center gap-3 mt-6">
              {profileData.socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.name}
                  aria-label={link.name}
                  className="group relative w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-card/50 backdrop-blur-sm border border-border/80 hover:border-primary text-foreground/70 hover:text-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-primary/20"
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">
                    {link.icon}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
