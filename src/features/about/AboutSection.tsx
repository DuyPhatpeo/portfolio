"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@lib/gsap";
import { useTranslation } from "react-i18next";
import { profileData } from "@constants/profileData";
import { ArrowUpRight, Code2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@components/providers/LanguageProvider";
import { useThemeStore } from "@stores/themeStore";
import Lanyard from "@components/ui/Lanyard";
import ProfileCard from "@components/ui/ProfileCard";
import { HighlightText } from "@animate-ui/react/primitives/texts/highlight";

interface AboutSectionProps {
  scrollToSection: (sectionId: string) => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ scrollToSection }) => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { lang } = useLanguage();
  const { darkMode } = useThemeStore();
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
              /* React Bits 3D Developer Lanyard Badge (Page About) */
              <div className="relative w-full h-[480px] xs:h-[540px] sm:h-[600px] md:h-[640px] flex items-center justify-center">
                <Lanyard
                  frontImage={profileData.avatar || profileData.heroImage}
                  backImage={profileData.avatar || profileData.heroImage}
                  cardColor="#d9ff3a"
                  strapColor="#d9ff3a"
                  interactive={false}
                  intro={false}
                  finish="matte"
                  size={0.65}
                  strapLength={0.48}
                  breeze={0.35}
                  imageScale={0.74}
                  imageAnchor="bottom"
                  className="w-full h-full"
                />
              </div>
            ) : (
              /* React Bits Holographic 3D Tilt Profile Card on Home Page */
              <div className="relative w-full flex items-center justify-center py-2 sm:py-4">
                <ProfileCard
                  avatarUrl={profileData.avatar || profileData.heroImage}
                  miniIcon={<Code2 className="w-4 h-4 text-[#11121c] dark:text-primary" strokeWidth={2.5} />}
                  name={profileData.name}
                  title=""
                  handle="DuyPhatpeo"
                  status={t("about.status", "Available for work")}
                  statusColor="#d9ff3a"
                  contactText=""
                  showUserInfo={true}
                  theme={darkMode ? "dark" : "light"}
                  radius={22}
                  holo={0.35}
                  glare={0.25}
                  enableTilt={true}
                  tiltStrength={14}
                  imageFit="contain"
                  className="mx-auto"
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

              {/* Main Name Heading with Animate UI HighlightText */}
              <h2
                id="about-heading"
                className="text-4xl sm:text-5xl md:text-[54px] font-sans font-bold tracking-tight text-foreground leading-[1.12] mb-3.5 flex flex-wrap items-baseline gap-x-3 gap-y-1"
              >
                <HighlightText
                  text={profileData.name}
                  className="bg-linear-to-r from-primary/30 via-primary/50 to-primary/20 dark:from-primary/25 dark:via-primary/45 dark:to-primary/15 text-foreground px-2 py-0.5 rounded-lg"
                  inView
                  delay={150}
                  transition={{ duration: 1.6, ease: "easeInOut" }}
                />
                <HighlightText
                  text="(Trần Duy Phát)"
                  className="text-2xl sm:text-3xl font-normal text-muted-foreground bg-linear-to-r from-primary/15 via-primary/30 to-primary/10 dark:from-primary/15 dark:via-primary/25 dark:to-primary/10 px-1.5 py-0.5 rounded-md"
                  inView
                  delay={500}
                  transition={{ duration: 1.8, ease: "easeInOut" }}
                />
              </h2>

              {/* Dynamic Role */}
              <div className="mb-6">
                <div className="inline-flex items-center min-h-[36px] font-mono font-semibold text-lg sm:text-xl md:text-2xl px-3 py-1 rounded-lg text-[#11121c] bg-primary dark:bg-transparent dark:text-primary dark:px-0 dark:py-0 transition-all duration-300">
                  <span>{displayedRole}</span>
                  <span
                    className="inline-block w-0.5 h-5 sm:h-6 bg-current ml-2"
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
                    aria-label={t("hero.banner.about", "More About Me")}
                    className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm sm:text-base tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 hover:shadow-[0_0_24px_rgba(217,255,58,0.45)] cursor-pointer"
                  >
                    <span>{t("hero.banner.about", "More About Me")}</span>
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                )}

                <a
                  href={profileData.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-card hover:bg-muted border border-border hover:border-primary/60 text-foreground hover:text-primary font-semibold text-sm sm:text-base tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
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
