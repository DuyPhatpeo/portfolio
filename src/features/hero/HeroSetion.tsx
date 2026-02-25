import HeroAvatar from "./HeroAvatar";
import TypingRoles from "./TypingRoles";
import HeroButtons from "./HeroButtons";
import SocialLinks from "./SocialLinks";
import ScrollIndicator from "./ScrollIndicator";
import { useTranslation } from "react-i18next";

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

export default function HeroSection({ scrollToSection }: HeroSectionProps) {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 md:pt-24 scroll-mt-20 md:scroll-mt-24 px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative">
          {/* Main Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {/* Status badge */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-tech-teal/30 bg-tech-teal/5">
                <span className="w-2 h-2 rounded-full bg-tech-teal animate-pulse" />
                <span className="text-tech-teal font-mono text-xs tracking-[0.2em] uppercase">
                  System Initialized
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[78px] xl:text-[88px] font-sans font-black uppercase leading-[1.05] tracking-tight text-tech-light drop-shadow-[0_0_24px_rgba(0,245,212,0.5)]">
              {t("hero.title")}
            </h1>

            {/* Typing roles */}
            <div className="pl-4 border-l-2 border-tech-teal/50">
              <TypingRoles />
            </div>

            {/* Subtitle */}
            <p className="text-sm md:text-base text-tech-teal/80 font-mono max-w-xl leading-relaxed mt-1 border border-tech-teal/15 bg-tech-teal/5 rounded-lg p-4">
              {t("hero.subtitle")}
            </p>

            <HeroButtons scrollToSection={scrollToSection} />
            <SocialLinks />
          </div>

          {/* Avatar Panel */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative order-first lg:order-last mb-6 lg:mb-0">
            <HeroAvatar />
          </div>
        </div>
      </div>

      <ScrollIndicator scrollToSection={scrollToSection} />
    </section>
  );
}
