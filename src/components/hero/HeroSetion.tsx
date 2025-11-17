import React from "react";
import { heroInfo } from "../../data/heroData";
import HeroAvatar from "./HeroAvatar";
import TypingRoles from "./TypingRoles";
import HeroButtons from "./HeroButtons";
import SocialLinks from "./SocialLinks";
import ScrollIndicator from "./ScrollIndicator";

interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

export default function HeroSection({ scrollToSection }: HeroSectionProps) {
  const { name, description } = heroInfo;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center md:pt-24 scroll-mt-20 md:scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <HeroAvatar />

        <div className="text-center md:text-left space-y-4 md:space-y-6 order-2 md:order-1">
          <div className="text-black dark:text-white font-bold text-lg md:text-xl lg:text-2xl">
            I am
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-snug bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            {name}
          </h1>

          <TypingRoles />

          <p className="text-base sm:text-lg md:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto md:mx-0 leading-relaxed mt-3 md:mt-4">
            {description}
          </p>

          <HeroButtons scrollToSection={scrollToSection} />
          <SocialLinks />
        </div>
      </div>

      <ScrollIndicator scrollToSection={scrollToSection} />
    </section>
  );
}
