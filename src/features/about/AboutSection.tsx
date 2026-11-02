"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@lib/gsap";
import { useTranslation } from "react-i18next";
import { profileData } from "@constants/profileData";
import { ArrowUpRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@components/providers/LanguageProvider";
import LanyardBadge3D from "./LanyardBadge3D";

interface AboutSectionProps {
  scrollToSection: (sectionId: string) => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ scrollToSection }) => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { lang } = useLanguage();
  const isAboutPage = Boolean(pathname?.includes("/about"));

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
              <LanyardBadge3D
                avatarUrl={profileData.avatar || profileData.heroImage}
                imageAlt={t("hero.banner.imageAlt", "Dino Péo Badge")}
                onLoad={() => ScrollTrigger.refresh()}
              />
            ) : (
              /* Clean Portrait Showcase Card on Home Page (No name tag / badge accessories) */
              <div className="relative w-full h-full min-h-[380px] sm:min-h-[440px] rounded-3xl bg-card/80 backdrop-blur-xl border border-border/80 overflow-hidden flex flex-col justify-end group shadow-sm">
                {/* Subtle ambient backdrop aura behind character */}
                <div
                  className="pointer-events-none absolute -bottom-12 left-1/2 -translate-x-1/2 w-3/4 aspect-square rounded-full bg-primary/10 blur-3xl group-hover:bg-primary/15 transition-colors duration-500"
                  aria-hidden="true"
                />

                {/* Playful Curving Wavy Arrow & Text flowing along the path from the figure */}
                <div className="absolute top-4 sm:top-6 inset-x-0 px-4 sm:px-6 z-20 pointer-events-none flex justify-center">
                  <svg
                    viewBox="0 0 340 100"
                    className="w-full max-w-[340px] h-auto overflow-visible select-none"
                    aria-hidden="true"
                  >
                    <defs>
                      {/* Smooth S-wave path undulating outward from the character */}
                      <path
                        id="about-wavy-path"
                        d="M 35,82 C 85,25 145,98 215,38 S 285,72 320,32"
                        fill="none"
                      />
                      {/* Arrowhead Marker at the tip */}
                      <marker
                        id="about-arrowhead"
                        viewBox="0 0 10 10"
                        refX="7"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto"
                      >
                        <path
                          d="M 0 1.5 L 8 5 L 0 8.5 L 2 5 z"
                          className="fill-primary"
                        />
                      </marker>
                    </defs>

                    {/* Curving Wavy Arrow Stroke */}
                    <path
                      d="M 35,82 C 85,25 145,98 215,38 S 285,72 320,32"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="5 4"
                      markerEnd="url(#about-arrowhead)"
                      className="text-primary/70 group-hover:text-primary transition-colors duration-300"
                    />

                    {/* Text undulating gracefully right along the wavy curve */}
                    <text
                      dy="-9"
                      className="fill-foreground/90 group-hover:fill-primary text-[12px] sm:text-[13px] font-mono font-medium tracking-wide transition-colors duration-300"
                    >
                      <textPath
                        href="#about-wavy-path"
                        startOffset="4%"
                        textAnchor="start"
                      >
                        {t("about.arrow_text", "Dino Péo (Trần Duy Phát) ✨")}
                      </textPath>
                    </text>
                  </svg>
                </div>

                {/* 3D Developer Character Avatar anchored flush to card bottom */}
                <div className="relative z-10 w-full flex-1 flex items-end justify-center px-4 pt-16 sm:pt-20">
                  <img
                    src={profileData.avatar || profileData.heroImage}
                    alt={t("hero.banner.imageAlt", "About Dino Péo")}
                    className="w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[380px] h-auto max-h-[380px] sm:max-h-[440px] object-contain object-bottom block filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.2)] transition-transform duration-500 group-hover:scale-[1.03]"
                    width={1536}
                    height={1024}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => ScrollTrigger.refresh()}
                  />
                </div>
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
                    onClick={() => router.push(`/${lang}/about`)}
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
