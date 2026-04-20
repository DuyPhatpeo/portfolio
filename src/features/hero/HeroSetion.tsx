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
      className="relative min-h-screen flex items-center justify-center pt-28 pb-32 md:py-24 scroll-mt-20 md:scroll-mt-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative">
          {/* Main Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">


            {/* Greeting */}
            <span className="text-primary font-mono text-sm md:text-base tracking-[0.2em] uppercase block ml-1">
              {t("hero.greeting")}
            </span>

            {/* Title */}
            <h1
              data-text={t("hero.title")}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[90px] xl:text-[110px] font-sans font-black uppercase leading-[1.05] tracking-tight text-foreground cyber-glitch-auto"
            >
              {t("hero.title")}
            </h1>

            {/* Typing roles */}
            <div className="pl-4 border-l-2 border-primary/50">
              <TypingRoles />
            </div>



            <div className="flex flex-col gap-0 w-full max-w-[280px] xs:max-w-[320px]">
              <HeroButtons scrollToSection={scrollToSection} />
              <SocialLinks scrollToSection={scrollToSection} />
            </div>
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
