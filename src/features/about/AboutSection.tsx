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
  const location = useLocation();
  const isAboutPage = location.pathname === "/about";

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (isAboutPage) {
          // Render immediately above the fold on /about without waiting for scroll
          gsap.fromTo(
            "[data-about-reveal]",
            { autoAlpha: 0, y: 20 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.1,
              delay: 0.05,
              ease: "power3.out",
            }
          );
        } else {
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
        }
      });
    },
    { scope: sectionRef, dependencies: [isAboutPage], revertOnUpdate: true }
  );

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
      id="about"
      className={`relative w-full overflow-hidden ${
        isAboutPage
          ? "bg-transparent pt-6 pb-20 md:pt-10 md:pb-28"
          : "bg-card/55 py-20 md:py-28 border-y border-border/70"
      }`}
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 w-full">
        {/* Equal-height 2-column split (items-stretch guarantees identical top & bottom edges) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Lanyard Badge on /about vs Classic Clean Portrait Card on Home */}
          <div
            className={`order-last lg:order-first lg:col-span-5 flex relative z-10 ${
              isAboutPage
                ? "flex-col items-center justify-center py-4 sm:py-6"
                : ""
            }`}
            data-about-reveal
          >
            {isAboutPage ? (
              /* Freestanding 3D Developer Lanyard Badge (Page About) */
              <>
                {/* Lanyard Strap descending from above */}
                <div className="relative flex flex-col items-center z-20 -mb-1">
                  {/* Premium Woven Fabric Lanyard Ribbon */}
                  <div className="w-8 sm:w-9 h-16 sm:h-20 bg-neutral-900 border-x-2 border-primary/60 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-y-0 left-1 w-px bg-white/10" />
                    <div className="absolute inset-y-0 right-1 w-px bg-white/10" />
                    <div className="absolute inset-y-0 w-0.5 bg-primary/40" />
                  </div>

                  {/* Matte Metallic Clasp Hardware */}
                  <div className="w-7 h-3 rounded-xs bg-gradient-to-r from-neutral-700 via-neutral-500 to-neutral-700 border border-neutral-400 z-20 -mt-0.5" />
                  {/* Metallic Swivel Carabiner Hook */}
                  <div className="w-3.5 h-6 rounded-b-full border-2 border-neutral-300 bg-neutral-800 -mt-1 z-30 flex items-end justify-center pb-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                  </div>
                </div>

                {/* Hanging Frosted Acrylic Badge (Straight vertical, zero tilt, zero shadow) */}
                <div className="group/badge relative flex flex-col items-center select-none cursor-pointer">
                  {/* Top Hanger Tab with Laser-cut Slot */}
                  <div className="relative z-10 w-28 sm:w-32 h-6 sm:h-7 bg-neutral-900/90 border-2 border-primary/50 border-b-0 rounded-t-2xl backdrop-blur-xl flex items-center justify-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-background border border-primary/40" />
                    <span className="w-9 h-2.5 rounded-full bg-background border border-primary/60" />
                    <span className="w-1.5 h-1.5 rounded-full bg-background border border-primary/40" />
                  </div>

                  {/* Main Acrylic Badge Sleeve (Glassmorphism & Crisp Emerald Trim - No Shadow) */}
                  <div className="relative w-[280px] xs:w-[310px] sm:w-[340px] md:w-[360px] rounded-3xl bg-neutral-900/85 backdrop-blur-2xl border-2 border-primary/50 p-2 sm:p-2.5">
                    {/* Characteristic Side Cutout Notches */}
                    <span
                      className="absolute top-1/2 -left-[3px] -translate-y-1/2 w-2 h-10 bg-background rounded-r-md border-r-2 border-y-2 border-primary/50 z-20"
                      aria-hidden="true"
                    />
                    <span
                      className="absolute top-1/2 -right-[3px] -translate-y-1/2 w-2 h-10 bg-background rounded-l-md border-l-2 border-y-2 border-primary/50 z-20"
                      aria-hidden="true"
                    />

                    {/* Subtle Diagonal Glass Sheen */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-60 z-20"
                      aria-hidden="true"
                    />

                    {/* 100% Pure Photo Frame (Clean neutral card background, zero colored glow) */}
                    <div className="relative w-full aspect-[3/3.8] rounded-2xl overflow-hidden bg-card border border-border/60 flex items-end justify-center">
                      <img
                        src={profileData.avatar || profileData.heroImage}
                        alt={t("hero.banner.imageAlt", "Dino Péo Badge")}
                        className="relative z-10 w-full h-auto object-contain object-bottom block"
                        width={1536}
                        height={1024}
                        loading="eager"
                        decoding="async"
                        onLoad={() => ScrollTrigger.refresh()}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Classic Clean Portrait Card on Home Page (2 concentric rings removed) */
              <div className="relative w-full h-full min-h-[340px] sm:min-h-[400px] rounded-3xl bg-card border border-border overflow-hidden flex flex-col items-center justify-end pt-8 px-6">
                {/* 3D Developer Character Avatar anchored flush to card bottom */}
                <img
                  src={profileData.avatar || profileData.heroImage}
                  alt={t("hero.banner.imageAlt", "About Dino Péo")}
                  className="relative z-10 w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[420px] h-auto object-contain object-bottom block"
                  width={1536}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => ScrollTrigger.refresh()}
                />
              </div>
            )}
          </div>

          {/* Right Column: Structured Bio + Flush Bottom Action Bar */}
          <div
            className="order-first lg:order-last lg:col-span-7 flex flex-col justify-between z-10 py-1"
            data-about-reveal
          >
            <div>
              <p className="text-muted-foreground font-mono text-base sm:text-lg mb-2.5">
                {t("hero.banner.greeting", "Hello, I'm")}
              </p>

              {/* Main Name Heading */}
              <h2
                id="about-heading"
                className="text-4xl sm:text-5xl md:text-[54px] font-sans font-bold tracking-tight text-foreground leading-[1.08] mb-3.5"
              >
                {profileData.name}{" "}
                <span className="text-2xl sm:text-3xl font-normal text-muted-foreground inline-block">
                  (Trần Duy Phát)
                </span>
              </h2>

              {/* Dynamic Role */}
              <div className="mb-6">
                <div className="text-xl sm:text-2xl md:text-[26px] font-mono font-medium min-h-[36px] flex items-center text-primary">
                  <span>{displayedRole}</span>
                  <span
                    className="inline-block w-0.5 h-6 bg-primary ml-2"
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Purpose-distinct copy: concise pitch on Home vs personal story on /about */}
              {isAboutPage ? (
                <div className="space-y-4 max-w-[56ch]">
                  <p className="text-foreground/95 text-lg sm:text-xl leading-relaxed">
                    {t("about.lead")}
                  </p>
                  <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                    {t("about.story")}
                  </p>
                </div>
              ) : (
                <p className="text-foreground/95 text-lg sm:text-xl leading-relaxed max-w-[54ch]">
                  {t(
                    "hero.description_full",
                    "I create modern, responsive and user-friendly websites and digital experiences that help brands grow and make a lasting impression."
                  )}
                </p>
              )}
            </div>

            {/* Bottom Action & Social Bar aligned flush with the bottom of the portrait card */}
            <div className="pt-7 mt-8 border-t border-border/70 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3.5">
                {!isAboutPage && (
                  <button
                    onClick={() => scrollToSection("about")}
                    className="group inline-flex items-center justify-center gap-2.5 min-h-12 px-7 py-3 rounded-full bg-primary text-primary-foreground font-medium text-base transition-opacity duration-200 hover:opacity-90 cursor-pointer"
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
                  className="group inline-flex items-center justify-center gap-2.5 min-h-12 px-7 py-3 rounded-full border border-border bg-card hover:border-primary/60 text-foreground hover:text-primary font-medium text-base transition-colors duration-200"
                >
                  <span>{t("hero.banner.resume", "View Résumé")}</span>
                  <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              {/* Social Links Row */}
              <div className="flex items-center gap-2.5">
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
      </div>
    </section>
  );
};

export default AboutSection;
