import React, { useState, useEffect, useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@lib/gsap";
import { useTranslation } from "react-i18next";
import { profileData } from "@constants/profileData";
import { ArrowUpRight } from "lucide-react";
import { useLocation } from "react-router-dom";

interface AboutSectionProps {
  scrollToSection: (sectionId: string) => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ scrollToSection }) => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-about-reveal]", {
          autoAlpha: 0,
          y: 28,
          duration: 0.75,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "clamp(top 82%)",
            once: true,
          },
        });
      }, sectionRef);
      return () => media.revert();
    },
    { scope: sectionRef }
  );

  const location = useLocation();
  const isAboutPage = location.pathname === "/about";

  // Typewriter effect for developer roles
  const roles =
    (t("hero.roles", { returnObjects: true }) as string[]) || profileData.roles;
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeSpeed, setTypeSpeed] = useState(110);

  useEffect(() => {
    const currentFullText = roles[currentRoleIndex % roles.length] || "";
    const timer = setTimeout(() => {
      if (isDeleting) {
        setDisplayedRole(currentFullText.substring(0, displayedRole.length - 1));
        setTypeSpeed(45);
      } else {
        setDisplayedRole(currentFullText.substring(0, displayedRole.length + 1));
        setTypeSpeed(100);
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
    <section
      ref={sectionRef}
      onLoad={() => ScrollTrigger.refresh()}
      id="about"
      className={`relative w-full overflow-hidden bg-transparent ${
        isAboutPage
          ? "pt-8 pb-20 md:pt-12 md:pb-28"
          : "py-20 md:py-28 border-t border-border/60"
      }`}
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: 3D Character Portrait with Clean Architectural Frame */}
          <div
            className="order-last lg:order-first lg:col-span-5 flex justify-center items-center relative z-10"
            data-about-reveal
          >
            <div className="relative w-full max-w-[460px] mx-auto flex items-center justify-center">
              {/* Translucent monochrome orbital frame */}
              <span
                className="absolute -z-10 w-[76%] aspect-square rounded-full bg-card border border-border"
                aria-hidden="true"
              />
              <span
                className="absolute -z-10 w-[88%] aspect-square -top-2 -left-1 rounded-full border border-dashed border-foreground/20"
                aria-hidden="true"
              >
                <span className="absolute top-[12%] right-[8%] w-2 h-2 rounded-full bg-foreground/75" />
              </span>

              {/* 3D Developer Character Avatar */}
              <img
                src={profileData.avatar || profileData.heroImage}
                alt={t("hero.banner.imageAlt", "About Dino Péo")}
                className="relative z-10 w-full max-w-[400px] sm:max-w-[440px] h-auto object-contain"
                width={1536}
                height={1024}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Right Column: Bio & Primary Actions */}
          <div
            className="order-first lg:order-last lg:col-span-7 flex flex-col items-start z-10"
            data-about-reveal
          >
            <p className="text-muted-foreground font-mono text-lg sm:text-xl mb-3">
              {t("hero.banner.greeting", "Hello, I'm")}
            </p>

            {/* Main Name Heading */}
            <h2
              id="about-heading"
              className="text-4xl sm:text-5xl md:text-6xl font-sans font-bold tracking-tight text-foreground leading-[1.08] mb-4"
            >
              {profileData.name}{" "}
              <span className="text-2xl sm:text-3xl md:text-4xl font-normal text-muted-foreground inline-block">
                (Trần Duy Phát)
              </span>
            </h2>

            {/* Dynamic Role */}
            <div className="mb-6">
              <div className="text-2xl sm:text-3xl font-mono font-medium min-h-[38px] flex items-center text-primary">
                <span>{displayedRole}</span>
                <span
                  className="inline-block w-0.5 h-7 bg-primary ml-2"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Purpose-distinct copy: concise pitch on Home vs personal story on /about */}
            {isAboutPage ? (
              <div className="space-y-5 mb-9 max-w-[52ch]">
                <p className="text-foreground/95 text-xl sm:text-2xl leading-relaxed">
                  {t("about.lead")}
                </p>
                <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed">
                  {t("about.story")}
                </p>
              </div>
            ) : (
              <p className="text-foreground/95 text-xl sm:text-2xl leading-relaxed mb-9 max-w-[52ch]">
                {t(
                  "hero.description_full",
                  "I create modern, responsive and user-friendly websites and digital experiences that help brands grow and make a lasting impression."
                )}
              </p>
            )}

            {/* Action Buttons (48px+ accessible touch height, zero neon shadow glow) */}
            <div className="flex flex-wrap items-center gap-4">
              {!isAboutPage && (
                <button
                  onClick={() => scrollToSection("about")}
                  className="group inline-flex items-center justify-center gap-2.5 min-h-13 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-medium text-base sm:text-lg transition-opacity duration-200 hover:opacity-90 cursor-pointer"
                  aria-label={t("hero.banner.about", "More About Me")}
                >
                  <span>{t("hero.banner.about", "More About Me")}</span>
                  <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              )}

              <a
                href={profileData.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 min-h-13 px-8 py-3.5 rounded-full border border-border bg-card hover:border-primary/60 text-foreground hover:text-primary font-medium text-base sm:text-lg transition-colors duration-200"
              >
                <span>{t("hero.banner.resume", "View Résumé")}</span>
                <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Social Links Row */}
            <div className="flex items-center gap-2.5 mt-7">
              {profileData.socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.name}
                  aria-label={link.name}
                  className="w-11 h-11 rounded-full flex items-center justify-center bg-card border border-border hover:border-primary/60 text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
